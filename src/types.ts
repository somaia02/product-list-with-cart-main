export interface Product {
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  name: string;
  category: string;
  price: number;
}

export interface ICart {
  [key: string]: {
    product: Product;
    count: number;
  };
}

export type ICartContext = [
  ICart | null,
  React.Dispatch<React.SetStateAction<ICart | null>>,
];
