import React from 'react';

const PlanetInfo = ({ planet }) => {
  const {
    orbital_period,
    diameter,
    climate,
    gravity,
    terrain,
    population,
  } = planet;
  return (
    <>
      <p>Rotation period: {orbital_period}</p>
      <p>Diameter: {diameter}</p>
      <p>Climate: {climate}</p>
      <p>Gravity: {gravity}</p>
      <p>Terrain: {terrain}</p>
      <p>Population: {population}</p>
    </>
  );
};
export default PlanetInfo;
