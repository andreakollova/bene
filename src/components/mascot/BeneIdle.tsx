"use client";

interface BeneIdleProps {
  size?: number;
  className?: string;
}

export default function BeneIdle({ size = 160, className = "" }: BeneIdleProps) {
  return (
    <svg
      width={size}
      height={size * 1.2}
      viewBox="0 0 200 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ animation: "beneBreath 2s ease-in-out infinite" }}
    >
      <style>{`
        @keyframes beneBreath {
          0%, 100% { transform: scale(1.0); }
          50% { transform: scale(1.02); }
        }
      `}</style>

      {/* Ground shadow */}
      <ellipse cx="100" cy="228" rx="35" ry="6" fill="#3D3929" opacity="0.12" />

      {/* Left shoe */}
      <ellipse cx="84" cy="220" rx="14" ry="7" fill="#64775A" />
      {/* Right shoe */}
      <ellipse cx="116" cy="220" rx="14" ry="7" fill="#64775A" />

      {/* Left leg */}
      <rect x="79" y="200" width="10" height="22" rx="5" fill="#64775A" />
      {/* Right leg */}
      <rect x="111" y="200" width="10" height="22" rx="5" fill="#64775A" />

      {/* Body — sharp point at top, round bottom */}
      <path
        d="M100 20 L72 118 Q62 178 100 188 Q138 178 128 118 Z"
        fill="#7C9070"
      />

      {/* Left arm — thin line, relaxed at side */}
      <path
        d="M72 130 Q54 148 50 168"
        stroke="#64775A"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />

      {/* Right arm — thin line, relaxed at side */}
      <path
        d="M128 130 Q146 148 150 168"
        stroke="#64775A"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />

      {/* Left eye white */}
      <circle cx="86" cy="100" r="14" fill="#FAF9F5" />
      {/* Right eye white */}
      <circle cx="114" cy="100" r="14" fill="#FAF9F5" />

      {/* Left pupil */}
      <circle cx="88" cy="103" r="9" fill="#3D3929" />
      {/* Right pupil */}
      <circle cx="116" cy="103" r="9" fill="#3D3929" />

      {/* Left eye highlight */}
      <circle cx="92" cy="98" r="3.5" fill="#FAF9F5" />
      {/* Right eye highlight */}
      <circle cx="120" cy="98" r="3.5" fill="#FAF9F5" />

      {/* Mouth — small gentle smile */}
      <path
        d="M90 120 Q100 128 110 120"
        stroke="#3D3929"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Left cheek blush */}
      <ellipse cx="72" cy="115" rx="9" ry="6" fill="#D9A26A" opacity="0.55" />
      {/* Right cheek blush */}
      <ellipse cx="128" cy="115" rx="9" ry="6" fill="#D9A26A" opacity="0.55" />
    </svg>
  );
}
