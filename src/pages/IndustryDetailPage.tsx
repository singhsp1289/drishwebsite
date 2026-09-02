import { memo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Activity,
  DollarSign,
  Car,
  Factory,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Cpu,
  Server,
  Zap,
  Lock,
  Sparkles,
  Radio,
  Truck,
  ShoppingBag,
  Film
} from 'lucide-react';

interface IndustryData {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  overview: string;
  image: string;
  icon: React.ReactNode;
  solutions: {
    title: string;
    desc: string;
    icon: React.ReactNode;
    tags: string[];
  }[];
  complianceList: string[];
  outcomes: {
    stat: string;
    label: string;
  }[];
}

const industriesData: Record<string, IndustryData> = {
  'healthcare': {
    id: 'healthcare',
    name: 'Healthcare & Life Sciences',
    badge: 'High-Compliance Digital Health',
    tagline: 'Secure, Interoperable, and AI-Powered Healthcare Technology',
    overview: 'We develop compliant medical software, IoMT (Internet of Medical Things) connected device interfaces, automated clinical validation pipelines, and secure FHIR/HL7 interoperability solutions.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=75&w=1200',
    icon: <Activity className="w-8 h-8 text-[#0876B9]" />,
    solutions: [
      {
        title: 'IoMT & Medical Device Firmware',
        desc: 'ISO 13485 compliant embedded firmware and secure telemetry for patient monitoring sensors and medical equipment.',
        icon: <Cpu className="w-6 h-6 text-[#0876B9]" />,
        tags: ['ISO 13485', 'Bluetooth LE', 'Real-Time Vitals', 'Secure Telemetry']
      },
      {
        title: 'FHIR / HL7 Interoperability Platforms',
        desc: 'Robust API bridges connecting electronic health record (EHR) platforms with external diagnostic algorithms.',
        icon: <Server className="w-6 h-6 text-[#0876B9]" />,
        tags: ['FHIR API', 'HL7 v2/v3', 'SMART on FHIR', 'EHR Integration']
      },
      {
        title: 'AI Clinical Decision Support Systems',
        desc: 'Predictive diagnostic models and medical image processing pipelines validated with stringent algorithmic fairness.',
        icon: <Zap className="w-6 h-6 text-[#0876B9]" />,
        tags: ['Medical Imaging AI', 'NLP Medical Summaries', 'DICOM Processing']
      },
      {
        title: 'Automated Medical Software QA',
        desc: 'Rigorous 21 CFR Part 11 and FDA validation test suites ensuring complete traceability for digital health solutions.',
        icon: <CheckCircle2 className="w-6 h-6 text-[#0876B9]" />,
        tags: ['FDA Validation', '21 CFR Part 11', 'Automated Traceability', 'GAMP 5']
      }
    ],
    complianceList: ['HIPAA Compliant', 'HITECH Certified', 'FDA 21 CFR Part 11', 'ISO 13485 Standards', 'GDPR / Health Data'],
    outcomes: [
      { stat: '100%', label: 'HIPAA & FDA Compliance Readiness' },
      { stat: '99.99%', label: 'IoMT Telemetry Packet Delivery' },
      { stat: '3.5x', label: 'Faster Clinical Regulatory Validation' }
    ]
  },
  'fintech': {
    id: 'fintech',
    name: 'Fintech and Blockchain',
    badge: 'Ultra-Secure FinTech & Blockchain Architecture',
    tagline: 'High-Frequency, Resilient & Ultra-Low Latency Fintech and Blockchain Systems',
    overview: 'We build high-concurrency core transaction backends, decentralized smart contracts, algorithmic fraud detection models, Open Banking APIs, and automated compliance pipelines tailored for institutional finance and modern FinTechs.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=75&w=1200',
    icon: <DollarSign className="w-8 h-8 text-[#0876B9]" />,
    solutions: [
      {
        title: 'High-Throughput Payment Gateways',
        desc: 'Fault-tolerant payment orchestration, tokenization engines, and low-latency settlement pipelines handling millions of transactions.',
        icon: <Zap className="w-6 h-6 text-[#0876B9]" />,
        tags: ['PCI-DSS Level 1', 'Tokenization', 'ISO 20022', 'Microservices']
      },
      {
        title: 'AI Fraud Detection & AML Monitoring',
        desc: 'Real-time transaction anomaly detection models using graph neural networks to intercept fraudulent patterns in sub-100ms.',
        icon: <ShieldCheck className="w-6 h-6 text-[#0876B9]" />,
        tags: ['Anomaly Detection', 'Graph ML', 'AML Screening', 'Real-Time Scoring']
      },
      {
        title: 'Smart Contracts & Blockchain Protocols',
        desc: 'Audited smart contracts, DeFi settlement rails, and cryptographic verification pipelines with zero-trust validation.',
        icon: <Lock className="w-6 h-6 text-[#0876B9]" />,
        tags: ['Smart Contracts', 'Web3 / DeFi', 'Zero Trust IAM', 'API Gateway']
      },
      {
        title: 'Automated Performance & Security QA',
        desc: 'Continuous distributed stress testing simulating peak market transaction loads and automated penetration testing.',
        icon: <CheckCircle2 className="w-6 h-6 text-[#0876B9]" />,
        tags: ['k6 Load Testing', 'JMeter Distributed', 'OWASP FinTech', 'Chaos Engineering']
      }
    ],
    complianceList: ['PCI-DSS Level 1', 'SOC 2 Type II', 'PSD2 / Open Banking', 'GLBA Compliance', 'ISO 27001'],
    outcomes: [
      { stat: '<15ms', label: 'Transaction Routing Latency' },
      { stat: 'Zero', label: 'Data Breach Incidents' },
      { stat: '99.999%', label: 'Core Settlement Availability' }
    ]
  },
  'automotive': {
    id: 'automotive',
    name: 'Automotive & Connected Mobility',
    badge: 'Automotive Embedded & Telematics',
    tagline: 'Deterministic Firmware, CAN Bus Telemetry & Fleet Intelligence',
    overview: 'Engineering next-generation mobility systems: automotive device drivers, CAN/LIN bus protocol stacks, connected vehicle telematics gateways, and real-time fleet analytics platforms.',
    image: 'https://images.unsplash.com/photo-1518987048-93e29699e79a?auto=format&fit=crop&q=75&w=1200',
    icon: <Car className="w-8 h-8 text-[#E2725B]" />,
    solutions: [
      {
        title: 'Automotive ECU Firmware & Drivers',
        desc: 'Deterministic embedded software adhering to AUTOSAR and MISRA-C guidelines for electronic control units and sensors.',
        icon: <Cpu className="w-6 h-6 text-[#E2725B]" />,
        tags: ['AUTOSAR', 'CAN / LIN Bus', 'MISRA-C:2012', 'ISO 26262 ASIL']
      },
      {
        title: 'Connected Vehicle Telematics Gateways',
        desc: 'Edge computing gateways aggregating GPS, OBD-II telemetry, battery thermal metrics, and streaming over cellular MQTT.',
        icon: <Server className="w-6 h-6 text-[#E2725B]" />,
        tags: ['OBD-II / J1939', 'Cellular MQTT', 'Edge Compute', 'Geo-Fencing']
      },
      {
        title: 'Secure FOTA Fleet Updates',
        desc: 'End-to-end encrypted firmware update delivery with hardware cryptographic verification and automated rollbacks.',
        icon: <Lock className="w-6 h-6 text-[#E2725B]" />,
        tags: ['Secure Boot', 'Cryptographic FOTA', 'HSM Keys', 'Uptane Standard']
      },
      {
        title: 'Hardware-in-the-Loop (HIL) QA',
        desc: 'Automated test rigs simulating vehicle dynamics, extreme temperatures, and network packet dropouts for driver validation.',
        icon: <CheckCircle2 className="w-6 h-6 text-[#E2725B]" />,
        tags: ['HIL Automation', 'Stress Rigs', 'CANalyzer', 'ISO 26262 Testing']
      }
    ],
    complianceList: ['ISO 26262 Functional Safety', 'MISRA C/C++', 'AUTOSAR Standard', 'ASPICE Process', 'UN ECE R155 Cyber'],
    outcomes: [
      { stat: '100k+', label: 'Connected Fleet Vehicles' },
      { stat: '100%', label: 'MISRA-C Rule Compliance' },
      { stat: 'Zero', label: 'Bricked ECU Update Incidents' }
    ]
  },
  'manufacturing': {
    id: 'manufacturing',
    name: 'Smart Manufacturing & Industry 4.0',
    badge: 'Industrial Automation & IIoT',
    tagline: 'Edge Intelligence, SCADA Integration & Predictive Quality',
    overview: 'Modernizing shop floors with Industrial Internet of Things (IIoT), automated computer vision quality inspection, PLC/SCADA telemetry bridges, and machine predictive maintenance algorithms.',
    image: 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?auto=format&fit=crop&q=75&w=1200',
    icon: <Factory className="w-8 h-8 text-[#0876B9]" />,
    solutions: [
      {
        title: 'Industrial IoT Sensor Networks',
        desc: 'Robust sensor networks measuring vibration, temperature, and acoustics across heavy machinery running Modbus and OPC-UA.',
        icon: <Cpu className="w-6 h-6 text-[#0876B9]" />,
        tags: ['OPC-UA', 'Modbus TCP', 'MQTT Sparkplug', 'Industrial Gateways']
      },
      {
        title: 'Computer Vision Quality Inspection',
        desc: 'Edge AI inference cameras analyzing assembly lines in real-time, catching micro-surface defects with sub-millimeter precision.',
        icon: <Zap className="w-6 h-6 text-[#0876B9]" />,
        tags: ['Edge Vision AI', 'Defect Classification', 'YOLO/TensorRT', 'High-Speed Inspection']
      },
      {
        title: 'Predictive Maintenance & OEE Analytics',
        desc: 'Time-series forecasting models predicting component mechanical failure weeks before physical breakdown occurs.',
        icon: <Server className="w-6 h-6 text-[#0876B9]" />,
        tags: ['Predictive ML', 'OEE Dashboards', 'Anomaly Alerts', 'Digital Twins']
      },
      {
        title: 'Industrial Automation Software QA',
        desc: 'End-to-end automated verification of manufacturing execution systems (MES) and SCADA operator interfaces.',
        icon: <CheckCircle2 className="w-6 h-6 text-[#0876B9]" />,
        tags: ['SCADA Verification', 'MES API Testing', 'PLC Regression Automation']
      }
    ],
    complianceList: ['ISA-95 Standard', 'IEC 62443 Cyber Security', 'ISO 9001 Quality', 'Industry 4.0 Framework', 'RoHS Compliance'],
    outcomes: [
      { stat: '42%', label: 'Reduction in Unplanned Downtime' },
      { stat: '99.8%', label: 'Defect Detection Accuracy' },
      { stat: '<50ms', label: 'Shop-Floor Sensor Refresh Rate' }
    ]
  },
  'telecom': {
    id: 'telecom',
    name: 'Telecommunications & 5G Edge',
    badge: 'High-Throughput Network Systems',
    tagline: 'Carrier-Grade Virtualization, Low-Latency 5G & Protocol Stacks',
    overview: 'We architect carrier-grade network function virtualization, 5G edge computing nodes, high-throughput packet routing engines, and automated network regression testing suites.',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=75&w=1200',
    icon: <Radio className="w-8 h-8 text-[#0876B9]" />,
    solutions: [
      {
        title: '5G Edge Compute & Micro-Datacenters',
        desc: 'Ultra-low latency edge computing orchestration for multi-access edge computing (MEC) networks.',
        icon: <Cpu className="w-6 h-6 text-[#0876B9]" />,
        tags: ['5G MEC', 'eBPF', 'Docker / K8s Edge', 'Low Latency']
      },
      {
        title: 'Network Virtualization & SDN Controllers',
        desc: 'Carrier-grade protocol stacks and software-defined network controllers handling multi-gigabit throughput.',
        icon: <Server className="w-6 h-6 text-[#0876B9]" />,
        tags: ['SDN', 'NFV', 'DPDK', 'OpenFlow']
      },
      {
        title: 'AI Network Traffic Anomaly Detection',
        desc: 'Autonomous AI anomaly detection isolating DDoS attacks and packet degradation in real-time.',
        icon: <Zap className="w-6 h-6 text-[#0876B9]" />,
        tags: ['Traffic AI', 'DDoS Mitigation', 'Kafka Streaming', 'Real-Time Telemetry']
      },
      {
        title: 'Carrier-Grade Network Protocol QA',
        desc: 'Automated regression testing simulating millions of concurrent subscriber sessions.',
        icon: <CheckCircle2 className="w-6 h-6 text-[#0876B9]" />,
        tags: ['Packet Generation', 'Load Profiling', 'RFC Compliance', 'Spirent / Ixia']
      }
    ],
    complianceList: ['3GPP Release Standards', 'ITU-T Recommendations', 'ETSI NFV Framework', 'Carrier-Grade 99.999%', 'ISO 27001'],
    outcomes: [
      { stat: '99.999%', label: 'Carrier System Uptime' },
      { stat: '<5ms', label: 'Edge Packet Transit Latency' },
      { stat: '10M+', label: 'Concurrent Subscriber Streams' }
    ]
  },
  'energy': {
    id: 'energy',
    name: 'Energy, Utilities & Smart Grid',
    badge: 'Critical Infrastructure & IoT',
    tagline: 'SCADA Telemetry, Smart Grid Intelligence & NERC CIP Security',
    overview: 'Engineering cyber-hardened substations, distributed energy resource management (DERM), smart metering data ingestion pipelines, and predictive power grid load forecasting.',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=75&w=1200',
    icon: <Zap className="w-8 h-8 text-[#D97706]" />,
    solutions: [
      {
        title: 'Smart Grid Telemetry & Ingestion',
        desc: 'High-speed ingestion pipelines collecting time-series power quality metrics across millions of smart meters.',
        icon: <Server className="w-6 h-6 text-[#D97706]" />,
        tags: ['DNP3 / IEC 61850', 'TimescaleDB', 'Smart Metering', 'Kafka']
      },
      {
        title: 'SCADA & Substation Cyber Hardening',
        desc: 'Air-gapped security architectures, zero-trust device attestation, and continuous intrusion prevention.',
        icon: <Lock className="w-6 h-6 text-[#D97706]" />,
        tags: ['NERC CIP', 'IEC 62443', 'Air Gap', 'Mutual TLS']
      },
      {
        title: 'AI Grid Load Forecasting & DERM',
        desc: 'Machine learning models balancing solar and wind renewable intermittent supply against dynamic grid demand.',
        icon: <Zap className="w-6 h-6 text-[#D97706]" />,
        tags: ['Load Forecasting', 'DERM', 'Renewable Balancing', 'Predictive Grid']
      },
      {
        title: 'Critical Infrastructure QA & Simulation',
        desc: 'Digital twin simulation validating substation failover routines during extreme grid distress.',
        icon: <CheckCircle2 className="w-6 h-6 text-[#D97706]" />,
        tags: ['Hardware Simulation', 'Failover Testing', 'Grid Twin', 'NERC Validation']
      }
    ],
    complianceList: ['NERC CIP Standards', 'IEC 61850 Substation Protocol', 'IEC 62443 Industrial Security', 'ISO 27001', 'IEEE 1547 Grid Standard'],
    outcomes: [
      { stat: '99.99%', label: 'Grid Telemetry Reliability' },
      { stat: '38%', label: 'Reduction in Renewable Imbalance' },
      { stat: 'Zero', label: 'Cyber Infrastructure Breaches' }
    ]
  },
  'logistics': {
    id: 'logistics',
    name: 'Supply Chain, Logistics & Fleet',
    badge: 'Fleet Telemetry & Route AI',
    overview: 'Engineering autonomous route optimization AI, cold-chain IoT temperature tracking, warehouse automation controllers, and multi-modal freight visibility platforms.',
    tagline: 'Real-Time Supply Chain Visibility, Cold-Chain IoT & Route Optimization',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=75&w=1200',
    icon: <Truck className="w-8 h-8 text-[#2A8C74]" />,
    solutions: [
      {
        title: 'AI Route & Load Optimization',
        desc: 'Dynamic vehicle routing algorithms optimizing multi-stop deliveries considering traffic, fuel, and load limits.',
        icon: <Zap className="w-6 h-6 text-[#2A8C74]" />,
        tags: ['Dynamic Routing', 'Load Optimization', 'Fuel Efficiency', 'Dispatch AI']
      },
      {
        title: 'Cold-Chain IoT Sensor Networks',
        desc: 'Continuous real-time temperature and humidity logging with automated compliance alerting for perishable goods.',
        icon: <Cpu className="w-6 h-6 text-[#2A8C74]" />,
        tags: ['Cold Chain IoT', 'Cellular Beacon', 'Temperature Audit', 'FDA Traceability']
      },
      {
        title: 'Warehouse Robotics & Automation',
        desc: 'Integration middleware bridging automated guided vehicles (AGVs) with warehouse management systems.',
        icon: <Server className="w-6 h-6 text-[#2A8C74]" />,
        tags: ['WMS Integration', 'AGV Middleware', 'Barcode / RFID', 'MQTT']
      },
      {
        title: 'Supply Chain Automated QA',
        desc: 'End-to-end electronic data interchange (EDI) message validation and load testing for global freight operations.',
        icon: <CheckCircle2 className="w-6 h-6 text-[#2A8C74]" />,
        tags: ['EDI 850 / 856 / 214', 'API Stress Testing', 'Traceability Verification']
      }
    ],
    complianceList: ['ISO 28000 Supply Chain', 'TAPA Security Standards', 'FDA FSMA Rule 204', 'GDP Pharma Logistics', 'GS1 Standards'],
    outcomes: [
      { stat: '24%', label: 'Fuel & Transit Time Savings' },
      { stat: '100%', label: 'Cold-Chain Traceability Compliance' },
      { stat: '99.9%', label: 'Warehouse Ingestion Accuracy' }
    ]
  },
  'aerospace': {
    id: 'aerospace',
    name: 'Aerospace & High-Reliability Systems',
    badge: 'Mission-Critical Engineering',
    tagline: 'DO-178C Avionics Software, Air-Gapped Security & Ruggedized Firmware',
    overview: 'We provide DO-178C compliant avionics software engineering, hardened air-gapped system designs, cryptographic hardware security, and ruggedized controller drivers for high-reliability environments.',
    image: 'https://images.unsplash.com/photo-1517976487588-46904fb36b53?auto=format&fit=crop&q=75&w=1200',
    icon: <ShieldCheck className="w-8 h-8 text-[#0876B9]" />,
    solutions: [
      {
        title: 'DO-178C Level A-D Software Engineering',
        desc: 'Deterministic real-time software development with strict bi-directional requirements-to-code traceability.',
        icon: <Cpu className="w-6 h-6 text-[#0876B9]" />,
        tags: ['DO-178C Level A', 'ARINC 429 / 653', 'RTOS', 'MC/DC Coverage']
      },
      {
        title: 'Air-Gapped & Ruggedized Systems',
        desc: 'Hardware security modules, secure bootloaders, and physical side-channel attack resistant architectures.',
        icon: <Lock className="w-6 h-6 text-[#0876B9]" />,
        tags: ['Air-Gapped IAM', 'Secure Boot', 'Tamper Resistance', 'Crypto Hardware']
      },
      {
        title: 'Telemetry & Flight Data Processing',
        desc: 'High-frequency telemetry ingestion engines handling real-time vibration, avionics, and navigation sensors.',
        icon: <Server className="w-6 h-6 text-[#0876B9]" />,
        tags: ['MIL-STD-1553', 'Telemetry Ingestion', 'Sensor Processing', 'Real-Time OS']
      },
      {
        title: 'Hardware-in-the-Loop Avionics QA',
        desc: 'Automated flight envelope test rigs validating avionics fault tolerance and redundant failover switching.',
        icon: <CheckCircle2 className="w-6 h-6 text-[#0876B9]" />,
        tags: ['HIL Avionics Test', 'Fault Injection', 'MC/DC Analysis', 'Redundancy QA']
      }
    ],
    complianceList: ['DO-178C / DO-254 Standards', 'AS9100 Aerospace Quality', 'MIL-STD-810 Environmental', 'NIST SP 800-171', 'ARINC 653'],
    outcomes: [
      { stat: '100%', label: 'DO-178C MC/DC Code Coverage' },
      { stat: 'Zero', label: 'Critical Flight Logic Defects' },
      { stat: 'Sub-ms', label: 'Deterministic Failover Latency' }
    ]
  },
  'retail': {
    id: 'retail',
    name: 'Retail & Digital Commerce',
    badge: 'Omnichannel & High-Concurreny Commerce',
    tagline: 'High-Throughput Checkout Engines, AI Personalization & Edge Inventory',
    overview: 'We build headless commerce backends, real-time inventory synchronization across thousands of physical stores, AI-driven dynamic pricing, and automated POS device integrations.',
    image: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=75&w=1200',
    icon: <ShoppingBag className="w-8 h-8 text-[#E2725B]" />,
    solutions: [
      {
        title: 'Headless Commerce & Microservices',
        desc: 'High-scale API-first commerce backends handling flash-sale traffic surges with sub-second page transitions.',
        icon: <Server className="w-6 h-6 text-[#E2725B]" />,
        tags: ['MACH Architecture', 'GraphQL', 'Stripe / Adyen', 'Redis Cache']
      },
      {
        title: 'AI Recommendation & Personalization',
        desc: 'Real-time contextual recommendation engines lifting cart conversion and customer lifetime value.',
        icon: <Zap className="w-6 h-6 text-[#E2725B]" />,
        tags: ['Vector Search', 'Contextual Re-ranking', 'Dynamic Pricing', 'A/B Testing']
      },
      {
        title: 'Omnichannel POS & Edge Hardware',
        desc: 'Custom firmware and secure serial/USB peripheral drivers for retail point-of-sale terminals and barcode scanners.',
        icon: <Cpu className="w-6 h-6 text-[#E2725B]" />,
        tags: ['POS Drivers', 'EMV Payments', 'Offline-First Sync', 'Barcode Scanners']
      },
      {
        title: 'High-Load Commerce Performance QA',
        desc: 'Automated peak-season simulation testing checkout pipelines under 100k+ simultaneous shoppers.',
        icon: <CheckCircle2 className="w-6 h-6 text-[#E2725B]" />,
        tags: ['Peak Season Stress', 'Payment Flow Automation', 'Cart Resilience']
      }
    ],
    complianceList: ['PCI-DSS Level 1', 'SOC 2 Type II', 'GDPR / CCPA', 'ADA / WCAG 2.1 AA'],
    outcomes: [
      { stat: '48%', label: 'Faster Checkout Speed' },
      { stat: '99.999%', label: 'Black Friday Core Uptime' },
      { stat: '3.2x', label: 'Mobile Conversion Lift' }
    ]
  },
  'media': {
    id: 'media',
    name: 'Media, Streaming & Entertainment',
    badge: 'Ultra-Low Latency Streaming & Content Tech',
    tagline: 'High-Bitrate Video Pipelines, DRM Security & Real-Time Content AI',
    overview: 'Engineering carrier-grade video ingestion pipelines, ultra-low latency live streaming (HLS/DASH/WebRTC), digital rights management (DRM), and AI automated metadata tagging for global media conglomerates.',
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&q=75&w=1200',
    icon: <Film className="w-8 h-8 text-[#0876B9]" />,
    solutions: [
      {
        title: 'Low-Latency Video Ingestion & Transcoding',
        desc: 'Distributed cloud video encoding pipelines optimized for 4K/8K HDR streaming across multi-CDN architectures.',
        icon: <Server className="w-6 h-6 text-[#0876B9]" />,
        tags: ['HLS / DASH', 'WebRTC Live', 'Multi-CDN Routing', 'FFmpeg Acceleration']
      },
      {
        title: 'DRM & Cryptographic Content Security',
        desc: 'End-to-end Widevine, FairPlay, and PlayReady multi-DRM license management with hardware key attestation.',
        icon: <Lock className="w-6 h-6 text-[#0876B9]" />,
        tags: ['Widevine Modular', 'Apple FairPlay', 'PlayReady', 'Watermarking']
      },
      {
        title: 'AI Metadata & Semantic Search',
        desc: 'Multimodal computer vision and speech AI extracting scene chapters, automated closed captions, and face recognition.',
        icon: <Zap className="w-6 h-6 text-[#0876B9]" />,
        tags: ['Multimodal AI', 'Speech-to-Text', 'Automated Tagging', 'Vector Search']
      },
      {
        title: 'Streaming Player & Device QA',
        desc: 'Automated video playback verification across Smart TVs, OTT devices (Roku, AppleTV, FireTV), and mobile players.',
        icon: <CheckCircle2 className="w-6 h-6 text-[#0876B9]" />,
        tags: ['OTT Automation', 'Bitrate Adaptation Test', 'QoE Metrics', 'Playback Stress']
      }
    ],
    complianceList: ['SMPTE Standards', 'MPA Content Security', 'ISO 27001', 'FCC Captioning Rules', 'EBU R128 Audio'],
    outcomes: [
      { stat: '<1.2s', label: 'Global Video Startup Time' },
      { stat: '99.999%', label: 'Streaming Availability' },
      { stat: 'Zero', label: 'DRM Licensing Leakage' }
    ]
  },
  'real-estate': {
    id: 'real-estate',
    name: 'Real Estate',
    badge: 'Intelligent PropTech & Building Ecosystems',
    tagline: 'Smart Technology for Modern Property Ecosystems',
    overview: 'We build intelligent digital platforms that simplify property discovery, smart building IoT telemetry, lease contract lifecycle automation, and connected tenant experiences.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=75&w=1200',
    icon: <Server className="w-8 h-8 text-[#EA580C]" />,
    solutions: [
      {
        title: 'Smart Building IoT & Digital Twins',
        desc: 'Real-time telemetry networks aggregating HVAC, energy, occupancy, and access control data into unified digital twin models.',
        icon: <Zap className="w-6 h-6 text-[#EA580C]" />,
        tags: ['BACnet / Modbus', 'Digital Twins', 'Energy AI', 'Sensor Mesh']
      },
      {
        title: 'Lease Contract & Escrow Automation',
        desc: 'Automated contract generation, e-signature validation, and programmatic escrow workflows built with rigorous compliance.',
        icon: <Lock className="w-6 h-6 text-[#EA580C]" />,
        tags: ['Automated Escrow', 'E-Signature API', 'Tenant Portals', 'KYC/AML']
      },
      {
        title: 'PropTech Discovery & Virtual Tours',
        desc: 'High-performance interactive 3D spatial tours, dynamic floorplan rendering, and AI-driven valuation algorithms.',
        icon: <Sparkles className="w-6 h-6 text-[#EA580C]" />,
        tags: ['3D Spatial WebGL', 'Automated Valuation Model', 'MLS Integration']
      },
      {
        title: 'Property Operations Software QA',
        desc: 'Comprehensive automated test suites covering multi-tenant data isolation, billing calculations, and mobile portal access.',
        icon: <CheckCircle2 className="w-6 h-6 text-[#EA580C]" />,
        tags: ['Multi-Tenant QA', 'Billing Precision', 'SOC 2 Validation']
      }
    ],
    complianceList: ['SOC 2 Type II', 'ISO 27001', 'ADA Accessibility', 'GDPR Data Privacy', 'Fair Housing Standards'],
    outcomes: [
      { stat: '65%', label: 'Faster Tenant Onboarding' },
      { stat: '28%', label: 'Building Energy Reduction' },
      { stat: '99.99%', label: 'Billing Engine Accuracy' }
    ]
  },
  'tele-medicine': {
    id: 'tele-medicine',
    name: 'Tele Medicine & Remote Care',
    badge: 'Connected Healthcare & Remote Clinical Care',
    tagline: 'Connected Healthcare Platforms Engineered for Patient Trust',
    overview: 'Secure digital experiences connecting patients, healthcare providers, and intelligent care platforms with low-latency WebRTC clinical consultations and encrypted health data.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=75&w=1200',
    icon: <Activity className="w-8 h-8 text-[#059669]" />,
    solutions: [
      {
        title: 'Encrypted Clinical Video & WebRTC',
        desc: 'HIPAA-compliant high-definition video consultations with end-to-end encryption and dynamic bandwidth compensation.',
        icon: <Zap className="w-6 h-6 text-[#059669]" />,
        tags: ['WebRTC E2EE', 'Low Latency', 'Multi-Party Clinical', 'Dynamic Bitrate']
      },
      {
        title: 'IoMT Patient Telemetry Bridges',
        desc: 'Bluetooth LE and cellular telemetry ingestion for pulse oximeters, blood glucose monitors, and wearable ECG devices.',
        icon: <Cpu className="w-6 h-6 text-[#059669]" />,
        tags: ['Bluetooth LE', 'Real-Time Vitals', 'FHIR Observation', 'Anomaly Alerts']
      },
      {
        title: 'EHR & Prescription System Integration',
        desc: 'Direct bi-directional EHR integration via SMART on FHIR, HL7 v2/v3, and automated e-prescribing (eRx) gateways.',
        icon: <Server className="w-6 h-6 text-[#059669]" />,
        tags: ['SMART on FHIR', 'e-Prescriptions', 'HL7 Integration', 'Epic / Cerner']
      },
      {
        title: 'Medical Compliance & Security QA',
        desc: 'Rigorous automated HIPAA privacy verification, penetration testing, and medical data integrity verification.',
        icon: <CheckCircle2 className="w-6 h-6 text-[#059669]" />,
        tags: ['HIPAA Audit', 'FDA 21 CFR Part 11', 'Penetration Testing']
      }
    ],
    complianceList: ['HIPAA Certified', 'HITECH Compliant', 'FDA 21 CFR Part 11', 'ISO 27799', 'GDPR Health Data'],
    outcomes: [
      { stat: '<50ms', label: 'Telemetry Ingestion Latency' },
      { stat: '100%', label: 'HIPAA Compliance Assurance' },
      { stat: '4.8/5', label: 'Clinician Experience Rating' }
    ]
  },
  'tourism': {
    id: 'tourism',
    name: 'Tourism & Travel Tech',
    badge: 'Intelligent Travel & Destination Experiences',
    tagline: 'Intelligent Travel Experiences Connecting Global Destinations',
    overview: 'Digital experiences that connect travelers, destinations, bookings, and intelligent travel services with high-concurrency reservation engines and dynamic itinerary intelligence.',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=75&w=1200',
    icon: <Sparkles className="w-8 h-8 text-[#D97706]" />,
    solutions: [
      {
        title: 'Omnichannel Booking & Inventory Engines',
        desc: 'High-availability GDS, NDC flight, hotel CRS, and car rental API integrations with real-time room availability sync.',
        icon: <Server className="w-6 h-6 text-[#D97706]" />,
        tags: ['NDC Protocols', 'GDS Integration', 'Real-Time Inventory', 'Payment Routing']
      },
      {
        title: 'AI Itinerary & Recommendation Engine',
        desc: 'Machine learning algorithms creating personalized multi-destination itineraries based on preferences and transit telemetry.',
        icon: <Zap className="w-6 h-6 text-[#D97706]" />,
        tags: ['Personalized AI', 'Graph Routing', 'Weather Telemetry', 'Transit Sync']
      },
      {
        title: 'Mobile Companion & Contactless Check-In',
        desc: 'Digital key access, geofenced attraction guides, and frictionless mobile check-in for modern hospitality ecosystems.',
        icon: <Cpu className="w-6 h-6 text-[#D97706]" />,
        tags: ['NFC Digital Key', 'Geofencing', 'Offline Mobile PWA', 'Multi-Language']
      },
      {
        title: 'High-Traffic Booking Stress Testing',
        desc: 'Simulated holiday booking surges ensuring sub-second checkout speeds and zero double-booking concurrency bugs.',
        icon: <CheckCircle2 className="w-6 h-6 text-[#D97706]" />,
        tags: ['High Concurrency', 'Distributed Load Test', 'PCI-DSS Compliance']
      }
    ],
    complianceList: ['PCI-DSS Level 1', 'IATA NDC Certified', 'GDPR Compliant', 'ISO 27001', 'ADA Accessibility'],
    outcomes: [
      { stat: '4.2x', label: 'Booking Engine Concurrency' },
      { stat: '<800ms', label: 'Dynamic Search Response' },
      { stat: '34%', label: 'Mobile Conversion Uplift' }
    ]
  },
  'government': {
    id: 'government',
    name: 'Government & Public Sector',
    badge: 'Secure, Sovereign Civic Infrastructure',
    tagline: 'Secure, High-Integrity Digital Platforms for Public Infrastructure',
    overview: 'Secure, scalable digital platforms designed to modernize public services, sovereign cloud architectures, and citizen experiences with zero-trust security and high accessibility standards.',
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=75&w=1200',
    icon: <ShieldCheck className="w-8 h-8 text-[#0F766E]" />,
    solutions: [
      {
        title: 'Citizen Identity & Sovereign Access IAM',
        desc: 'Cryptographically verified citizen authentication, digital signature bridges, and multi-agency federated identity mesh.',
        icon: <Lock className="w-6 h-6 text-[#0F766E]" />,
        tags: ['Zero Trust IAM', 'Sovereign Cloud', 'Digital Signatures', 'eIDAS Compliant']
      },
      {
        title: 'Public Services Delivery Portals',
        desc: 'WCAG 2.1 AAA accessible citizen portals for licensing, taxation, permitting, and benefits distribution.',
        icon: <Server className="w-6 h-6 text-[#0F766E]" />,
        tags: ['WCAG AAA', 'Permitting Workflows', 'Multi-Language', 'High Availability']
      },
      {
        title: 'Inter-Agency Data Mesh & Analytics',
        desc: 'Air-gapped secure data exchange hubs enabling cross-departmental intelligence while guaranteeing strict privacy boundaries.',
        icon: <Zap className="w-6 h-6 text-[#0F766E]" />,
        tags: ['Data Mesh', 'Air-Gapped Sync', 'Differential Privacy', 'Audit Ledger']
      },
      {
        title: 'Government Security & Penetration Testing',
        desc: 'Rigorous government-grade automated vulnerability scanning, compliance auditing, and disaster recovery simulation.',
        icon: <CheckCircle2 className="w-6 h-6 text-[#0F766E]" />,
        tags: ['FedRAMP Standards', 'SOC 2 Type II', 'Disaster Recovery QA']
      }
    ],
    complianceList: ['FedRAMP Ready', 'NIST SP 800-53', 'WCAG 2.1 AAA', 'ISO 27001', 'FIPS 140-3 Encryption'],
    outcomes: [
      { stat: '100%', label: 'WCAG 2.1 AAA Accessibility' },
      { stat: 'Zero', label: 'Data Sovereignty Breaches' },
      { stat: '70%', label: 'Reduction in Permit Processing Times' }
    ]
  },
  'ngo-donations': {
    id: 'ngo-donations',
    name: 'NGO & Donations',
    badge: 'Transparent Non-Profit & Philanthropy Tech',
    tagline: 'Transparent Technology Empowering Social-Impact Missions',
    overview: 'Technology that enables transparent giving, donor engagement, transparent financial disbursement ledgers, and efficient social-impact operations.',
    image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=75&w=1200',
    icon: <Sparkles className="w-8 h-8 text-[#16A34A]" />,
    solutions: [
      {
        title: 'Transparent Micro-Donation & Fund Routing',
        desc: 'Low-fee recurring donation processing, automated tax receipt generation, and real-time project fund allocation tracking.',
        icon: <Zap className="w-6 h-6 text-[#16A34A]" />,
        tags: ['Recurring Giving', 'Tax Receipt APIs', 'Transparent Ledger', 'Global Currencies']
      },
      {
        title: 'Donor Engagement & Campaign Analytics',
        desc: 'Personalized donor journey tracking, automated milestone storytelling, and volunteer coordinator management portals.',
        icon: <Server className="w-6 h-6 text-[#16A34A]" />,
        tags: ['Donor CRM', 'Impact Metrics', 'Campaign Analytics', 'Volunteer Hub']
      },
      {
        title: 'Field Telemetry & Aid Tracking',
        desc: 'Offline-first mobile applications for field aid workers tracking supply deliveries, medical relief, and community surveys.',
        icon: <Cpu className="w-6 h-6 text-[#16A34A]" />,
        tags: ['Offline-First PWA', 'GPS Relief Sync', 'Biometric Verification']
      },
      {
        title: 'Philanthropic Security & Compliance QA',
        desc: 'Continuous PCI-DSS compliance audits, anti-fraud micro-transaction monitoring, and donor data privacy verification.',
        icon: <CheckCircle2 className="w-6 h-6 text-[#16A34A]" />,
        tags: ['PCI-DSS Level 1', 'Anti-Fraud ML', 'GDPR Privacy']
      }
    ],
    complianceList: ['PCI-DSS Level 1', 'ISO 27001', 'GDPR Privacy', 'Charity Navigator Standards', '501(c)(3) Audited'],
    outcomes: [
      { stat: '99.98%', label: 'Donation Processing Reliability' },
      { stat: '42%', label: 'Increase in Donor Retention' },
      { stat: '100%', label: 'Transparent Fund Traceability' }
    ]
  },
  'education': {
    id: 'education',
    name: 'Education',
    badge: 'Connected Learning & Intelligent Platforms',
    tagline: 'Connected Digital Ecosystems Transforming Modern Learning',
    overview: 'Digital platforms that make learning, collaboration, and educational experiences more connected and accessible with adaptive learning algorithms and seamless LMS integrations.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=75&w=1200',
    icon: <Server className="w-8 h-8 text-[#EA580C]" />,
    solutions: [
      {
        title: 'Adaptive Learning AI & Knowledge Graphs',
        desc: 'Personalized curriculum pathways dynamically adjusting question difficulty and concept pacing based on student mastery.',
        icon: <Zap className="w-6 h-6 text-[#EA580C]" />,
        tags: ['Adaptive AI', 'Knowledge Graphs', 'Student Mastery', 'Real-Time Hints']
      },
      {
        title: 'LTI, SCORM & LMS Interoperability',
        desc: 'Turnkey standard integrations connecting with Canvas, Blackboard, Moodle, and Google Classroom via LTI 1.3 Advantage.',
        icon: <Server className="w-6 h-6 text-[#EA580C]" />,
        tags: ['LTI 1.3 Advantage', 'SCORM 2004', 'OneRoster APIs', 'Grade Sync']
      },
      {
        title: 'Collaborative Virtual Classrooms',
        desc: 'Low-latency interactive whiteboards, break-out audio rooms, real-time code sandboxes, and proctoring security.',
        icon: <Sparkles className="w-6 h-6 text-[#EA580C]" />,
        tags: ['Interactive Canvas', 'Live WebRTC', 'Code Sandbox', 'Proctoring AI']
      },
      {
        title: 'Accessibility & Scalability QA',
        desc: 'Automated screen-reader accessibility auditing (WCAG 2.1 AA) and concurrent exam stress load testing.',
        icon: <CheckCircle2 className="w-6 h-6 text-[#EA580C]" />,
        tags: ['WCAG 2.1 AA', 'FERPA / COPPA Audit', 'Exam Concurrency QA']
      }
    ],
    complianceList: ['FERPA Compliant', 'COPPA Certified', 'WCAG 2.1 AA', 'IMS Global LTI 1.3', 'ISO 27001'],
    outcomes: [
      { stat: '100%', label: 'FERPA & COPPA Compliance' },
      { stat: '3.4x', label: 'Faster Student Concept Mastery' },
      { stat: '50K+', label: 'Concurrent Exam Takers Supported' }
    ]
  },
  'embedded': {
    id: 'embedded',
    name: 'Embedded & Intelligent Systems',
    badge: 'Hardware-Level Firmware & Edge Microchips',
    tagline: 'Firmware and Hardware-Level Integration for Intelligent Devices',
    overview: 'Embedded engineering and intelligent systems connecting software, hardware, devices, and real-world applications with deterministic real-time operating systems (RTOS) and custom peripheral drivers.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=75&w=1200',
    icon: <Cpu className="w-8 h-8 text-[#D97706]" />,
    solutions: [
      {
        title: 'Custom Device Drivers & Board Support Packages',
        desc: 'Bare-metal and RTOS firmware engineering for ARM Cortex-M/A, RISC-V, and custom ASIC silicon microcontrollers.',
        icon: <Cpu className="w-6 h-6 text-[#D97706]" />,
        tags: ['FreeRTOS / Zephyr', 'ARM Cortex', 'RISC-V', 'SPI / I2C / UART']
      },
      {
        title: 'Cryptographic FOTA Firmware Pipelines',
        desc: 'Secure fail-safe over-the-air firmware updates with hardware root of trust, rollback protection, and encrypted dual-boot partitions.',
        icon: <Lock className="w-6 h-6 text-[#D97706]" />,
        tags: ['Dual-Boot A/B', 'Hardware Root of Trust', 'Secure Boot', 'FOTA Updates']
      },
      {
        title: 'Ultra-Low Power Edge Sensor Telemetry',
        desc: 'Energy harvesting algorithms, duty-cycling optimization, and long-range wireless telemetry (LoRaWAN, Zigbee, BLE).',
        icon: <Zap className="w-6 h-6 text-[#D97706]" />,
        tags: ['LoRaWAN', 'BLE Mesh', 'Energy Harvesting', 'Sub-GHz Wireless']
      },
      {
        title: 'Hardware-in-the-Loop (HIL) Firmware QA',
        desc: 'Automated test benches with oscilloscope signal verification, thermal stress cycles, and fault-injection simulations.',
        icon: <CheckCircle2 className="w-6 h-6 text-[#D97706]" />,
        tags: ['HIL Automation', 'MISRA-C:2012', 'Fault Injection', 'Thermal Stress']
      }
    ],
    complianceList: ['MISRA-C:2012', 'IEC 61508 SIL-3', 'ISO 26262 ASIL', 'FCC / CE Wireless', 'RoHS / WEEE'],
    outcomes: [
      { stat: '10+ Yrs', label: 'Battery Life on Edge Sensors' },
      { stat: '100%', label: 'FOTA Rollback Protection' },
      { stat: 'Zero', label: 'MISRA-C Violations' }
    ]
  },
  'genetic-ai': {
    id: 'genetic-ai',
    name: 'Genetic AI & Bioinformatics',
    badge: 'Algorithmic Genomics & Neural Discovery',
    tagline: 'Algorithmic Intelligence Unlocking Complex Biological Discovery',
    overview: 'Advanced AI-driven solutions exploring intelligent automation, data-driven biological discovery, molecular sequence modeling, and next-generation digital bioinformatics pipelines.',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=75&w=1200',
    icon: <Sparkles className="w-8 h-8 text-[#059669]" />,
    solutions: [
      {
        title: 'Genomic Sequence Deep Learning Models',
        desc: 'Transformer architectures trained on large genomic and proteomic sequence data for mutation impact prediction.',
        icon: <Zap className="w-6 h-6 text-[#059669]" />,
        tags: ['Genomic Transformers', 'Variant Calling AI', 'FASTA / VCF Pipelines']
      },
      {
        title: 'Distributed Bioinformatics Cloud Pipelines',
        desc: 'Scalable Nextflow and Cromwell pipelines orchestrating Petabyte-scale Next-Generation Sequencing (NGS) data workflows.',
        icon: <Server className="w-6 h-6 text-[#059669]" />,
        tags: ['Nextflow / CWL', 'NGS Alignment', 'Petabyte Data Mesh', 'Cloud HPC']
      },
      {
        title: 'Neural Protein Structure & Molecular Docking',
        desc: 'Accelerated 3D protein conformation analysis and algorithmic ligand binding simulations for accelerated drug discovery.',
        icon: <Cpu className="w-6 h-6 text-[#059669]" />,
        tags: ['Protein Folding', 'Molecular Dynamics', 'GPU Acceleration', 'Docking AI']
      },
      {
        title: 'Bioinformatics Algorithm Validation QA',
        desc: 'Automated statistical benchmark verification against standard GIAB (Genome in a Bottle) datasets and reproducibility audits.',
        icon: <CheckCircle2 className="w-6 h-6 text-[#059669]" />,
        tags: ['GIAB Benchmarking', 'Reproducible Pipelines', 'GLP Standards']
      }
    ],
    complianceList: ['HIPAA Compliant', 'CLIA Standards', 'CAP Accredited Pipelines', 'ISO 27001', 'GLP / GCP Guidelines'],
    outcomes: [
      { stat: '99.99%', label: 'Variant Calling Accuracy' },
      { stat: '8x', label: 'Faster Genome Analysis Cycles' },
      { stat: '100%', label: 'Reproducible Computational Pipelines' }
    ]
  }
};

