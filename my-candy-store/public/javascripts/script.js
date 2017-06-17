$(function() {

    /* Update Subtotal */
    function updateSubTotal(productRow){
        var qtr = $(productRow).find('input').first().val();
        var priceTxt = $(productRow).find('.price').first().text();

        // Clean price
        priceTxt = priceTxt.trim();
        priceTxt = priceTxt.replace('$','');
        var price = parseFloat(priceTxt);

        /* Update subtotal */
        var subtotal = $(productRow).find('.subtotal').first();
        var totalPrice = qtr * price;
        subtotal.text('$' + totalPrice.toFixed(2));
    }

    /* Delete product */
    function deleteProduct(productRow){
      $(productRow).remove();
    }

    /* Create product */
    function createProduct(){
          var name = $("input[name='name']").val();
          var price = $("input[name='price']").val();

          // Check input
          if(name.length === 0 ){
            $('.create .name .form-group').addClass('has-error');
            return;
          }
          $('.create .name .form-group').removeClass('has-error');

          if(price.length === 0 || price === "0"){
            $('.create .price .form-group').addClass('has-error');
            return;
          }
          $('.create .price .form-group').removeClass('has-error');

          // Setup template
          var tpl = $('#productRowTpl').html();
          tpl = tpl.replace('{{Name}}', name);
          tpl = tpl.replace('{{Price}}', price);

          // Append the row
          $('#cart > div').append(tpl);

          // Clear inputs
          $("input[name='name']").val('');
          $("input[name='price']").val('');
    }

    /* Calculate grand total */
    function calculateGrandTotal(){
      var subtotalElements = $('.subtotal');
      var total = 0;

      subtotalElements.each(function( index ) {
        // Clean price
        var subtotalTxt = $(this).text();
        subtotalTxt = subtotalTxt.trim();
        subtotalTxt = subtotalTxt.replace('$','');
        var subtotal = parseFloat(subtotalTxt);
        total += subtotal;
      });

      //Update
      $('#grandTotal').text(total.toFixed(2));
    }



    /* Attach event listeners */
    $('#cart').on('keyup', '*', function(event){
        var productRow = $(event.target).parents('.product')[0];
        updateSubTotal(productRow);
        calculateGrandTotal();
    });

    $('#cart').on('click', '.delete', function(event){
      var productRow = $(event.target).parents('.product')[0];
      deleteProduct(productRow);
      calculateGrandTotal();
    });

    $('.create').on('click', '.createProduct', function(event){
      createProduct();
    });



});
