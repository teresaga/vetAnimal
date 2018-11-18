export class Activity{
    constructor(
        public _id: string,
        public date: String,
        public time: String,
        public service: String,
        public client: String,
        public animal: String,
        public worker: String,
        public notes: String,
        public start_date: String,
        public end_date: String,
        public status: String
    ){
    }
}