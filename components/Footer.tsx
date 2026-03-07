"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const MARQUEE = "EMERALD  ·  ";

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null);
    const marqueeInner = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLHeadingElement>(null);

    useGSAP(
        () => {
            const footer = footerRef.current;
            const mInner = marqueeInner.current;
            if (!footer || !mInner) return;

            // Continuous marquee
            const mWidth = mInner.scrollWidth / 2;
            gsap.to(mInner, {
                x: -mWidth,
                duration: 28,
                ease: "none",
                repeat: -1,
            });

            // Parallax reveal: footer pin-like effect
            gsap.fromTo(
                footer,
                { yPercent: -5 },
                {
                    yPercent: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: footer,
                        start: "top bottom",
                        end: "top 30%",
                        scrub: 2,
                    },
                }
            );

            // Logo parallax
            if (logoRef.current) {
                gsap.fromTo(logoRef.current,
                    { y: "25%" },
                    {
                        y: "-15%", ease: "none",
                        scrollTrigger: {
                            trigger: footer, start: "top bottom", end: "bottom bottom", scrub: 1.5,
                        },
                    }
                );
            }
        },
        { scope: footerRef }
    );

    return (
        <footer
            ref={footerRef}
            id="contact"
            data-nav-theme="dark"
            className="relative overflow-hidden"
            style={{
                background: "var(--forest)",
                willChange: "transform",
                boxShadow: "0 -20px 60px rgba(0,0,0,0.45)",
            }}
        >
            {/* Footer bg image */}
            <div className="absolute inset-0 opacity-[0.15]">
                <Image
                    src="/footer.png"
                    alt="Emerald footer"
                    fill
                    className="object-cover object-center"
                    sizes="100vw"
                />
            </div>

            {/* Subtle noise overlay */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                    backgroundRepeat: "repeat",
                    backgroundSize: "180px",
                    opacity: 0.04,
                    mixBlendMode: "overlay",
                }}
            />

            {/* Gradient overlay to ensure text is perfectly readable over the image */}
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-[var(--forest)] via-[rgba(10,25,18,0.8)] to-transparent" />

            {/* Content */}
            <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20 pt-20 md:pt-32 pb-12">

                {/* --- TOP SECTION: Newsletter & Logo --- */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-16 mb-24">
                    {/* Newsletter Sign Up */}
                    <div className="w-full lg:max-w-md">
                        <p className="font-body text-[10px] tracking-[0.4em] uppercase font-light mb-6"
                            style={{ color: "var(--gold)", opacity: 0.8 }}>
                            The Emerald Society
                        </p>
                        <h3 className="font-display font-light text-2xl md:text-3xl mb-4"
                            style={{ color: "var(--alabaster)", letterSpacing: "0.03em" }}>
                            Join the Private List
                        </h3>
                        <p className="font-body font-light text-sm mb-8"
                            style={{ color: "var(--alabaster)", opacity: 0.7, lineHeight: 1.8 }}>
                            Receive invitations to private viewings, bespoke events, and early access to our seasonal capsules.
                        </p>

                        <form className="relative flex items-center border-b pb-2 group" style={{ borderColor: "rgba(212,180,131,0.3)" }}>
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full bg-transparent border-none outline-none font-body font-light text-sm placeholder:text-[rgba(212,180,131,0.5)] text-[var(--gold-light)]"
                            />
                            <button type="submit" className="font-body text-[9px] tracking-[0.2em] uppercase transition-colors duration-300 text-[var(--gold)] hover:text-[var(--cream)] pl-4">
                                Subscribe
                            </button>
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--gold)] transition-all duration-500 group-hover:w-full" />
                        </form>
                    </div>

                    {/* Massive Logo */}
                    <div className="text-left lg:text-right w-full" style={{ overflow: "hidden" }}>
                        <h2
                            ref={logoRef}
                            className="font-display font-light leading-none"
                            style={{
                                fontSize: "clamp(4.5rem, 16vw, 10rem)",
                                color: "var(--gold-light)",
                                letterSpacing: "-0.02em",
                                textShadow: "0 10px 30px rgba(0,0,0,0.5)"
                            }}
                        >
                            Emerald.
                        </h2>
                    </div>
                </div>

                {/* --- MIDDLE SECTION: Links & Info --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
                    {/* Column 1: Contact */}
                    <div>
                        <p className="font-body text-[9px] tracking-[0.4em] uppercase font-light mb-8"
                            style={{ color: "var(--gold)", opacity: 0.6 }}>
                            Contact
                        </p>
                        <ul className="space-y-4">
                            <li>
                                <a href="mailto:concierge@emeraldluxury.com" className="font-body font-light text-sm hover:text-[var(--gold-light)] transition-colors duration-500 ease-out" style={{ color: "var(--alabaster)", opacity: 0.85 }}>
                                    concierge@emeraldluxury.com
                                </a>
                            </li>
                            <li>
                                <a href="tel:+442071234567" className="font-body font-light text-sm hover:text-[var(--gold-light)] transition-colors duration-500 ease-out" style={{ color: "var(--alabaster)", opacity: 0.85 }}>
                                    +44 (0) 20 7123 4567
                                </a>
                            </li>
                            <li className="pt-4">
                                <p className="font-body font-light text-sm leading-relaxed" style={{ color: "var(--alabaster)", opacity: 0.6 }}>
                                    14 Mayfair Close<br />
                                    London, W1K 2HG<br />
                                    United Kingdom
                                </p>
                            </li>
                        </ul>
                    </div>

                    {/* Column 2: Ateliers */}
                    <div>
                        <p className="font-body text-[9px] tracking-[0.4em] uppercase font-light mb-8"
                            style={{ color: "var(--gold)", opacity: 0.6 }}>
                            Ateliers
                        </p>
                        <ul className="space-y-4">
                            {["London (Flagship)", "Milan", "New York", "Paris (Opening 2026)"].map(city => (
                                <li key={city}>
                                    <span className="font-body font-light text-sm" style={{ color: "var(--alabaster)", opacity: 0.85 }}>
                                        {city}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Navigate */}
                    <div>
                        <p className="font-body text-[9px] tracking-[0.4em] uppercase font-light mb-8"
                            style={{ color: "var(--gold)", opacity: 0.6 }}>
                            The House
                        </p>
                        <ul className="space-y-4">
                            {["Our Heritage", "The Collections", "Bespoke Services", "Philosophy", "Careers"].map(link => (
                                <li key={link}>
                                    <a href="#" className="font-body font-light text-sm hover:text-[var(--gold-light)] transition-all duration-500 ease-out hover:pl-2" style={{ color: "var(--alabaster)", opacity: 0.7 }}>
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Social */}
                    <div>
                        <p className="font-body text-[9px] tracking-[0.4em] uppercase font-light mb-8"
                            style={{ color: "var(--gold)", opacity: 0.6 }}>
                            Connect
                        </p>
                        <ul className="space-y-4">
                            {["Instagram", "Twitter / X", "LinkedIn", "Pinterest"].map(social => (
                                <li key={social}>
                                    <a href="#" className="font-body font-light text-sm flex items-center gap-3 group" style={{ color: "var(--alabaster)", opacity: 0.7 }}>
                                        <span className="w-4 h-[1px] bg-[var(--gold)] opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out group-hover:w-6" />
                                        <span className="group-hover:text-[var(--gold-light)] transition-colors duration-500 ease-out">{social}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* --- BOTTOM SECTION: Legal & Copyright --- */}
                <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6"
                    style={{ borderTop: "1px solid rgba(212,180,131,0.15)" }}>
                    <p
                        className="font-body font-light text-[10px] tracking-[0.2em]"
                        style={{ color: "var(--alabaster)", opacity: 0.5 }}
                    >
                        © {new Date().getFullYear()} EMERALD LUXURY. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                        {["Privacy Policy", "Terms of Service", "Cookie Settings", "Accessibility"].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="font-body font-light text-[10px] tracking-[0.2em] hover:text-[var(--gold-light)] transition-colors duration-500 ease-out"
                                style={{ color: "var(--alabaster)", opacity: 0.5 }}
                            >
                                {item.toUpperCase()}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
