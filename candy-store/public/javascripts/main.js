$(function() {

    /* Candy store */
    var store = [];

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
      //$(productRow).remove();
      var id = $(productRow).data('id');
      console.log(id);
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

    /* Create product Row */
    function createProductRow(candy){

      // Setup template
      var tpl = $('#productRowTpl').html();
      tpl = tpl.replace('{{Id}}', candy.id);
      tpl = tpl.replace('{{Name}}', candy.name);
      tpl = tpl.replace('{{Color}}', candy.color);
      tpl = tpl.replace('{{Price}}', candy.price);

      // Append the row
      $('#cart > div').append(tpl);
    }


    function showCreateForm() {
      $('#editform').modal('show');
      $('#editform').addClass('createForm');
      $('.modal-title').text('Create Candy');
      $('button.submit').text('Create');
    }


    // Show update form */
    function showUpdateForm(candy){
      $('#editform').modal('show');
      $('#editform').addClass('updateForm');

      $('#editform #name').val(candy.name);
      $('#editform #color').val(candy.color);
      $('#editform #price').val(candy.price);
      $('#editform #id').val(candy.id);
    }

    /* Reset modal */
    function resetModal () {
      $('.updateForm #id').val('');
      $('.updateForm #name').val('');
      $('.updateForm #color').val('');
      $('.updateForm #price').val('');
      $('#editform').removeClass('updateForm');
    }

    // Create candy on server
    function createProductAjax(){

      var candy = {};
      candy.id = $('.createForm #id').val();
      candy.name = $('.createForm #name').val();
      candy.color = $('.createForm #color').val();
      candy.price = $('.createForm #price').val();

      $.ajax({
        method: 'POST',
        url: '/api',
        data: candy
      }).done(function(candy){
            createProductRow(candy);
            $('[data-id=' + candy.id + ']').hide();
            $('#editform').modal('hide');
            $('[data-id=' + candy.id + ']').fadeIn();
      });
    }


    // Update candy on server
    function updateProductAjax() {

        var candy = {};
        candy.id = $('.updateForm #id').val();
        candy.name = $('.updateForm #name').val();
        candy.color = $('.updateForm #color').val();
        candy.price = $('.updateForm #price').val();

        $.ajax({
          method: 'PUT',
          url: '/api',
          data: candy
        }).done(function(data){
            resetModal();

            // Setup template
            var tpl = $('#productRowTpl').html();
            tpl = tpl.replace('{{Id}}', candy.id);
            tpl = tpl.replace('{{Name}}', candy.name);
            tpl = tpl.replace('{{Color}}', candy.color);
            tpl = tpl.replace('{{Price}}', candy.price);

            // Hide
            $('#editform').modal('hide');

            $('[data-id=' + candy.id + ']').fadeOut(function(){
              $('[data-id=' + candy.id + ']').replaceWith(tpl);
              $('[data-id=' + candy.id + ']').fadeIn();
            });


        //    $('[data-id=' + candy.id + ']').replaceWith(tpl);
        //    $('[data-id=' + candy.id + ']').fadeIn();
        });
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
      showCreateForm();
    });

    $('#cart').on('click', '.update', function(event){
      var productRow = $(event.target).parents('.product')[0];
      var id = $(productRow).data('id');
      var candy = store.find(function(item){
          return item.id == id;
      })
      showUpdateForm(candy);
    });

    $('body').on('click', '.updateForm .submit', function(){
        updateProductAjax();
    })

    $('body').on('click', '.createForm .submit', function(){
        createProductAjax();
    })


    /* init store */
    $.ajax({
      method: "GET",
      url: "/API"
    })
    .done(function( data ) {
        store = data;
        data.forEach(function(candy){
            createProductRow(candy);
        });
    });

    $('#editform').on('shown.bs.modal', function () {
      $('#name').focus();
    });
});
