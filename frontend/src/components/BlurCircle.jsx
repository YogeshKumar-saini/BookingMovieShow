import React from 'react';

const BlurCircle = ({
  top = 'auto',
  left = 'auto',
  right = 'auto',
  bottom = 'auto',
  size = 'auto', // Default ~240px
  color = 'bg-primary/30',
  blur = 'blur-3xl',
}) => {
  return (
    <div
      className={`absolute -z-50 rounded-full ${color} ${blur}`}
      style={{
        top,
        left,
        right,
        bottom,
        width: size,
        height: size,
      }}
    />
  );
};

export default BlurCircle;
