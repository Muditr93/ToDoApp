import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #E0E0E0;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
  .App {
  text-align: center;
  width: 95%;
  margin: 15px auto;
  }

.container-drag {
  padding: 0 3em;
  background: #E0E0E0;
  width: 100%;
  text-align: center;
}

.wip {
  height: 100vh;
  left: 0;
  top: 10;
  background-color: #EEEEEE;
  border-right: 1px dotted;
}

.header {
  display: inline-block;
  margin: 0;
  padding: 0;
  background-color: #E0E0E0;
  width:100%;
}

.task-header {
  padding: 5px;
  text-align: left;
  color: white;
  display: inline-block;
  background-color: #504fd3;
  width:100%;
}

.droppable {
  margin: 0px 5px;
  height: 80vh;
  right: 0;
  top: 10;
  background-color: #d0d7e3;
}

.draggable {
  margin: 5px;
  width: 95%;
  height: 80px;
  background-color: yellow;
  margin: 5px auto;
}

`;
