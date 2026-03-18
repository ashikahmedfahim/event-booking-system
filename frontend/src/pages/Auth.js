import React from 'react'
import './Auth.css'
import AuthContext from '../context/auth-context';

const AuthPage = () => {
  const [isLogin, setIsLogin] = React.useState(true);
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const confirmPasswordRef = React.useRef();
  const authContext = React.useContext(AuthContext);

  const loginHandler = async (event) => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    const requestBody = {
      query: `
        query Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            userId
            token
            tokenExpiration
          }
        }
      `,
      variables: {
        email,
        password
      }
    };

    const response = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    const data = await response.json();
    if (data.data && data.data.login) {
      const { userId, token, tokenExpiration } = data.data.login;
      authContext.login(userId, token, tokenExpiration);
    }
  }

  const signupHandler = async (event) => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (email.trim().length === 0 || password.trim().length === 0 || confirmPassword.trim().length === 0) {
      return;
    }

    if (password !== confirmPassword) {
      return;
    }

    const requestBody = {
      query: `
        mutation CreateUser($email: String!, $password: String!) {      
          createUser(userInput: {email: $email, password: $password}) {
            _id
            email
          }
        }
      `,
      variables: {
        email,
        password
      }
    };

    const response = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    const data = await response.json();
    setIsLogin(true);
  }


  const submitHandler = async (event) => {
    event.preventDefault();
    if (isLogin) {
      await loginHandler(event);
    } else {
      await signupHandler(event);
    }
  }


  return (
    <div>
      <form className='auth-form' onSubmit={submitHandler}>
        <h1 className='auth-form-title'>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <div className='auth-form-control'>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' ref={emailRef} />
        </div>
        <div className='auth-form-control'>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' ref={passwordRef} />
        </div>
        {
          isLogin ?
            (<p className='auth-form-text'>Already have an account?
              <span type='button' className='auth-form-switch-button' onClick={() => setIsLogin((prev) => !prev)}>Sign Up</span>
            </p>)
            : (
              <div>
                <div className='auth-form-control'>
                  <label htmlFor='confirmPassword'>Confirm Password</label>
                  <input type='password' id='confirmPassword' ref={confirmPasswordRef} />
                </div>
                <p className='auth-form-text'>Don't have an account?
                  <span type='button' className='auth-form-switch-button' onClick={() => setIsLogin((prev) => !prev)}>Login</span>
                </p>
              </div>
            )

        }
        <button type='submit' className='auth-form-button'>{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
    </div>
  )
}

export default AuthPage