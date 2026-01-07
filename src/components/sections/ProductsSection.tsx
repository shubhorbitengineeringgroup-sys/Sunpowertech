import { useState, useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Zap, Shield, Settings, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductModal } from '@/components/ui/product-modal';

// Power Transfer and Reactors
import autoTransformersImg from '@/assets/products/auto-transformers.png';
import chlorinatorImg from '@/assets/products/chlorinator.jpeg';
import furnaceTransformerImg from '@/assets/products/furnace-transformer.jpg';
import locomotiveTransformerImg from '@/assets/products/locomotive-transformer.png';
import shuntReactorsImg from '@/assets/products/shunt-reactors.png';

// Distribution Transformers
import distributionTransformerImg from '@/assets/products/distribution-transformer.jpg';

// EHV Switchgear
import aisSf6Img from '@/assets/products/ais-sf6-circuit-breaker-up-to-800kv.png';
import disconnectorImg from '@/assets/products/disconnector.png';
import gis245Img from '@/assets/products/gis-up-to-245-kv.png';

// MV Switchgear
import ais40Img from '@/assets/products/ais-up-to-40.5-kv.png';
import gis66Img from '@/assets/products/gis-up-to-66-kv-1.jpg';
import numericRelayImg from '@/assets/products/numeric-protection-relay-scada-640x495.png';
import rmuImg from '@/assets/products/rmu-up-to-36-kv.png';
import vacuumInterrupterImg from '@/assets/products/vaccum-interrupter.jpg';

// Drives & Automation
import blowerImg from '@/assets/products/blower.jpg';
import centrifugeImg from '@/assets/products/centrifuge.jpg';
import compressorImg from '@/assets/products/compress.jpg';
import cranesImg from '@/assets/products/cranes.jpg';
import crushersImg from '@/assets/products/crushers-640x506.jpg';
import fansImg from '@/assets/products/fan-product-640x640.jpg';
import liftsImg from '@/assets/products/lifts-960x960.jpg';
import millsImg from '@/assets/products/mills.jpg';
import mixerImg from '@/assets/products/mixer.jpg';
import plcImg from '@/assets/products/plc-640x640.webp';
import pumpsImg from '@/assets/products/pumps-640x563.webp';
import wasteWaterImg from '@/assets/products/waste-water.jpg';

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'power-transfer', name: 'Power Transfer & Reactors' },
  { id: 'distribution', name: 'Distribution Transformers' },
  { id: 'ehv-switchgear', name: 'EHV Switchgear' },
  { id: 'mv-switchgear', name: 'MV Switchgear' },
  { id: 'drives-automation', name: 'Drives & Automation' },
];

