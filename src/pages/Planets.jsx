import React, { useEffect, useState } from 'react';
import PlanetCard from '../components/PlanetCard';
import Loader from '../components/Loader';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { fetchPlanets } from '../api/index';
import { PLANETS_PER_PAGE } from '../constants/planets';
import { useQuery } from '../hooks/hooks';

const Planets = () => {
  const [fetchedPlanets, setFetchedPlanets] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [amountOfPages, setAmountOfPages] = useState(0);
  const history = useHistory();
  const query = useQuery();

  useEffect(() => {
    const page = query || 1;
    setCurrentPage(+page);
  }, [query]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchPlanets(currentPage);
      const pages = response.count / PLANETS_PER_PAGE;
      setAmountOfPages(pages);
      const planets = response.results;
      setFetchedPlanets(planets);
    };

    if (currentPage) {
      fetchData();
    }
  }, [currentPage]);

  const onPageChange = (event, page) => {
    history.push({
      search: `?page=${page}`,
    });
  };

  const useStyles = makeStyles({
    pagination: {
      display: 'flex',
      justifyContent: 'center',
    },
  });
  const classes = useStyles();
  return (
    <Grid container spacing={3} justify="space-between">
      {fetchedPlanets.length ? (
        <>
          {fetchedPlanets.map((planet) => (
            <Grid item xs key={uuidv4()}>
              <PlanetCard planet={planet} />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Pagination
              className={classes.pagination}
              count={amountOfPages}
              onChange={onPageChange}
              page={currentPage}
            />
          </Grid>
        </>
      ) : (
        <Loader />
      )}
    </Grid>
  );
};
export default Planets;
