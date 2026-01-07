import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Zap, ArrowUpRight } from 'lucide-react';
import { memo } from 'react';
import sunpowerLogo from '@/assets/sunpower-logo.png';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { openExternalUrl } from '@/lib/openExternalUrl';

const WHATSAPP_NUMBER = '918817770367';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

const quickLinks = [
  { name: 'About Us', href: '#about' },
  { name: 'Products', href: '#products' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const products = [
  'Power Transfer',
  'EHV Switchgear',
  'MV Switchgear',
  'Drives & Automation',
];

const scrollToSection = (href: string) => {
  const element = document.querySelector(href);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export const Footer = memo(() => {
  return (
    <footer className="bg-gradient-to-br from-muted/50 via-background to-primary/5 text-foreground py-16 relative overflow-hidden border-t border-border/50">
      {/* Animated background */}
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-5"
        style={{
          background: 'conic-gradient(from 0deg, hsl(var(--primary)), transparent, hsl(var(--secondary)), transparent, hsl(var(--primary)))',
          borderRadius: '50%',
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Enhanced Footer Grid with Card Design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-4 gap-8 mb-12"
        >
          {/* Logo & Description - Enhanced Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-1 bg-card/30 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="mb-4"
            >
              <img
                src={sunpowerLogo}
                alt="Sun Power Tech Logo"
                className="h-16 w-auto object-contain"
              />
            </motion.div>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">Your trusted partner for intelligent power management and automation solutions.</p>

            {/* Contact Info - Enhanced */}
            <div className="space-y-3">
              <motion.a
                href="tel:+918817770367"
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 text-sm text-foreground hover:text-primary transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/20 transition-all">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <span className="font-medium">+91 8817770367</span>
              </motion.a>
              <motion.a
                href="mailto:amittiwari@sunpowertech.net"
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 text-sm text-foreground hover:text-primary transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center group-hover:from-secondary/30 group-hover:to-secondary/20 transition-all">
                  <Mail className="w-4 h-4 text-secondary" />
                </div>
                <span className="font-medium">amittiwari@sunpowertech.net</span>
              </motion.a>
              <motion.a
                href="https://www.google.com/maps/search/?api=1&query=B32/A+Priyadarshini+Society+Sant+Asharam+Nagar+Bagsewaniya+Bhopal+462043"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  openExternalUrl('https://www.google.com/maps/search/?api=1&query=B32/A+Priyadarshini+Society+Sant+Asharam+Nagar+Bagsewaniya+Bhopal+462043');
                }}
                whileHover={{ x: 5 }}
                className="flex items-start gap-3 text-sm text-foreground hover:text-primary transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center group-hover:from-accent/30 group-hover:to-accent/20 transition-all flex-shrink-0">
                  <MapPin className="w-4 h-4 text-accent" />
                </div>
                <span className="leading-relaxed font-medium">B32/A, Priyadarshini Society, Sant Asharam Nagar, Bagsewaniya, Bhopal 462043</span>
              </motion.a>

              {/* WhatsApp Button */}
              <motion.button
                type="button"
                onClick={() => openExternalUrl(WHATSAPP_URL)}
                whileHover={{ scale: 1.03, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden flex items-center gap-3 mt-4 px-4 py-3 rounded-xl bg-whatsapp text-whatsapp-foreground font-semibold shadow-lg hover:shadow-xl transition-all group"
              >
                <span className="absolute inset-0 opacity-20 animate-shimmer" />
                <WhatsAppIcon size={20} className="relative" />
                <span className="relative">Chat on WhatsApp</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Quick Links - Card Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-card/20 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/20 transition-all"
          >
            <h4 className="font-display font-bold text-lg mb-6 text-foreground flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((item, idx) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + idx * 0.05 }}
                  whileHover={{ x: 8 }}
                >
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                    {item.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Products - Card Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-card/20 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-secondary/20 transition-all"
          >
            <h4 className="font-display font-bold text-lg mb-6 text-foreground flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-secondary to-accent rounded-full" />
              Products
            </h4>
            <ul className="space-y-3">
              {products.map((item, idx) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + idx * 0.05 }}
                  whileHover={{ x: 8 }}
                >
                  <button
                    onClick={() => scrollToSection('#products')}
                    className="text-sm text-muted-foreground hover:text-secondary transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary/50 group-hover:bg-secondary transition-colors" />
                    {item}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services - Card Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-card/20 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-accent/20 transition-all"
          >
            <h4 className="font-display font-bold text-lg mb-6 text-foreground flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-accent to-primary rounded-full" />
              Our Services
            </h4>
            <ul className="space-y-3">
              {['PLC & SCADA', 'Automation Systems', 'Turnkey Projects', 'Water Treatment'].map((item, idx) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + idx * 0.05 }}
                  whileHover={{ x: 8 }}
                >
                  <button
                    onClick={() => scrollToSection('#features')}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/50 group-hover:bg-accent transition-colors" />
                    {item}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Simple Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border-t border-border/50 my-8"
        />

        {/* Simple Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center py-6"
        >
          <p className="text-sm text-muted-foreground">
            © 2026 Sun Power Tech. All rights reserved.
          </p>
        </motion.div>

        {/* Floating decorative elements */}
        <motion.div
          animate={{
            y: [-8, 8, -8],
            rotate: [0, 180, 360],
            opacity: [0.15, 0.35, 0.15]
          }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute bottom-16 right-12 pointer-events-none"
        >
          <div className="w-8 h-8 rounded-full border-2 border-primary/20 flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary/30" />
          </div>
        </motion.div>

        <motion.div
          animate={{
            y: [-6, 6, -6],
            rotate: [0, -180, -360],
            opacity: [0.15, 0.3, 0.15]
          }}
          transition={{ duration: 7, repeat: Infinity, delay: 1 }}
          className="absolute bottom-16 left-12 pointer-events-none"
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-secondary/20 to-primary/20" />
        </motion.div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;