const products = [
  // Power Transfer and Reactors (5 products)
  {
    id: 1,
    name: 'Auto Transformers',
    category: 'power-transfer',
    categoryLabel: 'Power Transfer & Reactors',
    image: autoTransformersImg,
    shortDesc: 'High-efficiency voltage conversion for power transmission systems.',
    description: 'Auto Transformers are frequently used in power applications to interconnect systems operating at different voltage classes, for example 400 kV to 220 kV for transmission. They are also often used for providing conversions between the two common domestic main voltage bands in the world (400, 200, 66 kV).',
    longDescription: 'The links between the UK 400 kV and 275 kV SuperGrid networks are normally three-phase autotransformers with taps at the common neutral end. Autotransformers are built with common main winding and a separate low voltage winding. For long distance rural power distribution lines, special autotransformers with automatic tap-changing equipment are inserted as voltage regulators.',
    features: [
      'Better short circuit strength',
      'Compact design',
      'Durability',
      'Optimum losses',
      'KEMA Tested',
      'Epoxy bonded CTC for improved short circuit withstand'
    ],
    specs: [
      { label: 'Voltage', value: '132 to 765 kV' },
      { label: 'Ratings', value: '50 to 1500 MVA' },
      { label: 'Standard', value: 'ANSI' }
    ],
    applications: 'Power transmission, Grid interconnection, Voltage regulation for rural distribution, SuperGrid networks'
  },
  {
    id: 2,
    name: 'Chlorinator',
    category: 'power-transfer',
    categoryLabel: 'Power Transfer & Reactors',
    image: chlorinatorImg,
    shortDesc: 'Advanced water treatment solutions for safe drinking water.',
    description: 'Chlorinator adds chlorine to drinking water to eliminate parasites, bacteria and viruses. Chlorinators are also used for swimming pool water, odor control of slime and marine growths in cooling water towers, circulating water and in service water systems.',
    longDescription: 'Our chlorinators ensure safe and effective water treatment across various applications. From municipal water supplies to industrial cooling systems, these units deliver precise chlorine dosing for optimal disinfection results with advanced safety features.',
    features: [
      'Precise chlorine dosing',
      'Automated control systems',
      'Corrosion resistant materials',
      'Low maintenance design',
      'Safety interlocks included',
      'Digital monitoring capability'
    ],
    specs: [
      { label: 'Capacity', value: 'Custom range' },
      { label: 'Control', value: 'Automated' },
      { label: 'Application', value: 'Industrial & Municipal' }
    ],
    applications: 'Drinking water treatment, Swimming pools, Cooling towers, Industrial water systems, Marine applications'
  },
  {
    id: 3,
    name: 'Furnace Transformers',
    category: 'power-transfer',
    categoryLabel: 'Power Transfer & Reactors',
    image: furnaceTransformerImg,
    shortDesc: 'Heavy-duty power solutions for arc and induction furnaces.',
    description: 'Furnace Transformers are specially designed to handle the heavy-duty electrical loads required in arc furnaces and induction furnaces. They ensure stable power supply, high efficiency, and durability under extreme operating conditions.',
    longDescription: 'Our furnace transformers are engineered for the most demanding industrial applications. With robust construction and advanced cooling systems, they deliver consistent performance in steel mills, foundries, and other high-temperature manufacturing environments with minimal maintenance requirements.',
    features: [
      'Heavy-duty construction',
      'Advanced cooling systems',
      'High overload capacity',
      'Stable voltage regulation',
      'Extended operational life',
      'Low maintenance requirements'
    ],
    specs: [
      { label: 'Type', value: 'Arc & Induction' },
      { label: 'Duty', value: 'Heavy Industrial' },
      { label: 'Cooling', value: 'ONAN/ONAF' }
    ],
    applications: 'Steel manufacturing, Foundries, Metal processing, Industrial heating, Smelting operations'
  },
  {
    id: 4,
    name: 'Locomotive & Trackside Transformers',
    category: 'power-transfer',
    categoryLabel: 'Power Transfer & Reactors',
    image: locomotiveTransformerImg,
    shortDesc: 'Reliable power solutions for railway operations.',
    description: 'Locomotive and Trackside Power Transformers provide reliable and efficient power solutions for railway operations. They are engineered to withstand dynamic loads, ensure smooth traction, and support continuous, safe rail network performance.',
    longDescription: 'Designed specifically for the demanding railway environment, these transformers handle the unique challenges of traction power systems. From high-speed trains to metro networks, our solutions ensure uninterrupted power delivery with robust vibration resistance.',
    features: [
      'Dynamic load handling',
      'Vibration resistant design',
      'Compact footprint',
      'High efficiency ratings',
      'Weather resistant enclosure',
      'Quick fault recovery'
    ],
    specs: [
      { label: 'Application', value: 'Railway Traction' },
      { label: 'Design', value: 'Compact & Robust' },
      { label: 'Performance', value: 'High Efficiency' }
    ],
    applications: 'Electric locomotives, Metro systems, High-speed rail, Trackside substations, Railway electrification'
  },
  {
    id: 5,
    name: 'Shunt Reactors',
    category: 'power-transfer',
    categoryLabel: 'Power Transfer & Reactors',
    image: shuntReactorsImg,
    shortDesc: 'Grid stability solutions for high-voltage transmission.',
    description: 'Shunt Reactors are used to improve power system stability by absorbing excess reactive power in high-voltage transmission lines. They enhance voltage regulation, reduce losses, and ensure efficient grid performance.',
    longDescription: 'Essential components for modern power grids, shunt reactors manage reactive power to maintain voltage stability across long transmission distances. They prevent over-voltage conditions and optimize power flow efficiency with low-noise operation.',
    features: [
      'Reactive power compensation',
      'Voltage stabilization',
      'Low noise operation',
      'Oil-immersed design',
      'Gapped core technology',
      'Extended service intervals'
    ],
    specs: [
      { label: 'Voltage', value: 'Up to 765 kV' },
      { label: 'Type', value: 'Oil Immersed' },
      { label: 'Core', value: 'Gapped Design' }
    ],
    applications: 'High-voltage transmission, Grid stabilization, Reactive power management, Long transmission lines'
  },

  // Distribution Transformers (1 product)
  {
    id: 6,
    name: 'Distribution Transformers',
    category: 'distribution',
    categoryLabel: 'Distribution Transformers',
    image: distributionTransformerImg,
    shortDesc: 'Essential electrical devices for safe voltage distribution.',
    description: 'Distribution Transformer is an essential electrical device used to step down the high voltage from power transmission lines to a lower voltage suitable for safe use in homes, offices, and industries.',
    longDescription: 'It ensures efficient distribution of electricity at the consumer level while minimizing power losses. These transformers are generally installed on poles, pads, or substations and play a vital role in providing reliable and continuous power supply in the distribution network. They are designed for maximum efficiency and long operational life.',
    features: [
      'High efficiency design',
      'Low power losses',
      'Pole/Pad mountable',
      'Weather resistant',
      'Long operational life',
      'Minimal maintenance required'
    ],
    specs: [
      { label: 'Voltage', value: '11kV to 33kV' },
      { label: 'Installation', value: 'Pole/Pad/Substation' },
      { label: 'Efficiency', value: '98%+' }
    ],
    applications: 'Residential distribution, Commercial buildings, Industrial facilities, Rural electrification, Urban substations'
  },

  // EHV Switchgear (3 products)
  {
    id: 7,
    name: 'AIS (SF6) Circuit Breaker Up To 800 kV',
    category: 'ehv-switchgear',
    categoryLabel: 'EHV Switchgear',
    image: aisSf6Img,
    shortDesc: 'High-voltage switching device for air-insulated substations.',
    description: 'AIS (Air Insulated Substation) SF₆ Circuit Breaker up to 800 kV is a high-voltage switching device used in air-insulated substations to control, protect, and isolate electrical equipment in transmission networks.',
    longDescription: 'It utilizes sulfur hexafluoride (SF₆) gas as the insulating and arc-quenching medium, which provides excellent dielectric strength and high interrupting capability, enabling safe and reliable operation even at ultra-high voltages like 800 kV. This technology ensures minimal footprint and maximum reliability.',
    features: [
      'SF₆ gas insulation',
      'High interrupting capability',
      'Excellent dielectric strength',
      'Ultra-high voltage rated',
      'Reliable arc quenching',
      'Compact design'
    ],
    specs: [
      { label: 'Voltage', value: 'Up to 800 kV' },
      { label: 'Insulation', value: 'SF₆ Gas' },
      { label: 'Type', value: 'Air Insulated' }
    ],
    applications: 'Transmission networks, Air-insulated substations, Grid protection, Power system switching'
  },
  {
    id: 8,
    name: 'Disconnector',
    category: 'ehv-switchgear',
    categoryLabel: 'EHV Switchgear',
    image: disconnectorImg,
    shortDesc: 'High-voltage switching devices for safe equipment isolation.',
    description: 'Disconnectors are high-voltage switching devices used to safely isolate electrical equipment for maintenance or inspection. They ensure operational safety, reliability, and uninterrupted power system performance.',
    longDescription: 'These devices are essential components in substations and transmission networks, providing visible isolation points for maintenance crews. They are designed for reliable operation in harsh environments and comply with international safety standards.',
    features: [
      'Safe isolation capability',
      'Visible break points',
      'High reliability',
      'Weather resistant',
      'Low maintenance',
      'International standards compliant'
    ],
    specs: [
      { label: 'Voltage', value: 'Up to 800 kV' },
      { label: 'Operation', value: 'Manual/Motorized' },
      { label: 'Type', value: 'Center/Pantograph' }
    ],
    applications: 'Substations, Transmission lines, Equipment isolation, Maintenance safety, Grid operations'
  },
  {
    id: 9,
    name: 'GIS Up To 245 kV',
    category: 'ehv-switchgear',
    categoryLabel: 'EHV Switchgear',
    image: gis245Img,
    shortDesc: 'Compact high-voltage substations with SF₆ gas insulation.',
    description: 'Gas Insulated Substation (GIS) up to 245 kV is a compact, high-voltage substation that uses SF₆ gas as the primary insulating and arc-quenching medium instead of air.',
    longDescription: 'This allows significant reduction in size compared to conventional air-insulated substations. GIS technology up to 245 kV is commonly applied in urban, industrial, and space-constrained areas where reliability, safety, and minimal footprint are critical requirements.',
    features: [
      'Compact footprint',
      'SF₆ gas insulated',
      'High reliability',
      'Minimal maintenance',
      'Weather independent',
      'Extended service life'
    ],
    specs: [
      { label: 'Voltage', value: 'Up to 245 kV' },
      { label: 'Insulation', value: 'SF₆ Gas' },
      { label: 'Design', value: 'Compact/Modular' }
    ],
    applications: 'Urban substations, Industrial areas, Space-constrained locations, Underground installations'
  },

  // MV Switchgear (5 products)
  {
    id: 10,
    name: 'AIS Up To 40.5 kV',
    category: 'mv-switchgear',
    categoryLabel: 'MV Switchgear',
    image: ais40Img,
    shortDesc: 'Safe and reliable medium-voltage power distribution.',
    description: 'AIS up to 40.5 kV (Air Insulated Switchgear) delivers safe, reliable, and cost-effective power distribution. Designed for medium-voltage networks, it ensures efficient operation, easy maintenance, and long service life.',
    longDescription: 'Our air-insulated switchgear solutions provide robust protection for medium-voltage networks with proven technology. They offer excellent value while maintaining high safety standards and easy serviceability for maintenance teams.',
    features: [
      'Cost-effective design',
      'Easy maintenance',
      'Reliable operation',
      'Long service life',
      'Safe switching',
      'Proven technology'
    ],
    specs: [
      { label: 'Voltage', value: 'Up to 40.5 kV' },
      { label: 'Type', value: 'Air Insulated' },
      { label: 'Application', value: 'Medium Voltage' }
    ],
    applications: 'Medium-voltage networks, Industrial distribution, Commercial buildings, Utility substations'
  },
  {
    id: 11,
    name: 'GIS Up To 66 kV',
    category: 'mv-switchgear',
    categoryLabel: 'MV Switchgear',
    image: gis66Img,
    shortDesc: 'Compact and reliable gas-insulated switchgear solutions.',
    description: 'GIS up to 66 kV (Gas Insulated Switchgear) offers compact, reliable, and high-performance power distribution. With minimal space requirements and enhanced safety, it ensures efficient operation and long-term reliability.',
    longDescription: 'Ideal for demanding environments where space is at a premium, our GIS solutions combine SF₆ gas technology with modular design for maximum flexibility. They require minimal maintenance and provide decades of reliable service.',
    features: [
      'Minimal space requirement',
      'Enhanced safety features',
      'High performance',
      'Long-term reliability',
      'Modular design',
      'Low maintenance'
    ],
    specs: [
      { label: 'Voltage', value: 'Up to 66 kV' },
      { label: 'Insulation', value: 'SF₆ Gas' },
      { label: 'Design', value: 'Compact/Modular' }
    ],
    applications: 'Industrial facilities, Commercial complexes, Urban distribution, Mining operations'
  },
  {
    id: 12,
    name: 'Numeric Protection Relay & SCADA',
    category: 'mv-switchgear',
    categoryLabel: 'MV Switchgear',
    image: numericRelayImg,
    shortDesc: 'Intelligent monitoring and control for power systems.',
    description: 'Numeric Protection Relays and SCADA provide intelligent monitoring and control for power systems. They ensure fast fault detection, reliable protection, and real-time data management for efficient and secure grid operations.',
    longDescription: 'Our advanced protection relay and SCADA systems offer comprehensive grid management capabilities. With high-speed communication protocols and user-friendly interfaces, they enable operators to monitor and control power systems with precision.',
    features: [
      'Fast fault detection',
      'Real-time monitoring',
      'Remote control capability',
      'Data logging & analysis',
      'Multiple protocol support',
      'User-friendly interface'
    ],
    specs: [
      { label: 'Communication', value: 'IEC 61850/Modbus' },
      { label: 'Protection', value: 'Multi-function' },
      { label: 'Monitoring', value: 'Real-time' }
    ],
    applications: 'Grid automation, Substation control, Power system protection, Remote monitoring, Energy management'
  },
  {
    id: 13,
    name: 'RMU Up To 36 kV',
    category: 'mv-switchgear',
    categoryLabel: 'MV Switchgear',
    image: rmuImg,
    shortDesc: 'Compact ring main units for safe power distribution.',
    description: 'RMU up to 36 kV (Ring Main Unit) offers safe, compact, and reliable medium-voltage power distribution. It ensures uninterrupted supply, easy maintenance, and enhanced operational safety.',
    longDescription: 'Ring Main Units are essential components for urban and industrial distribution networks. Our RMU solutions provide flexible configuration options, ensuring reliable power supply with quick fault isolation capabilities for network resilience.',
    features: [
      'Compact design',
      'Reliable switching',
      'Quick fault isolation',
      'Easy maintenance',
      'Flexible configuration',
      'Enhanced safety'
    ],
    specs: [
      { label: 'Voltage', value: 'Up to 36 kV' },
      { label: 'Type', value: 'Ring Main Unit' },
      { label: 'Insulation', value: 'SF₆/Solid' }
    ],
    applications: 'Urban networks, Industrial distribution, Commercial areas, Renewable energy integration'
  },
  {
    id: 14,
    name: 'Vacuum Interrupter',
    category: 'mv-switchgear',
    categoryLabel: 'MV Switchgear',
    image: vacuumInterrupterImg,
    shortDesc: 'High-performance switching for medium and high-voltage systems.',
    description: 'Vacuum Interrupters are high-performance switching devices used to interrupt electrical currents safely in medium and high-voltage systems. They ensure reliable operation, long service life, and minimal maintenance.',
    longDescription: 'Our vacuum interrupters utilize advanced vacuum technology for clean and efficient current interruption. With no arc products or gases, they provide environmentally friendly switching with exceptional reliability and longevity.',
    features: [
      'Clean current interruption',
      'Environmentally friendly',
      'Long service life',
      'Minimal maintenance',
      'High reliability',
      'Fast operation'
    ],
    specs: [
      { label: 'Voltage', value: 'Up to 40.5 kV' },
      { label: 'Technology', value: 'Vacuum' },
      { label: 'Life', value: '30,000+ operations' }
    ],
    applications: 'Circuit breakers, Contactors, Load switches, Reclosers, Motor controllers'
  },

  // Drives & Automation (12 products)
  {
    id: 15,
    name: 'Blowers',
    category: 'drives-automation',
    categoryLabel: 'Drives & Automation',
    image: blowerImg,
    shortDesc: 'Essential equipment for forced air circulation in industrial systems.',
    description: 'Blowers are essential equipment for forced air circulation in industrial systems, ensuring efficient cooling, ventilation, and optimal performance of electrical and mechanical installations.',
    longDescription: 'Our industrial blowers are designed for continuous operation in demanding environments. They provide reliable airflow for cooling systems, pneumatic conveying, and ventilation applications with energy-efficient performance.',
    features: [
      'High airflow capacity',
      'Energy efficient',
      'Low noise operation',
      'Robust construction',
      'Variable speed options',
      'Easy maintenance'
    ],
    specs: [
      { label: 'Type', value: 'Centrifugal/Positive' },
      { label: 'Application', value: 'Industrial' },
      { label: 'Control', value: 'VFD Compatible' }
    ],
    applications: 'Cooling systems, Ventilation, Pneumatic conveying, Industrial processes, HVAC systems'
  },
  {
    id: 16,
    name: 'Centrifuges',
    category: 'drives-automation',
    categoryLabel: 'Drives & Automation',
    image: centrifugeImg,
    shortDesc: 'Precision machines for rapid separation of liquids and solids.',
    description: 'Centrifuges are precision machines designed for rapid separation of liquids and solids, ensuring high efficiency, reliability, and consistent performance in industrial and laboratory applications.',
    longDescription: 'Our centrifuge solutions offer advanced separation technology for various industries. From pharmaceutical to food processing, they deliver precise separation results with automated controls and safety features.',
    features: [
      'High-speed separation',
      'Precision control',
      'Automated operation',
      'Safety interlocks',
      'Easy cleaning',
      'Multiple configurations'
    ],
    specs: [
      { label: 'Speed', value: 'Up to 15,000 RPM' },
      { label: 'Control', value: 'PLC/HMI' },
      { label: 'Material', value: 'SS316/SS304' }
    ],
    applications: 'Pharmaceutical, Food processing, Chemical industry, Wastewater treatment, Oil & gas'
  },
  {
    id: 17,
    name: 'Compressors',
    category: 'drives-automation',
    categoryLabel: 'Drives & Automation',
    image: compressorImg,
    shortDesc: 'Critical equipment for high-pressure air or gas supply.',
    description: 'Compressors are critical equipment that provide high-pressure air or gas for industrial processes, ensuring efficient operation, reliability, and optimal system performance.',
    longDescription: 'Our compressor range includes rotary screw, reciprocating, and centrifugal types for various applications. They feature advanced controls for energy optimization and reliable operation in continuous industrial use.',
    features: [
      'High pressure capability',
      'Energy efficient motors',
      'Advanced controls',
      'Low vibration',
      'Oil-free options',
      'Remote monitoring'
    ],
    specs: [
      { label: 'Pressure', value: 'Up to 500 bar' },
      { label: 'Type', value: 'Screw/Reciprocating' },
      { label: 'Drive', value: 'Electric/Diesel' }
    ],
    applications: 'Manufacturing, Mining, Oil & gas, Food & beverage, Pharmaceutical'
  },
  {
    id: 18,
    name: 'Cranes',
    category: 'drives-automation',
    categoryLabel: 'Drives & Automation',
    image: cranesImg,
    shortDesc: 'Robust lifting solutions for heavy load handling.',
    description: 'Cranes are robust lifting solutions designed for safe and efficient handling of heavy loads in industrial and construction environments, ensuring precision, reliability, and operational safety.',
    longDescription: 'Our crane solutions range from overhead bridge cranes to gantry and jib cranes. They feature advanced safety systems, precision controls, and robust construction for demanding material handling applications.',
    features: [
      'Heavy lifting capacity',
      'Precision controls',
      'Advanced safety systems',
      'Variable speed drives',
      'Anti-collision systems',
      'Remote operation'
    ],
    specs: [
      { label: 'Capacity', value: 'Up to 500 tons' },
      { label: 'Type', value: 'EOT/Gantry/Jib' },
      { label: 'Control', value: 'Pendant/Radio' }
    ],
    applications: 'Steel plants, Warehouses, Ports, Manufacturing, Construction sites'
  },
  {
    id: 19,
    name: 'Crushers',
    category: 'drives-automation',
    categoryLabel: 'Drives & Automation',
    image: crushersImg,
    shortDesc: 'Heavy-duty machines for efficient material processing.',
    description: 'Crushers are heavy-duty machines engineered to break down rocks, ores, and other materials efficiently. They ensure high productivity, durability, and consistent performance in industrial applications.',
    longDescription: 'Our crusher range includes jaw, cone, impact, and gyratory types for various crushing applications. They feature wear-resistant components, hydraulic adjustment, and automation for optimal crushing efficiency.',
    features: [
      'High crushing capacity',
      'Wear-resistant materials',
      'Hydraulic adjustment',
      'Automated control',
      'Easy maintenance',
      'Multiple size options'
    ],
    specs: [
      { label: 'Type', value: 'Jaw/Cone/Impact' },
      { label: 'Capacity', value: 'Up to 2000 TPH' },
      { label: 'Feed Size', value: 'Up to 1500mm' }
    ],
    applications: 'Mining, Quarrying, Recycling, Aggregate production, Cement industry'
  },
  {
    id: 20,
    name: 'Fans',
    category: 'drives-automation',
    categoryLabel: 'Drives & Automation',
    image: fansImg,
    shortDesc: 'Essential devices for effective air circulation and cooling.',
    description: 'Fans are essential devices for effective air circulation, cooling, and ventilation in industrial and commercial environments, ensuring optimal performance and energy efficiency.',
    longDescription: 'Our industrial fan range includes axial, centrifugal, and mixed-flow designs for various applications. They feature aerodynamic blade designs, energy-efficient motors, and variable speed controls for optimized airflow.',
    features: [
      'High airflow efficiency',
      'Energy efficient motors',
      'Low noise design',
      'Corrosion resistant',
      'Variable speed control',
      'Multiple mounting options'
    ],
    specs: [
      { label: 'Type', value: 'Axial/Centrifugal' },
      { label: 'Flow', value: 'Up to 500,000 CFM' },
      { label: 'Control', value: 'VFD/DOL' }
    ],
    applications: 'HVAC systems, Industrial ventilation, Cooling towers, Process cooling, Exhaust systems'
  },
  {
    id: 21,
    name: 'Lifts',
    category: 'drives-automation',
    categoryLabel: 'Drives & Automation',
    image: liftsImg,
    shortDesc: 'Reliable vertical transportation solutions for buildings.',
    description: 'Lifts are reliable vertical transportation solutions designed for safe, efficient, and smooth movement of people and goods in commercial and industrial buildings.',
    longDescription: 'Our lift solutions include passenger, freight, and specialized industrial elevators. They feature advanced safety systems, energy-efficient drives, and smart controls for optimal vertical transportation.',
    features: [
      'Smooth operation',
      'Energy efficient drives',
      'Advanced safety systems',
      'Smart controls',
      'Emergency backup',
      'Customizable cabins'
    ],
    specs: [
      { label: 'Capacity', value: 'Up to 10,000 kg' },
      { label: 'Speed', value: 'Up to 6 m/s' },
      { label: 'Type', value: 'Traction/Hydraulic' }
    ],
    applications: 'Commercial buildings, Industrial facilities, Warehouses, Shopping malls, Hospitals'
  },
  {
    id: 22,
    name: 'Mills',
    category: 'drives-automation',
    categoryLabel: 'Drives & Automation',
    image: millsImg,
    shortDesc: 'Heavy-duty machines for grinding and processing materials.',
    description: 'Mills are heavy-duty machines designed for grinding, crushing, or processing raw materials efficiently. They ensure high productivity, durability, and consistent performance in industrial operations.',
    longDescription: 'Our mill range includes ball mills, SAG mills, vertical roller mills, and hammer mills for various grinding applications. They feature advanced wear protection, automated controls, and energy-efficient designs.',
    features: [
      'High grinding efficiency',
      'Wear-resistant liners',
      'Automated controls',
      'Variable speed drives',
      'Low energy consumption',
      'Multiple size options'
    ],
    specs: [
      { label: 'Type', value: 'Ball/SAG/VRM' },
      { label: 'Capacity', value: 'Up to 500 TPH' },
      { label: 'Power', value: 'Up to 20 MW' }
    ],
    applications: 'Mining, Cement production, Power plants, Mineral processing, Chemical industry'
  },
  {
    id: 23,
    name: 'Mixers',
    category: 'drives-automation',
    categoryLabel: 'Drives & Automation',
    image: mixerImg,
    shortDesc: 'Precision machines for uniform material blending.',
    description: 'Mixers are precision machines designed to blend materials uniformly, ensuring consistent quality, efficiency, and reliability in industrial and manufacturing processes.',
    longDescription: 'Our mixer range includes ribbon blenders, paddle mixers, and high-shear mixers for various applications. They feature stainless steel construction, hygienic design, and precise speed control for optimal mixing results.',
    features: [
      'Uniform mixing',
      'Hygienic design',
      'Variable speed control',
      'Easy cleaning',
      'Multiple configurations',
      'Automated operation'
    ],
    specs: [
      { label: 'Type', value: 'Ribbon/Paddle/High-shear' },
      { label: 'Material', value: 'SS316/SS304' },
      { label: 'Capacity', value: 'Up to 50,000L' }
    ],
    applications: 'Food processing, Pharmaceutical, Chemical, Cosmetics, Construction materials'
  },
  {
    id: 24,
    name: 'PLC',
    category: 'drives-automation',
    categoryLabel: 'Drives & Automation',
    image: plcImg,
    shortDesc: 'Advanced automation devices for precise process control.',
    description: 'PLCs (Programmable Logic Controllers) are advanced automation devices that control industrial processes with precision, reliability, and real-time monitoring, enhancing efficiency and operational safety.',
    longDescription: 'Our PLC solutions range from compact controllers to distributed control systems. They offer high-speed processing, multiple communication protocols, and robust design for demanding industrial automation applications.',
    features: [
      'High-speed processing',
      'Multiple I/O options',
      'Network connectivity',
      'Real-time monitoring',
      'Flexible programming',
      'Redundancy options'
    ],
    specs: [
      { label: 'I/O Points', value: 'Up to 65,536' },
      { label: 'Communication', value: 'Ethernet/Profibus' },
      { label: 'Programming', value: 'IEC 61131-3' }
    ],
    applications: 'Factory automation, Process control, Building management, Water treatment, Power systems'
  },
  {
    id: 25,
    name: 'Pumps',
    category: 'drives-automation',
    categoryLabel: 'Drives & Automation',
    image: pumpsImg,
    shortDesc: 'Essential equipment for efficient liquid transfer.',
    description: 'Pumps are essential equipment for transferring liquids efficiently, ensuring reliable flow, optimal performance, and smooth operation in industrial and commercial systems.',
    longDescription: 'Our pump range includes centrifugal, positive displacement, and submersible types for various applications. They feature robust construction, energy-efficient motors, and advanced sealing systems for reliable operation.',
    features: [
      'High flow capacity',
      'Energy efficient',
      'Corrosion resistant',
      'Low maintenance',
      'Variable speed options',
      'Multiple seal types'
    ],
    specs: [
      { label: 'Type', value: 'Centrifugal/PD/Submersible' },
      { label: 'Flow', value: 'Up to 50,000 m³/h' },
      { label: 'Head', value: 'Up to 1000m' }
    ],
    applications: 'Water supply, Wastewater, Oil & gas, Chemical processing, Power generation'
  },
  {
    id: 26,
    name: 'Water & Wastewater Solutions',
    category: 'drives-automation',
    categoryLabel: 'Drives & Automation',
    image: wasteWaterImg,
    shortDesc: 'Comprehensive treatment and management systems.',
    description: 'Water & Wastewater Solutions provide efficient treatment, purification, and management systems, ensuring sustainable water use, environmental compliance, and reliable operation.',
    longDescription: 'Our water and wastewater solutions include treatment plants, filtration systems, and monitoring equipment. They ensure clean water supply and safe wastewater disposal while meeting environmental regulations and sustainability goals.',
    features: [
      'Complete treatment systems',
      'Advanced filtration',
      'Automated controls',
      'Real-time monitoring',
      'Energy efficient',
      'Regulatory compliant'
    ],
    specs: [
      { label: 'Capacity', value: 'Custom MLD' },
      { label: 'Treatment', value: 'Primary/Secondary/Tertiary' },
      { label: 'Monitoring', value: 'SCADA Enabled' }
    ],
    applications: 'Municipal water supply, Industrial wastewater, Sewage treatment, Water recycling, Effluent treatment'
  },
];

