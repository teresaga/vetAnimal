export class Consultation{
    constructor(
        public _id:string,
        public client: string,
        public animal: string,
        public weight: String,
        public temperature: String,
        public notes: String,
        public image: String,
        public date: String
    ){
    }
}