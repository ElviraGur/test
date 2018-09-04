const monthLong = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function calendarHandler(position) {

	var datepicker = document.querySelector('.datepicker');
	
	if (isSameCalendarClicked(datepicker, position)) {
		hideCalendar(datepicker);

	} else {
		hideCalendar(datepicker);
		showCalendar(datepicker, position);
		setCalendarDates();
	}
}

function isSameCalendarClicked(datepicker, position) {
	return datepicker.classList.contains(position);
}

function hideCalendar(datepicker) {
	datepicker.classList.remove('datepicker-left');
	datepicker.classList.remove('datepicker-right');
	datepicker.style.display = 'none';
}

function showCalendar(datepicker, position) {
	datepicker.classList.add('datepicker-left');
	datepicker.classList.add('datepicker-right');
	datepicker.style.display = 'flex';
}

function setCalendarDates() {
	buildCalendar("calendar", new Date().getFullYear(), new Date().getMonth());
	
	document.querySelector('#calendar thead tr:nth-child(1) td:nth-child(1)').onclick = function() {
		buildCalendar("calendar", getCurrentYear(), getCurrentMonth()-1);
	}

	document.querySelector('#calendar thead tr:nth-child(1) td:nth-child(3)').onclick = function() {
		buildCalendar("calendar", getCurrentYear(), getCurrentMonth()+1);	
	}
}

function getElementDate(element) {

	var month = getCurrentMonth();
	var year = getCurrentYear();
 	var day = element.innerHTML;

	styleElement(element);
	var dateString = styleDate(year, month, day);

	showDate(dateString);
}

function getCurrentMonth() {
	var currentMonth = parseFloat(document.querySelector('#calendar thead td:nth-child(2)').dataset.month);
	return currentMonth;
}

function getCurrentYear() {
	var currentYear = document.querySelector('#calendar thead td:nth-child(2)').dataset.year;
	return currentYear;
}

function styleElement(element) {

	var selectedDates = document.querySelectorAll('.selected');
	
	if (selectedDates && selectedDates.length !== 0) {
		selectedDates[0].classList.remove('selected');
	}
	element.classList.add('selected');
}

function styleDate(year, month, day) {
	var monthName = monthShort[month];
	var yearShort = year.toString().substr(2, 2);

	return monthName + ' ' + day + ', ' + yearShort;
}

function showDate(date) {
	var datepicker = document.querySelector('.datepicker');

	if (datepicker.classList.contains('datepicker-left')) {
		document.querySelector('#leftDate').innerHTML = date;
	} else {
		document.querySelector('#rightDate').innerHTML = date;
	}
}

function applyDates() {
	var fromDate = document.querySelector('#leftDate').innerHTML;
	var toDate = document.querySelector('#rightDate').innerHTML;

	if (!fromDate || !toDate) {
		alert('Dates were not selected');
		return;
	}
	
	document.querySelector('.result').innerHTML = fromDate + ' - ' + toDate;	
}

function buildCalendar(id, year, month) {
    var Dlast = new Date(year,month+1,0).getDate(),
        D = new Date(year,month,Dlast),
        DNfirst = new Date(D.getFullYear(),D.getMonth(),1).getDay(),
        calendar = '<tr>';		
		
    if (DNfirst != 0) {
    	for (var i = 1; i < DNfirst; i++) {
			calendar += '<td>';
		}
    } else {
    	for (var i = 0; i < 6; i++) {
			calendar += '<td>';
		}
	}
	
    for(var  i = 1; i <= Dlast; i++) {

		if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
			calendar += '<td class="calendar-day today" onclick="getElementDate(this)">' + i;
		} else {
			calendar += '<td class="calendar-day" onclick="getElementDate(this)">' + i;
		}
		if (new Date(D.getFullYear(),D.getMonth(),i).getDay() == 0) {
			calendar += '<tr>';
		}
	}

    document.querySelector('#'+id+' tbody').innerHTML = calendar;
    document.querySelector('#'+id+' thead td:nth-child(2)').innerHTML = monthLong[D.getMonth()] +' '+ D.getFullYear();
    document.querySelector('#'+id+' thead td:nth-child(2)').dataset.month = D.getMonth();
	document.querySelector('#'+id+' thead td:nth-child(2)').dataset.year = D.getFullYear();
	
}