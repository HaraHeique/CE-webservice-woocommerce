$(document).ready(function () {
  $('#produtos-table').DataTable({
    info: false,
    bLengthChange: true,
    data: dataSet,
    columns: [
      { title: "Name" },
      { title: "Position" },
      { title: "Office" },
      { title: "Extn." },
      { title: "Start date" },
      { title: "Salary" },
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

      tableApi.$('tr').click(function () {
        $('#modal-produtos').modal('show');
        
        const dataRow = tableApi.row(this).data();
        $('#dados-produto').html(`Dados: ${dataRow.join(";")}`);
      });
    },
  });
});
