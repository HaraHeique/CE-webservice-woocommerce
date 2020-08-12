export class ProdutoGet {
    id: number;
    nome: string;
    descricao: string;
    qtdEstoque: number;
    preco: number;
}

export class ProdutoSave {
    id?: number;
    nome: string;
    descricao: string;
    qtdEstoque: number;
    linkImagem: string;
    preco: number;
}