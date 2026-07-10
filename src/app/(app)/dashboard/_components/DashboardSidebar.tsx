"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Users,
  ClipboardList,
  Sparkles,
  Phone,
  Settings,
  LifeBuoy,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type SidebarLink = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const primaryLinks: SidebarLink[] = [
  { href: "/dashboard/counterparties", label: "Counterparties", icon: Users },
  { href: "/dashboard/situation", label: "Situation", icon: ClipboardList },
  { href: "/dashboard/generate", label: "Generate", icon: Sparkles },
  { href: "/dashboard", label: "Call Records", icon: Phone },
];

const secondaryLinks: SidebarLink[] = [
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
  { href: "/dashboard/support", label: "Support", icon: LifeBuoy },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === href : pathname.startsWith(href);

  const renderLink = ({ href, label, icon: Icon }: SidebarLink) => (
    <Link
      key={href}
      href={href}
      className={cn(
        "flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap",
        isActive(href)
          ? "bg-primary/10 text-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {label}
    </Link>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-56 shrink-0 flex-col gap-1 border-r border-border px-3 py-6 sticky top-16 lg:top-20 h-[calc(100vh-4rem)] lg:h-[calc(100vh-5rem)]">
        {primaryLinks.map(renderLink)}
        <div className="mt-auto flex flex-col gap-1 border-t border-border pt-3">
          {secondaryLinks.map(renderLink)}
        </div>
      </aside>

      {/* Mobile horizontal nav */}
      <nav className="md:hidden flex gap-1 overflow-x-auto border-b border-border px-4 py-2">
        {[...primaryLinks, ...secondaryLinks].map(renderLink)}
      </nav>
    </>
  );
}
