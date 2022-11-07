// ______________Chart-circle
if ($('.chart-circle').length) {
	$('.chart-circle').each(function() {
		let $this = $(this);
		$this.circleProgress({
			fill: {
				color: $this.attr('data-color')
			},
			size: $this.height(),
			startAngle: -Math.PI / 4 * 2,
			emptyFill: 'rgba(0,0,0,0.15)',
			lineCap: 'round'
		});
	});
}

if ($('.dark-theme .chart-circle').length) {
	$('.dark-theme .chart-circle').each(function() {
		let $this = $(this);
		$this.circleProgress({
			fill: {
				color: $this.attr('data-color')
			},
			size: $this.height(),
			startAngle: -Math.PI / 4 * 2,
			emptyFill: '#25273e',
			lineCap: 'round'
		});
	});
}