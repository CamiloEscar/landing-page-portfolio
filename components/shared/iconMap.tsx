import React from 'react';
import {
  FaHtml5,
  FaCss3Alt,
  FaSass,
  FaLess,
  FaJs,
  FaReact,
  FaNodeJs,
  FaNpm,
  FaBootstrap,
  FaPython,
  FaPhp,
  FaWordpress,
  FaUniversalAccess,
  FaVuejs,
  FaJava,
  FaDocker,
  FaAws,
  FaGitlab,
  FaPaperPlane,
} from 'react-icons/fa';
import {
  SiTypescript,
  SiWebpack,
  SiTailwindcss,
  SiRedux,
  SiNextdotjs,
  SiGatsby,
  SiJquery,
  SiExpress,
  SiSocketdotio,
  SiMongodb,
  SiMongoose,
  SiMysql,
  SiMariadb,
  SiSequelize,
  SiLaravel,
  SiDjango,
  SiPostgresql,
  SiSemanticuireact,
  SiStyledcomponents,
  SiNuxtdotjs,
  SiNumpy,
  SiPandas,
  SiPostcss,
  SiBabel,
  SiAngular,
  SiSpring,
  SiKubernetes,
  SiJenkins,
  SiAzuredevops,
  SiGraphql,
  SiApollographql,
  SiElasticsearch,
  SiRedis,
  SiHibernate,
  SiApachemaven,
  SiFlask,
  SiJunit5,
  SiAuth0,
  SiJsonwebtokens,
  SiFlutter,
  SiKotlin,
  SiReact,
  SiVite,
  SiSvelte,
  SiBun,
  SiVercel,
  SiAstro,
  SiGooglesheets,
  SiOpenai,
} from 'react-icons/si';

export type IconMapKey =
  | 'html5'
  | 'semantic-ui'
  | 'accessibility'
  | 'css3'
  | 'sass'
  | 'less'
  | 'styled-components'
  | 'javascript'
  | 'es6'
  | 'typescript'
  | 'webpack'
  | 'tailwindcss'
  | 'postcss'
  | 'react'
  | 'redux'
  | 'next-js'
  | 'gatsby'
  | 'bootstrap'
  | 'jquery'
  | 'nodejs'
  | 'express'
  | 'socket-io'
  | 'npm'
  | 'mongodb'
  | 'mongoose'
  | 'atlas'
  | 'python'
  | 'pandas'
  | 'numpy'
  | 'mysql'
  | 'mariadb'
  | 'sequelize'
  | 'php'
  | 'laravel'
  | 'wordpress'
  | 'django'
  | 'postgresql'
  | 'nuxt'
  | 'vue'
  | 'angular'
  | 'java'
  | 'spring'
  | 'docker'
  | 'kubernetes'
  | 'jenkins'
  | 'aws'
  | 'azure'
  | 'gitlab-ci'
  | 'graphql'
  | 'apollo'
  | 'elasticsearch'
  | 'redis'
  | 'hibernate'
  | 'maven'
  | 'flask'
  | 'junit'
  | 'oauth'
  | 'babel'
  | 'jwt'
  | 'socket'
  | 'react-native'
  | 'kotlin'
  | 'flutter'
  | 'vite'
  | 'svelte'
  | 'astro'
  | 'bun'
  | 'vercel'
  | 'appsheets'
  | 'sheets'
  | 'openai'

