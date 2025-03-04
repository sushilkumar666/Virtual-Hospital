// SearchBar.js
import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { searchQueryFunc } from "../store/searchSlice";
import { IoIosSearch } from "react-icons/io";

const SearchBar = () => {
  const identity = useSelector((state) => state.auth.identity);
  const searchQuery = useSelector((state) => state.search.searchQuery);
  const [query, setQuery] = useState(searchQuery);
  const dispatch = useDispatch();

  // console.log("checking identity data " + identity);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const onInputChange = (e) => {
    setQuery(e.target.value);
    console.log(e.target.value + " this is value");
    if (!e.target.value) {
      dispatch(searchQueryFunc({ query: "" }));
      console.log("ok query is empty");
    }
  };
  const handleSearch = () => {
    dispatch(searchQueryFunc({ query }));
  };

  return (
    <div className="flex items-center   rounded-sm bg-white">
      <input
        type="text"
        value={query}
        className="p-3 focus:outline-none"
        onChange={onInputChange}
        placeholder="Search patients or doctors..."
      />
      <button onClick={handleSearch}>
        <IoIosSearch size="30" />
      </button>
    </div>
  );
};

export default SearchBar;
