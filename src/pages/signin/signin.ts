import { Validacao } from './../../validacao/validacao';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

import { AutenticacaoService } from "../../services/autenticacao.service";

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private autenticacaoService: AutenticacaoService) {

      this.criarForm();
  }

  public criarForm() {

    this.form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validacao.email()])],
      senha: ['', Validators.required]      
    });
    
  }

  signin() {
    const loading = this.loadingCtrl.create({
      content: 'Fazendo o login'
    });
    loading.present();

    this.autenticacaoService.signin(this.form.value.email, this.form.value.senha)
      .then(data => {
        loading.dismiss();
      })
      .catch(error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Falha no login',
          message: 'Usuário e/ou Senha incorretos',
          buttons: ['Ok']
        });
        alert.present();
      });
  }

}
