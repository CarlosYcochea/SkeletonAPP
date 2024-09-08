import { Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    $('#registroForm').on('submit', (e) =>{
      e.preventDefault();
      const nombre = $('#nombre').val();
      const email = $('#email').val();
      const password = $('#password').val();
      
      if(nombre && email && password) {
        alert('Registro exitoso');
        this.router.navigate(['/login']);
      } else {
        alert('Por favor, completa todos los campos.');
      }
    });
  }
}
