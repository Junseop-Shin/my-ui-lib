// Tooltip.tsx
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: React.ReactNode;
  content?: string;
  position?: "right" | "left" | "top" | "bottom";
};

const Tooltip = ({ children, content }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (ref.current && show) {
      const rect = ref.current.getBoundingClientRect();
      setPosition({ top: rect.top + window.scrollY, left: rect.right + 8 });
    }
  }, [show]);

  if (!content) return <>{children}</>; // content 없으면 툴팁 생략

  return (
    <>
      <div
        ref={ref}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="inline-block w-full"
      >
        {children}
      </div>
      {show &&
        createPortal(
          <div
            className="fixed bg-black text-white text-xs px-2 py-1 rounded shadow z-50"
            style={{ top: position.top, left: position.left }}
          >
            {content}
          </div>,
          document.body
        )}
    </>
  );
};

export default Tooltip;
