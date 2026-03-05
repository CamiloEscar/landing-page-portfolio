/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import {
  Search, X, ChevronRight, Clock,
  User, Briefcase, Code2, FileText, Download,
  Github, Linkedin, Mail, Link as LinkIcon,
  Sun, Moon, Sunrise, Sunset, Terminal, Play,
  TriangleAlert, CheckCircle2, Trash2, Copy,
  ArrowUp,
} from 'lucide-react';

// ─── Tipos ────────────────────────────────────────────────────────────────────
type Mode     = 'commands' | 'terminal' | 'editor';
type Category = 'Navegación' | 'Acciones' | 'Social' | 'Preferencias';

interface Command {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  category: Category;
  shortcut?: string;
  keywords?: string[];
  action: () => void;
}

interface TermLine {
  type: 'input' | 'output' | 'error' | 'system';
  text?: string;
  html?: string;
}

// ─── Colores por categoría ────────────────────────────────────────────────────
const CAT_ORDER: Category[] = ['Navegación', 'Acciones', 'Social', 'Preferencias'];
const CAT_COLOR: Record<Category, { bg: string; text: string; border: string }> = {
  'Navegación':   { bg: 'rgba(99,102,241,0.12)',  text: '#818cf8', border: 'rgba(99,102,241,0.3)'  },
  'Acciones':     { bg: 'rgba(16,185,129,0.12)',  text: '#34d399', border: 'rgba(16,185,129,0.3)'  },
  'Social':       { bg: 'rgba(59,130,246,0.12)',  text: '#60a5fa', border: 'rgba(59,130,246,0.3)'  },
  'Preferencias': { bg: 'rgba(245,158,11,0.12)',  text: '#fbbf24', border: 'rgba(245,158,11,0.3)'  },
};

// ─── Virtual Filesystem ───────────────────────────────────────────────────────
const FS: Record<string, {
  type: 'dir' | 'file';
  description?: string;
  content?: () => TermLine[];
  children?: string[];
}> = {
  '/': {
    type: 'dir',
    children: ['proyectos', 'blog', 'skills', 'contact', 'cv'],
  },
  '/proyectos': {
    type: 'dir',
    description: 'Casos de estudio y proyectos destacados',
    children: ['crm-erp', 'ecommerce', 'portfolio'],
    content: () => [
      { type: 'output', text: '' },
      { type: 'output', html: '<span style="color:#818cf8;font-weight:600">── /proyectos ────────────────────────</span>' },
      { type: 'output', html: '  <span style="color:#fbbf24">drwxr-xr-x</span>  <span style="color:#60a5fa">crm-erp/</span>        CRM + ERP Empresarial' },
      { type: 'output', html: '  <span style="color:#fbbf24">drwxr-xr-x</span>  <span style="color:#60a5fa">ecommerce/</span>      E-commerce Full Stack' },
      { type: 'output', html: '  <span style="color:#fbbf24">drwxr-xr-x</span>  <span style="color:#60a5fa">portfolio/</span>      Este portfolio' },
      { type: 'output', text: '' },
      { type: 'output', html: '  <span style="color:#4a4a6a">cd [nombre] para ver detalles del proyecto</span>' },
      { type: 'output', text: '' },
    ],
  },
  '/proyectos/crm-erp': {
    type: 'dir',
    description: 'Sistema CRM + ERP empresarial',
    children: [],
    content: () => [
      { type: 'output', text: '' },
      { type: 'output', html: '<span style="color:#fbbf24;font-weight:600">CRM + ERP Empresarial</span>' },
      { type: 'output', html: '  <span style="color:#4a4a6a">repos: api-crm-erp · admin-crm-erp</span>' },
      { type: 'output', text: '' },
      { type: 'output', html: '  <span style="color:#818cf8">Stack:</span>    Laravel · Angular · MySQL · REST APIs' },
      { type: 'output', html: '  <span style="color:#818cf8">Estado:</span>   En desarrollo activo' },
      { type: 'output', html: '  <span style="color:#818cf8">Rol:</span>      Fullstack — backend + panel admin' },
      { type: 'output', text: '' },
      { type: 'output', html: '  Sistema modular con gestión de clientes,' },
      { type: 'output', html: '  ventas, inventario y procesos administrativos.' },
      { type: 'output', text: '' },
      { type: 'output', html: '  <span style="color:#34d399">→ github.com/CamiloEscar/api-crm-erp</span>' },
      { type: 'output', text: '' },
    ],
  },
  '/proyectos/ecommerce': {
    type: 'dir',
    description: 'E-commerce Full Stack API First',
    children: [],
    content: () => [
      { type: 'output', text: '' },
      { type: 'output', html: '<span style="color:#fbbf24;font-weight:600">E-commerce Full Stack</span>' },
      { type: 'output', html: '  <span style="color:#4a4a6a">repos: api_ecommerce · ecommerce · admin_metronic</span>' },
      { type: 'output', text: '' },
      { type: 'output', html: '  <span style="color:#818cf8">Stack:</span>    Laravel · Angular · MySQL · JWT' },
      { type: 'output', html: '  <span style="color:#818cf8">Patrón:</span>   API First — separación clara API/frontend/admin' },
      { type: 'output', text: '' },
      { type: 'output', html: '  Gestión de productos, órdenes, usuarios' },
      { type: 'output', html: '  y autenticación basada en tokens.' },
      { type: 'output', text: '' },
      { type: 'output', html: '  <span style="color:#34d399">→ github.com/CamiloEscar/api_ecommerce</span>' },
      { type: 'output', text: '' },
    ],
  },
  '/proyectos/portfolio': {
    type: 'dir',
    description: 'Este portfolio',
    children: [],
    content: () => [
      { type: 'output', text: '' },
      { type: 'output', html: '<span style="color:#fbbf24;font-weight:600">Portfolio Moderno</span>  <span style="color:#34d399">← estás aquí</span>' },
      { type: 'output', html: '  <span style="color:#4a4a6a">repo: landing-page-portfolio</span>' },
      { type: 'output', text: '' },
      { type: 'output', html: '  <span style="color:#818cf8">Stack:</span>    Next.js 14 · TypeScript · Tailwind · Framer Motion' },
      { type: 'output', html: '  <span style="color:#818cf8">Deploy:</span>   Vercel' },
      { type: 'output', html: '  <span style="color:#818cf8">Features:</span> Temas dinámicos · Command Palette · Terminal · Animaciones' },
      { type: 'output', text: '' },
      { type: 'output', html: '  <span style="color:#34d399">→ camiloescar.vercel.app</span>' },
      { type: 'output', text: '' },
    ],
  },
  '/blog': {
    type: 'dir',
    description: 'Artículos técnicos',
    children: ['react-patterns', 'nextjs-tips', 'docker-basics'],
    content: () => [
      { type: 'output', text: '' },
      { type: 'output', html: '<span style="color:#818cf8;font-weight:600">── /blog ─────────────────────────────</span>' },
      { type: 'output', html: '  <span style="color:#fbbf24">-rw-r--r--</span>  <span style="color:#34d399">react-patterns.md</span>     Patrones avanzados en React' },
      { type: 'output', html: '  <span style="color:#fbbf24">-rw-r--r--</span>  <span style="color:#34d399">nextjs-tips.md</span>        Tips de Next.js 14 App Router' },
      { type: 'output', html: '  <span style="color:#fbbf24">-rw-r--r--</span>  <span style="color:#34d399">docker-basics.md</span>      Docker para devs frontend' },
      { type: 'output', text: '' },
      { type: 'output', html: '  <span style="color:#4a4a6a">cd [artículo] para leer · o visitá /blog</span>' },
      { type: 'output', text: '' },
    ],
  },
  '/blog/react-patterns': {
    type: 'file',
    description: 'Patrones avanzados en React',
    content: () => [
      { type: 'output', text: '' },
      { type: 'output', html: '<span style="color:#60a5fa;font-weight:600">Patrones avanzados en React</span>' },
      { type: 'output', html: '  <span style="color:#4a4a6a">Compound Components, Render Props, Custom Hooks</span>' },
      { type: 'output', text: '' },
      { type: 'output', html: '  Exploramos patrones de composición que hacen' },
      { type: 'output', html: '  los componentes más reutilizables y mantenibles.' },
      { type: 'output', text: '' },
      { type: 'output', html: '  <span style="color:#34d399">→ camiloescar.vercel.app/blog</span>' },
      { type: 'output', text: '' },
    ],
  },
  '/blog/nextjs-tips': {
    type: 'file',
    description: 'Tips de Next.js 14',
    content: () => [
      { type: 'output', text: '' },
      { type: 'output', html: '<span style="color:#60a5fa;font-weight:600">Tips de Next.js 14 App Router</span>' },
      { type: 'output', html: '  <span style="color:#4a4a6a">Server Components, Streaming, Route Handlers</span>' },
      { type: 'output', text: '' },
      { type: 'output', html: '  Guía práctica para migrar de Pages Router' },
      { type: 'output', html: '  y aprovechar las nuevas features del App Router.' },
      { type: 'output', text: '' },
      { type: 'output', html: '  <span style="color:#34d399">→ camiloescar.vercel.app/blog</span>' },
      { type: 'output', text: '' },
    ],
  },
  '/blog/docker-basics': {
    type: 'file',
    description: 'Docker para devs frontend',
    content: () => [
      { type: 'output', text: '' },
      { type: 'output', html: '<span style="color:#60a5fa;font-weight:600">Docker para devs frontend</span>' },
      { type: 'output', html: '  <span style="color:#4a4a6a">Containers, Compose, volúmenes y redes</span>' },
      { type: 'output', text: '' },
      { type: 'output', html: '  Cómo containerizar una app Next.js + API' },
      { type: 'output', html: '  con Docker Compose para desarrollo y producción.' },
      { type: 'output', text: '' },
      { type: 'output', html: '  <span style="color:#34d399">→ camiloescar.vercel.app/blog</span>' },
      { type: 'output', text: '' },
    ],
  },
  '/skills': {
    type: 'dir',
    description: 'Stack técnico completo',
    children: ['frontend', 'backend', 'devops'],
    content: () => [
      { type: 'output', text: '' },
      { type: 'output', html: '<span style="color:#818cf8;font-weight:600">── /skills ───────────────────────────</span>' },
      { type: 'output', html: '  <span style="color:#fbbf24">drwxr-xr-x</span>  <span style="color:#60a5fa">frontend/</span>    React · Next.js · TypeScript · Tailwind' },
      { type: 'output', html: '  <span style="color:#fbbf24">drwxr-xr-x</span>  <span style="color:#60a5fa">backend/</span>     Node.js · Laravel · Python · REST' },
      { type: 'output', html: '  <span style="color:#fbbf24">drwxr-xr-x</span>  <span style="color:#60a5fa">devops/</span>      Docker · AWS · Vercel · CI/CD' },
      { type: 'output', text: '' },
    ],
  },
  '/skills/frontend': {
    type: 'dir', description: 'Frontend skills', children: [],
    content: () => [
      { type: 'output', text: '' },
      { type: 'output', html: '<span style="color:#60a5fa;font-weight:600">Frontend</span>' },
      { type: 'output', html: '  <span style="color:#34d399">React 18</span>       ████████░░  Avanzado' },
      { type: 'output', html: '  <span style="color:#34d399">Next.js 14</span>     ████████░░  Avanzado' },
      { type: 'output', html: '  <span style="color:#34d399">TypeScript</span>     ███████░░░  Intermedio-Alto' },
      { type: 'output', html: '  <span style="color:#34d399">Tailwind CSS</span>   █████████░  Avanzado' },
      { type: 'output', html: '  <span style="color:#34d399">Framer Motion</span>  ███████░░░  Intermedio-Alto' },
      { type: 'output', text: '' },
    ],
  },
  '/skills/backend': {
    type: 'dir', description: 'Backend skills', children: [],
    content: () => [
      { type: 'output', text: '' },
      { type: 'output', html: '<span style="color:#34d399;font-weight:600">Backend</span>' },
      { type: 'output', html: '  <span style="color:#60a5fa">Node.js</span>        ████████░░  Avanzado' },
      { type: 'output', html: '  <span style="color:#60a5fa">Laravel</span>        ████████░░  Avanzado' },
      { type: 'output', html: '  <span style="color:#60a5fa">Python</span>         ██████░░░░  Intermedio' },
      { type: 'output', html: '  <span style="color:#60a5fa">PostgreSQL</span>     ███████░░░  Intermedio-Alto' },
      { type: 'output', html: '  <span style="color:#60a5fa">MongoDB</span>        ███████░░░  Intermedio-Alto' },
      { type: 'output', text: '' },
    ],
  },
  '/skills/devops': {
    type: 'dir', description: 'DevOps skills', children: [],
    content: () => [
      { type: 'output', text: '' },
      { type: 'output', html: '<span style="color:#f472b6;font-weight:600">DevOps</span>' },
      { type: 'output', html: '  <span style="color:#fbbf24">Docker</span>         ██████░░░░  Intermedio' },
      { type: 'output', html: '  <span style="color:#fbbf24">Git / GitHub</span>   █████████░  Avanzado' },
      { type: 'output', html: '  <span style="color:#fbbf24">Vercel</span>         █████████░  Avanzado' },
      { type: 'output', html: '  <span style="color:#fbbf24">AWS</span>            ████░░░░░░  Básico-Medio' },
      { type: 'output', html: '  <span style="color:#fbbf24">CI/CD</span>          █████░░░░░  Básico-Medio' },
      { type: 'output', text: '' },
    ],
  },
  '/contact': {
    type: 'dir',
    description: 'Formas de contacto',
    children: [],
    content: () => [
      { type: 'output', text: '' },
      { type: 'output', html: '<span style="color:#818cf8;font-weight:600">── /contact ──────────────────────────</span>' },
      { type: 'output', html: '  <span style="color:#34d399">email</span>       camiloescar1@gmail.com' },
      { type: 'output', html: '  <span style="color:#60a5fa">linkedin</span>    linkedin.com/in/camiloescar' },
      { type: 'output', html: '  <span style="color:#f0f0f5">github</span>      github.com/CamiloEscar' },
      { type: 'output', html: '  <span style="color:#34d399">whatsapp</span>    +54 9 3442 475466' },
      { type: 'output', text: '' },
      { type: 'output', html: '  <span style="color:#fbbf24">Disponible para proyectos remotos 🌍</span>' },
      { type: 'output', text: '' },
    ],
  },
  '/cv': {
    type: 'dir',
    description: 'Currículum Vitae',
    children: ['CVes-CamiloEscar.pdf', 'CVen-CamiloEscar.pdf'],
    content: () => [
      { type: 'output', text: '' },
      { type: 'output', html: '<span style="color:#818cf8;font-weight:600">── /cv ───────────────────────────────</span>' },
      { type: 'output', html: '  <span style="color:#fbbf24">-rw-r--r--</span>  <span style="color:#34d399">CVes-CamiloEscar.pdf</span>   Currículum en Español' },
      { type: 'output', html: '  <span style="color:#fbbf24">-rw-r--r--</span>  <span style="color:#34d399">CVen-CamiloEscar.pdf</span>   Resume in English' },
      { type: 'output', text: '' },
      { type: 'output', html: '  <span style="color:#4a4a6a">cat CVes-CamiloEscar.pdf  →  abre el CV en español</span>' },
      { type: 'output', html: '  <span style="color:#4a4a6a">cat CVen-CamiloEscar.pdf  →  opens English resume</span>' },
      { type: 'output', text: '' },
    ],
  },
  '/cv/CVes-CamiloEscar.pdf': {
    type: 'file', description: 'CV en Español',
    content: () => [
      { type: 'output', html: '  <span style="color:#34d399">Abriendo CVes-CamiloEscar.pdf...</span>' },
    ],
  },
  '/cv/CVen-CamiloEscar.pdf': {
    type: 'file', description: 'Resume in English',
    content: () => [
      { type: 'output', html: '  <span style="color:#34d399">Opening CVen-CamiloEscar.pdf...</span>' },
    ],
  },
};

