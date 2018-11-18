export class Provider{
    constructor(
        public _id:string,
        public name: string,
        public business_name: String,
        public rfc: String,
        public tel: string,
        public address: string,
        public email: string,
        public contact_person: String,
        public start_date: string,
        public end_date: string,
        public status: string
    ){
    }
}