const getCookie = (name) => {
	var cookies = document.cookie.split("; ");
	for (var i = 0; i < cookies.length; i++) {
		var cookie = cookies[i].split("=");
		if (cookie[0] === name) {
			return cookie[1];
		}
	}
	return "";
};

const timesJSON = getCookie("timesJSON");
const timesDict = JSON.parse(decodeURIComponent(timesJSON));

const buttonField = document.querySelector("#button-field");

const selection = Object.keys(timesDict).reduce((acc, key) => {
	acc[key] = false;
	return acc;
}, {});

const update = (key) => {
	/**
	 * @type {HTMLButtonElement}
	 */
	const button = document.getElementById(key);

	if (!button) return;

    button.classList.toggle("active");
};

const switchSelection = (key) => {
	selection[key] = !selection[key];
	update(key);
};

Object.keys(timesDict).forEach((key) => {
	const span = document.createElement("span");
	span.textContent = `${timesDict[key]}`;

	const button = document.createElement("button");
	button.id = key;
	button.onclick = () => {
		switchSelection(key);
	};

	button.appendChild(span);
	buttonField.appendChild(button);
});

const start = () => {
    
    const params = Object.entries(selection)
    .filter(([ key, value ]) => value)
    .map(([ key, value ]) => `times[]=${key}`)
    .join("&");
    
	window.location.href = "/quiz?" + params;
};
