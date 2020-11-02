import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import { fetchResident, fetchPlanet } from '../api/index';
import Loader from '../components/Loader';
import Error from '../components/Error';
import PlanetHeader from '../components/PlanetHeader';
import PlanetInfo from '../components/PlanetInfo';
import PlanetResidents from '../components/PlanetResidents';
import { generalError, planetNotFoundError } from '../constants/errors';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  name: {
    fontSize: 25,
    textAlign: 'center',
  },
  planetSummary: {
    marginLeft: 30,
  },
  planetResidens: {},
});

const Planet = () => {
  const classes = useStyles();

  const [residents, setResidents] = useState([]);
  const [planet, setPlanet] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { planetId } = useParams();

  useEffect(() => {
    const getPlanet = async (planetId) => {
      try {
        setIsLoading(true);

        const planet = await fetchPlanet(planetId);
        setPlanet(planet);
      } catch (e) {
        const error =
          e.response.status === 404 ? planetNotFoundError : generalError;

        setErrorMessage(error);
      } finally {
        setIsLoading(false);
      }
    };
    getPlanet(planetId);
  }, [planetId]);

  useEffect(() => {
    if (!planet?.residents?.length) {
      return;
    }
    planet.residents.forEach((resident) => {
      const fetchData = async () => {
        const res = await fetchResident(resident);
        setResidents((residents) => [...residents, res]);
      };
      fetchData();
    });
  }, [planet]);

  return (
    <div className={classes.container}>
      {isLoading && <Loader />}
      {errorMessage && <Error errorMessage={errorMessage} />}
      {planet && (
        <Grid container spacing={3}>
          <Grid item xs={12} className={classes.name}>
            <PlanetHeader name={planet.name} />
          </Grid>
          <Grid item xs={6}>
            <div className={classes.planetSummary}>
              <PlanetInfo planet={planet} />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.planetResidens}>
              <PlanetResidents residents={residents} />
            </div>
          </Grid>
        </Grid>
      )}
    </div>
  );
};
export default Planet;
