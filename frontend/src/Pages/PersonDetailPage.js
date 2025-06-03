// src/Pages/PersonDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styles from './Search.module.css';

function PersonDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const statePerson = location.state?.person;
  const [person, setPerson] = useState(statePerson || null);
  const [filmTitles, setFilmTitles] = useState([]);
  const [isExiting, setIsExiting] = useState(false);

  const handleBack = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate('/');
    }, 400);
  };
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
      if (!Array.isArray(person?.films) || person.films.length === 0) return;

      try {
        const titles = await Promise.all(
          person.films.map(async (filmUrl) => {
            const filmId = filmUrl.match(/\/films\/(\d+)\//)?.[1];
            if (!filmId) return null;
            const res = await fetch(`http://localhost:3001/api/proxy/films/${filmId}`);
            const data = await res.json();
            console.log('PersonDetailPage rendered -----+++++->>>>', data);
            return { title: data.title, url: filmUrl };
          })
        );
        setFilmTitles(titles.filter(Boolean));
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      }
    };

    fetchFilms();
  }, [person]);



  if (!person) return <p style={{ padding: 40 }}>Carregando...</p>;



  return (
    <div className={`${styles.container} ${isExiting ? styles.fadeOut : ''}`}>
      <h1 className={styles.title}>⭐ SWStarter</h1>
      <p className={styles.title}> Details</p>

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

        <div style={{ width: '45%' }}>
          <h3 style={{ marginBottom: 10 }}>Movies</h3>
          <hr />
          {filmTitles.length === 0 ? (
            <p style={{ color: '#888' }}>No movies available.</p>
          ) : (
            filmTitles.map((film, i) => (
              <p key={i}>
                <a href={film.url} target="_blank" rel="noreferrer">
                  {film.title}
                </a>
              </p>
            ))
          )}
        </div>

      </div>

      <div style={{ marginTop: 30, textAlign: 'center' }}>
        <button
          className={styles.backButton}
          onClick={handleBack}
        >
          BACK TO SEARCH
        </button>
      </div>
    </div>
  );
}

export default PersonDetailPage;


