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
import { dataIntroduction } from '@/data';

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

const LinkCard: React.FC = () => {
  const { roles, link, cv } = dataIntroduction[0];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLink, setCurrentLink] = useState<LinkItem | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const { toast } = useToast();

  const links: LinkItem[] = [
    { icon: Paperclip, text: link.home, href: '/', color: 'from-green-400 to-green-600' },
    { icon: Mail, text: link.contacto, href: 'mailto:camiloescar1995@gmail.com', color: 'from-red-400 to-red-600' },
    { icon: Layers, text: link.Miniportfolio, href: '/minimal', color: 'from-blue-400 to-blue-600' },
    { icon: Pen, text: link.blog, href: '/blog', color: 'from-purple-400 to-purple-600' },
    { icon: Github, text: link.github, href: 'https://github.com/CamiloEscar', color: 'from-gray-600 to-gray-800' },
    { icon: Linkedin, text: link.linkedin, href: 'https://www.linkedin.com/in/camiloescar/', color: 'from-blue-500 to-blue-700' },
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

  const ShareModal: React.FC<{ isOpen: boolean; onClose: () => void; link: LinkItem | null }> = ({ isOpen, onClose, link }) => {
    const shareLink = `${window.location.origin}${link?.href}`;

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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="overflow-hidden shadow-2xl bg-white dark:bg-gray-800 backdrop-blur-lg bg-opacity-80 dark:bg-opacity-80">
          <CardContent className="p-6">
            <motion.div 
              className="relative w-full mb-6 overflow-hidden rounded-xl"
              style={{ paddingTop: '100%' }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Image
                src="/profile.webp"
                alt="Profile"
                layout="fill"
                objectFit="cover"
                className="rounded-xl border-2 border-white dark:border-gray-700 shadow-md"
              />
            </motion.div>
            
            <GradientName size="small" className="text-center font-bold mb-2 text-2xl">
              Camilo Escar
            </GradientName>
            
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-6 font-medium">
              {roles.join(' | ')}
            </p>
            
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
                            className={`w-full bg-gradient-to-r ${link.color} hover:opacity-90 text-white transition-all duration-300 shadow-md text-sm py-6 px-4 rounded-xl`}
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
};

export default LinkCard;