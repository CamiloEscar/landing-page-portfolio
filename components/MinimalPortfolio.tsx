"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Printer,
  Mail,
  MapPin,
  Linkedin,
  Github as GithubIcon,
  Link,
  Globe,
  Star,
} from "lucide-react";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiPostgresql,
  SiPython,
  SiPhp,
  SiDocker,
  SiJsonwebtokens,
  SiFlutter,
  SiVuedotjs,
  SiTableau,
  SiPowerbi,
  SiAngular,
} from "react-icons/si";
import {
  dataPortfolio,
  dataExperience,
  educationTimeline,
  workExperience,
  aboutMe,
  dataLanguage,
} from "../data";
import Image from "next/image";

const ProfessionalMinimalPortfolio = () => {
  const handlePrint = () => {
    window.print();
  };

  const getIconForSkill = (skillName: string) => {
    const iconProps = { className: "h-4 w-4" };
    switch (skillName.toLowerCase()) {
      case "html":
        return <SiHtml5 {...iconProps} />;
      case "css":
        return <SiCss3 {...iconProps} />;
      case "javascript":
        return <SiJavascript {...iconProps} />;
      case "react":
        return <SiReact {...iconProps} />;
      case "node js":
        return <SiNodedotjs {...iconProps} />;
      case "postgresql":
        return <SiPostgresql {...iconProps} />;
      case "mongodb":
        return <SiMongodb {...iconProps} />;
      case "python":
        return <SiPython {...iconProps} />;
      case "php":
        return <SiPhp {...iconProps} />;
      case "devops":
        return <SiDocker {...iconProps} />;
      case "seguridad web":
        return <SiJsonwebtokens {...iconProps} />;
      case "mobile":
        return <SiFlutter {...iconProps} />;
      case "vue.js":
        return <SiVuedotjs {...iconProps} />;
      case "tableau":
        return <SiTableau {...iconProps} />;
      case "power bi":
        return <SiPowerbi {...iconProps} />;
      case "angular":
        return <SiAngular {...iconProps} />;

      default:
        return null;
    }
  };
  interface StarRatingProps {
    rating: number;
  }
  const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={`${
              star <= rating
                ? "text-blue-400 fill-blue-400"
                : "text-gray-300 dark:text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-2 py-4 max-w-[21cm] min-h-[29.7cm] bg-white dark:bg-gray-900 text-black dark:text-white print:text-black print:bg-white">
      <section id="header" className="flex items-start mb-4 border-b pb-3">
        <div className="relative w-24 h-24 mr-4 rounded-md overflow-hidden shadow-lg">
          <Image
            src="/profile.webp"
            alt="Profile"
            layout="fill"
            objectFit="cover"
            priority
            className="object-center"
          />
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-2">
            <div>
              <a
                href="https://www.instagram.com/camilo.escar/"
                className="flex items-center hover:text-pink-600 transition-colors group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h1 className="text-2xl font-bold mb-0.5">Camilo Escar</h1>
              </a>
              <h2 className="text-lg text-gray-600 dark:text-gray-400 print:text-gray-600">
                Estudiante de Sistemas de Información / Desarrollador Web
              </h2>
            </div>
            <button
              onClick={handlePrint}
              className="print:hidden bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 p-1.5 rounded-lg transition-colors"
              aria-label="Imprimir CV"
            >
              <Printer className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-y-1.5 gap-x-2 text-sm">
            <div className="flex items-center">
              <a
                href="https://www.google.com/maps/place/Concepci%C3%B3n+del+Uruguay,+Entre+R%C3%ADos,+Argentina/data=!4m2!3m1!1s0x95afdb005dbc939d:0x3c8a23c6cb1334b2?sa=X&ved=1t:155783&ictx=111"
                className="flex items-center hover:text-green-600 transition-colors group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin className="h-4 w-4 mr-1.5 text-gray-500 group-hover:text-green-600 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400 hover:text-green-600 truncate">
                  {aboutMe.location}
                </span>
              </a>
            </div>
            <div className="flex items-center">
              <a
                href="mailto:camiloescar1995@gmail.com"
                className="flex items-center hover:text-red-600 transition-colors group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Mail className="h-4 w-4 mr-1.5 text-gray-500 group-hover:text-red-600 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400 group-hover:text-red-600 truncate">
                  camiloescar1995@gmail.com
                </span>
              </a>
            </div>
            <a
              href="https://linkedin.com/in/camiloescar"
              className="flex items-center hover:text-blue-600 transition-colors group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-4 w-4 mr-1.5 text-gray-500 group-hover:text-blue-600 flex-shrink-0" />
              <span className="text-gray-600 dark:text-gray-400 group-hover:text-blue-600 truncate">
                /in/camiloescar
              </span>
            </a>
            <a
              href="https://github.com/CamiloEscar"
              className="flex items-center hover:text-blue-600 transition-colors group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon className="h-4 w-4 mr-1.5 text-gray-500 group-hover:text-gray-900 flex-shrink-0" />
              <span className="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 truncate">
                /CamiloEscar
              </span>
            </a>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <section id="projects" className="mb-4">
            <h2 className="text-2xl font-semibold mb-2 border-b pb-1">
              Proyectos Destacados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 print:grid-cols-2 print:gap-2">
              {dataPortfolio.slice(0, 10).map((project) => (
                <Card
                  key={project.id}
                  className="border border-gray-200 dark:border-gray-700 print:border-gray-200 hover:shadow-sm transition-shadow"
                >
                  <CardHeader className="py-2 px-3 bg-gray-50 rounded-t-md dark:bg-gray-800">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base font-semibold text-blue-600 dark:text-blue-400">
                        {project.title}
                      </CardTitle>
                      <div className="flex gap-2 ml-2 print:hidden">
                        {project.urlGithub && (
                          <a
                            href={project.urlGithub}
                            className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 print:text-gray-500 transition-colors"
                          >
                            <GithubIcon className="h-4 w-4" />
                          </a>
                        )}
                        {project.urlDemo && (
                          <a
                            href={project.urlDemo}
                            className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 print:text-gray-500 relative transition-colors"
                          >
                            <Link className="h-4 w-4" />
                            <span className="absolute -top-1 -right-2 h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
                          </a>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="py-2 px-3">
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200 px-1.5 py-0.5 rounded text-[10px]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section id="experience" className="mb-4">
            <h2 className="text-2xl font-semibold mb-2 border-b pb-1">
              Experiencia Laboral
            </h2>
            {workExperience.slice(0, 1).map((job) => (
              <div
                key={job.id}
                className="mb-3 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-lg text-blue-600 dark:text-blue-400">
                    {job.position}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 print:text-gray-600">
                    {job.period}
                  </p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 print:text-gray-600">
                  {job.company}
                </p>
                <p className="text-sm mt-1">{job.description}</p>
              </div>
            ))}
          </section>

          <section id="education" className="mb-4">
            <h2 className="text-2xl font-semibold mb-2 border-b pb-1">
              Educación
            </h2>
            {educationTimeline.slice(0, 1).map((edu) => (
              <div
                key={edu.id}
                className="mb-3 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-lg text-blue-600 dark:text-blue-400">
                    {edu.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 print:text-gray-600">
                    {edu.period}
                  </p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 print:text-gray-600">
                  {edu.institution}
                </p>
                <p className="text-sm mt-1">{edu.description}</p>
              </div>
            ))}
          </section>
        </div>

        <div className="col-span-1">
          <section id="skills" className="mb-4">
            <h2 className="text-2xl font-semibold mb-2 border-b pb-1">
              Tecnologias
            </h2>
            <div className="grid grid-cols-1 gap-1.5">
              {dataExperience.flatMap((category) =>
                category.experience.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center bg-gray-50 dark:bg-gray-800 p-1.5 rounded-lg"
                  >
                    <div className="mr-2 text-blue-600 dark:text-blue-400">
                      {getIconForSkill(skill.name)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-xs truncate">
                        {skill.name}
                      </div>
                      <div className="text-[10px] text-gray-600 dark:text-gray-400 truncate">
                        {skill.subtitle}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          <section id="languages" className="mb-4">
            <h2 className="text-xl font-semibold mb-2 border-b pb-1">
              Idiomas
            </h2>
            {dataLanguage.map((lang) => (
              <div
                key={lang.id}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 shadow-sm"
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-blue-600 dark:text-blue-400">
                    {lang.title}
                  </h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {lang.period}
                  </span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {lang.institution}
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">{lang.level}</span>
                </div>
                <div className="flex items-center gap-2">
                  <StarRating rating={Math.round(lang.value / 20)} />
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalMinimalPortfolio;
