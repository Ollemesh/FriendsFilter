var Controller = {
	musicRoute: function() {
		return Model.getMusic().then(function(music) {
			results.innerHTML = View.render('music', {list: music});
		});
	},
	friendsRoute: function() {
		return Model.getFriends().then(function(friends) {
			results.innerHTML = View.render('friends', {list: friends});
		});
	},
	newsRoute: function() {
		return Model.getNews().then(function(news) {
			results.innerHTML = View.render('news', {list: news.items});
		});
	},
	groupsRoute: function() {
		return Model.getGroups().then(function(groups) {
			results.innerHTML = View.render('groups', {list: groups})
		});
	},
	photosRoute: function() {
		return Model.getPhotos().then(function(photos) {
			results.innerHTML = View.render('photos', {list: photos});
		});
	}
};
//-----------------------------------------------


Handlebars.registerHelper('formatTime', function(time) {
	var minutes = parseInt(time / 60),
		seconds = time - minutes * 60;

	minutes = minutes.toString().length === 1 ? '0' + minutes : minutes;
	seconds = seconds.toString().length === 1 ? '0' + seconds : seconds;

	return minutes + ':' + seconds;
});

Handlebars.registerHelper('formatDate', function(ts) {
	return new Date(ts * 1000).toLocaleString();
});

new Promise(function(resolve) {
	window.onload = resolve;
}).then(function() {
	return Model.login(5570832, 2 | 8 | 4 | 8192);
}).then(function() {
	return Model.getUser().then(function(users) {
		header.innerHTML = View.render('header', users[0]);
	});
}).catch(function(e) {
	console.error(e);
	alert('Ошибка: ' + e.message);
});
//----------------------------------------------
var Model = {
	login: function(appId, perms) {
		return new Promise(function(resolve, reject) {
			VK.init({
				apiId: appId,
			});

			VK.Auth.login(function(response) {
				if (response.session) {
					resolve(response);
				} else {
					reject(new Error('Не удалось авторизоваться'));
				}
			}, perms);
		});
	},
	callApi: function(method, params) {
		return new Promise(function(resolve, reject) {
			VK.api(method, params, function(response) {
				if (response.error) {
					reject(new Error(response.error.error_msg));
				} else {
					resolve(response.response);
				}
			});
		});
	},
	getUser: function() {
		return this.callApi('users.get', {});
	},
	getMusic: function() {
		return this.callApi('audio.get', {});
	},
	getFriends: function() {
		return this.callApi('friends.get', {fields: 'photo_100'});
	},
	getNews: function() {
		return this.callApi('newsfeed.get', {filters: 'post', count: 20});
	},
	getGroups: function() {
		return this.callApi('groups.get', {extended: 1});
	},
	getPhotos: function() {
		return this.callApi('photos.get', {album_id: "wall", extended: 1});
	}
};
//----------------------------------------
var Router = {
	handle: function(route) {
		var routeName = route + 'Route';

		/*if (!Controller.hasOwnProperty(routeName)) {
			throw new Error('Маршрут не найден!');
		}*/

		Controller[routeName]();
	}
};
//------------------------------------------
var View = {
	render: function(templateName, model) {
		templateName = templateName + 'Template';

		var templateElement = document.getElementById(templateName),
			templateSource = templateElement.innerHTML,
			renderFn = Handlebars.compile(templateSource);

		return renderFn(model);
	}
};

