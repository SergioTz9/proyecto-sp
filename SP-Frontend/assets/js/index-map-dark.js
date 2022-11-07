$(function(){
	'use strict'
	$('#vmap2').vectorMap({
		map: 'world_en',
		backgroundColor: 'transparent',
		enableZoom: false,
		color: '#2a2b40',
		hoverOpacity: 1,
		showTooltip: false,
		scaleColors: ['#2a2b40','#25273e'],
		borderWidth: 1,
		borderColor: '#2a2b40',
		values: sample_data,
		normalizeFunction: 'polynomial'
	});
});
        