import ReactDOM from 'react-dom';
import { useRef, useEffect, useState } from 'react';

const ActionsDropdown: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(
    null
  );

  useEffect(() => {
    if (dropdownRef.current) {
      const rect = dropdownRef.current.parentElement?.getBoundingClientRect();
      if (rect) {
        setCoords({
          top: rect.bottom + window.scrollY,
          left: rect.right - 192,
        }); // 192px = w-48
      }
    }
  }, []);

  if (!coords) {
    return <div ref={dropdownRef} style={{ display: 'none' }} />;
  }

  return ReactDOM.createPortal(
    <div
      style={{
        position: 'absolute',
        top: coords.top,
        left: coords.left,
        width: '192px',
        zIndex: 9999,
      }}
      className="bg-white rounded-lg shadow-lg border"
    >
      <ul className="py-1">{children}</ul>
    </div>,
    document.body
  );
};

export default ActionsDropdown;