// ─── FS Session overlay ───────────────────────────────────────────────────────
type FSNode = typeof FS[string];

const FS_EXTRA_KEY   = 'term_fs_extra';
const FS_DELETED_KEY = 'term_fs_deleted';

const loadExtra   = (): Record<string, FSNode> => {
  try { return JSON.parse(sessionStorage.getItem(FS_EXTRA_KEY)   ?? '{}'); } catch { return {}; }
};
const loadDeleted = (): string[] => {
  try { return JSON.parse(sessionStorage.getItem(FS_DELETED_KEY) ?? '[]'); } catch { return []; }
};
const saveExtra   = (data: Record<string, FSNode>) =>
  sessionStorage.setItem(FS_EXTRA_KEY,   JSON.stringify(data));
const saveDeleted = (data: string[]) =>
  sessionStorage.setItem(FS_DELETED_KEY, JSON.stringify(data));

// Combina FS base + overlay de sesión
const getFS = (): Record<string, FSNode> => {
  const deleted = loadDeleted();
  const extra   = loadExtra();

  // Reconstruir content() para nodos que tienen _raw (subidos por drag&drop)
  Object.entries(extra).forEach(([path, node]: [string, any]) => {
    if (node._raw && !node.content) {
      const isImage = node._mime?.startsWith('image/') ||
        /\.(jpg|jpeg|png|gif|webp|svg|bmp|avif)$/i.test(path);
      const isPdf = node._mime === 'application/pdf' || path.endsWith('.pdf');

      node.content = () => {
        const freshRaw = sessionStorage.getItem(`term_file_${path.split('/').pop()}`) ?? node._raw;
        const mediaLines: TermLine[] = isImage ? [
          {
            type: 'output',
            html: `<img src="${freshRaw}" alt="${path}" style="max-width:95%;max-height:220px;border-radius:8px;margin:8px 0 4px 8px;display:block;border:1px solid rgba(255,255,255,0.1);" />`,
          },
          { type: 'output', html: `  <span style="color:#4a4a6a">${node._mime} · ${node.description}</span>` },
        ] : isPdf ? [
          { type: 'output', html: `  <span style="color:#4a4a6a">PDF · ${node.description}</span>` },
          { type: 'output', html: '  <span style="color:#34d399">→ se abrirá en nueva pestaña</span>' },
        ] : [
          { type: 'output', html: '  <span style="color:#4a4a6a">[archivo binario]</span>' },
        ];

        return [
          { type: 'output', text: '' },
          { type: 'output', html: `<span style="color:#fbbf24">${path.split('/').pop()}</span>  <span style="color:#4a4a6a">${node.description}</span>` },
          { type: 'output', text: '' },
          ...mediaLines,
          { type: 'output', text: '' },
        ];
      };
    }
  });

  const base = Object.fromEntries(
    Object.entries(FS).filter(([k]) => !deleted.includes(k))
  );
  return { ...base, ...extra };
};

// Agregar nodo al overlay
const fsAddNode = (path: string, node: FSNode) => {
  const extra = loadExtra();
  extra[path] = node;
  // Asegurar que el padre tenga este hijo en su lista
  const parts  = path.split('/').filter(Boolean);
  const name   = parts[parts.length - 1];
  const parent = parts.length === 1 ? '/' : '/' + parts.slice(0, -1).join('/');
  if (!extra[parent] && FS[parent]) {
    extra[parent] = { ...FS[parent], children: [...(FS[parent].children ?? []), name] };
  } else if (extra[parent]) {
    const children = extra[parent].children ?? [];
    if (!children.includes(name)) extra[parent] = { ...extra[parent], children: [...children, name] };
  }
  saveExtra(extra);
};

// Eliminar nodo (marca como deleted y limpia de parents)
const fsDeleteNode = (path: string) => {
  const deleted = loadDeleted();
  if (!deleted.includes(path)) { deleted.push(path); saveDeleted(deleted); }
  // Sacar del parent
  const extra  = loadExtra();
  const parts  = path.split('/').filter(Boolean);
  const name   = parts[parts.length - 1];
  const parent = parts.length === 1 ? '/' : '/' + parts.slice(0, -1).join('/');
  const parentNode = extra[parent] ?? FS[parent];
  if (parentNode) {
    extra[parent] = { ...parentNode, children: (parentNode.children ?? []).filter(c => c !== name) };
  }
  saveExtra(extra);
};

function dataURLtoBlob(dataURL: string): Blob {
  const [header, data] = dataURL.split(',');
  const mime = header.match(/:(.*?);/)?.[1] ?? 'application/octet-stream';
  const binary = atob(data);
  const array  = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) array[i] = binary.charCodeAt(i);
  return new Blob([array], { type: mime });
}

