import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
  .sidenav {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #111;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px;
    overflow-y: hidden;
  }

  .sidenav--open {
    width: 250px;
  }

  .sidenav a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
    transition: 0.3s;
  }

  .sidenav a:hover {
    color: #f1f1f1;
  }

  .sidenav .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
  }

  @media screen and (max-height: 450px) {
    .sidenav {padding-top: 15px;}
    .sidenav a {font-size: 18px;}
  }

  .modal {
  position: fixed;
  z-index: 100;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  pointer-events: none;
}

.backdrop {
  position: absolute;

  background-color: black;
  width: 100%;
  height: 100%;

  opacity: 0;
  margin-top: -92px;

  transition: opacity 0.32s ease-out;
}

.content {
  background-color: white;
  width: 527px;
  z-index: 2;

  border-radius: 5px;
  padding: 20px 20px 0 20px;

  position: relative;
  top: 100%;

  transition: top 0.23s ease-out;
}

.modal.active {
  pointer-events: auto;
}

.modal.active > .backdrop {
  opacity: 0.5;
}

.modal.active > .content {
  top: 0%;
}
`;

export default GlobalStyle;
