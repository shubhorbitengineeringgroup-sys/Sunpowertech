import { motion, useInView } from 'framer-motion';
import { useRef, useState, memo } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle, Loader2, Sparkles, ArrowRight, ExternalLink, User, MessageSquare, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { openExternalUrl } from '@/lib/openExternalUrl';

const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=B32/A+Priyadarshini+Society+Sant+Asharam+Nagar+Bagsewaniya+Bhopal+462043';

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 8817770367',
    gradient: 'from-primary to-primary/70',
    href: 'tel:+918817770367',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'amittiwari@sunpowertech.net',
    gradient: 'from-secondary to-secondary/70',
    href: 'mailto:amittiwari@sunpowertech.net',
  },
  {
    icon: MapPin,
    label: 'Address',
    value: 'B32/A, Priyadarshini Society, Sant Asharam Nagar, Bagsewaniya, Bhopal 462043',
    gradient: 'from-accent to-accent/70',
    href: GOOGLE_MAPS_URL,
  },
];

const ContactCard = memo(({ item, index, isInView }: { item: typeof contactInfo[0]; index: number; isInView: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={item.href}
      onClick={(e) => {
        if (item.label === 'Address') {
          e.preventDefault();
          openExternalUrl(item.href);
        }
      }}
      target={item.label === 'Address' ? '_blank' : undefined}
      rel={item.label === 'Address' ? 'noopener noreferrer' : undefined}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, type: 'spring' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02, y: -5 }}
      className="flex items-center gap-4 md:gap-5 p-4 md:p-6 rounded-2xl bg-card/50 backdrop-blur-md border border-white/10 hover:border-primary/50 transition-all cursor-pointer group relative overflow-hidden shadow-sm hover:shadow-2xl"
    >
      {/* Animated background */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.1 : 0,
          scale: isHovered ? 1.5 : 1,
        }}
        className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`}
      />

      <motion.div
        animate={{
          rotate: isHovered ? 360 : 0,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.5 }}
        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg relative z-10`}
      >
        <item.icon className="w-6 h-6 text-primary-foreground" />
      </motion.div>
      <div className="flex-1 relative z-10">
        <h3 className="font-semibold text-sm text-muted-foreground mb-1">{item.label}</h3>
        <p className="text-foreground font-medium group-hover:text-primary transition-colors">{item.value}</p>
      </div>

      <motion.div
        animate={{ x: isHovered ? 0 : -10, opacity: isHovered ? 1 : 0 }}
        className="text-primary relative z-10"
      >
        <ArrowRight className="w-5 h-5" />
      </motion.div>
    </motion.a>
  );
});

ContactCard.displayName = 'ContactCard';

