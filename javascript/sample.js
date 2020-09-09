var menu = document.getElementById("menu");
var btns = menu.getElementsByClassName("btn");
var content = document.getElementById("content");

for (var i = 0; i < btns.length; i++) {
	btns[i].addEventListener("click", function() {
		var current = document.getElementsByClassName("active");
		current[0].className = current[0].className.replace(" active", "");
		this.className += " active";
		content.innerHTML = document.getElementById(this.id + "-text").innerHTML;
	});
}