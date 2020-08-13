import { Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
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
  async listarProduto(@Param('id', ParseIntPipe) id: number): Promise<ProdutoGet> {
    try {
      return await this.produtoService.listarProduto(id);
    } catch (err) {
      if (err instanceof ServiceException) throw new HttpException(err.message, 400);
    }
  }


  @Post()
  async criarProduto(@Body() produto: ProdutoPost): Promise<{url: string}> {
    const id = await this.produtoService.criarProduto(produto);
    return { url: `http://localhost:3000/produto/${id}`}
  }

  @Put(':id')
  async atualizarProduto(@Param('id') id: number, @Body() produto: ProdutoPut): Promise<void> {
    if (!produto.id || produto.id !== id) {
      throw new HttpException('Objeto não possui id válido!', 400);
    }

    try {
      await this.produtoService.atualizarProduto(produto);
    } catch (err) {
      if (err instanceof ServiceException) throw new HttpException(err.message, 400);
    }
  }

  @Delete(':id')
  async deletarProduto(@Param('id') id: number): Promise<void>{
    try {
      await this.produtoService.deletarProduto(id);
    } catch (err) {
      if (err instanceof ServiceException) throw new HttpException(err.message, 400);
    }
  }
}
