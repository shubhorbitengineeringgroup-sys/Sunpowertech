import { motion } from 'framer-motion';
import { memo } from 'react';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

const TextReveal = memo(({ text, className = '', delay = 0, staggerDelay = 0.03 }: TextRevealProps) => {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: staggerDelay, delayChildren: delay },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="mr-2 inline-block"
          variants={child}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
});

TextReveal.displayName = 'TextReveal';

export default TextReveal;
