export interface Selector {
  value: string;
  onChange: (value: string) => void;
  errors?: string;
}
