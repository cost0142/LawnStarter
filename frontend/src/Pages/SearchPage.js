import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Circles } from 'react-loader-spinner';
import styles from './Search.module.scss';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const person = location.state?.person;

  useEffect(() => {
    if (person) setQuery(person.name);
  }, [person]);

  const handleSearch = async () => {
    if (!query.trim()) {
      setMessage('Digite um nome para buscar');
      setResults([]);
      return;
    }
    setLoading(true);
    setMessage('');
    setResults([]);
    try {
      const res = await fetch(`http://localhost:3001/api/people?search=${query}`);
      // const data = await res.json();
      const data = await res.json();
      setResults(data.results || []);
      console.log('🔍 Dados recebidos do backend: -=-=-=-=-=-=-=-HYGOR=-=-=-=-=-', results, data);
      if (!data.results.length) setMessage('Nenhum personagem encontrado.');
    } catch (error) {
      console.error('Erro ao buscar na SWAPI:', error);
      setMessage('Erro ao buscar personagem.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>⭐ SWStarter</h1>

      <div className={styles.wrapper}>
        <div className={styles.searchBox}>
          <label className={styles.label}>What are you searching for?</label>
          <div style={{ marginTop: 10, marginBottom: 20 }}>
            <input type="radio" checked readOnly /> <strong>People</strong>
            <input type="radio" disabled style={{ marginLeft: 12 }} /> Movies
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a name..."
            className={styles.input}
          />

          <button onClick={handleSearch} className={styles.button}>
            <span role="img" aria-label="search">🔍</span> SEARCH
          </button>
        </div>

        <div className={styles.resultsBox}>
          <h3>Results</h3>
          {loading && (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 20 }}>
              <Circles height={40} width={40} color="#00c26e" />
            </div>
          )}
          {message && <p style={{ color: '#f43f5e' }}>{message}</p>}

          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {results.map((person, index) => {
              const personId = person.url.match(/people\/(\d+)\//)?.[1];
              const avatarUrl = `https://api.dicebear.com/7.x/thumbs/svg?seed=${person.name}`;
              return (
                <li key={index} className={styles.card}>
                  <div className={styles.cardInfo}>
                    <img
                      className={styles.avatar}
                      src={avatarUrl}
                      alt={person.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://placekitten.com/40/40';
                      }}
                    />
                    <strong>{person.name}</strong>
                  </div>
                  <button
                    onClick={() => navigate(`/person/${personId}`, { state: { person } })}
                    className={styles.detailsButton}
                  >
                    SEE DETAILS
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
