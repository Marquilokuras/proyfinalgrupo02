import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { BebidaComponent } from './components/bebida/bebida.component';
import { BebidaFormComponent } from './components/bebida-form/bebida-form.component';
import { MesaFormComponent } from './components/mesa-form/mesa-form.component';
import { MesaComponent } from './components/mesa/mesa.component';
import { MesaClienteComponent } from './components/mesa-cliente/mesa-cliente.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent },
  {path: 'login', component: LoginComponent },
  {path: 'bebida',component:BebidaComponent},
  {path:'bebida-form/:id', component:BebidaFormComponent},
  {path:'mesa-form/:id', component:MesaFormComponent},
  {path:'mesa', component:MesaComponent},
  {path:'mesa-cliente', component:MesaClienteComponent},
  {path: '**', pathMatch:'full',redirectTo:'home' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
