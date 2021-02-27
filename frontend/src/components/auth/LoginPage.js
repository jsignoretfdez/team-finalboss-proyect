import React from 'react';
import {
  Button,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from 'semantic-ui-react';
import './LoginPage.css';
import { Form, Input } from 'antd';
import { login } from '../../api/auth';
import { useDispatch } from 'react-redux';
import { authLogin } from '../../store/actions';

const LoginPage = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = async (data) => {
    await dispatch(authLogin(data));
  };

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src="/logo192.png" /> Log-in to your account
        </Header>
        <Form
          form={form}
          size="large"
          name="normal_login"
          className="login-form"
          onFinish={onFinish}>
          <Segment stacked>
            <Form.Item
              name="username"
              label="Username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username',
                },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  min: 8,
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback>
              <Input.Password />
            </Form.Item>
            <Button color="teal" fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          <a href="#">Forgot Password</a>
          <br />
          You do not have an account yet?
          <a href="/register">Register now, its free!</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default LoginPage;
