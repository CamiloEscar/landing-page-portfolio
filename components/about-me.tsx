import React from 'react';
import { Building, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { educationTimeline, workExperience } from '@/data';
import GradientName from './shared/GradientName';

interface TimelineEvent {
  id: number;
  title: string;
  subtitle: string;
  period: string;
  description: string;
  type: 'education' | 'work';
  // Unique key that combines type + id to avoid duplicates
  uniqueKey: string;
}

const TimelineItem = ({ event, side }: { event: TimelineEvent; side: 'left' | 'right' }) => {
  const isLeft = side === 'left';
  
  return (
    <div className={`mb-4 flex justify-center items-center w-full ${isLeft ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className="hidden md:block w-5/12"></div>
      <div className="z-20 flex items-center order-1 w-8 h-8">
        <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
          {event.type === 'education' ? (
            <Calendar className="w-4 h-4" />
          ) : (
            <Building className="w-4 h-4" />
          )}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className={`order-1 w-11/12 md:w-5/12 px-4 py-3 rounded-lg shadow-md bg-white dark:bg-gray-800 ${isLeft ? 'mr-0' : 'ml-0'}`}
      >
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-gray-800 dark:text-white text-lg">{event.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 ml-2">{event.period}</p>
        </div>
        <h4 className="mb-1 text-green-600 dark:text-green-400 text-sm font-semibold">{event.subtitle}</h4>
        {event.type === 'work' ? (
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm">
            {event.description.split('\n').map((item, index) => (
              // ✅ key combina uniqueKey + index → siempre único
              <li key={`${event.uniqueKey}-desc-${index}`} className="leading-tight mb-0.5">
                {item.trim()}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-tight">{event.description}</p>
        )}
      </motion.div>
    </div>
  );
};

export default function CenteredTimeline() {
  const allEvents: TimelineEvent[] = [
    ...educationTimeline.map(edu => ({
      ...edu,
      subtitle: edu.institution,
      type: 'education' as const,
      // ✅ "edu-1", "edu-2" — nunca choca con work
      uniqueKey: `edu-${edu.id}`,
    })),
    ...workExperience.map(work => ({
      ...work,
      title: work.position,
      subtitle: work.company,
      type: 'work' as const,
      // ✅ "work-1", "work-2" — nunca choca con education
      uniqueKey: `work-${work.id}`,
    })),
  ].sort((a, b) => b.period.localeCompare(a.period));

  return (
    <section className="py-6" id="timeline">
      <div className="container mx-auto px-4 backdrop-blur-md bg-white/10 dark:bg-gray-900/10 border-white/20 dark:border-gray-700/20 shadow-xl rounded-md">
        <div className="grid grid-cols-2 gap-4 mb-4 pt-4">
          <div className="text-right">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center justify-end">
              <GradientName>Educación</GradientName>
              <Calendar className="w-6 h-6 ml-2 text-green-500" />
            </h2>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
              <Building className="w-6 h-6 mr-2 text-green-500" />
              <GradientName>Experiencia Laboral</GradientName>
            </h2>
          </div>
        </div>

        <div className="relative wrap overflow-hidden">
          <div className="absolute border-opacity-20 border-gray-400 dark:border-gray-600 h-full border left-1/2"></div>

          {allEvents.map((event) => (
            // ✅ uniqueKey garantiza que nunca haya duplicados
            <TimelineItem
              key={event.uniqueKey}
              event={event}
              side={event.type === 'education' ? 'left' : 'right'}
            />
          ))}
        </div>
      </div>
    </section>
  );
}