import React, { useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import withStyles from '@material-ui/core/styles/withStyles';

// import { LanguageContext } from './contexts/LanguageContext';

function Form(props) {
  // const { name, setName } = useContext(LanguageContext);

  const { classes, toggleLogInForm } = props;

  const handleSubmit = () => {
    toggleLogInForm();
  };

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">Sign Input</Typography>
        <form onSubmit={toggleLogInForm} className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Name</InputLabel>
            <Input id="email" name="email"></Input>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input id="password" name="password"></Input>
          </FormControl>
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Remember"
          />
          <Button
            variant="contained"
            type="submit"
            fullWidth
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </main>
  );
}

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up('md')]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

export default withStyles(styles)(Form);
