"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

const TOTAL_FRAMES = 240;
const FRAME_PATH = (i: number) =>
    `/frames/frame_${String(i).padStart(4, "0")}.webp`;

export default function Hero() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const frameRef = useRef({ current: 0 });
    const imagesRef = useRef<HTMLImageElement[]>([]);

    const phase1Ref = useRef<HTMLDivElement>(null);
    const phase2Ref = useRef<HTMLDivElement>(null);
    const phase3Ref = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);

    /* ─── Progressive frame preload ────────────────────────────────────── */
    useEffect(() => {
        const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

        const drawFrame = (index: number) => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            const img = images[index];
            if (!img?.complete || !img.naturalWidth) return;
            const { width, height } = canvas;
            const ir = img.naturalWidth / img.naturalHeight;
            const cr = width / height;
            let dw = width, dh = height, dx = 0, dy = 0;
            if (ir > cr) { dh = height; dw = height * ir; dx = (width - dw) / 2; }
            else { dw = width; dh = width / ir; dy = (height - dh) / 2; }
            ctx.clearRect(0, 0, width, height);
            ctx.drawImage(img, dx, dy, dw, dh);
        };

        (canvasRef as any).drawFrame = drawFrame;

        // Next.js (via LoadingScreen) has already downloaded the frames into the browser cache.
        // We just need to legally instantiate HTMLImageElement references so canvas can draw them.
        for (let i = 0; i < TOTAL_FRAMES; i++) {
            const img = new Image();
            img.src = FRAME_PATH(i + 1);
            if (i === 0) img.onload = () => drawFrame(0);
            images[i] = img;
        }

        imagesRef.current = images as HTMLImageElement[];

        let lastWidth = -1;
        const resize = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            // Mobile Optimization: When scrolling on phones, the address bar shows/hides,
            // triggering continuous `resize` events. Reassigning canvas.width clears the entire
            // canvas context, causing massive flickering. We block vertical-only resizes here.
            // The CSS `height: 100%` will simply stretch the canvas slightly, which is imperceptible.
            if (window.innerWidth === lastWidth && canvas.width > 0) return;

            lastWidth = window.innerWidth;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            drawFrame(frameRef.current.current);
        };
        resize();
        window.addEventListener("resize", resize);
        return () => { window.removeEventListener("resize", resize); };
    }, []);

    /* ─── GSAP: pinType:"transform" keeps the hero in document flow ─────
       Using CSS transforms (not position:fixed) means z-index works
       normally — the hero's z-index:0 stays BELOW the z-index:10
       wrapper that wraps About/Collections/etc in page.tsx.           */
    useGSAP(() => {
        const section = sectionRef.current;
        if (!section) return;

        // Use matchMedia to create responsive ScrollTrigger settings
        const mm = gsap.matchMedia();

        mm.add({
            isMobile: "(max-width: 768px)",
            isDesktop: "(min-width: 769px)"
        }, (context) => {
            const { isMobile } = context.conditions as { isMobile: boolean };

            // On mobile, the scroll distance is drastically reduced to roughly match the momentum 
            // of the rest of the document. This prevents the user from building up massive "swiping force" 
            // that accidentally slingshots them down the page once the video unpins.
            const scrollDistance = isMobile ? "+=350%" : "+=700%";

            const proxy = { frame: 0 };

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: scrollDistance,
                    scrub: 1.8,
                    pin: true,
                    anticipatePin: 1,
                    pinSpacing: true,
                },
                defaults: { ease: "none" },
            });

            /* ── Video frames (full duration) ───────────────────────────────── */
            tl.to(proxy, {
                frame: TOTAL_FRAMES - 1,
                snap: "frame",
                duration: 1,
                onUpdate: () => {
                    const idx = Math.round(proxy.frame);
                    frameRef.current.current = idx;
                    const draw = (canvasRef as any).drawFrame;
                    const imgs = imagesRef.current;

                    if (imgs[idx] && draw) {
                        requestAnimationFrame(() => draw(idx));
                    }
                },
            }, 0);

            const p1 = phase1Ref.current;
            const sc = scrollRef.current;
            const lb = labelRef.current;

            if (p1) {
                gsap.set(p1, { autoAlpha: 1, y: 0 });
                tl.to(p1, { autoAlpha: 0, y: -80, ease: "power2.in", duration: 0.07 }, 0.12);
            }
            if (sc) {
                gsap.set(sc, { autoAlpha: 1, y: 0 });
                tl.to(sc, { autoAlpha: 0, y: -20, ease: "power2.in", duration: 0.05 }, 0.10);
            }
            if (lb) {
                gsap.set(lb, { autoAlpha: 1, x: 0 });
                tl.to(lb, { autoAlpha: 0, x: 20, ease: "power2.in", duration: 0.05 }, 0.78);
            }

            const p2 = phase2Ref.current;
            if (p2) {
                tl.fromTo(p2,
                    { autoAlpha: 0, y: 80 },
                    { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.12 }, 0.20
                );
                tl.to(p2, { autoAlpha: 0, y: -80, ease: "power2.in", duration: 0.10 }, 0.46);
            }

            const p3 = phase3Ref.current;
            if (p3) {
                tl.fromTo(p3,
                    { autoAlpha: 0, y: 60 },
                    { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.12 }, 0.55
                );
                tl.to(p3, { autoAlpha: 0, y: -40, ease: "power2.in", duration: 0.10 }, 0.78);
            }
        });

        return () => mm.revert(); // clean up matchMedia on unmount

    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            data-nav-theme="dark"
            className="relative w-full h-screen overflow-hidden"
            style={{ background: "#050e0a", zIndex: 0 }}
        >
            {/* Video canvas — Hardware Accelerated */}
            <canvas
                ref={canvasRef}
                className="hero-canvas"
                style={{
                    willChange: "transform",
                    transform: "translateZ(0)" // Forces GPU acceleration on mobile
                }}
            />

            {/* Radial vignette */}
            <div className="absolute inset-0 pointer-events-none" style={{
                background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 30%, rgba(3,8,5,0.72) 100%)"
            }} />

            {/* Left horizontal gradient — text legibility */}
            <div className="absolute inset-0 pointer-events-none" style={{
                background: "linear-gradient(to right, rgba(3,8,5,0.65) 0%, transparent 55%)"
            }} />

            {/* Bottom gradient — blend into sections */}
            <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{
                background: "linear-gradient(to bottom, transparent, rgba(3,8,5,0.95))"
            }} />

            {/* ── Phase 1 — Brand Mark ──────────────────────────────────── */}
            <div
                ref={phase1Ref}
                className="absolute left-6 md:left-16 lg:left-24 bottom-16 md:bottom-20 pointer-events-none"
                style={{ willChange: "transform, opacity" }}
            >
                <p className="font-body text-[9px] md:text-[10px] tracking-[0.55em] uppercase mb-5 font-light"
                    style={{ color: "var(--gold)", opacity: 0.75 }}>
                    Est. MMXXIV &nbsp;·&nbsp; London
                </p>
                <h1
                    className="font-display font-light leading-[0.88] uppercase"
                    style={{
                        fontSize: "clamp(2.5rem, 7.5vw, 6.5rem)",
                        color: "var(--gold-light)",
                        letterSpacing: "0.06em",
                        textShadow: "0 2px 16px rgba(0,0,0,0.8)",
                    }}
                >
                    Emerald
                    <br />
                    <span className="italic font-light" style={{ color: "var(--gold)", fontSize: "0.78em", letterSpacing: "0.18em" }}>
                        Quality
                    </span>
                </h1>
                <div className="mt-7 h-px w-16 md:w-28" style={{ background: "var(--gold)", opacity: 0.45 }} />
                <p className="mt-5 font-body text-[9px] md:text-[10px] tracking-[0.38em] uppercase font-light leading-[2]"
                    style={{ color: "var(--alabaster)", opacity: 0.55 }}>
                    Timeless luxury<br className="hidden md:block" /> woven for the discerning few.
                </p>
            </div>

            {/* ── Phase 2 — Brand Story ─────────────────────────────────── */}
            <div
                ref={phase2Ref}
                className="absolute left-6 md:left-16 lg:left-24 bottom-16 md:bottom-20 pointer-events-none"
                style={{ willChange: "transform, opacity", visibility: "hidden", maxWidth: "46rem", paddingRight: "1rem" }}
            >
                <p className="font-body text-[9px] tracking-[0.55em] uppercase mb-6 font-light"
                    style={{ color: "var(--gold)", opacity: 0.7 }}>
                    Our Philosophy
                </p>
                <h2
                    className="font-display font-light uppercase leading-[0.9] mb-8"
                    style={{
                        fontSize: "clamp(2rem, 6.5vw, 5.5rem)",
                        color: "var(--gold-light)",
                        letterSpacing: "0.06em",
                        textShadow: "0 4px 24px rgba(0,0,0,0.95), 0 2px 6px rgba(0,0,0,1)",
                    }}
                >
                    The Essence<br />
                    <span className="italic" style={{ color: "var(--gold)", fontSize: "0.92em" }}>of Elegance</span>
                </h2>
                <div className="h-px w-20 mb-8" style={{ background: "var(--gold)", opacity: 0.55 }} />
                <p
                    className="font-body font-light leading-[2.1] text-[11px] md:text-[13px] lg:text-[14px]"
                    style={{
                        color: "var(--alabaster)",
                        opacity: 0.85,
                        letterSpacing: "0.08em",
                        textShadow: "0 2px 12px rgba(0,0,0,1)",
                        maxWidth: "38rem",
                    }}
                >
                    We redefine luxury through sustainable craft — each garment a testament to meticulous design, harmonizing timeless aesthetics with uncompromising quality.
                </p>
            </div>

            {/* ── Phase 3 — CTA ─────────────────────────────────────────── */}
            <div
                ref={phase3Ref}
                className="absolute left-6 md:left-16 lg:left-24 bottom-16 md:bottom-20"
                style={{ willChange: "transform, opacity", visibility: "hidden" }}
            >
                <p className="font-body text-[9px] tracking-[0.55em] uppercase mb-6 font-light"
                    style={{ color: "var(--gold)", opacity: 0.7 }}>
                    New Season — Spring 2025
                </p>
                <h2
                    className="font-display font-light uppercase leading-[0.9] mb-8"
                    style={{
                        fontSize: "clamp(2rem, 5.5vw, 4.8rem)",
                        color: "var(--gold-light)",
                        letterSpacing: "0.07em",
                        textShadow: "0 4px 24px rgba(0,0,0,0.95)",
                    }}
                >
                    Discover the<br />
                    <span className="italic" style={{ color: "var(--gold)", fontSize: "0.92em" }}>Collection</span>
                </h2>
                <div className="h-px w-20 mb-8" style={{ background: "var(--gold)", opacity: 0.55 }} />
                <a
                    href="/collections"
                    className="inline-flex items-center gap-4 font-body font-light text-[10px] md:text-[11px] tracking-[0.4em] uppercase"
                    style={{ color: "var(--gold-light)" }}
                >
                    <span
                        className="inline-flex items-center justify-center border px-8 py-3 transition-all duration-500 hover:bg-gold hover:text-charcoal"
                        style={{ borderColor: "rgba(212,180,131,0.55)" }}
                    >
                        Shop Now
                    </span>
                    <span style={{ opacity: 0.5 }}>↓</span>
                </a>
            </div>

            {/* ── Scroll indicator — bottom-right ───────────────────────── */}
            <div
                ref={scrollRef}
                className="absolute right-6 md:right-16 lg:right-24 bottom-16 md:bottom-20 flex flex-col items-center gap-3 pointer-events-none"
                style={{ willChange: "transform, opacity" }}
            >
                <span className="font-body text-[8px] tracking-[0.45em] uppercase"
                    style={{ color: "var(--gold)", opacity: 0.55, writingMode: "vertical-rl" }}>
                    Scroll
                </span>
                <div className="w-px h-16" style={{
                    background: "linear-gradient(to bottom, rgba(212,180,131,0.6), transparent)"
                }} />
            </div>

            {/* ── Right-side editorial label ─────────────────────────────── */}
            <div
                ref={labelRef}
                className="absolute right-6 md:right-16 lg:right-24 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 pointer-events-none"
                style={{ willChange: "transform, opacity" }}
            >
                <div className="w-px h-12" style={{ background: "rgba(212,180,131,0.35)" }} />
                <p
                    className="font-body text-[8px] tracking-[0.45em] uppercase font-light"
                    style={{ color: "var(--gold)", opacity: 0.45, writingMode: "vertical-rl" }}
                >
                    Emerald &nbsp;·&nbsp; Heritage &nbsp;·&nbsp; Craft
                </p>
                <div className="w-px h-12" style={{ background: "rgba(212,180,131,0.35)" }} />
            </div>
        </section>
    );
}
