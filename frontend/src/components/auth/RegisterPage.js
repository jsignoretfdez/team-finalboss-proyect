import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  Button,
  Upload,
  Checkbox,
  Input,
  Row,
  Col,
  PageHeader,
} from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./RegisterPage.css";
import { authRegister } from "../../store/actions";

const RegisterPage = () => {
  const { register, handleSubmit, errors } = useForm();

  const handleClick = () => { console.log('click') }

  const onSubmit = (data) => {
    console.log('submit')
    authRegister(data)
  };

  return (
    <>
      <div className="containerPrincipalRegister">
        <PageHeader className="site-page-header" title="Register" />,
        <Form
          name="register"
          onSubmit={handleSubmit(onSubmit)}
          scrollToFirstError
          style={{ border: "1px solid gray" }}
        >
          <Row type="flex" justify="space-between" gutter={16}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                name="name"
                label="Name"
                ref={register({ required: true })}
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item name="surname" label="Surname" 
                ref={register({ required: true })}>
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                name="username"
                label="Username"
                ref={register({ required: true })}
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                name="email"
                label="E-mail"
                ref={register({ required: true })}
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                name="password"
                label="Password"
                ref={register({ required: true })}
                rules={[
                  {
                    min: 8,
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    min: 8,
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        "The two passwords that you entered do not match!"
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="upload"
                label="Upload"
                valuePropName="fileList"
                extra="Sube tu foto de perfil."
              >
                <Upload name="logo" action="/upload.do" listType="picture">
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject("Should accept agreement"),
                },
              ]}
            >
              <Checkbox>
                I have read the <a href="">agreement</a>
              </Checkbox>
            </Form.Item>
            <Form.Item>
              <Button onClick={handleClick} type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </div>
    </>
    /*<div className="register">
      <h2 className="register__title text-center my-4">Sign in!</h2>
      <form className="register__form" onSubmit={handleSubmit(onSubmit)} >
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="username" name="username" ref={register({ required: true })} />
          {errors.username && <span className="error-message">This field is required</span>}
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="name" name="name" ref={register({ required: true })} />
          {errors.name && <span className="error-message">This field is required</span>}
        </div>
        <div className="form-group">
          <label htmlFor="surname">Surname</label>
          <input type="surname" name="surname" ref={register({ required: true })} />
          {errors.surname && <span className="error-message">This field is required</span>}
        </div>
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
    </div>*/
  );
};
export default RegisterPage;
