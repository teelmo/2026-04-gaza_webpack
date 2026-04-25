import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function Video({ background, path }) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [opacity, setOpacity] = useState(0);

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
      const isOutOfViewport = rect.bottom < 0 || rect.top > windowH;
      if (progress >= 1) {
        video.play();
      } else if (isOutOfViewport) {
        video.pause();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="container_video_content" ref={sectionRef} style={{ background }}>
      <div className="video_content" style={{ background }}>
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
