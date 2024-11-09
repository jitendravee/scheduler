import React from "react";

interface InputProps {
  label: string;
  title: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  title,
  placeholder = "",
  type = "text",
  value,
  onChange,
  required = false,
}) => {
  return (
    <div className="flex flex-col mb-4">
      {label && (
        <label className="text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        title={title}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:outline-none"
      />
    </div>
  );
};
