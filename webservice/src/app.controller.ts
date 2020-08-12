import { Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { ProdutoGet, ProdutoSave } from './produto.model';

@Controller("/produto")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async listarProdutos(): Promise<ProdutoGet[]> {
    return await this.appService.listarProdutos();
  }

  @Get(':id')
  async listarProduto(@Param('id', ParseIntPipe) id: number): Promise<ProdutoGet> {
    return await this.appService.listarProduto(id);
  }


  @Post()
  async criarProduto(@Body() produto: ProdutoSave): Promise<{url: string}> {
    const id = await this.appService.criarProduto(produto);
    return { url: `http://localhost:3000/produto/${id}`}
  }

  @Put(':id')
  async atualizarProduto(@Param('id', ParseIntPipe) id: number, @Body() produto: ProdutoSave): Promise<void> {
    if (!produto.id || produto.id !== id) {
      throw new HttpException('Objeto não possui id válido!', 400);
    }

    await this.appService.atualizarProduto(produto);
  }

  @Delete(':id')
  async deletarProduto(@Param('id', ParseIntPipe) id: number): Promise<void>{
    await this.appService.deletarProduto(id);
  }
}
