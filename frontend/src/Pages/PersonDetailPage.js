// src/Pages/PersonDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

function PersonDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const statePerson = location.state?.person;
  const [person, setPerson] = useState(statePerson || null);
  const [filmTitles, setFilmTitles] = useState([]);

  useEffect(() => {
    if (!statePerson) {
      const fetchPerson = async () => {
        try {
          const res = await fetch(`http://localhost:3001/api/people/${id}`);
          if (!res.ok) throw new Error('Erro ao buscar personagem');
          const data = await res.json();
          setPerson(data);
        } catch (err) {
          console.error(err);
        }
      };
      fetchPerson();
    }
  }, [id, statePerson]);

  useEffect(() => {
    const fetchFilms = async () => {
      if (!person?.films) return;
      try {
        const titles = await Promise.all(
          person.films.map(async (filmUrl) => {
            const res = await fetch(filmUrl);
            const data = await res.json();
            return { title: data.title, url: filmUrl };
          })
        );
        setFilmTitles(titles);
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      }
    };
    fetchFilms();
  }, [person]);

  if (!person) return <p style={{ padding: 40 }}>Carregando...</p>;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', background: '#f4f4f4', minHeight: '100vh', padding: 40 }}>
      <h2 style={{ textAlign: 'center', color: '#00c26e', marginBottom: 40 }}>SWStarter</h2>

      <div
        style={{
          background: '#fff',
          padding: 30,
          borderRadius: 8,
          maxWidth: 800,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        {/* Lado esquerdo - detalhes */}
        <div style={{ width: '45%' }}>
          <h3 style={{ marginBottom: 10 }}>{person.name}</h3>
          <hr />
          <p><strong>Birth Year:</strong> {person.birth_year}</p>
          <p><strong>Gender:</strong> {person.gender}</p>
          <p><strong>Eye Color:</strong> {person.eye_color}</p>
          <p><strong>Hair Color:</strong> {person.hair_color}</p>
          <p><strong>Height:</strong> {person.height}</p>
          <p><strong>Mass:</strong> {person.mass}</p>
        </div>

        {/* Lado direito - filmes */}
        <div style={{ width: '45%' }}>
          <h3 style={{ marginBottom: 10 }}>Movies</h3>
          <hr />
          {filmTitles.map((film, i) => (
            <p key={i}>
              <a href={film.url} target="_blank" rel="noreferrer">
                {film.title}
              </a>
            </p>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 30, textAlign: 'center' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            backgroundColor: '#00c26e',
            color: '#fff',
            border: 'none',
            padding: '12px 24px',
            fontWeight: 'bold',
            borderRadius: 20,
            cursor: 'pointer',
          }}
        >
          BACK TO SEARCH
        </button>
      </div>
    </div>
  );
}

export default PersonDetailPage;
