'use client';

import React from 'react';
import { dataServices } from '@/data';
import Title from './shared/title';
import { Briefcase, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

const Services = () => {
  return (
    <motion.section
      className="py-16 md:py-24 bg-transparent transition-colors duration-300"
      id="services"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="flex items-center justify-center mb-12"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Briefcase className="w-10 h-10 mr-3 text-primary" />
          <Title title="Servicios" subtitle="Lo que ofrezco" />
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {dataServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-800 dark:text-white">
                    {service.icon}
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="mt-1 text-primary" size={18} />
                        <span className="text-gray-600 dark:text-gray-400">
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Services;
