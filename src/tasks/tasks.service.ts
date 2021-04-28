import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {

    // Task의 배열 타입으로 tasks 변수 설정.
    private tasks: Task[] = [];

    getAllTasks(): Task[]{
        return this.tasks;
    }

    getTasksWithFilters(filterDto: GetTasksFilterDto): Task[]{
        const {status, search} = filterDto;

        let tasks = this.getAllTasks();

        if(status){
            tasks = tasks.filter(task => task.status === status);
        }

        if(search){
            tasks = tasks.filter(task => task.title.includes(search) || task.descrpition.includes(search));
        }

        return tasks;

    }

    getTaskById(id: string): Task{
        return this.tasks.find(task => task.id === id);
    }

    // delete함수에서는 아무것도 return할 필요가 없으므로 기본적으로 void type이다.
    // void는 적어도 되고 안 적어도 된다.
    deleteTaskById(id: string): void{
        // const tasks라고 하면 해당 함수 내에 새로운 변수를 만드는 거니까 실제 tasks에 반영이 안된다.
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

    // createTask(title: string, descrpition: string): Task {
    //     const task: Task = {
    //         id: uuid(),
    //         title: title,
    //         descrpition: descrpition,
    //         status: TaskStatus.OPEN
    //     }

    //     // 위에서 만든 task를 tasks Array에 넣어줌으로써 Task를 추가하고,
    //     // 추가된 task를 return함.
    //     this.tasks.push(task);
    //     return task;
    // }

    createTask(createTaskDto: CreateTaskDto): Task {

        const {title, description} = createTaskDto;

        const task: Task = {
            id: uuid(),
            title: title, //createTaskDto['title']
            descrpition: description, //createTaskDto['description']
            status: TaskStatus.OPEN
        }

        // 위에서 만든 task를 tasks Array에 넣어줌으로써 Task를 추가하고,
        // 추가된 task를 return함.
        this.tasks.push(task);
        return task;
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = this.getTaskById(id);
        // this.deleteTaskById(id);
        // this.tasks.push({
        //     id: id,
        //     descrpition: task.descrpition,
        //     title: task.title,
        //     status: status,   
        // })
        task.status = status;
        return task;
    }





}
