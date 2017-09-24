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
  
  a {
    color: black;
    text-decoration: none;
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
    display: block;
  }
  strong {
    font-weight: bold;
  }
  .logo {
    width: 400px;
    max-width: 100%;
    margin: 0 auto;
    display: block;
  }
  
  .FormInput {
    display: inline-block;
  }
  form > div {
    margin-bottom: 1em;
  }
  h6 {
    font-size: 0.8em;
    font-weight: bold;
    margin-bottom: 0.5em;
  }
  radiogroup {
    padding: 10px;
    border: 1px solid rgba(0,0,0,0.1);
    display: inline-block;
    border-radius: 3px;
  }
  input,
  textarea,
  select {
    font-size: 15px;
    padding: 5px;
    border-radius: 3px;
    border: 1px solid rgba(0,0,0,0.2);
    margin-bottom: 2px;
  }
  .FormInput.-error input,
  .FormInput.-error textarea,
  .FormInput.-error select {
    border-color: #f00;
  }
  .FormError {
    color: #f00;
    font-size: 12px;
    font-weight: bold;
    margin: 5px;
  }
  em {
    font-style: italic;
  }
  .nested {
    padding: 10px;
  }
  .nested > div {
    background: rgba(0,0,0,0.05);
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 10px;
  }
  .form_wrapper{
    padding: 20px;
  }
  
  .react-resizable{
    max-width: 100%;
  }
  


`;
