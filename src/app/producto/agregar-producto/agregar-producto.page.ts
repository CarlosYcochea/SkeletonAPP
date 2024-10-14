import { Component, OnInit } from '@angular/core';
import { MLproducto } from '../model/Mlproducto';
import { ProductoService } from '../producto.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
declare var QRScanner: any; // Importar el plugin QRScanner

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.page.html',
  styleUrls: ['./agregar-producto.page.scss'],
})
export class AgregarProductoPage implements OnInit {
  scannedResult: string | null = null;

  productoForm!: FormGroup;

  producto: MLproducto = {
    id: 2,
    nombre: 'hola',
    materialidad: 'hulo'
  };

  constructor(
    private restApi: ProductoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.productoForm = this.formBuilder.group({
      nombre: [null, Validators.required],
      materialidad: [null, Validators.required],
    });
  }

  async onFormSubmit(form: NgForm) {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();
  
    this.producto = this.productoForm.value;

    await this.restApi.agregarProducto(this.producto)
    .subscribe({
      next: (res) => {
        console.log(res);
        loading.dismiss();
        this.router.navigate(['/gestion']);
      },
      error: (err) => {
        console.log(err);
        loading.dismiss();
      }
    });
  }

  startScan() {
    // Solicita permisos y prepara el escaneo
    QRScanner.prepare((err: any, status: any) => {
      if (err) {
        console.error('Error en el escaneo:', err);
        return;
      }

      if (status.authorized) {
        // Si el usuario ha autorizado, inicia el escaneo
        QRScanner.scan((err: any, result: string) => {
          if (err) {
            console.error('Error durante el escaneo:', err);
            return;
          }

          // Si se detectó contenido
          this.scannedResult = result;
          console.log('Contenido escaneado:', this.scannedResult);

          // Detiene el escaneo
          QRScanner.hide(); // Oculta la cámara
        });

        // Muestra la cámara para el escaneo
        QRScanner.show();
      } else if (status.denied) {
        // El usuario ha denegado los permisos, guía para habilitarlos
        console.warn('Permiso de cámara denegado');
      } else {
        // El usuario no ha denegado ni autorizado todavía
        console.warn('Permiso pendiente');
      }
    });
  }

  stopScan() {
    // Detiene el escaneo y oculta la cámara
    QRScanner.hide();
    QRScanner.destroy();
  }
}
