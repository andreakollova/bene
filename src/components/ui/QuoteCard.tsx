import React from "react";

interface QuoteCardProps {
  quote: string;
  author?: string;
  className?: string;
}

export function QuoteCard({ quote, author, className = "" }: QuoteCardProps) {
  return (
    <div
      className={`border-l-2 border-black pl-5 py-2 relative ${className}`}
    >
      <blockquote className="font-serif text-base italic text-black leading-relaxed">
        &ldquo;{quote}&rdquo;
      </blockquote>
      {author && (
        <p className="font-sans text-xs text-gray-400 mt-2 uppercase tracking-widest">&mdash; {author}</p>
      )}
    </div>
  );
}
