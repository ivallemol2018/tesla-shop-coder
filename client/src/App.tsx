import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { lightTheme } from './themes'
import { SWRConfig } from 'swr'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import './styles/globals.css'
import HomePage from './pages/HomePage';
import { AuthProvider, CartProvider, UiProvider } from './context';
import ProductPage from './pages/product';
import CartPage from './pages/cart';
import EmptyPage from './pages/cart/empty';
import CategoryPage from './pages/category';
import AddressPage from './pages/checkout/address';
import SummaryPage from './pages/checkout/summary';
import LoginPage from './pages/auth/login';
import RegisterPage from './pages/auth/register';
import OrderPage from './pages/orders';
import HistoryPage from './pages/orders/history';
import { ProtectedRoute } from './components/routers/ProtectedRoute'
import ProductAdminPage from './pages/admin/products/productsAdmin';
import ProductsPage from './pages/admin/products';
import UsersPage from './pages/admin/users';

import ChatPage from './pages/chat';

function App() {

  return (
    <div className="App">
      <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID || '' }}>
        <SWRConfig
          value={{
            //refreshInterval: 3000,
            fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
          }}
        >
          <BrowserRouter>
            <AuthProvider>
              <CartProvider>
                <UiProvider>
                  <ThemeProvider theme={lightTheme}>
                    <CssBaseline />
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/product/:slug" element={<ProductPage />} />
                      <Route path="/cart" element={<CartPage />} />
                      <Route path="/cart/empty" element={<EmptyPage />} />
                      <Route path="/category/:gender" element={<CategoryPage />} />
                      <Route path="/checkout/address" element={<AddressPage />} />
                      <Route path="/orders/:id"  element={<ProtectedRoute><OrderPage /></ProtectedRoute>} />
                      <Route path="/orders/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
                      <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
                      <Route path="/checkout/summary" element={<SummaryPage />} />
                      <Route path="/auth/login" element={<LoginPage />} />
                      <Route path="/auth/register" element={<RegisterPage />} />
                      <Route path='/admin/products/:slug' element={<ProtectedRoute><ProductAdminPage /></ProtectedRoute>}  />
                      <Route path='/admin/products' element={<ProtectedRoute><ProductsPage /></ProtectedRoute>}  />
                      <Route path='/admin/users' element={<ProtectedRoute><UsersPage /></ProtectedRoute>}  />
                    </Routes>
                  </ThemeProvider>
                </UiProvider>
              </CartProvider>
            </AuthProvider>
          </BrowserRouter>
        </SWRConfig>
      </PayPalScriptProvider>
    </div>
  );
}

export default App;
