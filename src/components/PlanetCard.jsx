import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  CardActions,
  Card,
  Button,
  Typography,
  CardContent,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 5,
  },
});

const PlanetCard = ({ planet }) => {
  const classes = useStyles();
  let history = useHistory();
  const goToPlanetPage = () => {
    const url = planet.url;
    const pathname = url.split('/api')[1];
    history.push({
      pathname,
    });
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        ></Typography>
        <Typography variant="h5" component="h2">
          {planet.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Climate: {planet.climate}
        </Typography>
        <Typography variant="body2" component="p">
          Population: {planet.population}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={goToPlanetPage}
        >
          More Info
        </Button>
      </CardActions>
    </Card>
  );
};

export default PlanetCard;
