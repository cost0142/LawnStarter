// src/Pages/PersonDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

function PersonDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // verifica se veio via state
  const statePerson = location.state?.person;
  const [person, setPerson] = useState(statePerson || null);

  useEffect(() => {
    // se já veio do SearchPage, não precisa fazer o fetch
    if (statePerson) return;

    const fetchPerson = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/people/${id}`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setPerson(data);
      } catch (err) {
        console.error('Erro ao buscar personagem:', err);
      }
    };

    fetchPerson();
  }, [id, statePerson]);

  if (!person) return <p>Carregando...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>{person.name}</h1>
      <p><strong>Birth Year:</strong> {person.birth_year}</p>
      <p><strong>Gender:</strong> {person.gender}</p>
      <p><strong>Height:</strong> {person.height} cm</p>
      <p><strong>Mass:</strong> {person.mass} kg</p>
      <p><strong>Eye Color:</strong> {person.eye_color}</p>
      <p><strong>Hair Color:</strong> {person.hair_color}</p>

      <button onClick={() => navigate('/')}>🔙 Voltar</button>
    </div>
  );
}

export default PersonDetailPage;
