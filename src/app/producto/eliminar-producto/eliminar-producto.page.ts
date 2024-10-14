import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../producto.service';
import { MLproducto } from '../model/Mlproducto';

@Component({
  selector: 'app-eliminar-producto',
  templateUrl: './eliminar-producto.page.html',
  styleUrls: ['./eliminar-producto.page.scss'],
})
export class EliminarProductoPage implements OnInit {
  
  producto : MLproducto = { id: 2, nombre: 'pedro', materialidad: 'pascal' };

  constructor(
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    public restApi: ProductoService
  ) { }

  ngOnInit() {
    this.obtenerProducto();
  }

  async obtenerProducto(){
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();

    await this.restApi.obtenerProducto(this.route.snapshot.params['id']).subscribe({
      next: (res) => {
        this.producto = res;
        loading.dismiss();
      },
      error: (err) => {
        console.log(err);
        loading.dismiss();
      }
    });
  }

  async eliminarProducto(id: number) {
    const loading = await this.loadingController.create({
      message: 'Eliminando producto...'
    });
    await loading.present();

    await this.restApi.eliminarProducto(id).subscribe({
      next: (res) => {
        loading.dismiss();
        this.router.navigate(['/gestion']);
      },
      error: (err) => {
        console.log(err);
        loading.dismiss();
      }
    });
  }

  async presentAlertConfirm(message: string) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
  }

}
