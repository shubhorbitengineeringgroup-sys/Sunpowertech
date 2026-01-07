import { motion, AnimatePresence } from 'framer-motion';
import { memo, useEffect, useState } from 'react';

interface AnimatedLoaderProps {
  isLoading?: boolean;
  minDuration?: number;
}

const AnimatedLoader = memo(({ isLoading = true, minDuration = 1500 }: AnimatedLoaderProps) => {
  const [showLoader, setShowLoader] = useState(isLoading);

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
    } else {
      const timer = setTimeout(() => setShowLoader(false), minDuration);
      return () => clearTimeout(timer);
    }
  }, [isLoading, minDuration]);

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
        >
          <div className="relative w-72 h-72 flex items-center justify-center">
            {/* Outer Cosmic Glow */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="absolute w-64 h-64 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255, 223, 0, 0.3) 0%, rgba(255, 165, 0, 0.2) 30%, rgba(255, 69, 0, 0.1) 60%, transparent 80%)',
                filter: 'blur(40px)'
              }}
            />

            {/* Corona Layer with Rotation */}
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.4, 0.6, 0.4],
                rotate: 360
              }}
              transition={{
                scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                opacity: { duration: 2.5, repeat: Infinity },
                rotate: { duration: 20, repeat: Infinity, ease: 'linear' }
              }}
              className="absolute w-48 h-48 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255, 215, 0, 0.5) 0%, rgba(255, 140, 0, 0.3) 40%, rgba(255, 69, 0, 0.15) 70%, transparent 85%)',
                filter: 'blur(25px)'
              }}
            />

            {/* Main Sun Body (Photosphere) */}
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="absolute w-32 h-32 rounded-full overflow-hidden"
              style={{
                background: 'radial-gradient(circle at 35% 35%, #ffeb3b 0%, #ffd700 25%, #ffa500 50%, #ff8c00 75%, #ff6347 100%)',
                boxShadow: '0 0 80px rgba(255, 215, 0, 0.8), 0 0 120px rgba(255, 165, 0, 0.5), inset -15px -15px 50px rgba(255, 99, 71, 0.4)',
              }}
            >
              {/* Surface Granulation/Texture */}
              <motion.div
                animate={{
                  x: [0, -10, 0],
                  y: [0, -10, 0],
                  opacity: [0.4, 0.6, 0.4]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0"
                style={{
                  backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255, 255, 100, 0.3) 0%, transparent 30%), radial-gradient(circle at 60% 60%, rgba(255, 140, 0, 0.4) 0%, transparent 25%), radial-gradient(circle at 80% 20%, rgba(255, 180, 0, 0.3) 0%, transparent 20%)',
                }}
              />

              {/* Solar Surface Details */}
              <motion.div
                animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-1/4 left-1/3 w-8 h-8 rounded-full bg-orange-600/40 blur-md"
              />
              <motion.div
                animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                className="absolute bottom-1/3 right-1/4 w-6 h-6 rounded-full bg-red-600/30 blur-md"
              />
            </motion.div>

            {/* Bright Central Core */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="absolute w-20 h-20 rounded-full"
              style={{
                background: 'radial-gradient(circle, #ffffff 0%, #fffacd 20%, #ffeb3b 40%, rgba(255, 235, 59, 0) 70%)',
                filter: 'blur(12px)'
              }}
            />

            {/* Dynamic Solar Flares */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`flare-${i}`}
                className="absolute w-40 h-2 rounded-full origin-left"
                style={{
                  top: `${30 + i * 20}%`,
                  left: '50%',
                  background: `linear-gradient(to right, rgba(255, 215, 0, 0.8), rgba(255, 140, 0, 0.4), transparent)`,
                  filter: 'blur(6px)',
                  transform: `rotate(${-30 + i * 30}deg)`,
                }}
                animate={{
                  scaleX: [0, 1.5, 0.8, 0],
                  opacity: [0, 0.8, 0.4, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 1.2,
                  ease: 'easeOut'
                }}
              />
            ))}

            {/* Premium Light Rays */}
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={`ray-${i}`}
                className="absolute w-0.5 rounded-full origin-center"
                style={{
                  height: '140px',
                  top: '50%',
                  left: '50%',
                  marginLeft: '-1px',
                  marginTop: '-70px',
                  transformOrigin: '1px 70px',
                  transform: `rotate(${i * 22.5}deg)`,
                  background: i % 2 === 0
                    ? 'linear-gradient(to top, transparent 0%, rgba(255, 215, 0, 0.4) 50%, rgba(255, 215, 0, 0.7) 70%, transparent 100%)'
                    : 'linear-gradient(to top, transparent 0%, rgba(255, 140, 0, 0.3) 50%, rgba(255, 140, 0, 0.6) 70%, transparent 100%)',
                }}
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  scaleY: [1, 1.4, 1],
                }}
                transition={{
                  duration: 2.5 + (i % 4) * 0.5,
                  repeat: Infinity,
                  delay: i * 0.08,
                  ease: 'easeInOut'
                }}
              />
            ))}

            {/* Lens Flare Cross */}
            {[0, 90].map((angle, idx) => (
              <motion.div
                key={`cross-${idx}`}
                className="absolute w-48 h-0.5 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                style={{
                  transform: `rotate(${angle}deg)`,
                  filter: 'blur(3px)'
                }}
                animate={{
                  opacity: [0, 0.5, 0],
                  scaleX: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: idx * 1.5,
                  ease: 'easeInOut'
                }}
              />
            ))}

            {/* Energy Wave Rings */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`wave-${i}`}
                className="absolute rounded-full"
                style={{
                  width: `${40 + i * 20}px`,
                  height: `${40 + i * 20}px`,
                  border: '2px solid rgba(255, 215, 0, 0.3)',
                }}
                animate={{
                  scale: [1, 2.2, 2.5],
                  opacity: [0.7, 0.3, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 1,
                  ease: 'easeOut'
                }}
              />
            ))}

            {/* Ambient Particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  top: '50%',
                  left: '50%',
                  background: i % 2 === 0 ? '#ffd700' : '#ffa500',
                  boxShadow: `0 0 10px ${i % 2 === 0 ? '#ffd700' : '#ffa500'}`,
                }}
                animate={{
                  x: [0, Math.cos(i * 45 * Math.PI / 180) * 100],
                  y: [0, Math.sin(i * 45 * Math.PI / 180) * 100],
                  opacity: [1, 0.5, 0],
                  scale: [0.5, 1.5, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: 'easeOut',
                }}
              />
            ))}

            {/* Loading Text with Glow */}
            <motion.p
              className="absolute -bottom-16 left-1/2 -translate-x-1/2 font-display text-xl font-bold text-gradient-solar whitespace-nowrap"
              style={{
                textShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
              }}
              animate={{
                opacity: [0.6, 1, 0.6],
                textShadow: ['0 0 10px rgba(255, 215, 0, 0.3)', '0 0 30px rgba(255, 215, 0, 0.8)', '0 0 10px rgba(255, 215, 0, 0.3)']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Powering Up...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

AnimatedLoader.displayName = 'AnimatedLoader';

export default AnimatedLoader;
