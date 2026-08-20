"use client";

interface BeneConcernedProps {
  size?: number;
  className?: string;
}

export default function BeneConcerned({ size = 160, className = "" }: BeneConcernedProps) {
  return (
    <svg
      width={size}
      height={size * 1.2}
      viewBox="0 0 200 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className} style={{ animation: "beneConcerned 2s ease-in-out infinite" }}
    >
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

      {/* Body — slight lean, sharp point at top, round bottom */}
      <g transform="rotate(-4, 100, 150)">
        <path
          d="M100 20 L72 118 Q62 178 100 188 Q138 178 128 118 Z"
          fill="#7C9070"
        />

        {/* Left arm — close to body, hand raised near chin */}
        <path
          d="M72 132 Q60 120 62 106"
          stroke="#64775A"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />

        {/* Right arm — tucked, hanging down */}
        <path
          d="M128 132 Q144 148 146 164"
          stroke="#64775A"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />

        {/* Left eye white */}
        <circle cx="86" cy="100" r="14" fill="#FAF9F5" />
        {/* Right eye white */}
        <circle cx="114" cy="100" r="14" fill="#FAF9F5" />

        {/* Left pupil — looking slightly sideways */}
        <circle cx="84" cy="102" r="9" fill="#3D3929" />
        {/* Right pupil */}
        <circle cx="112" cy="102" r="9" fill="#3D3929" />

        {/* Left eye highlight */}
        <circle cx="88" cy="98" r="3.5" fill="#FAF9F5" />
        {/* Right eye highlight */}
        <circle cx="116" cy="98" r="3.5" fill="#FAF9F5" />

        {/* Worried eyebrows — angled lines above eyes, inner ends lower */}
        <path
          d="M74 88 Q86 82 96 88"
          stroke="#3D3929"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M104 88 Q114 82 126 88"
          stroke="#3D3929"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Frown — inverted smile arc */}
        <path
          d="M88 124 Q100 116 112 124"
          stroke="#3D3929"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Left cheek blush — slight, anxious */}
        <ellipse cx="72" cy="113" rx="9" ry="6" fill="#D9A26A" opacity="0.4" />
        {/* Right cheek blush */}
        <ellipse cx="128" cy="113" rx="9" ry="6" fill="#D9A26A" opacity="0.4" />
      </g>

      {/* Sweat drop */}
      <path
        d="M142 70 Q145 63 148 70 Q148 76 145 76 Q142 76 142 70 Z"
        fill="#A8C4D4"
        opacity="0.8"
      />
    </svg>
  );
}
