import { Directive, inject, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Auth } from '../compartidos/auth';

@Directive({
  selector: '[appSoloAdmin]',
})
export class SoloAdmin implements OnInit {
  private template = inject(TemplateRef);
  private contenedor = inject(ViewContainerRef);
  private auth = inject(Auth);

  ngOnInit() {
    if (this.auth.perfil()?.rol === 'admin') {
      this.contenedor.createEmbeddedView(this.template);
    } else {
      this.contenedor.clear();
    }
  }
}