// src/components/Splitter.tsx
import React, { useState, useRef, CSSProperties } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import './Splitter.css';

interface SplitterProps {
  initialHorizontalSize?: number;
  initialVerticalSize?: number;
  onResize?: (horizontalSize: number, verticalSize: number) => void;
  paneClassName?: string;
  handleClassName?: string;
  containerClassName?: string;
  pane1Style?: CSSProperties;
  pane2Style?: CSSProperties;
  pane3Style?: CSSProperties;
  pane4Style?: CSSProperties;
  handleStyle?: CSSProperties;
  containerStyle?: CSSProperties;
}

export const Splitter: React.FC<SplitterProps> = ({
  initialHorizontalSize = 50,
  initialVerticalSize = 50,
  onResize,
  paneClassName = '',
  handleClassName = '',
  containerClassName = '',
  pane1Style = {},
  pane2Style = {},
  pane3Style = {},
  pane4Style = {},
  handleStyle = {},
  containerStyle = {},
}) => {
  const [horizontalSize, setHorizontalSize] = useState(initialHorizontalSize);
  const [verticalSize, setVerticalSize] = useState(initialVerticalSize);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (containerRef.current) {
      const { width, height, left, top } = containerRef.current.getBoundingClientRect();
      const newHorizontalSize = ((e.clientX - left) / width) * 100;
      const newVerticalSize = ((e.clientY - top) / height) * 100;
      setHorizontalSize(newHorizontalSize);
      setVerticalSize(newVerticalSize);
      if (onResize) {
        onResize(newHorizontalSize, newVerticalSize);
      }
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleMouseDown = () => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      className={`splitter-container ${containerClassName}`}
      ref={containerRef}
      style={containerStyle}
    >
      <div
        className={`splitter-pane ${paneClassName}`}
        style={{ ...pane1Style, width: `${horizontalSize}%`, height: `${verticalSize}%` }}
      >
        Pane 1
      </div>
      <div
        className={`splitter-pane ${paneClassName}`}
        style={{ ...pane2Style, width: `${100 - horizontalSize}%`, height: `${verticalSize}%` }}
      >
        Pane 2
      </div>
      <div
        className={`splitter-pane ${paneClassName}`}
        style={{ ...pane3Style, width: `${horizontalSize}%`, height: `${100 - verticalSize}%` }}
      >
        Pane 3
      </div>
      <div
        className={`splitter-pane ${paneClassName}`}
        style={{ ...pane4Style, width: `${100 - horizontalSize}%`, height: `${100 - verticalSize}%` }}
      >
        Pane 4
      </div>
      <div
        className={`splitter-handle ${handleClassName}`}
        onMouseDown={handleMouseDown}
        style={{
          ...handleStyle,
          top: `${verticalSize}%`,
          left: `${horizontalSize}%`,
        }}
      >
        <FontAwesomeIcon icon={faArrowsAlt} />
      </div>
    </div>
  );
};

export default Splitter;
