import { IsInt, IsOptional, Min, MinLength } from "class-validator";

export class ProdutoGet {
    id: number;
    nome: string;
    descricao: string;
    qtdEstoque: number;
    preco: number;
}

export class ProdutoPost {
    @MinLength(1, { message: 'Nome deve ter pelo menos 1 caracter' })
    nome: string;

    @MinLength(0, { message: 'Descrição não pode ser null' })
    descricao: string;

    @Min(0, { message: 'Quantidade não deve ser negativa'})
    qtdEstoque: number;

    @Min(0, { message: 'Valor não deve ser negativa'})
    preco: number;
}

export class ProdutoPut {
    @IsInt({ message: 'Id deve ser inteiro' })
    @Min(1, { message: 'Id deve ser maior ou igual a 1' })
    id: number;

    @IsOptional()
    nome?: string;

    @IsOptional()
    descricao?: string;

    @IsOptional()
    @Min(0, { message: 'Quantidade não deve ser negativa'})
    qtdEstoque?: number;

    @IsOptional()
    @Min(0, { message: 'Valor não deve ser negativa'})
    preco?: number;
}