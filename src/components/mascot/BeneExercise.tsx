"use client";

interface BeneExerciseProps {
  size?: number;
  className?: string;
}

export default function BeneExercise({ size = 160, className = "" }: BeneExerciseProps) {
  return (
    <svg
      width={size}
      height={size * 1.2}
      viewBox="0 0 200 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className} style={{ animation: "beneExercise 0.8s ease-in-out infinite" }}
    >
      {/* Ground shadow — wider for squat stance */}
      <ellipse cx="100" cy="228" rx="40" ry="6" fill="#3D3929" opacity="0.14" />

      {/* Left shoe — wider apart */}
      <ellipse cx="76" cy="222" rx="14" ry="7" fill="#64775A" />
      {/* Right shoe */}
      <ellipse cx="124" cy="222" rx="14" ry="7" fill="#64775A" />

      {/* Left leg — splayed out, squat */}
      <rect x="71" y="202" width="10" height="22" rx="5" fill="#64775A" transform="rotate(-8 71 202)" />
      {/* Right leg */}
      <rect x="119" y="202" width="10" height="22" rx="5" fill="#64775A" transform="rotate(8 129 202)" />

      {/* Body — sharp point at top, round bottom, shifted down slightly for squat */}
      <path
        d="M100 26 L72 124 Q62 184 100 194 Q138 184 128 124 Z"
        fill="#7C9070"
      />

      {/* Left arm — bent at effort pose */}
      <path
        d="M72 136 Q52 130 48 148"
        stroke="#64775A"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />

      {/* Right arm — bent at effort pose */}
      <path
        d="M128 136 Q148 130 152 148"
        stroke="#64775A"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />

      {/* Left eye — squinting flat oval instead of circle */}
      <ellipse cx="86" cy="106" rx="13" ry="7" fill="#FAF9F5" />
      {/* Right eye — squinting flat oval */}
      <ellipse cx="114" cy="106" rx="13" ry="7" fill="#FAF9F5" />

      {/* Left squint eyelid line */}
      <path
        d="M73 103 Q86 97 99 103"
        stroke="#3D3929"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Right squint eyelid line */}
      <path
        d="M101 103 Q114 97 127 103"
        stroke="#3D3929"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Left pupil — small, squinting */}
      <ellipse cx="88" cy="107" rx="6" ry="5" fill="#3D3929" />
      {/* Right pupil */}
      <ellipse cx="116" cy="107" rx="6" ry="5" fill="#3D3929" />

      {/* Left eye highlight */}
      <circle cx="91" cy="104" r="2" fill="#FAF9F5" />
      {/* Right eye highlight */}
      <circle cx="119" cy="104" r="2" fill="#FAF9F5" />

      {/* Open oval mouth — effort */}
      <ellipse cx="100" cy="125" rx="9" ry="6" fill="#3D3929" />

      {/* Left cheek blush — intense effort */}
      <ellipse cx="72" cy="118" rx="9" ry="6" fill="#D9A26A" opacity="0.7" />
      {/* Right cheek blush */}
      <ellipse cx="128" cy="118" rx="9" ry="6" fill="#D9A26A" opacity="0.7" />

      {/* Sweat drop */}
      <path
        d="M144 76 Q147 69 150 76 Q150 82 147 82 Q144 82 144 76 Z"
        fill="#A8C4D4"
        opacity="0.8"
      />
    </svg>
  );
}
