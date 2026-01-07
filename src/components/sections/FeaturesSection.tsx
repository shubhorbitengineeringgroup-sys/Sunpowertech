import { motion, useInView } from 'framer-motion';
import { useRef, memo, useState } from 'react';
import { Cpu, Users, Leaf, Sparkles, Shield, Zap } from 'lucide-react';

const features = [
  {
    icon: Cpu,
    title: 'Technology-Focused',
    subtitle: 'AI, IoT & Cloud',
    description: 'Leveraging cutting-edge AI, IoT, and Cloud technologies to provide smart, automated power management solutions that adapt to your needs.',
    gradient: 'from-primary to-accent',
    stats: '100+ Integrations',
  },
  {
    icon: Users,
    title: 'Customer-Centric',
    subtitle: 'Tailored Solutions',
    description: 'Every solution is customized to meet your specific requirements. We work closely with clients to understand their unique challenges.',
    gradient: 'from-secondary to-primary',
    stats: '1000+ Happy Clients',
  },
  {
    icon: Leaf,
    title: 'Sustainability-Focused',
    subtitle: 'Eco-Friendly',
    description: 'Committed to environmental responsibility with energy-efficient solutions that reduce carbon footprint and promote green energy.',
    gradient: 'from-secondary to-accent',
    stats: '40% Energy Savings',
  },
];

const additionalFeatures = [
  { icon: Sparkles, label: 'Smart Automation' },
  { icon: Shield, label: 'Reliable Protection' },
  { icon: Zap, label: 'Fast Implementation' },
];

const FeatureCard = memo(({ feature, index, isInView }: { feature: typeof features[0]; index: number; isInView: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateY: -10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2, type: 'spring' as const }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative perspective-1000"
    >
      <motion.div 
        animate={{ 
          rotateY: isHovered ? 5 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="relative h-full p-8 rounded-3xl bg-card border border-border overflow-hidden hover:border-transparent transition-all duration-500 transform-gpu"
      >
        {/* Animated Gradient Background on Hover */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: isHovered ? 0.15 : 0,
            scale: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
          className={`absolute inset-0 bg-gradient-to-br ${feature.gradient}`}
        />
        
        {/* Icon with morph effect */}
        <motion.div
          animate={{ 
            rotate: isHovered ? [0, -5, 5, -5, 0] : 0,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.5 }}
          className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg relative`}
        >
          <feature.icon className="w-10 h-10 text-primary-foreground" />
          
          {/* Icon glow ring */}
          <motion.div
            animate={{ 
              scale: isHovered ? [1, 1.3, 1] : 1,
              opacity: isHovered ? [0.5, 0, 0.5] : 0,
            }}
            transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
            className={`absolute inset-0 rounded-2xl border-2 border-current bg-gradient-to-br ${feature.gradient}`}
          />
        </motion.div>

        {/* Content */}
        <div className="relative z-10">
          <motion.span 
            animate={{ x: isHovered ? 5 : 0 }}
            className="text-sm font-medium text-primary inline-block"
          >
            {feature.subtitle}
          </motion.span>
          <h3 className="font-display text-2xl font-bold mt-1 mb-4">{feature.title}</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">{feature.description}</p>
          
          {/* Stats Badge with animation */}
          <motion.div 
            animate={{ 
              scale: isHovered ? 1.05 : 1,
            }}
            whileHover={{ scale: 1.1 }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${feature.gradient} text-primary-foreground text-sm font-semibold cursor-default`}
          >
            <motion.div
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>
            {feature.stats}
          </motion.div>
        </div>

        {/* Decorative Element with animation */}
        <motion.div 
          animate={{ 
            scale: isHovered ? 1.5 : 1,
            rotate: isHovered ? 45 : 0,
          }}
          transition={{ duration: 0.5 }}
          className={`absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br ${feature.gradient} rounded-full opacity-10`}
        />

        {/* Floating particles on hover */}
        {isHovered && (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: Math.random() * 100 - 50,
                  y: Math.random() * -100,
                }}
                transition={{ 
                  duration: 1,
                  delay: i * 0.1,
                  repeat: Infinity,
                }}
                className={`absolute bottom-1/2 left-1/2 w-2 h-2 rounded-full bg-gradient-to-r ${feature.gradient}`}
              />
            ))}
          </>
        )}
      </motion.div>
    </motion.div>
  );
});

FeatureCard.displayName = 'FeatureCard';

export const FeaturesSection = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="features" className="py-24 relative overflow-hidden bg-background">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <motion.div 
          animate={{ 
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, type: 'spring' as const }}
            className="inline-block px-4 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-4"
          >
            Why Choose Us
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-3xl md:text-5xl font-bold mb-6"
          >
            Powering Your Success with{' '}
            <motion.span 
              animate={{ 
                backgroundPosition: ['0%', '100%', '0%'],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              className="text-gradient-green"
              style={{ backgroundSize: '200% auto' }}
            >
              Excellence
            </motion.span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-muted-foreground"
          >
            We combine innovation, expertise, and commitment to deliver exceptional 
            power solutions that drive your business forward.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} isInView={isInView} />
          ))}
        </div>

        {/* Additional Features with wave animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-6"
        >
          {additionalFeatures.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.5, 
                delay: 1 + index * 0.15,
                type: 'spring' as const,
                stiffness: 150
              }}
              whileHover={{ 
                scale: 1.1, 
                y: -8,
                transition: { duration: 0.2 }
              }}
              className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-muted/50 border border-border hover:border-primary/50 transition-all cursor-default group"
            >
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-12 h-12 rounded-xl bg-gradient-solar flex items-center justify-center group-hover:glow-solar transition-all"
              >
                <item.icon className="w-6 h-6 text-primary-foreground" />
              </motion.div>
              <span className="font-semibold text-lg">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

FeaturesSection.displayName = 'FeaturesSection';

export default FeaturesSection;
