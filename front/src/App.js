import React, { useState } from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SimuladorRegressivo from './views/SimuladorRegressivo';
import SimuladorProgressivo from './views/SimuladorProgressivo';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Logo from './logo.PNG';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  myButton: {
    marginRight: theme.spacing(2),
  },
  button_pvca: {
    backgroundColor: 'bisque'
  },
  button_scd: {
    backgroundColor: 'darkcyan',
    color: 'white'
  },
  button_apix: {
    backgroundColor: 'bisque',
  },
  menu: {
    height: '90vh',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-around'
  },
  imagebc: {
    width: '20%',
    marginLeft: '-11%',
    display: 'initial',
    position: 'absolute',
    marginTop: '100px'
  },
  title: {
    color: 'white',
    flexGrow: 1,
  }
}));

function App() {

  const classes = useStyles();

  //MODULES
  const [home, setHome] = useState(true);
  const [simulacaoProgressiva, setSimulacaoProgressiva] = useState(false);
  const [simulacaoRegressiva, setSimulacaoRegressiva] = useState(false);

  const goTo = (module) => {
    if(module === 'home'){ 
      setHome(true);
      setSimulacaoRegressiva(false);
      setSimulacaoProgressiva(false);
    }
    if(module === 'simulacao-progressiva'){
      setHome(false);
      setSimulacaoRegressiva(false);
      setSimulacaoProgressiva(true);
    }
    if(module === 'simulacao-regressiva'){
      setHome(false);
      setSimulacaoRegressiva(true);
      setSimulacaoProgressiva(false);
    }
  }


  const getHome = () => {
    if(home){
      return (
        <div className={classes.menu}>
          <Button size="large" onClick={(e) => goTo('simulacao-progressiva')} variant="contained" color="primary">
          Simulação de Tributação Regressiva 
          </Button>
          <Button size="large" onClick={(e) => goTo('simulacao-regressiva')} variant="contained" color="secondary">
          Simulação de Tributação Progressiva 
          </Button>
        </div>
      )
    }else{
      return null;
    }
  }

  return (
    <div className="App">
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Button onClick={(e) => goTo('home')} color="inherit">Página inicial</Button>
          </Toolbar>
        </AppBar>
      </div>
      <div >
        {home ? <img className={classes.imagebc} alt="Bacen Logo" src={Logo} /> : null}
      </div>
      {getHome()}
      {simulacaoProgressiva ? <SimuladorProgressivo /> : null}
      {simulacaoRegressiva ? <SimuladorRegressivo /> : null}
    </div >
  );
}

export default App;
