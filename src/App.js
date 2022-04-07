import { useEffect, useState } from 'react';
import './App.css';
import { RestaurantListItem } from './services/components/RestaurantListItem';
import { fetchBusinesses } from './services/yelp';

export default function App() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [zipCode, setZipCode] = useState([]);
  const [search, setSearch] = useState([]);

  // TODO -- add state for zip / search and add event listeners to the inputs

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBusinesses();
      setBusinesses(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleChange = async () => {
    console.log('display search info');
    // TODO -- add event for button click to handle calling fetchBusinesses with zip / search
  };
  return (
    <div className="App">
      <h1>Alchemy Restaurant Finder</h1>
      <div className="query-form">
        <div className="form-control">
          <label>Zip:</label>
          <input type="text" placeholder={zipCode} onChange={() => setZipCode('')} />
        </div>
        <div className="form-control">
          <label>Query:</label>
          <input type="text" placeholder={search} onChange={() => setSearch('')} />
        </div>
        <button onClick={handleChange}>Search</button>
      </div>
      {loading && <div className="loader"></div>}
      {!loading && businesses.map((b) => <RestaurantListItem key={b.id} {...b} />)}
    </div>
  );
}
