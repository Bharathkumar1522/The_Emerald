"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
    { name: "Collections", href: "#collections" },
    { name: "About", href: "#about" },
    { name: "Lifestyle", href: "#lifestyle" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const navRef = useRef<HTMLElement>(null);
    const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    // "dark" = on green/dark background → show gold text
    // "light" = on alabaster/cream background → show forest text
    const [theme, setTheme] = useState<"dark" | "light">("dark");

    // Scroll states for clever behavior
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Detect which section is currently in view using IntersectionObserver
    useEffect(() => {
        const darkSections = document.querySelectorAll<HTMLElement>(
            "[data-nav-theme='dark']"
        );
        const lightSections = document.querySelectorAll<HTMLElement>(
            "[data-nav-theme='light']"
        );

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const el = entry.target as HTMLElement;
                        setTheme(el.dataset.navTheme as "dark" | "light");
                    }
                });
            },
            { threshold: 0.4, rootMargin: "-80px 0px 0px 0px" }
        );

        Array.from(darkSections).concat(Array.from(lightSections)).forEach((section) =>
            observer.observe(section)
        );
        return () => observer.disconnect();
    }, []);

    // Scroll listener for transparency and headroom effect
    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // The hero section is pinned for 3 viewport heights.
            // We only want the glass pill effect AFTER leaving the home screen.
            const threshold = window.innerHeight * 2.8;
            setIsScrolled(currentScrollY > threshold);

            // Hide navbar when scrolling down (after 200px), show when scrolling up
            if (currentScrollY > 200 && currentScrollY > lastScrollY) {
                setIsHidden(true);
            } else if (currentScrollY <= lastScrollY) {
                setIsHidden(false);
            }

            lastScrollY = currentScrollY;
        };

        // Initialize state on mount
        handleScroll();

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Magnetic hover effect
    useEffect(() => {
        const cleanup: (() => void)[] = [];

        linkRefs.current.forEach((el) => {
            if (!el) return;

            const onEnter = () =>
                gsap.to(el, { scale: 1.08, duration: 0.25, ease: "power2.out" });

            const onMove = (e: MouseEvent) => {
                const r = el.getBoundingClientRect();
                const dx = (e.clientX - (r.left + r.width / 2)) * 0.3;
                const dy = (e.clientY - (r.top + r.height / 2)) * 0.3;
                gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: "power3.out" });
            };

            const onLeave = () =>
                gsap.to(el, {
                    x: 0, y: 0, scale: 1,
                    duration: 0.7,
                    ease: "elastic.out(1, 0.38)",
                });

            el.addEventListener("mouseenter", onEnter);
            el.addEventListener("mousemove", onMove);
            el.addEventListener("mouseleave", onLeave);
            cleanup.push(() => {
                el.removeEventListener("mouseenter", onEnter);
                el.removeEventListener("mousemove", onMove);
                el.removeEventListener("mouseleave", onLeave);
            });
        });

        return () => cleanup.forEach((fn) => fn());
    }, []);

    const textColor = theme === "dark" ? "#D4B483" : "#102A1D";
    const logoColor = theme === "dark" ? "#D4B483" : "#102A1D";

    // Clever navbar classes
    const glassClass = isScrolled
        ? (theme === "dark"
            ? "nav-glass border border-white/5 top-4 w-[calc(100%-2rem)] max-w-screen-xl rounded-full"
            : "nav-glass-light border border-black/5 top-4 w-[calc(100%-2rem)] max-w-screen-xl rounded-full")
        : "bg-transparent border border-transparent top-6 w-full max-w-none rounded-none"; // Wide, completely transparent at top

    const transformClass = isHidden
        ? "-translate-y-[150%] -translate-x-1/2 opacity-0"
        : "translate-y-0 -translate-x-1/2 opacity-100";

    return (
        <nav
            ref={navRef}
            className={`fixed left-1/2 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${transformClass} ${glassClass}`}
        >
            <div className={`flex items-center justify-between h-16 transition-all duration-700 ${isScrolled ? "px-6 md:px-10" : "px-8 md:px-16"}`}>
                {/* Logo */}
                <a
                    href="/"
                    className="font-display text-xl md:text-2xl tracking-[0.28em] font-semibold uppercase transition-colors duration-500"
                    style={{ color: logoColor }}
                >
                    Emerald
                </a>

                {/* Desktop Links */}
                <ul className="hidden md:flex items-center gap-10">
                    {navLinks.map((link, i) => (
                        <li key={link.name}>
                            <a
                                href={link.href}
                                ref={(el) => { linkRefs.current[i] = el; }}
                                className="font-body text-[11px] tracking-[0.3em] uppercase font-light cursor-pointer transition-colors duration-500 inline-block"
                                style={{ color: textColor }}
                            >
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Hamburger */}
                <button
                    className="md:hidden flex flex-col justify-center items-center gap-[6px] w-8 h-8 z-[60]"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Menu"
                >
                    <span
                        className="block transition-all duration-500 ease-in-out"
                        style={{
                            width: "22px",
                            height: "1px",
                            background: isMobileMenuOpen ? "var(--gold)" : textColor,
                            transform: isMobileMenuOpen ? "translateY(7px) rotate(45deg)" : "translateY(0) rotate(0)",
                        }}
                    />
                    <span
                        className="block transition-all duration-500 ease-in-out"
                        style={{
                            width: "16px",
                            height: "1px",
                            background: isMobileMenuOpen ? "transparent" : textColor,
                            opacity: isMobileMenuOpen ? 0 : 1,
                        }}
                    />
                    <span
                        className="block transition-all duration-500 ease-in-out"
                        style={{
                            width: "22px",
                            height: "1px",
                            background: isMobileMenuOpen ? "var(--gold)" : textColor,
                            transform: isMobileMenuOpen ? "translateY(-7px) rotate(-45deg)" : "translateY(0) rotate(0)",
                        }}
                    />
                </button>
            </div>

            {/* --- Mobile Menu Overlay --- */}
            <div
                className={`fixed inset-0 min-h-screen bg-[var(--forest)] z-50 flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
                    }`}
                style={{ pointerEvents: isMobileMenuOpen ? "auto" : "none" }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,25,18,0.9)] to-[var(--forest)]" />

                <ul className="relative z-10 flex flex-col items-center gap-10">
                    {navLinks.map((link) => (
                        <li key={link.name} className="overflow-hidden">
                            <a
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="font-display text-4xl font-light italic tracking-wider uppercase transition-colors duration-500 transition-transform block"
                                style={{
                                    color: "var(--gold-light)",
                                    transform: isMobileMenuOpen ? "translateY(0)" : "translateY(100%)",
                                    transitionDelay: isMobileMenuOpen ? "300ms" : "0ms"
                                }}
                            >
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>

                <p className="absolute bottom-10 font-body text-[9px] tracking-[0.4em] uppercase font-light text-[var(--gold)] opacity-60">
                    Emerald &nbsp;·&nbsp; London
                </p>
            </div>
        </nav>
    );
}
