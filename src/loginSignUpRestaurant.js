import React, { useState } from 'react';
import './logInSignUpRestaurant.css';

function LogInSignUpRestaurant() {
  const [loginRestaurant, setLoginRestaurant] = useState({
    restaurant_name: '',
    password: ''
  });

  const [signUpRestaurant, setsignUpRestaurant] = useState({
    restaurant_name: '',
    description: '',
    password: '',
    phone_number: '',
    address: ''
  })

  const handleLogin = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/loginRestaurant', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginRestaurant)
      });
      const dataLogin = await response.json();
      console.log(dataLogin);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/signupRestaurant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signUpRestaurant)
      });
      const dataSignUp = await response.json();
      console.log(dataSignUp);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignUpChange = (e) => {
    setsignUpRestaurant({
      ...signUpRestaurant,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="login-sign-res">
      <h1 className='h-res'>Restaurant</h1>
      <div>
        <div className='log-res'>
            <p className='p-log-res'>Login</p>
            <div className='r-log-res'>
              <p>RestaurantName:</p>
              <input className='in-sub-res-log' type="email" value={loginRestaurant.restaurant_name} onChange={(e) => setLoginRestaurant({...loginRestaurant, restaurant_name: e.target.value})}></input>
            </div>

            <div className='pass-log-res'>
              <p>Password: </p>
              <input className='in-sub-res-pass' type="password" value={loginRestaurant.password} onChange={(e) => setLoginRestaurant({...loginRestaurant, password: e.target.value})}></input>
            </div>
            <button className='btn-res-log' onClick={handleLogin}>Login</button>
        </div>
      </div>
      <div>
      <div className='sign-res'>
            <p className='p-log-sign'>SignUp</p>

            <div className='co-sign-res'>
            <p>RestaurantName: </p>
            <input className='in-sign-res' type="text" name="restaurant_name" value={signUpRestaurant.restaurant_name} onChange={handleSignUpChange}></input>
            </div>

            <div className='co-sign-res'>
            <p>Description: </p>
            <input className='in-sign-res' type="email" name="description" value={signUpRestaurant.description} onChange={handleSignUpChange}></input>
            </div>

            <div className='co-sign-res'>
            <p>PhoneNumber: </p>
            <input className='in-sign-res' type="tel" name="phone_number" value={signUpRestaurant.phone_number} onChange={handleSignUpChange}></input>
            </div>

            <div className='co-sign-res'>
            <p>Address: </p>
            <input className='in-sign-res' type="text" name="address" value={signUpRestaurant.address} onChange={handleSignUpChange}></input>
            </div>

            <div className='co-sign-res'>
            <p>Password: </p>
            <input className='in-sign-res' type="password" name="address" value={signUpRestaurant.password} onChange={handleSignUpChange}></input>
            </div>
            <button className='btn-res-sign' onClick={handleSignUp}>SignUp</button>
        </div>
      </div>
    </div>
  );
}

export default LogInSignUpRestaurant;
