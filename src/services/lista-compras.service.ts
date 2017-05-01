import { Ingrediente } from './../model/ingrediente.model';

export class ListaComprasService {

    private itens: Array<Ingrediente> = new Array<Ingrediente>();

    incluiItem(nome: string, quantidade: number) {

      const index = this.itens.findIndex(item => item.nome == nome);

      if(index >= 0) {
        this.itens[index].quantidade = Number(this.itens[index].quantidade) + Number(quantidade);
      } else {
        this.itens.push(new Ingrediente(nome, quantidade));
      }
    }

    incluiItens(itens: Array<Ingrediente>) {
      for (let ingrediente of itens) {
        this.incluiItem(ingrediente.nome, ingrediente.quantidade);
      }
    }

    getItens() {
        return this.itens.slice();
    }

    removeItem(index: number) {
        this.itens.splice(index, 1);
    }


}
