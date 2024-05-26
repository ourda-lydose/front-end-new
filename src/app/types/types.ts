export interface Item {
    id: string;
    name: string;
    description: string;
    image: string;
}

export interface ItemRequest {
    itemBuilder: ItemBuilder;
    description : string;
}

export interface ItemBuilder{
    name: string;
    image: string;
}

export interface ItemInBox {
    itemId: string;
    quantity: number;
}

export interface SubscriptionBox {
    id: string;
    name: string;
    image: string;
    description: string;
    price: number;
    itemInBoxList: ItemInBox[];
}

export interface BoxBuilder {
    name: string;
    image: string;
}

export interface BoxRequest {
    boxBuilder: BoxBuilder;
    description: string;
    price: number;
    itemInBoxList: ItemInBox[];
}

