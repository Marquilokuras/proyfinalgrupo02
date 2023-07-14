import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Comentario } from 'src/app/models/comentario/comentario';
import { Usuario } from 'src/app/models/usuario/usuario';
import { ComentarioService } from 'src/app/service/comentario/comentario.service';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-comentario-usuario',
  templateUrl: './comentario-usuario.component.html',
  styleUrls: ['./comentario-usuario.component.css']
})

export class ComentarioUsuarioComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  listaComentarios: Array<Comentario>;
  comentario!:any;
  usuario!: any;
  filtroP!: number

  listUsuario: Usuario[] = [];
  emailBuscado:string=""

  constructor(private comentarioService: ComentarioService, public usuarioService: LoginService, private toastrService: ToastrService) {
    this.comentario = new Comentario();
    this.listaComentarios = new Array<Comentario>();
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_pages',
      pageLength: 5,
    },
    this.obtenerComentarios()
    this.fechaComentario()
    this.mostrarUsuario();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  public tipoLogged() {
    var tipoUsuario = sessionStorage.getItem("tipoUsuario");
    return tipoUsuario;
  }

  public obtenerComentarios() {
    this.comentarioService.obtenerComentarios().subscribe(
      result => {
        this.listaComentarios = result;
        this.dtTrigger.next(this.listaComentarios);
      })
  }
    filtroPuntaje() {
      this.comentarioService.filtroPuntuacion(this.filtroP).subscribe(
        result =>{
          this.listaComentarios = result;
          this.comentario.Usuario
        },
      )
    }

  guardarComentario() {
    this.comentarioService.altaComentario(this.comentario).subscribe(
      result => {
        this.toastrService.success('¡Gracias por Comentar!✨😄🎉');
        setTimeout(() => {
          location.reload();
        }, 600);
      },
      error => { }
    )
  }

  eliminarComentario(comentario: Comentario) {
    this.comentarioService.eliminarComentario(comentario._id).subscribe(
      result => {
        this.toastrService.error("Eliminando Comentario...");
        setTimeout(() => {
          location.reload();
        }, 1000);
      },
      error => { }
    )
  }

  mostrarUsuario() {
    this.usuarioService.mostrarUsuario().subscribe(
      result => {
        this.listUsuario = result;
        this.usuario = sessionStorage.getItem("user");
        this.emailBuscado = this.usuario ; 
        this.listUsuario.forEach(usuario => {
          if (usuario.email == this.emailBuscado) {
              this.comentario.usuario = usuario.email
            return; 
          }
        });
      },
    )
  }

  evaluarPuntaje(puntaje: number) {
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

  fechaComentario() {
    const fecha = new Date();
    this.comentario.fechaComentario = fecha.toLocaleString();
  }
}
