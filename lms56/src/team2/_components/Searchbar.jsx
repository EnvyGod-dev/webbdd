/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); 

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); 
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <input
        type="text"
        placeholder="Хайх"
        value={searchTerm}
        onChange={handleSearchChange}
        className="border rounded-xl px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />
    </div>
  );
};

export default SearchBar;
