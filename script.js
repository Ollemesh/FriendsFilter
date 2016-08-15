let leftSideList, rightSideList;

//Обработчик
body.addEventListener('mousedown', startDrag);



//Получаем список друзей с сервера VK
new Promise(require => {
	getFriendsList(require);
}).then((friendsList) => {

	rightSideList = new List(getSavedFriendsElements(), rightContainer);
	leftSideList = new List(friendsList, leftContainer);

	if(rightSideList.elements.length) {
		leftSideList.considerSavedList(rightSideList);
		rightSideList.renderListOnPage();
	}

	leftSideList.renderListOnPage();

	leftContainer.addEventListener('click', (e) => {
		if(e.target.dataset.button){
			let friendItem = e.target.closest('li');
			rightSideList.add(leftSideList.getFriendByVkId(friendItem.dataset.vkId));
			leftSideList.remove(friendItem.dataset.vkId);
		}
	});

	rightContainer.addEventListener('click', (e) => {
		if(e.target.dataset.button){
			let friendItem = e.target.closest('li');
			leftSideList.add(rightSideList.getFriendByVkId(friendItem.dataset.vkId));
			rightSideList.remove(friendItem.dataset.vkId);
		}
	});

	leftSearchField.addEventListener('keyup', leftSideList.showSuitableFriends.bind(leftSideList));
	rightSearchField.addEventListener('keyup', rightSideList.showSuitableFriends.bind(rightSideList));
	save.addEventListener('click', saveFriendsList.bind(rightSideList));
});



