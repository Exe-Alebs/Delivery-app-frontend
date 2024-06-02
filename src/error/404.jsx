import React from 'react';

const NotFound = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  };

  return (
    <div style={containerStyle}>
      <h1>404 - Not Found</h1>
      <p>The page you're looking for does not exist.</p>
    </div>
  );
};

export default NotFound;
