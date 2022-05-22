import { NgModule } from "@angular/core";
import { TodoItem } from "./todo-item/todo-item.component";
import { TodoList } from "./todo-list/todo-list.component";
import { TodosRoutingModule } from "./todos-routing.module";

@NgModule({
    declarations: [
        TodoList,
        TodoItem
    ],
    imports: [TodosRoutingModule]
})
export class TodosModule {}