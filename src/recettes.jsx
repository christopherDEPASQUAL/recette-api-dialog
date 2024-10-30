import React, { useState, useEffect } from 'react';

const RecetteDuJour = () => {
  const [recette, setRecette] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        if (res.ok) {
          const data = await res.json();
          setRecette(data.meals[0]);
        }
      } catch (err) {
        console.log('Erreur pendant la récupération :', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getDayOfWeek = () => {
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const currentDay = new Date().getDay();
    return days[currentDay];
  };

  const toggleModal = () => setModalVisible(!modalVisible);

  return (
    <>
    <div>
      
     <h1>Recette du {getDayOfWeek()}</h1>
      {loading ? ( 
        <p>Chargement de la data en cours...</p>
      ) : recette ? (
        <div className='card'>
          <h2>Nom de la recette : {recette.strMeal}</h2>
          <img src={recette.strMealThumb} alt={recette.strMeal} />
          <button className='button-voir-plus' onClick={toggleModal}>Consulter les détails de la recette</button>
        </div>
      ) : (
        <p>Chargement en cours...</p>
      )}

      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <button className="close" onClick={toggleModal}>Fermer</button>
            <h3>Ingrédients</h3>
            <ul>
              {Object.keys(recette)
                .filter((key) => key.includes('strIngredient') && recette[key])
                .map((key, i) => (
                  <li key={i}>{recette[key]}</li>
                ))}
            </ul>
            <h3>Instructions</h3>
            <p>{recette.strInstructions}</p>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default RecetteDuJour;
