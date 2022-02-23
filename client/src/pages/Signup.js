import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations'; 
import Auth from '../utils/auth';   


const Signup = () => {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });

  // This is a closure.  Does not run immediately like useQuery() would.
  // useMutation Hook creates a js function that wraps around our
  // mutation code and returns it to us.
  // The addUser function is returned, as well as the ability to check
  // for errors

  const [addUser, { error }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  // Use async & await instead of .then() .catch()
  // pass data from the form state object
  // success destructure the data object
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // use try and catch instead of promises to handle errors
    try { 
      // execute addUser mutation and pass in variable data from form
      const { data }   = await addUser({
        variables: { ...formState}
      });
      Auth.login(data.addUser.token);
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className='flex-row justify-center mb-4'>
      <div className='col-12 col-md-6'>
        <div className='card'>
          <h4 className='card-header'>Sign Up</h4>
          <div className='card-body'>
            <form onSubmit={handleFormSubmit}>
              <input
                className='form-input'
                placeholder='Your username'
                name='username'
                type='username'
                id='username'
                value={formState.username}
                onChange={handleChange}
              />
              <input
                className='form-input'
                placeholder='Your email'
                name='email'
                type='email'
                id='email'
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className='form-input'
                placeholder='******'
                name='password'
                type='password'
                id='password'
                value={formState.password}
                onChange={handleChange}
              />
              <button className='btn d-block w-100' type='submit'>
                Submit
              </button>
            </form>
            {/* If there is an error notify */}
            {error && <div>Sign up failed</div>}    
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
