import { Product } from "~/models/Product";

export type CartItem = {
  id?: string;
  product_id: string;
  count: number;
};