export const iconMap: Record<IconMapKey, React.ReactElement> = {
  svelte: <SiSvelte className='w-5 h-5' />,
  openai: <SiOpenai className='w-5 h-5' />,
  sheets: <SiGooglesheets className='w-5 h-5'/>,
  appsheets: <FaPaperPlane className='w-5 h-5' />,
  astro: <SiAstro className='w-5 h-5' />,
  bun: <SiBun className='w-5 h-5' />,
  vercel: <SiVercel className='w-5 h-5' />,
  vite: <SiVite className='w-5 h-5'/>,
  html5: <FaHtml5 className="w-5 h-5" />,
  'semantic-ui': <SiSemanticuireact className="w-5 h-5" />,
  accessibility: <FaUniversalAccess className="w-5 h-5" />,
  css3: <FaCss3Alt className="w-5 h-5" />,
  sass: <FaSass className="w-5 h-5" />,
  less: <FaLess className="w-5 h-5" />,
  'styled-components': <SiStyledcomponents className="w-5 h-5" />,
  javascript: <FaJs className="w-5 h-5" />,
  es6: <FaJs className="w-5 h-5" />,
  typescript: <SiTypescript className="w-5 h-5" />,
  webpack: <SiWebpack className="w-5 h-5" />,
  tailwindcss: <SiTailwindcss className="w-5 h-5" />,
  postcss: <SiPostcss className="w-5 h-5" />,
  react: <FaReact className="w-5 h-5" />,
  redux: <SiRedux className="w-5 h-5" />,
  'next-js': <SiNextdotjs className="w-5 h-5" />,
  nuxt: <SiNuxtdotjs className="w-5 h-5" />,
  gatsby: <SiGatsby className="w-5 h-5" />,
  bootstrap: <FaBootstrap className="w-5 h-5" />,
  jquery: <SiJquery className="w-5 h-5" />,
  nodejs: <FaNodeJs className="w-5 h-5" />,
  express: <SiExpress className="w-5 h-5" />,
  'socket-io': <SiSocketdotio className="w-5 h-5" />,
  npm: <FaNpm className="w-5 h-5" />,
  mongodb: <SiMongodb className="w-5 h-5" />,
  mongoose: <SiMongoose className="w-5 h-5" />,
  atlas: <SiMongodb className="w-5 h-5" />,
  python: <FaPython className="w-5 h-5" />,
  pandas: <SiPandas className="w-5 h-5" />,
  numpy: <SiNumpy className="w-5 h-5" />,
  mysql: <SiMysql className="w-5 h-5" />,
  mariadb: <SiMariadb className="w-5 h-5" />,
  sequelize: <SiSequelize className="w-5 h-5" />,
  php: <FaPhp className="w-5 h-5" />,
  laravel: <SiLaravel className="w-5 h-5" />,
  wordpress: <FaWordpress className="w-5 h-5" />,
  django: <SiDjango className="w-5 h-5" />,
  postgresql: <SiPostgresql className="w-5 h-5" />,
  vue: <FaVuejs className="w-5 h-5" />,
  angular: <SiAngular className="w-5 h-5" />,
  java: <FaJava className="w-5 h-5" />,
  spring: <SiSpring className="w-5 h-5" />,
  hibernate: <SiHibernate className="w-5 h-5" />,
  docker: <FaDocker className="w-5 h-5" />,
  kubernetes: <SiKubernetes className="w-5 h-5" />,
  jenkins: <SiJenkins className="w-5 h-5" />,
  aws: <FaAws className="w-5 h-5" />,
  azure: <SiAzuredevops className="w-5 h-5" />,
  'gitlab-ci': <FaGitlab className="w-5 h-5" />,
  graphql: <SiGraphql className="w-5 h-5" />,
  apollo: <SiApollographql className="w-5 h-5" />,
  elasticsearch: <SiElasticsearch className="w-5 h-5" />,
  redis: <SiRedis className="w-5 h-5" />,
  maven: <SiApachemaven className="w-5 h-5" />,
  flask: <SiFlask className="w-5 h-5" />,
  junit: <SiJunit5 className="w-5 h-5" />,
  oauth: <SiAuth0 className="w-5 h-5" />,
  babel: <SiBabel className="w-5 h-5" />,
  jwt: <SiJsonwebtokens className="w-5 h-5" />,
  socket: <SiSocketdotio className="w-5 h-5" />,
  'react-native': <SiReact className="w-5 h-5" />,
  flutter: <SiFlutter className="w-5 h-5" />,
  kotlin: <SiKotlin className="w-5 h-5" />,
};
