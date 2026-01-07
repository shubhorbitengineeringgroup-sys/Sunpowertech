import { lazy, Suspense, useState, useEffect, memo } from 'react';
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import ProductsSection from '@/components/sections/ProductsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import FAQSection from '@/components/sections/FAQSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/layout/Footer';
import AnimatedLoader from '@/components/ui/AnimatedLoader';
import ScrollProgress from '@/components/ui/ScrollProgress';
import GodLevelSEO from '@/components/seo/GodLevelSEO';

const Index = memo(() => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <GodLevelSEO />
      <AnimatedLoader isLoading={isLoading} />
      <ScrollProgress />
      <div className="min-h-screen bg-background overflow-x-hidden">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <FeaturesSection />
          <ProductsSection />
          <ProjectsSection />
          <FAQSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
});

Index.displayName = 'Index';

export default Index;
