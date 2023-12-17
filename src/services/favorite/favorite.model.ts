export interface FavoriteModel {
    id: number;
    productId: number;
    accountId: number;
    Product: {
        id: number;
        name: string;
        price: number;
        description: string;
        images: string;
        importPrice: number;
        quantity: number;
        CategoryId: number;
        comments: Array<{
            images: string;
            id: number;
            commentBody: string;
            star: number;
            AccountId: number;
            productId: number;
        }>;
    }
}

export interface AddFavoriteModel {
    productId: number;
    AccountId: number;
}