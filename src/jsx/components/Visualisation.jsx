import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import Image from './Image.jsx';

function InfoCard({ opacity, cx, cy }) {
  const cardRef = useRef(null);
  const [corners, setCorners] = useState(null);
  const cardX = cx + 200;
  const cardY = cy - 400;
  useEffect(() => {
    if (cardRef.current) {
      const { height, width } = cardRef.current.getBoundingClientRect();
      setCorners({
        topLeft: { x: cardX, y: cardY },
        bottomLeft: { x: cardX, y: cardY + height },
        bottomRight: { x: cardX + width, y: cardY + height },
      });
    }
  }, [cardX, cardY]);
  return (
    <div className="container_infocard_wrapper" style={{ opacity }}>
      <svg>
        {corners && (
          <>
            <line x1={cx} y1={cy} x2={corners.topLeft.x + 1} y2={corners.topLeft.y + 1} stroke="rgba(249, 115, 22, 0.5)" strokeWidth="2" />
            <line x1={cx} y1={cy} x2={corners.bottomLeft.x + 2} y2={corners.bottomLeft.y - 1} stroke="rgba(249, 115, 22, 0.5)" strokeWidth="2" />
            <line x1={cx} y1={cy} x2={corners.bottomRight.x} y2={corners.bottomRight.y} stroke="rgba(249, 115, 22, 0.5)" strokeWidth="2" />
          </>
        )}
      </svg>
      <div
        className="container_infocard_content"
        ref={cardRef}
        style={{ top: cardY, left: cardX }}
      >
        <div className="infocard_image">
          <Image path="assets/img/Rital_Abu_Asi.jpg" alt="Kuvateksti" background="" />
        </div>
        <div className="infocard_content">
          <h3 className="text_light">Rital Abu Asi</h3>
          <p className="text_grey">4-vuotias tyttö Gazasta. Haavoittui Israelin ilmaiskussa.</p>
        </div>
      </div>
    </div>
  );
}

InfoCard.propTypes = {
  opacity: PropTypes.number.isRequired,
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
};

function Visualisation() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const injuredDotsRef = useRef([]);
  const deathDotsRef = useRef([]);
  const animFrameRef = useRef(null);
  const deathCount = 20000;
  const injuredCount = 45000;

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const w = canvas.width;
    const h = canvas.height;
    setDimensions({ width: w, height: h });

    const randomX = d3.randomNormal(w / 2, w / 5);
    const randomY = d3.randomNormal(h / 2, h / 5);

    // Generate 45k injured dots
    const injured = [];
    const padding = 10;
    while (injured.length < injuredCount) {
      const x = randomX();
      const y = randomY();
      if (x > padding && x < w - padding && y > padding && y < h - padding) {
        injured.push({
          x,
          y,
          r: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.3,
        });
      }
    }
    injuredDotsRef.current = injured;

    // Generate 20k death dots
    const deaths = [];
    while (deaths.length < deathCount) {
      const x = randomX();
      const y = randomY();
      if (x > padding && x < w - padding && y > padding && y < h - padding) {
        deaths.push({
          x,
          y,
          r: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.3,
        });
      }
    }
    deathDotsRef.current = deaths;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const { top, height } = container.getBoundingClientRect();
      const progress = -top / (height - window.innerHeight);
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    animFrameRef.current = requestAnimationFrame(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const { width, height } = canvas;
      const cx = width / 2;
      const cy = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Screen 1: Bright single dot stays until death appear
      if (scrollProgress < 0.66) {
        ctx.beginPath();
        ctx.arc(cx, cy, 5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(249, 115, 22, 1)';
        ctx.fill();
      }

      // Screen 2 + 3: Injured dots
      if (scrollProgress >= 0.2) {
        // Dots appear during screen 2 (0.2–0.66)
        const appearProgress = Math.min(Math.max((scrollProgress - 0.2) / 0.46, 0), 1);
        const dotCount = Math.floor(appearProgress * injuredCount);

        // Dots fade to background during screen 3 (0.66–0.75) quickly
        const fadeProgress = Math.min(Math.max((scrollProgress - 0.66) / 0.09, 0), 1);
        const injuredOpacityMultiplier = 1 - fadeProgress * 0.90; // fade to 90% opacity
        for (let i = 0; i < dotCount; i++) {
          const dot = injuredDotsRef.current[i];
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(249, 115, 22, ${dot.opacity * injuredOpacityMultiplier})`;
          ctx.fill();
        }
      }

      // Screen 3: Death dots appear (0.66–1.0)
      if (scrollProgress >= 0.66) {
        const screen3Progress = Math.min(Math.max((scrollProgress - 0.66) / 0.34, 0), 1);
        const dotCount = Math.floor(screen3Progress * deathCount);
        // With death dots the single dot appears a bit less bright
        ctx.beginPath();
        ctx.arc(cx, cy, 5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(249, 115, 22, 0.8)';
        ctx.fill();
        for (let i = 0; i < dotCount; i++) {
          const dot = deathDotsRef.current[i];
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${dot.opacity})`;
          ctx.fill();
        }
      }
    });
  }, [scrollProgress]);

  // Infocard opacity.
  const infocardOpacity = 1 - Math.min(scrollProgress / 0.15, 1);

  // Screen 2 text and positioning.
  const screen2Progress = Math.min(Math.max((scrollProgress - 0.33) / 0.33, 0), 1);
  const screen2TextY = 100 - screen2Progress * 200;
  const screen2TextOpacity = screen2Progress < 0.1
    ? screen2Progress / 0.1
    : screen2Progress > 0.8
      ? 1 - (screen2Progress - 0.8) / 0.2
      : 1;

  // Screen 3 text and positioning.
  const screen3Progress = Math.min(Math.max((scrollProgress - 0.66) / 0.34, 0), 1);
  const screen3TextY = 100 - screen3Progress * 200;
  const screen3TextOpacity = screen3Progress < 0.1
    ? screen3Progress / 0.1
    : screen3Progress > 0.8
      ? 1 - (screen3Progress - 0.8) / 0.2
      : 1;

  const cx = dimensions.width / 2;
  const cy = dimensions.height / 2;

  return (
    <div className="container_visualisation_content" ref={containerRef}>
      <div className="visualisation_content">
        <canvas ref={canvasRef} />

        {/* Screen 1 — infocard */}
        <InfoCard opacity={infocardOpacity} cx={cx} cy={cy} />

        {/* Screen 2 — scrolling text */}
        <div className="container_scrolling_text" style={{ opacity: screen2TextOpacity, transform: `translateY(${screen2TextY}%)` }}>
          <p>Hän on vain yksi, yhteensä 45 000 lasta on haavoittunut Gazan sodassa</p>
        </div>

        {/* Screen 3 — scrolling text */}
        <div className="container_scrolling_text" style={{ opacity: screen3TextOpacity, transform: `translateY(${screen3TextY}%)` }}>
          <p>Heidän lisäkseen ainakin 20 000 on kuollut</p>
        </div>
      </div>
    </div>
  );
}

export default Visualisation;
