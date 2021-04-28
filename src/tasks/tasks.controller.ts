import { Body, Delete, Param, Patch, Query } from '@nestjs/common';
import { Controller, Get, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    // dart에서 생성자 만들어서 사용하는거랑 같은 개념임.
    constructor(private taskService : TasksService){}

    // @Query()를 이용하면 직접 QueryString에 값을 넣고 출력할 수 있음.
    // http://localhost:3000/tasks?status=OPEN&search=Hello
    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Task[]{
        // Object.keys(filterDto).length ==> filter에 하나라도 값이 있으면이라는 뜻.
        if(Object.keys(filterDto).length) {
            return this.taskService.getTasksWithFilters(filterDto);
        }else{
            return this.taskService.getAllTasks();
        }
    }

    @Get('/:id') // param의 id와 get의 id는 같아야한다.
    getTaskById(@Param('id') id: string): Task{
        return this.taskService.getTaskById(id);
    }

    // service내의 delete가 void type이므로 여기서도 마찬가지로 return할 필요가 없다.
    @Delete('/:id')
    deleteTaskById(@Param('id') id: string){
        this.taskService.deleteTaskById(id);
    }

    // @Post()
    // createTask(@Body() body){
    //     console.log(body)

    // }

    // @Post()
    // createTask(
    //     @Body('title') title: string, 
    //     @Body('description') description: string, 
    // ): Task{
    //    return this.taskService.createTask(title, description);
    // }

    @Post()
    createTask(@Body() CreateTaskDto: CreateTaskDto): Task {
        return this.taskService.createTask(CreateTaskDto);
    }
    
    // @Body parameter로 설정하면 http://localhost:3000/tasks/id/status 여기서
    // status값을 직접 주는 변수임.
    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status') status: TaskStatus,
    ){
        return this.taskService.updateTaskStatus(id, status);
    }


}
