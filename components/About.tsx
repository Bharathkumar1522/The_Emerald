"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const imageInnerRef = useRef<HTMLDivElement>(null);
    const textColRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLAnchorElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const section = sectionRef.current;
        if (!section) return;

        // Subtle image parallax
        if (imageInnerRef.current) {
            gsap.fromTo(imageInnerRef.current,
                { y: "-6%" },
                {
                    y: "6%", ease: "none",
                    scrollTrigger: {
                        trigger: section, start: "top bottom", end: "bottom top", scrub: 1.4,
                    },
                }
            );
        }

        // Text column parallax
        if (textColRef.current) {
            gsap.fromTo(textColRef.current,
                { y: "15%" },
                {
                    y: "-15%", ease: "none",
                    scrollTrigger: {
                        trigger: section, start: "top bottom", end: "bottom top", scrub: 1.2,
                    },
                }
            );
        }

        const st = { trigger: section, start: "top 72%", toggleActions: "play none none none" };

        if (headingRef.current) {
            gsap.fromTo(headingRef.current, { y: 48, opacity: 0 }, { y: 0, opacity: 1, duration: 1.6, ease: "expo.out", scrollTrigger: st });
        }
        if (bodyRef.current) {
            gsap.fromTo(bodyRef.current, { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, delay: 0.15, ease: "expo.out", scrollTrigger: st });
        }
        if (statsRef.current) {
            gsap.fromTo(statsRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1.4, delay: 0.3, ease: "expo.out", scrollTrigger: st });
        }
        if (ctaRef.current) {
            gsap.fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1.4, delay: 0.45, ease: "expo.out", scrollTrigger: st });
        }
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            id="about"
            data-nav-theme="dark"
            className="relative overflow-hidden flex flex-col justify-center min-h-screen lg:min-h-[115vh] py-20 lg:py-0"
            style={{
                background: "var(--forest)",
                boxShadow: "0 -24px 64px rgba(0,0,0,0.6)",
            }}
        >
            {/*
             * LAYOUT — two equal columns, both fill the same height.
             * Left: flex-col justify-between to evenly space text top-to-bottom.
             * Right: image stretches to match the left column height.
             * Uniform padding on all sides keeps it visually balanced.
             */}
            <div
                className="relative z-10 max-w-screen-xl mx-auto flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-0 flex-1 items-stretch w-full px-6 md:px-12 lg:px-20"
            >
                {/* ── LEFT: text column ─────────────────────────────────── */}
                <div ref={textColRef} className="flex flex-col justify-center py-0 lg:py-12 pr-0 lg:pr-12 gap-12 lg:gap-16">

                    {/* Top: kicker + heading */}
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-5 h-px" style={{ background: "var(--gold)", opacity: 0.38 }} />
                            <p className="font-body text-[8px] tracking-[0.5em] uppercase font-light"
                                style={{ color: "var(--gold)", opacity: 0.75 }}>
                                Heritage &nbsp;·&nbsp; Craft &nbsp;·&nbsp; Legacy
                            </p>
                        </div>

                        <div className="overflow-hidden">
                            <h2
                                ref={headingRef}
                                className="font-display font-light leading-[0.92]"
                                style={{
                                    fontSize: "clamp(1.9rem, 3vw, 3rem)",
                                    color: "var(--gold-light)",
                                    letterSpacing: "0.025em",
                                    opacity: 0,
                                }}
                            >
                                A Legacy of
                                <br />
                                <em className="italic" style={{ color: "var(--gold)" }}>Precision.</em>
                            </h2>
                        </div>

                        <div className="mt-5 w-8 h-px" style={{ background: "var(--gold)", opacity: 0.3 }} />
                    </div>

                    {/* Middle: body text */}
                    <div ref={bodyRef} style={{ opacity: 0 }}>
                        <p
                            className="font-body font-light leading-[1.9]"
                            style={{
                                fontSize: "clamp(0.72rem, 0.9vw, 0.84rem)",
                                color: "var(--alabaster)",
                                opacity: 0.82,
                                letterSpacing: "0.04em",
                                maxWidth: "38ch",
                            }}
                        >
                            Since our founding, each Emerald garment has been conceived
                            as a counterpoint to disposability — a deliberate act of
                            permanence in an age of excess.
                        </p>
                        <p
                            className="font-body font-light leading-[1.9] mt-4"
                            style={{
                                fontSize: "clamp(0.72rem, 0.9vw, 0.84rem)",
                                color: "var(--alabaster)",
                                opacity: 0.82,
                                letterSpacing: "0.04em",
                                maxWidth: "38ch",
                            }}
                        >
                            Our craftsmen in Naples and Savile Row work from rare wools,
                            hand-loomed silks, and leathers aged for form.
                        </p>
                    </div>

                    {/* Bottom: stats + CTA */}
                    <div>
                        {/* Stats */}
                        <div ref={statsRef} className="flex gap-8 mb-8" style={{ opacity: 0 }}>
                            {[["1897", "Est."], ["40+", "Artisans"], ["100%", "Handmade"]].map(([n, l]) => (
                                <div key={n}>
                                    <p className="font-display font-light leading-none mb-1"
                                        style={{ fontSize: "clamp(1.3rem, 1.8vw, 1.8rem)", color: "var(--gold-light)", letterSpacing: "0.03em" }}>
                                        {n}
                                    </p>
                                    <p className="font-body text-[7px] tracking-[0.4em] uppercase font-light"
                                        style={{ color: "var(--gold)", opacity: 0.75 }}>
                                        {l}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <a ref={ctaRef} href="#"
                            className="inline-flex items-center gap-4 group w-fit"
                            style={{ opacity: 0 }}>
                            <span className="font-body text-[8px] tracking-[0.42em] uppercase font-light"
                                style={{ color: "var(--gold)" }}>
                                Our Story
                            </span>
                            <span className="block h-px w-6 transition-all duration-500 group-hover:w-10"
                                style={{ background: "var(--gold)" }} />
                        </a>
                    </div>
                </div>

                {/* ── RIGHT: image fills full column height ─────────────── */}
                <div className="relative w-full aspect-[4/5] lg:aspect-auto mt-4 lg:mt-0">
                    {/* Accent frame */}
                    <div
                        className="absolute -top-3 -right-3 w-3/4 h-[55%] z-0"
                        style={{ border: "1px solid rgba(212,180,131,0.1)", borderRadius: "1px" }}
                    />

                    {/* Image — fills full height of the left column via `position:absolute; inset:0` trick */}
                    <div
                        className="relative overflow-hidden rounded-[2px] h-full"
                        style={{ minHeight: "100%" }}
                    >
                        <div
                            ref={imageInnerRef}
                            className="absolute inset-[-6%] w-[112%] h-[112%]"
                        >
                            <Image
                                src="/about.png"
                                alt="Emerald — A legacy of precision"
                                fill
                                className="object-cover"
                                style={{ objectPosition: "center top" }}
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </div>

                        {/* Subtle green tint */}
                        <div className="absolute inset-0"
                            style={{ background: "rgba(16,42,29,0.1)", mixBlendMode: "multiply" }} />

                        {/* Bottom gradient */}
                        <div className="absolute inset-0"
                            style={{ background: "linear-gradient(to top, rgba(16,42,29,0.5) 0%, transparent 40%)" }} />

                        {/* Stat badge */}
                        <div
                            className="absolute bottom-5 left-5 px-5 py-3.5"
                            style={{
                                background: "rgba(8,18,12,0.94)",
                                border: "1px solid rgba(212,180,131,0.14)",
                                backdropFilter: "blur(12px)",
                            }}
                        >
                            <p className="font-display font-light leading-none"
                                style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.5rem)", color: "var(--gold-light)", letterSpacing: "0.06em" }}>
                                Est. <span style={{ color: "var(--gold)" }}>1897</span>
                            </p>
                            <p className="font-body font-light text-[7px] tracking-[0.4em] uppercase mt-1.5"
                                style={{ color: "var(--gold)", opacity: 0.75 }}>
                                London, England
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
