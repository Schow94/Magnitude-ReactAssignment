import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

function Navbar(props) {
  const { classes } = props;
  const { login } = classes;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          />
          <Typography variant="h6" className={classes.title}>
            Welcome Teacher
          </Typography>
          <Button className={login}>Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  login: {
    backgroundColor: 'red',
    padding: '0.7em'
  }
});

export default withStyles(styles)(Navbar);
