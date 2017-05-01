import { Ingrediente } from './../model/ingrediente.model';
import { Receita } from './../model/receita.model';

export class ReceitaService {

  private receitas: Array<Receita> = new Array<Receita>();

  adicionaReceita(nome: string, descricao: string, dificuldade: string, ingredientes: Array<Ingrediente>) {
    this.receitas.push(new Receita(nome, descricao, dificuldade, ingredientes));
  }

  getReceitas() {
    return this.receitas.slice();
  }

  alteraReceita(index: number, nome: string, descricao: string, dificuldade: string, ingredientes: Array<Ingrediente>) {
    this.receitas[index] = new Receita(nome, descricao, dificuldade, ingredientes);
  }

  removeReceita(index: number) {
    this.receitas.splice(index, 1);
  }
}
