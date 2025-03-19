import React from 'react';
import { Icon } from '@iconify/react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
}) => {
  return (
    <div className="relative my-4">
      <Icon
        icon="mdi:magnify"
        className="absolute left-3 top-2.5 text-gray-500"
        width="20"
        height="20"
      />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full border rounded-md pl-10 pr-10 py-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
          onClick={() => onChange('')}
        >
          <Icon icon="mdi:close" width="20" height="20" />
        </button>
      )}
    </div>
  );
};
