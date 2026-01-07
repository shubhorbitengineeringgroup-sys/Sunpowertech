import { motion, useInView } from 'framer-motion';
import { useRef, memo } from 'react';
import { Target, Lightbulb, Shield, Leaf, TrendingUp, Globe } from 'lucide-react';

const highlights = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'To deliver innovative power management solutions that optimize efficiency, reduce costs, and promote sustainability.',
  },
  {
    icon: Lightbulb,
    title: 'Our Vision',
    description: 'To be the leading provider of intelligent energy solutions, empowering businesses with smart technology.',
  },
  {
    icon: Shield,
    title: 'Our Promise',
    description: 'We ensure reliability, quality, and excellence in every project we undertake for our valued clients.',
  },
];

const values = [
  { icon: Leaf, label: 'Eco-Friendly', color: 'bg-secondary' },
  { icon: TrendingUp, label: 'Innovation', color: 'bg-primary' },
  { icon: Globe, label: 'Global Reach', color: 'bg-accent' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

export const AboutSection = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-muted/30">
      {/* Animated Background Elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-primary/10 to-transparent pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{ duration: 8, repeat: Infinity, delay: 4 }}
        className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-secondary/10 to-transparent pointer-events-none"
      />

      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, type: 'spring' as const }}
            className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4"
          >
            About Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-3xl md:text-5xl font-bold mb-6"
          >
            Your Partner for{' '}
            <span className="text-gradient-solar">Intelligent Power</span>{' '}
            Management
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-muted-foreground"
          >
            Sun PowerTech Pvt. Ltd. is a premier turnkey solution provider specializing in Power Quality,
            Energy Management, and Industrial Automation. We leverage AI, IoT, and Cloud technologies
            to deliver cutting-edge solutions.
          </motion.p>
        </motion.div>

        {/* Highlights Grid with 3D flip effect */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              whileHover={{
                scale: 1.03,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="group perspective-1000"
            >
              <div className="relative p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 h-full transform-gpu">
                {/* Animated Icon */}
                <motion.div
                  whileHover={{
                    scale: 1.15,
                    rotate: [0, -5, 5, 0]
                  }}
                  transition={{ duration: 0.4 }}
                  className="w-16 h-16 rounded-2xl bg-gradient-solar flex items-center justify-center mb-6 group-hover:glow-solar transition-all"
                >
                  <item.icon className="w-8 h-8 text-primary-foreground" />
                </motion.div>

                {/* Content */}
                <h3 className="font-display text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>

                {/* Animated Hover Glow */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.1 }}
                  className="absolute inset-0 rounded-2xl bg-gradient-solar transition-opacity"
                />

                {/* Corner accent */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.2, type: 'spring' as const }}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-solar rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold"
                >
                  {index + 1}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Values Row with bounce effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {values.map((value, index) => (
            <motion.div
              key={value.label}
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.8 + index * 0.15,
                type: 'spring' as const,
                stiffness: 200
              }}
              whileHover={{
                scale: 1.1,
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="flex items-center gap-3 px-6 py-3 rounded-full bg-card border border-border hover:border-primary/50 transition-all group cursor-default"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className={`w-10 h-10 rounded-full ${value.color} flex items-center justify-center`}
              >
                <value.icon className="w-5 h-5 text-primary-foreground" />
              </motion.div>
              <span className="font-semibold">{value.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Company Info with parallax-like effect */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-border relative overflow-hidden"
        >
          {/* Animated background pattern */}
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          />

          <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
            <div>
              <motion.h3
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.2 }}
                className="font-display text-2xl font-bold mb-4"
              >
                Trusted by Industries Across India
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1.3 }}
                className="text-muted-foreground mb-4"
              >
                From power filtration to energy management systems, we provide comprehensive
                solutions tailored to your specific needs. Our expertise spans multiple sectors
                including manufacturing, healthcare, IT, and more.
              </motion.p>
              <ul className="space-y-2">
                {['AI-Powered Analytics', 'IoT Integration', 'Cloud-Based Monitoring', '24/7 Support'].map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 1.4 + i * 0.1 }}
                    className="flex items-center gap-2 text-sm"
                  >
                    <motion.span
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                      className="w-2 h-2 rounded-full bg-secondary"
                    />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.2, type: 'spring' as const }}
                className="aspect-video rounded-xl bg-gradient-dark flex items-center justify-center overflow-hidden"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="w-32 h-32 border-4 border-dashed border-primary/30 rounded-full flex items-center justify-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-20 h-20 bg-gradient-solar rounded-full flex items-center justify-center glow-solar"
                  >
                    <Leaf className="w-10 h-10 text-primary-foreground" />
                  </motion.div>
                </motion.div>

                {/* Orbiting dots */}
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-secondary rounded-full"
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 4 + i,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    style={{
                      transformOrigin: `${60 + i * 10}px center`,
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';

export default AboutSection;
