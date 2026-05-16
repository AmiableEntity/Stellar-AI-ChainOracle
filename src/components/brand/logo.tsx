import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const sizes = {
  sm: { icon: 24, text: "text-sm" },
  md: { icon: 32, text: "text-lg" },
  lg: { icon: 48, text: "text-2xl" },
};

/**
 * Stellar AI ChainOracle logo component.
 * Uses an SVG star/orbit motif inspired by the Stellar brand.
 */
export function Logo({ className, size = "md", showText = true }: LogoProps) {
  const { icon, text } = sizes[size];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Icon */}
      <div className="relative flex-shrink-0" style={{ width: icon, height: icon }}>
        <svg
          width={icon}
          height={icon}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Outer orbit ring */}
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="url(#stellarGradient)"
            strokeWidth="1.5"
            strokeDasharray="4 2"
            opacity="0.6"
          />
          {/* Inner glow circle */}
          <circle cx="24" cy="24" r="10" fill="url(#stellarGradient)" opacity="0.15" />
          {/* Star shape */}
          <path
            d="M24 8L26.5 18.5H37.5L28.5 25L31 35.5L24 29L17 35.5L19.5 25L10.5 18.5H21.5L24 8Z"
            fill="url(#stellarGradient)"
          />
          {/* Orbit dot */}
          <circle cx="40" cy="16" r="2.5" fill="url(#stellarGradient)" />
          <defs>
            <linearGradient id="stellarGradient" x1="0" y1="0" x2="48" y2="48">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Text */}
      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className={cn(
              "font-bold tracking-tight bg-gradient-to-r from-stellar-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent",
              text
            )}
          >
            ChainOracle
          </span>
          <span className="text-[10px] text-muted-foreground tracking-widest uppercase">
            Stellar AI
          </span>
        </div>
      )}
    </div>
  );
}
