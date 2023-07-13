import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { BebidaComponent } from './components/bebida/bebida.component';
import { BebidaFormComponent } from './components/bebida-form/bebida-form.component';
import { MesaFormComponent } from './components/mesa-form/mesa-form.component';
import { MesaComponent } from './components/mesa/mesa.component';
import { MesaClienteComponent } from './components/mesa-cliente/mesa-cliente.component';
import { MenuComponent } from './components/menu/menu.component';
import { ComentarioUsuarioComponent } from './components/comentario-usuario/comentario-usuario.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { PedidoFormComponent } from './components/pedido-form/pedido-form.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';
import { PromocionComponent } from './components/promocion/promocion.component';
import { PromocionFormComponent } from './components/promocion-form/promocion-form.component';
import { ReservaComponent } from './components/reserva/reserva/reserva.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { ReservaFormComponent } from './components/reserva-form/reserva-form.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'usuario', component: UsuarioComponent},
  {path: 'usuario-form/:id', component: UsuarioFormComponent},
  {path: 'usuario-form', component: UsuarioFormComponent},
  {path: 'login', component: LoginComponent},
  {path: 'bebida',component:BebidaComponent},
  {path: 'bebida-form/:id', component:BebidaFormComponent},
  {path: 'mesa-form/:id', component:MesaFormComponent},
  {path: 'mesa-form/0', component:MesaFormComponent},
  {path: 'mesa', component:MesaComponent,},
  {path: 'mesa-cliente', component:MesaClienteComponent,},
  {path: 'comentario-usuario', component:ComentarioUsuarioComponent},
  {path: 'menu', component:MenuComponent},
  {path: 'pedido', component:PedidoComponent,},
  {path: 'reserva', component:ReservaComponent,},
  {path: 'reserva-form/:id', component:ReservaFormComponent,},
  {path: 'reserva-form/0', component:ReservaFormComponent,},
  {path: 'pedido/:id', component:PedidoComponent,},
  {path: 'pedido-form', component:PedidoFormComponent,},
  {path: 'promocion',component:PromocionComponent,},   
  {path: 'promocion-form/:id',component:PromocionFormComponent,},
  {path: 'estadisticas',component:EstadisticasComponent,},
  {path: '**', pathMatch:'full',redirectTo:'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
