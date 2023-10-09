import { useState, useEffect } from 'react';
import { IconSearch } from "@tabler/icons-react";
import axios from "axios";

const Location = ({ location, setLocation }) => {
  const [userInput, setUserInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const idLocation = e.target.idLocation.value;

    axios.get(`https://rickandmortyapi.com/api/location/${idLocation}`)
      .then(({ data }) => {
        setLocation(data);
        setShowSuggestions(false);
        setUserInput('')
      })
      .catch((err) => console.log(err));
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSuggestionClick = (dimensionId) => {
    axios.get(`https://rickandmortyapi.com/api/location/${dimensionId}`)
      .then(({ data }) => {
        setLocation(data);
        setShowSuggestions(false);
        setUserInput('')
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (userInput.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    axios.get(`https://rickandmortyapi.com/api/location/?name=${userInput}`)
      .then((response) => {
        const filteredDimensions = response.data.results.filter((location) =>
          location.name.toLowerCase().includes(userInput.toLowerCase())
        );
        setSuggestions(filteredDimensions);
        setShowSuggestions(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userInput]);

  return (
    // Header
    <section className="grid justify-center bg-[url('/headerbg.svg')] gap-10 px-4">
      <div className="flex justify-center relative overflow-hidden py-8">
        <img className="z-10" src="/logo.svg" alt="" />
        <div className="absolute bottom-0">
          <img className="animate-spin-slow" src="/portal.svg" alt="" />
        </div>
      </div>

      {/* Search by id */}
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="flex h-10 border border-[#8EFF8B]">
          <input
            placeholder="Type a location id"
            name="idLocation"
            className="text-white bg-transparent px-2"
            type="number"
          />
          <button className="flex gap-2 items-center bg-[rgba(142,_255,_139,_0.50)] p-2">
            Search <IconSearch size={18} />
          </button>
        </form>
      </div>

      {/* Search by name */}
      <div className='relative flex justify-center h-10'>
        <input
          type="text"
          placeholder="Type a dimension name"
          value={userInput}
          onChange={handleInputChange}
          className="text-white border border-[#8EFF8B] bg-transparent px-2 min-w-[300px]"
        />
        {showSuggestions && (
          <ul className='absolute top-full z-10 bg-black text-[#8EFF8B] border border-[#8EFF8B] p-3 w-[300px]' >
            {suggestions.map((dimension) => (
              <li
                key={dimension.id}
                onClick={() => handleSuggestionClick(dimension.id)}
                className='cursor-pointer hover:bg-[rgba(142,_255,_139,_0.50)] pl-1'>
                {dimension.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Dimension info */}
      <section className="sm:border sm:border-[#8EFF8B] px-9 py-4 grid gap-5 max-w-[950px] mx-auto">
        <h3 className="text-[#8EFF8B] text-2xl font-medium text-center">¡Welcome to {location?.name}!</h3>
        <h2 className="text-center">Dimension id: {location?.id}</h2>

        <ul className="sm:flex sm:gap-16 sm:justify-center text-[#938686] hidden">
          <li><span className="mr-2 text-white">Type:</span> {location?.type ? location?.type : "???"}</li>
          <li><span className="mr-2 text-white">Dimension:</span> {location?.dimension ? location?.dimension : "???"}</li>
          <li><span className="mr-2 text-white">Population:</span> {location?.residents?.length ? location?.residents.length : "???"}</li>
        </ul>
      </section>
    </section>
  );
};

export default Location;