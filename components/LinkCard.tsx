'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Github, Linkedin, Layers, Pen, Download, Paperclip, Share2, Link as LinkIcon, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import GradientName from './shared/GradientName';

const { roles, link, cv } = {
  roles: ['Web Developer', 'UI/UX Designer'],
  link: {
    home: 'Home',
    contacto: 'Contact',
    Miniportfolio: 'Mini Portfolio',
    blog: 'Blog',
    github: 'GitHub',
    linkedin: 'LinkedIn'
  },
  cv: { button: 'Download CV' }
};

interface LinkItem {
  icon: React.ElementType;
  text: string;
  href: string;
  color: string;
}

interface SocialMedia {
  name: string;
  icon: string;
  color: string;
  shareUrl: string;
}

export default function Component() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLink, setCurrentLink] = useState<LinkItem | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const { toast } = useToast();

  const links: LinkItem[] = [
    { icon: Paperclip, text: link.home, href: '/', color: 'from-green-400 to-green-600' },
    { icon: Mail, text: 'camiloescar1995@gmail.com', href: 'mailto:camiloescar1995@gmail.com', color: 'from-red-400 to-red-600' },
    { icon: Layers, text: link.Miniportfolio, href: '/minimal', color: 'from-blue-400 to-blue-600' },
    { icon: Pen, text: link.blog, href: '/blog', color: 'from-purple-400 to-purple-600' },
    { icon: Github, text: 'CamiloEscar', href: 'https://github.com/CamiloEscar', color: 'from-gray-600 to-gray-800' },
    { icon: Linkedin, text: '/in/camiloescar', href: 'https://www.linkedin.com/in/camiloescar/', color: 'from-blue-500 to-blue-700' },
    { icon: Download, text: cv.button, href: '/CVes-CamiloEscar.pdf', color: 'from-green-500 to-green-700' },
  ];

  const socialMedias: SocialMedia[] = [
    { name: 'X', icon: 'twitter', color: 'bg-black', shareUrl: 'https://twitter.com/intent/tweet?url=' },
    { name: 'Facebook', icon: 'facebook', color: 'bg-blue-600', shareUrl: 'https://www.facebook.com/sharer/sharer.php?u=' },
    { name: 'WhatsApp', icon: 'whatsapp', color: 'bg-green-500', shareUrl: 'https://wa.me/?text=' },
    { name: 'LinkedIn', icon: 'linkedin', color: 'bg-blue-700', shareUrl: 'https://www.linkedin.com/sharing/share-offsite/?url=' },
    { name: 'Messenger', icon: 'facebook-messenger', color: 'bg-blue-500', shareUrl: 'https://www.facebook.com/dialog/send?link=' },
    { name: 'Email', icon: 'envelope', color: 'bg-red-500', shareUrl: 'mailto:?body=' },
  ];

  const openShareModal = (link: LinkItem) => {
    setCurrentLink(link);
    setIsModalOpen(true);
    setCopiedLink(false);
  };

  const closeShareModal = () => {
    setIsModalOpen(false);
    setCurrentLink(null);
  };

  const ShareModal = ({ isOpen, onClose, link }: { isOpen: boolean; onClose: () => void; link: LinkItem | null }) => {
    const shareLink = `${typeof window !== 'undefined' ? window.location.origin : ''}${link?.href}`;

    const handleShare = (social: SocialMedia) => {
      window.open(social.shareUrl + encodeURIComponent(shareLink), '_blank');
    };

    const handleCopyLink = () => {
      navigator.clipboard.writeText(shareLink);
      setCopiedLink(true);
      toast({
        title: 'Link copied!',
        description: 'The link has been copied to your clipboard.',
      });
      setTimeout(() => setCopiedLink(false), 3000);
    };

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Share {link?.text}</DialogTitle>
          </DialogHeader>
          <div className="flex items-center space-x-2 mb-4">
            <LinkIcon className="w-6 h-6" />
            <span className="font-semibold text-lg">{link?.text}</span>
          </div>
          <div className="flex space-x-2 mb-6">
            <Input value={shareLink} readOnly className="flex-grow" />
            <Button onClick={handleCopyLink} variant="outline" className="flex-shrink-0">
              {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {socialMedias.map((social) => (
              <Button
                key={social.name}
                className={`${social.color} text-white p-2 h-auto flex flex-col items-center justify-center hover:opacity-90 transition-opacity`}
                onClick={() => handleShare(social)}
              >
                <i className={`fab fa-${social.icon} text-2xl mb-1`}></i>
                <span className="text-xs">{social.name}</span>
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row items-center justify-center p-4 gap-4 overflow-hidden">
      <Image
        src="/back.jpg?height=1080&width=1920"
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0"
      />
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xs md:max-w-sm z-20"
      >
        <Card className="overflow-hidden shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg">
          <CardContent className="p-6">
            <motion.div
              className="relative w-full mb-6 overflow-hidden rounded-xl"
              style={{ aspectRatio: '4 / 5' }} // proporción vertical
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Image
  src="/profile.png"
  alt="Profile"
  fill
  className="
    rounded-xl
    border-2 border-white dark:border-gray-700
    shadow-md
    object-cover object-top
    scale-115
    transition-transform duration-300
  "
/>
            </motion.div>

            <GradientName size="small" className="text-center font-bold mb-2 text-2xl">
              Camilo Escar
            </GradientName>

            <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-6 font-medium">
              {roles.join(' | ')}
            </p>
          </CardContent>

        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-xs md:max-w-sm z-20"
      >
        <Card className="overflow-hidden shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg">
          <CardContent className="p-6">
            <div className="space-y-3">
              <AnimatePresence>
                {links.map((link, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            asChild
                            className={`w-full bg-gradient-to-r ${link.color} hover:opacity-90 text-white transition-all duration-300 shadow-md text-xs sm:text-sm py-6 px-4 rounded-xl`}
                          >
                            <Link href={link.href} className="flex items-center justify-between w-full">
                              <span className="flex items-center">
                                <link.icon className="w-5 h-5 mr-3" />
                                {link.text}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="ml-2 text-white hover:bg-white/20 rounded-full"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  openShareModal(link);
                                }}
                              >
                                <Share2 className="w-5 h-5" />
                              </Button>
                            </Link>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Click to visit {link.text}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      <ShareModal isOpen={isModalOpen} onClose={closeShareModal} link={currentLink} />
    </div>
  );
}