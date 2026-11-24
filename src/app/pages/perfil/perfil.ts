import { Component, inject } from '@angular/core';
import { Auth } from '../../compartidos/auth';

@Component({
  imports: [],
  selector: 'app-perfil',
  styleUrl: './perfil.css',
  templateUrl: './perfil.html',
})
export class Perfil {
  auth = inject(Auth);
}