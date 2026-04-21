export interface Education {
  id?: string;
  school: string;
  degree: string;
  major: string;
  isCurrentlyStudying: boolean;
  fromMonth: string;
  fromYear: string;
  toMonth: string;
  toYear: string;
  details: string;
}

export interface Experience {
  id?: string;
  position: string;
  company: string;
  isCurrentlyWorking: boolean;
  fromMonth: string;
  fromYear: string;
  toMonth: string;
  toYear: string;
  description: string;
  projectDetails: string;
}

export interface SkillItem {
  id?: string;
  skill: string;
  experience?: string;
}

export interface SkillGroup {
  id?: string;
  type: "hard" | "soft" | string;
  groupName: string;
  items: SkillItem[];
}

export interface LanguageItem {
  id?: string;
  language: string;
  level: string;
}

export interface Project {
  id?: string;
  name: string;
  isCurrentlyWorking: boolean;
  fromMonth: string;
  fromYear: string;
  toMonth: string;
  toYear: string;
  description: string;
  link: string;
}

export interface Certificate {
  id?: string;
  name: string;
  organization: string;
  month: string;
  year: string;
  link: string;
  description: string;
}

export interface Award {
  id?: string;
  name: string;
  organization: string;
  month: string;
  year: string;
  description: string;
}

export interface InfoUser {
  id: string;
  email: string;
  username: string;
  phone: string;
  avatar: string;
  position?: string;
  gender?: string;
  birth_date?: string;
  address?: string;
  city?: string;
  personal_link?: string;
  intro?: string;
  educations?: Education[];
  experiences?: Experience[];
  skills?: SkillGroup[];
  languages?: LanguageItem[];
  projects?: Project[];
  certificates?: Certificate[];
  awards?: Award[];
}

export interface InfoCompany {
  id: string;
  email: string;
  companyName: string;
  avatar: string;
  employees: string;
  model: string;
  overtime: string;
  phone: string;
  workingTime: string;
  province: string;
  address: string;
  field: string;
  description: string;
}
