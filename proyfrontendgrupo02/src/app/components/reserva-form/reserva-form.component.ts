import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mesa } from 'src/app/models/mesa';
import { Reserva } from 'src/app/models/reserva/reserva';
import { MesaService } from 'src/app/service/mesa.service';
import { ReservaService } from 'src/app/service/reserva/reserva.service';

@Component({
  selector: 'app-reserva-form',
  templateUrl: './reserva-form.component.html',
  styleUrls: ['./reserva-form.component.css']
})
export class ReservaFormComponent implements OnInit {
  reserva!:Reserva;
  accion: string = "";
  usuario!: any;
  mesas! : Array<Mesa>;
  reservaElegida!:Mesa;
  porMesa!: Array<Reserva>;
  nueva!:Mesa;
  sillasElegidas!:number;
  mesasElegidas!:number;
  array! : Array<string>
  local:number=1;
  horarioReservado!:string;
  

  constructor(private servicio:ReservaService, private activatedRoute: ActivatedRoute,private router: Router, private servicioMesa:MesaService) { 
    this.reserva = new Reserva();
    this.mesas = new Array<Mesa>();
    this.reservaElegida = new Mesa();
    this.porMesa = new Array<Reserva>();
    this.nueva = new Mesa();
    this.array = new Array<string>();
  }

  ngOnInit(): void {
    this.obtenerMesas();
    
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] == "0") {
        this.accion = "new";
      } else {
        this.accion = "update";
        this.cargarReserva(params['id'])
      }
    });
    // this.usuario = sessionStorage.getItem("user");
    // this.reserva.usuario = this.usuario;
  }

  cargarReserva(id: string) {
    this.servicio.obtenerReserva(id).subscribe(
      result => {
        Object.assign(this.reserva, result);
        this.obtenerPorNumeroDeMesa(this.reserva.numeroMesa)
        this.horarioReservado = this.reserva.hora
      },
      error => { }
    )
  }
  guardarReserva() {
   this.reserva.cantidadMesa = this.mesasElegidas
   this.reserva.cantidadSilla = this.sillasElegidas
    this.reserva.fecha = new Date()
    
    this.servicio.crearReserva(this.reserva).subscribe(
      result => {
        this.router.navigate(["reserva"])
      },
      error => { 
        alert("nada")
      }
    )
  }


  actualizarReserva() {
    this.servicio.editarReserva(this.reserva).subscribe(
      (result: any) => {

        this.router.navigate(["reserva"])
      },
      error => { }
    )
  }

  obtenerMesas(){
    this.servicioMesa.obtenerMesasDisponibles().subscribe(
      result =>{
        let unaMesa = new Mesa();
        result.forEach((element: any) => {
          Object.assign(unaMesa, element)
          this.mesas.push(unaMesa)
          unaMesa = new Mesa();
        });

      },
      error => { 
          alert("error a")
      }
    )
  }


  traerMesa(){ 
    
    this.servicioMesa.obtenerMesaPorNumero(this.reserva.numeroMesa).subscribe(
      result=>{
console.log(this.local)

        Object.assign(this.nueva, result[0]);
        this.obtenerPorNumeroDeMesa(this.nueva.numeroMesa)
        this.getNumerosHastaCantidadSillas();
        this.getNumerosHastaCantidadMesas()
        this.getHorariosDisponibles();
        this.local=0;
       
      }, error=>{
   
        
      }
    )
  }

  getNumerosHastaCantidadMesas(): number[] {
    let numeros: Array<number>;
    numeros = new Array<number>();
    for (let i = 1; i <= this.nueva.cantidadMesa; i++) {
      numeros.push(i);
    }
    return numeros;
  }

  getNumerosHastaCantidadSillas(): number[] {
    let numeros: Array<number>;
    numeros = new Array<number>();
    for (let i = 1; i <= this.nueva.cantidadSilla; i++) {
      numeros.push(i);
    }
    return numeros;
  }

  obtenerPorNumeroDeMesa(numero: number) {
    this.servicio .obtenerPorNumeroDeMesa(numero).subscribe(
      result => {
        let unaReserva = new Reserva();
        result.forEach((element: any) => {
          Object.assign(unaReserva, element)
          this.porMesa.push(unaReserva)
          unaReserva = new Reserva();
        });
        console.log(this.porMesa)
      },
      error => { }
    )
  }

  getHorariosDisponibles(): string[] {
    const horarios: string[] = [];
    let horaActual = new Date().getHours();
    const horaLimite = 25;
    if (horaActual >= 1 && horaActual <= 18) {
      horaActual = 17;
    }

    for (let i = horaActual + 1; i <= horaLimite; i++) {

      if (i === 24) {
        horarios.push("00:00 a 02:00");
      }
      if (i !== 25 && i !== 24) {
        let h = i;
        if (h +2 == 24){
          horarios.push(`${i}:00 a 00:00`);
        }else{
          horarios.push(`${i}:00 a ${i + 2}:00`);
        }
        
      }
      i++;
    }

    const horariosFiltrados = horarios.filter((horario) => {
      return !this.porMesa.some((reserva) => reserva.hora === horario);
    });
    return horariosFiltrados;
  }


}
