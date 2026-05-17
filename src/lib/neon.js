/**
 * SECURITY NOTE — DO NOT USE IN BROWSER
 * ======================================
 * This file previously initialized a direct Neon PostgreSQL connection using
 * import.meta.env.VITE_NEON_DATABASE_URL — a VITE_ prefixed variable that
 * Vite bundles into the client JavaScript, making the DB connection string
 * publicly visible in DevTools.
 *
 * The @neondatabase/serverless driver is designed for Edge Runtimes
 * (Vercel Edge Functions, Cloudflare Workers) — NOT for browser execution.
 *
 * ✅ CORRECT USAGE: Create a Vercel Edge Function (e.g. /api/jobs/route.js)
 *    that imports neon using the server-only DATABASE_URL (no VITE_ prefix).
 *    The frontend then calls fetch('/api/jobs') to retrieve data securely.
 *
 * Example backend pattern (Vercel Edge Function):
 *   import { neon } from '@neondatabase/serverless'
 *   const sql = neon(process.env.DATABASE_URL)  // ← server-only, never exposed
 *   export default async function handler(req) {
 *     const jobs = await sql`SELECT * FROM jobs WHERE status = 'published'`
 *     return Response.json(jobs)
 *   }
 *
 * The frontend should replace all mock data imports with:
 *   const [data, setData] = useState([])
 *   useEffect(() => { fetch('/api/jobs').then(r => r.json()).then(setData) }, [])
 */

// This module intentionally exports nothing for browser use.
// It is kept as architecture documentation only.
export {}
