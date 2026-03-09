"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Lifestyle() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headerWrapperRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const section = sectionRef.current;
        const heading = headingRef.current;
        const grid = gridRef.current;
        if (!section || !heading || !grid) return;

        if (headerWrapperRef.current) {
            gsap.fromTo(headerWrapperRef.current,
                { y: "10%" },
                {
                    y: "-10%", ease: "none",
                    scrollTrigger: {
                        trigger: section, start: "top bottom", end: "bottom top", scrub: 1.2,
                    },
                }
            );
        }

        gsap.fromTo(heading,
            { y: 64, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 1.8, ease: "expo.out",
                scrollTrigger: { trigger: section, start: "top 72%", toggleActions: "play none none none" },
            }
        );

        const cells = grid.querySelectorAll<HTMLElement>(".bento-cell");
        gsap.fromTo(cells,
            { y: 64, opacity: 0 },
            {
                y: 0, opacity: 1, stagger: 0.15, duration: 1.6, ease: "expo.out",
                scrollTrigger: { trigger: grid, start: "top 78%", toggleActions: "play none none none" },
            }
        );
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            id="lifestyle"
            data-nav-theme="dark"
            className="relative py-28 md:py-40"
            style={{
                background: "var(--charcoal)",
                boxShadow: "0 -20px 60px rgba(0,0,0,0.35)",
            }}
        >
            {/* Subtle grid texture */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.018]" style={{
                backgroundImage: "linear-gradient(rgba(212,180,131,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212,180,131,0.5) 1px, transparent 1px)",
                backgroundSize: "80px 80px",
            }} />

            <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">

                {/* ─── Header ───────────────────────────────────────────── */}
                <div ref={headerWrapperRef} className="mb-16 md:mb-20">
                    <div className="flex items-center gap-5 mb-5">
                        <div className="w-6 h-px" style={{ background: "var(--gold)", opacity: 0.45 }} />
                        <p className="font-body text-[9px] tracking-[0.52em] uppercase font-light"
                            style={{ color: "var(--gold)", opacity: 0.8 }}>
                            The Emerald Lifestyle
                        </p>
                    </div>
                    <h2
                        ref={headingRef}
                        className="font-display font-light leading-[0.9]"
                        style={{
                            fontSize: "clamp(3rem, 6vw, 6rem)",
                            color: "var(--gold-light)",
                            letterSpacing: "0.02em",
                            opacity: 0,
                        }}
                    >
                        Beyond the Garment.
                        <br />
                        <em className="italic font-light" style={{ color: "var(--gold)" }}>
                            The Details Endure.
                        </em>
                    </h2>
                </div>

                {/* ─── Bento grid ───────────────────────────────────────── */}
                <div
                    ref={gridRef}
                    className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4"
                >
                    {/* Tall left — 4 cols, 2 rows */}
                    <BentoCell
                        image="/perfume.png"
                        name="The Signature Scent"
                        category="Fragrance"
                        className="col-span-1 md:col-span-4 md:row-span-2"
                        tall
                    />

                    {/* Wide top-right — 8 cols, 1 row */}
                    <BentoCell
                        image="/shoes&bag.png"
                        name="Evening Elegance"
                        category="Velvet Heels & Clutch"
                        className="col-span-1 md:col-span-8"
                    />

                    {/* Bottom-right pair */}
                    <BentoCell
                        image="/shoes&clothformen.png"
                        name="The Executive Finish"
                        category="Oxfords & Tailored Trouser"
                        className="col-span-1 md:col-span-4"
                    />

                    <BentoCell
                        image={null}
                        name="Woven Heritage"
                        category="Silk Neckwear"
                        className="col-span-1 md:col-span-4"
                        typographic
                    />
                </div>
            </div>
        </section>
    );
}

/* ─── Bento Cell ────────────────────────────────────────────────────────────── */
function BentoCell({
    image, name, category, className = "", tall = false, typographic = false,
}: {
    image: string | null;
    name: string;
    category: string;
    className?: string;
    tall?: boolean;
    typographic?: boolean;
}) {
    const imgRef = useRef<HTMLDivElement>(null);

    const onEnter = () => gsap.to(imgRef.current, { scale: 1.05, duration: 1.4, ease: "expo.out" });
    const onLeave = () => gsap.to(imgRef.current, { scale: 1, duration: 1.4, ease: "expo.out" });

    const minH = tall
        ? "min-h-[480px] md:min-h-[660px]"
        : "min-h-[300px] md:min-h-[310px]";

    return (
        <div
            className={`bento-cell relative overflow-hidden group cursor-pointer rounded-[2px] ${className} ${minH}`}
            style={{ background: "rgba(255,255,255,0.03)" }}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
        >
            {typographic ? (
                /* ── Typographic tile ─────────────────────────────────── */
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
                    style={{
                        background: "linear-gradient(135deg, rgba(16,42,29,0.92) 0%, rgba(8,18,12,0.96) 100%)",
                        border: "1px solid rgba(212,180,131,0.14)",
                    }}
                >
                    <div className="w-px h-10 mb-7" style={{ background: "var(--gold)", opacity: 0.3 }} />
                    <p className="font-body text-[8px] tracking-[0.5em] uppercase font-light mb-5"
                        style={{ color: "var(--gold)", opacity: 0.75 }}>
                        {category}
                    </p>
                    <h3
                        className="font-display font-light italic leading-[1.1] mb-7"
                        style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.6rem)", color: "var(--gold-light)", letterSpacing: "0.02em" }}
                    >
                        {name}
                    </h3>
                    <div className="w-px h-10" style={{ background: "var(--gold)", opacity: 0.3 }} />

                    <a href="#"
                        className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-400 translate-y-0 md:translate-y-2 md:group-hover:translate-y-0">
                        <span className="font-body text-[8px] tracking-[0.35em] uppercase font-light"
                            style={{ color: "var(--gold)" }}>
                            Shop Details &nbsp;→
                        </span>
                    </a>
                </div>
            ) : (
                /* ── Image tile ─────────────────────────────────────────── */
                <>
                    <div ref={imgRef} className="absolute inset-0 w-full h-full" style={{ transformOrigin: "center center" }}>
                        <Image
                            src={image!}
                            alt={name}
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                    </div>

                    <div className="absolute inset-0 pointer-events-none" style={{
                        background: "linear-gradient(to top, rgba(5,14,10,0.9) 0%, rgba(5,14,10,0.15) 45%, transparent 65%)"
                    }} />

                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 transition-transform duration-400 ease-out group-hover:-translate-y-1.5">
                        <span className="block font-body text-[8px] tracking-[0.38em] uppercase font-light mb-1.5"
                            style={{ color: "var(--gold)", opacity: 0.85 }}>
                            {category}
                        </span>
                        <h3
                            className="font-display font-light"
                            style={{ fontSize: "clamp(1.2rem, 1.8vw, 1.6rem)", color: "var(--gold-light)", letterSpacing: "0.03em" }}
                        >
                            {name}
                        </h3>

                        <a href="#"
                            className="mt-3.5 inline-flex items-center gap-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                            <span className="font-body text-[8px] tracking-[0.3em] uppercase font-light"
                                style={{ color: "var(--gold)" }}>
                                Explore
                            </span>
                            <span className="block w-4 h-px" style={{ background: "var(--gold)" }} />
                        </a>
                    </div>
                </>
            )}
        </div>
    );
}
