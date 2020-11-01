import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Resident from './Resident';
import NoResidentsMessage from '../components/NoResidentsMessage';

const PlanetResidents = ({ residents }) => {
  return (
    <>
      <p>Residents:</p>
      {!residents ? (
        <NoResidentsMessage />
      ) : (
        <ul>
          {residents.map((resident) => (
            <li key={uuidv4()}>
              <Resident resident={resident} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
export default PlanetResidents;
