'use client';
import React, { useState } from 'react';
import { dataContact } from '@/data';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';
import GradientName from './shared/GradientName';

const formSchema = z.object({
  username: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre debe tener menos de 50 caracteres'),
  email: z.string().email('Dirección de correo electrónico inválida'),
  message: z
    .string()
    .min(2, 'El mensaje debe tener al menos 2 caracteres')
    .max(200, 'El mensaje debe tener menos de 200 caracteres'),
});

const ContactForm = () => {
  const [successForm, setSuccessForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setSuccessForm(true);
      } else {
        console.error('Error al enviar el correo electrónico');
      }
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl transition-colors duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden">
      <CardContent className="p-8">
        <Form {...form}>
          <AnimatePresence mode="wait">
            {successForm ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center py-8"
              >
                <div className="bg-green-100/80 dark:bg-green-900/80 backdrop-blur-sm rounded-full p-4 inline-block mb-6">
                  <Check className="w-12 h-12 text-green-500 dark:text-green-300" />
                </div>
                <h4 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                  ¡Mensaje Enviado Exitosamente!
                </h4>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Gracias por contactarme. Me pondré en contacto contigo pronto.
                </p>
                <Button
                  onClick={() => {
                    setSuccessForm(false);
                    form.reset();
                  }}
                  className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 text-lg"
                >
                  Enviar Otro Mensaje
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
                  <GradientName>Contáctame</GradientName>
                </h2>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300 text-lg">
                        Nombre
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Tu nombre"
                          {...field}
                          className="bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-sm border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-primary focus:border-primary rounded-lg py-3 text-lg"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300 text-lg">
                        Correo Electrónico
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Tu correo electrónico"
                          type="email"
                          {...field}
                          className="bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-sm border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-primary focus:border-primary rounded-lg py-3 text-lg"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300 text-lg">
                        Mensaje
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tu mensaje"
                          {...field}
                          className="bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-sm border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-primary focus:border-primary rounded-lg py-3 text-lg resize-none h-40"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </Form>
      </CardContent>
    </Card>
  );
};

const Contact = () => {
  return (
    <section
      className="bg-transparent text-gray-900 dark:text-white py-16 md:py-24 transition-colors duration-300"
      id="contact"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="space-y-6">
            {dataContact.map((data) => (
              <Card
                key={data.id}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white p-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="text-primary mb-4 text-3xl">{data.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{data.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {data.subtitle}
                  </p>
                  <Link
                    href={data.link}
                    target="_blank"
                    className="text-primary hover:text-primary/80 transition-colors duration-300"
                  >
                    Enviar mensaje
                  </Link>
                </div>
              </Card>
            ))}
          </div>
          <div className="md:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
