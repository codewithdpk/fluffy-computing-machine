import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app';
import { ConnectionProvider } from '@my-wallet/core'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <ConnectionProvider chain={1}>
      <App />
    </ConnectionProvider>
  </StrictMode>
);