// ─── Respuestas de la terminal ────────────────────────────────────────────────
const TERM_CMDS: Record<string, (args: string[]) => TermLine[]> = {
  help: () => [
    { type: 'output', text: '' },
    { type: 'output', html: '<span style="color:#818cf8;font-weight:600">Comandos disponibles:</span>' },
    { type: 'output', html: '  <span style="color:#34d399">whoami</span>          — Quién soy' },
    { type: 'output', html: '  <span style="color:#34d399">skills</span>          — Stack técnico completo' },
    { type: 'output', html: '  <span style="color:#34d399">projects</span>        — Proyectos destacados' },
    { type: 'output', html: '  <span style="color:#34d399">experience</span>      — Experiencia laboral' },
    { type: 'output', html: '  <span style="color:#34d399">education</span>       — Formación académica' },
    { type: 'output', html: '  <span style="color:#34d399">contact</span>         — Formas de contacto' },
    { type: 'output', html: '  <span style="color:#34d399">stack [name]</span>    — Info de una tecnología' },
    { type: 'output', html: '  <span style="color:#34d399">fun</span>             — Dato random sobre mí' },
    { type: 'output', html: '  <span style="color:#34d399">date</span>            — Fecha y hora actual' },
    { type: 'output', html: '  <span style="color:#34d399">echo [texto]</span>    — Repetir texto' },
    { type: 'output', html: '  <span style="color:#34d399">ls</span>              — Listar secciones del portfolio' },
    { type: 'output', html: '  <span style="color:#34d399">cat [sección]</span>   — Ver detalle de sección' },
    { type: 'output', html: '  <span style="color:#34d399">clear</span>           — Limpiar terminal' },
    { type: 'output', html: '  <span style="color:#34d399">cd [dir]</span>         — Entrar a un directorio' },
    { type: 'output', html: '  <span style="color:#34d399">cd ..</span>           — Subir un nivel' },
    { type: 'output', html: '  <span style="color:#34d399">pwd</span>             — Ver directorio actual' },
    { type: 'output', html: '  <span style="color:#34d399">ls</span>              — Listar directorio actual' },
    { type: 'output', html: '  <span style="color:#34d399">touch [archivo]</span>  — Crear archivo vacío' },
    { type: 'output', html: '  <span style="color:#34d399">mkdir [dir]</span>      — Crear directorio' },
    { type: 'output', html: '  <span style="color:#34d399">rm [archivo]</span>     — Eliminar archivo' },
    { type: 'output', html: '  <span style="color:#34d399">rmdir [dir]</span>      — Eliminar directorio vacío' },
    { type: 'output', html: '  <span style="color:#34d399">echo txt > file</span>  — Escribir en archivo' },
    { type: 'output', html: '  <span style="color:#34d399">reset</span>            — Restaurar filesystem original' },
    { type: 'output', html: '  <span style="color:#34d399">drag & drop</span>     — Arrastrá un archivo para subirlo a /uploads/' },
    { type: 'output', text: '' },
    { type: 'output', html: '<span style="color:#4a4a6a">Tab → cambiar de modo | ↑↓ → historial de comandos</span>' },
    { type: 'output', text: '' },
  ],

  whoami: () => [
    { type: 'output', text: '' },
    { type: 'output', html: '<span style="color:#fbbf24;font-size:1.1em">▸ Camilo Escar</span>' },
    { type: 'output', html: '  Full Stack Developer · Concepción del Uruguay, Entre Ríos 🇦🇷' },
    { type: 'output', text: '' },
    { type: 'output', html: '  Especializado en <span style="color:#34d399">Node.js</span>, <span style="color:#60a5fa">React</span> y <span style="color:#818cf8">Next.js</span>' },
    { type: 'output', text: '  Apasionado por construir productos con buena UX y código limpio.' },
    { type: 'output', text: '  Siempre aprendiendo. Siempre construyendo.' },
    { type: 'output', text: '' },
    { type: 'output', html: '  <span style="color:#4a4a6a">Disponible para proyectos freelance y trabajo remoto 🌍</span>' },
    { type: 'output', text: '' },
  ],

  skills: () => [
    { type: 'output', text: '' },
    { type: 'output', html: '<span style="color:#818cf8;font-weight:600">── Frontend ──────────────────────────</span>' },
    { type: 'output', html: '  <span style="color:#60a5fa">React</span>  <span style="color:#60a5fa">Next.js</span>  <span style="color:#34d399">TypeScript</span>  <span style="color:#fbbf24">Tailwind CSS</span>' },
    { type: 'output', html: '  <span style="color:#f472b6">Framer Motion</span>  <span style="color:#818cf8">Redux</span>  <span style="color:#34d399">Zustand</span>' },
    { type: 'output', text: '' },
    { type: 'output', html: '<span style="color:#34d399;font-weight:600">── Backend ───────────────────────────</span>' },
    { type: 'output', html: '  <span style="color:#34d399">Node.js</span>  <span style="color:#34d399">Express</span>  <span style="color:#60a5fa">Python</span>  <span style="color:#fbbf24">Django</span>' },
    { type: 'output', html: '  <span style="color:#818cf8">GraphQL</span>  <span style="color:#f472b6">REST APIs</span>  <span style="color:#34d399">WebSockets</span>' },
    { type: 'output', text: '' },
    { type: 'output', html: '<span style="color:#fbbf24;font-weight:600">── Bases de datos ────────────────────</span>' },
    { type: 'output', html: '  <span style="color:#34d399">MongoDB</span>  <span style="color:#60a5fa">PostgreSQL</span>  <span style="color:#fbbf24">MySQL</span>  <span style="color:#f472b6">Redis</span>' },
    { type: 'output', text: '' },
    { type: 'output', html: '<span style="color:#f472b6;font-weight:600">── DevOps & Tools ────────────────────</span>' },
    { type: 'output', html: '  <span style="color:#60a5fa">Docker</span>  <span style="color:#fbbf24">AWS</span>  <span style="color:#818cf8">Git</span>  <span style="color:#34d399">Vercel</span>  <span style="color:#f472b6">CI/CD</span>' },
    { type: 'output', text: '' },
    { type: 'output', html: '<span style="color:#4a4a6a">Tip: stack [nombre] para ver más info de una tecnología</span>' },
    { type: 'output', text: '' },
  ],

  stack: (args) => {
    const tech = args[0]?.toLowerCase();
    const info: Record<string, string[]> = {
      react:      ['React 18 · Hooks, Context, Suspense', 'Nivel: ████████░░ Avanzado'],
      nextjs:     ['Next.js 14 · App Router, Server Components', 'Nivel: ████████░░ Avanzado'],
      typescript: ['TypeScript · Tipos, generics, decorators', 'Nivel: ███████░░░ Intermedio-Alto'],
      nodejs:     ['Node.js · Express, Fastify, streams', 'Nivel: ████████░░ Avanzado'],
      python:     ['Python · Django, FastAPI, scripting', 'Nivel: ██████░░░░ Intermedio'],
      docker:     ['Docker · Compose, redes, volumes', 'Nivel: ██████░░░░ Intermedio'],
    };
    const aliases: Record<string, string> = { 'next.js': 'nextjs', 'next': 'nextjs', 'ts': 'typescript', 'node': 'nodejs' };
    const key = aliases[tech] ?? tech;
    if (!tech) return [{ type: 'output', html: '<span style="color:#f87171">Uso: stack [nombre] — ej: stack react</span>' }];
    if (!info[key]) return [{ type: 'output', html: `<span style="color:#f87171">Tecnología "${tech}" no encontrada</span>` }];
    return [
      { type: 'output', text: '' },
      ...info[key].map(l => ({ type: 'output' as const, html: `  ${l}` })),
      { type: 'output', text: '' },
    ];
  },

  projects: () => [
    { type: 'output', text: '' },
    { type: 'output', html: '<span style="color:#818cf8;font-weight:600">Proyectos destacados:</span>' },
    { type: 'output', text: '' },

    { type: 'output', html: '  <span style="color:#fbbf24">01.</span> <span style="color:#f0f0f5;font-weight:600">CRM + ERP Empresarial</span>' },
    { type: 'output', html: '      <span style="color:#4a4a6a">api-crm-erp · admin-crm-erp</span>' },
    { type: 'output', html: '      <span style="color:#4a4a6a">Laravel · Angular · MySQL · APIs REST</span>' },
    { type: 'output', html: '      <span style="color:#4a4a6a">Sistema modular con gestión de clientes, ventas, inventario y procesos administrativos.</span>' },
    { type: 'output', html: '      <span style="color:#34d399">→**Proyecto en desarrollo** Backend y panel administrativo</span>' },
    { type: 'output', text: '' },

    { type: 'output', html: '  <span style="color:#fbbf24">02.</span> <span style="color:#f0f0f5;font-weight:600">E-commerce Full Stack (Arquitectura API First)</span>' },
    { type: 'output', html: '      <span style="color:#4a4a6a">api_ecommerce · ecommerce · admin_metronic_8.2</span>' },
    { type: 'output', html: '      <span style="color:#4a4a6a">Laravel · Angular · MySQL · JWT · Panel Admin</span>' },
    { type: 'output', html: '      <span style="color:#4a4a6a">Gestión de productos, órdenes, usuarios y autenticación basada en tokens.</span>' },
    { type: 'output', html: '      <span style="color:#34d399">→ Separación clara entre API, frontend y administración</span>' },
    { type: 'output', text: '' },

    { type: 'output', html: '  <span style="color:#fbbf24">03.</span> <span style="color:#f0f0f5;font-weight:600">Portfolio Moderno</span>' },
    { type: 'output', html: '      <span style="color:#4a4a6a">landing-page-portfolio</span>' },
    { type: 'output', html: '      <span style="color:#4a4a6a">Next.js 14 · TypeScript · Tailwind · App Router</span>' },
    { type: 'output', html: '      <span style="color:#4a4a6a">Arquitectura modular con theming dinámico y enfoque en performance y SEO.</span>' },
    { type: 'output', html: '      <span style="color:#34d399">→ Este proyecto</span>' },
    { type: 'output', text: '' },

    { type: 'output', html: '  <span style="color:#60a5fa">Más proyectos backend, frontend y académicos → github.com/CamiloEscar</span>' },
    { type: 'output', text: '' },
  ],

  experience: () => [
    { type: 'output', text: '' },
    { type: 'output', html: '<span style="color:#818cf8;font-weight:600">Experiencia profesional:</span>' },
    { type: 'output', text: '' },

    { type: 'output', html: '  <span style="color:#34d399">2022 → Presente</span>' },
    { type: 'output', html: '  <span style="color:#f0f0f5;font-weight:600">Full Stack Developer</span>' },
    { type: 'output', html: '  <span style="color:#4a4a6a">Desarrollo de sistemas empresariales con arquitectura limpia.</span>' },
    { type: 'output', html: '  <span style="color:#4a4a6a">Trabajo actual para un cliente que necesita un CRM + ERP utilice Laravel y Angular.</span>' },
    { type: 'output', html: '  <span style="color:#4a4a6a">Diseño de APIs REST, modelado de base de datos, autenticación JWT y desarrollo de paneles administrativos.</span>' },
    { type: 'output', text: '' },

    { type: 'output', html: '  <span style="color:#fbbf24">2021 → 2022</span>' },
    { type: 'output', html: '  <span style="color:#f0f0f5;font-weight:600">Frontend Developer Junior</span>' },
    { type: 'output', html: '  <span style="color:#4a4a6a">Primeros pasos con HTML y CSS y ejercicios de logica con Python, luego comence con el desarrollo en React y consumo de APIs REST.</span>' },
    { type: 'output', html: '  <span style="color:#4a4a6a">Creación de componentes reutilizables y mejora de experiencia de usuario.</span>' },
    { type: 'output', text: '' },
  ],

  education: () => [
    { type: 'output', text: '' },
    { type: 'output', html: '<span style="color:#818cf8;font-weight:600">Formación:</span>' },
    { type: 'output', text: '' },
    { type: 'output', html: '  <span style="color:#34d399">Tecnicatura en Programación</span> · UTN · En curso' },
    { type: 'output', text: '' },
    { type: 'output', html: '  <span style="color:#fbbf24">Certificaciones:</span>' },
    { type: 'output', html: '  · Full Stack MERN — Coderhouse  <span style="color:#4a4a6a">2022</span>' },
    { type: 'output', html: '  · Data Analytics — Coderhouse  <span style="color:#4a4a6a">2023</span>' },
    { type: 'output', html: '  · React + TypeScript — Devtalles    <span style="color:#4a4a6a">2023</span>' },
    { type: 'output', html: '  · Node.js Avanzado — Devtalles     <span style="color:#4a4a6a">2024</span>' },
    { type: 'output', html: '  · Docker & DevOps — Devtalles       <span style="color:#4a4a6a">2025</span>' },
    { type: 'output', text: '' },
  ],

  contact: () => [
    { type: 'output', text: '' },
    { type: 'output', html: '<span style="color:#818cf8;font-weight:600">Contacto:</span>' },
    { type: 'output', text: '' },
    { type: 'output', html: '  <span style="color:#34d399">Email</span>      camiloescar1@gmail.com' },
    { type: 'output', html: '  <span style="color:#60a5fa">LinkedIn</span>   linkedin.com/in/camiloescar' },
    { type: 'output', html: '  <span style="color:#f0f0f5">GitHub</span>     github.com/CamiloEscar' },
    { type: 'output', html: '  <span style="color:#34d399">WhatsApp</span>   +54 9 3442 475466' },
    { type: 'output', text: '' },
    { type: 'output', html: '  <span style="color:#4a4a6a">Abierto a propuestas remotas 🌍</span>' },
    { type: 'output', text: '' },
  ],

  ls: () => [
    { type: 'output', text: '' },
    { type: 'output', html: '<span style="color:#818cf8">drwxr-xr-x</span>  <span style="color:#60a5fa">inicio/</span>       Portfolio principal' },
    { type: 'output', html: '<span style="color:#818cf8">drwxr-xr-x</span>  <span style="color:#60a5fa">proyectos/</span>    Casos de estudio' },
    { type: 'output', html: '<span style="color:#818cf8">drwxr-xr-x</span>  <span style="color:#60a5fa">minimal/</span>      Vista compacta' },
    { type: 'output', html: '<span style="color:#818cf8">drwxr-xr-x</span>  <span style="color:#60a5fa">blog/</span>         Artículos técnicos' },
    { type: 'output', html: '<span style="color:#818cf8">-rw-r--r--</span>  <span style="color:#34d399">CVes-CamiloEscar.pdf</span>' },
    { type: 'output', html: '<span style="color:#818cf8">-rw-r--r--</span>  <span style="color:#34d399">CVen-CamiloEscar.pdf</span>' },
    { type: 'output', text: '' },
    { type: 'output', html: '<span style="color:#4a4a6a">Tip: cat [sección] — ej: cat blog</span>' },
    { type: 'output', text: '' },
  ],

  cat: (args) => {
    const sec = args[0]?.toLowerCase();
    const content: Record<string, TermLine[]> = {
      blog:      [{ type: 'output', html: '  Artículos técnicos sobre React, Node.js y arquitectura web' }],
      proyectos: [{ type: 'output', html: '  Casos de estudio con stack, decisiones y resultados' }],
      minimal:   [{ type: 'output', html: '  Vista compacta del portfolio con tech stack interactivo' }],
      inicio:    [{ type: 'output', html: '  Landing principal — Presentación, experiencia y contacto' }],
    };
    if (!sec || !content[sec]) {
      return [{ type: 'error', html: `  cat: ${sec ?? ''}: No existe — escribí <span style="color:#34d399">ls</span> para ver opciones` }];
    }
    return [{ type: 'output', text: '' }, ...content[sec], { type: 'output', text: '' }];
  },

  fun: () => {
    const facts = [
  'Mate promedio diario: 2 termos. Si hay deploy, 3.',
  'El café no me despierta. Me estabiliza.',
  'Mi primer bug serio fue en producción. Obvio.',
  'Después de las 23hs el código fluye… y las malas decisiones también.',
  '4 horas debuggeando para descubrir que era un console.log comentado.',
  '38 tabs de documentación abiertas. Ninguna era la que necesitaba.',
  'git commit -m "ahora sí" × 12. Nunca fue "sí".',
  '"Funciona en mi máquina" — últimas palabras antes del caos.',
  'Deploy un viernes 18:57. Porque me gusta vivir al límite.',
  'Nombres de variables: dato, dato2, datoBueno, datoBuenoAhoraSi',
  'El bug desaparece cuando compartís pantalla.',
  'npm install y a rezar.',
  'El código quedó prolijo. Nadie lo va a volver a tocar. (mentira)',
  'Programo mejor con lo-fi… hasta que me pongo a cantar.',
];
    return [
      { type: 'output', text: '' },
      { type: 'output', html: `<span style="color:#fbbf24">Dato random:</span>  ${facts[Math.floor(Math.random() * facts.length)]}` },
      { type: 'output', text: '' },
    ];
  },

  date: () => [
    { type: 'output', text: new Date().toLocaleString('es-AR', { dateStyle: 'full', timeStyle: 'medium' }) },
  ],

  echo: (args) => [{ type: 'output', text: args.join(' ') }],

  clear: () => [],  // manejado especialmente
};

