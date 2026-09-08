import { Product } from '@core/models/product.interface';

export interface CartDetails {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: {
    _id?: string;
    cartOwner?: string;
    products: CartProduct[];
    createdAt?: string;
    updatedAt?: string;
    __v: number;
    totalCartPrice: number;
  };
}

export interface CartProduct {
  count: number;
  _id: string;
  price: number;
  product: Product;
}
