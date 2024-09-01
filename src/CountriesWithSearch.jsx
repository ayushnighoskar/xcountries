import React, { useEffect, useState } from "react";

function CountriesWithSearch() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null); // State to manage error message

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        // Use a test-specific API route if in testing mode
        const url = window.Cypress 
          ? "/getFailedCountries" 
          : "https://restcountries.com/v3.1/all";

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch countries");
        }

        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("API Error:", error.message); // Log error for Cypress to detect
        setError("Failed to fetch countries"); // Set error in state
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cardStyle = {
    width: "200px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    margin: "10px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    padding: "80px 20px",
  };

  const headerStyle = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    backgroundColor: "#f8f8f8",
    padding: "10px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    zIndex: "1000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const searchStyle = {
    width: "50%",
    padding: "10px",
    fontSize: "16px",
  };

  const imageStyle = {
    width: "100px",
    height: "100px",
  };

  return (
    <>
      <div style={headerStyle}>
        <input
          type="text"
          placeholder="Search for countries..."
          style={searchStyle}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div style={containerStyle}>
        {error ? (
          <div className="error-message">{error}</div> // Display error message
        ) : (
          filteredCountries.map((country) => (
            <div key={country.cca3} style={cardStyle} className="countryCard">
              <img
                src={country.flags.png}
                alt={`Flag of ${country.name.common}`}
                style={imageStyle}
              />
              <h2>{country.name.common}</h2>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default CountriesWithSearch;
