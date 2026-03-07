import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    style: ["normal", "italic"],
    variable: "--font-cormorant",
    display: "swap",
});

const jost = Jost({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500"],
    variable: "--font-jost",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Emerald — Old Money Luxury",
    description: "A legacy of precision. Timeless garments crafted for the discerning few.",
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
            <body className="font-body antialiased">
                <LenisProvider>{children}</LenisProvider>
            </body>
        </html>
    );
}
