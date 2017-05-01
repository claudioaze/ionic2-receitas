import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Receita } from './../../model/receita.model';
import { ListaComprasService } from './../../services/lista-compras.service';
import { EditaReceitaPage } from "../edita-receita/edita-receita";
import { ReceitaService } from './../../services/receita.service';
import { MensagemService } from './../../services/mensagem.service';

@Component({
  selector: 'page-receita',
  templateUrl: 'receita.html'
})
export class ReceitaPage implements OnInit {

  receita: Receita;
  index: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertController: AlertController,
              private listaComprasService: ListaComprasService,
              private receitaService: ReceitaService,
              private mensagemService: MensagemService ) {

              }

  ngOnInit(): void {
      this.receita = this.navParams.get('receita');
      this.index = this.navParams.get('index');
  }

  alteraReceita() {
    this.navCtrl.push(EditaReceitaPage, {mode: EditaReceitaPage.EDITAR, receita: this.receita, index: this.index})
  }

  confirmaRemocao() {
    let alert = this.alertController.create({
      title: 'Remover',
      message: 'Tem certeza que deseja remover esta receita?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.removeReceita();
            this.mensagemService.exibirMensagem('Receita removida com sucesso!');
          }
        }
      ]
    });
    alert.present();
  }

  removeReceita() {
    this.receitaService.removeReceita(this.index);
    this.navCtrl.popToRoot();
  }

  adicionaIngredientes() {
    this.listaComprasService.incluiItens(this.receita.ingredientes);
    this.mensagemService.exibirMensagem('Ingredientes adicionados à lista de compras');
  }


}
