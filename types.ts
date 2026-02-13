
export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Software {
  name: string;
  icon: string;
  level: number;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
  videoUrl: string;
}

export interface Specialization {
  title: string;
  description: string;
  icon: string;
}
