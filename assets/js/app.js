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
	});
}

function getRandomNetflixCategory() {
	console.log(selected);
}

$(document).ready(function () {
	$.ajax({
		type: 'GET',
		contentType: "application/json; charset=utf-8",
		url: "json/data.json",
		dataType: "json",
		success: makeHTML,
		error: function (err) {
			console.error(err);
		}
	});

	$('#filter').keyup(function () {

		var rex = new RegExp($(this).val(), 'i');
		$('.col-md-4#searchable').hide();
		$('.col-md-4#searchable').filter(function () {
			return rex.test($(this).text());
		}).show();

	})
});