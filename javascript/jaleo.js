$(".more").on("click", function(e){
	alert("hola perro");
});

$("#gender, #new, #type").on("change", function(e) {
	updateResults();
});

function updateResults() {
	type = $("#type").val();
	gender = $("#gender").val();
	newValue = $("#new").is(':checked');
	$('.catalogue .row > li').each(function() {
		$(this).show();
		// Recorremos todas las películas y si su atributo data-gender no coincide con el que hemos puesto en el select, la oculta.
		if (type != 0 && $(this).attr('data-type') != type) {
			$(this).hide();
		}
		// Recorremos todas las películas y si su atributo data-gender no coincide con el que hemos puesto en el select, la oculta.
		if (gender != 0 && $(this).attr('data-gender') != gender) {
			$(this).hide();
		}
		// Recorremos todas las películas y si está marcado el checbox de novedades y su atributo data-new no es 1, la oculta.
		if (newValue && $(this).attr('data-new') != 1) {
			$(this).hide();
		}
	});

	// Para que aparezca un mensaje informativo
	// Si no hay resultados, mostramos el p de que no los hay, y si hay resultados, lo ocultamos.
	if ($('.catalogue .row > li:visible').length < 1) {
		$('.catalogue .row .no_results').show();
	} else {
		$('.catalogue .row .no_results').hide();
	}

	// Otra forma de hacerlo (quitando en el css el display none)
	/*if ($('.catalogue .row > li:visible').length < 1) {
		$('.catalogue .row .no_results').html('No se encontraron resultados');
	} else {
		$('.catalogue .row .no_results').html('');
	}*/
}
// Cuando se envía el formulario de login...
$('#login').on("submit", function(e) {
	// Si los campos no tienen nada, salta el mensaje de error
	if ($('#name').val().length < 1 || $('#email').val().length < 1 || $('#password').val().length < 1 || $('#creditcardnumber').val().length < 1 || $('#caducity:selected').val() == 0|| $('#year:selected').val() == 0) {
		e.preventDefault();
		sweetAlert('Error', 'Todos los campos son obligatorios', "error");
	} else {
		if (!$.payment.validateCardNumber($('#creditcardnumber').val())) {
			e.preventDefault();
			sweetAlert('Error', 'Número de tarjeta incorrecto', "error");
		}
	}
});

$('#creditcardnumber').on('keyup', function() {
	type = $.payment.cardType($(this).val());
	if (type != null) {
		sweetAlert('Tipo de tarjeta', type, "success");
	}
});

$('#creditcardnumber').payment('formatCardNumber');
$('#cvv').payment('formatCardCVC');