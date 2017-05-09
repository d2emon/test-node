(function() {
  $.fn.itemID = function() {
    try {
      var items = $(this).attr('id').split('-');
      return items[items.length - 1];
    } catch(exception) {
      return null;
    }
  };

  $.put = function(url, data, success) {
    url += '?_method=PUT';
    $.post(url, data, success, 'json');
  };

  $('#document-list a').on('click', function(e) {
    var li = $(this);

    $.get(this.href + '.json', function(data) {
	$('#document-list .selected').removeClass('selected');
	li.addClass('selected');
	$('#editor').val(data.data);
	$('#editor').focus();
    });

    e.preventDefault();
  });

  $('#header li a').on('click', '.destroy', function(e) {
    e.preventDefault();
    if (confirm('Are you sure want to delete this item?')) {
      var element = $(this)
      var form = $('<form></form>');
      $(document.body).append(form);
      form
        .attr({
          method: 'POST',
	  action: element.attr('href') + '?_method=DELETE'
        })
        .submit();
    }
  });

  $('#save-button').on('click', function(e) {
    var id = $('#document-list .selected').itemID();
    var params = {
      document: {
        data: $('#editor').val(),
        id: id
      }
    };

    $.put('/documents/' + id + '.json', params, function(data) {
	//
    });
  });
})();

