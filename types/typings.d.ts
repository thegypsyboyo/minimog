import { ReactNode } from "react";

export interface LayoutProps {
    className?: string;
    children: ReactNode;
}

export interface Image {
    url: string;
    public_url: string;
}
export interface Review {
    reviewBy: {
        $oid: string;
    };
    rating: number;
    review: string;
    size: string;
    style: {
        color: string;
        image: string;
    };
    fit: string;
    images: Image[];
    _id: {
        $oid: string;
    };
    createdAt: {
        $date: string;
    };
    updatedAt: {
        $date: string;
    };
}
export interface Detail {
    name: string;
    value: string;
    _id: {
        $oid: string;
    };
}
export interface Size {
    size: string;
    qty: number;
    price: number;
    _id: {
        $oid: string;
    };
}

export interface SubProduct {
    images: Image[];
    description_images: Image[];
    color: {
        color: string;
        image: string;
    };
    sizes: Size[];
    discount: number;
    _id: {
        $oid: string;
    };
    sku?: string; // Optional if it's present in all subProducts
}
export interface ProductProps {
    _id: {
        $oid: string;
    };
    name: string;
    description: string;
    brand: string;
    slug: string;
    category: {
        $oid: string;
    };
    subCategories: { $oid: string }[];
    details: Detail[];
    questions: any[]; // Change this to the appropriate type if questions structure is known
    subProducts: SubProduct[];
    createdAt: {
        $date: string;
    };
    updatedAt: {
        $date: string;
    };
    __v: number;
    numReviews: number;
    rating: number;
    refundPolicy: string;
    reviews: Review[];
    shipping: string;
}