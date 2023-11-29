export interface VoucherModel { 
    id: number,
    name: string,
    image: string,
    discount: number,
    startDate: Date,
    endDate: Date, 
    createdAt: Date, 
    updatedAt:Date
}