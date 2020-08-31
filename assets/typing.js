let i = 0;
let txt = document.getElementById("typing-desc").innerHTML;
let speed = 75;

document.getElementById("typing-desc").innerHTML = "";
function typeWriter() {
	if (i < txt.length+1) {
		document.getElementById("typing-desc").innerHTML += txt.charAt(i);
		i++;
		setTimeout(typeWriter, speed);
	}
	if (i === txt.length+1) {
		document.getElementById("typing-desc").innerHTML = "";
		i = 0;
	}
}

typeWriter();