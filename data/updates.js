// updates.js | config layout migrations

module.exports = app => {

	const updates = [
		function UpgradeV10 (config) {
			// update old values to new mapped values
			const update = (old, map, deep, flip) => {
				if (old in config) {
					if (!deep) config[map] = flip ? !config[old] : config[old]
					else config[map][deep] = flip ? !config[old] : config[old]
					delete config[old]
				}
			}

			update('user_css', 'u_css')

			update('autobop', 'auto_b')
			update('logging', 'logger')
			update('has_vol', 'volume')

			update('q_ping', 'q_text')
			update('afk_ping', 'afkstr')

			update('no_aud', 'people', false, true)
			update('no_vid', 'player', false, true)
			update('no_bub', 'bubble', false, true)

			update('ping_pm',   'notify', 'chat')
			update('ping_song', 'notify', 'song')
			update('ping_chat', 'notify', 'ding')
			update('hot_words', 'notify', 'text')

			update('chat_song', 'alerts', 'song')
			update('chat_spun', 'alerts', 'spun')
			update('chat_snag', 'alerts', 'snag')
			update('chat_join', 'alerts', 'join')
			update('chat_left', 'alerts', 'left')

			update('beats',    'timing', 'beat')
			update('remind',   'timing', 'post')
			update('reminder', 'timing', 'text')

			return config
		}
	]

	app.update = function () {
		for (let update of updates) {
			this.config = update(this.config)
		}
	}

}