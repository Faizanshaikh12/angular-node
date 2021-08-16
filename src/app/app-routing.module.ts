import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from "./components/list/list.component";
import {EditComponent} from "./components/edit/edit.component";
import {CreateComponent} from "./components/create/create.component";
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";
import {AuthGuard} from "./guads/auth.guard";

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'list',
    component: ListComponent,
    canActivate:[AuthGuard],
  children: [
      {path: 'list', component: ListComponent},
      {path: 'edit/:id', component: EditComponent},
      {path: 'create', component: CreateComponent},
    ]
  },
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
