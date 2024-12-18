export interface Category {
    id: string;
    categoryName: string;
    categoryDescription: string;
}

export interface ItemLocation {
    id: string;
    locationName: string;
    locationDescription: string;
}

export interface Item {
    id: string;
    category_id: string;
    location_id: string;
    itemName: string;
    itemDescription: string;
    itemImage: string | null;
    date: string
}

export type ItemWithoutId = Omit<Item, 'id'>;
export type LocationWithoutId = Omit<ItemLocation, 'id'>;
export type CategoryWithoutId = Omit<Category, 'id'>;