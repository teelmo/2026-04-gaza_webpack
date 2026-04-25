import React, { } from 'react';
import PropTypes from 'prop-types';

function Image({ alt, background, path }) {
  return (
    <div className="container_image_content" style={{ background }}>
      <div className="image_content">
        <img src={path} alt={alt} className="image" />
      </div>
    </div>
  );
}

export default Image;

Image.propTypes = {
  alt: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired
};
