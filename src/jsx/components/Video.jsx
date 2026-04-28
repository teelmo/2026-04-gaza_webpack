import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function Video({ background, path }) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [opacity, setOpacity] = useState(0);
  const [currentBackground, setCurrentBackground] = useState(background);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      const video = videoRef.current;
      if (!section || !video) return;

      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;

      const progress = (windowH - rect.top) / (windowH / 2) / 2;
      setOpacity(progress);

      // Play when locked (centered), pause when out of viewport
      // const isOutOfViewport = rect.bottom < 0 || rect.top > windowH;
      if (progress >= 1 && progress <= 1.9) {
        video.play();
        video.style.transform = 'scaleX(1.6) scaleY(0.9)';
        setCurrentBackground('#000');
      } else if (progress > 1.9) {
        video.style.transform = 'scale(1.00)';
        video.pause();
        setCurrentBackground(background);
      } else if (progress < 1) {
        video.style.transform = 'scale(1.00)';
        video.pause();
        setCurrentBackground(background);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [background]);

  return (
    <div className="container_video_content" ref={sectionRef} style={{ backgroundColor: currentBackground }}>
      <div className="video_content" style={{ backgroundColor: currentBackground }}>
        <video
          controls
          loop
          muted
          playsInline
          ref={videoRef}
          src={path}
          style={{ opacity }}
        />
      </div>
    </div>
  );
}

export default Video;

Video.propTypes = {
  background: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired
};
