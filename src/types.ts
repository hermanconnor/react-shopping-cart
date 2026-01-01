export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  numberInStock: number;
  category: string;
  rating: number;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}
