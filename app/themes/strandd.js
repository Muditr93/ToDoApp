import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  baseTheme: {
    palette: {
      primary1Color: 'linear-gradient(to right, #ffc53f , #ff6300)',
    },
  },
  raisedButton: {
    primaryColor: '#FF9900',
  },
  floatingActionButton: {
    color: '#ffcf3f',
  },
  card: {
    titleColor: 'rgba(255, 120, 0, 0.87)',
    subtitleColor: 'rgba(255, 120, 0, 0.54)',
  },
  appBar: {
    background: 'linear-gradient(to right, #ffc53f , #ff6300)',
  },
});

export { muiTheme };
