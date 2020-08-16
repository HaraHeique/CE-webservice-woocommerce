import { Body, Controller, Delete, Get, HttpException, Param, Post, Put } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoGet, ProdutoPost, ProdutoPut } from './produto.model';
import { ServiceException } from './custom-execeptions';

@Controller("/produto")
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get()
  async listarProdutos(): Promise<ProdutoGet[]> {
    return await this.produtoService.listarProdutos();
  }

  @Get(':id')
  async listarProduto(@Param('id') id: number): Promise<ProdutoGet> {
    try {
      return await this.produtoService.listarProduto(id);
    } catch (err) {
      if (err instanceof ServiceException) throw new HttpException(err.message, 400);
    }
  }

  @Post()
  async criarProduto(@Body() produto: ProdutoPost): Promise<{url: string}> {
    try {
      const id = await this.produtoService.criarProduto(produto);
      return { url: `http://localhost:3000/produto/${id}`}
    } catch (err) {
      throw new HttpException(err.message, 500);
    }
  }

  @Put(':id')
  async atualizarProduto(@Param('id') id: number, @Body() produto: ProdutoPut): Promise<number> {
    if (!produto.id || produto.id !== id) {
      throw new HttpException('Objeto não possui id válido!', 400);
    }

    try {
      await this.produtoService.atualizarProduto(produto);
      return id;
    } catch (err) {
      if (err instanceof ServiceException) throw new HttpException(err.message, 400);
    }
  }

  @Delete(':id')
  async deletarProduto(@Param('id') id: number): Promise<number>{
    try {
      await this.produtoService.deletarProduto(id);
      return id;
    } catch (err) {
      if (err instanceof ServiceException) throw new HttpException(err.message, 400);
    }
  }
}
