import { endpoints } from "./routes/produto.route.js";
import { HttpService } from "./http.service.js";

$(document).ready(function () {
  const http = new HttpService();

  init();

  function init() {
    http.get(endpoints.getAllProducts)
      .done(function (data) {
        const dataSet = [];
        data.forEach(function (elem) {
          let normalizedData = Object.values(elem);
          dataSet.push(normalizedData);
        });

        renderDataTable(dataSet);
      })
      .fail(function (jqxhr, textStatus, error) {
        console.error(textStatus);
      });
  }

  function renderDataTable(dataSet) {
    $("#produtos-table").DataTable({
      info: false,
      bLengthChange: true,
      scrollX: true,
      data: dataSet,
      columns: [
        { title: "ID" },
        { title: "Nome" },
        { title: "Descrição" },
        { title: "Qnt. em estoque" },
        { title: "Preço" }
      ],
      oLanguage: {
        sLengthMenu: "_MENU_",
        sEmptyTable: "Sem dados disponíveis na tabela",
        sSearch: "",
        sEmptyTable: "Nenhum registro correspondente encontrado",
        sZeroRecords: "Nenhum registro correspondente encontrado",
        sSearchPlaceholder: "Pesquisar...",
        oPaginate: {
          sFirst: "Primeiro",
          sLast: "Último",
          sNext: "Próximo",
          sPrevious: "Anterior",
        },
      },
      initComplete: function () {
        const tableApi = this.api();

        tableApi.$("tr").click(function () {
          $("#modal-produtos").modal("show");

          const dataRow = tableApi.row(this).data();
          $("#dados-produto").html(`Dados: ${dataRow.join(";")}`);
        });
      },
    });
  }
});
