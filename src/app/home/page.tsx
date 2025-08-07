"use client";

import { useState, useEffect } from "react";
import { Button, Card, Typography, Flex, Space, Divider, Tag } from "antd";
import {
  RobotOutlined,
  ThunderboltOutlined,
  BulbOutlined,
  RocketOutlined,
  StarOutlined,
  CheckCircleOutlined,
  PlayCircleOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import styles from "./home.module.css";
import { useRouter } from "next/navigation";

const { Title, Paragraph, Text } = Typography;

// Simulate server-side data fetching
async function getServerData() {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return {
    message: "Welcome to AI Assistant Pro!",
    timestamp: new Date().toLocaleString(),
    features: [
      "Natural Language Processing",
      "Real-time AI Responses",
      "Multi-language Support",
      "Advanced Analytics",
      "Smart Automation",
      "24/7 Availability",
    ],
    stats: {
      users: "10K+",
      accuracy: "99.8%",
      languages: "50+",
      responseTime: "<100ms",
    },
  };
}

export default function HomePage() {
  const [data, setData] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const result = await getServerData();
      setData(result);
      setIsVisible(true);
    };
    fetchData();
  }, []);

  if (!data) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <Text>Loading AI Assistant...</Text>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.heroBlob}></div>
          <div className={styles.heroBlob2}></div>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <Title level={1} className={styles.heroTitle}>
              <RobotOutlined className={styles.heroIcon} />
              AI Assistant Pro
            </Title>
            <Paragraph className={styles.heroSubtitle}>
              Experience the future of artificial intelligence. Our advanced AI
              assistant helps you work smarter, not harder.
            </Paragraph>
            <Space size="large" className={styles.heroButtons}>
              <Button
                type="primary"
                size="large"
                icon={<PlayCircleOutlined />}
                className={styles.ctaButton}
              >
                Try AI Assistant
              </Button>
              <Button
                size="large"
                icon={<ArrowRightOutlined />}
                className={styles.secondaryButton}
              >
                Learn More
              </Button>
            </Space>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.aiBrain}>
              <div className={styles.neuron}></div>
              <div className={styles.neuron}></div>
              <div className={styles.neuron}></div>
              <div className={styles.neuron}></div>
              <div className={styles.neuron}></div>
              <div className={styles.neuron}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.stats}>
        <Flex
          justify="space-around"
          align="center"
          className={styles.statsGrid}
        >
          <div className={styles.statItem}>
            <Title level={2} className={styles.statNumber}>
              {data.stats.users}
            </Title>
            <Text className={styles.statLabel}>Active Users</Text>
          </div>
          <div className={styles.statItem}>
            <Title level={2} className={styles.statNumber}>
              {data.stats.accuracy}
            </Title>
            <Text className={styles.statLabel}>Accuracy Rate</Text>
          </div>
          <div className={styles.statItem}>
            <Title level={2} className={styles.statNumber}>
              {data.stats.languages}
            </Title>
            <Text className={styles.statLabel}>Languages</Text>
          </div>
          <div className={styles.statItem}>
            <Title level={2} className={styles.statNumber}>
              {data.stats.responseTime}
            </Title>
            <Text className={styles.statLabel}>Response Time</Text>
          </div>
        </Flex>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <Title level={2} className={styles.sectionTitle}>
          <ThunderboltOutlined /> Powerful AI Features
        </Title>

        <div className={styles.featuresGrid}>
          {data.features.map((feature: string, index: number) => (
            <Card key={index} className={styles.featureCard} hoverable>
              <Flex align="center" gap="middle">
                <div className={styles.featureIcon}>
                  <CheckCircleOutlined />
                </div>
                <Text strong>{feature}</Text>
              </Flex>
            </Card>
          ))}
        </div>
      </section>

      {/* AI Demo Section */}
      <section className={styles.demoSection}>
        <Card className={styles.demoCard}>
          <Title level={3} className={styles.demoTitle}>
            <BulbOutlined /> AI Conversation Demo
          </Title>
          <div className={styles.chatDemo}>
            <div className={styles.message + " " + styles.ai}>
              <RobotOutlined className={styles.messageIcon} />
              <div className={styles.messageContent}>
                Hello! I'm your AI assistant. How can I help you today?
              </div>
            </div>
            <div className={styles.message + " " + styles.user}>
              <div className={styles.messageContent}>
                Can you help me with data analysis?
              </div>
            </div>
            <div className={styles.message + " " + styles.ai}>
              <RobotOutlined className={styles.messageIcon} />
              <div className={styles.messageContent}>
                Absolutely! I can help you analyze data, create visualizations,
                and generate insights. What type of data are you working with?
              </div>
            </div>
          </div>
          <Button
            type="primary"
            size="large"
            icon={<RocketOutlined />}
            className={styles.demoButton}
            onClick={() => router.push("/start")}
          >
            Start Your Own Conversation
          </Button>
        </Card>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <Text className={styles.footerText}>
          © 2024 AI Assistant Pro. Powered by advanced artificial intelligence.
        </Text>
      </footer>
    </div>
  );
}
