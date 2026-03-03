import './FilterBar.scss';
import type { ChangeEvent } from 'react';

interface FilterBarProps {
  onSearch: (query: string) => void;
}

export const FilterBar = ({ onSearch }: FilterBarProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    onSearch(e.target.value);
  };

  return (
    <div id="filterBar">
      <input
        className="searchBar"
        name="searchBar"
        type="text"
        placeholder="Search resources by name…"
        onChange={handleChange}
        aria-label="Search resources"
      />
    </div>
  );
};
