import React from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";

const LoginPage = () => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    login(data)
      .then(() => {
        // When succesfully create the user, redirect to the login page.
        history.replace("/login");
      })
      .catch((error) => {
        setHasError(
          "An error ocurred, please contact us for more information. Sorry for the inconvenience."
        );
      });
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src="/logo.png" /> Log-in to your account
        </Header>
        <Form
          size="large"
          name="normal_login"
          className="login-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Segment stacked>
            <Form.Input
              name="username"
              fluid
              icon="user"
              iconPosition="left"
              placeholder="user-name"
            />
            {errors.username && (
              <span className="error-message">This field is required</span>
            )}
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
            />
            {errors.password && (
              <span className="error-message">This field is required</span>
            )}

            <Button color="teal" fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          <a href="#">Forgot Password</a>
          <br />
          You do not have an account <a href="/register">Register</a>
        </Message>
      </Grid.Column>
    </Grid>
    /*<div className="login">
      <h2 className="login__title text-center my-4">Sign in!</h2>
      <Form
          name="normal_login"
          className="login-form"
          onSubmit={handleSubmit(onSubmit)}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          {errors.username && (
            <span className="error-message">This field is required</span>
          )}
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
        >
        {errors.password && (
          <span className="error-message">This field is required</span>
        )}
          <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
          />
        <button type="submit" className="btn btn-primary py-2 px-5">
          Send
        </button>
    </div>*/
  );
};

export default LoginPage;
