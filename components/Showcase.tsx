"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Showcase() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const imageInnerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const section = sectionRef.current;
        if (!section) return;

        // Background is now purely fixed via CSS, so we removed the GSAP image parallax here.

        // Text reveal & Parallax (different speed than background)
        if (contentRef.current) {
            // Initial reveal
            gsap.fromTo(contentRef.current,
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1.4, ease: "back.out(1.2)",
                    scrollTrigger: {
                        trigger: section, start: "top 75%", toggleActions: "play none none none"
                    }
                }
            );

            // Continuous parallax scroll for text (moves slightly slower/faster than scroll
            // gives that separated layer feel)
            gsap.fromTo(contentRef.current,
                { y: "15%" },
                {
                    y: "-15%", ease: "none",
                    scrollTrigger: {
                        trigger: section, start: "top bottom", end: "bottom top", scrub: 1.2
                    }
                }
            );
        }

    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="relative w-full h-[115vh] md:h-[130vh] flex items-center justify-center"
            style={{ clipPath: "inset(0)" }}
            data-nav-theme="dark"
        >
            {/* FIXED BACKGROUND 
                By using position: fixed inside a clip-path: inset(0) container,
                we perfectly recreate standard background-attachment: fixed but with
                the performance of Next.js Image! 
            */}
            <div className="fixed inset-0 w-full h-screen pointer-events-none z-0">
                <Image
                    src="/home.png"
                    alt="The Art of Tailoring"
                    fill
                    className="object-cover object-top"
                    unoptimized={true}
                />

                {/* Overlays to ensure text legibility */}
                <div className="absolute inset-0 z-0 bg-black/10" />
                <div className="absolute inset-0 z-0" style={{
                    background: "linear-gradient(to top, rgba(5,14,10,0.85) 0%, transparent 40%)"
                }} />
                <div className="absolute inset-0 z-0" style={{
                    background: "linear-gradient(to bottom, rgba(5,14,10,0.5) 0%, transparent 30%)"
                }} />
            </div>

            {/* Content */}
            <div ref={contentRef} className="relative z-10 text-center px-6 md:px-12 flex flex-col items-center">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-8 h-px" style={{ background: "var(--gold)", opacity: 0.5 }} />
                    <p className="font-body text-[10px] tracking-[0.4em] uppercase font-light"
                        style={{ color: "var(--gold)" }}>
                        Bespoke
                    </p>
                    <div className="w-8 h-px" style={{ background: "var(--gold)", opacity: 0.5 }} />
                </div>

                <h2
                    className="font-display font-light leading-[0.95] mb-8"
                    style={{
                        fontSize: "clamp(2.5rem, 6vw, 5rem)",
                        color: "var(--gold-light)",
                        letterSpacing: "0.02em",
                        textShadow: "0 4px 24px rgba(0,0,0,0.6)"
                    }}
                >
                    The Art of <br className="md:hidden" />
                    <em className="italic" style={{ color: "var(--gold)" }}>Tailoring.</em>
                </h2>

                <p
                    className="font-body font-light text-[12px] md:text-[14px] leading-[2]"
                    style={{
                        color: "var(--alabaster)",
                        opacity: 0.85,
                        letterSpacing: "0.05em",
                        maxWidth: "34rem",
                        textShadow: "0 2px 8px rgba(0,0,0,0.8)"
                    }}
                >
                    Every stitch a statement, every silhouette a masterpiece. Discover perfectly tailored suiting crafted for those who demand excellence.
                </p>

                <a href="#"
                    className="mt-10 inline-flex items-center gap-4 group">
                    <span className="font-body text-[9px] tracking-[0.4em] uppercase font-light"
                        style={{ color: "var(--gold)" }}>
                        Explore the House
                    </span>
                    <span className="block h-px w-8 transition-all duration-500 group-hover:w-16"
                        style={{ background: "var(--gold)" }} />
                </a>
            </div>
        </section>
    );
}
