$('.destroy').live('click', function(e) {
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

