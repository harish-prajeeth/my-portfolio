import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Harish Prajeeth A S — Full-Stack & ML Developer",
  description:
    "Portfolio of Harish Prajeeth A S — Full-Stack Developer, Machine Learning Developer, and Computer Science undergraduate. Knowledge distillation, computer vision, and full-stack engineering.",
  metadataBase: new URL("https://harishp20.vercel.app"),
  openGraph: {
    title: "Harish Prajeeth A S — Full-Stack & ML Developer",
    description:
      "Knowledge distillation, computer vision, and full-stack engineering — three internships, five shipped projects.",
    url: "https://harishp20.vercel.app",
    siteName: "Harish Prajeeth A S",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="min-h-full bg-bg text-white antialiased" suppressHydrationWarning>
        <div className="noise" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
