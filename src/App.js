import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom'
import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import './App.css'
import Login from './views/login/Login';
import Signup from './views/signUp/Signup';
import Layout from './layout/Layout';
import Profile from './views/profile/Profile';
import Cards from './views/card/Cards';
import Connected from './views/connected/Connected';
import { Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payment1 from './views/payment/Payment1';
import Success from './views/success/Success';
import Payment2 from './views/payment/Payment2';
import Checkout from './views/checkout/Checkout';
import Failed from './views/failure/Failed';
const stripePromise = loadStripe('pk_test_51PaWrzDug8K5CkMJrTyYunUPYgxngermK03Uba6Ojv0zI6veTxmTePN7f0IgdBN2XVLRilQkpnRYi6AQMix385by00Mi1cOXrv');

const App = () => {
  const { user } = useSelector((state) => state.userAuth);
  return (
    <Elements stripe={stripePromise}>
    <Router>
      <Suspense >
        <Routes>
          {user &&
            <Route path='/' element={<Layout />}>
              <Route exact path='/profile' element={<Profile />} />
              <Route path='/cards' element={<Cards />} />
              <Route path='/connect' element={<Connected />} />
              <Route path='/payment' element={<Payment1 />} />
              <Route path='/payment2' element={<Payment2 />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path="/success" element={<Success />} />
              <Route path="/failed" element={<Failed />} />
              <Route path='/' element={<Navigate to="/profile" />} />
              <Route path='/*' element={<Navigate to="/profile" />} />
            </Route>
          }
          {!user &&
            <>
              <Route exact path="/" element={<Login />} />
              <Route exact path='/signup' element={<Signup />} />
              <Route path='/*' element={<Navigate to="/" />} />
            </>
          }
        </Routes>
      </Suspense>
    </Router>
    </Elements>
  )
}

export default App;
