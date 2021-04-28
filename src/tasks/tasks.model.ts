export interface Task {
    id: string;
    title: string;
    descrpition: string;
    status: TaskStatus;   
}

export enum TaskStatus {
    OPEN = "OPEN",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE"
}