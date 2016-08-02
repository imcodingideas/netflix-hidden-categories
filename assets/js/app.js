/**
 * Created by joseph on 6/11/16.
 */

function makeHTML(data) {

	$(data.category).each(function (i) {

		let id = data.category[i].id;
		let title = data.category[i].title;

		let createButton = `
					<div class="col-md-4" id="searchable">
						<button type="button" class="btn btn-default">
							<a href="https://www.netflix.com/browse/genre/${id}" 
							target="_blank">${title}</a>
						</button>
					</div>
					`;

		document.getElementById('table').innerHTML += createButton;
		// $('table').prepend('Hello world');
		console.log($('table').html('Hello world'));
	});
}

function getRandomNetflixCategory(data) {

	$(data.category).each(function (i) {

		let randomCategory = data.category[data.category[i].id.toString().length];

		let createModal = `
			<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							<h4 class="modal-title" id="myModalLabel">Congratulations!</h4>
						</div>
						<div class="modal-body">
							<p>Look what we found! Would you like to watch: <a href="https://www.netflix.com/browse/genre/${randomCategory.id}"
							target="_blank">${randomCategory.title}</a> today?</p>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
			</div>
			`;

		document.getElementById('table').innerHTML += createModal;
	});
}

function fetchAll(data) {
	makeHTML(data);
	getRandomNetflixCategory(data);
}

$(document).ready(function () {
	$.ajax({
		type: 'GET',
		contentType: "application/json; charset=utf-8",
		url: "json/data.json",
		dataType: "json",
		success: fetchAll,
		error: function (err) {
			console.error(err);
		}
	});

	$('#filter').keyup(function () {

		let rex = new RegExp($(this).val(), 'i');
		$('.col-md-4#searchable').hide();
		$('.col-md-4#searchable').filter(function () {
			return rex.test($(this).text());
		}).show();

	})
});