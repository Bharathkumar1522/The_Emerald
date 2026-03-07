"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const TOTAL_FRAMES = 240;
const FRAME_PATH = (i: number) => `/frames/frame_${String(i).padStart(4, "0")}.webp`;

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

        // Start preloading images in the background
        let loadedCount = 0;
        const totalToLoad = TOTAL_FRAMES;

        for (let i = 0; i < totalToLoad; i++) {
            const img = new Image();
            if (i < 15) img.fetchPriority = "high"; // Prioritize first few frames

            img.onload = () => {
                loadedCount++;
                const newProgress = Math.round((loadedCount / totalToLoad) * 100);
                setProgress(newProgress);

                // Animate progress bar dynamically as images load
                gsap.to(progressRef.current, { width: `${newProgress}%`, duration: 0.2 });

                if (loadedCount === totalToLoad) {
                    // All frames loaded! Proceed to hide screen.
                    gsap.delayedCall(0.4, finishLoading);
                }
            };
            img.onerror = () => {
                // If an image fails, still count it so we don't hang forever
                loadedCount++;
                if (loadedCount === totalToLoad) gsap.delayedCall(0.4, finishLoading);
            };
            img.src = FRAME_PATH(i + 1);
        }

        function finishLoading() {
            const outTl = gsap.timeline({
                onComplete: () => onComplete()
            });
            outTl.to(textRef.current, {
                y: -20,
                opacity: 0,
                duration: 0.8,
                ease: "power2.in",
            })
                .to(containerRef.current, {
                    yPercent: -100,
                    duration: 1.2,
                    ease: "expo.inOut",
                }, "-=0.4");
        }

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
