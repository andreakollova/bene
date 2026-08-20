"use client";

interface BeneRestProps {
  size?: number;
  className?: string;
}

export default function BeneRest({ size = 160, className = "" }: BeneRestProps) {
  return (
    <svg
      width={size}
      height={size * 1.2}
      viewBox="0 0 200 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className} style={{ animation: "beneRest 3s ease-in-out infinite" }}
    >
      {/* Ground shadow — wider, sitting */}
      <ellipse cx="100" cy="228" rx="50" ry="6" fill="#3D3929" opacity="0.12" />

      {/* Left leg — extended forward/outward while sitting */}
      <path
        d="M84 192 Q64 208 46 216"
        stroke="#64775A"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />
      {/* Left shoe — pointing left */}
      <ellipse cx="40" cy="216" rx="14" ry="7" fill="#64775A" transform="rotate(-15 40 216)" />

      {/* Right leg — extended forward/outward */}
      <path
        d="M116 192 Q136 208 154 216"
        stroke="#64775A"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />
      {/* Right shoe — pointing right */}
      <ellipse cx="160" cy="216" rx="14" ry="7" fill="#64775A" transform="rotate(15 160 216)" />

      {/* Body — sharp point at top, round bottom */}
      <path
        d="M100 20 L72 118 Q62 178 100 188 Q138 178 128 118 Z"
        fill="#7C9070"
      />

      {/* Left arm — meditation pose, resting on knee-ish */}
      <path
        d="M72 140 Q58 162 54 178"
        stroke="#64775A"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />

      {/* Right arm — meditation pose */}
      <path
        d="M128 140 Q142 162 146 178"
        stroke="#64775A"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />

      {/* Small cream heart on chest */}
      <path
        d="M94 148 Q94 143 100 147 Q106 143 106 148 Q106 154 100 158 Q94 154 94 148 Z"
        fill="#F5EDD8"
        opacity="0.85"
      />

      {/* Left eye — CLOSED, curved line like upside-down U */}
      <path
        d="M76 100 Q86 108 96 100"
        stroke="#3D3929"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Right eye — CLOSED, curved line */}
      <path
        d="M104 100 Q114 108 124 100"
        stroke="#3D3929"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Peaceful small smile */}
      <path
        d="M91 120 Q100 127 109 120"
        stroke="#3D3929"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Left cheek blush — soft */}
      <ellipse cx="72" cy="112" rx="9" ry="6" fill="#D9A26A" opacity="0.45" />
      {/* Right cheek blush */}
      <ellipse cx="128" cy="112" rx="9" ry="6" fill="#D9A26A" opacity="0.45" />

      {/* ZZZ text — ascending */}
      <text x="148" y="88" fill="#3D3929" fontSize="11" fontWeight="bold" opacity="0.45" fontFamily="sans-serif">z</text>
      <text x="158" y="74" fill="#3D3929" fontSize="14" fontWeight="bold" opacity="0.35" fontFamily="sans-serif">z</text>
      <text x="170" y="58" fill="#3D3929" fontSize="17" fontWeight="bold" opacity="0.25" fontFamily="sans-serif">z</text>
    </svg>
  );
}
