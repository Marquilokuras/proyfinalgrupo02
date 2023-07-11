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

    var tempInput = document.createElement("input");
    tempInput.value = phoneNumber;
    document.body.appendChild(tempInput);

    tempInput.select();
    tempInput.setSelectionRange(0, 99999);

    document.execCommand("copy");

    document.body.removeChild(tempInput);
  }

}
