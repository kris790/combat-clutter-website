'use client';

import { useEffect, useRef } from 'react';

interface KaleidoscopeProps {
  /**
   * Number of segments in the kaleidoscope (default: 8)
   */
  segments?: number;
  /**
   * Animation speed in seconds (default: 20)
   */
  speed?: number;
  /**
   * Opacity of the effect (0-1, default: 0.3)
   */
  opacity?: number;
  /**
   * Colors to use in the kaleidoscope
   */
  colors?: string[];
}

export function Kaleidoscope({
  segments = 8,
  speed = 20,
  opacity = 0.3,
  colors = ['#D4AF37', '#1A1A1A', '#F5F5F0', '#6B6B6B', '#E0E0E0']
}: KaleidoscopeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const dpr = (typeof window !== 'undefined' ? window.devicePixelRatio : 1) || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationId: number;
    let time = 0;

    const drawKaleidoscope = () => {
      const rect = canvas.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const radius = Math.max(rect.width, rect.height) / 2;

      // Clear canvas
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Save context state
      ctx.save();

      // Translate to center
      ctx.translate(centerX, centerY);

      // Draw each segment
      for (let i = 0; i < segments; i++) {
        ctx.save();
        
        // Rotate for each segment
        ctx.rotate((Math.PI * 2 * i) / segments);

        // Create clipping path for segment
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius, 0, (Math.PI * 2) / segments);
        ctx.lineTo(0, 0);
        ctx.closePath();
        ctx.clip();

        // Draw animated shapes
        const numShapes = 5;
        for (let j = 0; j < numShapes; j++) {
          const angle = (time * 0.5 + j * 0.3) % (Math.PI * 2);
          const distance = Math.sin(time * 0.2 + j) * radius * 0.3 + radius * 0.4;
          const size = Math.sin(time * 0.3 + j * 0.5) * 30 + 40;
          
          const x = Math.cos(angle) * distance;
          const y = Math.sin(angle) * distance;
          
          // Random color from palette
          const colorIndex = (j + Math.floor(time * 0.5)) % colors.length;
          const color = colors[colorIndex];
          
          // Create gradient
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
          gradient.addColorStop(0, color);
          gradient.addColorStop(1, 'transparent');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      ctx.restore();

      time += 0.01 / (speed / 20);
      animationId = requestAnimationFrame(drawKaleidoscope);
    };

    // Check for reduced motion preference
    const prefersReducedMotion = typeof window !== 'undefined' 
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
      : false;
    
    if (!prefersReducedMotion) {
      drawKaleidoscope();
    } else {
      // Draw static version
      time = 0;
      drawKaleidoscope();
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [segments, speed, colors]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ opacity }}
      aria-hidden="true"
    />
  );
}
