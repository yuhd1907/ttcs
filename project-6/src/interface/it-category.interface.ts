export interface Role {
  name: string;
  slug: string;
}

export interface ITCategoryData {
  id: string;
  category: string;
  roles: Role[];
}

export interface CategoryItemProps {
  category: string;
  roles: Role[];
}
