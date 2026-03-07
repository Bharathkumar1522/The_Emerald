"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import LoadingScreen from "@/components/LoadingScreen";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import dynamic from "next/dynamic";

const About = dynamic(() => import("@/components/About"));
const Collections = dynamic(() => import("@/components/Collections"));
const Showcase = dynamic(() => import("@/components/Showcase"));
const Lifestyle = dynamic(() => import("@/components/Lifestyle"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Prevent FOUC: Hide the wrapper on SSR and only fade it in
    // after GSAP has correctly calculated the layout and Hero pin spacer.
    useGSAP(() => {
        if (!isLoading && wrapperRef.current) {
            gsap.to(wrapperRef.current, { autoAlpha: 1, duration: 0.1, ease: "none" });
        }
    }, [isLoading]);

    return (
        <main className="relative">
            {isLoading && (
                <LoadingScreen onComplete={() => setIsLoading(false)} />
            )}

            <Navbar />

            {/*
             * Hero owns its 100vh space. GSAP will add a 300vh pinSpacer below it
             * (so the pin animation has scroll distance). Total = 400vh before sections.
             *
             * By giving sections a margin-top of -200vh, About starts at 200vh from top.
             * At scroll=100vh → About bottom-edge is visible while hero is still pinned.
             * At scroll=200vh → About is half-over the hero.
             * At scroll=300vh → About fully covers hero (hero just unpins).
             *
             * This creates the cinematic "next section slides over the pinned hero" effect.
             */}
            <Hero />

            <div
                ref={wrapperRef}
                className="relative invisible"
                style={{
                    zIndex: 10,
                    marginTop: "-100vh",   // About enters viewport at 67% of hero pin — later enough to see video, early enough for stack
                }}
            >
                <About />
                <Collections />
                <Showcase />
                <Lifestyle />
                <Footer />
            </div>
        </main>
    );
}
