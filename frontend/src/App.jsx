// Libraries and resources
import { Routes, Route } from 'react-router-dom';
// Components
import NavBar from './components/NavBar';
import { Home } from './pages/Home';
import ItemListContainer from './pages/ItemListContainer';
import ItemDetailContainer from './pages/ItemDetailContainer';

import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import { Checkout } from './pages/Checkout';
import ForgotPassword from './components/ResetPassword/ForgotPassword';
// Classes
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/App.css';
// React Hooks
import ResetPassword from './components/ResetPassword/ResetPassword';
import Register from './pages/Register';

const App = () => {
    return (
        <UserProvider>
            <CartProvider>
                <div className="App">
                    <NavBar />
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route path="/products/*" element={<ItemListContainer />} />
                        <Route exact path="/cart" element={<Checkout />} />
                        <Route exact path="/item/:id" element={<ItemDetailContainer />} />
                        <Route exact path="/forgotpassword" element={<ForgotPassword />} />
                        <Route exact path="/resetpassword" element={<ResetPassword />} />
                        <Route exact path="/register" element={<Register />} />
                    </Routes>
                    <Footer />
                </div>
            </CartProvider>
        </UserProvider>
    );
};

export default App;
