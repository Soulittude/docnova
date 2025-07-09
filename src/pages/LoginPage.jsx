import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authThunks";
import { Navigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { useTranslation } from "react-i18next";

export default function LoginPage() {
  const { t } = useTranslation();
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // full viewport height
        padding: "0 16px", // a little horizontal breathing room
        backgroundColor: "pink",
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{
          maxWidth: 300,
          margin: "auto",
          marginTop: "100px",
        }}
      >
        <Form.Item
          label={t("login.email")}
          name="email"
          rules={[{ required: true, message: t("login.emailwarn") }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t("login.password")}
          name="password"
          rules={[{ required: true, message: t("login.passwarn") }]}
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
            {t("login.submit")}
          </Button>
        </Form.Item>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </Form>
    </div>
  );
}
