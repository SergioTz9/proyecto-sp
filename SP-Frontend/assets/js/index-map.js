$(function(){
	'use strict'
	$('#vmap').vectorMap({
		map: 'world_en',
		backgroundColor: 'transparent',
		enableZoom: false,
		color: '#ffffff',
		hoverOpacity: 1,
		showTooltip: false,
		scaleColors: ['#eaf0f7','#dee5ef'],
		borderWidth: 1,
		borderColor: '#fff',
		values: sample_data,
		normalizeFunction: 'polynomial'
	});
});
        