const industryAlias: Record<string, string> = {
  'real-estate': 'real-estate',
  'realestate': 'real-estate',
  'proptech': 'real-estate',
  'tele-medicine': 'tele-medicine',
  'telemedicine': 'tele-medicine',
  'healthcare': 'healthcare',
  'healthcare-life-sciences': 'healthcare',
  'life-sciences': 'healthcare',
  'fintech': 'fintech',
  'fintech-blockchain': 'fintech',
  'fintech-and-blockchain': 'fintech',
  'blockchain': 'fintech',
  'financial-technology': 'fintech',
  'finance': 'fintech',
  'banking': 'fintech',
  'tourism': 'tourism',
  'travel': 'tourism',
  'hospitality': 'tourism',
  'media-entertainment': 'media',
  'media': 'media',
  'entertainment': 'media',
  'streaming': 'media',
  'government': 'government',
  'public-sector': 'government',
  'ngo-donations': 'ngo-donations',
  'ngo': 'ngo-donations',
  'non-profit': 'ngo-donations',
  'education': 'education',
  'edtech': 'education',
  'ecommerce': 'retail',
  'retail': 'retail',
  'digital-commerce': 'retail',
  'mobility': 'automotive',
  'automotive': 'automotive',
  'automotive-mobility': 'automotive',
  'aerospace': 'aerospace',
  'defense': 'aerospace',
  'embedded': 'embedded',
  'hardware': 'embedded',
  'smart-manufacturing': 'manufacturing',
  'manufacturing': 'manufacturing',
  'industry-4-0': 'manufacturing',
  'genetic-ai': 'genetic-ai',
  'genomics': 'genetic-ai',
  'bioinformatics': 'genetic-ai',
  'telecom': 'telecom',
  'telecom-5g': 'telecom',
  'energy': 'energy',
  'energy-utilities': 'energy',
  'logistics': 'logistics',
  'supply-chain': 'logistics'
};

