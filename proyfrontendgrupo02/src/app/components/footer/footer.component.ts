import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  copyPhoneNumber() {
    var phoneNumber = "+5493884589004";

    // Crear un elemento de entrada de texto temporal
    var tempInput = document.createElement("input");
    tempInput.value = phoneNumber;
    document.body.appendChild(tempInput);

    // Seleccionar el contenido del campo de entrada de texto temporal
    tempInput.select();
    tempInput.setSelectionRange(0, 99999);

    // Copiar el contenido seleccionado al portapapeles
    document.execCommand("copy");

    // Eliminar el campo de entrada de texto temporal
    document.body.removeChild(tempInput);

    // Mostrar un mensaje de éxito o realizar otras acciones
    alert("Telefono copiado al portapapeles");
  }
}
