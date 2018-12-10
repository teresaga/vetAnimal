export class Corte{
    constructor(
        public start_date: string,
        public finish_date: string,
        public money_stay: string,
        public money_save: string,
        public money_sales: string,
        public user: string,
        public status: string,
        public _id?:string
    ){
    }
}