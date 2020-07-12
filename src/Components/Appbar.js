import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  }
  
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>

        <AppBar position="static">

          <Toolbar>
            <img src={process.env.PUBLIC_URL + "/images/logo.jpg"} alt="logo" width="50px" height="50px"/>
            <Typography variant="h6" className={classes.title}>
              COVID-19 TRACKER APP
          </Typography>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

      </div>

      <div>
        <img src={process.env.PUBLIC_URL + "/images/bg.jpg"} width="100%" alt="bg"/>
      </div>
    </>

  );
}
