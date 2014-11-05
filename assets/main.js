var gui = require('nw.gui');
var win = gui.Window.get();
var tray = new gui.Tray({icon: 'paste.png' });
var menu = new gui.Menu();
//menu.append(new gui.MenuItem({ type: 'checkbox', label: 'show' }));
//tray.menu = menu;
ctl = (function(win) {
	var visible = true;
	return { 
		show: function() {
			win.show();
			win.setShowInTaskbar(true);
			visible = true;
		}, 
		hide: function() {
			win.hide();
			win.setShowInTaskbar(false);
			visible = false;
		},
		toggle: function() {
			visible ? this.hide(): this.show();
		}
	}
})(win);
win.on('close', function() {
	ctl.hide();
});
tray.on('click', function() {
	ctl.show();
});
ctl.hide()
var option = {
	key : "Ctrl+N",
	active : function() {
		ctl.toggle()	
	},
};
var shortcut = new gui.Shortcut(option);
gui.App.registerGlobalHotKey(shortcut);
CodeMirror.modeURL = "assets/codemirror/mode/%N/%N.js";
angular.module('xapp', ['hljs', 'ui.codemirror']).controller('clip', function($scope, $interval) {
	var clipboard = gui.Clipboard.get();
	var old;
	$scope.clips = [];
	$scope.copy = function(text) {
		clipboard.set(text, 'text');
	};
	var map = {java: 'clike'};
	$interval(function() {
		clip = clipboard.get('text');
		if(clip != old && clip != '') {
			$scope.clips.unshift({
				language: hljs.highlightAuto(clip).language,
				option: {
					mode: map[hljs.highlightAuto(clip).language] || hljs.highlightAuto(clip).language,
					theme: 'solarized',
					lineNumbers: true,
					viewportMargin: Infinity,
					onLoad: function(_cm) {
						try {
							CodeMirror.autoLoadMode(_cm, this.mode);
						} catch(e) {
						}
					}
				},
				text: clip,
				ts: + new Date()
			});
		}
		old = clip;
	}, 500);
});
