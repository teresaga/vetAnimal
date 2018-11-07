export class Worker{
    constructor(
        public _id:string,
        public name: string,
        public paternal_surname: string,
        public maternal_surname: string,
        public tel: string,
        public address: string,
        public age: string,
        public email: string,
        public salary: string,
        public entry_horary: string,
        public departure_horary: string,
        public job: string,
        public start_date: string,
        public end_date: string,
        public status: string
    ){
    }
}