import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux';

import { Store } from './state/store'
import { Greeting, Search, Rating } from './components'
import { GraphComponent } from './components/containers/graph'
import { GitHub } from './components/github'

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import { red, lightBlue } from 'material-ui/colors';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';

const rootElement = document.getElementById('root') as HTMLElement;

Store.dispatch({type: 'START_GRAPH_STREAM'})

const graphStyle = {
  gridWrapper : {
    textAlign: 'center'
  }
};

const styles = {
  root : {
    backgroundColor: '#2196F3',
    positionStatic : true
  },
};

function CritterAppBar(props){
  return (
    <AppBar style={styles.root}>
      <Toolbar>
              <Typography type="title" color="inherit">
                congress critters
              </Typography>
              <IconButton
                component="a"
                title="GitHub"
                color="contrast"
                href="https://github.com/hareeshnagaraj/poli-gremlin-client">
                <GitHub />
              </IconButton>
          </Toolbar>
    </AppBar>
  );
}

ReactDOM.render(
  <Provider store={Store}>
    <div>
      <Grid>
        <CritterAppBar className={styles.root}>
        </CritterAppBar>
        <Grid item style={graphStyle.gridWrapper}>
          <GraphComponent />
        </Grid>
      </Grid>
    </div>
  </Provider>
  ,
  rootElement
);
