import { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null); // Add error state

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch("https://restcountries.com/v3.1/all");
        if (resp.ok) {
          const data = await resp.json();
          setCountries(data);
        } else {
          throw new Error("Failed to fetch countries");
        }
      } catch (err) {
        setError("Failed to fetch countries"); // Update error state
        console.error(err.message); // Log the error to the console
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const data = countries.filter((country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(data);
  }, [search, countries]);

  return (
    <div>
      <div className="inp">
        <input
          type="text"
          placeholder="Enter a country"
          onChange={(e) => handleChange(e)}
          value={search}
        />
      </div>
      <div className="App">
        {error ? ( // Display error message if there's an error
          <div className="error-message" style={{ color: "red" }}>
            {error}
          </div>
        ) : search === "" ? (
          countries.map((country) => {
            return (
              <div className="countryCard" key={country.cca3}>
                <img src={country.flags.png} alt={country.flag} />
                <p>{country.name.common}</p>
              </div>
            );
          })
        ) : (
          filtered.map((country) => {
            return (
              <div className="countryCard" key={country.cca3}>
                <img src={country.flags.png} alt={country.flag} />
                <p>{country.name.common}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default App;
