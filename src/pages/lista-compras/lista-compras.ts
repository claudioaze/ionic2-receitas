import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";

import { ListaComprasService } from './../../services/lista-compras.service';
import { Ingrediente } from './../../model/ingrediente.model';

@Component({
  selector: 'page-lista-compras',
  templateUrl: 'lista-compras.html'
})
export class ListaComprasPage {

  listaItens : Array<Ingrediente>;

  constructor(private listaComprasService: ListaComprasService) {}

  ionViewWillEnter() {
    this.carregaItens();
  }

  incluiItem(form: NgForm) {
    this.listaComprasService.incluiItem(form.value.nomeIngrediente, form.value.qtdeIngrediente);
    this.carregaItens();
    form.reset();
  }

  removerItem(index: number) {
    this.listaComprasService.removeItem(index);
    this.carregaItens();
  }

  carregaItens() {
    this.listaItens = this.listaComprasService.getItens();
  }

}
