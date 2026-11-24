export function traducirError(codigo: string): string {
  switch (codigo) {
    case 'invalid_credentials':
      return 'Correo o contraseña incorrectos.';
    case 'user_already_exists':
    case 'email_exists':
      return 'Ese correo ya tiene una cuenta. Ingresá desde "Ingresar".';
    default:
      return 'Algo salió mal. Probá de nuevo.';
  }
}