export const ProductsSection = memo(() => {
  const [activeProduct, setActiveProduct] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'product' | 'application'>('product');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const nextProduct = useCallback(() => {
    setActiveProduct((prev) => (prev + 1) % filteredProducts.length);
  }, [filteredProducts.length]);

  const prevProduct = useCallback(() => {
    setActiveProduct((prev) => (prev - 1 + filteredProducts.length) % filteredProducts.length);
  }, [filteredProducts.length]);

  const currentProduct = filteredProducts[activeProduct] || filteredProducts[0];

  const handleCategoryChange = useCallback((categoryId: string) => {
    setActiveCategory(categoryId);
    setActiveProduct(0);
  }, []);

  const handleKnowMore = useCallback((product: typeof products[0]) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  }, []);

  return (
    <section id="products" className="py-20 bg-background relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Tab Navigation */}
        <motion.div 
          className="flex justify-center items-center gap-4 md:gap-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <button
            onClick={() => setViewMode('product')}
            className={`text-xl md:text-3xl font-bold transition-all duration-300 relative pb-2 ${
              viewMode === 'product' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            By Product
            {viewMode === 'product' && (
              <motion.div 
                layoutId="tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full"
              />
            )}
          </button>
          
          {/* Center Icon */}
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/30 flex items-center justify-center">
            <Zap className="w-8 h-8 md:w-10 md:h-10 text-primary" />
          </div>
          
          <button
            onClick={() => setViewMode('application')}
            className={`text-xl md:text-3xl font-bold transition-all duration-300 relative pb-2 ${
              viewMode === 'application' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            By Application
            {viewMode === 'application' && (
              <motion.div 
                layoutId="tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full"
              />
            )}
          </button>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
              }`}
            >
              {category.name}
              {activeCategory === category.id && (
                <span className="ml-2 text-xs opacity-80">
                  ({filteredProducts.length})
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Side - Description */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {viewMode === 'product' ? 'By Product' : 'By Application'}
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Explore a diverse portfolio of high-performance power solutions to maximise efficiency, output, and sustainability. From transformers to automation systems, our advanced technologies help you achieve your unique energy goals with precision and reliability.
            </p>
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 gap-2"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <ArrowRight className="w-4 h-4" />
              Get In Touch
            </Button>

            {/* Navigation Arrows */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={prevProduct}
                className="w-12 h-12 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center justify-center"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextProduct}
                className="w-12 h-12 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center justify-center"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Product Counter */}
            <p className="text-muted-foreground text-sm mt-4">
              {activeProduct + 1} of {filteredProducts.length} products
            </p>
          </motion.div>

          {/* Center - Main Product Card */}
          <motion.div 
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProduct?.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-muted/50 to-muted shadow-xl"
              >
                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full">
                    {currentProduct?.categoryLabel}
                  </span>
                </div>

                {/* Product Image */}
                <div className="aspect-square p-8 flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                  <img
                    src={currentProduct?.image}
                    alt={currentProduct?.name}
                    className="max-w-full max-h-full object-contain drop-shadow-2xl"
                  />
                </div>
                
                {/* Product Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary via-primary/95 to-primary/80 text-primary-foreground p-6 rounded-b-3xl">
                  <h4 className="text-2xl font-bold mb-2">{currentProduct?.name}</h4>
                  <p className="text-primary-foreground/90 text-sm mb-4">{currentProduct?.shortDesc}</p>
                  <Button 
                    variant="secondary" 
                    className="bg-background text-foreground hover:bg-background/90 rounded-full px-6 gap-2"
                    onClick={() => handleKnowMore(currentProduct)}
                  >
                    <ArrowRight className="w-4 h-4" />
                    Know More
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Right Side - Other Products */}
          <motion.div 
            className="lg:col-span-4 grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {filteredProducts
              .filter((_, index) => index !== activeProduct)
              .slice(0, 4)
              .map((product, index) => (
                <motion.div
                  key={product.id}
                  onClick={() => setActiveProduct(filteredProducts.findIndex(p => p.id === product.id))}
                  className="bg-muted/50 rounded-2xl p-4 cursor-pointer hover:shadow-lg transition-all duration-300 group border border-transparent hover:border-primary/20"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div className="aspect-square mb-3 rounded-xl overflow-hidden bg-gradient-to-br from-background to-muted flex items-center justify-center p-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h5 className="font-semibold text-foreground text-sm mb-1 line-clamp-2">{product.name}</h5>
                  <p className="text-muted-foreground text-xs line-clamp-2">{product.shortDesc}</p>
                </motion.div>
              ))}
          </motion.div>
        </div>

        {/* Product Details Section */}
        <motion.div
          className="mt-16 bg-muted/30 rounded-3xl p-8 md:p-12"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProduct?.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              {/* Left - Product Image */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl" />
                  <img
                    src={currentProduct?.image}
                    alt={currentProduct?.name}
                    className="relative max-w-full max-h-96 object-contain drop-shadow-2xl"
                  />
                </div>
              </div>

              {/* Right - Product Details */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                    {currentProduct?.categoryLabel}
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-4">{currentProduct?.name}</h3>
                <p className="text-muted-foreground mb-6">{currentProduct?.description}</p>
                
                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Features
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {currentProduct?.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2 text-muted-foreground text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Specifications */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Specifications
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {currentProduct?.specs.map((spec, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Zap className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-primary font-bold text-sm">{spec.value}</p>
                          <p className="text-muted-foreground text-xs">{spec.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Applications */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-primary mb-2">Applications:</h4>
                  <p className="text-muted-foreground">{currentProduct?.applications}</p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Button 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 gap-2"
                    onClick={() => handleKnowMore(currentProduct)}
                  >
                    <ArrowRight className="w-4 h-4" />
                    Know More
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-primary text-primary hover:bg-primary/10 rounded-full px-8"
                    onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Request A Quote
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Product Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8 flex-wrap">
          {filteredProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveProduct(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === activeProduct 
                  ? 'bg-primary w-8' 
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50 w-3'
              }`}
            />
          ))}
        </div>
      </div>
      {/* Product Modal */}
      <ProductModal 
        product={selectedProduct} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </section>
  );
});

ProductsSection.displayName = 'ProductsSection';

export default ProductsSection;
