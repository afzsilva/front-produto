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

  }
}
