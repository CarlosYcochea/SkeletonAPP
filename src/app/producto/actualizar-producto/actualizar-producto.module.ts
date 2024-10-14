import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActualizarProductoPageRoutingModule } from './actualizar-producto-routing.module';

import { ActualizarProductoPage } from './actualizar-producto.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActualizarProductoPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ActualizarProductoPage]
})
export class ActualizarProductoPageModule {}
  