export interface CityEvent {
  id?: string;
  name: string;
  description: string;
  coords: number[];
  categoryId?: string;
  userId?: string;
}
