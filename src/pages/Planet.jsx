import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import { fetchPeoples, fetchPlanet } from '../api/index';
import Loader from '../components/Loader';
import PlanetHeader from '../components/PlanetHeader';
import PlanetInfo from '../components/PlanetInfo';
import PlanetResidents from '../components/PlanetResidents';
import NoResidentsMessage from '../components/NoResidentsMessage';

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
  const [residents, setResidents] = useState([]);
  const [planet, setPlanet] = useState(null);
  const classes = useStyles();
  const { planetId } = useParams();

  useEffect(() => {
    const getPlanet = async (planetId) => {
      const planet = await fetchPlanet(planetId);
      setPlanet(planet);
    };
    getPlanet(planetId);
  }, [planetId]);

  useEffect(() => {
    if (!planet?.residents?.length) {
      return;
    }
    planet.residents.forEach((people) => {
      const fetchData = async (people) => {
        const res = await fetchPeoples(people);
        setResidents((residents) => [...residents, res]);
      };
      fetchData(people);
    });
  }, [planet]);

  return (
    <div className={classes.container}>
      {!planet ? (
        <Loader />
      ) : (
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
