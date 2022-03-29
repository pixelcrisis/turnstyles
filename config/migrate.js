// migrate.js | config layout migrations

module.exports = App => {

	App.migrate = function (config) {
		for (let migrate of Migrations) config = migrate(config)
		return config
	}

}

const Migrations = [

	function v10 (config) {		
		const mapped = {
			"user_css": { map: "u_css" },

			"autobop": { map: "auto_b" },
			"logging": { map: "logger" },
			"has_vol": { map: "volume" },

			"q_ping": 	{ map: "q_text" },
			"afk_ping": { map: "afkstr" },

			"no_aud": { map: "people", flip: true },
			"no_vid": { map: "player", flip: true },
			"no_bub": { map: "bubble", flip: true },

			"ping_pm": 	 { map: "chat", cat: "notify" },
			"ping_song": { map: "song", cat: "notify" },
			"ping_chat": { map: "ding", cat: "notify" },
			"hot_words": { map: "text", cat: "notify" },

			"chat_song": { map: "song", cat: "alerts" },
			"chat_spun": { map: "spun", cat: "alerts" },
			"chat_snag": { map: "snag", cat: "alerts" },
			"chat_join": { map: "join", cat: "alerts" },
			"chat_left": { map: "left", cat: "alerts" },

			"beats": 		{ map: "beat", cat: "timing" },
			"remind": 	{ map: "post", cat: "timing" },
			"reminder": { map: "text", cat: "timing" }
		}

		return Remap(config, mapped)
	}
]

const Remap = function (config, mapped) {
	for (let key in mapped) {
		let { map, cat, flip } = mapped[key]
		// update old keys
		if (key in config) {
			let data = flip ? !config[key] : config[key]
			if (!cat) config[map] = data
			else {
				if (config[cat]) config[cat][map] = config[key]
				else config[cat] = { [map]: config[key] }
			}
			delete config[key]
		}
	}
	return config
}