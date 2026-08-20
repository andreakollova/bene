"use client";

interface BeneCelebrateProps {
  size?: number;
  className?: string;
}

export default function BeneCelebrate({ size = 160, className = "" }: BeneCelebrateProps) {
  return (
    <svg
      width={size}
      height={size * 1.2}
      viewBox="0 0 200 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ animation: "beneBounce 0.6s ease-in-out infinite alternate" }}
    >
      <style>{`
        @keyframes beneBounce {
          0% { transform: translateY(0px) scale(1, 1); }
          100% { transform: translateY(-10px) scale(1.02, 0.98); }
        }
      `}</style>

      {/* Ground shadow */}
      <ellipse cx="100" cy="228" rx="35" ry="6" fill="#3D3929" opacity="0.12" />

      {/* Body shifted up for jump — whole character group */}
      <g transform="translate(0, -14)">
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

        {/* Left arm — thrown up high in joy */}
        <path
          d="M72 128 Q44 90 40 50"
          stroke="#64775A"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />

        {/* Right arm — thrown up high */}
        <path
          d="M128 128 Q156 90 160 50"
          stroke="#64775A"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />

        {/* Left eye white */}
        <circle cx="86" cy="100" r="14" fill="#FAF9F5" />
        {/* Right eye white */}
        <circle cx="114" cy="100" r="14" fill="#FAF9F5" />

        {/* Left pupil — looking up */}
        <circle cx="86" cy="97" r="9" fill="#3D3929" />
        {/* Right pupil */}
        <circle cx="114" cy="97" r="9" fill="#3D3929" />

        {/* Left eye highlight */}
        <circle cx="90" cy="93" r="3.5" fill="#FAF9F5" />
        {/* Right eye highlight */}
        <circle cx="118" cy="93" r="3.5" fill="#FAF9F5" />

        {/* Big open smile */}
        <path
          d="M86 120 Q100 136 114 120"
          stroke="#3D3929"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        {/* Smile fill */}
        <path
          d="M88 121 Q100 134 112 121 Q100 138 88 121 Z"
          fill="#3D3929"
        />

        {/* Left cheek blush — bright */}
        <ellipse cx="72" cy="115" rx="9" ry="6" fill="#D9A26A" opacity="0.7" />
        {/* Right cheek blush */}
        <ellipse cx="128" cy="115" rx="9" ry="6" fill="#D9A26A" opacity="0.7" />
      </g>

      {/* Ochre spark dots and lines around body */}
      <circle cx="30" cy="96" r="3" fill="#D9A26A" />
      <line x1="36" y1="88" x2="26" y2="80" stroke="#D9A26A" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="28" y1="106" x2="16" y2="106" stroke="#D9A26A" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="36" y1="118" x2="26" y2="126" stroke="#D9A26A" strokeWidth="2.5" strokeLinecap="round" />

      <circle cx="170" cy="96" r="3" fill="#D9A26A" />
      <line x1="164" y1="88" x2="174" y2="80" stroke="#D9A26A" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="172" y1="106" x2="184" y2="106" stroke="#D9A26A" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="164" y1="118" x2="174" y2="126" stroke="#D9A26A" strokeWidth="2.5" strokeLinecap="round" />

      <circle cx="100" cy="10" r="2.5" fill="#D9A26A" />
      <line x1="88" y1="14" x2="84" y2="6" stroke="#D9A26A" strokeWidth="2" strokeLinecap="round" />
      <line x1="112" y1="14" x2="116" y2="6" stroke="#D9A26A" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
