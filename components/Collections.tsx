"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const collections = [
    {
        id: 1,
        image: "/collection-1.png",
        name: "The Meridian",
        season: "Autumn / Winter 2024",
        tag: "Heritage Wool",
        desc: "Structured precision. Uncompromising warmth.",
        number: "01",
    },
    {
        id: 2,
        image: "/collection-2.png",
        name: "The Sable Edit",
        season: "Capsule — No. 7",
        tag: "Italian Cashmere",
        desc: "Hand-loomed in Como. Worn for generations.",
        number: "02",
    },
    {
        id: 3,
        image: "/collection-3.png",
        name: "The Verdant",
        season: "Spring / Summer 2025",
        tag: "Reclaimed Linen",
        desc: "Light enough for summer. Lasting enough for always.",
        number: "03",
    },
    {
        id: 4,
        image: "/collection-4.png",
        name: "The Ardour",
        season: "Resort 2025",
        tag: "Raw Silk",
        desc: "Draped in heat. Defined by restraint.",
        number: "04",
    },
    {
        id: 5,
        image: "/collection-5.png",
        name: "The Nightfall",
        season: "Pre-Fall 2025",
        tag: "Obsidian Velvet",
        desc: "After dark. Unforgettable.",
        number: "05",
    },
];


export default function Collections() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const headerWrapperRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track) return;

        // Subtle parallax on the header as the section enters the viewport
        if (headerWrapperRef.current) {
            gsap.fromTo(headerWrapperRef.current,
                { y: "15%" },
                {
                    y: "-5%", ease: "none",
                    scrollTrigger: {
                        trigger: section, start: "top bottom", end: "top top", scrub: 1.2,
                    },
                }
            );
        }

        // Header reveal
        if (headerRef.current) {
            gsap.fromTo(headerRef.current,
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1.6, ease: "expo.out",
                    scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none none" },
                }
            );
        }

        // Horizontal scroll
        const totalScroll = track.scrollWidth - window.innerWidth;
        gsap.to(track, {
            x: -totalScroll,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => `+=${totalScroll + window.innerWidth * 0.3}`,
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            },
        });
    }, { scope: sectionRef });

    return (
        /*
         * LAYOUT STRATEGY — flex-column fills 100vh cleanly:
         *   header  → compact, auto height
         *   track   → flex-1, cards fill all remaining space
         * No overflow-hidden on section so GSAP pin spacer doesn't clip.
         */
        <section
            ref={sectionRef}
            id="collections"
            data-nav-theme="light"
            className="relative flex flex-col noise-texture"
            style={{
                background: "var(--cream)",
                boxShadow: "0 -20px 60px rgba(0,0,0,0.18)",
                minHeight: "100vh",
            }}
        >
            {/* Radial texture */}
            <div className="absolute inset-0 pointer-events-none" style={{
                background: "radial-gradient(ellipse at 12% 50%, rgba(16,42,29,0.06) 0%, transparent 55%), radial-gradient(ellipse at 88% 20%, rgba(212,180,131,0.08) 0%, transparent 50%)"
            }} />

            {/* ── Section header — compact ───────────────────────────── */}
            <div ref={headerWrapperRef}>
                <div
                    ref={headerRef}
                    className="relative z-10 flex-shrink-0 opacity-0 px-6 md:px-16 lg:px-24"
                    style={{ paddingTop: "clamp(28px, 4vh, 48px)", paddingBottom: "clamp(12px, 1.8vh, 24px)" }}
                >
                    <div className="flex items-end justify-between max-w-[1600px] mx-auto">
                        <div>
                            <div className="flex items-center gap-4 mb-2">
                                <div className="w-5 h-px" style={{ background: "var(--forest)", opacity: 0.35 }} />
                                <p className="font-body text-[8px] tracking-[0.52em] uppercase font-light"
                                    style={{ color: "var(--forest)", opacity: 0.65 }}>
                                    The Wardrobe
                                </p>
                            </div>
                            <h2
                                className="font-display font-light leading-[0.9]"
                                style={{
                                    fontSize: "clamp(1.8rem, 3.2vw, 3rem)",
                                    color: "var(--forest)",
                                    letterSpacing: "0.02em",
                                }}
                            >
                                The Collections
                            </h2>
                        </div>
                        <p className="hidden md:block font-body text-[8px] tracking-[0.35em] uppercase font-light mb-1"
                            style={{ color: "var(--forest)", opacity: 0.5 }}>
                            ← Scroll to explore
                        </p>
                    </div>
                </div>
            </div>

            {/* ── Horizontal scroll track — flex-1 fills remaining height ── */}
            <div
                ref={trackRef}
                className="relative z-10 flex items-stretch flex-1"
                style={{
                    gap: "clamp(12px, 1.4vw, 24px)",
                    paddingLeft: "max(clamp(24px, 6vw, 96px), calc((100vw - 1600px) / 2))",
                    paddingRight: "max(clamp(24px, 6vw, 96px), calc((100vw - 1600px) / 2))",
                    paddingBottom: "clamp(16px, 2.5vh, 32px)",
                    width: "max-content",
                    minHeight: 0,
                }}
            >
                {collections.map((col) => (
                    <LookbookCard key={col.id} {...col} />
                ))}

                {/* View All */}
                <div
                    className="flex-shrink-0 flex flex-col items-center justify-center gap-5 self-stretch"
                    style={{
                        width: "clamp(180px, 20vw, 240px)",
                        border: "1px solid rgba(16,42,29,0.12)",
                        background: "rgba(16,42,29,0.02)",
                    }}
                >
                    <p className="font-display font-light italic text-center px-4"
                        style={{ fontSize: "clamp(1.2rem, 1.8vw, 1.8rem)", color: "var(--forest)", letterSpacing: "0.02em" }}>
                        All Collections
                    </p>
                    <a href="#"
                        className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-forest hover:text-cream"
                        style={{ border: "1px solid var(--forest)", color: "var(--forest)" }}>
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                            <path d="M2 8h12M8 2l6 6-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}

/* ─── Lookbook Card ────────────────────────────────────────────────────────── */
function LookbookCard({ image, name, season, tag, desc, number }: {
    image: string; name: string; season: string; tag: string; desc: string; number: string;
}) {
    const imgDivRef = useRef<HTMLDivElement>(null);

    const onEnter = () => gsap.to(imgDivRef.current, { scale: 1.04, duration: 1.4, ease: "expo.out" });
    const onLeave = () => gsap.to(imgDivRef.current, { scale: 1, duration: 1.4, ease: "expo.out" });

    return (
        <div
            className="flex-shrink-0 group cursor-pointer self-stretch"
            style={{ width: "clamp(260px, 32vw, 360px)" }}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
        >
            {/* Image wrapper fills the full height of the track row */}
            <div className="relative overflow-hidden rounded-[2px] h-full">
                <div
                    ref={imgDivRef}
                    className="absolute inset-0 w-full h-full"
                    style={{ transformOrigin: "center 30%" }}
                >
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 260px, 360px"
                    />
                </div>

                {/* Gradient — covers bottom third */}
                <div className="absolute inset-0 pointer-events-none" style={{
                    background: "linear-gradient(to top, rgba(10,25,18,0.88) 0%, rgba(10,25,18,0.08) 42%, transparent 62%)"
                }} />

                {/* Top material tag */}
                <span
                    className="absolute top-4 left-4 font-body text-[7px] tracking-[0.3em] uppercase font-light px-2.5 py-1"
                    style={{ background: "rgba(10,25,18,0.72)", color: "var(--gold)", backdropFilter: "blur(8px)" }}
                >
                    {tag}
                </span>

                {/* Collection number */}
                <span
                    className="absolute top-4 right-4 font-display font-light"
                    style={{ fontSize: "clamp(1rem, 1.6vw, 1.4rem)", color: "rgba(212,180,131,0.25)", letterSpacing: "0.05em" }}
                >
                    {number}
                </span>

                {/* Bottom info — always visible */}
                <div className="absolute bottom-0 left-0 right-0 px-5 py-5 md:px-6 md:py-6">
                    {/* Static */}
                    <div className="group-hover:opacity-0 transition-opacity duration-300">
                        <p className="font-body text-[7px] tracking-[0.3em] uppercase font-light mb-1.5"
                            style={{ color: "var(--gold)", opacity: 0.85 }}>
                            {season}
                        </p>
                        <h3
                            className="font-display font-light leading-tight"
                            style={{ fontSize: "clamp(1rem, 1.8vw, 1.5rem)", color: "var(--gold-light)", letterSpacing: "0.02em" }}
                        >
                            {name}
                        </h3>
                    </div>

                    {/* Hover */}
                    <div className="absolute bottom-5 left-5 right-5 md:bottom-6 md:left-6 md:right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        <p className="font-body text-[8px] tracking-[0.2em] font-light mb-3.5 leading-[1.8]"
                            style={{ color: "var(--gold)", opacity: 0.95 }}>
                            {desc}
                        </p>
                        <a href="#" className="inline-flex items-center gap-2.5 font-body text-[8px] tracking-[0.3em] uppercase font-light group/cta">
                            <span style={{ color: "var(--gold-light)" }}>Explore</span>
                            <span className="block h-px transition-all duration-500 w-3 group-hover/cta:w-8"
                                style={{ background: "var(--gold-light)" }} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
