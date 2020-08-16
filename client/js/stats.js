import { endpoints } from './routes/stats.route.js';
import { HttpService } from './services/http.service.js';

$(document).ready(function () {
  const http = new HttpService();

  init();

  function init() {
    onClickBtnStatsProducts();
  }

  function onClickBtnStatsProducts() {
    $("#show-stats")
      .unbind()
      .click(function (e) {
        e.preventDefault();
        showChart();
      });
  }

  function showChart() {
    $("#modal-stats").modal("show");

    http
      .get(endpoints.getStatsProducts)
      .done(function (data) {
        plotChart(data);
      })
      .fail(function (jqxhr, textStatus, error) {
        console.error(textStatus, jqxhr.responseJSON.message);
      });
  }

  function plotChart(data) {
    Highcharts.chart('stats-product-chart', {
      chart: {
        type: "column"
      },
      title: {
        text: ""
      },
      subtitle: {
        text: ""
      },
      xAxis: {
        categories: [
          "Atual"
        ],
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: ""
        }
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      tooltip: {
        shared: true
      },
      series: [{
        name: "Total de Pedidos Vendidos (uni)",
        data: [data.totalPedidosVendidos]
      }, {
        name: "Valor Total de Pedidos Vendidos (R$)",
        data: [data.valorTotalPedidosVendidos]
      }, {
        name: "Valor Médio de Pedidos Vendidos (R$)",
        data: [data.valorMedioPedidosVendidos]
      }]
    });
  }
});