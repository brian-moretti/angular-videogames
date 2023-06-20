import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  constructor(private router: Router) {}
  //? Iniettare il Router per reindirizzare l'applicazione al componente

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    console.log(form.value.search);

    this.router.navigate(['search', form.value.search]);
    //? Utilizza il router per navigare alla pagina indicata come valore dell'input search/value
  }
}
