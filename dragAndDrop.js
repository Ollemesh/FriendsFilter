let body = document.querySelector('body');
function startDrag(e) {
	let friendItem = e.target.closest(".friendItem");
	if(!friendItem) return
	friendItem.style.zIndex = '1';
	friendItem.style.position = 'absolute';
	friendItem.dataset.container = friendItem.closest('#leftContainer') ? 'left' : 'right';

	let offsetX = e.clientX - friendItem.getBoundingClientRect().left;
	let offsetY = e.clientY - friendItem.getBoundingClientRect().top;

	e.preventDefault();

	body.addEventListener('mousemove', move);
	body.addEventListener('mouseup', stopDrag);

	//Функция перемещения блока. Определена внутри startDrag, чтобы объект текущего блока хранился в замыкании, и доступ 
	//к нему сохранялся при резком рывке мышкой. 
	function move(e) {
		friendItem.style.left = e.clientX - offsetX + 'px';
		friendItem.style.top = e.clientY - offsetY + 'px';
	};

	//Функция окончания перетаскивания блока. Определена внутри startDrag, чтобы иметь доступ к локальним переменным move и block 
	function stopDrag(e) {
		friendItem.style.zIndex = '0';
		friendItem.style.position = 'static';
		friendItem.style.left = 'auto';
		friendItem.style.top = 'auto';

		if(friendItem.dataset.container === 'left') {
			if(document.elementFromPoint(e.clientX, e.clientY).closest('#rightContainer')) {
				rightSideList.add(leftSideList.getFriendByVkId(friendItem.dataset.vkId));
				leftSideList.remove(friendItem.dataset.vkId);
			}
		} else {
			if(document.elementFromPoint(e.clientX, e.clientY).closest('#leftContainer')) {
				leftSideList.add(rightSideList.getFriendByVkId(friendItem.dataset.vkId));
				rightSideList.remove(friendItem.dataset.vkId);
			}
		}
		body.removeEventListener('mousemove', move);
		body.removeEventListener('mouseup', stopDrag);
	};
};
