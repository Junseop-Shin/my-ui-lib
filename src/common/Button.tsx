export interface ButtonProps {
  /** Button contents */
  label: string;
  /** Is this the principal call to action on the page? */
  primary?: boolean;
  /** What background color to use */
  backgroundColor?: string;
  /** How large should the button be? */
  size?: "small" | "medium" | "large";
  /** Optional click handler */
  onClick?: () => void;
}

export const Button = ({
  label,
  primary = false,
  backgroundColor,
  size = "medium",
  onClick,
}: ButtonProps) => {
  const mode = primary
    ? "bg-[#555ab9] text-white"
    : "bg-transparent text-[#333] inset-shadow-button";

  const sizes = {
    small: "text-xs px-4 py-2.5",
    medium: "text-sm px-5 py-[11px]",
    large: "text-base px-6 py-3",
  };

  return (
    <button
      className={`
        inline-block cursor-pointer border-none rounded-full
        leading-none font-button font-bold
        ${mode} ${sizes[size]}`}
      style={{ backgroundColor }}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
