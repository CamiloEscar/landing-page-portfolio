import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Printer, Mail, MapPin, Linkedin, Github as GithubIcon, ExternalLink } from "lucide-react";
import { dataPortfolio, dataExperience, educationTimeline, workExperience, aboutMe } from '../data';

const ProfessionalMinimalPortfolio = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-[21cm] min-h-[29.7cm] bg-white dark:bg-gray-900 text-black dark:text-white print:text-black print:bg-white">
      <section id="about" className="mb-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h1 className="text-3xl font-bold">Camilo Escar</h1>
            <h2 className="text-xl text-gray-600 dark:text-gray-400 print:text-gray-600">Desarrollador Full Stack</h2>
          </div>
          <button onClick={handlePrint} className="print:hidden">
            <Printer className="h-6 w-6" />
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-3 mb-2 text-sm">
          <span className="flex items-center"><Mail className="h-4 w-4 mr-1" /> camiloescar1995@gmail.com</span>
          <span className="flex items-center"><MapPin className="h-4 w-4 mr-1" /> {aboutMe.location}</span>
          <a href="https://linkedin.com/in/camiloescar" className="flex items-center"><Linkedin className="h-4 w-4 mr-1" /> /in/camiloescar</a>
          <a href="https://github.com/CamiloEscar" className="flex items-center"><GithubIcon className="h-4 w-4 mr-1" /> /CamiloEscar</a>
        </div>
        <p className="text-sm">{aboutMe.description}</p>
      </section>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:grid-cols-2 print:gap-2">
        <section id="experience" className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Experiencia Laboral</h2>
          {workExperience.map((job) => (
            <div key={job.id} className="mb-2">
              <h3 className="font-medium text-base">{job.position} - {job.company}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 print:text-gray-600">{job.period}</p>
              <p className="text-sm">{job.description}</p>
            </div>
          ))}
        </section>

        <section id="education" className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Educación</h2>
          {educationTimeline.map((edu) => (
            <div key={edu.id} className="mb-2">
              <h3 className="font-medium text-base">{edu.title}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 print:text-gray-600">{edu.institution} - {edu.period}</p>
              <p className="text-sm">{edu.description}</p>
            </div>
          ))}
        </section>
      </div>

      <section id="skills" className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Habilidades Técnicas</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 print:grid-cols-3 print:gap-1">
          {dataExperience.map((category) => (
            <div key={category.id}>
              <h3 className="font-medium text-sm">{category.title}</h3>
              <ul className="text-xs list-disc list-inside">
                {category.experience.slice(0, 4).map((skill) => (
                  <li key={skill.name}>{skill.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="projects">
        <h2 className="text-xl font-semibold mb-2">Proyectos Destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 print:grid-cols-2 print:gap-2">
          {dataPortfolio.slice(0,4).map((project) => (
            <Card key={project.id} className="border border-gray-200 dark:border-gray-700 print:border-gray-200">
              <CardHeader className="py-2">
                <CardTitle className="text-base font-semibold">{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="py-2">
                <p className="text-xs mb-1">{project.description}</p>
                <div className="flex flex-wrap gap-1 mb-1">
                  {project.technologies.slice(0,3).map((tech, index) => (
                    <span key={index} className="bg-gray-100 dark:bg-gray-800 print:bg-gray-100 px-1 py-0.5 rounded text-[10px]">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 text-xs">
                  <a href={project.urlGithub} className="flex items-center text-blue-600 dark:text-blue-400 print:text-blue-600">
                    <GithubIcon className="mr-1 h-3 w-3" />
                    Github
                  </a>
                  <a href={project.urlDemo} className="flex items-center text-blue-600 dark:text-blue-400 print:text-blue-600">
                    <ExternalLink className="mr-1 h-3 w-3" />
                    Demo
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProfessionalMinimalPortfolio;