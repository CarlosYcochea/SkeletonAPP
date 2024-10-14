import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class SQLiteService {
  
  private database!: SQLiteObject;
  ubicaciones: any[] = [];
  constructor(private sqlite: SQLite) { }

  crearBD() {
    this.sqlite.create({
      name: 'ubicacionesBD.db',  // Cambiamos el nombre de la base de datos
      location: 'default'
    }).then((db: SQLiteObject) => {
      this.database = db;
      console.log("Base de datos 'ubicacionesBD' creada");
      // Llamar a la función para crear las tablas
      this.crearTablas();
    }).catch(e => console.error(e));

  }
  tblUbicaciones: string = `
  CREATE TABLE IF NOT EXISTS ubicaciones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    rack TEXT NOT NULL,
    ubicacion TEXT NOT NULL,
    cantidad INTEGER NOT NULL
  );
`;

  async crearTablas() {
    try {
      await this.database.executeSql(this.tblUbicaciones, []);
      console.log("Tabla de ubicaciones creada");
      this.cargarUbicaciones(); // Llamada a función para cargar los datos (opcional)
    } catch (error) {
      console.error("Error en Crear Tabla: " + error);
    }
  }

  addUbicacion(nombre: string, rack: string, ubicacion: string, cantidad: number) {
    let data = [nombre, rack, ubicacion, cantidad];
    return this.database.executeSql('INSERT INTO ubicaciones (nombre, rack, ubicacion, cantidad) VALUES (?, ?, ?, ?)', data)
      .then(() => {
        this.cargarUbicaciones(); // Recargar la lista de ubicaciones
      });
  }
  updateUbicacion(id: number, nombre: string, rack: string, ubicacion: string, cantidad: number) {
    let data = [nombre, rack, ubicacion, cantidad, id];
    return this.database.executeSql('UPDATE ubicaciones SET nombre = ?, rack = ?, ubicacion = ?, cantidad = ? WHERE id = ?', data)
      .then(() => {
        this.cargarUbicaciones(); // Recargar la lista de ubicaciones
      });
  }
  deleteUbicacion(id: number) {
    return this.database.executeSql('DELETE FROM ubicaciones WHERE id = ?', [id])
      .then(() => {
        this.cargarUbicaciones(); // Recargar la lista de ubicaciones
      });
  }
  cargarUbicaciones() {
    return this.database.executeSql('SELECT * FROM ubicaciones', [])
      .then(res => {
        let items: any[] = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            items.push({
              id: res.rows.item(i).id,
              nombre: res.rows.item(i).nombre,
              rack: res.rows.item(i).rack,
              ubicacion: res.rows.item(i).ubicacion,
              cantidad: res.rows.item(i).cantidad
            });
          }
        }
        // Assuming you want to use a different property to store the items
        this.ubicaciones = items;
      });  }
}
