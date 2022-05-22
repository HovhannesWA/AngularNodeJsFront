import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TodoItem } from "./todo-item/todo-item.component";
import { TodoList } from "./todo-list/todo-list.component";

const routes: Routes = [
    {path: '', component: TodoList},
    {path: ':id', component: TodoItem}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TodosRoutingModule {}