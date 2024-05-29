import React, { useState, ChangeEvent, KeyboardEvent } from "react";

interface HashtagsInputProps {
  value: string[];
  onChange: (hashtags: string[]) => void;
}

const HashtagsInput: React.FC<HashtagsInputProps> = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      if (inputValue.trim()) {
        const newHashtag = `#${inputValue.trim()}`;
        onChange([...value, newHashtag]);
        setInputValue("");
      }
    }
  };

  const handleRemoveHashtag = (index: number) => {
    const newHashtags = value.filter((_, i) => i !== index);
    onChange(newHashtags);
  };

  return (
    <div className="flex flex-wrap items-center border rounded-lg p-2 w-full">
      {value.map((hashtag, index) => (
        <div
          key={index}
          className="flex items-center m-1 bg-gray-200 text-gray-700 px-2 py-1 rounded-full"
        >
          {hashtag}
          <button
            type="button"
            className="ml-1 text-red-500"
            onClick={() => handleRemoveHashtag(index)}
          >
            &times;
          </button>
        </div>
      ))}
      <input
        type="text"
        className="flex-grow p-2 outline-none"
        value={inputValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setInputValue(e.target.value)
        }
        onKeyDown={handleKeyDown}
        placeholder="Add hashtags"
      />
    </div>
  );
};

export default HashtagsInput;
