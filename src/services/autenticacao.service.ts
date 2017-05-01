import firebase from 'firebase';

export class AutenticacaoService {

    logout() {
        firebase.auth().signOut();
    }

    signin(email: string, senha: string) {
        return firebase.auth().signInWithEmailAndPassword(email, senha);
    }

    registra(email: string, senha: string) {
        return firebase.auth().createUserWithEmailAndPassword(email, senha);
    }

}
