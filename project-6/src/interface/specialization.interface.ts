export interface RoleOption {
  name: string;
  slug: string;
}

export interface JobCategory {
  id?: string;
  category?: string;
  roles?: RoleOption[];
  name?: string;
}

export interface Specialization {
  id?: string;
  category: string;
  name: string;
  slug: string;
}
