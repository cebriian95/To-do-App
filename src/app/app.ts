import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ColumnaTarea } from "./componentes/columna-tarea/columna-tarea";
import { FormularioTarea } from "./componentes/formulario-tarea/formulario-tarea";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ColumnaTarea, FormularioTarea],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('To-Do');
}
