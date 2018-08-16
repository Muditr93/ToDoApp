import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  baseTheme: {
    palette: {
      primary1Color: '#111111',
    },
  },
  raisedButton: {
    primaryColor: '#111111',
  },
  floatingActionButton: {
    color: '#111111',
  },
  card: {
    titleColor: 'rgba(0, 0, 0, 0.87)',
    subtitleColor: 'rgba(0, 0, 0, 0.54)',
  },
  appBar: {
    background: 'linear-gradient(to right, #333333 , #999999)',
  },
});

export { muiTheme };