export const IndustryDetailPage = memo(function IndustryDetailPage() {
  const { industryId } = useParams<{ industryId?: string }>();
  const activeKey = industryId ? (industryAlias[industryId.toLowerCase()] || industryId.toLowerCase()) : 'healthcare';
  const data = industriesData[activeKey] || industriesData['healthcare'];

  return (
    <div className="min-h-screen bg-white text-slate-900 pt-24 pb-20">
      {/* Breadcrumb Navigation */}
      <div className="bg-[#F8FAFC] border-b border-slate-200/80 py-4">
        <div className="w-full px-[8%] flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link to="/" className="hover:text-[#0876B9] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/industries" className="hover:text-[#0876B9] transition-colors">Industries</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-semibold">{data.name}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-[#F8FAFC] via-white to-[#F0F7FF] border-b border-slate-200/80 overflow-hidden">
        <div className="w-full px-[8%] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200/90 shadow-2xs text-xs font-semibold uppercase tracking-wider text-[#0876B9] mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{data.badge}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
                {data.name}
              </h1>

              <p className="text-lg text-slate-700 leading-relaxed font-normal mb-8 max-w-2xl">
                {data.overview}
              </p>

              {/* Compliance Pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                {data.complianceList.map((comp, idx) => (
                  <span key={idx} className="text-xs font-semibold text-slate-800 bg-white border border-slate-200/80 px-3 py-1.5 rounded-sm shadow-2xs">
                    {comp}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/contact"
                  className="px-7 py-3.5 bg-[#0876B9] text-white hover:bg-[#065E94] transition-all text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-sm shadow-md shadow-[#0876B9]/20 flex items-center gap-2"
                >
                  <span>Build Industry Solution</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/services/qa-automation"
                  className="px-7 py-3.5 bg-white text-slate-800 hover:bg-slate-50 transition-all border border-slate-300 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-sm shadow-2xs flex items-center justify-center"
                >
                  Quality Engineering QA
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-lg overflow-hidden border border-slate-200 shadow-lg aspect-4/3 bg-slate-900">
                <img
                  src={data.image}
                  alt={data.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="text-xs font-bold uppercase tracking-widest text-[#38BDF8] mb-1">
                    Industry Specialization
                  </div>
                  <div className="text-lg font-bold">{data.tagline}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-12 bg-white border-b border-slate-200/80">
        <div className="w-full px-[8%]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200">
            {data.outcomes.map((item, idx) => (
              <div key={idx} className="pt-4 md:pt-0 px-4">
                <div className="text-3xl md:text-4xl font-extrabold text-[#0876B9] mb-1 font-sans">
                  {item.stat}
                </div>
                <div className="text-sm font-semibold text-slate-700">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="w-full px-[8%]">
          <div className="max-w-3xl mb-16">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E2725B] mb-3">
              Sector-Specific Engineering
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Tailored architectures engineered for {data.name}.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.solutions.map((sol, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-8 rounded-sm bg-white border border-slate-200/80 hover:border-[#0876B9]/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-sm bg-[#F8FAFC] border border-slate-200/80 flex items-center justify-center mb-6 shadow-2xs">
                    {sol.icon}
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3">
                    {sol.title}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal mb-6">
                    {sol.desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100">
                  {sol.tags.map((t, tIdx) => (
                    <span key={tIdx} className="text-[11px] font-medium text-slate-700 bg-slate-50 px-2 py-0.5 rounded-sm border border-slate-200/60">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Switch Industries Nav */}
      <section className="py-16 bg-white text-center">
        <div className="w-full px-[8%]">
          <h3 className="text-lg font-bold text-slate-900 mb-6">
            Explore Other High-Compliance Sectors
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {Object.values(industriesData).map((ind) => (
              <Link
                key={ind.id}
                to={`/industries/${ind.id}`}
                className={`px-5 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all border ${ind.id === activeKey
                  ? 'bg-[#0876B9] text-white border-[#0876B9]'
                  : 'bg-[#F8FAFC] text-slate-700 border-slate-200 hover:border-[#0876B9]'
                  }`}
              >
                {ind.name}
              </Link>
            ))}
          </div>

          <div className="mt-10">
            <Link
              to="/industries"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0876B9] hover:text-[#065E94] group"
            >
              <span>View Full Industries Portfolio</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
});

IndustryDetailPage.displayName = 'IndustryDetailPage';
