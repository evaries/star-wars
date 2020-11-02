import React, { useEffect, useState } from 'react';
import PlanetCard from '../components/PlanetCard';
import Loader from '../components/Loader';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { fetchPlanets } from '../api/index';
import { planetsPerPage } from '../constants/planets';
import { useQuery } from '../hooks/hooks';
import Error from '../components/Error';
import { generalError, pageNotFoundError } from '../constants/errors';

const Planets = () => {
  const [fetchedPlanets, setFetchedPlanets] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [amountOfPages, setAmountOfPages] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const query = useQuery();

  useEffect(() => {
    const page = query || 1;
    setCurrentPage(+page);
  }, [query]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetchPlanets(currentPage);

        const pages = Math.ceil(response.count / planetsPerPage);
        setAmountOfPages(pages);

        const planets = response.results;
        setFetchedPlanets(planets);
      } catch (e) {
        const error =
          e.response.status === 404 ? pageNotFoundError : generalError;

        setErrorMessage(error);
        setFetchedPlanets([]);
      } finally {
        setIsLoading(false);
      }
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
      {isLoading && <Loader />}
      {errorMessage && <Error errorMessage={errorMessage} />}
      {fetchedPlanets.length && (
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
      )}
    </Grid>
  );
};
export default Planets;