// ─── Hook: comandos de paleta ─────────────────────────────────────────────────
function useCommands(setMode: (m: Mode) => void): Command[] {
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();

  const THEMES = [
    { id: 'light',   label: 'Claro',   icon: <Sun     size={14} /> },
    { id: 'dark',    label: 'Oscuro',  icon: <Moon    size={14} /> },
    { id: 'sunrise', label: 'Sunrise', icon: <Sunrise size={14} /> },
    { id: 'sunset',  label: 'Sunset',  icon: <Sunset  size={14} /> },
  ];

  return [
    // Navegación
    { id: 'nav-home',      label: 'Inicio',            category: 'Navegación', shortcut: 'H',
      description: 'Volver al inicio',                 icon: <User size={14} />,
      keywords: ['home','inicio','about','sobre'],      action: () => router.push('/') },
    { id: 'nav-portfolio', label: 'Proyectos',          category: 'Navegación', shortcut: 'P',
      description: 'Casos de estudio y proyectos',     icon: <Briefcase size={14} />,
      keywords: ['projects','portfolio','trabajo'],     action: () => router.push('/portfolio') },
    { id: 'nav-minimal',   label: 'Portfolio mínimo',   category: 'Navegación', shortcut: 'M',
      description: 'Vista compacta con tech stack',    icon: <Code2 size={14} />,
      keywords: ['minimal','compact','skills','tech'],  action: () => router.push('/minimal') },
    { id: 'nav-blog',      label: 'Blog',               category: 'Navegación', shortcut: 'B',
      description: 'Artículos y notas técnicas',       icon: <FileText size={14} />,
      keywords: ['blog','articulos','posts'],           action: () => router.push('/blog') },
    { id: 'mode-terminal', label: 'Abrir Terminal',     category: 'Navegación', shortcut: 'T',
      description: 'Terminal interactiva del portfolio', icon: <Terminal size={14} />,
      keywords: ['terminal','cli','consola','shell'],   action: () => setMode('terminal') },
    { id: 'mode-editor',   label: 'Abrir Editor JS',    category: 'Navegación', shortcut: 'J',
      description: 'Ejecutar JavaScript en el browser', icon: <Code2 size={14} />,
      keywords: ['editor','js','javascript','run','ejecutar','codigo'], action: () => setMode('editor') },
    { id: 'nav-scroll-top', label: 'Ir al inicio',      category: 'Navegación', shortcut: 'I',
      description: 'Scroll al top de la página',       icon: <ArrowUp size={14} />,
      keywords: ['scroll','top','arriba'],              action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },

    // Acciones
    { id: 'action-cv-es',     label: 'Descargar CV (ES)', category: 'Acciones', shortcut: 'C',
      description: 'Currículum en español — PDF',          icon: <Download size={14} />,
      keywords: ['cv','resume','curriculum','pdf','es'],    action: () => window.open('/CVes-CamiloEscar.pdf','_blank') },
    { id: 'action-cv-en',     label: 'Download CV (EN)',   category: 'Acciones',
      description: 'Resume in English — PDF',              icon: <Download size={14} />,
      keywords: ['cv','resume','pdf','english','download'], action: () => window.open('/CVen-CamiloEscar.pdf','_blank') },
    { id: 'action-email',     label: 'Enviar correo',      category: 'Acciones', shortcut: 'E',
      description: 'camiloescar1@gmail.com',               icon: <Mail size={14} />,
      keywords: ['email','mail','correo','contacto'],       action: () => window.open('mailto:camiloescar1@gmail.com') },
    { id: 'action-whatsapp',  label: 'WhatsApp',           category: 'Acciones',
      description: 'Escribirme directo por WhatsApp',      icon: <Mail size={14} />,
      keywords: ['whatsapp','chat','mensaje','wa'],
      action: () => window.open('https://wa.me/5493442475466?text=Hola%20Camilo%2C%20vi%20tu%20portfolio%20%F0%9F%91%8B','_blank') },
    { id: 'action-copy',      label: 'Copiar enlace',      category: 'Acciones',
      description: 'Copiar URL del portfolio',             icon: <LinkIcon size={14} />,
      keywords: ['copy','link','url','compartir'],          action: () => navigator.clipboard.writeText(window.location.href) },

    // Social
    { id: 'social-github',   label: 'GitHub',    category: 'Social', shortcut: 'G',
      description: 'Ver repositorios públicos',  icon: <Github size={14} />,
      keywords: ['github','repos','git'],         action: () => window.open('https://github.com/CamiloEscar','_blank') },
    { id: 'social-linkedin', label: 'LinkedIn',  category: 'Social', shortcut: 'L',
      description: 'Conectar profesionalmente', icon: <Linkedin size={14} />,
      keywords: ['linkedin','profesional','red'], action: () => window.open('https://www.linkedin.com/in/camiloescar/','_blank') },

    // Preferencias
    ...THEMES.map(t => ({
      id: `theme-${t.id}`, label: `Tema ${t.label}`, category: 'Preferencias' as Category,
      description: resolvedTheme === t.id ? '✓ Activo ahora' : `Cambiar al modo ${t.label.toLowerCase()}`,
      icon: t.icon, keywords: ['tema','theme','color','modo', t.id],
      action: () => setTheme(t.id),
    })),
  ];
}

// ─── Componente principal ─────────────────────────────────────────────────────
interface CommandPaletteProps {
  showTrigger?: boolean;
  className?: string;
}

