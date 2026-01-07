import { motion, useInView } from 'framer-motion';
import { useRef, memo, useState } from 'react';
import { CheckCircle2, Clock, MapPin, Building2, Droplets, Zap, Award, Calendar, Factory, Gauge, Waves, Thermometer } from 'lucide-react';

// Import client logos
import bharatSarkarLogo from '@/assets/icons/bharat-sarkar.png';
import centralIndiaLogo from '@/assets/icons/central-india-pvt-ltd.png';
import mpudclLogo from '@/assets/icons/mpudcl-indore-district.png';

const completedWorks = [
  {
    title: 'Kymore & Vijayraghavgarh (Package 5D)',
    client: 'MPUDCL Bhopal',
    location: 'Madhya Pradesh',
    logo: bharatSarkarLogo,
  },
  {
    title: 'Amarpatan & Ramnagar (Package 7D)',
    client: 'MPUDCL Bhopal',
    location: 'Madhya Pradesh',
    logo: bharatSarkarLogo,
  },
  {
    title: 'Harpalpur & Badagaon (Package 6G)',
    client: 'MPUDCL Bhopal',
    location: 'Madhya Pradesh',
    logo: mpudclLogo,
  },
  {
    title: 'Bankhedi Turnkey Project',
    client: 'Central India Pvt Ltd',
    location: 'Madhya Pradesh',
    logo: centralIndiaLogo,
  },
  {
    title: 'KARI & Lidhorakhas Water Meter SITC',
    client: 'Tikamgarh Nagar Parishads',
    location: 'Tikamgarh',
    logo: bharatSarkarLogo,
  },
  {
    title: 'Gangadhar Meher Lift Irrigation Project',
    client: 'WRD Bhopal',
    location: 'Madhya Pradesh',
    logo: bharatSarkarLogo,
  },
];

const milestones = [
  {
    year: '2015',
    title: 'Humidity & Temperature Control System',
    client: 'Prism Cement, Satna',
    description: 'Delivered a humidity and temperature control turnkey automation system, redefining industrial climate regulation.',
    icon: Thermometer,
  },
  {
    year: '2016',
    title: 'RO Plant Automation',
    client: 'Lupin, Mandideep',
    description: 'Executed a turnkey automation project for the reverse osmosis plant enhancing water purity assurance.',
    icon: Droplets,
  },
  {
    year: '2017',
    title: '40 KL Turnkey Automation',
    client: 'Vindhayachal Distillery, Pilukhedi (Bhopal)',
    description: 'Commissioned a 40 KL turnkey automation project, optimising distillery operations with precision control.',
    icon: Factory,
  },
  {
    year: '2018',
    title: '3 MGD Water Treatment Plant',
    client: 'Bhopal Municipal Corporation, Idgah Hills',
    description: 'Implemented a 3 MGD water treatment plant with turnkey automation, raising municipal water reliability.',
    icon: Waves,
  },
  {
    year: '2020',
    title: 'Turnkey Instrumentation',
    client: 'MP Jal Nigam, Punjapura (Neemuch, Badhwani)',
    description: 'Completed a turnkey instrumentation project, strengthening regional water management capacity.',
    icon: Gauge,
  },
  {
    year: '2021',
    title: 'Water Supply Scheme Automation',
    client: 'Indore District (Betma, Gautampura, Depalpur)',
    description: 'Delivered a fully integrated water supply scheme automation, enhancing service delivery accuracy.',
    icon: Droplets,
  },
  {
    year: '2022',
    title: '45 MLD Turnkey Automation',
    client: 'Betul-Bazar, Amla & Sarni Nagar Parishads (MP)',
    description: 'Executed a 45 MLD turnkey automation project, significantly boosting urban water infrastructure.',
    icon: Building2,
  },
  {
    year: '2023',
    title: '7.6 MLD Sewage Treatment Plant',
    client: 'Gobranawapra STP (Raipur, C.G.)',
    description: 'Commissioned a 7.6 MLD sewage treatment plant, advancing environmental compliance through turnkey instrumentation and automation.',
    icon: Waves,
  },
];

