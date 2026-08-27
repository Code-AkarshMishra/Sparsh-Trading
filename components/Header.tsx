"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { business } from "@/lib/business";
import { useEffect, useState } from "react";
import { BrandImage } from "@/components/BrandImage";
import { UserIcon } from "@/components/Icons";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [user, setUser] = useState<{ id: string; role: string; name: string; email?: string; phone?: string } | null>(null);

  const baseNavItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Products", href: "/products" },
    { label: "Projects", href: "/projects" },
    { label: "Guides", href: "/guides" },
    { label: "B2B Supply", href: "/b2b" },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" }
  ];

  // If user is not logged in, include Register in nav items
  const navItems = user
    ? [
        ...baseNavItems,
        {
          label: user.role === "CUSTOMER" ? "Dashboard" : "Admin Panel",
          href: user.role === "CUSTOMER" ? "/dashboard" : "/admin"
        }
      ]
    : [...baseNavItems, { label: "Register", href: "/register" }];

  useEffect(() => {
    const saved = localStorage.getItem("sparsh-theme") === "dark";
    setDark(saved);
    document.documentElement.classList.toggle("dark-mode", saved);
  }, []);

  // Fetch current session on mount and route transition
  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.user) {
          setUser(data.data.user);
        } else {
          setUser(null);
        }
      })
      .catch(() => setUser(null));
  }, [pathname]);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    localStorage.setItem("sparsh-theme", next ? "dark" : "light");
    document.documentElement.classList.toggle("dark-mode", next);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      closeMenu();
      router.push("/");
      router.refresh();
    } catch {
      window.location.href = "/";
    }
  }

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className={`header ${menuOpen ? "menu-open" : ""}`} role="banner">
      <Link href="/" className="logo" onClick={closeMenu} aria-label="SPARSH TRADING home">
        <span className="logo-mark">
          <BrandImage src="/brand-logo.png" alt={`${business.name} logo`} />
        </span>
        <span className="wordmark">
          <BrandImage src="/brand-wordmark.png" alt={business.name} />
        </span>
      </Link>

      <nav className="nav" aria-label="Primary navigation">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={closeMenu}
              className={`nav-item ${active ? "active" : ""}`}
              aria-current={active ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        })}

        <Link onClick={closeMenu} className="btn primary" href="/contact" style={{ padding: "8px 16px", minHeight: 36, fontSize: "0.88rem", borderRadius: 6 }}>
          Get Quote
        </Link>

        {user ? (
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Link
              onClick={closeMenu}
              href={user.role === "CUSTOMER" ? "/dashboard" : "/admin"}
              className="btn"
              style={{
                fontSize: "0.82rem",
                padding: "6px 12px",
                minHeight: 34,
                borderColor: "var(--border)",
                color: "var(--strong)",
                fontWeight: 600,
                borderRadius: 6,
                display: "inline-flex",
                alignItems: "center",
                gap: 6
              }}
              title={`Logged in as ${user.name}`}
            >
              <UserIcon width={14} height={14} style={{ color: "var(--red-2)" }} />
              {user.name?.split(" ")[0] || "Account"}
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="btn"
              style={{
                fontSize: "0.82rem",
                padding: "6px 12px",
                minHeight: 34,
                cursor: "pointer",
                background: "transparent",
                color: "var(--red-2)",
                borderColor: "var(--border)",
                fontWeight: 600,
                borderRadius: 6
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link onClick={closeMenu} className="btn" href="/login" style={{ padding: "8px 14px", minHeight: 36, fontSize: "0.88rem", borderRadius: 6, display: "inline-flex", alignItems: "center", gap: 6 }}>
            <UserIcon width={15} height={15} />
            Login
          </Link>
        )}
      </nav>

      <div className="header-tools">
        <button
          className="theme-toggle"
          type="button"
          onClick={toggleTheme}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          title={dark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {dark ? "☀" : "◐"}
        </button>

        {user ? (
          <button
            className="mobile-login"
            type="button"
            onClick={handleLogout}
            aria-label="Logout"
            title={`Logged in as ${user.name}. Click to logout.`}
          >
            <UserIcon width={18} height={18} style={{ color: "var(--red-2)" }} />
          </button>
        ) : (
          <Link className="mobile-login" href="/login" onClick={closeMenu} aria-label="Login" title="Login">
            <UserIcon width={18} height={18} />
          </Link>
        )}

        <button
          className="menu-toggle"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
