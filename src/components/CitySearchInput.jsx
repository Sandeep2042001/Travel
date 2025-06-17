import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useWeather } from '@/contexts/WeatherContext';
import { cn } from '@/lib/utils';

const CitySearchInput = ({ onCitySelect, initialQuery = '', inputClassName, buttonClassName }) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const { fetchCitySuggestions, isLoading: weatherLoading } = useWeather();
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target) &&
          suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setIsSuggestionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length >= 3) {
      const fetchedSuggestions = await fetchCitySuggestions(query);
      setSuggestions(fetchedSuggestions);
      setIsSuggestionsOpen(true);
    } else {
      setSuggestions([]);
      setIsSuggestionsOpen(false);
    }
  };

  const handleSuggestionClick = (city) => {
    setSearchQuery(city.value);
    setSuggestions([]);
    setIsSuggestionsOpen(false);
    onCitySelect(city); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (suggestions.length > 0 && suggestions.find(s => s.value.toLowerCase() === searchQuery.toLowerCase())) {
      handleSuggestionClick(suggestions.find(s => s.value.toLowerCase() === searchQuery.toLowerCase()));
    } else {
       onCitySelect({ name: searchQuery, value: searchQuery}); // Pass string if no suggestion selected
    }
    setIsSuggestionsOpen(false);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="relative" ref={inputRef}>
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 z-10" />
        <Input
          type="text"
          placeholder="Search for any city or destination..."
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => searchQuery.length >=3 && suggestions.length > 0 && setIsSuggestionsOpen(true)}
          className={cn("pl-12 pr-32 h-14 text-lg glass-effect border-white/20 text-white placeholder:text-gray-400", inputClassName)}
        />
        <Button
          type="submit"
          disabled={weatherLoading}
          className={cn("absolute right-2 top-1/2 transform -translate-y-1/2 weather-gradient text-white hover:opacity-90", buttonClassName)}
        >
          {weatherLoading ? '...' : 'Search'}
        </Button>
      </div>
      <AnimatePresence>
        {isSuggestionsOpen && suggestions.length > 0 && (
          <motion.ul
            ref={suggestionsRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-20 w-full mt-1 glass-effect border-white/20 rounded-md shadow-lg max-h-60 overflow-auto"
          >
            {suggestions.map((city, index) => (
              <li
                key={`${city.name}-${city.country}-${index}`}
                onClick={() => handleSuggestionClick(city)}
                className="px-4 py-3 hover:bg-white/10 cursor-pointer text-white flex items-center"
              >
                <MapPin className="h-4 w-4 mr-2 text-blue-400" />
                {city.name}
                {city.state && <span className="text-gray-400 text-xs ml-1">, {city.state}</span>}
                <span className="text-gray-400 text-xs ml-1">, {city.country}</span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </form>
  );
};

export default CitySearchInput;