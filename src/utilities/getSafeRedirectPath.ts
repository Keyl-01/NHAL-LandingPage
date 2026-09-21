const BASE = 'http://internal.invalid'

/**
 * Returns a same-origin path (pathname + search + hash) that is safe to redirect to,
 * or null. Rejects protocol-relative (`//evil.com`) and backslash (`/\evil.com`)
 * tricks that browsers would resolve to another host.
 */
export const getSafeRedirectPath = (path: string | null | undefined): string | null => {
  if (!path || !path.startsWith('/')) return null

  // Backslashes are normalized to slashes by browsers; control chars enable header tricks
  if (/[\\\u0000-\u001f\u007f]/.test(path)) return null

  let url: URL

  try {
    url = new URL(path, BASE)
  } catch {
    return null
  }

  if (url.origin !== BASE) return null

  return `${url.pathname}${url.search}${url.hash}`
}
