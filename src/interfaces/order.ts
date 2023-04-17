export interface INewOrder {
    name: string,
    numberOfOrder: string | number,
    phone: string,
    address: string
}

export interface IOrder extends INewOrder {
    readonly id: string
    process: string
}
