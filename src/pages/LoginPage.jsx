import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authThunks";
import { Navigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import FormItem from "antd/es/form/FormItem";

export default function LoginPage() {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.auth);
  const [form] = Form.useForm();

  const onFinish = ({ email, password }) => {
    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        message.success("Login succeeded.");
      })
      .catch((msg) => {
        message.error(msg);
      });
  };

  if (user) return <Navigate to="/invoices" replace />;

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ maxWidth: 300, margin: "auto", marginTop: "100px", backgroundColor:"pink" }}
    >
      <Form.Item
        label="E-mail"
        name="email"
        rules={[{ required: true, message: "Enter your email" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Enter your password" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={status === "loading"}
          block
        >
          Login
        </Button>
      </Form.Item>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </Form>
  );
}
