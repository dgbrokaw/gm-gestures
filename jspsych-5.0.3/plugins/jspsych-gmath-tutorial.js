/** js-psych-gm-tutorial.js
 *  David Brokaw
 *
 * 	This plugin runs a single Grasping Math action tutorial.
 *
 * 	The problem consists of:
 * 		A description.
 * 		An expression.
 * 		If the user performs the describes action, they will move on to the next tutorial.
 * 		If the user does the incorrect action, they will have to try again.
 *
 * 	Parameters:
 * 		type: "gm-tutorial"
 * 		title: a string
 * 		tasks: an array of objects
 * 			Each object contains:
 * 			- ...
 * 			- ...
 */

(function() {

	jsPsych['gm-tutorial'] = (function() {

		var plugin = {};

		plugin.trial = function(display_element, trial) { // block, part
			display_element = d3.select(display_element[0]);

			var container = display_element.append('div').attr('id', 'container');
			container.append('h2').text(trial.title);

			var task_count = trial.tasks.length
			  , eqs = []
			  , expressions = []
			  , players = []
			  , finished = 0;

			trial.tasks.forEach(function(task, i) {
				var tp = new gmath.GMTutorialPair('#container', {
					gestureData: task
				, eq: task.options.eq
				, correctAnswers: task.correctAnswers
				, text: task.text
				, startWiggle: task.startWiggle
				, allow_restart_after_done: false
				});
				tp.events.on('done', done);
				players.push(tp);
			});
			var div = d3.selectAll('div.tutorial').append('div').style('clear', 'both');
			//div.append('p').text('(watch how its done)').style({'margin-top': 0, color: 'silver', 'font-style': 'italic', width: '50%', float: 'left', 'text-align': 'center'})

      // FIXME
			// function done() {
			// 	finished++;
			// 	if (finished < task_count) return;
			// 	players.forEach(function(player) {
			// 		player.stop();
			// 		player.events.on('done', null);
			// 	});
			// 	if (plugin.progress_fn) plugin.progress_fn((trial.id+1)/block.trials.length);
			// 	setTimeout(function() {
			// 		display_element.html('');
			// 		block.next()
			// 	}, 1000);
			// }

		};

		return plugin;
	})();

})();
