import { HTMLProps } from "react";

type ChevronIconDirection = "up" | "down" | "left" | "right";

const DirectionClass = {
  up: "rotate-180",
  down: "rotate-0",
  right: "rotate-90",
  left: "rotate-270",
};

interface ChevronIconProps extends HTMLProps<SVGElement> {
  direction: ChevronIconDirection;
}

const ChevronIcon = ({ direction = "down" }: ChevronIconProps) => (
  <svg
    data-testid="chevron-icon"
    className={`w-4 h-4 transition-transform duration-200 ${DirectionClass[direction]}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

export default ChevronIcon;
