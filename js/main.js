(function ($) {

	"use strict";

	var adjustFullHeight = function () {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function () {
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	adjustFullHeight();

})(jQuery);

function retrievePastMonthNames(numOfMonths) {
	const pastMonths = [];
	const currentDate = new Date();
	for (let i = 0; i < numOfMonths; i++) {
		const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - i - 1, 1);
		const monthName = previousMonth.toLocaleString('default', { month: 'long' });
		pastMonths.push(monthName);
	}
	console.log(pastMonths);
	return pastMonths;
}

function initializeMonthlyData() {
	const monthlyData = {};
	// Generate a random value between a given range
	function generateRandomAmount(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	const months = retrievePastMonthNames(new Date().getMonth());
	months.forEach(month => {
		const existingData = JSON.parse(localStorage.getItem(month)) || {};
		// Check if expense and income fields exist, and initialize them if not
		if (!existingData.expense) {
			existingData.expense = generateRandomAmount(2000, 5000);
		}
		if (!existingData.income) {
			existingData.income = generateRandomAmount(2000, 5000);
		}
		monthlyData[month] = existingData;
	});

	// Log the current expense and income values for each month
	months.forEach(month => {
		const { expense, income } = monthlyData[month];
		console.log(`Current expense for ${month}: ${expense}`);
		console.log(`Current income for ${month}: ${income}`);
		localStorage.setItem(month, JSON.stringify(monthlyData[month]));
	});
}