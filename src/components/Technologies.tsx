import { FC, ReactNode, memo } from 'react';

interface TechItem {
  name: string;
  category: string;
  icon: ReactNode;
}

const technologies: TechItem[] = [
  // Frontend
  {
    name: 'React.js',
    category: 'Frontend',
    icon: (
      <svg className="w-9 h-9" viewBox="-11.5 -10.23174 23 20.46348" fill="none">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  {
    name: 'Angular',
    category: 'Frontend',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 250 250" fill="none">
        <polygon points="125,30 125,30 125,30 31.9,63.2 46.1,186.3 125,230 125,230 125,230 203.9,186.3 218.1,63.2" fill="#DD0031" />
        <polygon points="125,30 125,52.2 125,52.1 125,153.4 125,153.4 125,230 203.9,186.3 218.1,63.2" fill="#C3002F" />
        <path d="M125,52.1L66.8,182.6H88.3L100,153.4H125H149.9L161.7,182.6H183.2L125,52.1ZM142,135.4H125H108L125,94.3L142,135.4Z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    name: 'JavaScript',
    category: 'Frontend',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 630 630" fill="none">
        <rect width="630" height="630" rx="60" fill="#F7DF1E" />
        <path d="M375.7 508.8c18.5 29.8 45.4 49.3 84.4 49.3 35.3 0 57.8-17.7 57.8-42.3 0-29.3-23.7-39.6-63.5-56.8l-21.8-9.3c-62.8-26.6-104.3-60.3-104.3-132.8 0-66.2 50.8-116.4 129.8-116.4 56.4 0 96.8 21.8 126.7 73.8l-52.9 33.9c-14.7-26.2-34.4-38-73.8-38-34.4 0-54.8 17.5-54.8 39.8 0 27.4 17 37.6 57.3 54.8l21.8 9.3c75.2 32.2 112 63.8 112 137.4 0 78.4-61.6 122.9-144.3 122.9-79.6 0-130.8-42.3-154.2-94.8l59.8-30.7zM169.3 502.9c13.6 22.8 28.5 39.5 57.8 39.5 29.8 0 48.9-14.7 48.9-57.3V206.5h71.8v279.9c0 79.9-46.9 116.1-118.7 116.1-64.7 0-103.3-33.6-123.6-77.9l63.8-21.7z" fill="#000000" />
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    category: 'Frontend',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 128 128" fill="none">
        <rect width="128" height="128" rx="14" fill="#3178C6" />
        <path d="M68.5 75.3c0-3.3 1.3-6.1 4-8.3 2.7-2.2 7.1-4.4 13.3-6.6 6.3-2.2 10.4-4.8 12.3-7.8 1.9-3 2.8-6.7 2.8-11.1 0-5.7-1.8-10.2-5.4-13.5-3.6-3.3-8.8-5-15.6-5-6.2 0-11.4 1.5-15.6 4.5-4.2 3-6.8 7.4-7.8 13.2l12.4 2.5c.6-3.1 1.9-5.3 3.9-6.6 2-1.3 4.5-2 7.5-2 3.3 0 5.8.7 7.5 2.1 1.7 1.4 2.5 3.3 2.5 5.7 0 2.2-.9 4.1-2.7 5.7-1.8 1.6-5.3 3.3-10.5 5.1-6.5 2.3-11.3 5-14.4 8.1-3.1 3.1-4.7 7.2-4.7 12.3 0 5.8 2 10.4 6 13.8 4 3.4 9.6 5.1 16.8 5.1 6.8 0 12.4-1.7 16.8-5.1 4.4-3.4 6.9-8.3 7.5-14.7l-12.4-2.1c-.6 3.7-2 6.4-4.2 8.1-2.2 1.7-5.1 2.5-8.7 2.5-3.9 0-6.8-.8-8.7-2.4-1.9-1.5-2.9-3.7-2.9-6.7zM24 38.3h36.6v11.5h-12v44.9H36V49.8H24V38.3z" fill="#FFFFFF" />
      </svg>
    ),
  },

  // Backend
  {
    name: 'Node.js',
    category: 'Backend',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 256 256" fill="none">
        <path d="M128 16L32 71.4v113.2L128 240l96-55.4V71.4L128 16z" fill="#539E43" />
        <path d="M128 16v224l96-55.4V71.4L128 16z" fill="#339933" />
        <path d="M128 65c-35 0-42 22-42 34 0 23 19 28 35 32 14 3 18 6 18 12 0 8-7 12-16 12-16 0-22-8-22-8l-7 13s8 10 28 10c29 0 35-18 35-33 0-24-18-29-35-33-13-3-17-6-17-11 0-7 7-10 14-10 13 0 19 6 19 6l7-12s-8-9-27-9z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    name: 'Express.js',
    category: 'Backend',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 128 128" fill="none">
        <rect width="128" height="128" rx="16" fill="#F8FAFC" stroke="#E2E8F0" />
        <path d="M26 64c0-16.6 13.4-30 30-30h16c16.6 0 30 13.4 30 30s-13.4 30-30 30H56c-16.6 0-30-13.4-30-30z" fill="#0F172A" />
        <path d="M52 48l12 16-12 16h8l8-11 8 11h8L72 64l12-16h-8l-8 11-8-11h-8z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    name: 'NestJS',
    category: 'Backend',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 256 256" fill="none">
        <path d="M225.8 45.4C203.2 24.3 162.7 13.4 129.5 35.8c-18.7 12.6-26.6 30.7-37.5 48.7-6.2 10.3-13.6 20.3-23.7 27.5-12.7 9-28.7 12.8-43.4 9.1-1.3-.3-2.5 1-2.1 2.2 4.4 13.5 14.1 24.6 26.6 31 16.3 8.3 36 8.3 52.3.1 14.4-7.2 24.8-19.7 34.3-32.6 8.5-11.5 17-23.4 27.6-32.9 14.9-13.4 35.7-18.6 55.4-13.6 1.4.4 2.5-1.1 1.7-2.2-5.7-8.9-12.6-17-20.9-23.7-1.3-1.1-1.1-3.2.4-4 7.6-3.8 15.6-5.7 24.1-5.7 3.8 0 7.4.4 10.9 1.1 1.5.3 2.6-1.3 1.8-2.5-3-4.2-6.5-8.2-10.4-11.8z" fill="#E0234E" />
        <path d="M103.5 131.2c-15.6 15.8-29.3 33.7-39.7 53.4-3.5 6.7-6.4 13.6-8.9 20.6-.5 1.5 1 2.9 2.4 2.3 17.5-7.4 31.9-19.9 41.5-35.8 7.3-12.1 12.1-25.5 19.3-37.6 1.6-2.8-.7-6.3-3.8-5.7-3.9.7-7.6 1.7-10.8 2.8z" fill="#E0234E" />
        <path d="M165.7 101.4c-9.6 10.5-18.3 22-26.6 33.5-9.4 13.1-18.2 26.8-25.4 41.2-5.9 11.9-10.3 24.4-13.6 37.3-.4 1.5 1.1 2.8 2.5 2.1 19.9-9.8 35.8-26.3 45.4-46.6 6.3-13.3 10.1-27.7 15.8-41.2 1.4-3.3-.9-7.1-4.4-6.8-4.9.4-9.3.4-13.7.5z" fill="#DF234F" />
      </svg>
    ),
  },

  // Database
  {
    name: 'MongoDB',
    category: 'Database',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 128 128" fill="none">
        <path d="M64 4c-1.2 1.2-24.8 29.8-25.7 59.8-.8 27.2 16.5 45.2 25.7 60.2 9.2-15 26.5-33 25.7-60.2C88.8 33.8 65.2 5.2 64 4z" fill="#13AA52" />
        <path d="M64 4v120c9.2-15 26.5-33 25.7-60.2C88.8 33.8 65.2 5.2 64 4z" fill="#119245" />
        <path d="M64 124c-1 0-1.8-.8-1.8-1.8v-18.5c0-1 .8-1.8 1.8-1.8s1.8.8 1.8 1.8v18.5c0 1-.8 1.8-1.8 1.8z" fill="#A1A7AB" />
      </svg>
    ),
  },
  {
    name: 'MySQL',
    category: 'Database',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 128 128" fill="none">
        <path d="M65.4 34.6c-4.2-1.9-8.7-3.1-13.4-3.5-1.5-.1-3 .1-4.4.6-2.1.8-3.7 2.4-4.5 4.5-1.5 3.9-.3 8.3 2.9 11 3.5 3 8.2 4.5 12.8 4.7 4.1.2 8.3-.5 12.1-2.1 3.4-1.4 6.5-3.5 9-6.2 3.2-3.5 5.5-7.7 6.8-12.2.8-2.8 1-5.7.7-8.6-.2-2.1-.8-4.2-1.9-6-1.5-2.5-3.8-4.3-6.6-5.2-3.8-1.2-7.9-.9-11.7.6-6 2.4-11 6.5-15.1 11.6-4.6 5.7-7.6 12.4-9.3 19.5-2.2 9.2-2.2 18.8 0 28 1.8 7.5 5 14.6 9.4 20.9 4.3 6.1 9.8 11.2 16.3 14.9 3.5 2 7.3 3.5 11.3 4.3 3.3.7 6.7.8 10 .2 2.8-.5 5.5-1.6 7.7-3.3 2.6-2 4.4-4.8 5.2-8 .8-3.2.4-6.6-1.1-9.5-2.1-4.1-5.9-7-10.4-8.2-3.8-1-7.8-.8-11.5.6-3.8 1.4-7.1 3.8-9.5 7-2.1 2.8-3.4 6.1-3.7 9.6-.3 3.2.3 6.4 1.8 9.2" stroke="#00758F" strokeWidth="6" strokeLinecap="round" />
        <path d="M84 76c4 3 9 4 14 2s9-7 10-12" stroke="#F29111" strokeWidth="5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'PostgreSQL',
    category: 'Database',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 128 128" fill="none">
        <path d="M64 12C35.3 12 12 35.3 12 64c0 14.5 5.9 27.6 15.5 37.1 2.7 2.7 8.3 5.4 12.5 5.9v-12.6c-3.1-.9-6-2.4-8.4-4.5-5.9-5.1-9.6-12.6-9.6-21 0-15.5 12.5-28 28-28 3.4 0 6.6.6 9.6 1.7 6.1-4.7 13.8-7.7 22.4-7.7 19.9 0 36 16.1 36 36 0 13.5-7.4 25.2-18.4 31.4-2.8 1.6-5.8 2.8-9 3.6v12.7c4.6-.7 10.6-3.5 13.6-6.5C110.1 91.6 116 78.5 116 64c0-28.7-23.3-52-52-52z" fill="#336791" />
        <path d="M64 48c-8.8 0-16 7.2-16 16s7.2 16 16 16 16-7.2 16-16-7.2-16-16-16zm-2 22h-4v-4h4v4zm8 0h-4v-4h4v4z" fill="#336791" />
      </svg>
    ),
  },
  {
    name: 'Redis',
    category: 'Database',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 128 128" fill="none">
        <path d="M12 40l52-24 52 24-52 24L12 40z" fill="#D82C20" />
        <path d="M12 40v24l52 24V64L12 40z" fill="#A3241C" />
        <path d="M116 40v24l-52 24V64l52-24z" fill="#C0261E" />
        <path d="M12 68l52 24 52-24v16l-52 24-52-24V68z" fill="#D82C20" />
        <path d="M12 92l52 24 52-24v16l-52 24-52-24V92z" fill="#A3241C" />
        <circle cx="64" cy="40" r="4" fill="#FFFFFF" />
        <circle cx="50" cy="34" r="3" fill="#FFFFFF" />
        <circle cx="78" cy="34" r="3" fill="#FFFFFF" />
      </svg>
    ),
  },

  // DevOps / Cloud
  {
    name: 'AWS',
    category: 'DevOps / Cloud',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 128 128" fill="none">
        <path d="M37.5 61.8c0-3.5.7-6.2 2-8.3 1.4-2.1 3.5-3.1 6.3-3.1 2.7 0 4.6.9 5.8 2.8 1.2 1.8 1.8 4.3 1.8 7.5v18.7h-4.3v-5c-1 1.9-2.2 3.3-3.7 4.2-1.5.9-3.2 1.4-5.2 1.4-2.8 0-4.9-.8-6.5-2.5-1.5-1.7-2.3-4.1-2.3-7.2 0-3.4 1-6 2.9-7.7 1.9-1.8 4.7-2.8 8.4-3.1l6.4-.5v-2.3c0-2.3-.4-4-1.3-5-.9-1.1-2.3-1.6-4.2-1.6-1.7 0-3 .4-3.9 1.2-.9.8-1.4 2-1.6 3.6l-4.6-.7zm15.9 8.6l-5.6.5c-2.4.2-4.1.8-5.2 1.8-1.1 1-1.6 2.4-1.6 4.3 0 1.7.5 3 1.4 3.9.9 1 2.2 1.4 3.9 1.4 1.9 0 3.5-.6 4.8-1.8 1.3-1.2 1.9-2.8 2.3-4.9v-5.2zm20-22.1h4.5l6.7 26.6 6.5-26.6h4.3l6.5 26.6 6.8-26.6h4.3l-9.1 33.7h-4.4l-6.4-25.8-6.4 25.8h-4.4l-8.9-33.7zm49.5 24.3c-1.4-1.1-3.2-1.9-5.3-2.4-2.1-.6-4.2-1.2-6.2-1.9-2-.7-3.6-1.6-4.8-2.8-1.2-1.2-1.8-2.8-1.8-4.9 0-2.7 1-4.8 3.1-6.4 2.1-1.6 4.9-2.4 8.6-2.4 2.3 0 4.4.4 6.2 1.2 1.8.8 3.2 1.9 4.1 3.4l-3.6 2.7c-1.4-2.1-3.6-3.2-6.7-3.2-2.3 0-4 .5-5.2 1.4-1.2.9-1.8 2.2-1.8 3.8 0 1.4.5 2.5 1.4 3.3.9.8 2.3 1.5 4.2 2 1.9.5 3.8 1.1 5.9 1.7 2.1.6 3.8 1.6 5.1 2.8 1.3 1.2 2 2.9 2 5.1 0 2.9-1 5.2-3.1 6.8-2.1 1.6-5.1 2.4-9.1 2.4-2.8 0-5.4-.5-7.6-1.5-2.2-1-3.9-2.5-5-4.4l3.8-2.6c1.6 2.6 4.5 3.9 8.8 3.9 2.6 0 4.7-.5 6.1-1.5 1.4-1 2.1-2.3 2.1-4 0-1.6-.6-2.8-1.7-3.7z" fill="#232F3E" />
        <path d="M22.5 88.5c22.3 16.4 51.5 16.4 73.8 0 2.5-1.8 4.9.4 3.2 2.6-25 32.5-81.5 19.3-80.2-1.1.1-1.8 2.1-2.4 3.2-1.5z" fill="#FF9900" />
      </svg>
    ),
  },
  {
    name: 'Docker',
    category: 'DevOps / Cloud',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 128 128" fill="none">
        <path d="M118.8 56.4c-2.4-1.7-7.6-1.4-11.8.4-1.2-6.5-6.1-11.5-12.2-12.8l-2.4-.5-.8 2.3c-2.4 6.8-.7 13.9 4.3 18.7-2.6 1.4-6.3 2.1-11.2 2.1H12.7c-2.1 0-3.7 1.7-3.7 3.7 0 11.2 3.6 21.6 10.3 29.8C27 109.8 38.8 116 52.8 116c35.6 0 65.5-23.7 70.3-54.8 1-6.1.5-9.8-4.3-4.8zM42 32H30v12h12V32zm16 0H46v12h12V32zm16 0H62v12h12V32zm-32 16H30v12h12V48zm16 0H46v12h12V48zm16 0H62v12h12V48zm16 0H78v12h12V48z" fill="#2496ED" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    category: 'DevOps / Cloud',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 128 128" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M64 8C33.1 8 8 33.1 8 64c0 24.8 16.1 45.7 38.4 53.1 2.8.5 3.8-1.2 3.8-2.7 0-1.3-.1-5.7-.1-10.4-15.6 3.4-18.9-6.6-18.9-6.6-2.5-6.5-6.2-8.2-6.2-8.2-5.1-3.5.4-3.4.4-3.4 5.6.4 8.6 5.8 8.6 5.8 5 8.6 13.2 6.1 16.4 4.7.5-3.6 2-6.1 3.5-7.5-12.4-1.4-25.5-6.2-25.5-27.7 0-6.1 2.2-11.1 5.8-15-1.7-1.4-2.5-7.1.6-14.8 0 0 4.7-1.5 15.4 5.7 4.5-1.2 9.2-1.9 14-1.9s9.5.6 14 1.9c10.7-7.2 15.4-5.7 15.4-5.7 3.1 7.7 1.2 13.4.6 14.8 3.6 3.9 5.8 8.9 5.8 15 0 21.6-13.1 26.2-25.6 27.6 2 1.8 3.9 5.2 3.9 10.5 0 7.6-.1 13.7-.1 15.6 0 1.5 1 3.3 3.9 2.7C104 109.6 120 88.7 120 64c0-30.9-25.1-56-56-56z" fill="#181717" />
      </svg>
    ),
  },
  {
    name: 'Nginx',
    category: 'DevOps / Cloud',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 128 128" fill="none">
        <path d="M64 8l50 28.9v57.7L64 123.5 14 94.6V36.9L64 8z" fill="#009639" />
        <path d="M42 40v48h10V59.5l24 28.5h10V40H76v28.5L52 40H42z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    name: 'Linux',
    category: 'DevOps / Cloud',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 128 128" fill="none">
        <path d="M64 14c-16 0-26 12-26 28 0 8 3 17 6 22-5 6-12 18-12 30 0 14 11 20 22 20 5 0 9-1 12-3 5 2 11 3 18 3 7 0 13-1 18-3 3 2 7 3 12 3 11 0 22-6 22-20 0-12-7-24-12-30 3-5 6-14 6-22 0-16-10-28-26-28H64z" fill="#18181B" />
        <ellipse cx="64" cy="74" rx="22" ry="24" fill="#FFFFFF" />
        <ellipse cx="54" cy="38" rx="4" ry="6" fill="#FFFFFF" />
        <ellipse cx="74" cy="38" rx="4" ry="6" fill="#FFFFFF" />
        <circle cx="55" cy="39" r="2.5" fill="#18181B" />
        <circle cx="73" cy="39" r="2.5" fill="#18181B" />
        <path d="M56 46c0 0 4 6 8 6s8-6 8-6-3 10-8 10-8-10-8-10z" fill="#FFA500" />
        <ellipse cx="40" cy="106" rx="14" ry="6" fill="#FFA500" />
        <ellipse cx="88" cy="106" rx="14" ry="6" fill="#FFA500" />
      </svg>
    ),
  },

  // Tools
  {
    name: 'VS Code',
    category: 'Tools',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 128 128" fill="none">
        <path d="M94.7 13.8L68.5 38.6 42.8 18.7c-2.4-1.9-5.9-1.7-8.1.5L16.2 37.7c-1.9 1.8-2.2 4.7-.7 6.8l23.6 33.1L15.5 110.7c-1.5 2.1-1.2 5 .7 6.8l18.5 18.5c2.2 2.2 5.7 2.4 8.1.5l25.7-19.9 26.2 24.8c3.2 3 8.3 1.8 9.9-2.4l19.8-51.5c1-2.6 1-5.5 0-8.1L104.6 16.2c-1.6-4.2-6.7-5.4-9.9-2.4z" fill="#007ACC" />
        <path d="M94.7 13.8L68.5 38.6l26.2 25.4 25.7-25.4c1-1 .6-2.7-.8-3.1L94.7 13.8z" fill="#1F9CF0" />
        <path d="M94.7 114.2l24.9-21.7c1.4-.4 1.8-2.1.8-3.1L94.7 64l-26.2 25.4 26.2 24.8z" fill="#0065A9" />
      </svg>
    ),
  },
  {
    name: 'Postman',
    category: 'Tools',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 128 128" fill="none">
        <circle cx="64" cy="64" r="56" fill="#FF6C37" />
        <path d="M78 40c-2.8-1.5-6.2-.5-7.7 2.3L54 73l-10-6c-2.5-1.5-5.7-.7-7.2 1.8-1.5 2.5-.7 5.7 1.8 7.2l15 9c1.6 1 3.6 1.1 5.3.3s2.8-2.3 3.3-4.1l8-28.5 10.8 19c1.3 2.3 4.2 3.2 6.6 2 2.4-1.2 3.4-4.1 2.2-6.5L78 40z" fill="#FFFFFF" />
        <circle cx="82" cy="36" r="6" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    name: 'Git',
    category: 'Tools',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 128 128" fill="none">
        <path d="M120.9 57.3L70.7 7.1c-3.8-3.8-10-3.8-13.8 0L44.5 19.5l17.4 17.4c4.1-1.4 8.9-.5 12.2 2.8 3.3 3.3 4.2 8.1 2.8 12.2l16.8 16.8c4.1-1.4 8.9-.5 12.2 2.8 4.7 4.7 4.7 12.4 0 17.1-4.7 4.7-12.4 4.7-17.1 0-3.6-3.6-4.4-8.9-2.5-13.3L70.4 59.2v29.5c1.4.8 2.6 2 3.5 3.5 3.8 6.4 1.7 14.7-4.7 18.5-6.4 3.8-14.7 1.7-18.5-4.7-3.8-6.4-1.7-14.7 4.7-18.5 2.3-1.4 4.9-2 7.5-1.8V57.6c-2.6.2-5.2-.4-7.5-1.8-3.6-2.1-5.9-5.8-6.4-9.8L28.7 63.4 7.1 85c-3.8 3.8-3.8 10 0 13.8l50.2 50.2c3.8 3.8 10 3.8 13.8 0l49.8-49.8c3.8-3.8 3.8-10.1 0-13.9l-.1-.2.1.2-0-48z" fill="#F05032" />
      </svg>
    ),
  },
  {
    name: 'npm',
    category: 'Tools',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 128 128" fill="none">
        <rect width="128" height="128" rx="8" fill="#CB3837" />
        <path d="M16 16h96v96H16V16zm16 16v64h32V48h16v32h16V32H32z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    name: 'Jira',
    category: 'Tools',
    icon: (
      <svg className="w-9 h-9" viewBox="0 0 128 128" fill="none">
        <path d="M117.8 58.7L66.7 7.6c-3.5-3.5-9.1-3.5-12.6 0L4.3 57.4c-3.5 3.5-3.5 9.1 0 12.6l51.1 51.1c3.5 3.5 9.1 3.5 12.6 0l49.8-49.8c3.5-3.5 3.5-9.1 0-12.6z" fill="#0052CC" />
        <path d="M60.4 64L35.2 38.8c-1.8-1.8-4.6-1.8-6.3 0L16.3 51.4c-1.8 1.8-1.8 4.6 0 6.3l25.2 25.2 18.9-18.9z" fill="#2684FF" />
        <path d="M85.6 64L60.4 38.8c-1.8-1.8-4.6-1.8-6.3 0L41.5 51.4c-1.8 1.8-1.8 4.6 0 6.3l25.2 25.2 18.9-18.9z" fill="#0052CC" />
        <path d="M110.8 64L85.6 38.8c-1.8-1.8-4.6-1.8-6.3 0L66.7 51.4c-1.8 1.8-1.8 4.6 0 6.3l25.2 25.2 18.9-18.9z" fill="#2684FF" />
      </svg>
    ),
  },
];

