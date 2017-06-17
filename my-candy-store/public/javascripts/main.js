$(function () {

let productIdCount = 0;
let deleteCount = 0;

  $.ajax({
    method: 'GET',
    url: '/api',
  }).done(function (data) {
    getInventory(data);
    console.log(data);
  }).fail(function () {
    console.log('error getting product information, please try again');
  }).always(function () {
    console.log('get always');
  });


  function getInventory(data) {

     for(var i=0;i<data.length;i++) {
       let name = data[i].name;
       let price = data[i].price;
       let id = data[i].id;

      // Setup template
      var tpl = $('#productRowTpl').html();
      tpl = tpl.replace('{{Name}}', name);
      tpl = tpl.replace('{{Price}}', price);
      tpl = tpl.replace('{{Id}}', id);
      $('#cart > div').append(tpl);
  }
  productIdCount = data.length;
}

  function createProduct(){

          let name = $("input[name='name']").val();
          let price = $("input[name='price']").val();
          let id = 0;
          if(deleteCount > 1) {
            id = productIdCount + deleteCount;
            deleteCount = 0;
          }
          else{
            id = productIdCount + 1;
            deleteCount = 0;
          }
          // Setup template
          var tpl = $('#productRowTpl').html();
          tpl = tpl.replace('{{Name}}', name);
          tpl = tpl.replace('{{Price}}', price);
          tpl = tpl.replace('{{Id}}', id);

          // Clear inputs
          $("input[name='name']").val('');
          $("input[name='price']").val('');

    $.ajax({
      method: 'POST',
      url: '/api',
      data: {
        name: name,
        price: price,
        id: id
      }
    }).done(function (data) {
       console.log('data appended successfully!');
    }).fail(function () {
      console.log('error creating, please try again');
    }).always(function () {
      console.log('post always');
    });

    $('#cart > div').append(tpl);
  }

  function deleteProduct(productRow, productId){

      $.ajax({
        method: 'DELETE',
        url: '/api/' + productId
      }).done(function(data) {
         console.log("item deleted successfully!")
      }).fail(function () {
        console.log('error deleting product, please try again');
      }).always(function () {
        console.log('delete always');
      });

      $(productRow).remove();
      productIdCount--;
      deleteCount++;
    }

$('#createButton').on('click', createProduct);

$('#cart').on('click', '.delete', function(event){
    var productRow = $(event.target).parents('.product')[0];
    var productId = $(event.target).parents('.product').children('.id').text();
    deleteProduct(productRow, productId);
  });
});
