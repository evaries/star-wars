import React from 'react';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

const Error = ({ errorMessage }) => {
  const history = useHistory();
  const goToHomePage = () => history.push('/');
  return (
    <Alert
      severity="error"
      action={
        <Button color="inherit" size="small" onClick={goToHomePage}>
          Go to home page
        </Button>
      }
    >
      {errorMessage}
    </Alert>
  );
};
export default Error;
