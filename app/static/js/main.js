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

Object.keys(timesDict).forEach((key) => {
	const span = document.createElement("span");
	span.textContent = `${timesDict[key]}`;

	const button = document.createElement("button");
	button.id = key;
	button.onclick = function () {
		switchSelection(key);
	};

	button.appendChild(span);
	buttonField.appendChild(button);
});

const selection = Object.keys(timesDict).reduce((acc, key) => {
	acc[key] = false;
	return acc;
}, {});

const update = (times) => {
	/**
	 * @type {HTMLButtonElement}
	 */
	const button = document.querySelector(`#${times}`);
	if (!button) return;

	const key = button.id;
	const value = selection[key] || false;

	if (value) {
		button.classList.add("active");
	} else {
		button.classList.remove("active");
	}
};

const switchSelection = (times) => {
	selection[times] = !selection[times];
	update(times);
};

const start = () => {
	const params = Object.entries(selection)
		.filter(([key, value]) => value)
		.map(([key, value]) => `times[]=${key}`)
		.join("&");

	window.location.href = "/quiz?" + params;
};
