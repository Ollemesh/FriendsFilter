//Объявляем класс List

function List(elements, container) {
	this.elements = this.showingElements = elements || [];
	this.container = container;
	this.searchField;
}

List.prototype.considerSavedList = function(savedList) {
	savedList.elements.forEach((friend) => {
		this.removeElement(friend.user_id); 
	})
};

List.prototype.renderListOnPage = function() {
	this.renderElementsOnPage(this.showingElements);
};

List.prototype.add = function(friendElement) {
	this.elements.push(friendElement);
	this.renderElementsOnPage([friendElement]);
};

List.prototype.remove = function(friendsVkId) {
	this.container.removeChild(this.container.querySelector(`[data-vk-id="${friendsVkId}"]`));
	this.removeElement(friendsVkId);
};

List.prototype.removeElement = function(friendsVkId) {
	let index;
	this.elements.forEach((element, i) => {
		if (element.user_id === friendsVkId) index = i;
	})
	this.elements.splice(index, 1);
};

List.prototype.getFriendByVkId = function(vkId) {
	return this.elements.filter((friend) => friend.user_id === parseInt(vkId))[0];
};

List.prototype.renderElementsOnPage = function(elementsArray) {
	let source = friendPostTemplate.innerHTML;
	let tamplateFn = Handlebars.compile(source);
	let tamplate = tamplateFn({list: elementsArray});
	this.container.innerHTML += tamplate;
};

List.prototype.showSuitableFriends = function(e) {
	searchFieldValue = e.target.value;
	this.showingElements = this.elements.filter(this.isSuitable);
	this.container.innerHTML = '';
	this.renderListOnPage();
};

List.prototype.isSuitable = function(friend, index, arr) {
	let searchWord = this.searchFieldValue.toLowerCase();
	for(let i = 0; i < searchWord.length; i++) {
		if (searchWord[i] === (friend.first_name+' '+friend.last_name)[i].toLowerCase()) continue;
		else return false;
	}
	return true;
};

