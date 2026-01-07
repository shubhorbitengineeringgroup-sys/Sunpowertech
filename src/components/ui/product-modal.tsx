import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Shield, Settings, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from './button';

interface ProductSpec {
  label: string;
  value: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  categoryLabel: string;
  image: string;
  shortDesc: string;
  description: string;
  longDescription: string;
  features: string[];
  specs: ProductSpec[];
  applications: string;
}

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal = ({ product, isOpen, onClose }: ProductModalProps) => {
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-background rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="grid lg:grid-cols-2 min-h-full">
                {/* Left - Product Image */}
                <div className="bg-gradient-to-br from-primary/10 via-muted to-accent/10 p-8 md:p-12 flex items-center justify-center relative">
                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl" />
                  <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-accent/20 to-transparent rounded-full blur-3xl" />
                  
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="relative"
                  >
                    <div className="absolute -inset-8 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-3xl opacity-50" />
                    <img
                      src={product.image}
                      alt={product.name}
                      className="relative max-w-full max-h-[400px] lg:max-h-[500px] object-contain drop-shadow-2xl"
                    />
                  </motion.div>
                </div>

                {/* Right - Product Details */}
                <div className="p-8 md:p-12 flex flex-col">
                  {/* Category Badge */}
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="mb-4"
                  >
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full">
                      <Zap className="w-4 h-4" />
                      {product.categoryLabel}
                    </span>
                  </motion.div>

                  {/* Title */}
                  <motion.h2
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl md:text-4xl font-bold text-foreground mb-4"
                  >
                    {product.name}
                  </motion.h2>

                  {/* Description */}
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    className="mb-6"
                  >
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {product.description}
                    </p>
                    <p className="text-muted-foreground/80 leading-relaxed text-sm">
                      {product.longDescription}
                    </p>
                  </motion.div>

                  {/* Features */}
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-6"
                  >
                    <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary" />
                      Key Features
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {product.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.35 + index * 0.05 }}
                          className="flex items-start gap-2 text-muted-foreground text-sm"
                        >
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Specifications */}
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mb-6"
                  >
                    <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Settings className="w-5 h-5 text-primary" />
                      Technical Specifications
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {product.specs.map((spec, index) => (
                        <motion.div
                          key={index}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.45 + index * 0.05 }}
                          className="bg-muted/50 rounded-xl p-4 text-center"
                        >
                          <p className="text-primary font-bold text-lg">{spec.value}</p>
                          <p className="text-muted-foreground text-xs mt-1">{spec.label}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Applications */}
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mb-8"
                  >
                    <h3 className="text-lg font-semibold text-foreground mb-2">Applications</h3>
                    <p className="text-muted-foreground text-sm">{product.applications}</p>
                  </motion.div>

                  {/* CTA Buttons */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.55 }}
                    className="flex flex-wrap gap-4 mt-auto"
                  >
                    <Button 
                      className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 gap-2"
                      onClick={() => {
                        onClose();
                        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      <ArrowRight className="w-4 h-4" />
                      Request A Quote
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-primary text-primary hover:bg-primary/10 rounded-full px-8"
                      onClick={() => {
                        onClose();
                        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      Contact Sales
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;