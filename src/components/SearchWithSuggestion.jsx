/* eslint-disable react-hooks/exhaustive-deps */
import { useDebounce } from '@uidotdev/usehooks';
import { useState, useEffect } from 'react';
import { FormControl, InputGroup, Dropdown, Button, Alert } from 'react-bootstrap';
import { apiUrl } from '../constants/Constants';
import { FaSearch } from 'react-icons/fa';

function SearchWithSuggestions({onSearch}) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Debounce the input by 500ms
  const debouncedQuery = useDebounce(query, 500);

  // Fetch suggestions from the API whenever the debounced query changes
  const fetchSuggestions = async () => {
    if (debouncedQuery) {
      setLoading(true);
      try {
        // Replace with your API endpoint for fetching term suggestions
        const response = await fetch(`${apiUrl}/suggest/${debouncedQuery}`);
        const data = await response.json();
        setSuggestions(data.data);
        console.log(data);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false); // Hide suggestions if query is empty
    }
  };
  useEffect(() => {
    fetchSuggestions();
  }, [debouncedQuery]);

  // Handle selecting a suggestion
  const handleSelectSuggestion = (title, artist) => {
    // setQuery(title + " - " + artist);
    setShowSuggestions(false); // Hide suggestions when one is selected
    onSearch({title, artist});
  };

  return (
    <div>
      {/* <h2>Search with Debounced Suggestions</h2> */}
      <InputGroup className="mb-3 mt-3">
        <FormControl
          placeholder="查詢歌曲..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant="secondary" onClick={() => {
          fetchSuggestions();
        }}>
          <FaSearch /> 搜尋
        </Button>
      </InputGroup>

      {/* Show suggestions in a dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <Dropdown.Menu show style={styles.dropdownMenu}>
          {suggestions.map(({title, artist: {name}}, index) => (
            <Dropdown.Item style={styles.dropdownItem} key={index} onClick={() => handleSelectSuggestion(title, name)}>
              {title} - {name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      )}

      {/* Show loading indicator */}
      {loading && <p>載入中...</p>}

      {/* Show no results message if no suggestions found */}
      {!loading && debouncedQuery && suggestions.length === 0 && <Alert variant='warning'>找不到歌曲~</Alert>}
    </div>
  );
}

const styles = {
  dropdownMenu: {
    width: "400px",
    maxWidth: "100%"
  },
  dropdownItem: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  }
}

export default SearchWithSuggestions;
