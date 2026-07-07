// Routes that require an authenticated user. Shared by the middleware
// (server-side redirect on navigation) and AuthGuard (client-side redirect
// when the session ends while the page is open).
export const PROTECTED_PATHS = ["/deferment-notification", "/dashboard"];

export function isProtectedPath(pathname: string) {
  return PROTECTED_PATHS.some((path) => pathname.startsWith(path));
}
