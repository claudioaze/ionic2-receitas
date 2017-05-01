import { ToastController } from 'ionic-angular';
import { Inject } from '@angular/core';


export class MensagemService {

  constructor(@Inject(ToastController) private toastController) {}

  public exibirMensagem(mensagem: string) {
    const toast = this.toastController.create({
      message: mensagem,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

}
