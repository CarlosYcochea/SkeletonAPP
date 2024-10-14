import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActualizarUbicacionPageRoutingModule } from './actualizar-ubicacion-routing.module';

import { ActualizarUbicacionPage } from './actualizar-ubicacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActualizarUbicacionPageRoutingModule
  ],
  declarations: [ActualizarUbicacionPage]
})
export class ActualizarUbicacionPageModule {}
