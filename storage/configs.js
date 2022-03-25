// configs.js | the default config objects

module.exports = App => {

	App.default = {
		debug: false,
		theme: "dark",
		style: "",
		u_css: "",

		is_afk: false,
		afkstr: "I'm AFK - Back in a sec!",

		people: true,
		player: true,
		bubble: true,

		logger: false,
		volume: false,
		played: false,
		stamps: false,

		auto_b: true,
		nextdj: false,
		auto_q: false,
		q_text: "Hey @user - it's your turn!",

		notify: {
			song: false,
			ding: false,
			chat: false,
			text: ""
		},

		alerts: {
			song: false,
			spun: false,
			snag: false,
			join: false,
			left: false
		},

		hotbar: {
			is_afk: true,
			auto_b: true,
			auto_q: true,
			nextdj: true,
			bubble: false,
			people: false,
			player: false,
			qtbtn1: false,
			qtbtn2: false,
			qtbtn3: false
		},

		qtbtns: {
			qtbtn1: "",
			qtbtn2: "",
			qtbtn3: ""
		},

		timing: {
			beat: 0,
			post: 0,
			text: "Today's theme is: Cool."
		},
	}

	App.options = {
		theme: {
			dark: "Dark Mode",
			night: "Night Mode",
			cosmic: "Cosmic",
			forest: "Forest",
			midnight: "Midnight"
		},
		style: {
			blue: "Blue",
			pink: "Pink",
			green: "Green",
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