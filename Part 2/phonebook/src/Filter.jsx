import React from 'react';

const Filter = ({ searchTerm, handleSearch }) => {
  return (
    <div>
      Search: <input type="text" value={searchTerm} onChange={handleSearch} />
    </div>
  );
};

export default Filter;