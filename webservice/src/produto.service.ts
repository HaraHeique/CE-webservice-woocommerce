import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { IdNaoEncontrado } from './custom-execeptions';
import { ProdutoGet, ProdutoPost, ProdutoPut } from './produto.model';

@Injectable()
export class ProdutoService {

  constructor(private connection: Connection) {}

  async listarProdutos(): Promise<ProdutoGet[]> {
    const products: ProdutoGet[] = await this.connection.query(
              'SELECT ID AS id, post_title AS nome, post_excerpt AS descricao, min_price AS preco, stock_quantity AS qtdEstoque FROM wp_posts AS p ' + 
              'INNER JOIN wp_wc_product_meta_lookup AS pm ON pm.product_id = p.id ' +
              'WHERE pm.product_id IS NOT NULL'
            );

    products.forEach((x) => {
      x.preco = Number(x.preco);
      x.qtdEstoque = Number(x.qtdEstoque);
    });

    return products;
  }

  async listarProduto(id: number): Promise<ProdutoGet> {
    try {
      const product: ProdutoGet = (await this.connection.query(
        'SELECT ID AS id, post_title AS nome, post_excerpt AS descricao, min_price AS preco, stock_quantity AS qtdEstoque FROM wp_posts AS p ' + 
        'INNER JOIN wp_wc_product_meta_lookup AS pm ON pm.product_id = p.id ' +
        'WHERE id = ' + id
      ))[0];

      product.preco = Number(product.preco);
      product.qtdEstoque = Number(product.qtdEstoque);

      return product;
    } catch (err) {
      throw new IdNaoEncontrado(`Não existe um produto com id = ${id}`);
    }
  }

  async criarProduto(produto: ProdutoPost): Promise<number> {
    return new Promise(async (resolve, reject) => {
      await this.connection.transaction(async transaction => {
        try {
          const response = await transaction.query(
            'INSERT INTO wp_posts (post_title, post_excerpt, post_type) ' +
            `VALUES ('${produto.nome}', '${produto.descricao}', 'product')`
          );
    
          await transaction.query(
            'INSERT INTO wp_wc_product_meta_lookup (product_id, min_price, stock_quantity) ' +
            `VALUES (${response.insertId}, ${produto.preco}, ${produto.qtdEstoque});`
          );

          await transaction.query(
            'INSERT INTO wp_postmeta (post_id, meta_key, meta_value) ' +
            `VALUES (${response.insertId},'_price', ${produto.preco});`
          );

          await transaction.query(
            'INSERT INTO wp_postmeta (post_id, meta_key, meta_value) ' +
            `VALUES (${response.insertId},'_stock', ${produto.qtdEstoque});`
          );


          await transaction.query(
            'INSERT INTO wp_postmeta (post_id, meta_key, meta_value) ' +
            `VALUES (${response.insertId},'_manage_stock', 'yes');`
          );

          resolve(response.insertId);
        } catch (err) {
          reject(err);
        }
      })
    })
    
  }

  async atualizarProduto(produto: ProdutoPut): Promise<void> {
    await this.listarProduto(produto.id);
    await this.connection.transaction(async transaction => {

      if (produto.nome != undefined || produto.descricao != undefined) {
        await transaction.query(
          'UPDATE wp_posts SET ' +
            `${produto.nome != undefined ? `post_title = '${produto.nome}'` : ''} ` + 
            `${produto.nome != undefined && produto.descricao != undefined ? ',' : ''} ` + 
            `${produto.descricao != undefined ? `post_excerpt = '${produto.descricao}'` : ''} ` +
          `WHERE id = ${produto.id};`
        );
      }

      if (produto.preco != undefined || produto.qtdEstoque != undefined) {
        await transaction.query(
          'UPDATE wp_wc_product_meta_lookup SET ' +
            `${produto.preco != undefined ? `min_price = ${produto.preco}` : ''} ` +
            `${produto.preco != undefined && produto.qtdEstoque != undefined ? ',' : ''} ` +
            `${produto.qtdEstoque != undefined ? `stock_quantity = ${produto.qtdEstoque}` : ''} ` +
          `WHERE product_id = ${produto.id};`
        );
      }

      if (produto.preco != undefined) {
        await transaction.query(
          `UPDATE wp_postmeta SET meta_value = ${produto.preco} ` +
          `WHERE post_id = ${produto.id} AND meta_key = '_price'`
        );
      }

      if (produto.qtdEstoque) {
        await transaction.query(
          `UPDATE wp_postmeta SET meta_value = ${produto.qtdEstoque} ` +
          `WHERE post_id = ${produto.id} AND meta_key = '_stock'`
        );
      }
    })
  }

  async deletarProduto(id: number): Promise<void> {
    await this.listarProduto(id);

    await this.connection.transaction(async transaction => {
      await transaction.query(
        `DELETE FROM wp_posts WHERE id = ${id};`
      );

      await transaction.query(
        `DELETE FROM wp_wc_product_meta_lookup WHERE product_id = ${id};`
      );

      await transaction.query(
        `DELETE FROM wp_postmeta WHERE post_id = ${id};`
      );
    })
  }
}
