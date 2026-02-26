import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgClass } from "@angular/common";
import { TareaServicio } from '../../servicios/tarea-servicio';
import { Tarea as TareaModel } from '../../servicios/tarea-servicio';
import { Tarea } from "../tarea/tarea";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-columna-tarea',
  imports: [NgClass, Tarea],
  templateUrl: './columna-tarea.html',
  styleUrl: './columna-tarea.css',
})
export class ColumnaTarea implements OnInit, OnDestroy {

  @Input() estado!: 0 | 1 | 2;

  tareasFiltradas: TareaModel[] = [];
  private suscripcion!: Subscription;

  constructor(private tareaServicio: TareaServicio) { }

  private filtrarTareas() {
    const tareas = this.tareaServicio.getTareas();
    this.tareasFiltradas = tareas.filter(tarea => tarea.estado === this.estado);
  }
    
  ngOnInit(): void {
    this.filtrarTareas();

    this.suscripcion = this.tareaServicio.tareasActualizadas.subscribe(() => {
      this.filtrarTareas();
    });
  }


  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  get titulo(): string {
    const nombres = ['Pendiente', 'En Progreso', 'Completado'];
    return nombres[this.estado];
  }

  get clasesFondo(): string {
    const fondos = ['bg-blue-100 border border-blue-400', 'bg-yellow-100 border border-yellow-400', 'bg-green-100 border border-green-400'];
    return fondos[this.estado];
  }
}


