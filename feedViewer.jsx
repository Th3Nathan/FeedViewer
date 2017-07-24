
import React from 'react';
import ReactDOM from 'react-dom';
import App from './scripts/app';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  ReactDOM.render(<App window={window} />, root);
});
