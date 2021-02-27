import React from "react";
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
import { UploadOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./RegisterPage.css";
import { authRegister } from "../../store/actions";
import { useDispatch } from "react-redux";

const RegisterPage = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = async (data) => {
    console.log('submit', data)
    await dispatch(authRegister(data))
  };

  return (
    <div className="containerPrincipalRegister">
      <PageHeader className="site-page-header" title="Register" />,
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
        style={{ border: "1px solid gray" }}
      >
        <Row type="flex" justify="space-between" gutter={16}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              name="name"
              label="Name"
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
            <Form.Item name="surname" label="Surname" >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              name="username"
              label="Username"
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
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </div>
  );
};
export default RegisterPage;
