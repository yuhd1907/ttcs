export interface Job {
  _id: string;
  name: string;
  level: "intern" | "fresher" | "junior" | "middle" | "senior";
  workingForm: "remote" | "at office" | "hybrid";
  description: string;
  technologies: string[];
  specialization: string[];
  fields: string[];
  images: string[];
  minSalary: number;
  maxSalary: number;
  companyId: string;
  companyName: string;
  companyAddress: string;
  companyLogo: string;
  companyModel: string;
  companyField: string;
  companyEmployees: string;
  companyWorkingTime: string;
  companyWorkOvertime: string;
  timeSince?: string;
}
