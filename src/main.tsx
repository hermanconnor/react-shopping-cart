import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import CartProvider from './providers/cart-provider.tsx';
import { ProductProvider } from './providers/product-provider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProductProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ProductProvider>
  </StrictMode>,
);
