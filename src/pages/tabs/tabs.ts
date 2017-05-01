import { Component } from '@angular/core';
import { ListaComprasPage } from "../lista-compras/lista-compras";
import { ReceitasPage } from "../receitas/receitas";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  listaComprasPage = ListaComprasPage;
  receitasPage = ReceitasPage;

}
