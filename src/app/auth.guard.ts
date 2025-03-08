// src/app/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from './auth.service'; // Asegúrate de tener el servicio de Auth

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  try {
    const token = await authService.getIdToken(); // Esperamos el token
    if (token) {
      return true; // Permitir acceso si el usuario tiene un token válido
    }
  } catch (error) {
    console.error('Error al obtener token:', error);
  }

  router.navigate(['/login']);
  return false;
};

