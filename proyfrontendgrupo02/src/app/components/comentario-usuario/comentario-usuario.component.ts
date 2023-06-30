import { Component, OnInit } from '@angular/core';
import { Comentario } from 'src/app/models/comentario/comentario';
import { ComentarioService } from 'src/app/service/comentario/comentario.service';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-comentario-usuario',
  templateUrl: './comentario-usuario.component.html',
  styleUrls: ['./comentario-usuario.component.css']
})
export class ComentarioUsuarioComponent implements OnInit {

  listaComentarios: Array<Comentario>;
  comentario!:Comentario;
  usuario!:any;
  cantidad!:LoginService



  constructor(private comentarioService:ComentarioService,public loginService: LoginService) {
    this.comentario = new Comentario();
    this.listaComentarios = new Array<Comentario>();

    this.obtenerComentarios()
  }

  ngOnInit(): void {
    this.obtenerComentarios()
    this.fechaComentario()
    this.usuario = sessionStorage.getItem("user");  console.log(this.usuario);
    this.comentario.usuario=this.usuario
  }

  public tipoLogged() {
    var tipoUsuario = sessionStorage.getItem("tipoUsuario");
    return tipoUsuario;
  }


  public obtenerComentarios() {
    this.comentarioService.obtenerComentarios().subscribe(
      result => {
        console.log(result);

          this.listaComentarios=result;
      })
  }

  guardarComentario(){
    this.comentarioService.altaComentario(this.comentario).subscribe(
      result=>{
        if(result.status == 1){
         window.location.href = window.location.href
        }
      },
      error=>{ alert(error.msg); }
    )
  }

  modificarComentario(){

    console.log(this.comentario);
     this.fechaComentario();
     this.comentarioService.modificarComentario(this.comentario).subscribe(
      result=>{
        if(result.status == 1){
          this.obtenerComentarios();// Vuelve a cargar la lista de comentarios
          this.comentario = new Comentario();  // se asigna un nuevo objeto vacío a la variable comentario
          this.comentario.usuario=this.usuario
          this.fechaComentario();
        }
      },
      error=>{ alert(error.msg); }
    )
  }

  public eliminarComentario(comentario: Comentario) {
    this.comentarioService.eliminarComentario(comentario._id).subscribe(
      result => {
        if (result.status == 1) {
          // eliminar comentario de la lista de comentarios
          const index = this.listaComentarios.indexOf(comentario);
          if (index !== -1) {
            this.listaComentarios.splice(index, 1);
          }
          console.log(result)
        }
      },
      error => {  alert(error.msg) }
    )
  }

  obtenerComentario(id:string){
    this.comentarioService.obtenerComentario(id).subscribe(
      result=>{
        console.log(result);
        this.comentario=result
        this.comentario.usuario=this.usuario
      })
  }


  evaluarPuntaje(puntaje:number) {
    if (puntaje <= 2) {
      return 'Bajo';
    } else if (puntaje == 3) {
      return 'Medio';
    } else if (puntaje >= 3 && puntaje <= 5) {
      return 'Alto';
    } else {
      return 'Sin evaluar';
    }
  }

  fechaComentario(){
    const fecha = new Date();
    this.comentario.fechaComentario = fecha.toLocaleString();
  }

  setPuntaje(puntaje: number) {
    this.comentario.puntajeComentario = puntaje;
  }
}
