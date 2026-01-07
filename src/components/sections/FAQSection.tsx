import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, memo } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What services does Sun PowerTech provide?',
    answer: 'We provide comprehensive power management solutions including Power Filtration, Power Conditioning, Power Protection, Energy Management Systems, and SCADA solutions for industrial and commercial applications.',
  },
  {
    question: 'How can I get a quote for my project?',
    answer: 'You can contact us through our website form, email us at amittiwari@sunpowertech.net, or call us directly. Our team will assess your requirements and provide a customized quote.',
  },
  {
    question: 'Do you provide installation and maintenance services?',
    answer: 'Yes, we offer complete turnkey solutions including installation, commissioning, and ongoing maintenance support with 24/7 technical assistance.',
  },
  {
    question: 'What industries do you serve?',
    answer: 'We serve various industries including Manufacturing, IT & Data Centers, Healthcare, Commercial Buildings, Pharmaceuticals, and more.',
  },
];

const FAQItem = memo(({ faq, index, isOpen, onToggle, isInView }: {
  faq: typeof faqs[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  isInView: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
    animate={isInView ? { opacity: 1, x: 0 } : {}}
    transition={{ delay: index * 0.1, type: 'spring' as const, stiffness: 100 }}
    className="rounded-2xl border border-border overflow-hidden bg-card group"
  >
    <motion.button
      onClick={onToggle}
      whileHover={{ backgroundColor: 'hsl(var(--muted) / 0.5)' }}
      className="w-full p-6 text-left flex items-center justify-between transition-colors"
    >
      <div className="flex items-center gap-4 pr-4">
        <motion.div
          animate={{
            rotate: isOpen ? 360 : 0,
            scale: isOpen ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
          className="w-10 h-10 rounded-xl bg-gradient-solar flex items-center justify-center shrink-0"
        >
          <HelpCircle className="w-5 h-5 text-primary-foreground" />
        </motion.div>
        <span className="font-semibold text-lg">{faq.question}</span>
      </div>
      <motion.div
        animate={{
          rotate: isOpen ? 180 : 0,
        }}
        transition={{ duration: 0.3, type: 'spring' as const }}
        className="shrink-0"
      >
        <ChevronDown className={`w-5 h-5 transition-colors ${isOpen ? 'text-primary' : ''}`} />
      </motion.div>
    </motion.button>

    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: 'auto',
            opacity: 1,
            transition: {
              height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
              opacity: { duration: 0.25, delay: 0.1 }
            }
          }}
          exit={{
            height: 0,
            opacity: 0,
            transition: {
              height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
              opacity: { duration: 0.2 }
            }
          }}
          className="overflow-hidden"
        >
          <motion.div
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            exit={{ y: -10 }}
            className="px-6 pb-6 text-muted-foreground border-t border-border/50 pt-4 ml-14"
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {faq.answer}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
));

FAQItem.displayName = 'FAQItem';

export const FAQSection = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-background relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-5"
        style={{
          background: 'conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)), hsl(var(--primary)))',
          borderRadius: '50%',
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: 'spring' as const, stiffness: 200 }}
            className="inline-block px-4 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-4"
          >
            FAQ
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="font-display text-3xl md:text-5xl font-bold mb-6"
          >
            Frequently Asked{' '}
            <span className="text-gradient-green">Questions</span>
          </motion.h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Decorative elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-xl"
        />
      </div>
    </section>
  );
});

FAQSection.displayName = 'FAQSection';

export default FAQSection;