export const Technologies: FC = memo(() => {
  return (
    <section id="technologies" className="py-16 md:py-20 bg-[#F8FAFC] overflow-hidden border-t border-slate-200/80 relative">
      {/* Background Soft Pastel Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FFAA8C]/5 via-[#0876B9]/5 to-[#E03E7B]/5 pointer-events-none" />

      <div className="w-full px-[8%] mb-10 md:mb-12 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E2725B] mb-3">
            TECHNOLOGY STACK
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            AI-powered technologies built for{' '}
            <span className="text-[#0876B9]">scalable growth.</span>
          </h3>
        </div>
      </div>

      {/* Marquee Container with left/right fade masks */}
      <div className="relative w-full overflow-hidden group">
        {/* Left and Right Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#F8FAFC] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#F8FAFC] to-transparent z-20 pointer-events-none" />

        {/* Single Row Horizontal Marquee Track */}
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {/* Render 3 repetitions to guarantee flawless, seamless loop on all display sizes */}
          {[...technologies, ...technologies, ...technologies].map((tech, idx) => (
            <div
              key={`${tech.name}-${idx}`}
              className="flex-shrink-0 mx-3 md:mx-4 px-6 py-5 rounded-md border border-slate-200/80 bg-white/95 backdrop-blur-sm shadow-xs hover:shadow-md hover:border-[#0876B9]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center min-w-[130px] md:min-w-[145px] select-none"
            >
              <div className="h-11 w-11 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                {tech.icon}
              </div>
              <span className="text-xs md:text-sm font-semibold text-slate-800 tracking-tight font-sans text-center whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes techMarquee {
            0% {
              transform: translate3d(0, 0, 0);
            }
            100% {
              transform: translate3d(-33.333333%, 0, 0);
            }
          }
          .animate-marquee {
            animation: techMarquee 38s linear infinite;
            will-change: transform;
            contain: content;
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
          }
          @media (max-width: 768px) {
            .animate-marquee {
              animation-duration: 26s;
            }
          }
        `
      }} />
    </section>
  );
});

Technologies.displayName = 'Technologies';