export default function CommandPalette({ showTrigger = true, className = '' }: CommandPaletteProps) {
  const [open,     setOpen]     = useState(false);
  const [mode,     setMode]     = useState<Mode>('commands');
  const [query,    setQuery]    = useState('');
  const [selected, setSelected] = useState(0);
  const [recent,   setRecent]   = useState<string[]>([]);
  const [executed, setExecuted] = useState<string | null>(null);
  const [copied,   setCopied]   = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef  = useRef<HTMLDivElement>(null);
  const commands = useCommands(setMode);

  // ── Filtrado ──────────────────────────────────────────────────────────────
  const filtered = query.trim()
    ? commands.filter(c =>
        c.label.toLowerCase().includes(query.toLowerCase()) ||
        c.description.toLowerCase().includes(query.toLowerCase()) ||
        c.category.toLowerCase().includes(query.toLowerCase()) ||
        c.keywords?.some(k => k.toLowerCase().includes(query.toLowerCase()))
      )
    : commands;

  const grouped = query.trim() ? null
    : CAT_ORDER.reduce<Partial<Record<Category, Command[]>>>((acc, cat) => {
        const items = filtered.filter(c => c.category === cat);
        if (items.length) acc[cat] = items;
        return acc;
      }, {});

  const flat: Command[] = grouped ? CAT_ORDER.flatMap(cat => grouped[cat] ?? []) : filtered;

  // ── Ejecutar ──────────────────────────────────────────────────────────────
  const execute = useCallback((cmd: Command) => {
    setExecuted(cmd.id);
    setRecent(prev => [cmd.id, ...prev.filter(id => id !== cmd.id)].slice(0, 4));
    if (cmd.id === 'action-copy') { setCopied(true); setTimeout(() => setCopied(false), 2200); }
    setTimeout(() => {
      setExecuted(null);
      if (cmd.id.startsWith('mode-')) {
        setQuery(''); setSelected(0); cmd.action(); return;
      }
      setOpen(false); setQuery(''); setSelected(0);
      cmd.action();
    }, 180);
  }, []);

  // ── Atajos globales ───────────────────────────────────────────────────────
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(v => { if (!v) { setMode('commands'); setQuery(''); setSelected(0); } return !v; });
      }
      if (e.key === 'Escape' && open) { setOpen(false); setQuery(''); }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
        e.preventDefault();
        const modes: Mode[] = ['commands','terminal','editor'];
        setMode(m => modes[(modes.indexOf(m) + 1) % modes.length]);
      }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [open]);

  useEffect(() => { if (open && mode === 'commands') setTimeout(() => inputRef.current?.focus(), 60); }, [open, mode]);
  useEffect(() => { setSelected(0); }, [query]);
  useEffect(() => {
    listRef.current?.querySelector(`[data-idx="${selected}"]`)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [selected]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (mode !== 'commands') return;
    if (e.key === 'ArrowDown')      { e.preventDefault(); setSelected(s => Math.min(s + 1, flat.length - 1)); }
    else if (e.key === 'ArrowUp')   { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)); }
    else if (e.key === 'Enter')     { const cmd = flat[selected]; if (cmd) execute(cmd); }
  };

  const recentCmds = recent.map(id => commands.find(c => c.id === id)).filter(Boolean) as Command[];
  const MODE_LABELS: Record<Mode, string> = { commands: '⌕  Comandos', terminal: '$  Terminal', editor: '</>  Editor' };

  return (
    <>
      {showTrigger && (
        <motion.button
          onClick={() => setOpen(true)}
          className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-mono transition-all ${className}`}
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.3)' }}
          whileHover={{ background: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.14)' }}
          whileTap={{ scale: 0.97 }}>
          <Terminal size={13} style={{ color: 'rgba(255,255,255,0.25)', flexShrink: 0 }} />
          <span className="flex-1 text-left" style={{ color: 'rgba(255,255,255,0.28)' }}>Buscar comandos...</span>
          <span className="flex items-center gap-1"><Kbd>⌘</Kbd><Kbd>K</Kbd></span>
        </motion.button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-start justify-center px-4"
            style={{ paddingTop: 'clamp(56px,11vh,120px)'}}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.14 }}
            onClick={e => { if (e.target === e.currentTarget) { setOpen(false); setQuery(''); } }}>

            <motion.div className="w-full flex flex-col overflow-hidden"
              style={{ maxWidth: 600, height: 'min(580px, calc(100vh - 140px))', background: '#0e0e16', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 14, boxShadow: '0 0 0 1px rgba(255,255,255,0.025),0 48px 96px rgba(0,0,0,0.88),0 0 140px rgba(99,102,241,0.07)' }}
              initial={{ opacity: 0, y: -14, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 420, damping: 32 }}>

              {/* ── Tabs de modo ── */}
              <div className="flex items-center gap-1 px-3 pt-3 pb-0 flex-shrink-0">
                {(['commands','terminal','editor'] as Mode[]).map(m => (
                  <motion.button key={m} onClick={() => setMode(m)}
                    className="px-3 py-2 rounded-t-lg text-xs font-mono transition-all relative"
                    style={{ borderBottom: mode === m ? '2px solid #818cf8' : '2px solid transparent' }}
                    animate={{ color: mode === m ? '#818cf8' : 'rgba(255,255,255,0.25)', background: mode === m ? 'rgba(99,102,241,0.1)' : 'transparent' }}
                    whileHover={{ color: mode === m ? '#818cf8' : 'rgba(255,255,255,0.45)' }}>
                    {MODE_LABELS[m]}
                  </motion.button>
                ))}
                <div className="ml-auto flex items-center gap-1.5 pr-2">
                  {/* En mobile: botón para volver a comandos desde terminal/editor */}
                  {mode !== 'commands' && (
                    <motion.button
                      onClick={() => setMode('commands')}
                      className="flex sm:hidden items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs"
                      style={{
                        fontFamily: 'monospace',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'rgba(255,255,255,0.5)',
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      ← Volver
                    </motion.button>
                  )}
                  {/* En desktop: hint de teclado */}
                  <span className="hidden sm:flex items-center gap-1.5"
                    style={{ fontFamily: 'monospace', fontSize: 9, color: 'rgba(255,255,255,0.12)' }}>
                    <Kbd small>Tab</Kbd><span>cambiar modo</span>
                  </span>
                  {/* Botón cerrar siempre visible en mobile */}
                  <motion.button
                    onClick={() => { setOpen(false); setQuery(''); }}
                    className="flex sm:hidden items-center justify-center w-7 h-7 rounded-lg"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'rgba(255,255,255,0.3)',
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X size={13} />
                  </motion.button>
                </div>
              </div>
              <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', flexShrink: 0 }} />

              {/* ── Paneles ── */}
              <AnimatePresence mode="wait">
                {mode === 'commands' && (
                  <motion.div key="commands" className="flex flex-col flex-1 overflow-hidden min-h-0"
                    initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 6 }} transition={{ duration: 0.12 }}>
                    {/* Búsqueda */}
                    <div className="flex items-center gap-3 px-5 py-3.5 flex-shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <Search size={14} style={{ color: 'rgba(255,255,255,0.18)', flexShrink: 0 }} />
                      <input ref={inputRef} className="flex-1 bg-transparent outline-none"
                        style={{ fontFamily: '\'DM Mono\',\'Fira Code\',monospace', fontSize: 14, color: 'rgba(255,255,255,0.82)', caretColor: '#818cf8' }}
                        placeholder="Buscar o ejecutar..." value={query}
                        onChange={e => setQuery(e.target.value)} onKeyDown={handleKey} />
                      <AnimatePresence>
                        {query && (
                          <motion.button initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }}
                            onClick={() => setQuery('')} style={{ color: 'rgba(255,255,255,0.2)', flexShrink: 0 }}>
                            <X size={13} />
                          </motion.button>
                        )}
                      </AnimatePresence>
                      <Kbd>ESC</Kbd>
                    </div>
                    {/* Lista */}
                    <div ref={listRef} className="flex-1 overflow-y-auto py-2 min-h-0"
                      style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.05) transparent' }}>
                      {flat.length === 0 && (
                        <div className="py-12 text-center" style={{ fontFamily: 'monospace', fontSize: 12, color: 'rgba(255,255,255,0.14)', fontStyle: 'italic' }}>
                          Sin resultados para &quot;{query}&quot;
                        </div>
                      )}
                      {query.trim() ? flat.map((cmd, idx) => (
                        <CmdRow key={cmd.id} cmd={cmd} idx={idx} selected={selected} executed={executed} onHover={setSelected} onExecute={execute} />
                      )) : (
                        CAT_ORDER.filter(cat => grouped?.[cat]?.length).map((cat, ci) => (
                          <div key={cat}>
                            {ci > 0 && <Separator />}
                            <CatLabel label={cat} color={CAT_COLOR[cat].text} />
                            {(grouped?.[cat] ?? []).map(cmd => (
                              <CmdRow key={cmd.id} cmd={cmd} idx={flat.indexOf(cmd)} selected={selected} executed={executed} onHover={setSelected} onExecute={execute} />
                            ))}
                          </div>
                        ))
                      )}
                      {!query.trim() && recentCmds.length > 0 && (
                        <div>
                          <Separator />
                          <CatLabel label="Recientes" color="rgba(255,255,255,0.18)" />
                          <div className="flex flex-wrap gap-2 px-5 pb-3 pt-1">
                            {recentCmds.map(cmd => (
                              <motion.button key={cmd.id} onClick={() => execute(cmd)}
                                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg"
                                style={{ fontFamily: 'monospace', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.3)' }}
                                whileHover={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.55)' }} whileTap={{ scale: 0.96 }}>
                                <Clock size={9} />{cmd.label}
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    {/* Footer */}
                    <div className="flex items-center justify-between px-5 py-2.5 flex-shrink-0"
                      style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.3)' }}>
                      <div className="flex gap-4">
                        {[['↑↓','navegar'],['↵','ejecutar'],['ESC','cerrar']].map(([k,l]) => (
                          <span key={l} className="flex items-center gap-1.5" style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(255,255,255,0.16)' }}>
                            <Kbd small>{k}</Kbd>{l}
                          </span>
                        ))}
                      </div>
                      <span style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(255,255,255,0.14)' }}>{flat.length} comandos</span>
                    </div>
                  </motion.div>
                )}

                {mode === 'terminal' && (
                  <motion.div key="terminal" className="flex flex-col flex-1 overflow-hidden min-h-0"
                    initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 6 }} transition={{ duration: 0.12 }}>
                    <TerminalPane />
                  </motion.div>
                )}

                {mode === 'editor' && (
                  <motion.div key="editor" className="flex flex-col flex-1 overflow-hidden min-h-0"
                    initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 6 }} transition={{ duration: 0.12 }}>
                    <EditorPane />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast copiado */}
      <AnimatePresence>
        {copied && (
          <motion.div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[10000] flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm pointer-events-none"
            style={{ fontFamily: 'monospace', background: '#0e0e16', border: '1px solid rgba(99,102,241,0.35)', color: '#818cf8', boxShadow: '0 8px 32px rgba(0,0,0,0.7)', whiteSpace: 'nowrap' }}
            initial={{ opacity: 0, y: 10, scale: 0.93 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: 0.95 }}>
            <LinkIcon size={12} />Enlace copiado al portapapeles
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Terminal ─────────────────────────────────────────────────────────────────
function TerminalPane() {
  const BOOT: TermLine[] = [
    { type: 'system', html: '<span style="color:#818cf8">camilo@portfolio</span><span style="color:#4a4a6a">:~$</span> <span style="color:#34d399">./init.sh</span>' },
    { type: 'output', text: '' },
    { type: 'output', html: '<span style="color:#818cf8">  ██████╗ █████╗ ███╗   ███╗██╗██╗      ██████╗ </span>' },
    { type: 'output', html: '<span style="color:#818cf8">  ██╔════╝██╔══██╗████╗ ████║██║██║     ██╔═══██╗</span>' },
    { type: 'output', html: '<span style="color:#818cf8">  ██║     ███████║██╔████╔██║██║██║     ██║   ██║</span>' },
    { type: 'output', html: '<span style="color:#818cf8">  ██║     ██╔══██║██║╚██╔╝██║██║██║     ██║   ██║</span>' },
    { type: 'output', html: '<span style="color:#818cf8">  ╚██████╗██║  ██║██║ ╚═╝ ██║██║███████╗╚██████╔╝</span>' },
    { type: 'output', html: '<span style="color:#818cf8">   ╚═════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚══════╝ ╚═════╝</span>' },
    { type: 'output', text: '' },
    { type: 'output', html: '  <span style="color:#fbbf24">Portfolio v2.0</span>  ·  Camilo Escar  ·  Full Stack Developer' },
    { type: 'output', html: '  Escribí <span style="color:#34d399">help</span> para ver los comandos disponibles.' },
    { type: 'output', text: '' },
  ];

  const [lines,   setLines]   = useState<TermLine[]>(BOOT);
  const [input,   setInput]   = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [cwd,     setCwd]     = useState('/');
  const [, setForceUpdate]       = useState(0); // para re-render tras cambios en FS
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

const handleDragOver = (e: React.DragEvent) => {
  e.preventDefault();
  setDragging(true);
};

const handleDragLeave = (e: React.DragEvent) => {
  // Solo si sale del contenedor completo, no de hijos
  if (!e.currentTarget.contains(e.relatedTarget as Node)) {
    setDragging(false);
  }
};

const handleDrop = (e: React.DragEvent) => {
  e.preventDefault();
  setDragging(false);
  const files = Array.from(e.dataTransfer.files);
  if (files.length === 0) return;

  files.forEach(file => {
    const reader = new FileReader();
    // Cambiar la detección de tipo:
    const isImage = file.type.startsWith('image/') ||
      /\.(jpg|jpeg|png|gif|webp|svg|bmp|ico|avif)$/i.test(file.name);
    const isPdf   = file.type === 'application/pdf' ||
      file.name.endsWith('.pdf');
    const isText  = !isImage && !isPdf && (
      file.type.startsWith('text/') ||
      /\.(txt|md|json|js|ts|tsx|jsx|css|html|csv|yaml|yml|env|sh|py|sql)$/i.test(file.name)
    );

    // Cambiar el reader.onload para manejar cada tipo:
    reader.onload = () => {
      const raw = reader.result as string;
      try { sessionStorage.setItem(`term_file_${file.name}`, raw); } catch {}

      const uploadPath = `/uploads/${file.name}`;

      // Contenido según tipo
      let contentLines: TermLine[];
      if (isImage) {
        contentLines = [
          { type: 'output', html: `  <img src="${raw}" alt="${file.name}" style="max-width:100%;max-height:200px;border-radius:6px;margin:8px 0;display:block;" />` },
          { type: 'output', html: `  <span style="color:#4a4a6a">${file.type} · ${(file.size / 1024).toFixed(1)} KB</span>` },
        ];
      } else if (isPdf) {
        contentLines = [
          { type: 'output', html: `  <span style="color:#4a4a6a">PDF · ${(file.size / 1024).toFixed(1)} KB</span>` },
          { type: 'output', html: '  <span style="color:#34d399">→ abrir en nueva pestaña</span>' },
        ];
      } else if (isText) {
        const textLines = (raw as string).split('\n').slice(0, 200);
        contentLines = textLines.map(l => ({ type: 'output' as const, text: `  ${l}` }));
        if ((raw as string).split('\n').length > 200) {
          contentLines.push({ type: 'output', html: `  <span style="color:#4a4a6a">... (${(raw as string).split('\n').length - 200} líneas más)</span>` });
        }
      } else {
        contentLines = [
          { type: 'output', html: `  <span style="color:#4a4a6a">[archivo binario · ${(file.size / 1024).toFixed(1)} KB]</span>` },
        ];
      }

      // Asegurar /uploads
      const fs = getFS();
      if (!fs['/uploads']) {
        fsAddNode('/uploads', {
          type: 'dir',
          description: 'Archivos subidos por drag & drop',
          children: [],
          content: () => {
            const currentFs = getFS();
            const node = currentFs['/uploads'];
            const children = node?.children ?? [];
            return [
              { type: 'output', text: '' },
              { type: 'output', html: '<span style="color:#818cf8;font-weight:600">── /uploads ──────────────────────────</span>' },
              ...children.map(c => ({
                type: 'output' as const,
                html: `  <span style="color:#fbbf24">-rw-r--r--</span>  <span style="color:#34d399">${c}</span>`,
              })),
              { type: 'output', text: '' },
            ];
          },
        });
      }

      fsAddNode(uploadPath, {
        type: 'file',
        description: `${file.name} · ${(file.size / 1024).toFixed(1)} KB`,
        _raw: raw,         // guardar base64/texto para abrir después
        _mime: file.type,
        content: () => [
          { type: 'output', text: '' },
          { type: 'output', html: `<span style="color:#fbbf24">${file.name}</span>  <span style="color:#4a4a6a">${(file.size / 1024).toFixed(1)} KB · ${file.type || 'unknown'}</span>` },
          { type: 'output', text: '' },
          ...contentLines,
          { type: 'output', text: '' },
        ],
      } as any);

      setLines(prev => [...prev,
        { type: 'system', html: '' },
        { type: 'system', html: `<span style="color:#34d399">▲ ${file.name}</span>  <span style="color:#4a4a6a">${(file.size / 1024).toFixed(1)} KB → /uploads/${file.name}</span>` },
        { type: 'output', html: `  <span style="color:#4a4a6a">cat /uploads/${file.name}  →  ver contenido</span>` },
        { type: 'output', text: '' },
      ]);
      setForceUpdate((n: number) => n + 1);
    };

    // Leer según tipo:
    if (isText) {
      reader.readAsText(file);
    } else {
      reader.readAsDataURL(file); // base64 para imágenes, PDFs y binarios
    }
  });
};

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [lines]);
  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 80); }, []);

  const resolvePath = (target: string, current: string): string => {
    if (target === '/') return '/';
    if (target.startsWith('/')) return target.replace(/\/$/, '') || '/';
    if (target === '..') {
      const parts = current.split('/').filter(Boolean);
      parts.pop();
      return parts.length === 0 ? '/' : '/' + parts.join('/');
    }
    if (target === '.') return current;
    const base = current === '/' ? '' : current;
    return `${base}/${target}`;
  };

  const prompt = (cwdVal: string) => {
    const display = cwdVal === '/' ? '~' : cwdVal;
    return `<span style="color:#818cf8">camilo@portfolio</span><span style="color:#4a4a6a">:${display}$</span>`;
  };

  const pushLines = (extra: TermLine[]) =>
    setLines(prev => [...prev, ...extra]);

  const run = useCallback((raw: string, currentCwd: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    const promptLine: TermLine = {
      type: 'input',
      html: `${prompt(currentCwd)} <span style="color:#f0f0f5">${trimmed}</span>`,
    };

    // ── echo texto > archivo ─────────────────────────────────────
    const echoRedirect = trimmed.match(/^echo\s+(.+?)\s*>\s*(.+)$/i);
    if (echoRedirect) {
      const content = echoRedirect[1].replace(/^["']|["']$/g, '');
      const target  = echoRedirect[2].trim();
      const resolved = resolvePath(target, currentCwd);
      const fs = getFS();
      const existing = fs[resolved];
      const fileContent = existing?.type === 'file'
        ? (existing as any)._text ? `${(existing as any)._text}\n${content}` : content
        : content;

      fsAddNode(resolved, {
        type: 'file',
        description: target,
        _text: fileContent,
        content: () => [
          { type: 'output', text: '' },
          ...fileContent.split('\n').map((l: string) => ({ type: 'output' as const, text: `  ${l}` })),
          { type: 'output', text: '' },
        ],
      } as any);

      pushLines([promptLine,
        { type: 'output', html: `  <span style="color:#34d399">✓ ${target}</span> guardado` },
        { type: 'output', text: '' },
      ]);
      setForceUpdate(n => n + 1);
      setHistory(h => [trimmed, ...h].slice(0, 50));
      setHistIdx(-1); setInput('');
      return;
    }

    const [cmd, ...args] = trimmed.split(/\s+/);
    const cmdLower = cmd.toLowerCase();
    const fs = getFS();

    // ── cd ───────────────────────────────────────────────────────
    if (cmdLower === 'cd') {
      const target   = args[0] ?? '/';
      const resolved = resolvePath(target, currentCwd);
      const node     = fs[resolved];

      if (!node) {
        pushLines([promptLine,
          { type: 'error', html: `  <span style="color:#f87171">cd: ${target}: No existe ese directorio</span>` },
          { type: 'output', text: '' },
        ]);
      } else if (node.type === 'file') {
        pushLines([promptLine,
          { type: 'error', html: `  <span style="color:#f87171">cd: ${target}: Es un archivo, no un directorio</span>` },
          { type: 'output', text: '' },
        ]);
      } else {
        const content = node.content ? node.content() : [];
        setCwd(resolved);
        pushLines([promptLine, ...content]);
      }
      setHistory(h => [trimmed, ...h].slice(0, 50));
      setHistIdx(-1); setInput(''); return;
    }

    // ── pwd ──────────────────────────────────────────────────────
    if (cmdLower === 'pwd') {
      pushLines([promptLine,
        { type: 'output', text: currentCwd },
        { type: 'output', text: '' },
      ]);
      setHistory(h => [trimmed, ...h].slice(0, 50));
      setHistIdx(-1); setInput(''); return;
    }

    // ── ls ───────────────────────────────────────────────────────
    if (cmdLower === 'ls') {
      const node     = fs[currentCwd];
      const children = node?.children ?? [];

      if (children.length === 0 && !node?.content) {
        pushLines([promptLine,
          { type: 'output', text: '  (directorio vacío)' },
          { type: 'output', text: '' },
        ]);
      } else if (node?.content && children.length === 0) {
        pushLines([promptLine, ...node.content()]);
      } else {
        pushLines([promptLine, { type: 'output', text: '' },
          ...children.map(c => {
            const childPath = currentCwd === '/' ? `/${c}` : `${currentCwd}/${c}`;
            const childNode = fs[childPath];
            const isDir     = childNode?.type === 'dir';
            return {
              type: 'output' as const,
              html: `  ${isDir
                ? `<span style="color:#fbbf24">drwxr-xr-x</span>  <span style="color:#60a5fa">${c}/</span>`
                : `<span style="color:#fbbf24">-rw-r--r--</span>  <span style="color:#34d399">${c}</span>`
              }  <span style="color:#4a4a6a">${childNode?.description ?? ''}</span>`,
            };
          }),
          { type: 'output', text: '' },
        ]);
      }
      setHistory(h => [trimmed, ...h].slice(0, 50));
      setHistIdx(-1); setInput(''); return;
    }

    // ── cat ──────────────────────────────────────────────────────
    if (cmdLower === 'cat') {
      const target = args[0];
      if (!target) {
        pushLines([promptLine,
          { type: 'error', html: '  <span style="color:#f87171">Uso: cat [archivo]</span>' },
          { type: 'output', text: '' },
        ]);
      } else {
        const resolved = resolvePath(target, currentCwd);
        const node = getFS()[resolved] as any;
        console.log('resolved:', resolved, 'node:', getFS()[resolved]);
        if (!node) {
          pushLines([promptLine,
            { type: 'error', html: `  <span style="color:#f87171">cat: ${target}: No existe</span>` },
            { type: 'output', text: '' },
          ]);
        } else {
          const content = node.content ? node.content() : [{ type: 'output' as const, text: '' }];
          pushLines([promptLine, ...content]);

          // Abrir PDFs desde base64 (subidos) o desde servidor (CVs del sistema)
          if (target.endsWith('.pdf') || (node as any)._mime === 'application/pdf') {
            setTimeout(() => {
              if ((node as any)._raw) {
                const blob = dataURLtoBlob((node as any)._raw);
                const url  = URL.createObjectURL(blob);
                window.open(url, '_blank');
                setTimeout(() => URL.revokeObjectURL(url), 10000);
              } else {
                window.open(`/${resolved.split('/').pop()}`, '_blank');
              }
            }, 300);
          }
        }
      }
      setHistory(h => [trimmed, ...h].slice(0, 50));
      setHistIdx(-1); setInput(''); return;
    }

    // ── touch ────────────────────────────────────────────────────
    if (cmdLower === 'touch') {
      const target = args[0];
      if (!target) {
        pushLines([promptLine,
          { type: 'error', html: '  <span style="color:#f87171">Uso: touch [archivo]</span>' },
          { type: 'output', text: '' },
        ]);
      } else {
        const resolved = resolvePath(target, currentCwd);
        const existing = fs[resolved];
        if (existing) {
          pushLines([promptLine,
            { type: 'output', html: `  <span style="color:#4a4a6a">${target}: ya existe</span>` },
            { type: 'output', text: '' },
          ]);
        } else {
          fsAddNode(resolved, {
            type: 'file',
            description: `${target} (creado por vos)`,
            content: () => [
              { type: 'output', text: '' },
              { type: 'output', html: `  <span style="color:#4a4a6a">(archivo vacío — usá echo texto > ${target} para escribir)</span>` },
              { type: 'output', text: '' },
            ],
          });
          pushLines([promptLine,
            { type: 'output', html: `  <span style="color:#34d399">✓ ${target}</span> creado` },
            { type: 'output', text: '' },
          ]);
          setForceUpdate(n => n + 1);
        }
      }
      setHistory(h => [trimmed, ...h].slice(0, 50));
      setHistIdx(-1); setInput(''); return;
    }

    // ── mkdir ────────────────────────────────────────────────────
    if (cmdLower === 'mkdir') {
      const target = args[0];
      if (!target) {
        pushLines([promptLine,
          { type: 'error', html: '  <span style="color:#f87171">Uso: mkdir [directorio]</span>' },
          { type: 'output', text: '' },
        ]);
      } else {
        const resolved = resolvePath(target, currentCwd);
        const existing = fs[resolved];
        if (existing) {
          pushLines([promptLine,
            { type: 'error', html: `  <span style="color:#f87171">mkdir: ${target}: Ya existe</span>` },
            { type: 'output', text: '' },
          ]);
        } else {
          fsAddNode(resolved, {
            type: 'dir',
            description: `${target} (creado por vos)`,
            children: [],
            content: () => [
              { type: 'output', text: '' },
              { type: 'output', html: '  <span style="color:#4a4a6a">(directorio vacío)</span>' },
              { type: 'output', text: '' },
            ],
          });
          pushLines([promptLine,
            { type: 'output', html: `  <span style="color:#34d399">✓ ${target}/</span> creado` },
            { type: 'output', text: '' },
          ]);
          setForceUpdate(n => n + 1);
        }
      }
      setHistory(h => [trimmed, ...h].slice(0, 50));
      setHistIdx(-1); setInput(''); return;
    }

    // ── rm ───────────────────────────────────────────────────────
    if (cmdLower === 'rm') {
      const target = args[0];
      if (!target) {
        pushLines([promptLine,
          { type: 'error', html: '  <span style="color:#f87171">Uso: rm [archivo]</span>' },
          { type: 'output', text: '' },
        ]);
      } else {
        const resolved = resolvePath(target, currentCwd);
        const node     = fs[resolved];
        if (!node) {
          pushLines([promptLine,
            { type: 'error', html: `  <span style="color:#f87171">rm: ${target}: No existe</span>` },
            { type: 'output', text: '' },
          ]);
        } else if (node.type === 'dir') {
          pushLines([promptLine,
            { type: 'error', html: `  <span style="color:#f87171">rm: ${target}: Es un directorio — usá rmdir</span>` },
            { type: 'output', text: '' },
          ]);
        } else if (!loadExtra()[resolved]) {
          pushLines([promptLine,
            { type: 'error', html: `  <span style="color:#f87171">rm: ${target}: Archivo del sistema — no se puede eliminar</span>` },
            { type: 'output', text: '' },
          ]);
        } else {
          fsDeleteNode(resolved);
          pushLines([promptLine,
            { type: 'output', html: `  <span style="color:#f87171">✗ ${target}</span> eliminado` },
            { type: 'output', text: '' },
          ]);
          setForceUpdate(n => n + 1);
        }
      }
      setHistory(h => [trimmed, ...h].slice(0, 50));
      setHistIdx(-1); setInput(''); return;
    }

    // ── rmdir ────────────────────────────────────────────────────
    if (cmdLower === 'rmdir') {
      const target = args[0];
      if (!target) {
        pushLines([promptLine,
          { type: 'error', html: '  <span style="color:#f87171">Uso: rmdir [directorio]</span>' },
          { type: 'output', text: '' },
        ]);
      } else {
        const resolved = resolvePath(target, currentCwd);
        const node     = fs[resolved];
        if (!node) {
          pushLines([promptLine,
            { type: 'error', html: `  <span style="color:#f87171">rmdir: ${target}: No existe</span>` },
            { type: 'output', text: '' },
          ]);
        } else if (node.type === 'file') {
          pushLines([promptLine,
            { type: 'error', html: `  <span style="color:#f87171">rmdir: ${target}: Es un archivo — usá rm</span>` },
            { type: 'output', text: '' },
          ]);
        } else if ((node.children ?? []).length > 0) {
          pushLines([promptLine,
            { type: 'error', html: `  <span style="color:#f87171">rmdir: ${target}: Directorio no vacío</span>` },
            { type: 'output', text: '' },
          ]);
        } else if (!loadExtra()[resolved]) {
          pushLines([promptLine,
            { type: 'error', html: `  <span style="color:#f87171">rmdir: ${target}: Directorio del sistema — no se puede eliminar</span>` },
            { type: 'output', text: '' },
          ]);
        } else {
          fsDeleteNode(resolved);
          pushLines([promptLine,
            { type: 'output', html: `  <span style="color:#f87171">✗ ${target}/</span> eliminado` },
            { type: 'output', text: '' },
          ]);
          setForceUpdate(n => n + 1);
        }
      }
      setHistory(h => [trimmed, ...h].slice(0, 50));
      setHistIdx(-1); setInput(''); return;
    }

    // ── clear ────────────────────────────────────────────────────
    if (cmdLower === 'clear') { setLines(BOOT); setInput(''); return; }

    // ── reset (limpiar filesystem de sesión) ─────────────────────
    if (cmdLower === 'reset') {
      sessionStorage.removeItem(FS_EXTRA_KEY);
      sessionStorage.removeItem(FS_DELETED_KEY);
      pushLines([promptLine,
        { type: 'output', html: '  <span style="color:#34d399">✓ Filesystem restaurado al estado original</span>' },
        { type: 'output', text: '' },
      ]);
      setForceUpdate(n => n + 1);
      setHistory(h => [trimmed, ...h].slice(0, 50));
      setHistIdx(-1); setInput(''); return;
    }

    // ── resto de TERM_CMDS ───────────────────────────────────────
    const handler = TERM_CMDS[cmdLower];
    const output: TermLine[] = handler
      ? handler(args)
      : [
          { type: 'error', html: `  <span style="color:#f87171">comando no encontrado:</span> <span style="color:#f0f0f5">${cmdLower}</span>` },
          { type: 'output', html: '  escribí <span style="color:#34d399">help</span> para ver los comandos disponibles' },
          { type: 'output', text: '' },
        ];

    pushLines([promptLine, ...output]);
    setHistory(h => [trimmed, ...h].slice(0, 50));
    setHistIdx(-1); setInput('');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cwd]);

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { run(input, cwd); }
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next); setInput(history[next] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next); setInput(next === -1 ? '' : history[next] ?? '');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (!input.trim()) return;
      const parts   = input.split(/\s+/);
      const partial = parts[parts.length - 1];
      const node    = getFS()[cwd];
      const children = node?.children ?? [];
      const match   = children.find(c => c.startsWith(partial));
      if (match) { parts[parts.length - 1] = match; setInput(parts.join(' ')); }
    }
  };

  return (
    <>
      <div
  className="flex-1 overflow-y-auto px-5 py-3 min-h-0 relative"
  style={{
    scrollbarWidth: 'thin',
    scrollbarColor: 'rgba(255,255,255,0.05) transparent',
    cursor: 'text',
    // Borde sutil cuando está arrastrando
    outline: dragging ? '2px dashed rgba(52,211,153,0.5)' : '2px dashed transparent',
    outlineOffset: '-4px',
    borderRadius: 4,
    transition: 'outline 0.15s ease',
  }}
  onDragOver={handleDragOver}
  onDragLeave={handleDragLeave}
  onDrop={handleDrop}
  onClick={() => inputRef.current?.focus()}
>
  {lines.map((line, i) => (
    <div key={i} style={{
      fontFamily: '\'DM Mono\',\'Fira Code\',monospace', fontSize: 12.5, lineHeight: 1.65,
      color: line.type === 'error' ? '#f87171' : 'rgba(255,255,255,0.65)',
      minHeight: '1.4em', whiteSpace: 'pre-wrap', wordBreak: 'break-all',
    }}>
      {line.html ? <span dangerouslySetInnerHTML={{ __html: line.html }} /> : line.text ?? ''}
    </div>
  ))}

  {/* Overlay visual mientras arrastra */}
  {dragging && (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none"
      style={{
        background: 'rgba(14,14,22,0.85)',
        backdropFilter: 'blur(4px)',
        borderRadius: 4,
      }}
    >
      <div style={{ fontSize: 32 }}>📁</div>
      <p style={{ fontFamily: 'monospace', fontSize: 13, color: '#34d399' }}>
        Soltá para subir a /uploads/
      </p>
      <p style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>
        txt · md · json · js · ts · csv · y más
      </p>
    </div>
  )}

  <div ref={bottomRef} />
</div>

      <div className="flex items-center gap-2 px-5 py-3 flex-shrink-0"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.25)' }}>
        <span
          style={{ fontFamily: 'monospace', fontSize: 12, flexShrink: 0, whiteSpace: 'nowrap' }}
          dangerouslySetInnerHTML={{ __html: `${prompt(cwd)}&nbsp;` }}
        />
        <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey}
          className="flex-1 bg-transparent outline-none"
          style={{ fontFamily: '\'DM Mono\',\'Fira Code\',monospace', fontSize: 12.5, color: 'rgba(255,255,255,0.85)', caretColor: '#34d399' }}
          placeholder="escribe un comando..." autoComplete="off" spellCheck={false} />
        <span style={{ fontFamily: 'monospace', fontSize: 9, color: 'rgba(255,255,255,0.1)', flexShrink: 0 }}>
          Tab autocompleta
        </span>
      </div>
    </>
  );
}

// ─── Editor JS ────────────────────────────────────────────────────────────────
const EXAMPLES = [
  { label: 'Hola mundo',   code: 'console.log("¡Hola desde el portfolio de Camilo!");\nconsole.log("Mi portfolio");' },
  { label: 'Fibonacci',    code: 'const fib = n => n <= 1 ? n : fib(n-1) + fib(n-2);\nfor (let i = 0; i <= 10; i++) console.log(`fib(${i}) =`, fib(i));' },
  { label: 'Fecha y Hora',  code: 'const now = new Date();\nconsole.log("Fecha:", now.toLocaleDateString("es-AR"));\nconsole.log("Hora:", now.toLocaleTimeString("es-AR"));\nconsole.log("UTC:", now.toUTCString());' },
  { label: 'Arrays', code: 'const skills = ["React","Node.js","TypeScript","Next.js","MongoDB","Docker"];\nconsole.log("Skills:", skills.join(" · "));\nconsole.log("Filtrado:", skills.filter(s => s.length > 5).join(", "));\nconsole.log("Mapeado:", skills.map(s => s.toUpperCase()));' },
  // { label: 'Async/await',  code: 'const delay = ms => new Promise(res => setTimeout(res, ms));\nasync function run() {\n  console.log("Iniciando...");\n  await delay(100);\n  console.log("100ms después ✓");\n  return "¡Listo!";\n}\nrun().then(console.log);' },
];

function EditorPane() {
  const [code,    setCode]    = useState(EXAMPLES[0].code);
  const [output,  setOutput]  = useState<{ type: 'log'|'error'|'warn'; text: string }[]>([]);
  const [running, setRunning] = useState(false);
  const [copied,  setCopied]  = useState(false);
  const textRef   = useRef<HTMLTextAreaElement>(null);

  const run = useCallback(() => {
    setRunning(true);
    const logs: typeof output = [];
    const orig = { log: console.log, error: console.error, warn: console.warn };
    console.log   = (...a) => { logs.push({ type: 'log',   text: a.map(v => typeof v === 'object' ? JSON.stringify(v, null, 2) : String(v)).join(' ') }); orig.log(...a); };
    console.error = (...a) => { logs.push({ type: 'error', text: a.map(String).join(' ') }); orig.error(...a); };
    console.warn  = (...a) => { logs.push({ type: 'warn',  text: a.map(String).join(' ') }); orig.warn(...a); };
    try {
      // eslint-disable-next-line no-new-func
      const fn = new Function(code);
      const result = fn();
      if (result instanceof Promise) {
        result.catch(err => setOutput(prev => [...prev, { type: 'error', text: String(err) }]));
      }
    } catch (err: any) {
      logs.push({ type: 'error', text: String(err) });
    } finally {
      Object.assign(console, orig);
    }
    setOutput(logs);
    setRunning(false);
  }, [code]);

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') { e.preventDefault(); run(); }
    if (e.key === 'Tab') {
      e.preventDefault();
      const el = textRef.current!;
      const s = el.selectionStart;
      const newCode = code.slice(0, s) + '  ' + code.slice(el.selectionEnd);
      setCode(newCode);
      setTimeout(() => { el.selectionStart = el.selectionEnd = s + 2; }, 0);
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Barra de ejemplos */}
      <div className="flex items-center gap-2 px-4 py-2 flex-shrink-0 overflow-x-auto"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', scrollbarWidth: 'none' }}>
        <span style={{ fontFamily: 'monospace', fontSize: 9, color: 'rgba(255,255,255,0.18)', flexShrink: 0 }}>ejemplos:</span>
        {EXAMPLES.map(ex => (
          <motion.button key={ex.label} onClick={() => { setCode(ex.code); setOutput([]); }}
            className="px-2.5 py-1 rounded text-xs flex-shrink-0"
            style={{ fontFamily: 'monospace', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.3)' }}
            whileHover={{ background: 'rgba(255,255,255,0.09)', color: 'rgba(255,255,255,0.6)' }} whileTap={{ scale: 0.95 }}>
            {ex.label}
          </motion.button>
        ))}
      </div>

      {/* Área de código */}
      <div className="relative flex-1 min-h-0" style={{ minHeight: 150 }}>
        <textarea ref={textRef} value={code} onChange={e => setCode(e.target.value)} onKeyDown={handleKey}
          className="absolute inset-0 w-full h-full resize-none outline-none p-4"
          style={{ fontFamily: '\'DM Mono\',\'Fira Code\',\'Courier New\',monospace', fontSize: 12.5, lineHeight: 1.7,
            background: 'rgba(0,0,0,0.2)', color: 'rgba(255,255,255,0.82)', caretColor: '#34d399',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.05) transparent' }}
          spellCheck={false} autoComplete="off" autoCorrect="off" />

        {/* Botones flotantes */}
        <div className="absolute top-2 right-2 flex gap-1.5 z-10">
          <motion.button onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1800); }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs"
            style={{ fontFamily: 'monospace', background: 'rgba(14,14,22,0.9)', border: '1px solid rgba(255,255,255,0.1)', color: copied ? '#34d399' : 'rgba(255,255,255,0.35)' }}
            whileHover={{ background: 'rgba(14,14,22,0.95)' }} whileTap={{ scale: 0.95 }}>
            {copied ? <CheckCircle2 size={11} /> : <Copy size={11} />} {copied ? 'Copiado' : 'Copiar'}
          </motion.button>
          <motion.button onClick={() => { setCode(''); setOutput([]); }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs"
            style={{ fontFamily: 'monospace', background: 'rgba(14,14,22,0.9)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.25)' }}
            whileHover={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', borderColor: 'rgba(239,68,68,0.3)' }} whileTap={{ scale: 0.95 }}>
            <Trash2 size={11} /> Limpiar
          </motion.button>
        </div>
      </div>

      {/* Output */}
      <div className="flex-shrink-0" style={{ maxHeight: 130, minHeight: 44, overflowY: 'auto', borderTop: '1px solid rgba(255,255,255,0.06)', scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.05) transparent' }}>
        {output.length === 0 ? (
          <div className="px-4 py-3 flex items-center gap-2"
            style={{ fontFamily: 'monospace', fontSize: 11, color: 'rgba(255,255,255,0.14)', fontStyle: 'italic' }}>
            El output aparece aquí — <Kbd small>⌘ Enter</Kbd> para ejecutar
          </div>
        ) : (
          <div className="px-4 py-2.5">
            {output.map((line, i) => (
              <div key={i} className="flex items-start gap-2 py-0.5">
                <span style={{ fontSize: 10, marginTop: 3, flexShrink: 0, color: line.type === 'error' ? '#f87171' : line.type === 'warn' ? '#fbbf24' : '#34d399' }}>
                  {line.type === 'error' ? <TriangleAlert size={10} /> : line.type === 'warn' ? '⚠' : '›'}
                </span>
                <span style={{ fontFamily: '\'DM Mono\',monospace', fontSize: 12, lineHeight: 1.6, whiteSpace: 'pre-wrap', wordBreak: 'break-all',
                  color: line.type === 'error' ? '#f87171' : line.type === 'warn' ? '#fbbf24' : 'rgba(255,255,255,0.75)' }}>
                  {line.text}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer editor */}
      <div className="flex items-center justify-between px-4 py-2.5 flex-shrink-0"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.3)' }}>
        <div className="flex gap-3">
          {[['⌘ Enter','ejecutar'],['Tab','indentar (2 espacios)']].map(([k,l]) => (
            <span key={l} className="flex items-center gap-1.5" style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(255,255,255,0.16)' }}>
              <Kbd small>{k}</Kbd>{l}
            </span>
          ))}
        </div>
        <motion.button onClick={run}
          className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-mono font-semibold"
          style={{ background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.3)', color: '#34d399' }}
          whileHover={{ background: 'rgba(52,211,153,0.22)' }} whileTap={{ scale: 0.96 }}
          animate={{ opacity: running ? 0.7 : 1 }}>
          <Play size={11} />{running ? 'Ejecutando...' : 'Ejecutar'}
        </motion.button>
      </div>
    </div>
  );
}

// ─── Shared ───────────────────────────────────────────────────────────────────
function CatLabel({ label, color }: { label: string; color: string }) {
  return (
    <div className="px-5 pt-3 pb-1" style={{ fontFamily: 'monospace', fontSize: 9.5, fontWeight: 600, color, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
      {label}
    </div>
  );
}
function Separator() {
  return <div style={{ height: 1, background: 'rgba(255,255,255,0.04)', margin: '4px 0' }} />;
}
function CmdRow({ cmd, idx, selected, executed, onHover, onExecute }: {
  cmd: Command; idx: number; selected: number; executed: string | null;
  onHover: (i: number) => void; onExecute: (c: Command) => void;
}) {
  const isActive  = selected === idx;
  const isRunning = executed === cmd.id;
  const col       = CAT_COLOR[cmd.category];
  return (
    <motion.div data-idx={idx} className="relative flex items-center gap-3 px-5 py-2.5 cursor-pointer select-none"
      animate={{ background: isRunning ? 'rgba(99,102,241,0.18)' : isActive ? col.bg : 'transparent' }}
      transition={{ duration: 0.08 }} onMouseEnter={() => onHover(idx)} onClick={() => onExecute(cmd)}>
      <AnimatePresence>
        {isActive && (
          <motion.div className="absolute left-0 rounded-r-full"
            style={{ top: 8, bottom: 8, width: 2.5, background: col.text }}
            initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} exit={{ scaleY: 0 }} transition={{ duration: 0.1 }} />
        )}
      </AnimatePresence>
      <div className="flex items-center justify-center flex-shrink-0 rounded-lg transition-all duration-100"
        style={{ width: 30, height: 30, background: isActive ? `${col.text}1a` : 'rgba(255,255,255,0.04)', border: `1px solid ${isActive ? col.border : 'rgba(255,255,255,0.07)'}`, color: isActive ? col.text : 'rgba(255,255,255,0.25)' }}>
        {cmd.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div style={{ fontFamily: '\'DM Mono\',monospace', fontSize: 13, color: isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)', fontWeight: isActive ? 500 : 400 }}>{cmd.label}</div>
        <div style={{ fontFamily: '\'DM Mono\',monospace', fontSize: 11, marginTop: 1, color: 'rgba(255,255,255,0.18)', fontStyle: 'italic', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cmd.description}</div>
      </div>
      <AnimatePresence>
        {isActive && (
          <motion.div className="flex items-center gap-2"
            initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 6 }} transition={{ duration: 0.1 }}>
            {cmd.shortcut && <Kbd small>{cmd.shortcut}</Kbd>}
            <ChevronRight size={12} style={{ color: 'rgba(255,255,255,0.18)' }} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
function Kbd({ children, small = false }: { children: React.ReactNode; small?: boolean }) {
  return (
    <span style={{ fontFamily: 'monospace', fontSize: small ? 9 : 10, color: 'rgba(255,255,255,0.22)', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, padding: small ? '1px 4px' : '2px 6px', display: 'inline-flex', alignItems: 'center', lineHeight: 1.4, whiteSpace: 'nowrap' }}>
      {children}
    </span>
  );
}