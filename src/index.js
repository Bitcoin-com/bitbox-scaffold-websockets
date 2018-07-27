import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { injectGlobal } from 'styled-components'
import registerServiceWorker from './registerServiceWorker';

injectGlobal`
    body,html {
        margin: 0;
        padding: 0;
        height: 100vh;
        background: #000;
        font-family: Leto, Helvetica, sans-serif;
    }
`

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
