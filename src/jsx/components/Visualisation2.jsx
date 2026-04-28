import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

const TOTAL = 21000;
const AGE_GROUPS = [
  { label: 'Vauvat', count: 500 },
  { label: 'Alle 1-vuotiaat', count: 1000 },
  { label: 'Alle 5-vuotiaat', count: 5000 },
  { label: '5–17-vuotiaat', count: 14500 },
];
const DOT_RADIUS = 1.5;
const DOT_PADDING = 3;
const ANIMATION_DURATION = 1500;

// Target uniform values when organized
const ORGANIZED_OPACITY = 0.9;
const ORGANIZED_RADIUS = 1.5;

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function Visualisation2() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const dotsRef = useRef([]);
  const animFrameRef = useRef(null);
  const animStartRef = useRef(null);
  const organizedRef = useRef(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [organized, setOrganized] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const textProgress = Math.min(Math.max((scrollProgress - 0.1) / 0.4, 0), 1);
  const textY = 100 - textProgress * 200;
  const textOpacity = textProgress < 0.1
    ? textProgress / 0.1
    : textProgress > 0.8
      ? 1 - (textProgress - 0.8) / 0.2
      : 1;

  function calculateTargets(w, h) {
    const totalCols = AGE_GROUPS.length;
    const columnGap = 20;
    const totalGap = columnGap * (totalCols - 1);
    const usableWidth = w - totalGap;
    const colWidth = usableWidth / (totalCols + 1);

    let dotIndex = 0;
    let currentX = (w - (colWidth * totalCols + totalGap)) / 2;

    AGE_GROUPS.forEach((group) => {
      const dotsPerRow = Math.floor(colWidth / DOT_PADDING);
      const rows = Math.ceil(group.count / dotsPerRow);
      const totalHeight = rows * DOT_PADDING;
      const startY = h / 2 + totalHeight / 2;
      const colCenterX = currentX + colWidth / 2;

      for (let i = 0; i < group.count; i++) {
        const col = i % dotsPerRow;
        const row = Math.floor(i / dotsPerRow);
        dotsRef.current[dotIndex].targetX = colCenterX - (dotsPerRow * DOT_PADDING) / 2 + col * DOT_PADDING;
        dotsRef.current[dotIndex].targetY = startY - row * DOT_PADDING;
        dotIndex++;
      }

      currentX += colWidth + columnGap;
    });
  }

  function animateToTargets(toOrganized) {
    dotsRef.current.forEach(dot => {
      dot.startX = dot.x;
      dot.startY = dot.y;
      dot.startOpacity = dot.opacity;
      dot.startR = dot.r;
    });

    animStartRef.current = performance.now();

    function frame(now) {
      const elapsed = now - animStartRef.current;
      const t = Math.min(elapsed / ANIMATION_DURATION, 1);
      const eased = easeInOut(t);

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dotsRef.current.forEach(dot => {
        dot.x = dot.startX + (dot.targetX - dot.startX) * eased;
        dot.y = dot.startY + (dot.targetY - dot.startY) * eased;

        // Interpolate opacity and radius
        const targetOpacity = toOrganized ? ORGANIZED_OPACITY : dot.randomOpacity;
        const targetR = toOrganized ? ORGANIZED_RADIUS : dot.randomR;
        dot.opacity = dot.startOpacity + (targetOpacity - dot.startOpacity) * eased;
        dot.r = dot.startR + (targetR - dot.startR) * eased;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${dot.opacity})`;
        ctx.fill();
      });

      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(frame);
      } else {
        setOrganized(toOrganized);
      }
    }

    animFrameRef.current = requestAnimationFrame(frame);
  }

  function drawDots() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dotsRef.current.forEach(dot => {
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${dot.opacity})`;
      ctx.fill();
    });
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const w = canvas.width;
    const h = canvas.height;
    setDimensions({ width: w, height: h });

    const randomX = d3.randomNormal(w / 2, w / 5);
    const randomY = d3.randomNormal(h / 2, h / 5);

    const dots = [];
    while (dots.length < TOTAL) {
      const x = randomX();
      const y = randomY();
      if (x > 40 && x < w - 40 && y > 40 && y < h - 40) {
        const opacity = Math.random() * 0.5 + 0.3;
        const r = Math.random() * DOT_RADIUS + 0.5;
        dots.push({
          x,
          y,
          targetX: x,
          targetY: y,
          startX: x,
          startY: y,
          r,
          randomR: r, // store original random values
          opacity,
          randomOpacity: opacity,
        });
      }
    }
    dotsRef.current = dots;
    drawDots();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const { top, height } = container.getBoundingClientRect();
      const progress = -top / (height - window.innerHeight);
      const clamped = Math.min(Math.max(progress, 0), 1);
      setScrollProgress(clamped);

      if (clamped >= 0.5 && !organizedRef.current) {
        organizedRef.current = true;
        calculateTargets(canvasRef.current.width, canvasRef.current.height);
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        animateToTargets(true);
      }

      if (clamped < 0.5 && organizedRef.current) {
        organizedRef.current = false;
        setOrganized(false);
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        dotsRef.current.forEach(dot => {
          dot.targetX = dot.startX;
          dot.targetY = dot.startY;
        });
        animateToTargets(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} style={{ height: '300vh', background: '#000' }}>
      <div style={{
        position: 'sticky', top: 0, height: '100vh', overflow: 'hidden'
      }}
      >
        <canvas ref={canvasRef} style={{ display: 'block' }} />

        {/* Scrolling infotext */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          opacity: textOpacity,
          transform: `translateY(${textY}%)`,
        }}
        >
          <p style={{
            color: '#fff',
            fontSize: '2rem',
            fontWeight: 500,
            textAlign: 'center',
            maxWidth: '600px',
            lineHeight: 1.4,
          }}
          >
            21 000 lasta kuoli Gazan sodassa
          </p>
        </div>

        {/* Age group labels on top of columns */}
        {organized && AGE_GROUPS.map((group, i) => {
          const colWidth = dimensions.width / (AGE_GROUPS.length + 1);
          const colX = colWidth * (i + 1);
          return (
            <div
              key={group.label}
              style={{
                position: 'absolute',
                top: '2rem',
                left: colX,
                transform: 'translateX(-50%)',
                color: '#fff',
                fontSize: '0.8rem',
                textAlign: 'center',
                opacity: 0.7,
                pointerEvents: 'none',
              }}
            >
              <div style={{ fontWeight: 500 }}>{group.count.toLocaleString('FI-FI')}</div>
              <div>{group.label}</div>
            </div>
          );
        })}

      </div>
    </div>
  );
}

export default Visualisation2;
