import React, { useState } from 'react';
import './LogInSignUpCustomer.css';

function LogInSignUpCustomer() {
  const [loginCustomer, setLoginCustomer] = useState({
    email: '',
    password: ''
  });

  const [signUpCustomer, setsignUpCustomer] = useState({
    username: '',
    email: '',
    password: '',
    phone_number: '',
    address: ''
  })

  const handleLogin = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginCustomer)
      });
      const dataLogin = await response.json();
      console.log(dataLogin);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signUpCustomer)
      });
      const dataSignUp = await response.json();
      console.log(dataSignUp);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignUpChange = (e) => {
    setsignUpCustomer({
      ...signUpCustomer,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="login-sign-cus">
      <h1 className='head-cus'>Customer</h1>

      <div className='cus-login'>
        <p className='p-log-cus'>Login</p>
        <div className='e-log-cus'>
          <p>Email: </p>
          <input type="email" value={loginCustomer.email} 
          onChange={(e) => setLoginCustomer({...loginCustomer, email: e.target.value})}
          className='in-sub-cus-log'></input>
        </div>

        <div className='p-log-pass'>
        <p >Password: </p>
        <input className='in-sub-cus-pass' type="password" value={loginCustomer.password} onChange={(e) => setLoginCustomer({...loginCustomer, password: e.target.value})}></input>
        </div>
        <button onClick={handleLogin} className='btn-cus-log'>Login</button>
      </div>

      <div className='cus-signUp'>
        <p className='p-log-sign'>SignUp</p>

        <div className='u-sign-cus'>
          <p>Username: </p>
          <input className='in-cus-sign' type="text" name="username" value={signUpCustomer.username} onChange={handleSignUpChange}></input>
        </div>

        <div className='e-sign-cus'>
        <p>Email: </p>
        <input className='in-cus-sign' type="email" name="email" value={signUpCustomer.email} onChange={handleSignUpChange}></input>
        </div>

        <div className='p-sign-cus'>
        <p>Password: </p>
        <input className='in-cus-sign' type="password" name="password" value={signUpCustomer.password} onChange={handleSignUpChange}></input>
        </div>

        <div className='ph-sign-cus'>
        <p>Phone number: </p>
        <input className='in-cus-sign' type="text" name="phone_number" value={signUpCustomer.phone_number} onChange={handleSignUpChange}></input>
        </div>

        <div className='ad-sign-cus'>
        <p>Address: </p>
        <input className='in-cus-sign' type="text" name="address" value={signUpCustomer.address} onChange={handleSignUpChange}></input>
        </div>

        <button onClick={handleSignUp} className='btn-cus-sign'>SignUp</button>
      </div>
    </div>
  );
}

export default LogInSignUpCustomer;
