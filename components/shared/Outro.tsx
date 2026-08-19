import { profile } from "@/lib/data";

export default function Outro() {
  return (
    <footer className="section pt-0">
      <div className="section-inner flex flex-col items-center gap-6 border-t border-white/10 py-10 text-center">
        <p className="font-display text-xl text-white">
          Let&apos;s build something worth shipping.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 font-mono text-xs text-muted">
          <a href={`mailto:${profile.email}`} className="hover:text-emerald">
            {profile.email}
          </a>
          <span>·</span>
          <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-emerald">
            GitHub
          </a>
          <span>·</span>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-emerald">
            LinkedIn
          </a>
        </div>
        <p className="font-mono text-[11px] text-muted/60">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js, React Three Fiber &amp; GSAP.
        </p>
      </div>
    </footer>
  );
}
