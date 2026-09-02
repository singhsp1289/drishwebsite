import { FC, memo } from 'react';
import logoSrc from '../assets/images/logo.png';
import logoDarkSrc from '../assets/images/logo-dark.png';

interface LogoProps {
  className?: string;
  variant?: 'header' | 'footer' | 'default' | string;
  dark?: boolean;
}

export const Logo: FC<LogoProps> = memo(({ className = 'w-full h-full object-contain', variant = 'default', dark = false }) => {
  return (
    <div className={`relative flex items-center justify-center ${variant === 'footer' ? 'brightness-110' : ''}`}>
      <img
        src={dark ? logoDarkSrc : logoSrc}
        alt="Drish Infotech Logo"
        className={className}
        loading="eager"
      />
    </div>
  );
});

Logo.displayName = 'Logo';
