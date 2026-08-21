"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { business } from "@/lib/business";
import { useEffect, useState } from "react";
import { BrandImage } from "@/components/BrandImage";

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Products", href: "/products" },
    { label: "Projects", href: "/projects" },
    { label: "Gallery", href: "/gallery" },
    { label: "How We Work", href: "/#how-we-work" },
    { label: "Reviews", href: "/#reviews" },
    { label: "Contact", href: "/contact" },
    { label: "Register", href: "/register" }
  ];

  useEffect(() => {
    const saved = localStorage.getItem("sparsh-theme") === "dark";
    setDark(saved);
    document.documentElement.classList.toggle("dark-mode", saved);
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    localStorage.setItem("sparsh-theme", next ? "dark" : "light");
    document.documentElement.classList.toggle("dark-mode", next);
  }

  function closeMenu() {
    setMenuOpen(false);
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
        <Link onClick={closeMenu} className="btn primary" href="/contact">
          Get Quote
        </Link>
        <Link onClick={closeMenu} className="btn" href="/login">
          Login
        </Link>
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
        <Link className="mobile-login" href="/login" onClick={closeMenu} aria-label="Login">
          ⇥
        </Link>
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