const ongoingProjects = [
  {
    title: 'Gandhisagar Package 2',
    description: 'Multi-village water supply scheme automation',
    client: 'MP Jal Nigam - Dilip Buildcon',
    location: 'District Neemach',
    logo: bharatSarkarLogo,
  },
  {
    title: 'Beohari Multi-Village Scheme',
    description: 'Comprehensive village water management system',
    client: 'MP Jal Nigam - Tejas Construction',
    location: 'Shahdol',
    logo: bharatSarkarLogo,
  },
  {
    title: 'Rewa Bansagar Scheme',
    description: 'Large-scale water distribution automation',
    client: 'MP Jal Nigam - Dilip Buildcon',
    location: 'District Rewa',
    logo: bharatSarkarLogo,
  },
  {
    title: 'Pahargarh Multi-Village Scheme',
    description: 'Rural water supply automation project',
    client: 'MP Jal Nigam - KNK Projects',
    location: 'District Rajgarh',
    logo: bharatSarkarLogo,
  },
  {
    title: 'Narmada Gabhir Multi-Village Scheme',
    description: 'Advanced water management for multiple villages',
    client: 'MP Jal Nigam - Dilip Buildcon',
    location: 'District Ujjain',
    logo: bharatSarkarLogo,
  },
  {
    title: 'Gohad Water Supply Scheme',
    description: 'Modern water supply system with full automation',
    client: 'MPUDCL Bhopal - Shree Contractor',
    location: 'Madhya Pradesh',
    logo: mpudclLogo,
  },
];

