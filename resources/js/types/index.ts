// resources/js/types/index.d.ts (or similar)
export interface Brand {
    id: number;
    name: string;
    slug: string;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    original_price?: number;
    discount_percent: number;
    stock_quantity: number;
    main_image: string;
    images: string[];
    features: string[];
    category: Category;
    brand: Brand;
}
