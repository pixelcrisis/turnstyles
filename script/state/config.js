// config.js | the default config objects

module.exports = app => {

	app.default = {
		logging: false,
		played: false,
		
		theme: "dark",
		style: "",

		autobop: true,

		nextdj: false,
		auto_q: false,
		q_ping: `Hey @user - it's your turn!`,

		has_vol: false,
		stamps: false,

		no_aud: false,
		no_vid: false,
		no_bub: false,

		ping_pm: false,
		ping_song: false,
		ping_chat: false,
		hot_words: "",

		chat_song: false,
		chat_spun: false,
		chat_snag: false,
		chat_join: false,
		chat_left: false,

		is_afk: false,
		afk_ping: `I'm AFK - Back in a sec!`,

		beats: 0,
		remind: 0,
		reminder: `Today's theme is: Cool.`,

		user_css: ''
	}

	app.options = {
		theme: {
			dark: "Dark Mode",
			night: "Night Mode",
			cosmic: "Cosmic",
			midnight: "Midnight"
		},
		style: {
			blue: "Blue",
			pink: "Pink",
			purple: "Purple",
			teal: "Teal"
		},
		remind: {
			0: "Don't Remind",
			15: "Every 15m",
			30: "Every 30m",
			60: "Every 1h",
			120: "Every 2h"
		}
	}

}