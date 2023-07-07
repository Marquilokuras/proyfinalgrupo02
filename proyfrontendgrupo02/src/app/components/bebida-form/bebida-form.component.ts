import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Bebida } from 'src/app/models/bebida';
import { BebidaService } from 'src/app/service/bebida.service';


@Component({
  selector: 'app-bebida-form',
  templateUrl: './bebida-form.component.html',
  styleUrls: ['./bebida-form.component.css']
})
export class BebidaFormComponent {
  bebida:Bebida;
  accion:string="";
  file: { base64: string, safeurl: SafeUrl | null }
  constructor(private activatedRoute: ActivatedRoute,
              private bebidaService: BebidaService,
              private router:Router,
              private domSanitizer: DomSanitizer,
              private toastrService:ToastrService){
    this.bebida = new Bebida();
    this.file = { base64: '', safeurl: null };

  }

ngOnInit():void{
  this.activatedRoute.params.subscribe(params =>{
    if (params['id']=="0"){
      this.accion = "new";
      this.bebida.disponibilidadBebida=true;
    }else{
      this.accion = "update";
      this.cargarBebida(params['id']);
    }
  })
}
  cargarBebida(id:string) {
    this.bebidaService.obtenerBebida(id).subscribe(
      result=>{
        console.log(result);
        Object.assign(this.bebida,result)
      },
      error=>{
        console.log(error);
      }
    )
  }

  public guardarBebida(){
    console.log(this.bebida.disponibilidadBebida)
    if(this.bebida.disponibilidadBebida==null){
      this.bebida.disponibilidadBebida=false
    }
    if(this.bebida.imagenBebida!=null){
      this.bebidaService.guardarBebida(this.bebida).subscribe(
        result=>{
          if(result.status==1){
            alert(result.msg)
            this.router.navigate(["bebida"])
          }
          console.log("La bebida guardadaaaa"+this.bebida.nombreBebida+" "+this.bebida.imagenBebida);
          console.log(result);
        },
        error=>{
          console.log(error);
          alert(error.msg)
        }
      )

    }else {
      this.toastrService.warning("Debe ingresar una imagen");
    }
   
  }

  public actualizarBebida(){
    console.log(this.bebida)
   this.bebidaService.actualizarBebida(this.bebida).subscribe(
    result=>{
      console.log(this.bebida);
      if(result.status==1){
        alert(result.msg)
        this.router.navigate(["bebida"])
      }
      console.log(result);
    },
    error=>{
      console.log(error);
      alert(error.msg)
    }
   )
  }

  onFileSelected(event: any) {
    const file = event.target.files[0]; // Obtener solo el primer archivo seleccionado
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        let base64 = reader.result as string
        this.bebida.imagenBebida = base64;
        let safeurl: SafeUrl = this.domSanitizer.bypassSecurityTrustUrl(base64);
        //this.files.push({ 'base64': base64, 'safeurl': safeurl });
        this.file.base64=base64;
        this.file.safeurl=safeurl;
       //console.log(this.bebida.imagenBebida)
      };
      reader.readAsDataURL(file);
    }
    
  }

  

}
