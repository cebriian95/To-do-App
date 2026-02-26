import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { TareaServicio } from '../../servicios/tarea-servicio';
import { Subscription } from 'rxjs';

function noSoloEspacios(control: AbstractControl) {
  const valor = control.value?.trim();
  return valor ? null : { soloEspacios: true };
}

@Component({
  selector: 'app-formulario-tarea',
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-tarea.html',
  styleUrl: './formulario-tarea.css',
})
export class FormularioTarea implements OnInit, OnDestroy {

  @ViewChild('tituloTarea') inputTitulo!: ElementRef;

  private suscripcion!: Subscription;

  titulo = new FormControl('', [Validators.required, noSoloEspacios]);

  constructor(private tareaServicio: TareaServicio) { }

  ngOnInit(): void {
    this.suscripcion = this.tareaServicio.actualizarFoco.subscribe(() => {
      this.inputTitulo.nativeElement.focus({ preventScroll: true });
    });
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  agregarTarea() {

    if (this.titulo.valid) {
      const esTactil = navigator.maxTouchPoints > 0;
      if (!esTactil) {
        this.inputTitulo.nativeElement.focus({ preventScroll: true });
      }
      this.tareaServicio.agregarTarea((this.titulo.value ?? '').trim());
      this.titulo.reset();
    }
  }
}
