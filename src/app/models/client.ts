export class Client{
    constructor(
        public _id:string,
        public name: string,
        public paternal_surname: string,
        public maternal_surname: string,
        public tel: string,
        public address: string,
        public birthdate: string,
        public email: string,
        public start_date: string,
        public end_date: string,
        public status: string
    ){
    }
}