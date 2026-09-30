const COUNTER_KEY = 'consulfarma:web-visits';
const VISIT_COOKIE = 'consulfarma_visit';
const VISIT_WINDOW_SECONDS = 60 * 60 * 6;

function hasVisitCookie(cookieHeader = '') {
  return cookieHeader.split(';').some(cookie => cookie.trim().startsWith(`${VISIT_COOKIE}=`));
}

async function redisCommand(command) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) throw new Error('Visit counter storage is not configured');

  const response = await fetch(`${url}/${command.map(encodeURIComponent).join('/')}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store'
  });
  if (!response.ok) throw new Error('Visit counter storage request failed');
  const payload = await response.json();
  return Number(payload.result);
}

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const countedRecently = hasVisitCookie(request.headers.cookie);
    const count = await redisCommand([countedRecently ? 'get' : 'incr', COUNTER_KEY]);

    if (!countedRecently) {
      response.setHeader('Set-Cookie', `${VISIT_COOKIE}=1; Max-Age=${VISIT_WINDOW_SECONDS}; Path=/; HttpOnly; Secure; SameSite=Lax`);
    }
    response.setHeader('Cache-Control', 'no-store, max-age=0');
    return response.status(200).json({ count: Number.isFinite(count) ? count : 0 });
  } catch (error) {
    response.setHeader('Cache-Control', 'no-store, max-age=0');
    return response.status(503).json({ error: 'Visit counter unavailable' });
  }
}
