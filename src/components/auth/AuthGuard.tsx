"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStatus } from "@/context/AuthProvider";
import { isProtectedPath } from "@/lib/auth/protected-paths";

/**
 * Redirects to /login when the session ends while a protected page is open
 * (sign out in this or another tab, session expiry). Initial navigation to
 * protected pages is handled server-side by the middleware.
 */
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuthStatus();
  const pathname = usePathname();
  const router = useRouter();

  const shouldRedirect = !isLoading && !user && isProtectedPath(pathname);

  useEffect(() => {
    if (shouldRedirect) {
      router.replace("/login");
    }
  }, [shouldRedirect, router]);

  // Unmount the protected page immediately so its logged-out state never
  // paints during the gap before the redirect lands.
  if (shouldRedirect) {
    return null;
  }

  return <>{children}</>;
}
