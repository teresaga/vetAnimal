export class User{
    constructor(
        public _id:string,
        public username: string,
        public password: string,
        public worker: string,
        public role: string,
        public start_date: string,
        public end_date: string,
        public status: string
    ){
    }
}