document.addEventListener("DOMContentLoaded", () => {
	let timerMin = document.getElementById("timerMin"),
		timerSec = document.getElementById("timerSec"),
		playerEl = document.getElementById("player"),
		wallEl = document.getElementById("wall"),
		batteryEl = document.getElementById("battery"),
		charge = document.getElementById('charge'),
		name = document.getElementById('name'),
		nameField = document.getElementById('nameField'),
		content = document.getElementById('content'),
		chargeCount = document.getElementById('chargeCount'),
		chargeInterval = 1000,
		chargeCounts = 50,
		wallInterval = 2296,
		batteryInterval = 1148,
		interval = 200,
		is_play = false,
		move_direction = false,
		date,
		time_start,
		old_time;

	changeScene(0);

	function start() {
		date = new Date(),
		time_start = date.getTime(),
		old_time = date.getSeconds(),
		is_play = true;

		changeScene(1);

		update();
		nameInput();
		newWallFunc();
		newBatteryFunc();
		addCharge();
		chargeTime();
	}

	function nameInput() {
		if (nameField.value) {
			name.textContent = nameField.value;
		} else {
			name.textContent = 'name';
		}
	}

	function update() {
		let date = new Date(),
			time_now,
			time_diff;

		if (date.getSeconds() != old_time) {
			time_now = date.getTime();
			time_diff = time_now - time_start;
			old_time = date.getSeconds();
			date = new Date(time_diff);
			if (date.getSeconds() < 10) {
				timerSec.textContent = '0' + date.getSeconds();
			} else {
				timerSec.textContent = date.getSeconds();
			}
			if (date.getMinutes() < 10) {
				timerMin.textContent = '0' + date.getMinutes();
			} else {
				timerMin.textContent = date.getMinutes();	
			}
			// timerEl.textContent = (date.getMinutes()) + ":" + (date.getSeconds());
		}

		move();

		if (is_play) {
			setTimeout(update, interval);
		} else {
			changeScene(2);
		}
	}

	function chargeTime() {
		chargeCounts -= 1;
		chargeCount.textContent = chargeCounts;

		setTimeout(chargeTime, chargeInterval);
	}

	function move() {
		if (move_direction) {
			let classes = playerEl.classList;
			if (move_direction === "Up") {
				if (classes.contains("player-bottom")) {
					classes.add("player-center");
					classes.remove("player-bottom");
				} else if (classes.contains("player-center")) {
					classes.add("player-top");
					classes.remove("player-center");
				}
			}
			if (move_direction === "Down") {
				if (classes.contains("player-top")) {
					classes.add("player-center");
					classes.remove("player-top");
				} else if (classes.contains("player-center")) {
					classes.add("player-bottom");
					classes.remove("player-center");
				}
			}
			move_direction = false;
		}
	}

	function randomPosWall(max) {
		return Math.floor(Math.random() * max);
	}
	function randomHeightsWall(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	function newWallFunc() {
		let newWall = document.createElement('div');
		content.append(newWall);
		newWall.classList.add('wall');
		if (randomPosWall(2)) {
			newWall.classList.add('element-top');
		} else {
			newWall.classList.add('element-bottom');
		}
		newWall.style.height = randomHeightsWall(99, 501) + 'px';

		setTimeout(newWallFunc, wallInterval);
	}


	function randomPosBattery(max) {
		return Math.floor(Math.random() * max);
	}

	function newBatteryFunc() {
		let newBattery = document.createElement('div');
		content.append(newBattery);
		newBattery.classList.add('battery');
		if (randomPosBattery(3) == 2) {
			newBattery.classList.add('player-top');
		} else if (randomPosBattery(3) == 1) {
			newBattery.classList.add('player-center');
		} else {
			newBattery.classList.add('player-bottom');
		}
		if (newBattery.style.right > 700 + 'px') {
			console.log('test');
			newBattery.remove();
		}

		setTimeout(newBatteryFunc, wallInterval);
	}


	function addCharge() {
		let activeBattery = document.querySelectorAll('.battery');
		activeBattery.forEach((e) => {
			if (e.classList.contains('player-top') && playerEl.classList.contains('player-top') && e.style.right >= 650 && e.style.right <= 700) {
				console.log('top');
				chargeCount.textContent = chargeCount.textContent + 5;
			} else if (e.classList.contains('player-center') && playerEl.classList.contains('player-center') && e.style.right >= 650 && e.style.right <= 700) {
				console.log('center');
				chargeCount.textContent = chargeCount.textContent + 5;
			} else if (e.classList.contains('player-bottom') && playerEl.classList.contains('player-bottom') && e.style.right >= 650 && e.style.right <= 700) {
				console.log('bottom');
				chargeCount.textContent = chargeCount.textContent + 5;
			}
		})
		setTimeout(addCharge, interval);
	}



	document.addEventListener("keypress", (e) => {
		let keycode = e.code;
		if (keycode === "KeyW") {
			move_direction = "Up";
		}
		if (keycode === "KeyS") {
			move_direction = "Down";
		}
	});

	function changeScene(number) {
		let scenes = [
			"menu",
			"main",
			"score",
		];

		for (let i = 0; i < scenes.length; i++) {
			let element = document.getElementById(scenes[i]);
			if (i == number) {
				element.classList.remove("hidden");
			} else {
				element.classList.add("hidden");
			}
		}
	}
	window.start = start;
});