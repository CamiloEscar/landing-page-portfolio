export interface PortfolioItem {
    id: number;
    title: string;
    image: string;
    urlGithub: string;
    urlDemo: string;
    description?: string;
    technologies?: string[];
  }
  
  export interface TitleProps {
    title: string;
    subtitle: string;
  }