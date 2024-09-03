import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage{
  nombre: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router) { }

  registro() {
    if (this.nombre && this.email && this.password) {
      alert('Registro exitoso');
      this.router.navigate(['/login']);
    } else {
      alert('Por favor, complete todos los campos');
    }
  }

}
