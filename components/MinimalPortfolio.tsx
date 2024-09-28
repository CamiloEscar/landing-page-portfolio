import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Printer,
  Mail,
  MapPin,
  Linkedin,
  Github as GithubIcon,
  Link,
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
} from "react-icons/si";
import {
  dataPortfolio,
  dataExperience,
  educationTimeline,
  workExperience,
  aboutMe,
} from "../data";
import Image from "next/image";

const ProfessionalMinimalPortfolio = () => {
  const handlePrint = () => {
    window.print();
  };

  const getIconForSkill = (skillName: string) => {
    const iconProps = { className: "h-6 w-6" };
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
      case "bases de datos":
        return (
          <>
            <SiMongodb {...iconProps} />
            <SiPostgresql {...iconProps} />
          </>
        );
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
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-2 py-4 max-w-[21cm] min-h-[29.7cm] bg-white dark:bg-gray-900 text-black dark:text-white print:text-black print:bg-white">
      <section id="about" className="mb-3">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center">
            <div className="relative w-20 h-20 mr-3 rounded-sm overflow-hidden shadow-2xl">
              <Image
                src="/profile.webp"
                alt="Profile"
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Camilo Escar</h1>
              <h2 className="text-xl text-gray-600 dark:text-gray-400 print:text-gray-600">
                Desarrollador Full Stack
              </h2>
            </div>
          </div>

          <button onClick={handlePrint} className="print:hidden">
            <Printer className="h-6 w-6" />
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2 mb-2 text-sm">
          <a href="mailto:camiloescar1995@gmail.com">
            <span className="flex items-center">
              <Mail className="h-4 w-4 mr-1" /> camiloescar1995@gmail.com
            </span>
          </a>
          <span className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" /> {aboutMe.location}
          </span>
          <a
            href="https://linkedin.com/in/camiloescar"
            className="flex items-center"
          >
            <Linkedin className="h-4 w-4 mr-1" /> /in/camiloescar
          </a>
          <a
            href="https://github.com/CamiloEscar"
            className="flex items-center"
          >
            <GithubIcon className="h-4 w-4 mr-1" /> /CamiloEscar
          </a>
        </div>
        <p className="text-sm">{aboutMe.description}</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 print:grid-cols-2 print:gap-2">
        <section id="experience" className="mb-3">
          <h2 className="text-xl font-semibold mb-2">Experiencia Laboral</h2>
          {workExperience.slice(0, 1).map((job) => (
            <div key={job.id} className="mb-2">
              <h3 className="font-medium text-base">
                {job.position} - {job.company}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 print:text-gray-600">
                {job.period}
              </p>
              <p className="text-sm">{job.description}</p>
            </div>
          ))}
        </section>

        <section id="education" className="mb-3">
          <h2 className="text-xl font-semibold mb-2">Educación</h2>
          {educationTimeline.slice(0, 1).map((edu) => (
            <div key={edu.id} className="mb-2">
              <h3 className="font-medium text-base">{edu.title}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 print:text-gray-600">
                {edu.institution} - {edu.period}
              </p>
              <p className="text-sm">{edu.description}</p>
            </div>
          ))}
        </section>
      </div>

      <section id="projects" className="mb-3">
        <h2 className="text-xl font-semibold mb-2">Proyectos Destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 print:grid-cols-2 print:gap-2">
          {dataPortfolio.slice(0, 6).map((project) => (
            <Card
              key={project.id}
              className="border border-gray-200 dark:border-gray-700 print:border-gray-200"
            >
              <CardHeader className="py-1.5">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold">
                    {project.title}
                  </CardTitle>
                  <div className="flex gap-2 ml-2 print:hidden">
                    {project.urlGithub && (
                      <a
                        href={project.urlGithub}
                        className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 print:text-gray-500"
                        title="Ver en GitHub"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <GithubIcon className="h-4 w-4" />
                      </a>
                    )}
                    {project.urlDemo && (
                      <a
                        href={project.urlDemo}
                        className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 print:text-gray-500 relative"
                        title="Ver Demo"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        <Link className="h-4 w-4" />
                        <span className="absolute -top-1 -right-4 h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
                      </a>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="py-1.5">
                <p className="text-xs mb-1">{project.description}</p>
                <div className="flex flex-wrap gap-1 mb-1">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 dark:bg-gray-800 print:bg-gray-100 px-1 py-0.5 rounded text-[10px]"
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

      <section id="skills" className="mb-3">
        <h2 className="text-xl font-semibold mb-2">Habilidades Técnicas</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {dataExperience.flatMap((category) =>
            category.experience.map((skill) => (
              <div
                key={skill.name}
                className="flex items-center bg-gray-100 dark:bg-gray-800 print:bg-gray-100 p-1.5 rounded"
              >
                {getIconForSkill(skill.name)}
                <div className="ml-2">
                  <div className="font-medium text-sm">{skill.name}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {skill.subtitle}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default ProfessionalMinimalPortfolio;