import { memo } from 'react';
import { Hero } from '../components/Hero';
import { Industries } from '../components/Industries';
import { Services } from '../components/Services';
import { Methodology } from '../components/Methodology';
import { Technologies } from '../components/Technologies';
import { Testimonials } from '../components/Testimonials';
import { Stats } from '../components/Stats';

export const HomePage = memo(function HomePage() {
  return (
    <>
      <Hero />
      <Industries />
      <Services />
      <Methodology />
      <Technologies />
      <Testimonials />
      <Stats />
    </>
  );
});

HomePage.displayName = 'HomePage';
