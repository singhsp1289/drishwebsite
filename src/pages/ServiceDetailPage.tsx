import { memo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Brain, 
  Cpu, 
  Cloud, 
  GitMerge, 
  ShieldCheck, 
  Code2, 
  Database, 
  ArrowRight, 
  Layers, 
  Zap, 
  Activity, 
  Terminal, 
  Gauge, 
  FileCheck2,
  ChevronRight,
  Sparkles,
  Server,
  Lock,
  CpuIcon
} from 'lucide-react';

interface ServiceContent {
  id: string;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  themeColor: string;
  accentColor: string;
  heroHighlights: string[];
  pillars: {
    title: string;
    desc: string;
    icon: React.ReactNode;
    tags: string[];
  }[];
  techStack: {
    category: string;
    tools: string[];
  }[];
  methodologySteps: {
    step: string;
    title: string;
    desc: string;
  }[];
  outcomes: {
    metric: string;
    label: string;
    detail: string;
  }[];
}

const servicesData: Record<string, ServiceContent> = {
  'qa-automation': {
    id: 'qa-automation',
    title: 'AI-Powered Quality Engineering & Test Automation',
    badge: 'Intelligent Quality Engineering',
    tagline: 'Autonomous, Continuous & Predictive Quality for Enterprise Systems',
    description: 'Transform your release velocity with next-generation AI-powered Quality Engineering. We combine automated test generation, intelligent self-healing test suites, performance benchmarking, and seamless CI/CD quality gates to guarantee zero-defect releases at scale.',
    icon: <CheckCircle2 className="w-10 h-10 text-[#0876B9]" />,
    themeColor: '#0876B9',
    accentColor: '#38BDF8',
    heroHighlights: ['AI-Assisted Test Generation', 'Self-Healing Test Scripts', 'Multi-Layer API & UI Testing', 'Continuous CI/CD Quality Gates'],
    pillars: [
      {
        title: 'AI-Assisted & Autonomous Test Automation',
        desc: 'Leverage machine learning algorithms to auto-generate edge-case test scenarios, self-heal flaky locator scripts upon UI changes, and predict regression defect hotspots.',
        icon: <Brain className="w-6 h-6 text-[#0876B9]" />,
        tags: ['Self-Healing Scripts', 'Predictive Analysis', 'Dynamic Locators', 'Test Gen AI']
      },
      {
        title: 'End-to-End Functional & Web Automation',
        desc: 'Enterprise test automation frameworks built with Playwright and Selenium across multi-browser, cross-platform environments with parallel grid execution.',
        icon: <Terminal className="w-6 h-6 text-[#0876B9]" />,
        tags: ['Playwright', 'Selenium WebDriver', 'Cypress', 'Cross-Browser Grid']
      },
      {
        title: 'API & Microservices Quality Engineering',
        desc: 'High-throughput contract testing, REST/GraphQL validation, payload schema verification, and mock virtualization to ensure backend service reliability.',
        icon: <Zap className="w-6 h-6 text-[#0876B9]" />,
        tags: ['Postman/Newman', 'REST Assured', 'Contract Testing', 'gRPC Testing']
      },
      {
        title: 'Performance, Load & Stress Engineering',
        desc: 'In-depth distributed load simulation using Apache JMeter and k6 to uncover latency bottlenecks, memory leaks, concurrency thresholds, and scalability limits.',
        icon: <Gauge className="w-6 h-6 text-[#0876B9]" />,
        tags: ['Apache JMeter', 'k6', 'Distributed Load Testing', 'SLA Profiling']
      },
      {
        title: 'Continuous Testing & CI/CD Integration',
        desc: 'Shift-left quality verification integrated directly into GitHub Actions, GitLab CI, and Jenkins with automated smoke, regression, and pull-request gatekeeping.',
        icon: <GitMerge className="w-6 h-6 text-[#0876B9]" />,
        tags: ['GitHub Actions', 'Jenkins Pipelines', 'Dockerized Test Runners', 'Quality Gates']
      },
      {
        title: 'Intelligent Reporting & Release Validation',
        desc: 'Live telemetry dashboards featuring Allure and custom analytics, delivering actionable defect triaging, flake rate metrics, and executive sign-off reports.',
        icon: <FileCheck2 className="w-6 h-6 text-[#0876B9]" />,
        tags: ['Allure Reports', 'Defect Root-Cause AI', 'Executive Dashboards', 'Compliance Audits']
      }
    ],
    techStack: [
      { category: 'Web & UI Automation', tools: ['Playwright', 'Selenium', 'Cypress', 'Appium', 'Puppeteer'] },
      { category: 'API & Contract Testing', tools: ['REST Assured', 'Postman', 'Pact Contract', 'Supertest', 'Newman'] },
      { category: 'Performance & Load', tools: ['Apache JMeter', 'k6', 'Gatling', 'Locust'] },
      { category: 'CI/CD & Reporting', tools: ['GitHub Actions', 'GitLab CI', 'Jenkins', 'Allure Reporting', 'Docker'] }
    ],
    methodologySteps: [
      { step: '01', title: 'Quality Strategy & Test Architecture', desc: 'Define risk-based coverage models, automation framework blueprints, and SLA performance baselines.' },
      { step: '02', title: 'AI Test Generation & Framework Setup', desc: 'Build scalable modular test repositories with self-healing locators and reusable component drivers.' },
      { step: '03', title: 'CI/CD Pipeline Integration', desc: 'Embed parallel test execution suites directly inside continuous deployment triggers.' },
      { step: '04', title: 'Continuous Validation & Analytics', desc: 'Monitor flake metrics, regression cycles, and release readiness with automated quality reports.' }
    ],
    outcomes: [
      { metric: '75%', label: 'Faster Regression Cycles', detail: 'Accelerated test turnaround from days to under 45 minutes.' },
      { metric: '99.4%', label: 'Defect Catch Rate', detail: 'Pre-production defect detection before reaching staging.' },
      { metric: '10x', label: 'Test Execution Velocity', detail: 'Scalable cloud containerized parallel test runner grids.' }
    ]
  },
  'ai': {
    id: 'ai',
    title: 'Artificial Intelligence, GenAI & Agentic Systems',
    badge: 'Applied AI & Machine Learning',
    tagline: 'Engineering Enterprise Intelligence with Foundation Models & Autonomous Agents',
    description: 'Empower your digital platforms with state-of-the-art Generative AI, multi-agent workflows, custom LLM fine-tuning, retrieval-augmented generation (RAG), and predictive machine learning models tailored for mission-critical operations.',
    icon: <Brain className="w-10 h-10 text-[#0876B9]" />,
    themeColor: '#0876B9',
    accentColor: '#38BDF8',
    heroHighlights: ['Agentic AI Workflows', 'Domain-Specific LLM Fine-Tuning', 'Enterprise RAG Architecture', 'Computer Vision & NLP Pipelines'],
    pillars: [
      {
        title: 'Generative AI & Enterprise LLMs',
        desc: 'Build secure, compliant AI systems powered by modern LLMs with structured outputs, prompt optimization, and low-latency inference.',
        icon: <Sparkles className="w-6 h-6 text-[#0876B9]" />,
        tags: ['OpenAI', 'Gemini Models', 'Claude', 'Llama 3', 'LangChain']
      },
      {
        title: 'Agentic AI & Autonomous Workflows',
        desc: 'Architect autonomous multi-agent systems that reason, plan, execute multi-step tools, and solve complex business operations with human-in-the-loop controls.',
        icon: <Cpu className="w-6 h-6 text-[#0876B9]" />,
        tags: ['CrewAI', 'LangGraph', 'Function Calling', 'Autonomous Agents']
      },
      {
        title: 'Enterprise RAG & Knowledge Graphs',
        desc: 'Connect foundation models to internal documentation, databases, and structured knowledge bases with vector search and hybrid retrieval algorithms.',
        icon: <Database className="w-6 h-6 text-[#0876B9]" />,
        tags: ['Pinecone', 'pgvector', 'ChromaDB', 'Hybrid Search', 'Reranking']
      },
      {
        title: 'Predictive ML & Deep Learning',
        desc: 'Custom regression, time-series forecasting, computer vision, and anomaly detection models trained and deployed with high operational accuracy.',
        icon: <Activity className="w-6 h-6 text-[#0876B9]" />,
        tags: ['PyTorch', 'TensorFlow', 'Scikit-Learn', 'ONNX Runtime']
      }
    ],
    techStack: [
      { category: 'AI Models & LLMs', tools: ['Gemini 2.5', 'GPT-4o', 'Claude 3.5', 'Llama 3', 'Mistral'] },
      { category: 'Orchestration & Agents', tools: ['LangGraph', 'LangChain', 'LlamaIndex', 'Semantic Kernel'] },
      { category: 'Vector Databases', tools: ['pgvector', 'Pinecone', 'Qdrant', 'Milvus', 'Weaviate'] },
      { category: 'MLOps & Inference', tools: ['vLLM', 'Triton', 'MLflow', 'Docker', 'Kubernetes'] }
    ],
    methodologySteps: [
      { step: '01', title: 'Data Readiness & Feasibility', desc: 'Audit knowledge sources, clean unstructured datasets, and establish accuracy benchmarks.' },
      { step: '02', title: 'Model Architecture & RAG Pipeline', desc: 'Design context windows, vector embedding schemas, and agent orchestration flows.' },
      { step: '03', title: 'Evaluation & Guardrails', desc: 'Implement hallucination mitigation, safety filters, and response latency optimizations.' },
      { step: '04', title: 'Production Deployment & MLOps', desc: 'Continuous model monitoring, drift detection, and automated retraining pipelines.' }
    ],
    outcomes: [
      { metric: '80%', label: 'Operational Time Saved', detail: 'Autonomous agents handling repetitive knowledge workflows.' },
      { metric: '<250ms', label: 'Vector Retrieval Latency', detail: 'Sub-second real-time grounded context retrieval.' },
      { metric: '99.9%', label: 'Model Availability', detail: 'High-availability containerized enterprise inference endpoints.' }
    ]
  },
  'iot': {
    id: 'iot',
    title: 'Device Driver & IoT Systems',
    badge: 'Hardware-Software Integration',
    tagline: 'Precision Device Drivers, Embedded Firmware & Scalable Industrial IoT',
    description: 'We bridge physical hardware with digital intelligence. Our engineering team develops custom device drivers, RTOS firmware, edge computing gateways, and secure telemetry ecosystems for automotive, healthcare, and industrial applications.',
    icon: <Cpu className="w-10 h-10 text-[#E2725B]" />,
    themeColor: '#E2725B',
    accentColor: '#FFAA8C',
    heroHighlights: ['Windows & Linux Device Drivers', 'Embedded RTOS Firmware', 'Edge Telemetry Gateways', 'Industrial Protocols & MQTT'],
    pillars: [
      {
        title: 'Custom Device Drivers & Kernel Modules',
        desc: 'Low-level device driver development for Windows (WDF/KMDF/UMDF), Linux Kernel modules, and custom PCIe/USB/UART peripherals.',
        icon: <CpuIcon className="w-6 h-6 text-[#E2725B]" />,
        tags: ['KMDF/UMDF', 'Linux Kernel', 'PCIe/USB Drivers', 'C/C++']
      },
      {
        title: 'Embedded Firmware & RTOS',
        desc: 'Deterministic embedded software engineered for ARM Cortex, ESP32, STM32, and Nordic microcontrollers running FreeRTOS and Zephyr.',
        icon: <Layers className="w-6 h-6 text-[#E2725B]" />,
        tags: ['FreeRTOS', 'Zephyr OS', 'ARM Cortex-M', 'Bare-Metal C']
      },
      {
        title: 'Industrial IoT & Edge Computing',
        desc: 'Edge-native processing, local inference gateways, sensor aggregation, and real-time streaming using MQTT, Modbus, and OPC-UA.',
        icon: <Server className="w-6 h-6 text-[#E2725B]" />,
        tags: ['MQTT', 'OPC-UA', 'Modbus', 'Edge AI', 'AWS Greengrass']
      },
      {
        title: 'Firmware Over-The-Air (FOTA) & Security',
        desc: 'Cryptographically signed firmware updates, secure boot mechanisms, hardware security modules (HSM), and encrypted fleet management.',
        icon: <Lock className="w-6 h-6 text-[#E2725B]" />,
        tags: ['Secure Boot', 'FOTA Updates', 'AES-256 / ECC', 'HSM Integration']
      }
    ],
    techStack: [
      { category: 'Languages & Low-Level', tools: ['C', 'C++', 'Rust', 'Assembly', 'Python'] },
      { category: 'Operating Systems', tools: ['Linux Kernel', 'FreeRTOS', 'Zephyr', 'Windows WDF'] },
      { category: 'Protocols & Connectivity', tools: ['MQTT', 'CAN Bus', 'BLE', 'Modbus', 'OPC-UA', 'Zigbee'] },
      { category: 'Hardware Platforms', tools: ['ARM Cortex', 'STM32', 'ESP32', 'NXP', 'Raspberry Pi Compute'] }
    ],
    methodologySteps: [
      { step: '01', title: 'Hardware Schematics & Specification', desc: 'Hardware register mapping, pinout analysis, and communication bus timing verification.' },
      { step: '02', title: 'Firmware & Driver Architecture', desc: 'Low-latency interrupt handling, memory buffer management, and DMA channel configuration.' },
      { step: '03', title: 'HIL & Stress Testing', desc: 'Hardware-in-the-loop stress testing, thermal validation, and edge network resilience testing.' },
      { step: '04', title: 'Production Fleet Deployment', desc: 'Encrypted telemetry ingestion pipelines with centralized remote device monitoring.' }
    ],
    outcomes: [
      { metric: '<1ms', label: 'Driver Interrupt Latency', detail: 'Real-time deterministic responsiveness for critical hardware.' },
      { metric: '100k+', label: 'Connected IoT Nodes', detail: 'Proven scalability handling millions of telemetry packets daily.' },
      { metric: 'Zero', label: 'Kernel Panic Incidents', detail: 'Memory-safe driver implementations adhering to MISRA-C standards.' }
    ]
  },
  'cloud': {
    id: 'cloud',
    title: 'Cloud Computing & Distributed Systems',
    badge: 'Enterprise Cloud Architecture',
    tagline: 'Resilient, High-Throughput Cloud Platforms Built for Extreme Scale',
    description: 'Architecting modern cloud-native systems, serverless architectures, multi-region Kubernetes clusters, and microservices for organizations demanding 99.999% availability and global elasticity.',
    icon: <Cloud className="w-10 h-10 text-[#0876B9]" />,
    themeColor: '#0876B9',
    accentColor: '#38BDF8',
    heroHighlights: ['Multi-Cloud AWS, Azure & GCP', 'Kubernetes Orchestration', 'Microservices & Event-Driven', 'Cost Optimization & FinOps'],
    pillars: [
      {
        title: 'Cloud-Native Architecture',
        desc: 'Decoupled microservices, event-driven streaming with Apache Kafka, and resilient asynchronous architectures designed for high concurrency.',
        icon: <Cloud className="w-6 h-6 text-[#0876B9]" />,
        tags: ['AWS', 'Azure', 'GCP', 'Event-Driven', 'Kafka']
      },
      {
        title: 'Container Orchestration & Kubernetes',
        desc: 'Enterprise Kubernetes cluster provisioning (EKS, AKS, GKE) with automated scaling, ingress controllers, service meshes, and GitOps workflows.',
        icon: <Server className="w-6 h-6 text-[#0876B9]" />,
        tags: ['Kubernetes', 'EKS/GKE', 'Helm', 'ArgoCD', 'Istio']
      },
      {
        title: 'Serverless & High-Concurrency APIs',
        desc: 'Event-triggered serverless lambdas, API gateways, and distributed cache clusters ensuring sub-50ms response times globally.',
        icon: <Zap className="w-6 h-6 text-[#0876B9]" />,
        tags: ['AWS Lambda', 'Cloudflare Workers', 'Redis Enterprise', 'GraphQL']
      },
      {
        title: 'Cloud Migration & Modernization',
        desc: 'Strategic legacy monolithic decomposition, database re-platforming, and zero-downtime cutovers to scalable cloud infrastructure.',
        icon: <Layers className="w-6 h-6 text-[#0876B9]" />,
        tags: ['Legacy Refactoring', 'Database Migration', 'Zero-Downtime', 'FinOps']
      }
    ],
    techStack: [
      { category: 'Cloud Providers', tools: ['Amazon Web Services (AWS)', 'Microsoft Azure', 'Google Cloud Platform (GCP)'] },
      { category: 'Containers & Mesh', tools: ['Docker', 'Kubernetes', 'Istio', 'Envoy', 'Helm'] },
      { category: 'Databases & Storage', tools: ['Amazon Aurora', 'PostgreSQL', 'DynamoDB', 'Redis', 'S3'] },
      { category: 'Streaming & Messaging', tools: ['Apache Kafka', 'RabbitMQ', 'AWS SQS/SNS', 'NATS'] }
    ],
    methodologySteps: [
      { step: '01', title: 'Cloud Readiness Assessment', desc: 'Workload dependency mapping, compliance review, and TCO cost-optimization modeling.' },
      { step: '02', title: 'Target Architecture Blueprint', desc: 'Multi-AZ high-availability topology, IAM boundaries, and networking VPC design.' },
      { step: '03', title: 'Automated Infrastructure Provisioning', desc: 'Terraform IaC deployment with immutable security guardrails and backup strategies.' },
      { step: '04', title: 'Live Migration & Traffic Cutover', desc: 'Blue-green and canary routing transitions ensuring uninterrupted business operations.' }
    ],
    outcomes: [
      { metric: '99.99%', label: 'Infrastructure Uptime', detail: 'Multi-region failover and self-healing cloud clusters.' },
      { metric: '40%', label: 'Cloud Spend Optimization', detail: 'Right-sizing instances and serverless autoscaling governance.' },
      { metric: '<50ms', label: 'Global API Latency', detail: 'Edge caching and distributed database read replicas.' }
    ]
  },
  'devops': {
    id: 'devops',
    title: 'DevOps & Infrastructure Automation',
    badge: 'Continuous Delivery & SRE',
    tagline: 'Automated CI/CD Pipelines, Infrastructure as Code & Site Reliability Engineering',
    description: 'Transform software delivery with elite DevOps practices. We implement fully automated CI/CD pipelines, immutable Infrastructure as Code (IaC), GitOps continuous deployment, and 24/7 observability ecosystems.',
    icon: <GitMerge className="w-10 h-10 text-[#D97706]" />,
    themeColor: '#D97706',
    accentColor: '#FFE58A',
    heroHighlights: ['Infrastructure as Code (Terraform)', 'GitOps Automated CD', 'Full-Stack Observability & SRE', 'DevSecOps Automated Security'],
    pillars: [
      {
        title: 'Infrastructure as Code (IaC)',
        desc: 'Immutable, version-controlled cloud infrastructure defined via Terraform and OpenTofu across multiple environments with drift detection.',
        icon: <Code2 className="w-6 h-6 text-[#D97706]" />,
        tags: ['Terraform', 'OpenTofu', 'Ansible', 'Pulumi', 'CloudFormation']
      },
      {
        title: 'Continuous Integration & Continuous Delivery',
        desc: 'Frictionless build, test, package, and deployment pipelines using GitHub Actions, GitLab CI, and ArgoCD with canary rollout strategies.',
        icon: <GitMerge className="w-6 h-6 text-[#D97706]" />,
        tags: ['GitHub Actions', 'ArgoCD', 'GitLab CI', 'Jenkins', 'Canary Rollouts']
      },
      {
        title: 'Observability, APM & SRE',
        desc: 'Comprehensive monitoring stacks with Prometheus, Grafana, Datadog, and OpenTelemetry providing distributed tracing and automated alerting.',
        icon: <Activity className="w-6 h-6 text-[#D97706]" />,
        tags: ['Prometheus', 'Grafana', 'Datadog', 'OpenTelemetry', 'ELK Stack']
      },
      {
        title: 'DevSecOps & Automated Compliance',
        desc: 'Shift-left security integrating static code analysis (SAST), software composition analysis (SCA), and container vulnerability scans.',
        icon: <ShieldCheck className="w-6 h-6 text-[#D97706]" />,
        tags: ['SonarQube', 'Snyk', 'Trivy', 'HashiCorp Vault', 'Secret Management']
      }
    ],
    techStack: [
      { category: 'CI/CD & GitOps', tools: ['GitHub Actions', 'ArgoCD', 'GitLab CI', 'Jenkins', 'Flux'] },
      { category: 'IaC & Configuration', tools: ['Terraform', 'Ansible', 'Helm', 'Docker Compose'] },
      { category: 'Monitoring & Logs', tools: ['Prometheus', 'Grafana', 'Datadog', 'Loki', 'Jaeger'] },
      { category: 'Security & Secrets', tools: ['HashiCorp Vault', 'SonarQube', 'Snyk', 'Trivy'] }
    ],
    methodologySteps: [
      { step: '01', title: 'Delivery Pipeline Assessment', desc: 'Analyze lead time, deployment frequency, and code quality friction points.' },
      { step: '02', title: 'Modular IaC & Pipeline Templating', desc: 'Create standardized pipeline templates and repeatable environment modules.' },
      { step: '03', title: 'Automated Security Gates', desc: 'Embed static analysis, dependency auditing, and container scanning into pull requests.' },
      { step: '04', title: 'Telemetry & SRE Tuning', desc: 'Set up SLO/SLA dashboards, alert thresholds, and automated rollbacks.' }
    ],
    outcomes: [
      { metric: '15min', label: 'Commit to Production Lead Time', detail: 'Fully automated testing and deployment validation.' },
      { metric: '90%', label: 'Deployment Failure Reduction', detail: 'Canary releases and automated rollback guardrails.' },
      { metric: '100%', label: 'Audit Compliance Trackability', detail: 'Immutable GitOps commit logs for all environment changes.' }
    ]
  },
  'security': {
    id: 'security',
    title: 'IT Infrastructure & Cyber Security',
    badge: 'Enterprise Security & Resilience',
    tagline: 'Zero Trust Architecture, Threat Intelligence & Resilient Infrastructure',
    description: 'Defend your digital ecosystem with robust Zero Trust architectures, proactive threat hunting, continuous vulnerability management, and 24/7 Security Operations Center (SOC) intelligence.',
    icon: <ShieldCheck className="w-10 h-10 text-[#0876B9]" />,
    themeColor: '#0876B9',
    accentColor: '#38BDF8',
    heroHighlights: ['Zero Trust Architecture', 'Penetration Testing & VAPT', 'SIEM & SOC Threat Hunting', 'Compliance: ISO 27001 / SOC 2 / HIPAA'],
    pillars: [
      {
        title: 'Zero Trust Security Architecture',
        desc: 'Principle of least privilege, continuous identity verification, micro-segmentation, and context-aware endpoint access controls.',
        icon: <Lock className="w-6 h-6 text-[#0876B9]" />,
        tags: ['Zero Trust', 'IAM / SSO', 'MFA', 'Network Segmentation']
      },
      {
        title: 'Vulnerability Assessment & Pen Testing (VAPT)',
        desc: 'Rigorous ethical hacking, API penetration testing, cloud posture reviews, and red team exercises uncovering critical vulnerabilities.',
        icon: <Terminal className="w-6 h-6 text-[#0876B9]" />,
        tags: ['OWASP Top 10', 'API Pen Testing', 'Cloud Posture', 'Burp Suite']
      },
      {
        title: 'SIEM, SOC & Threat Hunting',
        desc: 'Real-time telemetry ingestion, behavior anomaly detection, threat intelligence feeds, and automated incident response playbooks.',
        icon: <Activity className="w-6 h-6 text-[#0876B9]" />,
        tags: ['SIEM / SOAR', 'Wazuh', 'Splunk', 'Suricata', 'Threat Intel']
      },
      {
        title: 'Governance, Risk & Compliance (GRC)',
        desc: 'Audit readiness, cryptographic policy enforcement, data loss prevention (DLP), and compliance with ISO 27001, SOC 2, HIPAA, and GDPR.',
        icon: <FileCheck2 className="w-6 h-6 text-[#0876B9]" />,
        tags: ['ISO 27001', 'SOC 2 Type II', 'HIPAA', 'GDPR / Privacy']
      }
    ],
    techStack: [
      { category: 'Identity & Access', tools: ['Okta', 'Azure AD / Entra', 'Keycloak', 'OAuth2/OIDC', 'HashiCorp Vault'] },
      { category: 'Security Monitoring', tools: ['Wazuh', 'Splunk', 'ELK Security', 'CrowdStrike', 'Tenable'] },
      { category: 'Network & Perimeter', tools: ['Cloudflare WAF', 'Palo Alto', 'WireGuard VPN', 'Suricata'] },
      { category: 'Vulnerability Tooling', tools: ['Burp Suite Pro', 'Nessus', 'OWASP ZAP', 'Trivy', 'SonarQube'] }
    ],
    methodologySteps: [
      { step: '01', title: 'Threat Surface & Asset Discovery', desc: 'Identify all external endpoints, cloud APIs, IAM permissions, and data repositories.' },
      { step: '02', title: 'Gap Analysis & Penetration Testing', desc: 'Simulate sophisticated cyber attack vectors across applications and infrastructure.' },
      { step: '03', title: 'Hardening & Remediation', desc: 'Patch vulnerabilities, implement encryption at rest/transit, and enforce MFA policies.' },
      { step: '04', title: 'Continuous SOC Monitoring', desc: '24/7 log correlation and automated containment playbooks for incident prevention.' }
    ],
    outcomes: [
      { metric: 'Zero', label: 'Unmitigated Critical CVEs', detail: 'Proactive scanning and automated dependency patching.' },
      { metric: '<5min', label: 'Threat Containment Time', detail: 'Automated SIEM response playbooks isolations.' },
      { metric: '100%', label: 'Compliance Audit Readiness', detail: 'Verified adherence to ISO 27001 and enterprise security standards.' }
    ]
  },
  'software-engineering': {
    id: 'software-engineering',
    title: 'Enterprise Software Engineering & Modern Web Platforms',
    badge: 'Full-Cycle Digital Engineering',
    tagline: 'High-Performance, Scalable Software Crafted for Complex Enterprise Operations',
    description: 'We engineer mission-critical enterprise applications, modern web platforms, distributed APIs, and scalable SaaS solutions using clean TypeScript, React, Node.js, and robust database architectures.',
    icon: <Code2 className="w-10 h-10 text-[#0876B9]" />,
    themeColor: '#0876B9',
    accentColor: '#38BDF8',
    heroHighlights: ['Modern TypeScript & React Ecosystem', 'High-Concurrency Backend APIs', 'Scalable Multi-Tenant SaaS', 'Clean Architecture & Microservices'],
    pillars: [
      {
        title: 'Modern Frontend Engineering',
        desc: 'Ultra-fast, responsive web applications built with React, Next.js, and TypeScript, featuring smooth UI micro-interactions and optimal Core Web Vitals.',
        icon: <Code2 className="w-6 h-6 text-[#0876B9]" />,
        tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'State Machines']
      },
      {
        title: 'Scalable Backend & API Architectures',
        desc: 'High-throughput Node.js, Express, NestJS, and Go microservices communicating via REST, GraphQL, and gRPC with distributed caching.',
        icon: <Server className="w-6 h-6 text-[#0876B9]" />,
        tags: ['Node.js', 'NestJS', 'TypeScript', 'GraphQL', 'gRPC']
      },
      {
        title: 'Multi-Model Data Engineering',
        desc: 'Robust relational and NoSQL database modeling with PostgreSQL, MongoDB, and Redis engineered for high-concurrency read/write transactions.',
        icon: <Database className="w-6 h-6 text-[#0876B9]" />,
        tags: ['PostgreSQL', 'MongoDB', 'Redis', 'Drizzle/Prisma ORM', 'Indexing']
      },
      {
        title: 'Enterprise SaaS & System Integration',
        desc: 'Multi-tenant architecture, role-based access control (RBAC), billing integrations, and webhook orchestration connecting enterprise software ecosystems.',
        icon: <Layers className="w-6 h-6 text-[#0876B9]" />,
        tags: ['Multi-Tenant SaaS', 'RBAC Security', 'Stripe Billing', 'Webhooks']
      }
    ],
    techStack: [
      { category: 'Frontend', tools: ['React', 'TypeScript', 'Angular', 'Tailwind CSS', 'Vite'] },
      { category: 'Backend', tools: ['Node.js', 'Express.js', 'NestJS', 'Python', 'Go'] },
      { category: 'Databases', tools: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'] },
      { category: 'Tooling & Quality', tools: ['Git', 'VS Code', 'Postman', 'Docker', 'Jest'] }
    ],
    methodologySteps: [
      { step: '01', title: 'System Architecture & Data Modeling', desc: 'Entity-relationship modeling, API contract specifications, and component hierarchy design.' },
      { step: '02', title: 'Iterative Sprint Development', desc: 'Clean, type-safe code delivery in two-week agile sprints with continuous feedback.' },
      { step: '03', title: 'Comprehensive Automated Testing', desc: 'Unit, integration, and end-to-end verification covering critical business paths.' },
      { step: '04', title: 'Production Deployment & Monitoring', desc: 'Continuous deployment with telemetry, error tracking, and performance logging.' }
    ],
    outcomes: [
      { metric: '99.9%', label: 'API Availability', detail: 'High-throughput fault-tolerant microservices architectures.' },
      { metric: '<100ms', label: 'Database Query Time', detail: 'Optimized schema indexing and distributed Redis caching.' },
      { metric: '100%', label: 'Type-Safe Codebase', detail: 'Strict TypeScript across full frontend and backend stacks.' }
    ]
  },
  'data-analytics': {
    id: 'data-analytics',
    title: 'Data Engineering & Advanced Analytics',
    badge: 'Enterprise Data Intelligence',
    tagline: 'Transforming Raw Data into Actionable Insights, Predictions & Real-Time Intelligence',
    description: 'Design and deploy modern data lakehouses, real-time streaming ETL pipelines, and executive business intelligence dashboards to unlock the full value of your enterprise data assets.',
    icon: <Database className="w-10 h-10 text-[#0876B9]" />,
    themeColor: '#0876B9',
    accentColor: '#38BDF8',
    heroHighlights: ['Modern Lakehouse Architecture', 'Real-Time Streaming Pipelines', 'Automated ETL/ELT Workflows', 'Interactive BI Dashboards'],
    pillars: [
      {
        title: 'Real-Time Data Streaming & ETL',
        desc: 'High-volume streaming ingestion pipelines with Apache Kafka, Spark, and dbt to process structured and unstructured datasets in real time.',
        icon: <Zap className="w-6 h-6 text-[#0876B9]" />,
        tags: ['Apache Kafka', 'Spark', 'dbt', 'Airflow', 'Python']
      },
      {
        title: 'Modern Data Warehouse & Lakehouse',
        desc: 'Scalable cloud data warehousing with Snowflake, BigQuery, and Databricks providing unified analytics and multi-tier access control.',
        icon: <Database className="w-6 h-6 text-[#0876B9]" />,
        tags: ['Snowflake', 'BigQuery', 'Databricks', 'AWS Redshift']
      },
      {
        title: 'Business Intelligence & Executive Dashboards',
        desc: 'Intuitive data visualizations, predictive KPIs, and automated reporting systems built for leadership and operational teams.',
        icon: <Activity className="w-6 h-6 text-[#0876B9]" />,
        tags: ['Power BI', 'Tableau', 'Looker', 'Custom React Charts']
      },
      {
        title: 'Data Governance & Privacy Compliance',
        desc: 'Data cataloging, lineage tracking, pseudonymization, and RBAC governance complying with GDPR and industry data regulations.',
        icon: <ShieldCheck className="w-6 h-6 text-[#0876B9]" />,
        tags: ['Data Lineage', 'Metadata Catalog', 'GDPR Compliance', 'Access Control']
      }
    ],
    techStack: [
      { category: 'Data Warehousing', tools: ['Snowflake', 'Google BigQuery', 'Amazon Redshift', 'Databricks'] },
      { category: 'ETL & Orchestration', tools: ['dbt', 'Apache Airflow', 'Kafka', 'Spark', 'Fivetran'] },
      { category: 'Visualization & BI', tools: ['Power BI', 'Tableau', 'Looker', 'Grafana', 'ECharts'] },
      { category: 'Storage & Querying', tools: ['PostgreSQL', 'S3 Lake', 'Parquet', 'Delta Lake'] }
    ],
    methodologySteps: [
      { step: '01', title: 'Data Source Audit & Modeling', desc: 'Schema assessment, ingestion frequency requirements, and data governance mapping.' },
      { step: '02', title: 'Automated Pipeline Engineering', desc: 'Resilient ETL/ELT pipelines with built-in validation rules and anomaly alerts.' },
      { step: '03', title: 'Data Transformation & Aggregation', desc: 'dbt models generating clean data marts for business units and analytics.' },
      { step: '04', title: 'Executive Dashboard Delivery', desc: 'Interactive visual reports with self-service query capabilities and scheduled summaries.' }
    ],
    outcomes: [
      { metric: '10x', label: 'Faster Query Speeds', detail: 'Optimized columnar storage and partitioned data warehouse schemas.' },
      { metric: 'Real-Time', label: 'Data Synchronization', detail: 'Sub-second event streaming from transactional databases.' },
      { metric: '100%', label: 'Data Lineage Traceability', detail: 'End-to-end tracking from raw ingestion to BI visualization.' }
    ]
  }
};

