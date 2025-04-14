import { useState } from "react";
import { Dropdown, DropdownOption } from "./Dropdown";

type StoryWrapperProps = {
  options: DropdownOption[];
  triggerType?: "input" | "button";
  searchable?: boolean;
  placeholder?: string;
  buttonLabel?: string;
  buttonIcon?: React.ReactNode;
};

const DropdownStoryWrapper = (props: StoryWrapperProps) => {
  const [selected, setSelected] = useState<string[]>([]);

  return <Dropdown {...props} value={selected} onChange={setSelected} />;
};

export default DropdownStoryWrapper;
