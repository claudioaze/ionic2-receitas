import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { FormGroup, Validators, FormArray, FormBuilder } from "@angular/forms";

import { Ingrediente } from './../../model/ingrediente.model';
import { Receita } from './../../model/receita.model';
import { MensagemService } from './../../services/mensagem.service';
import { ReceitaService } from './../../services/receita.service';

@Component({
  selector: 'page-edita-receita',
  templateUrl: 'edita-receita.html'
})

export class EditaReceitaPage {

  static NOVA: string = 'Nova';
  static EDITAR: string = 'Editar';

  private index: number;
  private receita: Receita;
  TipoCadastro
  mode = EditaReceitaPage.NOVA;
  niveisDificuldade = ['Fácil', 'Média', 'Difícil'];
  formReceita: FormGroup;

  constructor(public navCtrl: NavController,
      public navParams: NavParams,
      private formBuilder: FormBuilder,
      private actionSheetController:ActionSheetController,
      private alertController:AlertController,
      private receitaService: ReceitaService,
      private mensagemService: MensagemService) {

      this.mode = this.navParams.get('mode');
      if(this.mode == EditaReceitaPage.EDITAR) {
        this.index = this.navParams.get('index');
        this.receita = this.navParams.get('receita');
      }
      this.iniciaForm();
  }

  private iniciaForm() {
    let nome=null;
    let descricao=null;
    let dificuldade = 'Média';
    let ingredientes = [];

    if(this.mode == EditaReceitaPage.EDITAR) {
      nome = this.receita.nome;
      descricao = this.receita.descricao;
      dificuldade = this.receita.dificuldade;

      for (let ingrediente of this.receita.ingredientes) {
        const formGroup = this.criarFormGroupIngredientes(ingrediente.nome, ingrediente.quantidade);
        ingredientes.push(formGroup);
      }
    }

    this.formReceita = this.formBuilder.group({
      nome: [nome, Validators.required],
      descricao: [descricao, Validators.required],
      dificuldade: [dificuldade, Validators.required],
      ingredientes: this.formBuilder.array(ingredientes)
    });
  }

  envia() {
    const value = this.formReceita.value;
    let ingredientes = [];
    
    if (value.ingredientes.length > 0) {
      ingredientes = value.ingredientes.map(ingrediente => {
        return {nome: ingrediente.nome, quantidade: ingrediente.quantidade};
      });
    }

    if(this.mode === EditaReceitaPage.EDITAR) {
      this.receitaService.alteraReceita(this.index, value.nome, value.descricao, value.dificuldade, ingredientes);
    } else {
      this.receitaService.adicionaReceita(value.nome, value.descricao, value.dificuldade, ingredientes);
    }

    this.formReceita.reset();
    this.navCtrl.popToRoot();
  }

  removeIngrediente(index: number) {
    (<FormArray>this.formReceita.get('ingredientes')).removeAt(index);
    this.mensagemService.exibirMensagem('Ingrediente removido');
  }

  editaIngredientes() {
    const actionSheet = this.actionSheetController.create({
      title: 'Escolha uma opção',
      buttons: this.botoesOpcaoIngredientes()
    });
    actionSheet.present();
  }

  private botoesOpcaoIngredientes() {
    return [
        {
          text: 'Adicionar ingrediente',
          handler:() => {
            this.criaAlertaNovoIngrediente().present();
          }
        },
        {
          text: 'Remover todos ingredientes',
          role: 'destructive',
          handler:() => {
            this.formReceita.controls['ingredientes'] = this.formBuilder.array([]);
            this.mensagemService.exibirMensagem('Todos ingrediente foram removidos');
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
  }

  private criaAlertaNovoIngrediente() {
    return this.alertController.create({
      title: 'Adicionar Ingrediente',
      inputs: this.inputsAlertaNovoIngrediente(),
      buttons: this.botoesAlertaNovoIngrediente()
    });
  }

  private inputsAlertaNovoIngrediente() {
    return [
        {
          name: 'nome',
          placeholder: 'Nome'
        },
        {
          name: 'quantidade',
          placeholder: 'Quantidade',
          type: 'number'
        }
      ];
  }

  private botoesAlertaNovoIngrediente() {
    return [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Adicionar',
          role: 'cancel',
          handler: data => {

            if (!this.validarIngrediente(data)) {
              return false;
            }
            this.adicionarIngrediente(data);            
            this.mensagemService.exibirMensagem('Ingrediente adicionado');
          }
        }
      ];
  }

  private validarIngrediente(ingrediente: Ingrediente) {
    if(!ingrediente) {
      return false;
    }

    if(ingrediente.nome == null || ingrediente.nome.trim() == '') {
      this.mensagemService.exibirMensagem('Informe o nome o ingrediente');
      return false;
    }

    if(ingrediente.quantidade == null || ingrediente.quantidade <= 0) {
      this.mensagemService.exibirMensagem('Informe uma quantidade válida');
      return false;
    }

    return true;

  }

  private adicionarIngrediente(data: Ingrediente) {

    const index = this.formReceita.get('ingredientes').value.findIndex(item => item.nome == data.nome);

    if(index >= 0) {      
      const novaQuantidade = Number(this.formReceita.get('ingredientes').value[index].quantidade) + Number(data.quantidade);      
      const formGroupIngredientes: FormGroup = this.criarFormGroupIngredientes(data.nome, novaQuantidade);      
      this.getFormArrayIngredientes().at(index).patchValue(formGroupIngredientes.value);      
    } else {
      const formGroupIngredientes: FormGroup = this.criarFormGroupIngredientes(data.nome, data.quantidade);      
      this.getFormArrayIngredientes().push(formGroupIngredientes);
    }
  }

  private criarFormGroupIngredientes(nome: string, quantidade: number) {
    return this.formBuilder.group({
      nome: [nome, Validators.required],
      quantidade: [quantidade, Validators.required]
    });
  }

  private getFormArrayIngredientes() {
    return <FormArray>this.formReceita.get('ingredientes');
  }
}