// Completed Works Card - Enhanced with rare animations
const CompletedWorkCard = memo(({ work, index, isInView }: { work: typeof completedWorks[0]; index: number; isInView: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateX: -20 }}
      animate={isInView ? { opacity: 1, scale: 1, rotateX: 0 } : {}}
      transition={{
        delay: index * 0.12,
        duration: 0.7,
        type: 'spring',
        stiffness: 80
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        scale: 1.03,
        rotateZ: 1,
        transition: { duration: 0.4, type: 'spring' }
      }}
      style={{ transformStyle: 'preserve-3d' }}
      className="relative p-6 rounded-2xl bg-card border-2 border-border hover:border-secondary/50 transition-all h-full flex flex-col group overflow-hidden"
    >
      {/* Holographic Overlay Effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(var(--secondary-rgb),0.15) 25%, rgba(255,255,255,0) 50%, rgba(var(--secondary-rgb),0.15) 75%, rgba(255,255,255,0) 100%)',
          backgroundSize: '400% 400%',
        }}
        animate={isHovered ? {
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        } : {}}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      {/* Morphing Corner Accent */}
      <motion.div
        className="absolute -top-8 -right-8 w-24 h-24 opacity-10"
        animate={{
          borderRadius: ['30% 70% 70% 30% / 30% 30% 70% 70%', '70% 30% 30% 70% / 70% 70% 30% 30%', '30% 70% 70% 30% / 30% 30% 70% 70%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{
          background: 'radial-gradient(circle, var(--secondary) 0%, transparent 70%)'
        }}
      />

      {/* Particle Trail Effect on Hover */}
      {isHovered && (
        <>
          <motion.div
            className="absolute top-1/4 left-1/4 w-1 h-1 bg-secondary rounded-full"
            animate={{
              x: [0, 100, 200],
              y: [0, -50, -100],
              opacity: [1, 0.5, 0],
              scale: [1, 1.5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 0.5
            }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-secondary/60 rounded-full"
            animate={{
              x: [0, -80, -150],
              y: [0, 60, 120],
              opacity: [1, 0.6, 0],
              scale: [1, 2, 0]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: 0.3,
              repeatDelay: 0.5
            }}
          />
        </>
      )}

      {/* Status Badge with Glitch Effect */}
      <motion.span
        initial={{ scale: 0, x: -50 }}
        animate={isInView ? { scale: 1, x: 0 } : {}}
        transition={{ delay: index * 0.12 + 0.3, type: 'spring', stiffness: 150 }}
        className="relative inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold w-fit mb-4 z-10"
      >
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          <CheckCircle2 className="w-3 h-3" />
        </motion.div>
        Completed
        {/* Glitch copies */}
        <span className="absolute inset-0 rounded-full bg-secondary opacity-0 group-hover:opacity-20 blur-sm animate-pulse" />
      </motion.span>

      <motion.h4
        className="font-semibold text-lg mb-4 text-foreground leading-tight flex-grow group-hover:text-secondary transition-colors duration-300 z-10 relative"
        whileHover={{
          textShadow: '0 0 8px rgba(var(--secondary-rgb), 0.5)',
          transition: { duration: 0.3 }
        }}
      >
        {work.title}
      </motion.h4>

      <div className="flex items-end justify-between mt-auto z-10 relative">
        <div className="space-y-2">
          <motion.div
            className="flex items-center gap-2 text-sm text-muted-foreground"
            whileHover={{ x: 8, transition: { type: 'spring', stiffness: 300 } }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            >
              <Building2 className="w-4 h-4 text-primary" />
            </motion.div>
            <span>{work.client}</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-2 text-sm text-muted-foreground"
            whileHover={{ x: 8, transition: { type: 'spring', stiffness: 300 } }}
          >
            <motion.div
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
            >
              <MapPin className="w-4 h-4 text-secondary" />
            </motion.div>
            <span>{work.location}</span>
          </motion.div>
        </div>

        {/* Client Logo with Magnetic Effect */}
        <motion.div
          className="relative w-14 h-14 rounded-full bg-muted/50 flex items-center justify-center p-1 border border-border group-hover:border-secondary/50 transition-colors"
          animate={isHovered ? {
            boxShadow: [
              '0 0 0 0 rgba(var(--secondary-rgb), 0)',
              '0 0 0 8px rgba(var(--secondary-rgb), 0.2)',
              '0 0 0 16px rgba(var(--secondary-rgb), 0)',
            ]
          } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
          whileHover={{
            scale: 1.15,
            rotate: [0, -10, 10, -10, 0],
            transition: { duration: 0.5 }
          }}
        >
          <img
            src={work.logo}
            alt={work.client}
            className="w-full h-full object-contain rounded-full"
          />
          {/* Orbiting Ring */}
          <motion.div
            className="absolute inset-0 border-2 border-secondary/30 rounded-full"
            animate={{
              rotate: 360,
              scale: [1, 1.3, 1]
            }}
            transition={{
              rotate: { duration: 4, repeat: Infinity, ease: 'linear' },
              scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
            }}
            style={{ opacity: isHovered ? 0.6 : 0 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
});

CompletedWorkCard.displayName = 'CompletedWorkCard';

// Milestone Card - Enhanced with unique timeline animations
const MilestoneCard = memo(({ milestone, index, isInView, isLeft }: { milestone: typeof milestones[0]; index: number; isInView: boolean; isLeft: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -80 : 80, rotateY: isLeft ? -15 : 15 }}
      animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
      transition={{
        delay: index * 0.15,
        duration: 0.8,
        type: 'spring',
        stiffness: 60
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative flex items-center w-full md:w-[calc(50%-0px)] ${isLeft ? 'md:mr-auto justify-end md:pr-12' : 'md:ml-auto justify-start md:pl-12'}`}
      style={{ transformStyle: 'preserve-3d', perspective: 1200 }}
    >
      {/* Enhanced Connector Dot with Ripple */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.15 + 0.2, type: 'spring' }}
        className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-[3px] border-primary bg-background z-20 hidden md:block ${isLeft ? '-right-2' : '-left-2'}`}
      >
        {/* Pulsing Ripples */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary"
          animate={{
            scale: [1, 2.5, 2.5],
            opacity: [0.6, 0.2, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 0.5
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary"
          animate={{
            scale: [1, 3.5, 3.5],
            opacity: [0.4, 0.1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 0.5,
            delay: 0.4
          }}
        />
      </motion.div>

      {/* Content Card */}
      <motion.div
        whileHover={{
          y: -8,
          rotateX: 5,
          transition: { duration: 0.4, type: 'spring' }
        }}
        className={`w-full max-w-lg p-7 rounded-[2rem] bg-background border border-primary/20 shadow-sm hover:shadow-2xl hover:border-primary/40 transition-all duration-500 relative overflow-hidden group`}
      >
        {/* Animated liquid morphing background */}
        <motion.div
          className={`absolute w-40 h-40 rounded-full -bottom-10 ${isLeft ? '-left-10' : '-right-10'}`}
          style={{
            background: 'radial-gradient(circle, rgba(var(--primary-rgb), 0.08) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            borderRadius: ['40% 60% 70% 30% / 40% 50% 60% 50%', '60% 40% 30% 70% / 50% 60% 40% 60%', '40% 60% 70% 30% / 40% 50% 60% 50%']
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />

        {/* Ribbon Edge Effect */}
        <motion.div
          className={`absolute top-0 ${isLeft ? 'right-0' : 'left-0'} w-1 h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent`}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scaleY: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />

        {/* Floating Sparkles on Hover */}
        {isHovered && (
          <>
            <motion.div
              className={`absolute top-8 ${isLeft ? 'left-8' : 'right-8'} w-1.5 h-1.5 bg-primary rounded-full`}
              animate={{
                y: [0, -30, -60],
                x: [0, 15, 30],
                opacity: [1, 0.5, 0],
                scale: [1, 1.5, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 0.8
              }}
            />
            <motion.div
              className={`absolute top-16 ${isLeft ? 'left-12' : 'right-12'} w-1 h-1 bg-primary/60 rounded-full`}
              animate={{
                y: [0, -40, -80],
                x: [0, -10, -20],
                opacity: [1, 0.6, 0],
                scale: [1, 2, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0.4,
                repeatDelay: 0.8
              }}
            />
            <motion.div
              className={`absolute top-24 ${isLeft ? 'left-6' : 'right-6'} w-1.5 h-1.5 bg-primary/40 rounded-full`}
              animate={{
                y: [0, -25, -50],
                x: [0, 20, 40],
                opacity: [1, 0.4, 0],
                scale: [1, 1.8, 0]
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                delay: 0.6,
                repeatDelay: 0.8
              }}
            />
          </>
        )}

        <div className={`flex flex-col gap-2 relative z-10 ${isLeft ? 'items-end text-right' : 'items-start text-left'}`}>
          {/* Year Pill with Morphing Border */}
          <motion.div
            className={`relative inline-flex px-4 py-1 rounded-full border border-primary/30 text-primary text-xs font-bold mb-2 overflow-hidden`}
            whileHover={{
              scale: 1.1,
              borderRadius: ['1rem', '0.5rem', '1rem'],
              transition: { duration: 0.6 }
            }}
          >
            {milestone.year}
            {/* Scanning line effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
              animate={{
                x: ['-100%', '200%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
                ease: 'easeInOut'
              }}
            />
          </motion.div>

          <motion.h4
            className="font-display text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300"
            whileHover={{
              scale: 1.02,
              letterSpacing: '0.02em',
              transition: { duration: 0.3 }
            }}
          >
            {milestone.title}
          </motion.h4>

          <motion.p
            className="text-primary font-medium text-sm mb-3"
            animate={isHovered ? {
              x: isLeft ? [-2, 2, -2] : [2, -2, 2]
            } : {}}
            transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0 }}
          >
            {milestone.client}
          </motion.p>

          <motion.p
            className="text-muted-foreground text-sm leading-relaxed max-w-md"
            initial={{ opacity: 0.8 }}
            whileHover={{ opacity: 1 }}
          >
            {milestone.description}
          </motion.p>
        </div>

        {/* Corner Accent Animation */}
        <motion.div
          className={`absolute ${isLeft ? 'top-0 right-0' : 'top-0 left-0'} w-16 h-16`}
          style={{
            background: 'radial-gradient(circle at top right, rgba(var(--primary-rgb), 0.1) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </motion.div>
    </motion.div>
  );
});

MilestoneCard.displayName = 'MilestoneCard';

// Ongoing Project Card - Enhanced with antique rare effects
const OngoingProjectCard = memo(({ project, index, isInView }: { project: typeof ongoingProjects[0]; index: number; isInView: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, rotateY: 20, z: -80 }}
      animate={isInView ? { opacity: 1, scale: 1, rotateY: 0, z: 0 } : {}}
      transition={{
        delay: index * 0.13,
        duration: 0.9,
        type: 'spring',
        stiffness: 65
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        y: -10,
        rotateX: 3,
        rotateZ: -1,
        transition: { duration: 0.4, type: 'spring', stiffness: 200 }
      }}
      style={{ transformStyle: 'preserve-3d', perspective: 1400 }}
      className="relative p-6 rounded-2xl bg-card border-2 border-border hover:border-primary/50 transition-all h-full flex flex-col group overflow-hidden"
    >
      {/* Prism Refraction Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          background: 'linear-gradient(125deg, transparent 0%, rgba(var(--primary-rgb),0.08) 20%, rgba(255,255,255,0.15) 40%, rgba(var(--primary-rgb),0.08) 60%, transparent 80%)',
          backgroundSize: '300% 300%',
        }}
        animate={isHovered ? {
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        } : {}}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      {/* Liquid Morphing Blob */}
      <motion.div
        className="absolute -top-16 -right-16 w-48 h-48 opacity-5"
        animate={{
          scale: [1, 1.4, 1.2, 1],
          rotate: [0, 90, 180, 270, 360],
          borderRadius: [
            '60% 40% 30% 70% / 60% 30% 70% 40%',
            '30% 60% 70% 40% / 50% 60% 30% 60%',
            '40% 60% 60% 40% / 60% 40% 60% 40%',
            '60% 40% 30% 70% / 60% 30% 70% 40%'
          ],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{
          background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
        }}
      />

      {/* Nebula Particle System */}
      {isHovered && (
        <>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              style={{
                top: `${20 + i * 15}%`,
                left: `${10 + i * 20}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50, Math.random() * 150 - 75],
                y: [0, Math.random() * -80 - 40, Math.random() * -120 - 60],
                opacity: [0.8, 0.4, 0],
                scale: [1, 1 + Math.random(), 0]
              }}
              transition={{
                duration: 2 + Math.random(),
                repeat: Infinity,
                delay: i * 0.2,
                repeatDelay: 0.8
              }}
            />
          ))}
        </>
      )}

      {/* Quantum Wave Distortion */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        animate={{
          scaleX: [1, 1.5, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Glitch Grid Overlay */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-5 pointer-events-none rounded-2xl"
        style={{
          backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(var(--primary-rgb), 0.3) 25%, rgba(var(--primary-rgb), 0.3) 26%, transparent 27%, transparent 74%, rgba(var(--primary-rgb), 0.3) 75%, rgba(var(--primary-rgb), 0.3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(var(--primary-rgb), 0.3) 25%, rgba(var(--primary-rgb), 0.3) 26%, transparent 27%, transparent 74%, rgba(var(--primary-rgb), 0.3) 75%, rgba(var(--primary-rgb), 0.3) 76%, transparent 77%, transparent)',
          backgroundSize: '50px 50px',
        }}
        animate={isHovered ? {
          backgroundPosition: ['0px 0px', '25px 25px', '0px 0px'],
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />

      {/* Status Badge with Glitch and Pulse */}
      <motion.span
        initial={{ scale: 0, rotate: -270, x: -100 }}
        animate={isInView ? { scale: 1, rotate: 0, x: 0 } : {}}
        transition={{
          delay: index * 0.13 + 0.4,
          type: 'spring',
          stiffness: 180
        }}
        className="relative inline-flex items-center gap-1 px-3 py-1 rounded-full border border-primary text-primary text-xs font-semibold w-fit mb-4 z-10 overflow-hidden"
      >
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
            opacity: [1, 0.6, 1]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <Clock className="w-3 h-3" />
        </motion.div>
        Ongoing

        {/* Scanning Beam */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
          animate={{
            x: ['-100%', '200%']
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatDelay: 1.5,
            ease: 'easeInOut'
          }}
        />

        {/* Multi-layer Pulse Rings */}
        <span className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-20" />
        <motion.span
          className="absolute inset-0 rounded-full border border-primary"
          animate={{
            scale: [1, 1.5, 1.5],
            opacity: [0.5, 0, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0.5
          }}
        />
      </motion.span>

      <motion.h4
        className="font-semibold text-lg mb-2 text-foreground leading-tight group-hover:text-primary transition-colors duration-300 z-10 relative"
        animate={isHovered ? {
          x: [0, 3, -3, 3, 0],
          textShadow: ['0 0 0px rgba(var(--primary-rgb), 0)', '0 0 12px rgba(var(--primary-rgb), 0.6)', '0 0 0px rgba(var(--primary-rgb), 0)']
        } : {}}
        transition={{
          x: { duration: 0.5, repeat: isHovered ? Infinity : 0 },
          textShadow: { duration: 1.5, repeat: isHovered ? Infinity : 0 }
        }}
      >
        {project.title}
      </motion.h4>

      <motion.p
        className="text-muted-foreground text-sm mb-4 flex-grow z-10 relative"
        initial={{ opacity: 0.85 }}
        whileHover={{ opacity: 1 }}
      >
        {project.description}
      </motion.p>

      <div className="flex items-end justify-between mt-auto z-10 relative">
        <div className="space-y-2">
          <motion.div
            className="flex items-center gap-2 text-sm text-muted-foreground"
            whileHover={{ x: 10, transition: { type: 'spring', stiffness: 400 } }}
          >
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
            >
              <Building2 className="w-4 h-4 text-primary" />
            </motion.div>
            <span>{project.client}</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-2 text-sm text-muted-foreground"
            whileHover={{ x: 10, transition: { type: 'spring', stiffness: 400 } }}
          >
            <motion.div
              animate={{
                y: [0, -3, 0],
                rotate: [0, -10, 10, 0]
              }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.8 }}
            >
              <MapPin className="w-4 h-4 text-secondary" />
            </motion.div>
            <span>{project.location}</span>
          </motion.div>
        </div>

        {/* Client Logo with Orbital System */}
        <motion.div
          className="relative w-14 h-14 rounded-full bg-muted/50 flex items-center justify-center p-1 border border-border group-hover:border-primary/40 transition-colors"
          whileHover={{
            scale: 1.2,
            rotate: [0, -15, 15, -15, 0],
            transition: { duration: 0.6 }
          }}
        >
          {/* Orbiting Particles */}
          {isHovered && (
            <>
              <motion.div
                className="absolute w-2 h-2 bg-primary rounded-full"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                style={{
                  left: 'calc(50% - 4px)',
                  top: '-8px',
                  transformOrigin: '4px calc(50% + 36px)'
                }}
              />
              <motion.div
                className="absolute w-1.5 h-1.5 bg-secondary rounded-full"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: 0.5
                }}
                style={{
                  left: 'calc(50% - 3px)',
                  top: '-12px',
                  transformOrigin: '3px calc(50% + 40px)'
                }}
              />
            </>
          )}

          {/* Expanding Ripples */}
          <motion.div
            className="absolute inset-0 border-2 border-primary/40 rounded-full"
            animate={isHovered ? {
              scale: [1, 1.6, 1.6],
              opacity: [0.6, 0.2, 0]
            } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-0 border-2 border-primary/30 rounded-full"
            animate={isHovered ? {
              scale: [1, 2, 2],
              opacity: [0.4, 0.1, 0]
            } : {}}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          />

          <motion.img
            src={project.logo}
            alt={project.client}
            className="w-full h-full object-contain rounded-full relative z-10"
            animate={isHovered ? {
              filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1)']
            } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </div>

      {/* Corner Sparkle Burst */}
      {isHovered && (
        <>
          <motion.div
            className="absolute top-4 left-4 w-1.5 h-1.5 bg-primary rounded-full"
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 0.5
            }}
          />
          <motion.div
            className="absolute bottom-4 right-4 w-1 h-1 bg-secondary rounded-full"
            animate={{
              scale: [0, 2, 0],
              opacity: [0, 0.8, 0],
              rotate: [0, -180, -360]
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              delay: 0.3,
              repeatDelay: 0.5
            }}
          />
        </>
      )}
    </motion.div>
  );
});

OngoingProjectCard.displayName = 'OngoingProjectCard';

export const ProjectsSection = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Animated background decorations */}
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
        className="absolute top-20 -right-40 w-96 h-96 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          rotate: -360,
          scale: [1.2, 1, 1.2],
        }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-20 -left-40 w-96 h-96 bg-gradient-to-br from-secondary/10 to-transparent rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: 'spring' }}
            className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4"
          >
            Our Projects
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="font-display text-3xl md:text-5xl font-bold mb-6"
          >
            Delivering <span className="text-gradient-solar">Excellence</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground text-lg"
          >
            All executed with PLC, SCADA & Automation Systems
          </motion.p>
        </motion.div>

        {/* Completed Works */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="mb-24"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="flex items-center justify-between mb-8"
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center"
              >
                <CheckCircle2 className="w-5 h-5 text-secondary-foreground" />
              </motion.div>
              <h3 className="font-display text-2xl font-bold">Completed Works</h3>
            </div>
            <span className="px-4 py-1.5 rounded-full border border-secondary text-secondary text-sm font-semibold">
              Delivered
            </span>
          </motion.div>
          <p className="text-muted-foreground mb-8">All Executed with PLC, SCADA & Automation Systems</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedWorks.map((work, index) => (
              <CompletedWorkCard key={work.title} work={work} index={index} isInView={isInView} />
            ))}
          </div>
        </motion.div>

        {/* Milestones - Timeline Style */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="mb-24"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="flex items-center gap-3 mb-8 justify-center"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="w-10 h-10 rounded-xl bg-gradient-solar flex items-center justify-center"
            >
              <Calendar className="w-5 h-5 text-primary-foreground" />
            </motion.div>
            <h3 className="font-display text-2xl font-bold">Our Milestones</h3>
          </motion.div>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12">
            These milestones illustrate our unwavering commitment to scalable turnkey automation solutions, grounded in robust project execution, technological excellence, and enduring impact across industrial, municipal, and water-utility sectors.
          </p>

          {/* Timeline container */}
          <div className="relative max-w-6xl mx-auto px-4 md:px-0">
            {/* Simple Central Vertical Line from Image */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-primary/20 md:-translate-x-1/2 h-full" />

            <div className="space-y-12 md:-space-y-4">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="relative py-4">
                  <MilestoneCard
                    milestone={milestone}
                    index={index}
                    isInView={isInView}
                    isLeft={index % 2 === 0}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Ongoing Projects */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="flex items-center justify-between mb-8"
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center"
              >
                <Clock className="w-5 h-5 text-primary-foreground" />
              </motion.div>
              <h3 className="font-display text-2xl font-bold">Ongoing Projects</h3>
            </div>
            <motion.span
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="px-4 py-1.5 rounded-full border border-primary text-primary text-sm font-semibold"
            >
              In Progress
            </motion.span>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ongoingProjects.map((project, index) => (
              <OngoingProjectCard key={project.title} project={project} index={index} isInView={isInView} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
});

ProjectsSection.displayName = 'ProjectsSection';

export default ProjectsSection;