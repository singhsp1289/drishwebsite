import { ServiceItem, IndustryItem, TechnologyItem, CaseStudyItem, TestimonialItem, InquiryItem, SiteSettings, AdminUser } from '../services/apiClient.ts';

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 1,
    slug: 'qa-automation',
    title: 'AI-Powered Quality Engineering & Test Automation',
    badge: 'Flagship Engineering Practice',
    tagline: 'Flawless software delivery at enterprise velocity.',
    shortDescription: 'Autonomous test generation, self-healing test automation scripts with Playwright and Selenium, distributed load profiling, and multi-tier CI/CD quality gates.',
    fullDescription: 'We deliver comprehensive Quality Engineering (QE) that accelerates product release cycles while eliminating regression defects. By blending AI-driven test script generation with rock-solid open-source frameworks, our teams establish automated CI/CD validation pipelines across web, mobile, microservices, and backend data layers.',
    icon: 'CheckCircle2',
    color: 'hover:border-[#0876B9]',
    order: 1,
    isActive: true,
    tags: ['Playwright', 'Selenium', 'JMeter', 'AI Automation', 'API Testing', 'Performance Testing'],
    heroHighlights: [
      'Self-Healing Test Locators with AI',
      'Distributed Cross-Browser Automation Grid',
      'Continuous CI/CD Gate Integration (GitHub / GitLab)',
      'Load & Stress Testing up to 100,000 Concurrent VUs'
    ],
    pillars: [
      {
        title: 'Autonomous Web & Mobile Automation',
        desc: 'Robust test scripts utilizing Playwright, Selenium, Appium, and Cypress. Built with Page Object Models, parallel execution, and automated screenshot diffing.',
        icon: 'CheckCircle2'
      },
      {
        title: 'API & Microservice Contract Testing',
        desc: 'High-throughput automated validation of REST, GraphQL, and gRPC endpoints with Postman, Newman, and custom Python/TypeScript suites.',
        icon: 'Layers'
      },
      {
        title: 'Performance & Distributed Load Profiling',
        desc: 'JMeter and k6 distributed simulations stressing high-concurrency database queries, network latency bottlenecks, and microservice degradation curves.',
        icon: 'BarChart3'
      },
      {
        title: 'Continuous Quality Gates in CI/CD',
        desc: 'Seamless integration with Jenkins, GitHub Actions, and Azure DevOps to halt builds upon regression, security, or coverage threshold violations.',
        icon: 'GitBranch'
      }
    ],
    outcomes: [
      { metric: '88%', label: 'Turnaround Reduction', desc: 'Shorter regression cycles with parallelized test suites.' },
      { metric: '99.8%', label: 'Defect Free Releases', desc: 'Zero critical leaks reaching production clusters.' },
      { metric: '10x', label: 'Test Execution Speed', desc: 'Ultra-fast headless browser pipelines across CI/CD.' }
    ],
    techStack: [
      { category: 'Web Automation', tools: ['Playwright', 'Selenium WebDriver', 'Cypress', 'TypeScript'] },
      { category: 'Mobile & API', tools: ['Appium', 'Postman / Newman', 'RestAssured', 'GraphQL Inspector'] },
      { category: 'Performance', tools: ['Apache JMeter', 'k6 Cloud', 'Gatling', 'Locust'] },
      { category: 'CI/CD & Reporting', tools: ['GitHub Actions', 'Jenkins', 'Allure Reports', 'ReportPortal'] }
    ],
    methodologySteps: [
      { step: '01', title: 'Architecture Audit & Matrix', desc: 'Identify critical user journeys, API contracts, and high-risk transactional pathways.' },
      { step: '02', title: 'Framework Scaffolding', desc: 'Deploy tailored TypeScript/Python frameworks with modular helpers, mocks, and environment profiles.' },
      { step: '03', title: 'CI/CD Integration', desc: 'Embed smoke, sanity, regression, and load suites into GitHub Actions or GitLab pipelines.' },
      { step: '04', title: 'Continuous Maintenance & Telemetry', desc: 'Autonomous locator healing, weekly flakiness remediation, and executive KPI reports.' }
    ]
  },
  {
    id: 2,
    slug: 'ai',
    title: 'Artificial Intelligence, GenAI & Agentic Systems',
    badge: 'Applied AI & Deep Learning',
    tagline: 'Autonomous AI agents and domain-tailored LLM pipelines.',
    shortDescription: 'Domain-tailored Generative AI models, multi-agent automated workflows, enterprise RAG knowledge engines, and production predictive machine learning pipelines.',
    fullDescription: 'Harness the power of cutting-edge Generative AI and production Machine Learning. We engineer robust RAG architectures, custom fine-tuned transformer models, and autonomous multi-agent pipelines with deterministic guardrails and strict security compliance.',
    icon: 'Brain',
    color: 'hover:border-[#0876B9]',
    order: 2,
    isActive: true,
    tags: ['Generative AI', 'Agentic Workflows', 'RAG Pipelines', 'PyTorch', 'LLMs'],
    heroHighlights: [
      'Enterprise Retrieval-Augmented Generation (RAG)',
      'Multi-Agent Collaborative Workflows',
      'On-Premise & Private Cloud LLM Deployments',
      'Computer Vision & Edge Machine Learning'
    ],
    pillars: [
      {
        title: 'Enterprise RAG & Knowledge Bases',
        desc: 'High-accuracy semantic retrieval with hybrid vector search (pgvector, Pinecone), chunking optimization, and re-ranking.',
        icon: 'Database'
      },
      {
        title: 'Autonomous Agentic Workflows',
        desc: 'Multi-agent orchestration using LangGraph and CrewAI for automated research, ticket resolution, and code generation.',
        icon: 'Zap'
      },
      {
        title: 'Custom Model Fine-Tuning & Quantization',
        desc: 'Domain adaptation via LoRA/QLoRA on Llama 3, Mistral, and domain-specific open-weights architectures.',
        icon: 'Cpu'
      },
      {
        title: 'Edge AI & Computer Vision',
        desc: 'YOLOv10 and TensorRT pipelines for defect detection, spatial analytics, and real-time video stream parsing.',
        icon: 'Eye'
      }
    ],
    outcomes: [
      { metric: '75%', label: 'Operational Efficiency', desc: 'Reduction in manual processing times across document workflows.' },
      { metric: '<50ms', label: 'Vector Query Latency', desc: 'Sub-second real-time semantic search over millions of records.' },
      { metric: '99.4%', label: 'RAG Answer Accuracy', desc: 'Hallucination suppression with strict factual verification filters.' }
    ],
    techStack: [
      { category: 'LLMs & Frameworks', tools: ['PyTorch', 'LangChain', 'LangGraph', 'LlamaIndex', 'Hugging Face'] },
      { category: 'Vector Databases', tools: ['pgvector', 'Pinecone', 'Qdrant', 'Milvus'] },
      { category: 'Computer Vision', tools: ['OpenCV', 'YOLOv10', 'TensorRT', 'ONNX'] },
      { category: 'Serving & MLOps', tools: ['vLLM', 'Ollama', 'MLflow', 'Triton Inference Server'] }
    ],
    methodologySteps: [
      { step: '01', title: 'Data Ingestion & Hygiene', desc: 'Scrape, clean, tokenize, and chunk enterprise unstructured documents and telemetry.' },
      { step: '02', title: 'Vectorization & Architecture', desc: 'Embed with state-of-the-art embedding models and configure hybrid search pipelines.' },
      { step: '03', title: 'Agent Logic & Tool Calling', desc: 'Define stateful multi-agent graphs with strict schemas and verification safeguards.' },
      { step: '04', title: 'Evaluation & Benchmarking', desc: 'Continuous RAG Triad evaluation for context relevance, groundedness, and answer correctness.' }
    ]
  },
  {
    id: 3,
    slug: 'iot',
    title: 'Device Driver, Firmware & IoT Systems',
    badge: 'Embedded Systems & Hardware Integration',
    tagline: 'Kernel-level reliability for connected hardware.',
    shortDescription: 'Linux and Windows kernel driver engineering, RTOS embedded firmware for ARM/ESP32, edge gateway protocol bridges, and hardware telemetry.',
    fullDescription: 'With over two decades of embedded engineering, Drish develops high-performance Linux and Windows kernel device drivers, firmware for ARM Cortex and ESP32 microcontrollers, and carrier-grade IoT edge gateways communicating over Modbus, CAN Bus, BLE, and Zigbee.',
    icon: 'Cpu',
    color: 'hover:border-[#0876B9]',
    order: 3,
    isActive: true,
    tags: ['Linux Drivers', 'Kernel C', 'ARM Cortex', 'RTOS', 'MQTT', 'BLE'],
    heroHighlights: [
      'Linux / Windows WDF Kernel Drivers',
      'FreeRTOS / Zephyr Firmware Engineering',
      'Sub-Millisecond Hardware Interrupt Latency',
      'Over-the-Air (OTA) Secure Cryptographic Updates'
    ],
    pillars: [
      {
        title: 'Kernel Device Drivers (Linux / Windows)',
        desc: 'High-throughput DMA, PCI Express, USB, and custom hardware interface drivers with zero memory leaks and crash resilience.',
        icon: 'Terminal'
      },
      {
        title: 'Embedded RTOS & Microcontroller Firmware',
        desc: 'Bare-metal C/C++ and FreeRTOS applications on STM32, NXP, TI, and Nordic Semiconductor chipsets.',
        icon: 'Cpu'
      },
      {
        title: 'Industrial Protocols & Edge Gateways',
        desc: 'Protocol bridging across CAN Bus (J1939), Modbus RTU/TCP, OPC-UA, MQTT, and Zigbee for manufacturing and automotive.',
        icon: 'Radio'
      },
      {
        title: 'Hardware Cryptography & Secure Boot',
        desc: 'Hardware Root of Trust, TPM 2.0 provisioning, and encrypted flash memory with authenticated OTA update rollouts.',
        icon: 'ShieldCheck'
      }
    ],
    outcomes: [
      { metric: '<1ms', label: 'Interrupt Latency', desc: 'Microsecond-level deterministic hardware responsiveness.' },
      { metric: '100k+', label: 'Connected Nodes', desc: 'Simultaneous telemetry streams handled without data packet loss.' },
      { metric: '99.999%', label: 'Kernel Stability', desc: 'Rock-solid driver MTBF under continuous full-load stress.' }
    ],
    techStack: [
      { category: 'Languages', tools: ['C', 'C++', 'Rust', 'Assembly (ARM / x86)'] },
      { category: 'RTOS & Kernels', tools: ['Linux Kernel 6.x', 'FreeRTOS', 'Zephyr', 'Windows WDF'] },
      { category: 'Protocols', tools: ['CAN Bus', 'Modbus', 'OPC-UA', 'MQTT', 'BLE 5.3', 'LoRaWAN'] },
      { category: 'Hardware Platforms', tools: ['ARM Cortex-M/A', 'STM32', 'NXP i.MX', 'ESP32', 'Raspberry Pi Compute'] }
    ],
    methodologySteps: [
      { step: '01', title: 'Hardware Schematic Review', desc: 'Analyze register maps, timing diagrams, clock trees, and bus bandwidth constraints.' },
      { step: '02', title: 'Kernel / Firmware BSP Development', desc: 'Write board support packages, peripheral initialization, and interrupt service routines.' },
      { step: '03', title: 'Oscilloscope & Stress Testing', desc: 'Validate signal integrity, thermal dissipation, and memory consumption under 100% duty cycles.' },
      { step: '04', title: 'Compliance & WHQL Certification', desc: 'Execute Microsoft HLK/WHQL driver suites and ISO 26262/IEC 61508 safety reviews.' }
    ]
  },
  {
    id: 4,
    slug: 'cloud',
    title: 'Cloud Computing & Distributed Systems',
    badge: 'Cloud Engineering & High-Availability Architecture',
    tagline: 'Resilient multi-cloud infrastructure and distributed microservices.',
    shortDescription: 'Multi-cloud architecture on AWS, Azure, and GCP, Kubernetes container orchestration, event-driven microservices, and FinOps cost optimization.',
    fullDescription: 'We architect, migrate, and maintain ultra-reliable cloud architectures on AWS, Google Cloud, and Microsoft Azure. From Kubernetes container orchestration to event-driven Kafka pipelines, we ensure multi-region redundancy and optimized cloud spending.',
    icon: 'Cloud',
    color: 'hover:border-[#0876B9]',
    order: 4,
    isActive: true,
    tags: ['AWS', 'Azure', 'GCP', 'Kubernetes', 'Microservices', 'Kafka', 'Terraform'],
    heroHighlights: [
      'Multi-Region Kubernetes (EKS / GKE / AKS)',
      'Event-Driven Microservices with Kafka & RabbitMQ',
      'Infrastructure as Code (Terraform / OpenTofu)',
      'FinOps Cloud Cost Optimization & Observability'
    ],
    pillars: [
      {
        title: 'Kubernetes Container Orchestration',
        desc: 'Production-ready EKS, GKE, and on-prem K8s clusters with automated node scaling, service mesh (Istio), and GitOps (ArgoCD).',
        icon: 'Server'
      },
      {
        title: 'Event-Driven Microservice Topologies',
        desc: 'Decoupled, high-throughput architectures leveraging Apache Kafka, RabbitMQ, and AWS SQS for billions of monthly events.',
        icon: 'Layers'
      },
      {
        title: 'Infrastructure as Code & CI/CD',
        desc: 'Declarative, immutable cloud provisioning with Terraform, Pulumi, and automated drift detection.',
        icon: 'Code2'
      },
      {
        title: 'Full-Stack Distributed Observability',
        desc: 'Unified monitoring with OpenTelemetry, Prometheus, Grafana, Datadog, and distributed APM tracing.',
        icon: 'Activity'
      }
    ],
    outcomes: [
      { metric: '99.999%', label: 'Availability SLA', desc: 'High-availability multi-zone fault tolerant infrastructure.' },
      { metric: '40%', label: 'Cloud Cost Reduction', desc: 'Achieved through right-sizing, spot fleets, and auto-scaling.' },
      { metric: '<5min', label: 'Recovery Point Objective', desc: 'Rapid automated failover and disaster recovery.' }
    ],
    techStack: [
      { category: 'Cloud Providers', tools: ['Amazon Web Services (AWS)', 'Google Cloud Platform (GCP)', 'Microsoft Azure'] },
      { category: 'Orchestration & Containers', tools: ['Kubernetes', 'Docker', 'Helm', 'ArgoCD', 'Istio'] },
      { category: 'IaC & Automation', tools: ['Terraform', 'OpenTofu', 'Ansible', 'Packer'] },
      { category: 'Messaging & Queues', tools: ['Apache Kafka', 'RabbitMQ', 'AWS SQS/SNS', 'NATS'] }
    ],
    methodologySteps: [
      { step: '01', title: 'Cloud Readiness Assessment', desc: 'Audit monolithic dependencies, network topologies, and egress bandwidth costs.' },
      { step: '02', title: 'Landing Zone & IaC Design', desc: 'Establish secure VPCs, transit gateways, IAM roles, and Terraform modules.' },
      { step: '03', title: 'Zero-Downtime Data Migration', desc: 'Execute blue-green and canary cutovers with database replication and rollback triggers.' },
      { step: '04', title: '24/7 SRE & FinOps Governance', desc: 'Implement automated budget alerts, PagerDuty on-call rotations, and quarterly audits.' }
    ]
  },
  {
    id: 5,
    slug: 'devops',
    title: 'DevOps & Infrastructure Automation',
    badge: 'CI/CD & Platform Engineering',
    tagline: 'Frictionless developer platforms and automated pipelines.',
    shortDescription: 'Enterprise CI/CD pipeline automation, GitOps continuous delivery, automated vulnerability scanning, and infrastructure monitoring.',
    fullDescription: 'Empower your software teams to ship code ten times faster. We build internal developer platforms, automated release pipelines with automated rollback, and comprehensive policy-as-code guardrails.',
    icon: 'GitBranch',
    color: 'hover:border-[#0876B9]',
    order: 5,
    isActive: true,
    tags: ['GitOps', 'ArgoCD', 'GitHub Actions', 'Jenkins', 'Docker', 'Prometheus'],
    heroHighlights: [
      'GitOps Continuous Delivery with ArgoCD',
      'Automated Security Scanning (SAST / DAST / SCA)',
      'Container Image Hardening & Distroless Builds',
      'Internal Developer Platforms (IDP) & Self-Service'
    ],
    pillars: [
      {
        title: 'Automated CI/CD Release Pipelines',
        desc: 'High-speed parallel test execution, build caching, artifact signing, and multi-stage promotion across environments.',
        icon: 'Zap'
      },
      {
        title: 'DevSecOps & Shift-Left Security',
        desc: 'Automated Trivy, Snyk, SonarQube, and OWASP ZAP scanning embedded directly inside pull request checks.',
        icon: 'ShieldCheck'
      },
      {
        title: 'Platform Engineering & Self-Service',
        desc: 'Pre-configured developer portals enabling engineering squads to provision compliant ephemeral staging environments.',
        icon: 'Terminal'
      },
      {
        title: 'Chaos Engineering & Resilience',
        desc: 'Proactive fault injection with Chaos Mesh to validate automated healing and failover mechanisms.',
        icon: 'Activity'
      }
    ],
    outcomes: [
      { metric: '15min', label: 'Commit-to-Prod Time', desc: 'Automated testing and deployment from pull request merge to live release.' },
      { metric: '0', label: 'Manual Release Steps', desc: '100% codified, audited GitOps release pipelines.' },
      { metric: '99.5%', label: 'Deployment Success Rate', desc: 'Automated smoke verification with instant zero-loss rollbacks.' }
    ],
    techStack: [
      { category: 'CI/CD Engines', tools: ['GitHub Actions', 'GitLab CI', 'Jenkins', 'Azure Pipelines'] },
      { category: 'GitOps & Delivery', tools: ['ArgoCD', 'FluxCD', 'Helm', 'Kustomize'] },
      { category: 'Security & Scanning', tools: ['Trivy', 'SonarQube', 'Snyk', 'Cosign', 'Vault'] },
      { category: 'Observability', tools: ['Prometheus', 'Grafana', 'Loki', 'Datadog', 'Jaeger'] }
    ],
    methodologySteps: [
      { step: '01', title: 'Value Stream Mapping', desc: 'Identify build bottlenecks, manual sign-off delays, and flakiness hot spots.' },
      { step: '02', title: 'Pipeline Modernization', desc: 'Refactor monolithic build scripts into modular, cache-accelerated steps.' },
      { step: '03', title: 'Secret & Policy Hardening', desc: 'Integrate HashiCorp Vault, dynamic secrets, and OPA Gatekeeper policies.' },
      { step: '04', title: 'Continuous SRE Feedback', desc: 'Track DORA metrics (Deployment Frequency, Lead Time, MTTR, Change Failure Rate).' }
    ]
  },
  {
    id: 6,
    slug: 'security',
    title: 'IT Infrastructure & Cyber Security',
    badge: 'Zero Trust Security & Compliance',
    tagline: 'Enterprise-wide defense-in-depth and continuous compliance.',
    shortDescription: 'Zero Trust architectural blueprints, ethical penetration testing, continuous vulnerability management, and 24/7 SIEM/SOC threat detection.',
    fullDescription: 'Protect mission-critical data, intellectual property, and infrastructure from advanced persistent threats. Our cybersecurity specialists provide penetration testing, Zero Trust architecture design, ISO 27001 / SOC 2 compliance readiness, and real-time SIEM/SOC monitoring.',
    icon: 'ShieldCheck',
    color: 'hover:border-[#0876B9]',
    order: 6,
    isActive: true,
    tags: ['Zero Trust', 'Penetration Testing', 'SIEM / SOC', 'ISO 27001', 'SOC 2', 'Cryptography'],
    heroHighlights: [
      'Zero Trust Network Access (ZTNA) Architecture',
      'Full-Scope Web, Mobile & Network Penetration Testing',
      'ISO 27001, SOC 2, HIPAA & GDPR Compliance Audits',
      '24/7 Managed SIEM Detection & Incident Response'
    ],
    pillars: [
      {
        title: 'Ethical Penetration Testing',
        desc: 'Comprehensive white-box and black-box penetration testing covering OWASP Top 10, API flaws, and business logic bypasses.',
        icon: 'ShieldAlert'
      },
      {
        title: 'Zero Trust Network Architecture',
        desc: 'Least-privilege microsegmentation, mutual TLS (mTLS), and device health attestation across all corporate networks.',
        icon: 'Lock'
      },
      {
        title: 'Cloud Security Posture Management (CSPM)',
        desc: 'Continuous auditing of AWS/GCP IAM roles, S3 bucket permissions, and unencrypted data volumes.',
        icon: 'Cloud'
      },
      {
        title: 'Regulatory & Compliance Assurance',
        desc: 'End-to-end guidance and evidence gathering for ISO 27001:2022, SOC 2 Type II, and HIPAA certifications.',
        icon: 'CheckCircle2'
      }
    ],
    outcomes: [
      { metric: '100%', label: 'Audit Readiness', desc: 'Streamlined compliance reporting and verifiable security policies.' },
      { metric: '<15min', label: 'Threat Response Time', desc: 'Rapid automated isolation of compromised compute workloads.' },
      { metric: '0', label: 'Critical Breaches', desc: 'Flawless operational security track record for 25+ years.' }
    ],
    techStack: [
      { category: 'Penetration Testing', tools: ['Burp Suite Professional', 'Metasploit', 'OWASP ZAP', 'Nmap', 'Wireshark'] },
      { category: 'SIEM & SOC', tools: ['Wazuh', 'Splunk', 'Elastic SIEM', 'CrowdStrike Falcon'] },
      { category: 'IAM & Secrets', tools: ['HashiCorp Vault', 'Okta', 'Keycloak', 'AWS KMS'] },
      { category: 'Compliance Tooling', tools: ['Vanta', 'Drata', 'OpenSCAP', 'ScoutSuite'] }
    ],
    methodologySteps: [
      { step: '01', title: 'Threat Modeling & Asset Inventory', desc: 'Identify attack surfaces, public IP spaces, API endpoints, and sensitive data stores.' },
      { step: '02', title: 'Active Vulnerability Assessment', desc: 'Execute automated scans and manual deep-dive exploit attempts.' },
      { step: '03', title: 'Remediation & Architecture Hardening', desc: 'Provide developers with concrete code patches, firewall rules, and cipher configs.' },
      { step: '04', title: 'Continuous Telemetry & Auditing', desc: 'Deploy automated daily compliance sweeps and log retention pipelines.' }
    ]
  },
  {
    id: 7,
    slug: 'software-engineering',
    title: 'Enterprise Software Engineering',
    badge: 'Digital Engineering & Custom Platforms',
    tagline: 'Modern, scalable software engineered for longevity.',
    shortDescription: 'Clean TypeScript/React web applications, high-throughput Node.js microservices, multi-tenant SaaS platforms, and enterprise API architectures.',
    fullDescription: 'We build enterprise web and mobile applications from concept to production. Using clean TypeScript, React, Next.js, Node.js, and PostgreSQL, our software engineers build resilient, multi-tenant software platforms designed to scale seamlessly to millions of active users.',
    icon: 'Code2',
    color: 'hover:border-[#0876B9]',
    order: 7,
    isActive: true,
    tags: ['React', 'TypeScript', 'Node.js', 'NestJS', 'PostgreSQL', 'GraphQL', 'Next.js'],
    heroHighlights: [
      'Type-Safe Full-Stack TypeScript Architecture',
      'Multi-Tenant SaaS with Row-Level Security',
      'High-Throughput REST & GraphQL APIs',
      'Mobile Development with React Native & Flutter'
    ],
    pillars: [
      {
        title: 'Modern Front-End Engineering',
        desc: 'Accessible, lightning-fast web applications built with React 19, Next.js, Tailwind CSS, and optimized bundle sizes.',
        icon: 'Layout'
      },
      {
        title: 'High-Concurrency Backend Services',
        desc: 'Modular Node.js/NestJS, Go, and Python microservices designed with domain-driven design and strict API schemas.',
        icon: 'Server'
      },
      {
        title: 'Multi-Tenant SaaS Platforms',
        desc: 'Tenant isolation, subscription billing (Stripe), dynamic RBAC permissions, and white-label custom domain support.',
        icon: 'Layers'
      },
      {
        title: 'Cross-Platform Mobile Apps',
        desc: 'Native-feel iOS and Android applications utilizing React Native and Flutter with offline SQLite caching.',
        icon: 'Smartphone'
      }
    ],
    outcomes: [
      { metric: '98+', label: 'Google Lighthouse Score', desc: 'Optimized Core Web Vitals and sub-second First Contentful Paint.' },
      { metric: '10,000+', label: 'Req / Sec Throughput', desc: 'Non-blocking Node.js/Go backend request handling capacity.' },
      { metric: '100%', label: 'Type Safety', desc: 'Shared TypeScript schemas from database queries to front-end UI.' }
    ],
    techStack: [
      { category: 'Frontend', tools: ['React 19', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite'] },
      { category: 'Backend & APIs', tools: ['Node.js', 'NestJS', 'Express', 'Go', 'GraphQL', 'REST'] },
      { category: 'Databases & ORM', tools: ['PostgreSQL', 'Drizzle ORM', 'Prisma', 'Redis', 'MongoDB'] },
      { category: 'Mobile', tools: ['React Native', 'Flutter', 'Expo', 'Swift', 'Kotlin'] }
    ],
    methodologySteps: [
      { step: '01', title: 'Domain Modeling & Wireframing', desc: 'Define business entities, user stories, schema models, and interactive Figma wireframes.' },
      { step: '02', title: 'Modular Architecture Setup', desc: 'Scaffold monorepos, design systems, and automated linting/formatting rules.' },
      { step: '03', title: 'Agile Sprint Execution', desc: 'Deliver production-ready increments every two weeks with automated unit/E2E coverage.' },
      { step: '04', title: 'Performance Optimization & Launch', desc: 'Database indexing, CDN caching, load testing, and seamless production launch.' }
    ]
  },
  {
    id: 8,
    slug: 'data-analytics',
    title: 'Data Engineering & Analytics',
    badge: 'Data Intelligence & Lakehouse Architecture',
    tagline: 'Transform raw data streams into actionable business intelligence.',
    shortDescription: 'Real-time streaming ETL/ELT pipelines, modern cloud lakehouses, automated data transformation with dbt, and executive business intelligence dashboards.',
    fullDescription: 'Unlock the true value of your enterprise data. We build streaming and batch ETL/ELT pipelines with Apache Kafka, Spark, Snowflake, and BigQuery, orchestrating analytical transformations with dbt and delivering executive BI dashboards.',
    icon: 'Database',
    color: 'hover:border-[#0876B9]',
    order: 8,
    isActive: true,
    tags: ['Snowflake', 'BigQuery', 'Apache Kafka', 'dbt', 'Power BI', 'Apache Spark'],
    heroHighlights: [
      'Real-Time Streaming ETL with Apache Kafka & Flink',
      'Modern Cloud Lakehouse (Snowflake / BigQuery / Databricks)',
      'Automated Data Transformation & Testing with dbt',
      'Executive BI Dashboards with Power BI & Looker'
    ],
    pillars: [
      {
        title: 'Streaming & Batch Data Pipelines',
        desc: 'High-throughput ingestion pipelines handling millions of daily records with Airflow, Kafka, and Apache Spark.',
        icon: 'GitPullRequest'
      },
      {
        title: 'Modern Cloud Data Warehousing',
        desc: 'Optimized star and snowflake schemas in Snowflake, Google BigQuery, and AWS Redshift with partitioned querying.',
        icon: 'Database'
      },
      {
        title: 'Data Quality & Modeling with dbt',
        desc: 'Version-controlled SQL transformations, automated data freshness alerts, and schema constraint tests.',
        icon: 'CheckCircle2'
      },
      {
        title: 'Business Intelligence & Visual Analytics',
        desc: 'Interactive executive reporting dashboards with Power BI, Tableau, and embedded custom React analytics charts.',
        icon: 'BarChart3'
      }
    ],
    outcomes: [
      { metric: '90%', label: 'Pipeline Speed Improvement', desc: 'Accelerated batch processing times with distributed Spark queries.' },
      { metric: '<1sec', label: 'Query Response Time', desc: 'Sub-second dashboard load times across petabyte-scale data lakes.' },
      { metric: '100%', label: 'Data Lineage Auditing', desc: 'Full automated governance and GDPR/CCPA data compliance.' }
    ],
    techStack: [
      { category: 'Data Warehouses', tools: ['Snowflake', 'Google BigQuery', 'AWS Redshift', 'Databricks'] },
      { category: 'Ingestion & Streaming', tools: ['Apache Kafka', 'Apache Spark', 'Apache Flink', 'Airbyte'] },
      { category: 'Transformation & Ops', tools: ['dbt Core', 'Apache Airflow', 'Dagster', 'Great Expectations'] },
      { category: 'BI & Visualization', tools: ['Power BI', 'Tableau', 'Looker', 'Apache Superset'] }
    ],
    methodologySteps: [
      { step: '01', title: 'Data Source Discovery', desc: 'Catalog upstream relational databases, IoT telemetry feeds, and 3rd-party SaaS APIs.' },
      { step: '02', title: 'Lakehouse & Pipeline Design', desc: 'Establish Bronze, Silver, Gold data tiers and configure Kafka streaming brokers.' },
      { step: '03', title: 'Transformation & Quality Gates', desc: 'Write modular dbt models with automated schema validations and regression tests.' },
      { step: '04', title: 'Dashboard Deployment & Training', desc: 'Build performant BI views and train stakeholder teams on self-serve analytics.' }
    ]
  }
];

export const INITIAL_INDUSTRIES: IndustryItem[] = [
  {
    id: 1,
    slug: 'healthcare',
    name: 'Healthcare & Life Sciences',
    badge: 'High-Compliance Digital Health',
    tagline: 'Engineering mission-critical digital health platforms and IoMT systems.',
    shortDescription: 'Medical device IoMT firmware, AI clinical decision support systems, FHIR/HL7 interoperability bridges, and 21 CFR Part 11 automated QA validation.',
    fullDescription: 'We engineer secure, regulatory-compliant digital health applications and medical device integrations. From FDA 21 CFR Part 11 test automation to FHIR/HL7 interoperability standards, we safeguard sensitive Protected Health Information (PHI) while enabling modern clinical care.',
    compliance: 'ISO 13485 & HIPAA',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=75&w=800',
    icon: 'Activity',
    order: 1,
    isActive: true,
    tags: ['HIPAA / HITECH', 'IoMT Firmware', 'FHIR / HL7', 'Clinical AI', 'FDA 21 CFR Part 11'],
    outcomes: [
      { stat: '100%', label: 'HIPAA & FDA 21 CFR Part 11 Audit Compliance' },
      { stat: '99.99%', label: 'Medical Telemetry Ingestion Uptime' },
      { stat: '150k+', label: 'Patient Records Synchronized Daily' }
    ],
    capabilities: [
      { title: 'IoMT Medical Device Connectivity', desc: 'Ultra-low latency BLE and Wi-Fi drivers for patient monitoring hardware and diagnostic analyzers.' },
      { title: 'FHIR / HL7 Data Integration', desc: 'Bi-directional interoperability bridges connecting EHR systems (Epic, Cerner) with modern cloud applications.' },
      { title: 'Regulatory Test Automation', desc: 'Automated 21 CFR Part 11 audit trails, electronic signatures validation, and verification matrices.' },
      { title: 'Clinical Decision Support AI', desc: 'HIPAA-compliant private inference models for medical image analysis and risk scoring.' }
    ]
  },
  {
    id: 2,
    slug: 'fintech',
    name: 'Financial Services & FinTech',
    badge: 'Ultra-Secure FinTech',
    tagline: 'Microsecond settlement and low-latency trading infrastructure.',
    shortDescription: 'High-concurrency payment orchestration, sub-100ms AI fraud detection, Open Banking PSD2 APIs, and microsecond settlement infrastructure.',
    fullDescription: 'In financial services, latency and security are paramount. We build high-frequency trading interfaces, PCI-DSS Level 1 compliant payment gateways, AI-driven fraud detection engines, and open banking microservices capable of handling millions of transactions with zero loss.',
    compliance: 'SOC 2 Type II & PCI-DSS',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=75&w=800',
    icon: 'DollarSign',
    order: 2,
    isActive: true,
    tags: ['PCI-DSS Level 1', 'AI Fraud Detection', 'Open Banking', 'Low-Latency APIs', 'Tokenization'],
    outcomes: [
      { stat: '<50ms', label: 'Payment Gateway Processing Latency' },
      { stat: '99.999%', label: 'Core Banking API Availability' },
      { stat: '$2B+', label: 'Annual Processed Transaction Value' }
    ],
    capabilities: [
      { title: 'High-Throughput Payment Gateways', desc: 'Tokenized credit card and ACH payment orchestration supporting multi-currency routing.' },
      { title: 'Sub-100ms Fraud Scoring', desc: 'Real-time anomaly detection models evaluating risk vectors before transaction authorization.' },
      { title: 'Open Banking PSD2 APIs', desc: 'Standardized OAuth 2.0 and FAPI-compliant interfaces for secure third-party financial data sharing.' },
      { title: 'Automated Financial QA & Ledger Checks', desc: 'Automated precision regression testing verifying double-entry bookkeeping and currency rounding.' }
    ]
  },
  {
    id: 3,
    slug: 'automotive',
    name: 'Automotive, EV & Connected Mobility',
    badge: 'ISO 26262 ASIL-D Embedded Systems',
    tagline: 'Functional safety software for automotive and fleet telematics.',
    shortDescription: 'CAN Bus & AUTOSAR embedded firmware, ISO 26262 functional safety QA, EV charging station controllers (OCPP), and fleet telematics analytics.',
    fullDescription: 'From electronic control units (ECUs) to connected vehicle cloud platforms, we engineer embedded C/C++ firmware, ISO 26262 ASIL-compliant software, and OCPP 2.0.1 EV charging protocol stacks that connect millions of vehicles to real-time telematics.',
    compliance: 'ISO 26262 & AUTOSAR',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=75&w=800',
    icon: 'Car',
    order: 3,
    isActive: true,
    tags: ['ISO 26262 ASIL', 'CAN Bus J1939', 'AUTOSAR', 'EV OCPP 2.0', 'Telematics AI'],
    outcomes: [
      { stat: '<1ms', label: 'Deterministic CAN Bus Communication Latency' },
      { stat: '100k+', label: 'Connected Fleet Vehicles Monitored' },
      { stat: '100%', label: 'ISO 26262 Functional Safety Adherence' }
    ],
    capabilities: [
      { title: 'AUTOSAR & ECU Firmware', desc: 'Deterministic embedded software running on Renesas, Infineon, and NXP automotive chipsets.' },
      { title: 'CAN Bus & Ethernet Protocol Stacks', desc: 'J1939, UDS (ISO 14229), and DoIP network drivers for high-bandwidth vehicle diagnostics.' },
      { title: 'EV Charging OCPP Controllers', desc: 'OCPP 1.6J and 2.0.1 compliant firmware for DC fast chargers and smart grid power balancing.' },
      { title: 'Fleet Route AI & Telematics', desc: 'Cloud ingestion of GPS, accelerometer, and battery degradation data for predictive fleet maintenance.' }
    ]
  },
  {
    id: 4,
    slug: 'manufacturing',
    name: 'Smart Manufacturing & Industry 4.0',
    badge: 'Industrial Automation & IIoT',
    tagline: 'Connecting factory floors with predictive intelligence.',
    shortDescription: 'IIoT sensor telemetry networks, high-speed computer vision defect classification, SCADA/PLC operational integration, and predictive maintenance algorithms.',
    fullDescription: 'We bridge operational technology (OT) and information technology (IT). By connecting PLCs, SCADA systems, and edge computer vision sensors, we turn manufacturing facilities into smart factories with predictive maintenance and real-time OEE monitoring.',
    compliance: 'ISA-95 & IEC 62443',
    image: 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?auto=format&fit=crop&q=75&w=800',
    icon: 'Factory',
    order: 4,
    isActive: true,
    tags: ['IIoT Sensors', 'Computer Vision AI', 'OPC-UA / Modbus', 'SCADA / MES', 'Predictive Maintenance'],
    outcomes: [
      { stat: '45%', label: 'Reduction in Unplanned Factory Downtime' },
      { stat: '99.7%', label: 'Vision AI Defect Classification Accuracy' },
      { stat: '100,000+', label: 'Packets / Sec Ingestion from Shop Floor Sensors' }
    ],
    capabilities: [
      { title: 'OPC-UA & Modbus Protocol Bridges', desc: 'Reliable industrial drivers interfacing Siemens, Rockwell, and Schneider PLCs with cloud lakehouses.' },
      { title: 'Edge Computer Vision Defect Detection', desc: 'Microsecond surface defect classification on production conveyor lines using TensorRT.' },
      { title: 'Predictive Vibration & Heat Analysis', desc: 'Machine learning algorithms forecasting bearing and motor degradation weeks before failure.' },
      { title: 'MES & ERP Integration', desc: 'Real-time synchronization between factory production schedules and SAP / Oracle ERP systems.' }
    ]
  },
  {
    id: 5,
    slug: 'telecom',
    name: 'Telecommunications & 5G Edge',
    badge: 'High-Throughput Network Systems',
    tagline: 'Carrier-grade infrastructure for high-bandwidth networks.',
    shortDescription: 'Carrier-grade network function virtualization, 5G edge compute gateways, distributed streaming telemetry, and high-availability protocol drivers.',
    fullDescription: 'Drish engineers carrier-grade software systems powering regional and international telecom operators. From automated billing and subscriber reporting pipelines to low-latency 5G edge gateways and eBPF network telemetry, we deliver 99.999% availability.',
    compliance: 'Carrier Grade 99.999%',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=75&w=800',
    icon: 'Radio',
    order: 5,
    isActive: true,
    tags: ['5G Edge Compute', 'NFV Protocols', 'Packet Routing', 'eBPF Telemetry', 'Zero-Downtime'],
    outcomes: [
      { stat: '99.999%', label: 'Network Gateway Availability SLA' },
      { stat: '5M+', label: 'Daily Call Detail Records Processed' },
      { stat: '<5ms', label: 'Edge Packet Processing Latency' }
    ],
    capabilities: [
      { title: 'Carrier Analytics & Automated Reporting', desc: 'High-throughput ETL processing millions of CDRs across multi-country telecom regions.' },
      { title: '5G Edge Compute Gateways', desc: 'Containerized edge microservices running near cell towers for ultra-low latency mobile applications.' },
      { title: 'eBPF High-Performance Telemetry', desc: 'Kernel-level packet inspection and DDoS mitigation with minimal CPU overhead.' },
      { title: 'Protocol Virtualization & SS7/SIP', desc: 'Legacy voice and signaling protocol translation bridges for modern VoIP networks.' }
    ]
  },
  {
    id: 6,
    slug: 'logistics',
    name: 'Supply Chain, Logistics & Fleet',
    badge: 'Fleet Telemetry & Route AI',
    tagline: 'End-to-end supply chain transparency and route optimization.',
    shortDescription: 'AI-driven route and load optimization, warehouse automation controllers, cold-chain sensor monitoring, and multi-modal logistics tracking.',
    fullDescription: 'We build digital logistics platforms that optimize global freight, cold-chain pharmaceuticals, and last-mile delivery fleets. Using real-time GPS telemetry, cold-chain temperature sensors, and combinatorial route algorithms, our platforms maximize supply chain velocity.',
    compliance: 'ISO 28000 & TAPA',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=75&w=800',
    icon: 'Truck',
    order: 6,
    isActive: true,
    tags: ['Route AI Optimization', 'Cold-Chain IoT', 'Fleet Telematics', 'Warehouse Automation', 'EDI Integration'],
    outcomes: [
      { stat: '22%', label: 'Fuel & Fleet Distance Reduction' },
      { stat: '100%', label: 'Cold-Chain Temperature Excursion Auditing' },
      { stat: '500k+', label: 'Shipment Milestones Tracked Monthly' }
    ],
    capabilities: [
      { title: 'AI Route & Capacity Optimization', desc: 'Dynamic multi-stop dispatch algorithms minimizing empty miles and fuel consumption.' },
      { title: 'Cold-Chain Sensor Telemetry', desc: 'Real-time Bluetooth and cellular sensor tracking of temperature, humidity, and shock.' },
      { title: 'Automated Warehouse Robotics Integration', desc: 'Controllers interfacing automated guided vehicles (AGVs) with warehouse management systems.' },
      { title: 'EDI & Freight Partner Portals', desc: 'Automated EDI 204, 214, and 210 electronic document interchange for freight carriers.' }
    ]
  }
];

export const INITIAL_TECHNOLOGIES: TechnologyItem[] = [
  { id: 1, name: 'Playwright', category: 'Quality & Test Automation', role: 'Autonomous End-to-End Testing', description: 'Cross-browser parallel execution with auto-waiting, network mocking, and self-healing locators.', order: 1, isActive: true },
  { id: 2, name: 'Selenium WebDriver', category: 'Quality & Test Automation', role: 'Enterprise Grid Testing', description: 'Distributed cross-platform browser automation across Chrome, Firefox, Safari, and Edge.', order: 2, isActive: true },
  { id: 3, name: 'Appium', category: 'Quality & Test Automation', role: 'Native Mobile Automation', description: 'Unified automated testing framework for iOS and Android native and hybrid applications.', order: 3, isActive: true },
  { id: 4, name: 'Apache JMeter & k6', category: 'Quality & Test Automation', role: 'Distributed Load & Stress Profiling', description: 'High-concurrency load testing simulating hundreds of thousands of virtual user sessions.', order: 4, isActive: true },
  { id: 5, name: 'PyTorch', category: 'AI & Machine Learning', role: 'Deep Learning & Neural Networks', description: 'State-of-the-art framework for training and fine-tuning custom LLMs and vision transformers.', order: 5, isActive: true },
  { id: 6, name: 'LangChain & LangGraph', category: 'AI & Machine Learning', role: 'Multi-Agent Orchestration', description: 'Stateful agentic workflows, memory persistence, and tool-calling integration.', order: 6, isActive: true },
  { id: 7, name: 'pgvector & Pinecone', category: 'AI & Machine Learning', role: 'Semantic Vector Search', description: 'High-dimensional embeddings storage and sub-50ms hybrid vector retrieval for RAG pipelines.', order: 7, isActive: true },
  { id: 8, name: 'OpenCV & YOLOv10', category: 'AI & Machine Learning', role: 'Computer Vision & Edge AI', description: 'Real-time video inference and industrial defect classification at 60+ FPS.', order: 8, isActive: true },
  { id: 9, name: 'Linux Kernel C', category: 'Embedded, IoT & Edge Drivers', role: 'Low-Latency Device Drivers', description: 'High-throughput DMA, PCIe, USB, and custom hardware interface kernel modules.', order: 9, isActive: true },
  { id: 10, name: 'FreeRTOS & Zephyr', category: 'Embedded, IoT & Edge Drivers', role: 'Real-Time Embedded OS', description: 'Deterministic task scheduling for ARM Cortex-M microcontrollers and low-power IoT nodes.', order: 10, isActive: true },
  { id: 11, name: 'CAN Bus & Modbus', category: 'Embedded, IoT & Edge Drivers', role: 'Industrial & Automotive Protocols', description: 'J1939 vehicle networks and shop-floor PLC telemetry integration with zero packet loss.', order: 11, isActive: true },
  { id: 12, name: 'MQTT & BLE 5.3', category: 'Embedded, IoT & Edge Drivers', role: 'Wireless Telemetry & Mesh Networks', description: 'Lightweight publish/subscribe messaging for millions of battery-operated sensor devices.', order: 12, isActive: true },
  { id: 13, name: 'AWS & Google Cloud', category: 'Cloud & Distributed Infrastructure', role: 'Enterprise Cloud Platforms', description: 'Multi-region architectures with auto-scaling compute, managed databases, and global CDNs.', order: 13, isActive: true },
  { id: 14, name: 'Kubernetes (K8s)', category: 'Cloud & Distributed Infrastructure', role: 'Container Orchestration', description: 'Production-grade cluster scaling, service mesh routing, and automated zero-downtime rollouts.', order: 14, isActive: true },
  { id: 15, name: 'Apache Kafka', category: 'Cloud & Distributed Infrastructure', role: 'Event-Driven Streaming', description: 'Distributed commit log processing billions of transactional events per day.', order: 15, isActive: true },
  { id: 16, name: 'Terraform & IaC', category: 'Cloud & Distributed Infrastructure', role: 'Infrastructure as Code', description: 'Declarative cloud provisioning with automated security auditing and drift detection.', order: 16, isActive: true },
  { id: 17, name: 'React 19 & Next.js', category: 'Modern Web & Full-Stack', role: 'Modern Frontend Architecture', description: 'Server-side rendering, sub-second First Contentful Paint, and responsive UI components.', order: 17, isActive: true },
  { id: 18, name: 'TypeScript & Node.js', category: 'Modern Web & Full-Stack', role: 'Type-Safe Backend Microservices', description: 'End-to-end typed REST and GraphQL APIs with asynchronous non-blocking event loops.', order: 18, isActive: true },
  { id: 19, name: 'PostgreSQL & Drizzle ORM', category: 'Modern Web & Full-Stack', role: 'Relational Database & ORM', description: 'ACID-compliant relational database with connection pooling and type-safe schema queries.', order: 19, isActive: true },
  { id: 20, name: 'Tailwind CSS', category: 'Modern Web & Full-Stack', role: 'Modern Design System', description: 'Utility-first CSS framework delivering clean, responsive, high-performance UI styling.', order: 20, isActive: true },
  { id: 21, name: 'Zero Trust & mTLS', category: 'Cyber Security & Zero Trust', role: 'Defense-in-Depth Architecture', description: 'Mutual TLS authentication, least-privilege access control, and identity-aware microsegmentation.', order: 21, isActive: true },
  { id: 22, name: 'Burp Suite & OWASP ZAP', category: 'Cyber Security & Zero Trust', role: 'Penetration Testing & SAST', description: 'Automated vulnerability scanning and manual deep-dive exploit verification.', order: 22, isActive: true },
  { id: 23, name: 'HashiCorp Vault', category: 'Cyber Security & Zero Trust', role: 'Secrets & Key Management', description: 'Dynamic cryptographic keys, automated certificate rotation, and token lease management.', order: 23, isActive: true }
];

export const INITIAL_CASE_STUDIES: CaseStudyItem[] = [
  {
    id: 1,
    slug: 'fintech-trading-platform-qa',
    title: 'Autonomous Quality Engineering for a Global FinTech Trading Platform',
    client: 'Tier-1 Financial Services Enterprise',
    industry: 'Financial Services & FinTech',
    description: 'Implemented a distributed test automation grid with Playwright and self-healing AI locator algorithms, reducing regression turnaround from 48 hours to 35 minutes.',
    challenge: 'The client faced weekly release delays due to manual regression testing across 4,000+ financial trading workflows and high flaky test failure rates.',
    solution: 'Drish architected an autonomous Playwright and Selenium test automation framework with self-healing DOM locators, parallel execution on Docker grids, and automated CI/CD gating.',
    results: 'Achieved 88% reduction in regression time and detected 99.6% of defects prior to production staging.',
    technologies: ['Playwright', 'Selenium', 'Apache JMeter', 'GitHub Actions', 'Docker', 'TypeScript'],
    metrics: [
      { label: 'Regression Time', metric: '88% Faster' },
      { label: 'Defect Detection', metric: '99.6%' },
      { label: 'CI/CD Builds/Day', metric: '140+' }
    ],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=75&w=800',
    isFeatured: true,
    isPublished: true,
    order: 1
  },
  {
    id: 2,
    slug: 'industrial-iot-kernel-driver',
    title: 'Ultra-Low Latency Kernel Driver & Industrial IoT Fleet Management',
    client: 'Smart Manufacturing Conglomerate',
    industry: 'Smart Manufacturing & Industry 4.0',
    description: 'Architected high-throughput Linux kernel device drivers and edge gateways handling 100,000+ telemetry packets per second from connected shop-floor machinery.',
    challenge: 'Proprietary shop-floor sensor equipment suffered from packet drops and high interrupt latency when communicating with legacy controllers.',
    solution: 'Engineered custom Linux kernel character drivers with zero-copy DMA buffers, real-time interrupt handlers, and an MQTT protocol bridge.',
    results: 'Achieved sub-millisecond hardware latency and enabled 24/7 predictive health monitoring across 100,000+ edge nodes.',
    technologies: ['Linux Kernel C', 'RTOS', 'MQTT', 'Edge AI', 'ARM Cortex', 'Modbus'],
    metrics: [
      { label: 'Interrupt Latency', metric: '<1ms' },
      { label: 'Active Edge Nodes', metric: '100,000+' },
      { label: 'Unplanned Downtime', metric: '-45%' }
    ],
    image: 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?auto=format&fit=crop&q=75&w=800',
    isFeatured: true,
    isPublished: true,
    order: 2
  },
  {
    id: 3,
    slug: 'healthcare-cloud-kubernetes-migration',
    title: 'Enterprise Multi-Region Cloud Migration & Kubernetes Scalability',
    client: 'Healthcare Life Sciences Network',
    industry: 'Healthcare & Life Sciences',
    description: 'Decomposed a monolithic legacy EHR infrastructure into multi-cloud Kubernetes clusters with zero downtime, ensuring HIPAA compliance and 99.999% uptime.',
    challenge: 'Legacy on-prem servers caused frequent downtime during peak clinical hours and failed strict HIPAA encryption audit requirements.',
    solution: 'Designed an automated Terraform infrastructure provisioning AWS EKS clusters with Istio service mesh, encrypted Aurora PostgreSQL, and automated GitOps with ArgoCD.',
    results: '100% zero-downtime cutover with 99.999% availability and 38% annual cloud infrastructure cost savings.',
    technologies: ['AWS EKS', 'Terraform', 'ArgoCD', 'PostgreSQL', 'Prometheus', 'Istio'],
    metrics: [
      { label: 'Availability SLA', metric: '99.999%' },
      { label: 'Cloud Cost Savings', metric: '38%' },
      { label: 'Downtime During Cutover', metric: '0 sec' }
    ],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=75&w=800',
    isFeatured: true,
    isPublished: true,
    order: 3
  }
];

export const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    slug: 'duraton-cement',
    clientName: 'Rajiv Rampal',
    companyName: 'Duraton Cement',
    role: 'Head of Digital Initiatives',
    region: 'India',
    quote: 'Drish developed, operated and managed the apps for our Loyalty mobile application (Duraton Soorme and Duraton Sathamb) and related infrastructure successfully for the past 3 years.',
    rating: 5,
    order: 1,
    isActive: true
  },
  {
    id: 2,
    slug: 'ison',
    clientName: 'Engineering Leadership',
    companyName: 'ISON',
    role: 'Director of Technology',
    region: 'India, Middle East & Africa',
    quote: 'Telecommunication Contact Center - Automated Report Generation. Drish engineered a high-throughput, dependable analytics and reporting pipeline across multiple carrier regions.',
    rating: 5,
    order: 2,
    isActive: true
  },
  {
    id: 3,
    slug: 'busibud',
    clientName: 'Maxim',
    companyName: 'Busibud',
    role: 'Founder & Product Lead',
    region: 'North America / Global',
    quote: 'Drish Infotech provided exceptional full-cycle engineering, modern scalable architecture, and responsive technical execution that allowed our platform to deploy features rapidly.',
    rating: 5,
    order: 3,
    isActive: true
  },
  {
    id: 4,
    slug: 'fitelo',
    clientName: 'Sahil',
    companyName: 'Fitelo',
    role: 'Co-Founder & CTO',
    region: 'India & International',
    quote: 'The engineering excellence, backend performance optimization, and quality assurance provided by Drish helped us scale our digital wellness and health application seamlessly to hundreds of thousands of users.',
    rating: 5,
    order: 4,
    isActive: true
  }
];

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  general_info: {
    companyName: 'Drish Infotech Limited',
    tagline: 'Engineering the Future Since 1999',
    email: 'info@drishinfo.com',
    phone: '+91 172 265 0000',
    address: 'SCO 134-136, Sector 34-A, Chandigarh, 160022, India',
    yearsOfExcellence: '25+',
    certifications: ['ISO 9001:2015', 'ISO 27001:2022', 'Microsoft Gold Partner', 'CMMI Appraised']
  },
  hero_section: {
    badge: 'ISO 9001:2015 & ISO 27001 CERTIFIED',
    title: 'Precision Software Engineering & Test Automation',
    highlightText: 'For Global Enterprises',
    description: 'From device drivers and autonomous AI to mission-critical QA automation and multi-cloud architectures. 25+ years of uncompromised technical craftsmanship.',
    primaryCtaText: 'Explore Solutions',
    primaryCtaLink: '/services',
    secondaryCtaText: 'Contact Engineers',
    secondaryCtaLink: '/contact'
  },
  stats_banner: {
    items: [
      { number: '25+', label: 'Years of Engineering', sublabel: 'Since 1999' },
      { number: '500+', label: 'Enterprise Projects', sublabel: 'Delivered Globally' },
      { number: '99.8%', label: 'Client Retention', sublabel: 'Long-term Partnerships' },
      { number: '15+', label: 'Countries Served', sublabel: 'Global Delivery Footprint' }
    ]
  }
};

