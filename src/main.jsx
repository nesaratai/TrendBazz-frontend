import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { UserProvider } from './contexts/UserContext.jsx';
import { CartProvider } from './contexts/CartContext';
import { ProductProvider } from './contexts/ProductContext.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx';

import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CartProvider>
          <ProductProvider>
            <App />
          </ProductProvider>
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
);