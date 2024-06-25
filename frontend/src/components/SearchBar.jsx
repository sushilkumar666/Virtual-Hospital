// SearchBar.js
import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const SearchBar = ({ setSearchResults }) => {
  const [query, setQuery] = useState("");
  const identity = useSelector((state) => state.auth.identity);
  console.log("checking identity data " + identity);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const patientResponse = await axios.get(
        `http://localhost:8000/api/v1/search/patients?query=${query}`
      );
      const doctorResponse = await axios.get(
        `http://localhost:8000/api/v1/search/doctors?query=${query}`
      );
      setSearchResults({
        patients: patientResponse.data,
        doctors: doctorResponse.data,
      });
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search patients or doctors..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
