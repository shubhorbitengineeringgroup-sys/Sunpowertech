import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { openExternalUrl } from '@/lib/openExternalUrl';
import sunpowerLogo from '@/assets/sunpower-logo.png';

const WHATSAPP_NUMBER = '918817770367';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Features', href: '#features' },
  { name: 'Products', href: '#products' },
  { name: 'Projects', href: '#projects' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Detect active section
      const sections = navLinks.map(link => link.href.replace('#', ''));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-background/90 backdrop-blur-xl shadow-lg border-b border-border/50'
          : 'bg-transparent'
          }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }}
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={sunpowerLogo}
                alt="Sun Power Tech Logo"
                className="h-16 w-auto object-contain"
              />
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link, index) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <motion.button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`px-4 py-2 text-sm font-medium transition-colors relative ${isActive ? 'text-primary' : 'text-primary hover:text-secondary'
                      }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <motion.button
                type="button"
                onClick={() => openExternalUrl(WHATSAPP_URL)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                className="relative flex items-center justify-center w-11 h-11 rounded-full bg-whatsapp text-whatsapp-foreground shadow-lg hover:shadow-xl transition-all"
                title="Chat on WhatsApp"
              >
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-full opacity-30"
                  style={{ boxShadow: '0 0 0 6px hsl(var(--whatsapp) / 0.18)' }}
                  animate={{ scale: [1, 1.08, 1], opacity: [0.25, 0.4, 0.25] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <WhatsAppIcon size={22} className="relative" />
              </motion.button>
              <Button
                onClick={() => scrollToSection('#contact')}
                className="bg-gradient-solar hover:opacity-90 text-primary-foreground font-semibold px-6 shadow-lg hover:shadow-xl transition-all animate-pulse-glow"
              >
                <Phone className="w-4 h-4 mr-2" />
                Get Quote
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-foreground"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-background/95 backdrop-blur-xl pt-24">
              <div className="container mx-auto px-4">
                <div className="flex flex-col gap-2">
                  {navLinks.map((link, index) => {
                    const isActive = activeSection === link.href.replace('#', '');
                    return (
                      <motion.button
                        key={link.name}
                        onClick={() => scrollToSection(link.href)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`text-left px-4 py-4 text-lg font-medium rounded-lg transition-colors relative ${isActive
                          ? 'text-primary bg-primary/10 border-l-4 border-primary'
                          : 'text-primary hover:text-secondary hover:bg-muted/50'
                          }`}
                      >
                        {link.name}
                      </motion.button>
                    );
                  })}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-4 px-4 flex flex-col gap-3"
                  >
                    <motion.button
                      type="button"
                      onClick={() => openExternalUrl(WHATSAPP_URL)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full relative overflow-hidden flex items-center justify-center gap-2 py-4 rounded-lg bg-whatsapp text-whatsapp-foreground font-semibold shadow-lg"
                    >
                      <span className="absolute inset-0 opacity-20 animate-shimmer" />
                      <WhatsAppIcon size={20} className="relative" />
                      <span className="relative">Chat on WhatsApp</span>
                    </motion.button>
                    <Button
                      onClick={() => scrollToSection('#contact')}
                      className="w-full bg-gradient-solar text-primary-foreground font-semibold py-6"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Get Quote
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;