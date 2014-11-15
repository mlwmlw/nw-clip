var NwBuilder = require('node-webkit-builder');
var gulp = require('gulp');

gulp.task('nw', function () {
		var nw = new NwBuilder({
			macIcns: 'paste.icns',
			appName: 'new-clip',
			version: '0.9.2',
			files: [ './**'],
			platforms: ['osx', 'win'] // change this to 'win' for/on windows
		});

		// Build returns a promise, return it so the task isn't called in parallel
	return nw.build().then(function() {
		console.log('all done');
	}).catch(function (err) {
		if(err)
			console.log(err);
	});
});
