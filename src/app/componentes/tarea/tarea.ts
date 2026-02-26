import { Component, Input } from '@angular/core';
import { Tarea as TareaModel } from '../../servicios/tarea-servicio';
import { TareaServicio } from '../../servicios/tarea-servicio';

@Component({
  selector: 'app-tarea',
  imports: [],
  templateUrl: './tarea.html',
  styleUrl: './tarea.css',
})
export class Tarea {

  @Input() tarea!: TareaModel;

  constructor(private tareaServicio: TareaServicio) { }

  eliminarTarea() {
    this.tareaServicio.eliminarTarea(this.tarea.id);
  }

  actualizarEstado() {
    const nuevoEstado = (this.tarea.estado + 1) as 0 | 1 | 2;
    this.tareaServicio.actualizarEstado(this.tarea.id, nuevoEstado);
  }

}
