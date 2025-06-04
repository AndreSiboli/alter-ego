"use client";

import { use } from "react";
import styles from "@/styles/navbar/Index.module.scss";

import Container from "@/components/layout/Container";
import Logo from "@/components/layout/Logo";
import Link from "next/link";

import { NavbarContext } from "@/_context/NavbarContext";

export default function Navbar() {
  const { isOnTop, navStyles } = use(NavbarContext);
  const domains = [
    { href: "/#home", text: "Home" },
    { href: "/#what-is-it", text: "What's it" },
    { href: "/#alter-ego", text: "Alter Ego" },
    { href: "/#inspirations", text: "Inspirations" },
  ];

  return (
    <header
      className={`${styles.header} ${isOnTop && styles.onTop} `}
      style={{ ...navStyles }}
    >
      <Container>
        <div className={styles.header_container}>
          <nav className={styles.header_navigation}>
            <div className={styles.navigation_links}>
              {domains.slice(0, 2).map((domain) => (
                <Link href={domain.href} key={domain.href}>
                  {domain.text}
                </Link>
              ))}
            </div>
            <div className={styles.header_logo}>
              <Logo />
            </div>
            <div className={styles.navigation_links}>
              {domains.slice(2).map((domain) => (
                <Link href={domain.href} key={domain.href}>
                  {domain.text}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </Container>
    </header>
  );
}
