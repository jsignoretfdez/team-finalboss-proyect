import React from 'react';
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    login(data)
      .then(() => {
        // When succesfully create the user, redirect to the login page.
        history.replace('/login');
      })
      .catch(error => {
        setHasError('An error ocurred, please contact us for more information. Sorry for the inconvenience.');
      });
  };
  
  return (
    <div className="login">
      <h2 className="login__title text-center my-4">Sign in!</h2>
      <form className="login__form" onSubmit={handleSubmit(onSubmit)} >
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" ref={register({ required: true })} />
          {errors.email && <span className="error-message">This field is required</span>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" ref={register({ required: true })} />
          {errors.password && <span className="error-message">This field is required</span>}
        </div>
        <button type="submit" className="btn btn-primary py-2 px-5">Send</button>
      </form>
    </div>
  )
}

export default LoginPage;