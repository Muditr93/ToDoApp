import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  baseTheme: {
    palette: {
      // primary1Color: '#0033FF',
    },
  },
  raisedButton: {
  },
  floatingActionButton: {
    color: '#43c8fa',
  },
  card: {
    titleColor: 'rgba(0, 120, 255, 0.87)',
    subtitleColor: 'rgba(0, 120, 255, 0.54)',
  },
  appBar: {
    background: 'linear-gradient(to right, #00C5FF , #5226FF)',
  },
});

export { muiTheme };
