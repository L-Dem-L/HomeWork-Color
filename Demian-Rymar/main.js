let colors = [];

const colorForm = document.querySelector('#color-form');
const colorPalette = document.querySelector('#color-palette');
function validateColorName(name) {
	return /^[a-zA-Z]+$/.test(name);
}
function validateColorCode(code) {
	let type = colorForm.elements['color-type'].value;
	switch (type) {
		case 'rgb':
			return /^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/.test(code);
		case 'rgba':
			return /^rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*0?\.\d+\s*\)$/.test(code);
		case 'hex':
			return /^#[0-9a-fA-F]{6}$/.test(code);
		default:
			return false;
	}
}
function addColor(name, type, code) {
	let color = {
		name: name,
		type: type,
		code: code
	};
	colors.push(color);

	let li = document.createElement('li');
	li.style.backgroundColor = code;
	li.textContent = name;
	colorPalette.appendChild(li);

	colorForm.reset();
}

colorForm.addEventListener('submit', function (event) {
	event.preventDefault();

	const name = colorForm.elements['color-name'].value.trim();
	const type = colorForm.elements['color-type'].value;
	const code = colorForm.elements['color-code'].value.trim();

	if (!name || !validateColorName(name)) {
		alert('Please enter a valid color name. ');
		return;
	}
	if (colors.some(color => color.name.toLowerCase() === name.toLowerCase())) {
		alert('A color with that name already exists.');
		return;
	}
	if (!validateColorCode(code)) {
		alert('Please enter a valid color code. rgb(255, 0, 0)  , #FF0000  ,  rgba(255, 0, 0, 0.5)');
		return;
	}

	addColor(
		name, 
		type, 
		code
		);

	localColor(
		name, 
		type, 
		code
		);
		
	function localColor(name, type, code) {
		let color = { name, type, code };
		colors.push(color);
		saveColors();
		renderColors();
	}

	function saveColors() {
		localStorage.setItem('colors', JSON.stringify(colors));
	}
});