import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchComponent = () => {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const makeRequest = async () => {
      const response = await axios.post("/doctor/searchByNameOrSpec", {
        name: "", // The search term.
        speciality: "", // The speciality of the doctor to search for.
      });

      setSearchResults(response.data);
    };

    makeRequest();
  }, []);

  return (
    <div>
      <h1>Search Results</h1>
      <ul>
        {searchResults.map((doctor) => (
          <li key={doctor.id}>{doctor.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;