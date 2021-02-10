import React from 'react';
import { useForm } from "react-hook-form";

const RegisterPage = () => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    register(data)
      .then(() => {
        // When succesfully create the user, redirect to the login page.
        history.replace('/login');
      })
      .catch(error => {
        setHasError('An error ocurred, please contact us for more information. Sorry for the inconvenience.');
      });
  };
  
  return (
    <div className="register">
      <h2 className="register__title text-center my-4">Sign in!</h2>
      <form className="register__form" onSubmit={handleSubmit(onSubmit)} >
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
        <div className="form-group d-flex align-items-center">
          <label className="d-inline-block pr-3 mb-0" htmlFor="rememberMe">Remember me</label>
          <input type="checkbox" name="rememberMe" ref={register} />
        </div>
        <button type="submit" className="btn btn-primary py-2 px-5">Send</button>
      </form>
    </div>
  )
}

export default RegisterPage;