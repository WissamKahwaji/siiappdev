import React from "react";

interface ToggleSwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  label,
  checked,
  onChange,
}) => {
  return (
    <div className="flex items-center gap-x-2">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <label
        className="relative inline-flex items-center cursor-pointer"
        style={{ direction: "ltr" }}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={e => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={`w-11 h-6 bg-white border-2 border-secondary rounded-md peer peer-checked:bg-blue-600`}
        >
          <div
            className={`absolute w-5 h-5  rounded-md border border-gray-300 top-0.5 left-0.5 transition-transform ${
              checked ? "transform translate-x-5 bg-secondary" : "bg-white"
            }`}
          />
        </div>
      </label>
    </div>
  );
};

export default ToggleSwitch;
