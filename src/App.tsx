// src/App.tsx
import React from 'react';
import Splitter from './components/Splitter';

export default function App() {
  const handleResize = (horizontalSize: number, verticalSize: number) => {
    console.log(`Horizontal Size: ${horizontalSize}%`);
    console.log(`Vertical Size: ${verticalSize}%`);
  };

  return (
    <div className="App">
      <Splitter
        initialHorizontalSize={40}
        initialVerticalSize={60}
        onResize={handleResize}
        paneClassName="custom-pane"
        handleClassName="custom-handle"
        containerClassName="custom-container"
        pane1Style={{ background: 'green' }}
        pane2Style={{ background: 'red' }}
        pane3Style={{ background: 'yellow' }}
        pane4Style={{ background: 'purple' }}
        handleStyle={{ background: 'blue' }}
        containerStyle={{ border: '2px solid #000' }}
      />
    </div>
  );
};