export const ContactSection = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch('https://formspree.io/f/xdaanoen', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setIsSuccess(true);
        toast.success('Message sent! We will contact you soon.');
        (e.target as HTMLFormElement).reset();
      } else {
        const data = await response.json();
        if (Object.hasOwnProperty.call(data, 'errors')) {
          toast.error(data.errors.map((error: any) => error.message).join(', '));
        } else {
          toast.error('Oops! There was a problem submitting your form');
        }
      }
    } catch (error) {
      toast.error('Oops! There was a problem submitting your form');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setIsSuccess(false), 3000);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 25, repeat: Infinity }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: 'spring' }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4"
          >
            <Sparkles className="w-4 h-4" />
            Contact Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="font-display text-3xl md:text-5xl font-bold mb-4"
          >
            <span className="text-foreground">Ready to </span>
            <span className="text-gradient-solar">Power Up</span>
            <span className="text-foreground"> Your Business?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground text-lg"
          >
            Get in touch with Sun Power Tech for cutting-edge automation and power solutions
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-4">
            {contactInfo.map((item, index) => (
              <ContactCard key={item.label} item={item} index={index} isInView={isInView} />
            ))}

            {/* Interactive Location Map */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="relative rounded-3xl overflow-hidden border border-border/50 shadow-2xl h-[350px] sm:h-[400px] lg:h-[320px] group isolate"
            >
              {/* Actual Google Map Embed with custom styling */}
              <iframe
                title="Office Location"
                src="https://www.google.com/maps?q=B32/A%20Priyadarshini%20Society%20Sant%20Asharam%20Nagar%20Bagsewaniya%20Bhopal%20462043&z=15&output=embed"
                width="100%"
                height="100%"
                className="absolute inset-0 border-0 contrast-[1.1] grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Premium Overlay UI - Becomes visible on hover */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500" />

              {/* Glassmorphism Header */}
              <div className="absolute top-4 left-4 right-4 pointer-events-none">
                <div className="bg-card/30 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl inline-flex items-center gap-2 shadow-xl">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Live View</span>
                </div>
              </div>

              {/* Bottom Info Card */}
              <div className="absolute bottom-4 left-4 right-4 translate-y-0 sm:translate-y-4 sm:group-hover:translate-y-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-500 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 z-20">
                <div className="bg-card/60 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl w-full sm:max-w-[240px]">
                  <p className="text-white font-bold text-sm mb-1 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    Our Global Office
                  </p>
                  <p className="text-white/80 text-xs leading-relaxed">
                    B32/A, Priyadarshini Society, Sant Asharam Nagar, Bhopal, India
                  </p>
                </div>

                <Button
                  size="sm"
                  variant="secondary"
                  className="rounded-xl shadow-xl hover:scale-105 active:scale-95 transition-all pointer-events-auto bg-primary text-primary-foreground border-0 whitespace-nowrap px-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    openExternalUrl(GOOGLE_MAPS_URL);
                  }}
                >
                  Open Maps
                  <ExternalLink className="w-3 h-3 ml-2" />
                </Button>
              </div>

              {/* Decorative Corner Icon */}
              <div className="absolute top-4 right-4 pointer-events-none transition-transform duration-500 group-hover:rotate-12">
                <div className="w-10 h-10 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
              </div>

              {/* Click Shield - only active when not hovered to allow iframe interaction once focused */}
              <div className="absolute inset-0 bg-transparent group-hover:hidden z-10 pointer-events-none md:pointer-events-auto" />
            </motion.div>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            action="https://formspree.io/f/xdaanoen"
            method="POST"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, type: 'spring' }}
            className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-card/60 backdrop-blur-xl border border-white/10 shadow-2xl space-y-6 md:space-y-8 relative overflow-hidden group/form"
          >
            {/* Decorative background gradients */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover/form:bg-primary/20 transition-colors duration-500" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/10 rounded-full blur-3xl group-hover/form:bg-secondary/20 transition-colors duration-500" />
            {/* Form header */}
            {/* Form header */}
            <div className="mb-8 relative z-10">
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-secondary">
                Send us a message
              </h3>
              <p className="text-muted-foreground text-base">
                Have a project in mind? Fill out the form below and let's create something specific.
              </p>
            </div>

            {/* Success overlay */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isSuccess ? 1 : 0,
                scale: isSuccess ? 1 : 0.8,
              }}
              className="absolute inset-0 bg-card/95 backdrop-blur-sm z-20 flex items-center justify-center"
              style={{ pointerEvents: isSuccess ? 'auto' : 'none' }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: isSuccess ? 1 : 0 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="text-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle className="w-10 h-10 text-secondary" />
                </motion.div>
                <h3 className="font-display text-xl font-bold mb-2">Message Sent!</h3>
                <p className="text-muted-foreground">We'll get back to you soon.</p>
              </motion.div>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6">
              <motion.div
                animate={{ scale: focusedField === 'name' ? 1.02 : 1 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <div className={`absolute left-4 top-3.5 transition-colors duration-300 ${focusedField === 'name' ? 'text-primary' : 'text-muted-foreground'}`}>
                  <User className="w-5 h-5" />
                </div>
                <Input
                  name="name"
                  placeholder="Your Name"
                  required
                  className={`h-12 pl-12 bg-background/50 border-white/10 hover:border-primary/30 transition-all duration-300 ${focusedField === 'name' ? 'border-primary ring-2 ring-primary/20 bg-background' : ''}`}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                />
              </motion.div>
              <motion.div
                animate={{ scale: focusedField === 'email' ? 1.02 : 1 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <div className={`absolute left-4 top-3.5 transition-colors duration-300 ${focusedField === 'email' ? 'text-primary' : 'text-muted-foreground'}`}>
                  <Mail className="w-5 h-5" />
                </div>
                <Input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  required
                  className={`h-12 pl-12 bg-background/50 border-white/10 hover:border-primary/30 transition-all duration-300 ${focusedField === 'email' ? 'border-primary ring-2 ring-primary/20 bg-background' : ''}`}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                />
              </motion.div>
            </div>

            <motion.div
              animate={{ scale: focusedField === 'subject' ? 1.02 : 1 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <div className={`absolute left-4 top-3.5 transition-colors duration-300 ${focusedField === 'subject' ? 'text-primary' : 'text-muted-foreground'}`}>
                <FileText className="w-5 h-5" />
              </div>
              <Input
                name="subject"
                placeholder="Subject"
                required
                className={`h-12 pl-12 bg-background/50 border-white/10 hover:border-primary/30 transition-all duration-300 ${focusedField === 'subject' ? 'border-primary ring-2 ring-primary/20 bg-background' : ''}`}
                onFocus={() => setFocusedField('subject')}
                onBlur={() => setFocusedField(null)}
              />
            </motion.div>

            <motion.div
              animate={{ scale: focusedField === 'message' ? 1.02 : 1 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <div className={`absolute left-4 top-3.5 transition-colors duration-300 ${focusedField === 'message' ? 'text-primary' : 'text-muted-foreground'}`}>
                <MessageSquare className="w-5 h-5" />
              </div>
              <Textarea
                name="message"
                placeholder="Your Message..."
                rows={5}
                required
                className={`pl-12 resize-none bg-background/50 border-white/10 hover:border-primary/30 transition-all duration-300 min-h-[120px] ${focusedField === 'message' ? 'border-primary ring-2 ring-primary/20 bg-background' : ''}`}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="pt-2"
            >
              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="w-full bg-gradient-to-r from-primary via-purple-500 to-secondary text-white font-bold text-lg h-14 rounded-xl shadow-lg hover:shadow-primary/25 relative overflow-hidden transition-all duration-300"
              >
                <motion.span
                  animate={{ x: isSubmitting ? 20 : 0, opacity: isSubmitting ? 0 : 1 }}
                  className="flex items-center justify-center"
                >
                  <Send className="w-4 h-4 mr-2" /> Send Message
                </motion.span>

                {isSubmitting && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </motion.div>
                )}

                {/* Button hover effect */}
                <motion.div
                  className="absolute inset-0 bg-white/10"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
              </Button>
            </motion.div>
          </motion.form>
        </div>
      </div>
    </section >
  );
});

ContactSection.displayName = 'ContactSection';

export default ContactSection;