export interface AdminUserRecord extends AdminUser {
  passwordHash?: string;
}

export const INITIAL_ADMIN_USERS: AdminUserRecord[] = [
  {
    id: 1,
    uid: 'admin-super-01',
    username: 'admin',
    email: 'admin@drishinfotech.com',
    displayName: 'Chief Administrator',
    photoUrl: null,
    role: 'super_admin',
    mustChangePassword: false,
    isActive: true,
    lastLogin: '2026-08-25T00:00:00.000Z',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-25T00:00:00.000Z',
    // Pre-hashed password for 'Drish@Admin2026!'
    passwordHash: '8b0068cb1a66ff51e60aa8ee97e2f5b6:6ecaa9db3d4dbe86822a1068c2d1b71aa5a3b9bbbaea2ea42845c47796443c6838fa1b49e49c71c4c1a938c642646271c6628c6aa8c5ad83d950a7c41460fa69',
  },
  {
    id: 2,
    uid: 'admin-ops-02',
    username: 'ops.lead',
    email: 'ops@drishinfotech.com',
    displayName: 'Engineering Operations Lead',
    photoUrl: null,
    role: 'admin',
    mustChangePassword: true, // Requires password change on first login
    isActive: true,
    lastLogin: null,
    createdAt: '2026-01-15T00:00:00.000Z',
    updatedAt: '2026-08-25T00:00:00.000Z',
    passwordHash: '8b0068cb1a66ff51e60aa8ee97e2f5b6:6ecaa9db3d4dbe86822a1068c2d1b71aa5a3b9bbbaea2ea42845c47796443c6838fa1b49e49c71c4c1a938c642646271c6628c6aa8c5ad83d950a7c41460fa69',
  },
];

// In-memory persistent arrays for fallback/local execution
export const store = {
  services: [...INITIAL_SERVICES],
  industries: [...INITIAL_INDUSTRIES],
  technologies: [...INITIAL_TECHNOLOGIES],
  caseStudies: [...INITIAL_CASE_STUDIES],
  testimonials: [...INITIAL_TESTIMONIALS],
  inquiries: [] as InquiryItem[],
  settings: { ...INITIAL_SITE_SETTINGS },
  users: [...INITIAL_ADMIN_USERS],
};
