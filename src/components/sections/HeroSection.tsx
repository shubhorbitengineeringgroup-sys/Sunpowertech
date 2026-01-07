import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Zap, Users, Award, MapPin, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SolarScene from '@/components/3d/SolarScene';
import ParticleBackground from '@/components/animations/ParticleBackground';
import { useEffect, useState, memo, useCallback } from 'react';

// Animated Counter Component
const AnimatedCounter = memo(({ end, duration = 2, suffix = '' }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('stats-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return <span>{count}{suffix}</span>;
});

AnimatedCounter.displayName = 'AnimatedCounter';

const stats = [
  { icon: Zap, value: 500, suffix: '+', label: 'Projects Completed' },
  { icon: Users, value: 1000, suffix: '+', label: 'Happy Clients' },
  { icon: Award, value: 15, suffix: '+', label: 'Years Experience' },
  { icon: MapPin, value: 50, suffix: '+', label: 'Cities Covered' },
];

// Letter animation for heading
const letterVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99] as const,
    },
  }),
};

const AnimatedText = memo(({ text, className }: { text: string; className?: string }) => (
  <span className={className}>
    {text.split('').map((char, i) => (
      <motion.span
        key={i}
        custom={i}
        variants={letterVariants}
        initial="hidden"
        animate="visible"
        className="inline-block"
        style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
      >
        {char}
      </motion.span>
    ))}
  </span>
));

AnimatedText.displayName = 'AnimatedText';

export const HeroSection = memo(() => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const scrollToAbout = useCallback(() => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* 3D Solar Background */}
      <SolarScene />

      {/* Particle Background */}
      <ParticleBackground />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/70 pointer-events-none z-[2]" />

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="container mx-auto px-4 lg:px-8 relative z-10 pt-20"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge with shimmer */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 relative overflow-hidden group"
          >
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-secondary rounded-full"
            />
            <span className="text-sm font-medium text-foreground/90">
              Powering Tomorrow with Intelligent Energy Solutions
            </span>
            <Sparkles className="w-4 h-4 text-accent" />

            {/* Shimmer effect */}
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
          </motion.div>

          {/* Main Heading with letter animation */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <AnimatedText text="Integration of" className="text-gradient-solar block" />
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.8, type: 'spring' }}
              className="text-gradient-green glow-text-solar block mt-2"
            >
              Power Technologies
            </motion.span>
          </motion.h1>

          {/* Subtitle with fade in */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10"
          >
            <span className="text-gradient-solar font-medium">Your trusted partner</span>
            <span className="text-muted-foreground"> for intelligent power management. We deliver </span>
            <span className="text-gradient-green font-medium">cutting-edge AI, IoT, and Cloud-enabled solutions</span>
            <span className="text-muted-foreground"> for a sustainable energy future.</span>
          </motion.p>

          {/* CTA Buttons with hover effects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                className="bg-gradient-solar hover:opacity-90 text-primary-foreground font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all group relative overflow-hidden"
                onClick={() => document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="relative z-10 flex items-center">
                  Explore Solutions
                  <Zap className="w-5 h-5 ml-2 group-hover:animate-pulse" />
                </span>

                {/* Button glow effect */}
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%', opacity: 0 }}
                  whileHover={{ x: '100%', opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary/50 hover:border-primary hover:bg-primary/10 font-semibold px-8 py-6 text-lg backdrop-blur-sm"
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Contact Us
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats Bar with staggered reveal */}
          <motion.div
            id="stats-section"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 glass rounded-2xl p-6 md:p-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 1.6 + index * 0.15,
                  type: 'spring',
                  stiffness: 100
                }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="text-center group cursor-default"
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-solar mb-3 group-hover:glow-solar transition-all"
                >
                  <stat.icon className="w-6 h-6 text-primary-foreground" />
                </motion.div>
                <div className="font-display text-2xl md:text-3xl font-bold text-gradient-solar">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>


        {/* Scroll Indicator */}
        <motion.button
          onClick={scrollToAbout}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          whileHover={{ scale: 1.1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="text-sm font-medium">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;