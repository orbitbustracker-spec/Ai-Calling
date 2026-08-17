'use client';

import React from 'react';
import { BaraldharSVG } from './BaraldharSVG';

/**
 * Examples of BaraldharSVG Component Usage
 */
export const BaraldharSVGExamples = () => {
  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold">BaraldharSVG Component Examples</h2>

      {/* Example 1: Simple Circle */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Circle Icon</h3>
        <div className="flex gap-4">
          <BaraldharSVG size="sm" fill="blue">
            <circle cx="12" cy="12" r="10" />
          </BaraldharSVG>
          <BaraldharSVG size="md" fill="green">
            <circle cx="12" cy="12" r="10" />
          </BaraldharSVG>
          <BaraldharSVG size="lg" fill="red">
            <circle cx="12" cy="12" r="10" />
          </BaraldharSVG>
          <BaraldharSVG size="xl" fill="purple">
            <circle cx="12" cy="12" r="10" />
          </BaraldharSVG>
        </div>
      </section>

      {/* Example 2: Microphone Icon (for Voice AI) */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Microphone Icon</h3>
        <BaraldharSVG size="lg" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 1a3 3 0 0 0-3 3v12a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="23" />
          <line x1="8" y1="23" x2="16" y2="23" />
        </BaraldharSVG>
      </section>

      {/* Example 3: Speaker Icon */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Speaker Icon</h3>
        <BaraldharSVG size="lg" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 3.54a9 9 0 0 1 0 12.73M19.07 4.93a13 13 0 0 1 0 14.14" />
        </BaraldharSVG>
      </section>

      {/* Example 4: Custom SVG with Styling */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Styled SVG</h3>
        <BaraldharSVG 
          size="xl" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          className="text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 3v18" />
        </BaraldharSVG>
      </section>
    </div>
  );
};

export default BaraldharSVGExamples;
