// src/components/Splitter.tsx
import React, { useState, useRef, useEffect, CSSProperties } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsAltH, faArrowsAltV } from '@fortawesome/free-solid-svg-icons';
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

const LOCAL_STORAGE_KEY = 'splitterSizes';

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
  const [horizontalSize, setHorizontalSize] = useState(() => {
    const savedSizes = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedSizes ? JSON.parse(savedSizes).horizontalSize : initialHorizontalSize;
  });
  const [verticalSize, setVerticalSize] = useState(() => {
    const savedSizes = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedSizes ? JSON.parse(savedSizes).verticalSize : initialVerticalSize;
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleHorizontalMouseMove);
    document.removeEventListener('mousemove', handleVerticalMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleHorizontalMouseMove = (e: MouseEvent) => {
    if (containerRef.current) {
      const { width, left } = containerRef.current.getBoundingClientRect();
      const newHorizontalSize = ((e.clientX - left) / width) * 100;
      setHorizontalSize(newHorizontalSize);
      if (onResize) {
        onResize(newHorizontalSize, verticalSize);
      }
    }
  };

  const handleVerticalMouseMove = (e: MouseEvent) => {
    if (containerRef.current) {
      const { height, top } = containerRef.current.getBoundingClientRect();
      const newVerticalSize = ((e.clientY - top) / height) * 100;
      setVerticalSize(newVerticalSize);
      if (onResize) {
        onResize(horizontalSize, newVerticalSize);
      }
    }
  };

  const handleHorizontalMouseDown = () => {
    document.addEventListener('mousemove', handleHorizontalMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleVerticalMouseDown = () => {
    document.addEventListener('mousemove', handleVerticalMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ horizontalSize, verticalSize }));
  }, [horizontalSize, verticalSize]);

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
        className={`splitter-handle horizontal-handle ${handleClassName}`}
        onMouseDown={handleHorizontalMouseDown}
        style={{
          ...handleStyle,
          left: `${horizontalSize}%`,
          top: 0,
          bottom: 0,
          cursor: 'ew-resize',
          transform: 'translateX(-50%)',
        }}
        aria-label="Resize horizontally"
        role="separator"
        aria-orientation="horizontal"
      >
        <FontAwesomeIcon icon={faArrowsAltH} size="xs" />
      </div>
      <div
        className={`splitter-handle vertical-handle ${handleClassName}`}
        onMouseDown={handleVerticalMouseDown}
        style={{
          ...handleStyle,
          left: 0,
          right: 0,
          top: `${verticalSize}%`,
          cursor: 'ns-resize',
          transform: 'translateY(-50%)',
        }}
        aria-label="Resize vertically"
        role="separator"
        aria-orientation="vertical"
      >
        <FontAwesomeIcon icon={faArrowsAltV} size="xs" />
      </div>
    </div>
  );
};

export default Splitter;
