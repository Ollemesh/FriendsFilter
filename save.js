function getSavedFriendsElements() {
	if(localStorage.friendsList)
		return JSON.parse(localStorage.friendsList).elements;
	else return [];
}

function saveFriendsList() {
	localStorage.friendsList = JSON.stringify(this);
}