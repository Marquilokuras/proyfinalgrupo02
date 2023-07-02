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
    this.usuarioRegistrado()
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
        this.fechaComentario();
        if(result.status == 1){
          this.obtenerComentarios();// Vuelve a cargar la lista de comentarios
          this.comentario = new Comentario();  // se asigna un nuevo objeto vacío a la variable comentario
          this.fechaComentario();
          this.usuarioRegistrado();
        }
      },
      error=>{ alert(error.msg); }
    )
  }


  cancelarComentario(){
    this.comentario = new Comentario()
    this.usuarioRegistrado();
    this.fechaComentario();
  }

  public eliminarComentario(comentario: Comentario) {
    this.comentarioService.eliminarComentario(comentario._id).subscribe(
      result => {
        if (result.status == 1) {

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
        this.usuarioRegistrado();
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
  setPuntaje(puntaje: number) {
    this.comentario.puntajeComentario = puntaje;
  }

  fechaComentario(){
    const fecha = new Date();
    this.comentario.fechaComentario = fecha.toLocaleString();
  }

  usuarioRegistrado(){
    this.usuario = sessionStorage.getItem("user");
    this.comentario.usuario=this.usuario
  }

}
