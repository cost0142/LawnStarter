import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const person = location.state?.person;

  useEffect(() => {
    if (person) {
      setQuery(person.name);
    }
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
      const data = await res.json();
      console.log(data);
      if (data.results && data.results.length > 0) {
        setResults(data.results);
      } else {
        setMessage('Nenhum personagem encontrado.');
      }
    } catch (error) {
      console.error('Erro ao buscar na SWAPI:', error);
      setMessage('Erro ao buscar personagem.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMetric = async () => {
    if (!query.trim()) {
      setMessage('Digite um nome antes de enviar a métrica.');
      return;
    }

    try {
      const res = await fetch('http://localhost:3001/api/metrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metric_type: 'search',
          metric_data: query,
        }),
      });

      const data = await res.json();
      setMessage(data.message);
    } catch (error) {
      console.error('Erro ao enviar métrica:', error);
      setMessage('Erro ao enviar métrica');
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', background: '#f4f4f4', minHeight: '100vh', padding: 40 }}>
      <h2 style={{ textAlign: 'center', color: '#00c26e', marginBottom: 40 }}>SWStarter</h2>

      <div style={{ display: 'flex', gap: 40, justifyContent: 'center', alignItems: 'flex-start' }}>
        {/* Lado esquerdo: Formulário de busca */}
        <div style={{ background: '#fff', padding: 20, borderRadius: 8, width: 300, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <label style={{ fontWeight: 'bold' }}>What are you searching for?</label>
          <div style={{ marginTop: 10, marginBottom: 20 }}>
            <input type="radio" checked readOnly /> <strong>People</strong>
            <input type="radio" disabled style={{ marginLeft: 12 }} /> Movies
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a name..."
            style={{ width: '100%', padding: 10, marginBottom: 15, borderRadius: 4, border: '1px solid #ccc' }}
          />

          <button
            onClick={handleSearch}
            style={{
              width: '100%',
              backgroundColor: '#00c26e',
              color: '#fff',
              padding: 12,
              border: 'none',
              borderRadius: 20,
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            SEARCH
          </button>
        </div>

        {/* Lado direito: Lista de resultados */}
        <div style={{ background: '#fff', padding: 20, borderRadius: 8, width: 500, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginBottom: 20 }}>Results</h3>

          {loading && <p>Loading...</p>}
          {message && <p>{message}</p>}

          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {results.map((person, index) => {
              const personId = person.url.match(/people\/(\d+)\//)?.[1];
              return (
                <li
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 0',
                    borderBottom: '1px solid #eee',
                  }}
                >
                  <strong>{person.name}</strong>
                  <button
                    // onClick={() => navigate(`/person/${personId}`)}
                    onClick={() => navigate(`/person/${personId}`, { state: { person } })}
                    style={{
                      backgroundColor: '#00c26e',
                      color: 'white',
                      padding: '8px 14px',
                      border: 'none',
                      borderRadius: 20,
                      cursor: 'pointer',
                      fontWeight: 'bold',
                    }}
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
