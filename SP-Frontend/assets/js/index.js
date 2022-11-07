$(function() {
	'use strict'

	// ______________ PerfectScrollbar
	const ps = new PerfectScrollbar('.project-scroll',{
		useBothWheelAxes:true,
		suppressScrollX:true,
	});

	function labelFormatter(label, series) {
		return '<div style="font-size:11px; font-weight:500; text-align:center; padding:2px; color:white;">' + Math.round(series.percent) + '%<\/div>';
	}

	// Bar charts
    $('.peity-donut').peity('donut');

	/*-----sales overview-----*/
	var plot1 = $.plot('#flotChart', [{
		data: flotSampleData4,
		color: '#4d79f5'
	}], {
		series: {
			shadowSize:0	,
			lines: {
				show: true,
				lineWidth: 2,
				fill: true,
				fillColor: {
					colors: [{
						opacity: 0.1
					}, {
						opacity: 0.9
					}]
				}
			}
		},
		grid: {
			borderWidth: 0,
			borderColor: '#0076fe',
			labelMargin: 5,
			markings: [{
				color: 'transparent'
			}]
		},
		yaxis: {

			show: false,
			color: '#ced4da',
			tickLength: 0,
			min: 0,
			max: 75,
			font: {
				size: 11,
				color: '#ced4da'
			},
			tickFormatter: function formatter(val, axis) {
				return val + 'k';
			}
		},
		xaxis: {
			show: false,
			position: 'bottom',
			color: 'rgba(0,0,0,0.0)',
			tickcolor: 'rgba(0,0,0,0.1)'
		}
	});
	var mqSM = window.matchMedia('(min-width: 576px)');
	var mqSMMD = window.matchMedia('(min-width: 576px) and (max-width: 991px)');
	var mqLG = window.matchMedia('(min-width: 992px)');

	function screenCheck() {
		if (mqSM.matches) {
			plot1.getAxes().yaxis.options.show = true;
			plot1.getAxes().xaxis.options.show = true;
		} else {
			plot1.getAxes().yaxis.options.show = false;
			plot1.getAxes().xaxis.options.show = false;
		}
		if (mqSMMD.matches) {
			var tick = [
				[0, '<span>Jan<\/span><span>03<\/span>'],
				[15, '<span>Feb<\/span><span>06<\/span>'],
				[30, '<span>Mar<\/span><span>09<\/span>'],
				[45, '<span>Apr<\/span><span>12<\/span>'],
				[60, '<span>May<\/span><span>15<\/span>'],
				[75, '<span>Jun<\/span><span>18<\/span>'],
				[90, '<span>Jul<\/span><span>21<\/span>'],
				[105, '<span>Aug<\/span><span>24<\/span>'],
				[130, '<span>Sep<\/span><span>27<\/span>'],
			];
			plot1.getAxes().xaxis.options.ticks = tick;
		}
		if (mqLG.matches) {
			var tick = [
				[15, '<span>Jan<\/span> <span>19<\/span>'],
				[30, '<span>Feb<\/span> <span>19<\/span>'],
				[45, '<span>Mar<\/span> <span>19<\/span>'],
				[60, '<span>Apr<\/span> <span>19<\/span>'],
				[75, '<span>May<\/span> <span>19<\/span>'],
				[90, '<span>Jun<\/span> <span>19<\/span>'],
				[105, '<span>Jul<\/span> <span>19<\/span>'],
				[120, '<span>Aug<\/span> <span>19<\/span>'],
				[135, '<span>Sep<\/span> <span>19<\/span>'],
				[150, '<span>Oct<\/span> <span>19<\/span>'],
				[165, '<span>Nov<\/span> <span>19<\/span>'],
				[180, '<span>Dec<\/span> <span>19<\/span>'],
			];
			plot1.getAxes().xaxis.options.ticks = tick;
		}
	}
	screenCheck();
	mqSM.addListener(screenCheck);
	mqSMMD.addListener(screenCheck);
	mqLG.addListener(screenCheck);
	plot1.setupGrid();
	plot1.draw();

	// Datepicker found in left sidebar of the page
	var highlightedDays = ['2020-2-10', '2018-2-11', '2018-2-12', '2018-2-13', '2018-2-14', '2018-2-15', '2018-2-16'];
	var date = new Date();
	$('.fc-datepicker').datepicker({
		showOtherMonths: true,
		selectOtherMonths: true,
		dateFormat: 'yy-mm-dd',
		beforeShowDay: function(date) {
			var m = date.getMonth(),
				d = date.getDate(),
				y = date.getFullYear();
			for (var i = 0; i < highlightedDays.length; i++) {
				if ($.inArray(y + '-' + (m + 1) + '-' + d, highlightedDays) != -1) {
					return [true, 'ui-date-highlighted', ''];
				}
			}
			return [true];
		}
	});

	/* LINE CHART */
	var ctx8 = document.getElementById('chartLine1');
	new Chart(ctx8, {
		type: 'line',
		data: {
			labels: ['PHP', 'Angular', 'JS', 'Java', '.Net', 'Phython'],
			datasets: [{
				data: [14, 12, 34, 25, 44, 36],
				borderColor: 'rgb(77, 121, 245)',
				backgroundColor: 'rgb(77, 121, 245,0.15)',
				borderWidth: 3,
			}]
		},
		options: {
			maintainAspectRatio: false,
			legend: {
				display: false,
				labels: {
					display: false
				}
			},
			scales: {
				yAxes: [{
					ticks: {
						display: false,
						beginAtZero: true,
						fontSize: 10,
						max: 50
					},
					gridLines: {
						display: false,
						drawBorder: false
					},
				}],
				xAxes: [{
					ticks: {
						position:'top',
						beginAtZero: true,
						fontSize: 11
					},
					gridLines: {
						display: false,
						drawBorder: true
					},
				}]
			}
		}
	});

});