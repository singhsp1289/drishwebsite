import healthcareImg from '../../assets/images/industries/healthcare.jpg';
import fintechImg from '../../assets/images/industries/fintech.jpg';
import mediaImg from '../../assets/images/industries/media.jpg';
import educationImg from '../../assets/images/industries/education.jpg';
import retailImg from '../../assets/images/industries/retail.jpg';
import governmentImg from '../../assets/images/industries/government.jpg';
import realEstateImg from '../../assets/images/industries/real-estate.jpg';
import tourismImg from '../../assets/images/industries/tourism.jpg';
import ngoDonationsImg from '../../assets/images/industries/ngo-donations.jpg';

export interface Industry {
  id: string;
  number?: string;
  title: string;
  shortTitle: string;
  slug: string;
  headline: string;
  description: string;
  tags: string[];
  accentColor: string;
  accentBg: string;
  badge: string;
  image: string;
  imageAlt: string;
}

export const INDUSTRIES_LIST: Industry[] = [
  {
    id: 'healthcare',
    number: '01',
    title: 'Healthcare & Life Sciences',
    shortTitle: 'Healthcare',
    slug: 'healthcare',
    headline: 'Connected healthcare platforms engineered for patient trust.',
    description:
      'We engineer HIPAA-compliant digital health portals, IoMT telemetry pipelines, and clinical decision systems connecting patients, providers, and diagnostic algorithms with zero compromise on data security.',
    tags: ['HIPAA / FHIR APIs', 'IoMT Telemetry', 'Clinical AI Support', 'Remote Patient Care'],
    accentColor: '#059669', // Emerald
    accentBg: 'rgba(5, 150, 105, 0.08)',
    badge: 'Digital Health & Care',
    image: healthcareImg,
    imageAlt: 'Authentic hospital clinician using digital diagnostics in medical ward',
  },
  {
    id: 'fintech',
    number: '02',
    title: 'Financial Services',
    shortTitle: 'Financial Services',
    slug: 'fintech',
    headline: 'High-concurrency infrastructure for next-gen financial systems.',
    description:
      'We design ultra-low latency transaction backends, tokenized settlement engines, algorithmic fraud interceptors, and audited smart contract networks built for modern global fintech enterprises.',
    tags: ['Sub-ms Settlements', 'Smart Contracts', 'PCI-DSS Tokenization', 'AI Fraud Detection'],
    accentColor: '#0284C7', // Sky Blue
    accentBg: 'rgba(2, 132, 199, 0.08)',
    badge: 'Digital Finance & Web3',
    image: fintechImg,
    imageAlt: 'Financial analyst workstation with market data analytics in corporate office',
  },
  {
    id: 'media',
    number: '03',
    title: 'Media & Entertainment',
    shortTitle: 'Media & Entertainment',
    slug: 'media',
    headline: 'High-bandwidth architectures for immersive audience experiences.',
    description:
      'Scalable streaming infrastructure, low-latency video distribution, AI content indexing, and multi-DRM security engines powering global digital broadcasters and interactive entertainment networks.',
    tags: ['Low-Latency HLS/DASH', 'AI Content Indexing', 'Multi-DRM Security', 'Edge Video Delivery'],
    accentColor: '#7C3AED', // Violet
    accentBg: 'rgba(124, 58, 237, 0.08)',
    badge: 'Streaming & Media Tech',
    image: mediaImg,
    imageAlt: 'Professional broadcast video camera and digital studio production equipment',
  },
  {
    id: 'education',
    number: '04',
    title: 'Education',
    shortTitle: 'Education',
    slug: 'education',
    headline: 'Connected digital ecosystems transforming modern learning.',
    description:
      'Interactive learning management platforms, real-time virtual classroom telemetry, adaptive testing AI, and comprehensive student progress analytics for universities and digital academies.',
    tags: ['Adaptive Learning AI', 'LTI / SCORM Integrations', 'Interactive Classrooms', 'Student Analytics'],
    accentColor: '#EA580C', // Amber-orange
    accentBg: 'rgba(234, 88, 12, 0.08)',
    badge: 'Digital Learning',
    image: educationImg,
    imageAlt: 'Modern university students collaborating in a bright digital lecture classroom',
  },
  {
    id: 'retail',
    number: '06',
    title: 'Retail & E-commerce',
    shortTitle: 'Retail & E-commerce',
    slug: 'retail',
    headline: 'Intelligent, high-throughput digital commerce engines.',
    description:
      'Headless commerce architectures, microservices-driven inventory synchronization, automated fulfillment workflows, and AI personalized recommendations built for high-volume retail brands.',
    tags: ['Headless Storefronts', 'Inventory Sync Engine', 'AI Personalized Search', 'Global Payment Routing'],
    accentColor: '#C2410C', // Terracotta
    accentBg: 'rgba(194, 65, 12, 0.08)',
    badge: 'Commerce & Retail Systems',
    image: retailImg,
    imageAlt: 'Modern logistics fulfillment center and automated retail warehouse operations',
  },
  {
    id: 'government',
    number: '07',
    title: 'Government & Public Sector',
    shortTitle: 'Government & Public Sector',
    slug: 'government',
    headline: 'Secure, high-integrity digital platforms for public infrastructure.',
    description:
      'Zero-trust architecture, citizen service portals, data sovereign cloud deployments, and automated digital governance workflows with strict regulatory compliance and citizen-first accessibility.',
    tags: ['Zero-Trust Architecture', 'Citizen Service Portals', 'Data Sovereign Clouds', 'High-Availability Mesh'],
    accentColor: '#0F766E', // Teal
    accentBg: 'rgba(15, 118, 110, 0.08)',
    badge: 'Public Sector & Governance',
    image: governmentImg,
    imageAlt: 'Civic administration building and public sector infrastructure',
  },
  {
    id: 'real-estate',
    number: '10',
    title: 'Real Estate',
    shortTitle: 'Real Estate',
    slug: 'real-estate',
    headline: 'Smart technology for modern property ecosystems.',
    description:
      'Intelligent digital platforms simplifying property valuation, 3D digital twin assets, IoT building telemetry, and automated lease lifecycle management for institutional real estate managers.',
    tags: ['PropTech Platforms', 'Digital Twin Assets', 'Smart Lease Automation', 'IoT Building Sensors'],
    accentColor: '#EA580C', // Terracotta
    accentBg: 'rgba(234, 88, 12, 0.08)',
    badge: 'PropTech & Infrastructure',
    image: realEstateImg,
    imageAlt: 'Contemporary commercial skyscraper architecture and smart real estate property',
  },
  {
    id: 'tourism',
    number: '12',
    title: 'Tourism & Hospitality',
    shortTitle: 'Tourism',
    slug: 'tourism',
    headline: 'Intelligent travel experiences connecting global destinations.',
    description:
      'Dynamic travel booking engines, personalized itinerary recommendations, multi-currency hospitality settlement APIs, and real-time destination telematics for international travel brands.',
    tags: ['Dynamic Itinerary AI', 'Omnichannel Booking', 'Real-Time Telematics', 'Global Hospitality APIs'],
    accentColor: '#D97706', // Amber
    accentBg: 'rgba(217, 119, 6, 0.08)',
    badge: 'Travel Tech & Hospitality',
    image: tourismImg,
    imageAlt: 'Traveler exploring destination with mobile itinerary and digital hospitality services',
  },
  {
    id: 'ngo-donations',
    number: '13',
    title: 'NGO & Social Impact',
    shortTitle: 'NGO & Social Impact',
    slug: 'ngo-donations',
    headline: 'Transparent technology empowering social-impact missions.',
    description:
      'Transparent cryptographic donation routing, donor engagement CRM pipelines, real-time humanitarian field telemetry, and verifiable impact analytics for global non-profit organizations.',
    tags: ['Transparent Ledger', 'Donor Journey CRM', 'Impact Telemetry', 'Micro-Donation Routing'],
    accentColor: '#16A34A', // Green
    accentBg: 'rgba(22, 163, 74, 0.08)',
    badge: 'Social Impact & Non-Profit',
    image: ngoDonationsImg,
    imageAlt: 'Community volunteers united for humanitarian relief and social impact aid',
  },
];
