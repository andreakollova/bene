import React from "react";

interface QuoteCardProps {
  quote: string;
  author?: string;
  className?: string;
}

export function QuoteCard({ quote, author, className = "" }: QuoteCardProps) {
  return (
    <div
      className={`bg-cream-100 border border-cream-200 rounded-card p-4 pl-5 relative ${className}`}
    >
      {/* Left sage accent border */}
      <div className="absolute left-0 top-4 bottom-4 w-[3px] bg-sage rounded-pill" />

      <blockquote className="font-serif text-base italic text-ink leading-relaxed">
        &ldquo;{quote}&rdquo;
      </blockquote>
      {author && (
        <p className="font-sans text-xs text-ink-muted mt-2">&mdash; {author}</p>
      )}
    </div>
  );
}
