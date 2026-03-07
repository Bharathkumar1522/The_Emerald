"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);

    useGSAP(() => {
        const tl = gsap.timeline();

        // Reveal the text smoothly
        tl.to(textRef.current, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "expo.out",
        });

        // Simulate a loading progress (e.g. while images/fonts load)
        tl.to(progressRef.current, {
            width: "100%",
            duration: 1.5,
            ease: "power2.inOut",
            onUpdate: function () {
                setProgress(Math.round(this.progress() * 100));
            }
        });

        // Hold for a beat, then slide everything up
        tl.to(textRef.current, {
            y: -20,
            opacity: 0,
            duration: 0.8,
            ease: "power2.in",
            delay: 0.2,
        });

        // Pull the curtain up
        tl.to(containerRef.current, {
            yPercent: -100,
            duration: 1.2,
            ease: "expo.inOut",
            onComplete: () => {
                onComplete();
            }
        }, "-=0.2");

    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center pointer-events-none"
            style={{ background: "var(--forest)", color: "var(--alabaster)" }}
        >
            <div className="flex flex-col items-center overflow-hidden">
                <h1
                    ref={textRef}
                    className="font-display font-light uppercase tracking-[0.2em]"
                    style={{
                        fontSize: "clamp(2rem, 5vw, 3rem)",
                        color: "var(--gold-light)",
                        opacity: 0,
                        transform: "translateY(20px)",
                    }}
                >
                    Emerald.
                </h1>

                <div className="mt-8 flex flex-col items-center gap-4">
                    <div className="w-32 h-[1px] bg-[rgba(212,180,131,0.2)] overflow-hidden">
                        <div
                            ref={progressRef}
                            className="h-full bg-[var(--gold)] w-0"
                        />
                    </div>
                    <p className="font-body text-[8px] tracking-[0.4em] font-light text-[var(--gold)] opacity-60">
                        {progress.toString().padStart(3, '0')}%
                    </p>
                </div>
            </div>
        </div>
    );
}
