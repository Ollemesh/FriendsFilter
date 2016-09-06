ymaps.ready(init);

let myMap;

function init() {

//Инициализация переменных

	myMap = new ymaps.Map("map", {
								center: [59.95, 30.33],
								zoom: 11
							});

	let body = document.getElementsByTagName('body')[0];
	let placemarks = [];

	let myClusterer = new ymaps.Clusterer({clusterDisableClickZoom: true});
	myMap.geoObjects.add(myClusterer);

	let popUp = document.createElement('div');
	popUp.innerHTML = '\
			<div class="balloon-container">\
				<div id="closePopUp" style="float: right">X</div>\
				<div id="address" style="float: left; cursor: pointer;"></div>\
				</br><div id="reviews">Пока нет отзывов...</div></br>\
				<input type="text" class="field" id="name" placeholder="name">\
				<input type="text" class="field" id="place" placeholder="place">\
				<input type="text" class="field" id="comment" placeholder="comment">\
				<button id="submit">submit</button>\
			</div>'
	popUp.style.cssText = "\
		position: absolute;\
		border: 1px solid black;\
		background-color: white;\
		width: 175px;\
		min-height: 100px;\
		";

	let markerCoords, name, place, comment;

//Инициализация функций

	function showForm(e) {

		markerCoords = e.get('coords')

		popUp.style.top = e.get('clientY') + 'px';
		popUp.style.left = e.get('clientX') + 'px';
		body.appendChild(popUp);
		showAddress(markerCoords);

		name = document.getElementById('name');
		place = document.getElementById('place');
		comment = document.getElementById('comment');

		document.getElementById('submit').addEventListener('click', setMarker);
		document.getElementById('closePopUp').addEventListener('click', closePopUp);
	};

	function setMarker(e) {

		let myPlacemark = new ymaps.Placemark(markerCoords, {
			hintContent: 'HINT',
			balloonContent: popUp.innerHTML
		});

		myMap.geoObjects.add(myPlacemark);

		//myPlacemark.reviews.push = {name:, place:, comment:}

		placemarks.push(myPlacemark);
		myClusterer.add(placemarks)
	};

	function showAddress(coords) {
		ymaps.geocode([coords[0], coords[1]], {results: 1}).then( (res) => {
			document.getElementById('address').innerHTML = res.geoObjects.get(0).properties.get('text');
		},
		(rej) => {
			document.getElementById('address').innerHTML = 'Address does not found'
		})
	};

	function closePopUp() {
		document.getElementById('submit').removeEventListener('click', setMarker);
		body.removeChild(popUp);
	}

	function save(){}

//Вешаем обработчики

	myMap.events.add('click', showForm);
};
