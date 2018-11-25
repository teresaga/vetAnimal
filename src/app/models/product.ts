export class Product{
    constructor(
        public _id:string,
        public description: String,
        public price: string,
        public cost: String,
        public provider: string,
        public measurementunit: string,
        public typeproduct: string,
        public stock_min: String,
        public stock_max: String,
        public stock: String,
        public start_date: string,
        public end_date: string,
        public status: string
    ){
    }
}