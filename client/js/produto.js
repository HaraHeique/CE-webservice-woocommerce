import { endpoints } from "./routes/produto.route.js";
import { HttpService } from "./http.service.js";

$(document).ready(function () {
  const http = new HttpService();

  init();

  function init() {
    http
      .get(endpoints.getAllProducts)
      .done(function (data) {
        const dataSet = [];

        data.forEach(function (elem) {
          let normalizedData = dataNormalizedToDataTable(elem);
          dataSet.push(normalizedData);
        });

        renderDataTable(dataSet);
      })
      .fail(function (jqxhr, textStatus, error) {
        console.error(textStatus, jqxhr.responseText);
      })
      .always(function () {
        onClickAddButton();
        setMaskForm();
      });
  }

  function renderDataTable(dataSet) {
    $("#produtos-table").DataTable({
      info: false,
      bLengthChange: true,
      scrollX: true,
      destroy: true,
      data: dataSet,
      columns: [
        { title: "ID" },
        { title: "Nome" },
        { title: "Qnt. em estoque" },
        { title: "Preço (R$)" },
        { title: "Descrição" },
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
        onClickRowTable(this.api());
      },
    });
  }

  function dataNormalizedToDataTable(product) {
    return [
      product.id,
      product.nome,
      product.qtdEstoque ? product.qtdEstoque : "",
      product.preco ? product.preco : "",
      product.descricao ? product.descricao : "",
    ];
  }

  function onClickRowTable(dtApi) {
    dtApi.$("tr").click(function () {
      const dataRow = dtApi.row(this).data();
      const id = dataRow[0];

      http
        .get(endpoints.getProductById.replace("{id}", id))
        .done(function (data) {
          showForm();
          setValuesForm(data);
          setTitleModal(`${data.id} - ${data.nome}`);
          showButtonsModalForm(true);
          onClickUpdateProduct(data.id);
          onClickDeleteProduct(data.id);
        })
        .fail(function (jqxhr, textStatus, error) {
          showToast(false, jqxhr.responseJSON.message);
        });
    });
  }

  function onClickAddButton() {
    $("#add-product").click(function (e) {
      e.preventDefault();
      const titleModal = "Criar Novo Produto";

      clearForm();
      showForm();
      setTitleModal(titleModal);
      showButtonsModalForm(false);
      onClickAddProduct();
    });
  }

  function onClickAddProduct() {
    $("#create-product")
      .unbind()
      .click(function (e) {
        e.preventDefault();

        if (checkFormValidation()) {
          addProductRequest();
          closeForm();
        }
      });
  }

  function onClickUpdateProduct(id) {
    $("#update-product")
      .unbind()
      .click(function (e) {
        e.preventDefault();

        if (checkFormValidation()) {
          updateProductRequest(id);
          closeForm();
        }
      });
  }

  function onClickDeleteProduct(id) {
    $("#delete-product")
      .unbind()
      .click(function (e) {
        e.preventDefault();
        deleteProductRequest(id);
        closeForm();
      });
  }

  function addProductRequest() {
    const productAdd = createObjectFormRequest();

    http
      .post(endpoints.addProduct, JSON.stringify(productAdd))
      .done(function (data) {
        showToast(true, "Produto adicionado com sucesso.");
        init();
      })
      .fail(function (jqxhr, textStatus, error) {
        showToast(false, jqxhr.responseJSON.message);
      });
  }

  function updateProductRequest(id) {
    const productUpdate = createObjectFormRequest();
    productUpdate.id = Number(id);

    http
      .put(endpoints.updateProduct.replace("{id}", id), JSON.stringify(productUpdate))
      .done(function (data) {
        showToast(true, "Produto atualizado com sucesso.");
        init();
      })
      .fail(function (jqxhr, textStatus, error) {
        showToast(false, jqxhr.responseJSON.message);
      });
  }

  function deleteProductRequest(id) {
    http
      .delete(endpoints.deleteProduct.replace("{id}", id))
      .done(function (data) {
        showToast(true, "Produto removido com sucesso.");
        init();
      })
      .fail(function (jqxhr, textStatus, error) {
        showToast(false, jqxhr.responseJSON.message);
      });
  }

  function createObjectFormRequest() {
    const product = {
      nome: $("#form-product #product-name").val(),
      qtdEstoque: Number($("#form-product #product-quantity").val()),
      preco: Number($("#form-product #product-price").val()),
      descricao: $("#form-product #product-description").val()
    };

    return product;
  }

  function addNewRow(product) {
    const dtApi = $("#produtos-table").DataTable();
    const currentData = dataNormalizedToDataTable(product);
    dtApi.row.add(currentData).draw();
  }

  function showForm() {
    $("#form-product").removeClass("was-validated");
    $("#modal-produtos").modal("show");
  }

  function closeForm() {
    $("#modal-produtos").modal("hide");
  }

  function clearForm() {
    $("#form-product")[0].reset();
  }

  function setValuesForm(product) {
    $("#form-product #product-name").val(product.nome);
    $("#form-product #product-quantity").val(product.qtdEstoque);
    $("#form-product #product-price").val(product.preco);
    $("#form-product #product-description").val(product.descricao);
  }

  function setTitleModal(title) {
    $("#modal-produtos .modal-title").text(title);
  }

  function showButtonsModalForm(isUpdate) {
    if (isUpdate) {
      $("#modal-produtos #delete-product").show();
      $("#modal-produtos #update-product").show();
      $("#modal-produtos #create-product").hide();
    } else {
      $("#modal-produtos #delete-product").hide();
      $("#modal-produtos #update-product").hide();
      $("#modal-produtos #create-product").show();
    }
  }

  function showToast(success, message) {
    const options = {
      animation: true,
      autohide: true,
      delay: 5000,
    };

    if (success) {
      $("#toast-header").text("Sucesso");
      $("#product-toast").addClass("success");
      $("#product-toast").removeClass("error");
    } else {
      $("#toast-header").text("Erro");
      $("#product-toast").addClass("error");
      $("#product-toast").removeClass("success");
    }

    $("#toast-message").text(message);
    $(".toast").toast(options);
    $(".toast").toast("show");
  }

  function setMaskForm() {
    $(".mask-int").numeric({
      decimal: false,
    });

    $(".mask-float").numeric({
      decimal: ".",
      altDecimal: ",",
      decimalPlaces: 2,
    });
  }

  function checkFormValidation() {
    const form = document.getElementById("form-product");
    form.classList.add("was-validated");

    return form.checkValidity();
  }
});
