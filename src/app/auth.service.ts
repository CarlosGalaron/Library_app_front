import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User, UserCredential } from '@angular/fire/auth';
import { UserService } from './user.service';
import { firstValueFrom } from 'rxjs'; // Importamos firstValueFrom para convertir Observable a Promise

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth, private userService: UserService) {}

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password).then(userCredential => {
      this.storeUserToken(userCredential.user);  // Guarda el token en localStorage después de iniciar sesión
      return userCredential;
    });
  }

  register(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Guarda el token en localStorage
        this.storeUserToken(userCredential.user);

        // Crea un nuevo usuario en la base de datos local
        const newUser = {
          firebaseUid: userCredential.user.uid,
          email: userCredential.user.email || email, // Usa el email de Firebase o el proporcionado
        };

        // Guarda el usuario en la base de datos local
        return firstValueFrom(this.userService.saveUser(newUser)).then(() => userCredential); // Convertimos Observable a Promise
      });
  }

  logout() {
    signOut(this.auth).then(() => {
      this.removeUserToken();  // Elimina el token cuando el usuario cierra sesión
    });
  }

  async getFirebaseUid(): Promise<string> {
    const user = this.auth.currentUser;
    if (user) {
      return user.uid;
    } else {
      throw new Error('Usuario no autenticado');
    }
  }

  async getIdToken(): Promise<string> {
    const user = this.auth.currentUser;
    if (user) {
      return await user.getIdToken();
    } else {
      throw new Error('Usuario no autenticado');
    }
  }

  private async storeUserToken(user: User) {
    const token = await user.getIdToken();
    localStorage.setItem('firebase_token', token);  // Guarda el token en localStorage
  }

  private removeUserToken() {
    localStorage.removeItem('firebase_token');  // Elimina el token al hacer logout
  }
}