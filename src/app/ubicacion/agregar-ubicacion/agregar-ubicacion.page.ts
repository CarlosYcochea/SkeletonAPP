import { Component, OnInit } from '@angular/core';
import { SQLiteService } from '../sqlite.service';

@Component({
  selector: 'app-agregar-ubicacion',
  templateUrl: './agregar-ubicacion.page.html',
  styleUrls: ['./agregar-ubicacion.page.scss'],
})
export class AgregarUbicacionPage implements OnInit {
  ubicaciones: any[] = [];
  ubicacion = { nombre: '', rack: '', ubicacion: '', cantidad: 0 };

  constructor(private sqliteService: SQLiteService) {}

  async ngOnInit() {
    await this.sqliteService.openDatabase();
    const ubicaciones = await this.sqliteService.obtenerUbicaciones();
    this.ubicaciones = ubicaciones || [];
  }

  async onSubmit() {
    await this.sqliteService.insertarUbicacion(
      this.ubicacion.nombre,
      this.ubicacion.rack,
      this.ubicacion.ubicacion,
      this.ubicacion.cantidad
    );
    const ubicaciones = await this.sqliteService.obtenerUbicaciones();
    this.ubicaciones = ubicaciones || [];
    this.ubicacion = { nombre: '', rack: '', ubicacion: '', cantidad: 0 }; // Reset form
  }
}
