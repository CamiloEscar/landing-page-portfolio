'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ScrollIndicator: React.FC = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      const maxScroll = fullHeight - windowHeight;
      const percentage = (scrollPosition / maxScroll) * 100;
      setScrollPercentage(Math.min(percentage, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="w-1 h-10 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <motion.div
        className="w-full bg-primary"
        style={{ height: `${scrollPercentage}%` }}
        initial={{ height: '0%' }}
        animate={{ height: `${scrollPercentage}%` }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
    </motion.div>
  );
};

export default ScrollIndicator;
