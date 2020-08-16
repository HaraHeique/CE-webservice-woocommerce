import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Stats } from './stats.model';

@Injectable()
export class StatsService {

  constructor(private connection: Connection) {}

  async listarStats(): Promise<Stats> {
    const stats: Stats = (await this.connection.query(
              'SELECT aux.qtd AS totalPedidosVendidos, aux.valor AS valorTotalPedidosVendidos, aux.valor / aux.qtd AS valorMedioPedidosVendidos FROM ' +
              '(SELECT SUM(product_qty) AS qtd, SUM(product_gross_revenue) AS valor FROM wp_wc_order_product_lookup) AS aux' 
            ))[0];

    stats.totalPedidosVendidos = !stats.totalPedidosVendidos ? 0 : stats.totalPedidosVendidos;
    stats.valorMedioPedidosVendidos = !stats.valorMedioPedidosVendidos ? 0 : stats.valorMedioPedidosVendidos;
    stats.valorTotalPedidosVendidos = !stats.valorTotalPedidosVendidos ? 0 : stats.valorTotalPedidosVendidos;

    return stats;
  }
}
