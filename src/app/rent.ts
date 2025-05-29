export interface Rent {
  id?: number;
  product: {
    id: number;
  };
  user: {
    uid: number;
  };
  rent_date: string;
  return_date: string;
  status: string;
}