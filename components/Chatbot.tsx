import React, { useState, useRef, useEffect } from 'react';
import { Send, X, ArrowLeft, ArrowUpCircle, Loader2, RefreshCcw, Mail, Linkedin, Github, Globe } from 'lucide-react';
import chatResponses from '../app/api/chatbot/chat_responses.json';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

interface ChatNode {
  id: string;
  question: string;
  answers: Record<string, string>;
  next: Record<string, string>;
  keywords?: Record<string, string[]>;
  categories?: any;
  projects?: any[];
  skills?: any[];
  contact_methods?: any;
  social_links?: any;
  profile_image?: string;
  action_handlers?: Record<string, { type: string; url: string; tracking_id: string }>;
}

interface Message {
  id: string;
  sender: 'bot' | 'user';
  content: string;
  options?: Array<{ text: string; value: string }>;
  timestamp?: Date;
  error?: boolean;
  links?: Array<{ text: string; url: string }>;
  projects?: any[];
  skills?: any[];
  profile_image?: string;
  social_links?: Record<string, { url: string; description: string }>;
  contact_methods?: any;
}

export default function ImprovedChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [currentNode, setCurrentNode] = useState<ChatNode | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      handleInitialMessage();
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    if (!isOpen) {
      setUnreadCount(prev => prev + 1);
    } else {
      setUnreadCount(0);
    }
    scrollToBottom();
  }, [isOpen, messages]);

  const handleScroll = () => {
    if (scrollAreaRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollAreaRef.current;
      setShowScrollButton(scrollHeight - scrollTop - clientHeight > 100);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInitialMessage = () => {
    const initialNode = chatResponses.conversation.find((node: { id: string; }) => node.id === 'greeting') as unknown as ChatNode;
    if (initialNode) {
      setCurrentNode(initialNode);
      const initialMessage: Message = {
        id: 'greeting',
        sender: 'bot',
        content: initialNode.question,
        options: Object.entries(initialNode.answers).map(([key, value]) => ({ text: value, value: key })),
        timestamp: new Date()
      };
      setMessages([initialMessage]);
    }
  };

  const handleUnknownResponse = async () => {
    const unknownMessage: Message = {
      id: Date.now().toString(),
      sender: 'bot',
      content: 'Lo siento, no entiendo esa respuesta. ¿Podrías reformularla o elegir una de las opciones disponibles?',
      error: true,
      timestamp: new Date()
    };
    addMessage(unknownMessage);
  };

  const handleGoBack = () => {
    if (history.length > 0) {
      const previousNodeId = history[history.length - 1];
      const previousNode = chatResponses.conversation.find(
          (node: { id: string; }) => node.id === previousNodeId
      ) as unknown as ChatNode;
      
      if (previousNode) {
        setCurrentNode(previousNode);
        setHistory(prev => prev.slice(0, -1));
        
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages.splice(-2, 2);
          return newMessages;
        });

        const botMessage: Message = {
          id: Date.now().toString(),
          sender: 'bot',
          content: previousNode.question,
          options: Object.entries(previousNode.answers).map(([key, value]) => ({ text: value, value: key })),
          timestamp: new Date(),
          profile_image: previousNode.profile_image,
          social_links: previousNode.social_links,
          projects: previousNode.projects,
          skills: previousNode.skills,
          contact_methods: previousNode.contact_methods
        };
        addMessage(botMessage);
      }
    }
  };

  const findBestMatch = (input: string, node: ChatNode): string | null => {
    const inputWords = input.toLowerCase().split(/\s+/);
    
    // Check for exact matches in answers
    for (const [key, value] of Object.entries(node.answers)) {
      if (value.toLowerCase() === input.toLowerCase()) {
        return key;
      }
    }

    // Check for keyword matches
    if (node.keywords) {
      let bestMatch = null;
      let maxMatchCount = 0;

      for (const [key, keywords] of Object.entries(node.keywords)) {
        const matchCount = keywords.filter(keyword => 
          inputWords.some(word => word.includes(keyword.toLowerCase()))
        ).length;

        if (matchCount > maxMatchCount) {
          maxMatchCount = matchCount;
          bestMatch = key;
        }
      }

      if (bestMatch) {
        return bestMatch;
      }
    }

    // If no match found, return null
    return null;
  };

  const handleInputSubmit = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };
    addMessage(userMessage);
    setInputMessage('');
    setIsTyping(true);

    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 800));

    if (currentNode) {
      const bestMatch = findBestMatch(inputMessage, currentNode);
      if (bestMatch) {
        handleOptionClick(bestMatch);
      } else {
        handleUnknownResponse();
      }
    } else {
      handleUnknownResponse();
    }

    setIsTyping(false);
  };

  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, { ...message, timestamp: new Date() }]);
  };

  const handleOptionClick = async (option: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: currentNode?.answers[option] || option,
      timestamp: new Date()
    };
    addMessage(userMessage);
    setIsTyping(true);

    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 800));

    if (currentNode && currentNode.next[option]) {
      const nextNodeId = currentNode.next[option];
      const nextNode = chatResponses.conversation.find((node: { id: string; }) => node.id === nextNodeId) as unknown as ChatNode;
      if (nextNode) {
        setHistory(prev => [...prev, currentNode.id]);
        setCurrentNode(nextNode);
        const botResponse: Message = {
          id: Date.now().toString(),
          sender: 'bot',
          content: nextNode.question,
          options: Object.entries(nextNode.answers).map(([key, value]) => ({ text: value, value: key })),
          timestamp: new Date(),
          profile_image: nextNode.profile_image,
          social_links: nextNode.social_links,
          projects: nextNode.projects,
          skills: nextNode.skills,
          contact_methods: nextNode.contact_methods
        };
        addMessage(botResponse);

        if (nextNode.action_handlers && nextNode.action_handlers[option]) {
          const action = nextNode.action_handlers[option];
          if (action.type === 'external_link') {
            window.open(action.url, '_blank');
          }
        }
      }
    } else {
      handleUnknownResponse();
    }
    setIsTyping(false);
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
  };

  const resetChat = () => {
    setMessages([]);
    handleInitialMessage();
  };

  const renderMessageContent = (msg: Message) => {
    return (
      <>
        <p className="whitespace-pre-wrap break-words">{msg.content}</p>
        {msg.options && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-3 space-y-2"
          >
            {msg.options.map((option) => (
              <Button
                key={option.value}
                variant="secondary"
                size="sm"
                onClick={() => handleOptionClick(option.value)}
                className="w-full justify-start hover:translate-x-1 transition-transform"
                disabled={isTyping}
              >
                {option.text}
              </Button>
            ))}
          </motion.div>
        )}
        {msg.profile_image && (
          <Image src={msg.profile_image} width={240} height={120} alt="Profile" className="mt-3 rounded-lg max-w-xs" />
        )}
        {msg.contact_methods && (
          <div className="mt-3 space-y-2">
            {Object.entries(msg.contact_methods).map(([method, details]: [string, any]) => (
              <a
                key={method}
                href={details.action}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-primary hover:underline"
              >
                {method === 'email' && <Mail className="h-4 w-4" />}
                {method === 'linkedin' && <Linkedin className="h-4 w-4" />}
                {method === 'github' && <Github className="h-4 w-4" />}
                {method === 'website' && <Globe className="h-4 w-4" />}
                <span>{details.description}</span>
              </a>
            ))}
          </div>
        )}
        
        {msg.projects && msg.projects.length > 0 && (
          <div className="mt-3 space-y-4">
            {msg.projects.map((project, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <h3 className="font-bold">{project.name}</h3>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                  {project.tech_stack && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {project.tech_stack.map((tech: string, techIndex: number) => (
                        <Badge key={techIndex} variant="secondary">{tech}</Badge>
                      ))}
                    </div>
                  )}
                  {project.links && (
                    <div className="mt-2 space-x-2">
                      {project.links.demo && (
                        <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          Demo
                        </a>
                      )}
                      {project.links.code && (
                        <a href={project.links.code} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          Código
                        </a>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        {msg.skills && msg.skills.length > 0 && (
          <div className="mt-3 space-y-2">
            {msg.skills.map((skill, index) => (
              <div key={index}>
                <h3 className="font-bold">{skill.name}</h3>
                <p className="text-sm text-muted-foreground">{skill.description}</p>
                {skill.technologies && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {skill.technologies.map((tech: string, techIndex: number) => (
                      <Badge key={techIndex} variant="outline">{tech}</Badge>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-8 sm:right-8">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-background rounded-lg shadow-xl w-[95vw] sm:w-[400px] flex flex-col h-[85vh] sm:h-[600px]"
          >
            {/* Header */}
            <div className="bg-primary text-primary-foreground p-4 rounded-t-lg flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar>
                    <AvatarImage src="/robotito.png" alt="ChatBot Avatar" />
                    <AvatarFallback>CB</AvatarFallback>
                  </Avatar>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">Botito el Asistente Virtual</span>
                  <span className="text-xs text-primary-foreground/80">Activo ahora</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={resetChat}
                        className="text-primary-foreground hover:bg-primary-foreground/20"
                        disabled={isTyping || messages.length === 0}
                      >
                        <RefreshCcw className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Reiniciar conversación</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-primary-foreground hover:bg-primary-foreground/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages Area */}
            <ScrollArea 
              className="flex-grow px-4 py-6 space-y-4"
              ref={scrollAreaRef as any}
              onScroll={handleScroll}
            >
              {messages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                >
                  {msg.sender === 'bot' && (
                    <Avatar className="mr-2 w-8 h-8 shrink-0">
                      <AvatarImage src="/robotito.png" />
                      <AvatarFallback>CB</AvatarFallback>
                    </Avatar>
                  )}
                  <div className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} max-w-[80%]`}>
                    <div
                      className={`rounded-lg p-3 ${
                        msg.sender === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-none'
                          : msg.error
                          ? 'bg-destructive/10 text-destructive rounded-bl-none'
                          : 'bg-secondary text-secondary-foreground rounded-bl-none'
                      }`}
                    >
                      {renderMessageContent(msg)}
                    </div>
                    {msg.timestamp && (
                      <span className="text-xs text-muted-foreground mt-1">
                        {formatTimestamp(msg.timestamp)}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center space-x-2"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/robotito.png" />
                    <AvatarFallback>CB</AvatarFallback>
                  </Avatar>
                  <div className="bg-secondary rounded-lg p-3">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </ScrollArea>

            {showScrollButton && (
              <Button
                variant="outline"
                size="icon"
                className="absolute bottom-20 right-4 rounded-full shadow-lg"
                onClick={scrollToBottom}
              >
                <ArrowUpCircle className="h-4 w-4" />
              </Button>
            )}

            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleGoBack}
                  disabled={history.length === 0}
                  className="hover:bg-secondary"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleInputSubmit()}
                  placeholder="Escribe un mensaje..."
                  className="flex-1"
                />
                <Button 
                  onClick={handleInputSubmit}
                  disabled={!inputMessage.trim()}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <Button
              onClick={() => setIsOpen(true)}
              size="icon"
              className="rounded-full h-14 w-14 shadow-lg"
            >
              <Image
                src="/robotitoicon.png" // Replace with your 3D robot image path
                alt="3D Robot Chat Icon"
                width={112}
                height={112}
                className="object-cover"
              />
              {unreadCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full flex items-center justify-center"
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}