// Aliases for seamless navigation
const aliasMap: Record<string, string> = {
  'ai-powered-quality-engineering': 'qa-automation',
  'test-automation': 'qa-automation',
  'quality-engineering': 'qa-automation',
  'artificial-intelligence': 'ai',
  'generative-ai': 'ai',
  'agentic-ai': 'ai',
  'device-driver-iot': 'iot',
  'device-drivers': 'iot',
  'cloud-computing': 'cloud',
  'devops-automation': 'devops',
  'cyber-security': 'security',
  'it-security': 'security',
  'enterprise-software': 'software-engineering',
  'web-development': 'software-engineering',
  'analytics': 'data-analytics'
};

export const ServiceDetailPage = memo(function ServiceDetailPage() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const normalizedId = serviceId ? (aliasMap[serviceId.toLowerCase()] || serviceId.toLowerCase()) : 'qa-automation';
  const data = servicesData[normalizedId];

  if (!data) {
    return <Navigate to="/services/qa-automation" replace />;
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 pt-24 pb-20">
      {/* Breadcrumb Navigation Bar */}
      <div className="bg-[#F8FAFC] border-b border-slate-200/80 py-4">
        <div className="w-full px-[8%] flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link to="/" className="hover:text-[#0876B9] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/services" className="hover:text-[#0876B9] transition-colors">Services & Capabilities</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-semibold">{data.title}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-[#F8FAFC] via-white to-[#F0F7FF] overflow-hidden border-b border-slate-200/80">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#0876B9]/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#FFAA8C]/20 blur-3xl" />
        </div>

        <div className="w-full px-[8%] relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200/90 shadow-2xs text-xs font-semibold uppercase tracking-wider text-[#0876B9] mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{data.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.15]">
              {data.title}
            </h1>

            <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-normal mb-8 max-w-3xl">
              {data.description}
            </p>

            {/* Quick Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 max-w-2xl">
              {data.heroHighlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm font-medium text-slate-800 bg-white/80 border border-slate-200/80 px-3.5 py-2.5 rounded-sm shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-[#0876B9] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="px-7 py-3.5 bg-[#0876B9] text-white hover:bg-[#065E94] transition-all text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-sm flex items-center gap-2 shadow-md shadow-[#0876B9]/20 cursor-pointer"
              >
                <span>Consult with Engineers</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#pillars"
                className="px-7 py-3.5 bg-white text-slate-800 hover:bg-slate-50 transition-all border border-slate-300 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-sm shadow-2xs flex items-center justify-center"
              >
                Explore Capabilities
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Measurable Outcomes Strip */}
      <section className="py-12 bg-white border-b border-slate-200/80">
        <div className="w-full px-[8%]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            {data.outcomes.map((item, idx) => (
              <div key={idx} className="pt-4 md:pt-0 px-0 md:px-6 text-center md:text-left">
                <div className="text-3xl md:text-4xl font-extrabold text-[#0876B9] mb-1 font-sans">
                  {item.metric}
                </div>
                <div className="text-sm font-bold text-slate-900 mb-1">
                  {item.label}
                </div>
                <p className="text-xs text-slate-600 font-normal leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Engineering Pillars Deep Dive */}
      <section id="pillars" className="py-20 md:py-28 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="w-full px-[8%]">
          <div className="max-w-3xl mb-16">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E2725B] mb-3">
              Specialized Capabilities
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Architected for precision, security and enterprise scale.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.pillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="p-8 rounded-sm bg-white border border-slate-200/80 hover:border-[#0876B9]/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-sm bg-[#F8FAFC] border border-slate-200/80 flex items-center justify-center mb-6 shadow-2xs">
                    {pillar.icon}
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3 leading-snug">
                    {pillar.title}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal mb-6">
                    {pillar.desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100">
                  {pillar.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[11px] font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology & Tooling Stack Grid */}
      <section className="py-20 bg-white border-b border-slate-200/80">
        <div className="w-full px-[8%]">
          <div className="max-w-3xl mb-14 text-center mx-auto">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0876B9] mb-3">
              Technology & Framework Ecosystem
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Modern tooling powering {data.title}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.techStack.map((stack, idx) => (
              <div key={idx} className="p-6 rounded-sm bg-[#F8FAFC] border border-slate-200/80 shadow-2xs">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 pb-2 border-b border-slate-200">
                  {stack.category}
                </h4>
                <ul className="space-y-2.5">
                  {stack.tools.map((tool, tIdx) => (
                    <li key={tIdx} className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0876B9]" />
                      <span>{tool}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Methodology Process */}
      <section className="py-20 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="w-full px-[8%]">
          <div className="max-w-3xl mb-16">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E2725B] mb-3">
              Engineering Delivery Process
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              How our engineers deliver mission-critical excellence.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {data.methodologySteps.map((step, idx) => (
              <div key={idx} className="relative p-6 rounded-sm bg-white border border-slate-200/80 shadow-2xs">
                <div className="text-2xl font-bold font-sans text-[#0876B9] mb-3">
                  {step.step}
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-600 font-normal leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Block */}
      <section className="py-20 bg-gradient-to-br from-[#FFF7F2] via-[#F0F7FF] to-[#E0F2FE] text-center">
        <div className="w-full px-[8%] max-w-3xl">
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
            Accelerate your engineering roadmap today.
          </h3>
          <p className="text-base text-slate-600 mb-8 font-normal leading-relaxed">
            Partner with Drish Infotech engineers to implement scalable, automated, and secure technology solutions.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-3.5 bg-[#0876B9] text-white hover:bg-[#065E94] transition-all text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-sm shadow-md shadow-[#0876B9]/20 flex items-center gap-2 cursor-pointer"
            >
              <span>Initiate Project Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/"
              className="px-8 py-3.5 bg-white text-slate-800 hover:bg-slate-50 transition-all border border-slate-300 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-sm shadow-2xs flex items-center justify-center"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
});

ServiceDetailPage.displayName = 'ServiceDetailPage';
