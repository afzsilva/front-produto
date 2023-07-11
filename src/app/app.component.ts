import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProdutoService } from './services/produto.service';
import { Produto } from './model/produto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  produtos: Produto[] = [];

  produtoForm = this.fb.group({
    id: [],
    nome: [null, Validators.required],
    descricao: [null],
    preco: [null, Validators.required]
  })


  constructor(private fb:FormBuilder,private service:ProdutoService){
      this.buscarProdutos();
  }

  buscarProdutos() {
    this.service.buscarTodos().subscribe(
     {
       next: (res) => {
        this.produtos = res;
       },
       error: (error) => {
        console.error(error);
       },
       complete: () => console.log('lista de produtos', this.produtos)
     }
    )
  }

  criarProduto(): Produto {
    return {
      id: Number(this.produtoForm.get('id')?.value),
      nome: String(this.produtoForm.get('nome')?.value),
      descricao: String(this.produtoForm.get('descricao')?.value),
      valor: Number(this.produtoForm.get('preco')?.value)
    }
  }


  salvar() {
    if (this.produtoForm.valid) {
      const produto = this.criarProduto();
      this.service.salvar(produto).subscribe(
        {
          next: (res) => {
            this.produtoForm.reset();
            this.buscarProdutos();
            alert("Produto salvo com sucesso");
          },
          error: (error) => {
            console.log(error);
          },
          complete: () => console.log('produto salvo')
        }
      )
    }
  }

  remover(produto: Produto) {
    const confirmacao = confirm("Quer realmente excluir esse produto?");
    if (confirmacao) {
      this.service.remover(produto.id).subscribe({
        next: () => {
          this.buscarProdutos();
          alert("Produto removido com sucesso");
        }
      })
    }
  }

}


