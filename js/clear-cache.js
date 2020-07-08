function clearCache(name){
	localStorage.removeItem(name);
	const node = document.getElementById("clear");
	node.style.visibility = "hidden";
	alert("Cache has been cleared");
	window.location.reload();
}
