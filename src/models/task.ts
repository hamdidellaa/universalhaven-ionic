import { TaskComment } from './taskcomment';





export class Task {
    id: number;
    description : string;
    camp: number;
    taskAssigner: string;
    taskExecutor: string;
    
    deadLine: Date;
    endingDate: Date;
    priority : string;
    status : string;
    startingDate: Date;
   
    Picture: string;
    comments : TaskComment[] = [];
    deadline: Date;

    TaskAssignerId: string;
    TaskExecutorId:string;
    campId: string = "1";
    Priority: string="0";
    Deadline: Date;
    Description: string;
    
    constructor(){
        status="";
    }
}