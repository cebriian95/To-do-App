import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


export interface Tarea {
  id: string;
  titulo: string;
  estado: 0 | 1 | 2; // '0' para pendiente, '1' para en proceso, '2' para completada
}

@Injectable({
  providedIn: 'root',
})
export class TareaServicio {

  private localStorageKey = 'tareas';
  tareasActualizadas = new Subject<void>();
  actualizarFoco = new Subject<void>();

  getTareas(): Tarea[] {
    const tareasJson = localStorage.getItem(this.localStorageKey);
    return tareasJson ? JSON.parse(tareasJson) : [];
  }

  guardarTareas(tareas: Tarea[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(tareas));
    this.tareasActualizadas.next();

  }

  agregarTarea(titulo: string): void {
    try {
      const tareas = this.getTareas();
      const id = Date.now().toString() + Math.random().toString(36).slice(2);
      tareas.push({ id, titulo, estado: 0 });
      this.guardarTareas(tareas);
    } catch (e) {
      alert('error: ' + e);
    }
  }

  actualizarEstado(id: string, nuevoEstado: 0 | 1 | 2): void {
    const tareas = this.getTareas();
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
      tarea.estado = nuevoEstado;
      this.guardarTareas(tareas);
    }
    this.actualizarFoco.next();
  }

  eliminarTarea(id: string): void {
    let tareas = this.getTareas();
    tareas = tareas.filter(t => t.id !== id);
    this.guardarTareas(tareas);
    this.actualizarFoco.next();
  }

}
