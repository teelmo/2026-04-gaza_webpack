import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function MosaicElement({ element, visible }) {
  const {
    type, path, top, left, width, height, initialOffset
  } = element;

  const style = {
    position: 'absolute',
    top: `calc(50% + ${top}px)`,
    left: `calc(50% + ${left}px)`,
    width,
    height,
    opacity: visible ? 1 : 0,
    transform: visible
      ? 'translate(0, 0)'
      : `translate(${initialOffset.x}px, ${initialOffset.y}px)`,
    transition: 'opacity 0.8s ease, transform 0.8s ease',
    objectFit: 'cover',
  };

  if (type === 'video') {
    return (
      <video
        src={path}
        style={style}
        autoPlay
        muted
        controls
        playsInline
        loop
      />
    );
  }

  return <img src={path} alt="" style={style} />;
}

MosaicElement.propTypes = {
  element: PropTypes.shape({
    type: PropTypes.oneOf(['image', 'video']).isRequired,
    path: PropTypes.string.isRequired,
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    initialOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  visible: PropTypes.bool.isRequired,
};

function Mosaic({ background, elements }) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Trigger when mosaic center reaches viewport center
      const centerInView = rect.top < windowH / 2 && rect.bottom > windowH / 2;
      setVisible(centerInView || rect.bottom < windowH / 2);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{
        background,
        height: '100vh',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {elements.map((element, i) => (
        <MosaicElement
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          element={element}
          visible={visible}
        />
      ))}
    </div>
  );
}

Mosaic.propTypes = {
  background: PropTypes.string.isRequired,
  elements: PropTypes.arrayOf(PropTypes.shape({
    initialOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }).isRequired,
    height: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    path: PropTypes.string.isRequired,
    top: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['image', 'video']).isRequired,
    width: PropTypes.number.isRequired
  })).isRequired,
};

export default Mosaic;
