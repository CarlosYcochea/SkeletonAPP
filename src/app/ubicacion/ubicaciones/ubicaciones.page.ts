import { Component, OnInit } from '@angular/core';
import { SQLiteService } from '../sqlite.service';

@Component({
  selector: 'app-ubicaciones',
  templateUrl: './ubicaciones.page.html',
  styleUrls: ['./ubicaciones.page.scss'],
})
export class UbicacionesPage implements OnInit {
  ubicaciones: any[] = [];

  constructor(private sqliteService: SQLiteService) {}

  // Se ejecuta cuando se carga la página
  async ngOnInit() {
    await this.cargarUbicaciones();  // Cargar ubicaciones al inicializar la página
  }

  // Función para cargar las ubicaciones desde SQLite
  async cargarUbicaciones() {
    try {
      // Obtener las ubicaciones de la base de datos
      const ubicaciones = await this.sqliteService.cargarUbicaciones();
      
      // Asignar las ubicaciones al array si hay datos, sino mantener vacío
      if (ubicaciones && ubicaciones.length > 0) {
        this.ubicaciones = ubicaciones;
      } else {
        this.ubicaciones = [];
      }
    } catch (error) {
      console.error('Error al cargar ubicaciones:', error);
      this.ubicaciones = [];  // Si hay error, asegurarse de que el array esté vacío
    }
  }