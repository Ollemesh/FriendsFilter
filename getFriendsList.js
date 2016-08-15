function getFriendsList(callback) {
//	let friendsArray = [];

	new Promise (resolve => {
		document.readyState === 'complete' ? resolve() : window.onload = resolve;
	}).then(() =>{
		return new Promise((resolve, reject) => {
			VK.init({
				apiId: 5570832
			});

			VK.Auth.login(response => {
				response.session ? resolve(response) : reject(new Error('Не удалось авторизоваться'));
			}, 2);
		});
	}).then(() => {
		return new Promise((resolve, reject) => {
			VK.api('users.get', {version: '5.53'}, (response) => {
				if(response.error)
					reject(new Error(response.error.error_msg));
				else {
					resolve();
				}
			});
		})
	}).then(() => {
		return new Promise((resolve, reject) => {
			VK.api('friends.get', {fields: 'photo_100'}, friendsList => {
				if(friendsList.error) 
					reject(new Error(response.error.error_msg));
				else {
					console.log('GET FRIENDS LIST');
					resolve(friendsList);
				}
			})
		});
	}).then((friendsList)=>{
//		friendsArray = friendsList;
		if(callback) callback(friendsList.response);
	}).catch(function(e) {
		alert(`Ошибка: ${e.message}`);
	});
//	return friendsArray;
}