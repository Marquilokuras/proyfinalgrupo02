import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginService } from './service/login/login.service';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { BebidaComponent } from './components/bebida/bebida.component';
import { BebidaFormComponent } from './components/bebida-form/bebida-form.component';
import { MesaComponent } from './components/mesa/mesa.component';
import { MesaFormComponent } from './components/mesa-form/mesa-form.component';
import { MesaClienteComponent } from './components/mesa-cliente/mesa-cliente.component';
import { ComentarioUsuarioComponent } from './components/comentario-usuario/comentario-usuario.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { PedidoFormComponent } from './components/pedido-form/pedido-form.component';
import { TokenInterceptorService } from './service/token-interceptor/token-interceptor.service';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';
import { PromocionComponent } from './components/promocion/promocion.component';
import { PromocionFormComponent } from './components/promocion-form/promocion-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    MenuComponent,
    BebidaComponent,
    BebidaFormComponent,
    MesaComponent,
    MesaFormComponent,
    MesaClienteComponent,
    ComentarioUsuarioComponent,
    PedidoComponent,
    PedidoFormComponent,
    UsuarioComponent,
    UsuarioFormComponent,
    PromocionComponent,
    PromocionFormComponent,

  ],

  imports: [
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [LoginService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
   }
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }

