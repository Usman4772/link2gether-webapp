"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Layout, Button, Space, Typography, Drawer, Menu, Divider } from "antd";
import {
  LoginOutlined,
  MenuOutlined,
  LinkOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/navigation";
import useValidateToken from "@/hooks/useValidateToken";

const { Header } = Layout;
const { Title } = Typography;

const AppHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const router = useRouter();
  const {isValid}=useValidateToken()

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Header
      className={scrolled ? "header-shadow" : ""}
      style={{
        padding: "0 24px",
        background: "white",
        position: "fixed",
        width: "100%",
        top: 0,
        zIndex: 1000,
        boxShadow: scrolled
          ? "0 4px 12px rgba(0, 0, 0, 0.08)"
          : "0 2px 8px rgba(0, 0, 0, 0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 64,
        borderBottom: "1px solid #f0f0f0",
        transition: "box-shadow 0.3s ease",
      }}
    >
      {/* Logo */}
      <div className="logo" style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            background: "linear-gradient(135deg, #7bf1a8 0%, #1a936f 100%)",
            width: 36,
            height: 36,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 12,
            boxShadow: "0 2px 8px rgba(26, 147, 111, 0.2)",
          }}
        >
          <LinkOutlined style={{ color: "white", fontSize: 20 }} />
        </div>
        <Title
          level={4}
          style={{
            margin: 0,
            background: "linear-gradient(to right, #7bf1a8, #1a936f)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: 600,
          }}
        >
          Link Together
        </Title>
      </div>

      {/* Desktop Navigation */}
      {!isMobile && !isValid && (
        <Space size="middle">
          <Button
            onClick={() => router.push("/login")}
            type="text"
            icon={<LoginOutlined />}
            style={{
              height: 36,
              borderRadius: 6,
              fontWeight: 500,
              color: "#1a936f",
            }}
          >
            Login
          </Button>
          <Button
            type="primary"
            onClick={() => router.push("/register")}
            icon={<UserAddOutlined />}
            style={{
              height: 36,
              borderRadius: 6,
              fontWeight: 500,
              background: "linear-gradient(to right, #7bf1a8, #1a936f)",
              border: "none",
              boxShadow: "0 2px 0 rgba(0, 0, 0, 0.045)",
            }}
          >
            Register
          </Button>
        </Space>
      )}

      {/* Mobile Menu Button */}
      {isMobile && (
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setMobileMenuOpen(true)}
          style={{ border: "none", color: "#1a936f" }}
        />
      )}

      {/* Mobile Menu Drawer */}
      <Drawer
        title={
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                background: "linear-gradient(135deg, #7bf1a8 0%, #1a936f 100%)",
                width: 28,
                height: 28,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 8,
              }}
            >
              <LinkOutlined style={{ color: "white", fontSize: 16 }} />
            </div>
            <span style={{ fontWeight: 600 }}>Link Together</span>
          </div>
        }
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        width={280}
      >
        {!isValid && (
          <Menu mode="vertical" style={{ border: "none" }}>
            <Menu.Item
              key="login"
              onClick={() => router.push("/login")}
              icon={<LoginOutlined style={{ color: "#1a936f" }} />}
            >
              <span style={{ color: "#1a936f" }}>Login</span>
            </Menu.Item>
            <Menu.Item
              key="register"
              onClick={() => router.push("/register")}
              icon={<UserAddOutlined style={{ color: "#1a936f" }} />}
            >
              <span style={{ color: "#1a936f" }}>Register</span>
            </Menu.Item>
          </Menu>
        )}

        <Divider style={{ margin: "16px 0" }} />

        <div style={{ padding: "0 16px", color: "#8c8c8c", fontSize: 12 }}>
          © 2025 Link Together. All rights reserved.
        </div>
      </Drawer>
    </Header>
  );
};

export default AppHeader;
