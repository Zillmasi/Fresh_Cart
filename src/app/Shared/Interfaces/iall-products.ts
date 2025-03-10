export interface IAllProducts {
    sold: number;
    images: string[];
    subcategory: Subcategory[];
    ratingsQuantity: number;
    _id: string;
    title: string;
    slug: string;
    description: string;
    quantity: number;
    price: number;
    imageCover: string;
    category: Category;
    brand: Category;
    ratingsAverage: number;
    createdAt: string;
    updatedAt: string;
    id: string;
    priceAfterDiscount?: number;
    availableColors?: any[];
  }
  
  interface Category {
    _id: string;
    name: string;
    slug: string;
    image: string;
  }
  
  interface Subcategory {
    _id: string;
    name: string;
    slug: string;
    category: string;
  }
  
  