(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = App => {

	require("./configs.js")(App)
	require("./iconids.js")(App)
	require("./migrate.js")(App)
	require("./restore.js")(App)
	require("./removal.js")(App)
	require("./session.js")(App)
	require("./storage.js")(App)	

}
},{"./configs.js":2,"./iconids.js":3,"./migrate.js":4,"./removal.js":5,"./restore.js":6,"./session.js":7,"./storage.js":8}],2:[function(require,module,exports){
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
		emojis: true,

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
},{}],3:[function(require,module,exports){
// iconids.js | twitch/bttv emote IDs

module.exports = App => {

	App.twitchIcons = {
		"jkanstyle": 15,
    "optimizeprime": 16,
    "stonelightning": 17,
    "theringer": 18,
    "redcoat": 22,
    "kappa": 25,
    "joncarnage": 26,
    "mrdestructoid": 28,
    "bcwarrior": 30,
    "gingerpower": 32,
    "dansgame": 33,
    "swiftrage": 34,
    "pjsalt": 36,
    "kevinturtle": 40,
    "kreygasm": 41,
    "ssssss": 46,
    "punchtrees": 47,
    "arsonnosexy": 50,
    "smorc": 52,
    "frankerz": 65,
    "onehand": 66,
    "bloodtrail": 69,
    "dbstyle": 73,
    "asianglow": 74,
    "biblethump": 86,
    "shazbotstix": 87,
    "pmstwin": 92,
    "fungineer": 244,
    "residentsleeper": 245,
    "4head": 354,
    "hotpokket": 357,
    "failfish": 360,
    "daesuppy": 973,
    "wholewheat": 1896,
    "thunbeast": 1898,
    "tf2john": 1899,
    "ralpherz": 1900,
    "kippa": 1901,
    "keepo": 1902,
    "bigbrother": 1904,
    "sobayed": 1906,
    "peopleschamp": 3412,
    "grammarking": 3632,
    "panicvis": 3668,
    "anele": 3792,
    "brokeback": 4057,
    "pipehype": 4240,
    "youwhy": 4337,
    "ritzmitz": 4338,
    "elegiggle": 4339,
    "thething": 7427,
    "hassaanchop": 20225,
    "babyrage": 22639,
    "panicbasket": 22998,
    "permasmug": 27509,
    "buddhabar": 27602,
    "wutface": 28087,
    "prchase": 28328,
    "mau5": 30134,
    "heyguys": 30259,
    "notatk": 34875,
    "mcat": 35063,
    "ttours": 38436,
    "praiseit": 38586,
    "corgiderp": 49106,
    "argieb8": 51838,
    "shadylulu": 52492,
    "kappapride": 55338,
    "coolcat": 58127,
    "dendiface": 58135,
    "notlikethis": 58765,
    "ripepperonis": 62833,
    "dududu": 62834,
    "bleedpurple": 62835,
    "twitchraid": 62836,
    "seemsgood": 64138,
    "minglee": 68856,
    "kappaross": 70433,
    "kappaclaus": 74510,
    "ohmydog": 81103,
    "osfrog": 81248,
    "serioussloth": 81249,
    "komodohype": 81273,
    "vohiyo": 81274,
    "mikehogu": 81636,
    "kappawealth": 81997,
    "cmonbruh": 84608,
    "smoocherz": 89945,
    "nomnom": 90075,
    "stinkycheese": 90076,
    "cheffrank": 90129,
    "futureman": 98562,
    "opieop": 100590,
    "doritoschip": 102242,
    "pjsugar": 102556,
    "voteyea": 106293,
    "votenay": 106294,
    "rulefive": 107030,
    "dxcat": 110734,
    "drinkpurple": 110785,
    "tinyface": 111119,
    "picomause": 111300,
    "thetarfu": 111351,
    "datsheffy": 111700,
    "unsane": 111792,
    "copythis": 112288,
    "pastathat": 112289,
    "imglitch": 112290,
    "giveplz": 112291,
    "takenrg": 112292,
    "blargnaut": 114738,
    "dogface": 114835,
    "jebaited": 114836,
    "toospicy": 114846,
    "wtruck": 114847,
    "unclenox": 114856,
    "raccattack": 114870,
    "strawbeary": 114876,
    "primeme": 115075,
    "brainslug": 115233,
    "batchest": 115234,
    "curselit": 116625,
    "poooound": 117484,
    "freakinstinkin": 117701,
    "supervinlin": 118772,
    "trihard": 120232,
    "coolstorybob": 123171,
    "itsboshytime": 133468,
    "kapow": 133537,
    "youdontsay": 134254,
    "uwot": 134255,
    "rlytho": 134256,
    "partytime": 135393,
    "ninjagrumpy": 138325,
    "mvgame": 142140,
    "tbangel": 143490,
    "theilluminati": 145315,
    "morphintime": 156787,
    "thankegg": 160392,
    "begwan": 160394,
    "bigphish": 160395,
    "inuyoface": 160396,
    "kappu": 160397,
    "koncha": 160400,
    "punoko": 160401,
    "sabaping": 160402,
    "tearglove": 160403,
    "tehepelo": 160404,
    "twitchlit": 166263,
    "carlsmile": 166266,
    "crreamawk": 191313,
    "squid1": 191762,
    "squid2": 191763,
    "squid3": 191764,
    "squid4": 191767,
    "twitchunity": 196892,
    "tpcrunchyroll": 323914,
    "entropywins": 376765,
    "lul": 425618,
    "powerupr": 425671,
    "powerupl": 425688,
    "hscheers": 444572,
    "hswp": 446979,
    "darkmode": 461298,
    "twitchvotes": 479745,
    "tpfufun": 508650,
    "redteam": 530888,
    "greenteam": 530890,
    "purplestar": 624501,
    "fbtouchdown": 626795,
    "popcorn": 724216,
    "tombraid": 864205,
    "earthday": 959018,
    "partyhat": 965738,
    "mercywing1": 1003187,
    "mercywing2": 1003189,
    "pinkmercy": 1003190,
    "bisexualpride": 1064987,
    "lesbianpride": 1064988,
    "gaypride": 1064991,
    "transgenderpride": 1064995,
    "asexualpride": 1130348,
    "pansexualpride": 1130349,
    "twitchrpg": 1220086,
    "intersexpride": 1221184,
    "maxlol": 1290325,
    "nonbinarypride": 1297279,
    "genderfluidpride": 1297281,
    "fbrun": 1441261,
    "fbpass": 1441271,
    "fbspiral": 1441273,
    "fbblock": 1441276,
    "fbcatch": 1441281,
    "fbchallenge": 1441285,
    "fbpenalty": 1441289,
    "pixelbob": 1547903,
    "gunrun": 1584743,
    "holidaycookie": 1713813,
    "holidaylog": 1713816,
    "holidayornament": 1713818,
    "holidaypresent": 1713819,
    "holidaysanta": 1713822,
    "holidaytree": 1713825,
    "soonerlater": 2113050,
    "twitchsings": 300116344,
    "singsmic": 300116349,
    "singsnote": 300116350,
    "porschewin": 300745158,
    "bop": 301428702,
    "virtualhug": 301696583,
    "extralife": 302426269,
    "blacklivesmatter": 302537250,
    "football": 302628600,
    "footyellow": 302628613,
    "footgoal": 302628617,
    "showofhands": 303564554,
    "glitchcat": 304486301,
    "stinkyglitch": 304486324,
    "glitchlit": 304489128,
    "glitchnrg": 304489309,
    "pogchamp": 305954156
  }

  App.bttvIcons = {
		"tf": "54fa8f1401e468494b85b537",
		"cigrip": "54fa8fce01e468494b85b53c",
		"datsauce": "54fa903b01e468494b85b53f",
		"foreveralone": "54fa909b01e468494b85b542",
		"gaben": "54fa90ba01e468494b85b543",
		"hailhelix": "54fa90f201e468494b85b545",
		"shoopdawhoop": "54fa932201e468494b85b555",
		"m&mjc": "54fab45f633595ca4c713abc",
		"bttvnice": "54fab7d2633595ca4c713abf",
		"twat": "54fa935601e468494b85b557",
		"watchusay": "54fa99b601e468494b85b55d",
		"tehpolecat": "566ca11a65dbbdab32ec0558",
		"angelthump": "566ca1a365dbbdab32ec055b",
		"taxibro": "54fbefeb01abde735115de5b",
		"brobalt": "54fbf00a01abde735115de5c",
		"candianrage": "54fbf09c01abde735115de61",
		"vislaud": "550352766f86a5b26c281ba2",
		"karappa": "550b344bff8ecee922d2a3c1",
		"fishmoley": "566ca00f65dbbdab32ec0544",
		"hhhehehe": "566ca02865dbbdab32ec0547",
		"kkona": "566ca04265dbbdab32ec054a",
		"poledoge": "566ca09365dbbdab32ec0555",
		"sosgame": "553b48a21f145f087fc15ca6",
		"cruw": "55471c2789d53f2d12781713",
		"rarepepe": "555015b77676617e17dd2e8e",
		"hahaa": "555981336ba1901877765555",
		"feelsbirthdayman": "55b6524154eefd53777b2580",
		"ronsmug": "55f324c47f08be9f0a63cce0",
		"kappacool": "560577560874de34757d2dc0",
		"feelsbadman": "566c9fc265dbbdab32ec053b",
		"burself": "566c9f3b65dbbdab32ec052e",
		"concerndoge": "566c9f6365dbbdab32ec0532",
		"feelsgoodman": "566c9fde65dbbdab32ec053e",
		"firespeed": "566c9ff365dbbdab32ec0541",
		"nam": "566ca06065dbbdab32ec054e",
		"sourpls": "566ca38765dbbdab32ec0560",
		"feelssnowman": "566dde0e65dbbdab32ec068f",
		"feelssnowyman": "566decae65dbbdab32ec0699",
		"lul": "567b00c61ddbe1786688a633",
		"sosnowy": "567b5b520e984428652809b6",
		"saltycorn": "56901914991f200c34ffa656",
		"monkas": "56e9f494fff3cc5c35e5287e",
		"vapenation": "56f5be00d48006ba34f530a4",
		"ariw": "56fa09f18eff3b595e93ac26",
		"notsquishy": "5709ab688eff3b595e93c595",
		"feelsamazingman": "5733ff12e72c3c0814233e20",
		"duckerz": "573d38b50ffbf6cc5cc38dc9",
		"icecold": "5849c9a4f52be01a7ee5f79d",
		"sqshy": "59cf182fcbe2693d59d7bf46",
		"wowee": "58d2e73058d8950a875ad027",
		"wubtf": "5dc36a8db537d747e37ac187",
		"cvr": "5e76d2ab8c0f5c3723a9a87d",
		"cvl": "5e76d2d2d112fc372574d222",
		"cvhazmat": "5e76d338d6581c3724c0f0b2",
		"cvmask": "5e76d399d6581c3724c0f0b8",
		"dogchamp": "5ffdf28dc96152314ad63960",

		"fubaldi": "5f1caf2d713a6144748a2372",
		"baomn": "5f30ac02fe85fb4472d27d16",
		"crawlers": "5f30ae9e6f37824466029865",
		"checkers": "5f30afaa65fe924464efae58",
		"kissapregomie": "5f30b03d6f37824466029880",
		"pettheeddie": "5f30b0eacf6d2144653e6f92",
		"solarflare": "5f30b6c865fe924464efaec9",
		"petthebaldie": "5f30b844cf6d2144653e6fef",
		"raremoon": "5f30b90ffe85fb4472d27dce",
		"eddieknead": "5f30ba4ffe85fb4472d27dda",
		"baldfloss": "5f30c16f6f37824466029992",
		"coomtime": "5f30c24ccf6d2144653e70a1",
		"humpers": "5f30cfc2713a6144748b5028",
		"balddab": "5f30d8791ab9be446c4eb078",
		"baldflick": "5f30d8e1cf6d2144653e71b8",
		"eddiespin": "5f30df5b65fe924464efb0dd",
		"feelsayayaman": "5f30e087713a6144748b50ce",
		"bropls": "5f30e22865fe924464efb100",
		"eddiebaldmansmash": "5f30ebbacf6d2144653e725a",
		"moon2bass": "5f31e0f68abf185d76c680cf",
		"sneakers": "5f3c69a6afb6965d6e7c100d",
		"catjam": "5f41c91bf93bbe5d717f8a09",
		"peepoboom": "5f4ef4c1aa6fe06bfb5f8df4",
		"doubters": "5f5ad9080b77be6bfcad897e",
		"eekum": "5f5c0dc468d9d86c020e58ec",
		"moon2scoots": "5f6145b16084af6c171a58f9",
		"baldyikes": "5f6937288d3e1b709d8e731c",
		"speeders": "5f6e01ec239b210b0de66bca",
		"baners": "5f76b04eccde1f4a870bf570",
		"mariorun": "5f79098897f70a4a9be7f410",
		"peeponarusprint": "5f790a01e016be4a882f04f5",
		"flappers": "5f791fe1e9c9344a8f34f563",
		"twerkers": "5f8a6c38473f4802fe4713c6",
		"vibers": "5f8a6cdf710f8302f0c87068",
		"baldspin": "5f8a6d0d6f583802e38905dd",
		"pettheqynoa": "5fae06b5f32aa26441c89258",
		"qynoalurks": "5fae06df4dfba1644029ccef",
		"ayayajam": "5fb639f72d6c386f224a0679",
		"notsure": "5fb640fc2d6c386f224a06cc",
		"pepemetal": "5fb6414ff096f76f0d1bd1c0",
		"peepogolfclap": "5fb64523f096f76f0d1bd1f6",
		"soulshroom": "5fbc901de2900c6f07df72e6",
		"pepelepsy": "5fc1a3660d141d6f06d87397",
		"fcreep": "5fc86175e22688461fed94cd",
		"tanties": "5ff0e2539d7d952e405a1e7c",
		"shushers": "5ff0e27bbe65982e48cf1431",
		"baldyappp": "5ff0e2c1be65982e48cf143e",
		"monaks": "5ff0e34c3edf1a2e56b7af2a",
		"deskchan": "5ff0e4299d7d952e405a1ec3",
		"pepw": "5ff0e4c5f58a572e54214737",
		"lgiggle": "5ff0e4faf58a572e54214743",
		"shruggers": "5ff0e50f3edf1a2e56b7af83",
		"pukers": "5ff0e51f5ae5852e41549e31",
		"peepocheering": "5ff0e545f58a572e5421474e",
		"prayge": "5ff0e5a1f58a572e5421475b",
		"yappp": "5ff0e6a35ae5852e41549e5f",
		"geckw": "5ff0e704be65982e48cf14dc",
		"komodochomp": "5ff0e76cbe65982e48cf14e9",
		"omegapoggers": "5ff120aaf58a572e54214def",
		"peepeegachat": "5ff66346644cbf2fc687bff4",
		"tinyteeth": "5ffd116a30e9273179cdc63f",
		"feelsgoogman": "5ffd143ac12abd316340578a",
		"hypernopers": "60016b8dc96152314ad671e5",
		"hypernodders": "6001f12a3928fb3152de23a7",
		"hyperpeepod": "60037536c96152314ad6956d",
		"pepephoner": "600f796f6c75a765d463bdd4",
		"peepersd": "60172c8b8a320865dcf41961",
		"gamba": "60172ffbf1cfbf65dbe14586",
		"vanish": "6032f4bf7c74605395f31f2b",
		"copege": "6032fa797c74605395f31f5f",
		"wicked": "6032fab47c74605395f31f61",
		"hard": "603301507c74605395f31fa1",
		"kissabrother": "603306de7c74605395f31fbb",
		"teatime": "60333b0d7c74605395f320ea",
		"teatime2": "60333b377c74605395f320ec",
		"guitartime": "6033439f7c74605395f3210f",
		"okayge": "603349ea7c74605395f32129",
		"click": "60334fb57c74605395f32152",
		"easy": "603461887c74605395f329e6",
		"peeposteer": "6035a63a7c74605395f33357",
		"gawkgawk": "605008f0306b602acc59dbb9",
		"mahalo": "605a6e997493072efdeb3476",
		"wowers": "6063a39fa407570b72f282c7",
		"aaugh": "6063aa98a407570b72f28321",
		"peepees": "6063b0c3a407570b72f2837a",
		"noted": "60665f35a407570b72f296a0",
		"robpls": "606fc2ce39b5010444cfbb8c",
		"refracting": "609f0faf67644f1d67e86529",
		"grumpge": "60a7548f67644f1d67e8a27f",
		"eato": "60b44a3ff8b3f62601c35f26",
		"deadlole": "60e10bf58ed8b373e421d4a8",
		"corpa": "6121e47e76ea4e2b9f78a35f",
		"peeposhy": "6126e9e8af28e956864a23bf",
		"borpau": "612d6dc1af28e956864b0fac",
		"slap": "6132f9c3af28e956864bd1b2",
		"kachorpa": "6136f959af28e956864c563f",
		"geckpog": "615b961fb63cc97ee6d4dc42",
		"elyouel": "61871d291f8ff7628e6cc518",
		"hunger": "61eb460806fd6a9f5be1a098",
		"potl": "6222a4be06fd6a9f5be6348a",
	}

}
},{}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
// removal.js | reset / remove

module.exports = App => {

	App.resetData = function () {
		if (window.confirm(warnReset)) {
			this.updateData(this.default)
		}
	}

	App.deleteData = function () {
		if (window.confirm(warnDelete)) {
			window.localStorage.removeItem("tsdb")
			window.localStorage.setItem("ts-reset", true)
			window.location.reload()
		}
	}

}

const warnReset = `WARNING: You're about to reset your turnStyles Data! 
Clicking "OK" will reset turnStyles to default and reload the extension!
Click "CANCEL" if this is not what you intended to do!`

const warnDelete = `WARNING: You're about to DELETE the turnStyles DATABASE!
THIS WILL RELOAD THE WEB PAGE! USE AS A LAST RESORT!
Click "OK" to delete the turnStyles DB and start over!
Click "CANCEL" to go back to turntable!`
},{}],6:[function(require,module,exports){
// restore.js | backup / restore

module.exports = App => {

	App.backupData = function () {
		let config = JSON.stringify(this.config)
		let backup = new Blob([ config ], { type: "text/json" })
		// special use case for windows
		if (window.navigator.msSaveOrOpenBlob) {
			window.navigator.msSaveBlob(backup, "tsdb.json")
		}
		// otherwise go the HTML5 route
		else {
			let el = window.document.createElement("a")
			el.href = window.URL.createObjectURL(backup)
			el.download = "tsdb.json"
			document.body.appendChild(el)
			el.click()
			document.body.removeChild(el)
		}
	}

	App.uploadData = function () {
		let file = $("#tsBackup input")[0].files[0]
		if (!file) return alert("Select Backup File First")
		
		let Read = new FileReader()
		Read.onload = App.restoreData
		Read.readAsText(file)
	}

	App.restoreData = function (event) {
		let data = JSON.parse(event.target.result)
		if (data.hotbar && data.people) App.updateData(data)
		else alert("Error Reading Backup File")
	}

	App.updateData = function (data) {
		// use data if given, otherwise
		// reset all values to default
		data = data || {}
		for (let prop in data) {
			this.config[prop] = data[prop]
		}
		// save the new settings and reload
		let store = JSON.stringify(this.config)
		window.localStorage.setItem("tsdb", store)
		this.reload()
	}

}
},{}],7:[function(require,module,exports){
// session.js | handles storing tt data

module.exports = App => {

	App.initCache = function (room) {
		// define session
		this.current_djs = {}
		this.now_playing = {}
		this.last_played = {}
		// cache current activity
		this.cacheSong(room.currentSong)
		for (let id of room.djids) this.cacheDJ(id)
	}

	App.cacheDJ = function (e) {
		// find user by id (e) or event (e.user)
		let user = e.user ? e.user[0].userid : e
		// add them to cache if not there
		let curr = this.current_djs[user]
		if (!curr) this.current_djs[user] = getStats()
	}

	App.updateDJ = function (last) {
		// add last song to DJ stats 
		if (!last.song || !last.djid) return
		let curr = this.current_djs[last.djid]
		let data = getStats(curr, { ...last, spun: 1 })
		this.current_djs[last.djid] = data
	}

	App.resetDJ = function (e) {
		let user = e.user[0].userid
		let stat = statLine(this.current_djs[user])
		delete this.current_djs[user]
		this.Emit("dropped", e.user[0].name, stat)
	}

	App.cacheSong = function (e) {
		// check if attaching song (e) or new song (metadata)
		let song = e && e.room ? e.room.metadata.current_song : e
		let love = e && e.upvoters ? e.upvoters.length : 0
		let djid = song ? song.djid : false

		let last = { ...this.now_playing }
		let base = { djid, love, hate: 0, snag: 0 }
		let curr = song ? { ...song.metadata, ...base } : {}

		this.now_playing = curr
		this.last_played = last

		this.updateDJ(last)

		let name = curr.song || "none"
		this.Log(`new song: ${ name }`)
		this.Emit("tracked", statLine(last))
	}

	App.cacheVote = function (e) {
		// have to pull from the room
		this.now_playing.love = e.room.metadata.upvotes
		this.now_playing.hate = e.room.metadata.downvotes
	}

	App.cacheSnag = function () {
		// just increment snags
		this.now_playing.snag += 1
	}

	App.on("attach", App.initCache)
	App.on("add_dj", App.cacheDJ)
	App.on("rem_dj", App.resetDJ)
	App.on("snagged", App.cacheSnag)
	App.on("update_votes", App.cacheVote)
	App.on([ "nosong", "newsong" ], App.cacheSong)

}

const getStats = (curr, data) => {
	let base = { spun: 0, love: 0, hate: 0, snag: 0 }
	// add value from current stats and updated stats
	for (let p in curr || {}) if (p in base) base[p] += curr[p]
	for (let p in data || {}) if (p in base) base[p] += data[p]
	return base
}

const statLine = (obj = {}, str = "") => {
	if ("love" in obj) str += `${obj.love}❤️`
	if ("hate" in obj) str += `${obj.hate}💔`
	if ("snag" in obj) str += `${obj.snag}💖`
	if ("spun" in obj) str += `${obj.spun}▶️`
	return str
}
},{}],8:[function(require,module,exports){
// storage.js | saving our configs

module.exports = App => {

	App.readConfig = function () {
		let store = this.__sync || {}
		let local = window.localStorage.getItem("tsdb")
		local = local ? JSON.parse(local) : {}
		if ("theme" in store) this.Log(`loaded addon db`)
		if ("theme" in local) this.Log(`loaded local db`)
		return { ...store, ...local }
	}

	App.writeConfig = function () {
		let local = JSON.stringify(this.config)
		window.localStorage.setItem("tsdb", local)
	}

	App.initConfig = function () {
		// load and build config
		// but only do it once
		if (this.__base) return
		this.__base = window.tsBase
		this.__sync = window.tsSync
		this.__logo = `${ this.__base }/images/icon128.png`

		let storage = this.readConfig()
		let configs = { ...this.default, ...storage }
		let version = require("../package.json").version

		this.config = this.migrate(configs)
		this.config.version = version
		this.config.is_afk = false

		this.Emit("loaded", this.config)
	}

	App.saveConfig = function (e) {
		let item = e.target.dataset
		if (!item.opt && !item.for) return
		// figure out which item to save
		let name = item.for || item.opt
		let bool = e.target.type == "checkbox"
		let data = bool ? e.target.checked : e.target.value
		if (item.for) data = $(`*[data-opt="${ name }"]`).val()
		// and save the updated item
		this.setConfig(name, data, item.cat)
		// only emit visual changes in the lobby
		let visual = [ "style", "theme", "u_css", "hotbar", "macros" ]
		let update = !this.lobby || visual.includes(name)
		if (update) this.Emit("update", name, data, data.cat)
	}

	App.setConfig = function (name, data, cat) {
		if (!cat) this.config[name] = data
		else this.config[cat][name] = data
		this.writeConfig()
		// mirror values with window / hotbar
		let toggle = typeof data == "boolean"
		let mirror = $(`*[data-opt="${ name }"][data-cat="${ cat || "" }"]`)
		mirror.prop(toggle ? "checked" : "value", data)
	}

}
},{"../package.json":9}],9:[function(require,module,exports){
module.exports={
  "name": "turnStyles",
  "version": "10.6.3",
  "main": "turnStyles.js",
  "repository": "git@github.com:pixelcrisis/turntable-tweaks.git",
  "author": "pixelcrisis <pxcrisis@gmail.com>",
  "license": "MIT",
  "scripts": {
    "build": "sh bash/build.sh",
    "watch": "sh bash/watch.sh",
    "start": "sh bash/start.sh",
    "quick": "sh bash/quick.sh",
    "style": "sh bash/style.sh"
  },
  "devDependencies": {
    "autoprefixer": "^10.2.5",
    "babel-eslint": "^10.1.0",
    "browserify": "^17.0.0",
    "concurrently": "^6.0.0",
    "copy-and-watch": "^0.1.6",
    "eslint": "^7.22.0",
    "node-sass": "^7.0.1",
    "postcss": "^8.2.9",
    "postcss-cli": "^8.3.1",
    "sass": "^1.32.8",
    "tinyify": "^3.0.0",
    "watchify": "^4.0.0"
  },
  "dependencies": {}
}

},{}],10:[function(require,module,exports){
module.exports = App => {
	
	require("./themes.js")(App)
	require("./visual.js")(App)
	require("./volume.js")(App)
	require("./chat.js")(App)
	require("./quicktext.js")(App)
	require("./playlist.js")(App)
	require("./alerts.js")(App)
	require("./stats.js")(App)
	require("./away.js")(App)
	require("./autobop.js")(App)
	require("./reminder.js")(App)
	require("./nextdj.js")(App)
	require("./emotes.js")(App)

	App.on("loaded", function (config) {
		this.loadThemes(config)
		this.loadClasses(config)
	})

	App.on("attach", function () {
		this.autoBop()
		this.bindPlaylist()
	})

}
},{"./alerts.js":11,"./autobop.js":12,"./away.js":13,"./chat.js":14,"./emotes.js":15,"./nextdj.js":16,"./playlist.js":17,"./quicktext.js":18,"./reminder.js":19,"./stats.js":20,"./themes.js":21,"./visual.js":22,"./volume.js":23}],11:[function(require,module,exports){
// alerts.js | sending data to chat/notifications

module.exports = App => {

  App.notifyPMs = function (e) {
    if (this.config.notify.chat) this.Notify({
      head: `New PM ${e.$from ? `from: ${e.$from}` : ""}`,
      body: e.text, type: "pm_ping"
    })
  }

  App.notifyDings = function (e) {
    if (this.config.notify.ding && e.$ping) this.Notify({
      head: `[${this.view().roomData.name}] @${e.name}`,
      body: e.text, type: "chat_ping"
    })
    this.notifyText(e)
  }

  App.notifySong = function () {
    let curr = this.now_playing
    if (this.config.notify.song && curr.song) this.Notify({
      head: `Now Playing: ${curr.song}`, body: `By: ${curr.artist}`
    })
  }

  App.notifyText = function (e) {
    let match = e.text.toLowerCase()
    if (this.config.notify.text.length < 3) return
    let words = this.config.notify.text.toLowerCase().split(",")
    for (let word of words) if (match.indexOf(word.trim()) > -1) {
      $(".chat .messages .message:last-child").addClass("mention")
      return this.Notify({ head: `Hot Word: "${ word }"`, body: e.text })
    }
  }

  App.alertSnags = function (e) {
    if (this.config.alerts.snag) this.Post({
      head: e.$name, body: `has snagged this track!`, type: "snag"
    })
  }

  App.alertJoin = function (e) {
    if (this.config.alerts.join) for (let user of e.user) this.Post({
      head: user.name, body: "joined.", type: "join"
    })
  }

  App.alertLeft = function (e) {
    if (this.config.alerts.left) for (let user of e.user) this.Post({
      head: user.name, body: "left.", type: "left"
    })
  }

  App.on("pmmed", App.notifyPMs)
  App.on("speak", App.notifyDings)
  App.on("tracked", App.notifySong)
  App.on("snagged", App.alertSnags)
  App.on("registered", App.alertJoin)
  App.on("deregistered", App.alertLeft)

}
},{}],12:[function(require,module,exports){
// autobop.js | automatically bopping!

module.exports = App => {

	App.autoBop = function () {
		if (this.bop) clearTimeout(this.bop)
		if (!this.config.auto_b) return

		const delay = (Math.random() * 7) * 100
		const press = () => click(".awesome-button")
		this.bop = setTimeout(press, delay)
	}

	App.on("newsong", App.autoBop)

}

const click = el => {
  $(window).focus()
  const opts = { bubbles: true, cancelable: true, view: window }
  const elem = document.querySelectorAll(el)[0]
  const fire = new MouseEvent("click", opts)
  return !elem.dispatchEvent(fire)
}
},{}],13:[function(require,module,exports){
// away.js | respond to dings with an AFK message

module.exports = App => {

  App.setAfk = function (key, val, grp) {
    if (key != "is_afk" || grp) return
    if (val && this.config.afkstr) this.isAfk()
  }

  App.isAfk = function () {
    if (!this.config.afkstr) return
    this.Batch(this.config.afkstr)
  }

  App.getAfk = function (event) {
    if (!this.config.is_afk) return
    let check = this.config.afkstr.split(";;").map(s => s.trim())
    if (!event.$self && event.$ping) this.isAfk()

    else if (event.$self && !check.includes(event.text)) {
      this.setConfig("is_afk", false)
      this.Post({
        head: "Welcome Back!",
        body: "You're no longer AFK!"
      })
    }
  }

  App.on("speak", App.getAfk)
  App.on("update", App.setAfk)

}
},{}],14:[function(require,module,exports){
// chat.js | modifying the chatbox

module.exports = App => {

  App.fadeNewSong = function (el) {
    let last = $(el).children(".message").last()
    let user = last.has(".avatar").length
    let text = last[0].innerText.includes("started playing")
    if (!user && text) last.addClass("stat")
  }

  App.addTimeStamp = function (event) {
    if (!this.config.stamps) return
    let message = $(".chat .messages .message:last-of-type")
    let matches = message[0].innerText.indexOf(event.name) === 0
    let stamped = message.has(".timestamp").length
    if (matches && !stamped) {
      let stamp = this.now().split(":").slice(0, 2).join(":")
      message.prepend(`<div class="timestamp">${ stamp }</div>`)
    }
  }

  App.on("speak", App.addTimeStamp)
  App.on("newchat", App.fadeNewSong)

}
},{}],15:[function(require,module,exports){
// emotes.js | getting emotes from twitch/bttv

module.exports = App => {

	App.runEmote = function (event) {
		if (!this.config.emojis) return
		let text = event.text.split(" ")
		for (var i = 0; i < text.length; i++) {
			let icon = this.getEmote(text[i])
			if (icon) text[i] = icon
		}
		if (event.text !== text.join(" ")) {
			this.addEmote(event.text, text.join(" "))
		}
	}

	App.getEmote = function (str) {
		let find = this.findEmote(str)
		if (!find) return false

		let icon = this.findTwitchEmote(find)
		if (!icon) icon = this.findBTTVEmote(find)
		return icon
	}

	App.addEmote = async function (find, replace) {
		// check for replaced :P smileys
		if (find.indexOf(":p") > -1) find = find.split(":p")[0]
		let $el = $(".chat .messages .message:last-of-type .text")[0]
		if (!$el.innerHTML.indexOf(find) < 0) return
		$el.innerHTML = replace
	}

	App.findEmote = function (str) {
		let raw = str.split(":").join("").toLowerCase()
		let has = str[0] === ":" && str[str.length - 1] === ":"
		return has ? raw : false
	}

	App.findTwitchEmote = function (name) {
		let icon = this.twitchIcons[name]
		if (!icon) return false
		let base = `https://static-cdn.jtvnw.net/emoticons/v2/`
		return `<img src="${ base }/${ icon }/static/light/1.0">`
	}

	App.findBTTVEmote = function (name) {
		let icon = this.bttvIcons[name]
		if (!icon) return false
		let base = `https://cdn.betterttv.net/emote`
		return `<img src="${ base }/${ icon }/1x">`
	}

	App.on("speak", App.runEmote)

}
},{}],16:[function(require,module,exports){
// nextdj.js | handing auto DJing

module.exports = App => {

  App.nextDJ = function () {
    if (!this.config.nextdj) return
    let button = $(".become-dj").length
    if (!button) return this.Log("nextdj: no spot")
    this.Log("nextdj: attempting jump")
    this.View().becomeDj()
  }

  App.spinning = function (event) {
    if (!this.config.nextdj) return
    if (this.User().id != event.user[0].userid) return

    this.setConfig("nextdj", false)
    let head = "You've hopped on deck!"
    let body = "NextDJ has been disabled."
    this.Notify({ head, body })
    this.Post({ head, body })
  }

  App.autoQueue = function (event) {
    if (!this.config.auto_q) return
    let matches = this.config.q_text
    if (event.text.indexOf(matches) > -1) this.View().becomeDj()
  }

  App.on("add_dj", App.spinning)
  App.on([ "update", "rem_dj" ], App.nextDJ)
  App.on([ "speak", "pmmed"], App.autoQueue)

}
},{}],17:[function(require,module,exports){
// playlist.js | modifying the playlist

module.exports = App => {

  App.bindPlaylist = function () {
    this.countPlaylist()
    this.checkPlaylist()
    this.classes("played", this.config.played)
  }

  App.countPlaylist = function () {
    let head = $("#playlist-header .text")[0]
    let data = window.playlist.fileids.length
    let name = head.innerHTML.split("<em>")[0]
    head.innerHTML = `${ name } <em>${ data }</em>`
  }

  App.checkPlaylist = function () {
    $(".song.ts_played").removeClass("ts_played")
    if (!this.config.played) return

    let list = this.Room().metadata.songlog
    $("#queue .songs .song").each(function () {
      let el = $(this)
      let name = el.find(".title").text()
      let band = el.find(".details").text().split(" • ")[0]
      for (let item of list) {
        let { song, artist } = item.metadata
        if (song == name && artist == band) el.addClass("ts_played")
      }
    })
  }

  App.updatePlaylist = function (key, val) {
    if (key == "played") this.classes("played", val)
  }

  App.on("update", App.updatePlaylist)
  App.on("playlist", App.countPlaylist)
  App.on([ "tracked", "playlist" ], App.checkPlaylist)

}
},{}],18:[function(require,module,exports){
// quicktext.js | sending rapid messages

module.exports = App => {

	App.qtbtns = function (i) {
		let text = this.config.qtbtns[`qtbtn${ i }`]
		if (!text) return

		// remove the label
		if (text.indexOf("||") > -1) text = text.split("||")[1].trim()
		this.Batch(text)
	}

	// easy inline onlick access
	App.qtbtn1 = function () { this.qtbtns('1') }
	App.qtbtn2 = function () { this.qtbtns('2') }
	App.qtbtn3 = function () { this.qtbtns('3') }

}
},{}],19:[function(require,module,exports){
// reminder.js | text at an interval

module.exports = App => {

	App.sendReminder = function (ran) {
		if (!this.config.timing.text) return
		let freq = parseInt(this.config.timing.post)
		let text = `[${ this.Room().name }] ${ this.config.timing.text }`
		if ((ran % freq) === 0 && this.config.timing.text) this.Chat(text)
	}

	App.on("heartbeat", App.sendReminder)

}
},{}],20:[function(require,module,exports){
// stats.js | tracking and posting song/dj stats

module.exports = App => {

  App.songStats = function (stat) {
    let last = this.last_played
    if (this.config.alerts.song && stat) this.Post({
      head: stat,
      body: `${last.song} by ${last.artist}`,
      type: "stat"
    })
  }

  App.djStats = function (name, stat) {
    if (this.config.alerts.spun) this.Post({
      head: `${name} - ${stat}`,
      body: ` - is done spinning!`,
      type: "stat"
    })
  }

  App.userStats = function (id) {  
    if ($(".profile.modal .statslink").length) return
    // force the web links section to be visible
    $(".profile.modal .section.web-links").show()
    $(".profile.modal .website").append(statLink(id))
  }

  App.on("tracked", App.songStats)
  App.on("dropped", App.djStats)
  App.on("profile", App.userStats)

}

const statLink = id => `
  <a target="_blank" class="statslink" onclick="$('.modal .close-x')[0].click()"
    href="https://thompsn.com/turntable/leaderboard/thing/?id=${ id }">
    Leaderboard
  </a>
`
},{}],21:[function(require,module,exports){
// themes.js | handles loading/reloading themes/styles

module.exports = App => {

  App.loadThemes = function (config) {
    $("#ts_core, #ts_themes, #ts_styles, #ts_css").remove()
    
    this.insert("turnStyles")
    this.insert(config.theme, "themes")
    this.insert(config.style, "styles")
    this.inject(config.u_css)
    this.themed(config.theme)
  }

  App.updateThemes = function (key, val) {
    if (key == "theme") this.themed(val)
    if (key == "theme") this.insert(val, "themes")
    if (key == "style") this.insert(val, "styles")
    if (key == "u_css") this.inject(val)
  }

  App.insert = function (file, folder) {
    let base = `${ this.__base }${ folder ? `/${ folder }` : "" }`
    let path = file ? `${ base }/${ file }.css?v=${ Math.random() }` : "#"

    let id = `ts_${ folder || "core" }`
    let el = $(`#${ id }`)
    if (!el.length) document.head.append(link(id, path))
    else el.attr("href", path)

    if (path != "#") this.Log(`inserted: ${ path.split("?v")[0] }`)
  }

  App.inject = function (style) {
    let el = $("#ts_css")
    if (el.length) el[0].innerHTML = style
    else document.head.append(css(style))
    if (style) this.Log(`injected: ${ style }`)
  }

  App.themed = function (theme) {
    this.classes("th-none", !theme) 
    let last = $("body").data("theme")
    if (last) $("body").removeClass(`th-${ last }`)
    if (theme) $("body").addClass(`th-${ theme }`)
    $("body").data("theme", theme)
  }

  App.on("update", App.updateThemes)

}

// create a link element
const link = (id, url) => {
  let el = document.createElement('link'); el.id = id; 
  el.type = "text/css"; el.rel = "stylesheet"; el.href = url;
  return el
}

// create our user style element
const css = style => {
  let el = document.createElement('style'); el.id = "ts_css";
  el.type = "text/css"; el.innerHTML = style;
  return el
}
},{}],22:[function(require,module,exports){
// visual.js | changing and toggling elements

module.exports = App => {

	App.loadClasses = function (config) {
		this.classes("logger", config.logger)
		this.classes("no_bub", !config.bubble)
		this.classes("no_aud", !config.people)
		this.classes("no_vid", !config.player)

    this.classes("hb-is_afk", !config.hotbar.is_afk)
    this.classes("hb-auto_b", !config.hotbar.auto_b)
    this.classes("hb-auto_q", !config.hotbar.auto_q)
    this.classes("hb-nextdj", !config.hotbar.nextdj)
    this.classes("hb-bubble", !config.hotbar.bubble)
    this.classes("hb-people", !config.hotbar.people)
    this.classes("hb-player", !config.hotbar.player)
    this.classes("hb-qtbtn1", !config.hotbar.qtbtn1)
    this.classes("hb-qtbtn2", !config.hotbar.qtbtn2)
    this.classes("hb-qtbtn3", !config.hotbar.qtbtn3)
	}

	App.updateClasses = function (key, val, grp) {
    if (key == 'bubble') this.classes('no_bub', !val)
    if (key == 'player') this.classes('no_vid', !val)
    if (key == 'people') this.classes('no_aud', !val)
    if (key == 'logger') this.classes('logger', val)

    if (grp == "hotbar") {
      if (key == "is_afk") this.classes('hb-is_afk', !val)
      if (key == "auto_b") this.classes('hb-auto_b', !val)
      if (key == "auto_q") this.classes('hb-auto_q', !val)
      if (key == "nextdj") this.classes('hb-nextdj', !val)
      if (key == "bubble") this.classes('hb-bubble', !val)
      if (key == "people") this.classes('hb-people', !val)
      if (key == "player") this.classes('hb-player', !val)
      if (key == "qtbtn1") this.classes('hb-qtbtn1', !val)
      if (key == "qtbtn2") this.classes('hb-qtbtn2', !val)
      if (key == "qtbtn3") this.classes('hb-qtbtn3', !val)
    }

    if (grp == "hotbar" || grp == "qtbtns") {
      this.bindHotBar()
    }
	}

	App.on("update", App.updateClasses)

}
},{}],23:[function(require,module,exports){
// volume.js | replace the turntable volume

module.exports = App => {
	// why doesn't turntable use standard linear volumes?
	const convertVol = x => Math.log(x / 100) / Math.LN2 + 4
	const currentVol = e => {
		// get the volume (in real numbers) from tt
		let curr = e || window.util.getSetting("volume")
		return 100 * Math.pow(2, curr - 4)
	}
	// get the volume from tt, but make it spicy
	const naturalVol = () => convertVol(currentVol())

	// load volume functionality
	App.loadVolume = function () {
		let opt = this.config.volume
		let has = $("body").hasClass("ts_vol")
		this.classes("ts_vol", opt)

		// stash a copy of realVolume
		let rV = window.turntablePlayer.realVolume
		if (!this.realVolume) this.realVolume = rV

		// turn volume control on or off 
		if (opt && !has) this.addVolume()
		if (has && !opt) this.remVolume()
	}

	// inject our volume UI into tt
	App.addVolume = function () {
		$(".header-content").append(volume(currentVol()))
		// bind up our events
		const scroll = "DOMMouseScroll mousewheel"
		$("#tsMute")  .on("click", this.muteVolume.bind(this))
		$("#tsSlider").on("input", this.saveVolume.bind(this))
		$("#tsSlider").on( scroll, this.rollVolume.bind(this))
	}

	// remove our volume UI from tt
	App.remVolume = function () {
		$("#tsVolume").remove()
		window.turntablePlayer.realVolume = this.realVolume
	}

	// update volume on ts volume change
	App.saveVolume = function (vol) {
		vol = vol.target ? vol.target.value : vol
		let volume = vol > 0 ? convertVol(vol) : -7
		// turntable doesn"t natively go lower than 7
		let volFunc = volume < 7 ? currentVol : this.realVolume
		window.turntablePlayer.realVolume = volFunc
		window.turntablePlayer.setVolume(volume)
		window.util.setSetting("volume", volume)
	}

	// handle scrolling on volume slider
	App.rollVolume = function (e) {
		let curr = currentVol()
		let down = e.originalEvent.deltaY > 0
		// step volume by 5 vs 1 if holding shift
		let step = e.originalEvent.shiftKey ? 1 : 5
		let save = down ? (curr - step) : (curr + step)
		save = save < 0 ? 0 : save > 100 ? 100 : save

		$("#tsSlider")[0].value = save
		this.saveVolume(save)
		return false // don"t interrupt event flow
	}

	// temp mute on volume icon click
	App.muteVolume = function () {
		// toggle mute on/off
		this.muted = !this.muted
		this.classes("ts_muted", this.muted)
		let vol = this.muted ? -3 : naturalVol()
		window.turntablePlayer.setVolume(vol)

		this.Log(`turned mute ${ this.muted ? "on" : "off" }`)
	}

	// unmute after every song
	App.checkMuted = function () {
		if (this.muted) this.muteVolume()
	}

	// reload music players
	App.fixMusic = () => {
		let yt = window.youtube
		let sc = window.soundcloudplayer

		// update the song delay as time of refresh
		// then resume the song to force an update
		if (sc.song) {
			sc.songTime = sc.player.currentTime() / 1e3
			sc.previewStartTime = Date.now() - 1000
			sc.resumeSong(sc.song)
		}

		if (yt.song) {
			yt.songTime = yt.player[0].getCurrentTime()
			yt.previewStartTime = Date.now() - 3000
			yt.resumeSong(yt.song)
		}

		// close the panel on finish
		$("#tsPanel").removeClass("active")
	}

	// bind our volume events
	App.on("attach",  App.loadVolume)
	App.on("update",  App.loadVolume)
	App.on("nosong" , App.checkMuted)
	App.on("newsong", App.checkMuted)

}

const volume = val => `
  <div id="tsVolume">
    <span id="tsMute"></span>
    <input id="tsSlider" type="range" min="0" max="100" value="${ val }">
    <em id="tsMuted">Muted For One Song</em>
  </div>
`
},{}],24:[function(require,module,exports){
let turnStyles = window.$tS = {}
// a thing by pixelcrisis

require("./vitals/_import.js")(turnStyles)
require("./config/_import.js")(turnStyles)
require("./window/_import.js")(turnStyles)
require("./plugin/_import.js")(turnStyles)

const ts_url = "https://ts.pixelcrisis.co"
const update = `Oops! Something went wrong with turnStyles! 
If this is a bookmarklet, you may need to update it.
To update, view the ts website at ${ ts_url } 
Clicking OK will attempt to open the turnStyles website in a new tab.`

const init = () => {
	// throw errors for older plugins
	if (!window.tsBase) {
		let update = () => window.open(ts_url, "_blank")
		if (window.confirm(issues)) update()
		return false
	}

	turnStyles.attach()
}

init()
},{"./config/_import.js":1,"./plugin/_import.js":10,"./vitals/_import.js":25,"./window/_import.js":32}],25:[function(require,module,exports){
module.exports = App => {

  App.now = () => new Date().toLocaleTimeString("en-us")
  App.cap =  s => s[0].toUpperCase() + s.substring(1)

  App.classes = (name, on) => {
    // toggle classes on the DOM
    let has = $('body').hasClass(name)
    if (on && !has) $('body').addClass(name)
    if (has && !on) $('body').removeClass(name)
  }

  require("./ttlink.js")(App)
  require("./events.js")(App)
  require("./timing.js")(App)
  require("./logger.js")(App)
  require("./notify.js")(App)
  require("./attach.js")(App)

  App.on("attach", function () {
    this.bindLogs()
    this.bindTimer()
    this.canNotify()
  })

}
},{"./attach.js":26,"./events.js":27,"./logger.js":28,"./notify.js":29,"./timing.js":30,"./ttlink.js":31}],26:[function(require,module,exports){
// attach.js | connect app to the turntable room

module.exports = App => {

	App.attach = function () {
		this.initConfig()
		const core = window.turntable
		if (!core) return this.Log("No room")
		const user = window.turntable.user

		this.lobby = $("#turntable #topBG").length
		if (this.lobby) {
			this.bindHotBar()
			this.bindWindow()
			return false
		}
		// loop and check until the room is fully loaded
		const again = () => setTimeout(App.attach.bind(this), 150)

		if (!user) return again()
		let room = findKey(core, "roomId")
		if (!room) return again()
		let full = findKey(room, "roomData")
		if (!full) return again()

		// fully loaded!
		this.listener = this.listen.bind(this)
		window.turntable.addEventListener("message", this.listener)
		this.Emit("attach", room)
		this.Log("loaded room")
	}

	App.reload = function () {
		clearInterval(this.heart)
		window.turntable.removeEventListener("message", this.listener)
		$(`script[src*="turnStyles.js"]`).remove()

		const script = document.createElement("script")
		script.src = `${ this.__base }/turnStyles.js?v=${ Math.random() }`
		script.type = "text/javascript"

		this.Log("reloading")
		document.body.append(script)
	}

}

// find property by key in an object
const findKey = (obj, key) => {
  const exists = o => o !== null && typeof o != "undefined" && o[key]
  for (let prop in obj) if (exists(obj[prop])) return obj[prop]
}
},{}],27:[function(require,module,exports){
// events.js | trigger internal events

module.exports = App => {

	App.on = function (keys, ...list) {
		// bind list of functions to event list
		if (!this.events) this.events = {}
		if (!Array.isArray(keys)) keys = [ keys ]

		for (let key of keys) {
			if (!this.events[key]) this.events[key] = []
			for (let f of list) this.events[key].push(f.bind(this))
		}
	}

	App.Emit = function (key, ...args) {
		// fire functions bound to events
		let list = this.events[key]
		if (list) for (let f of list) f(...args)
	}

	App.listen = function (event) {
		if (!event.command) return
		// listen to/parse turntable events
		event.$ping = this.findPing(event.text)
		event.$name = this.findName(event.userid)
		event.$from = this.findName(event.senderid)
		event.$self = this.User().id == event.userid
		this.Emit(event.command, event)
	}

	App.watcher = function () {
		let Observe = window.MutationObserver || window.WebKitMutationObserver
		let Watcher = new Observe(function (mutations) {
			for (let changed of mutations) {
				let el = changed.target

				if (el.className == "songs") App.Emit("playlist")
				if (el.className == "messages") App.Emit("newchat", el)

				if (el.nodeName == "TITLE" && el.baseURI.indexOf("profile/") > -1) {
					App.Emit("profile", el.baseURI.split("profile/")[1])
				}
			}
		})
		Watcher.observe(document, { subtree: true, childList: true })
	}

	App.on("attach", App.watcher)

}
},{}],28:[function(require,module,exports){
// logger.js | print logs in console and room

module.exports = App => {

	App.Log = function (str) {
		let perm = this.config ? this.config.debug : true
		if (perm) console.info(`[${ this.now() }] turnStyles :: ${ str }`)
		this.addLog(`[tS - ${ this.now() }]<span>${ clean(str) }</span>`)
	}

	App.addLog = function (log) {
		this.logBook.push(log)
		let book = $("#tsLogs")[0]
		let logs = this.logBook.length
		if (logs > 50) this.logBook.shift()
		if (book) {
			book.innerHTML = this.logBook.reverse().join("<br />")
			book.scrollTop = book.scrollHeight
		}
	}

	App.bindLogs = function () {
		$("#tsLogs").remove()
		$(".room-info-nav").after(`<div id="tsLogs"></div>`)
	}

	// log events
	App.on("update", function (key, val) {
		this.Log(`update: [${ key }] to (${ val })`)
	})

	App.on("registered", function (event) {
		for (let user of event.user) {
			this.Log(`[${ user.name }](${ user.userid }) joined.`)
		}
	})

	App.on("deregistered", function (event) {
		for (let user of event.user) {
			this.Log(`[${ user.name }](${ user.userid }) left.`)
		}
	})

	App.on("add_dj", function (event) {
		let id = event.user[0].userid
		this.Log(`add dj: [${ this.findName(id) }](${ id })`)
	})

	App.on("rem_dj", function (event) {
		let id = event.user[0].userid
		this.Log(`rem dj: [${ this.findName(id) }](${ id })`)
	})

	App.on("update_votes", function (event) {
		let list = event.room.metadata.votelog
		let last = list[list.length - 1]
		this.Log(`[${ this.findName(last[0]) }] voted: ${ last[1] }`)
	})

	App.logBook = []

}

const clean = str => {
  // trim inserted URL file paths
  if (str.indexOf('inserted:') == 0) {
    let path = str.split('/')
    return `inserted: ${path[path.length - 1]}`
  }
  return str
}
},{}],29:[function(require,module,exports){
// notify.js | manage notifications

module.exports = App => {

  App.Notify = function (alert) {
    if (!this.canNotify() || document.hasFocus()) return
    let { head, body, type } = alert, icon = this.__logo

    let ding = () => {
      let sent = new Notification(head, { icon, body })
      sent.onclick = () => { window.focus(); sent.close() }
    }
    // delay notifications with types to prevent spam
    return type ? this.delay(ding, 5, type) : ding()
  }

  App.canNotify = function () {
    let cfg = this.config.notify
    let has = cfg.chat || cfg.song || cfg.ding
    if (!has || !("Notification" in window)) return false
    if (Notification.permission === "denied") return false
    if (Notification.permission === "default") {
      this.Log("requesting notification permissions")
      Notification.requestPermission()
      return false
    }
    return true
  }

  App.on("update", App.canNotify)

}
},{}],30:[function(require,module,exports){
// timing.js | internal loop and delays

module.exports = App => {

	App.beat = function () {
		let beat = parseInt(this.config.timing.beat) + 1
		this.config.timing.beat = beat
		this.Emit("heartbeat", beat)
	}

	App.bindTimer = function () {
		this.holding = {}
		this.heart = setInterval(App.beat.bind(this), 60 * 1000)
	}

	App.delay = function (func, delay, key) {
		if (!this.holding) this.holding = {}
		if (this.holding[key]) return

		let timeout = delay * 1000
		let cleared = () => { delete this.holding[key] }
		this.holding[key] = setTimeout(cleared.bind(this), timeout)

		if (func) func()
	}

}
},{}],31:[function(require,module,exports){
// ttlink.js | interacting with turntable

module.exports = App => {

	App.User = () => window.turntable.user
	App.View = () => window.turntable.topViewController
	App.Chat = () => window.turntable.buddyList.pmWindows
	App.Room = () => window.turntable.topViewController.roomData

	App.findName = function (id = "Unknown") {
		let User = this.View().userMap[id]
		if (User) return User.attributes.name

		let Chat = this.Chat() ? this.Chat()[id] : false
		if (Chat) return Chat.otherUser.attributes.name
		
		return id
	}

	App.findPing = function (str = "") {
		let ping = `@${ this.User().attributes.name }`
		return str.toLowerCase().indexOf(ping.toLowerCase()) > -1
	}

	App.Post = function (alert) {
		$(".chat .messages").append($post(alert))
		this.View().updateChatScroll()
	}

	App.Chat = function (text) {
		window.turntable.sendMessage({
			api: "room.speak",
			roomid: this.View().roomId,
			section: this.View().section,
			text
		})
	}

	App.Batch = function (text) {
		text = text.split(";;")
		if (text.length > 3) this.Post({
			head: "Send Error!",
			body: `Message contains ${ text.length }/3 Messages.`
		})
		else for (let msg of text) this.Chat(msg.trim())
	}

}

const $post = obj => `
  <div class="message ${ obj.type || '' }"><em>
    <span class="subject">${ obj.head || '' }</span>
    <span class="text">${ obj.body || '' }</span>
  </em></div>
`
},{}],32:[function(require,module,exports){
module.exports = App => {

  require("./layout.js")(App)
  require("./tabbed.js")(App)
  require("./hotbar.js")(App)
  require("./window.js")(App)

  App.on("attach", function () {
    this.bindHotBar()
    this.bindWindow()
  })

}
},{"./hotbar.js":33,"./layout.js":34,"./tabbed.js":35,"./window.js":36}],33:[function(require,module,exports){
// hotbar.js | our hover menu bar

module.exports = App => {

  App.bindHotBar = function () {
    $("#tsHotBar").remove()
    $(".header-bar").append( HotBar() )

    $("#tsOpen").on("click", () => $("#tsWindow").addClass("active"))
    $("#tsHotBar *[data-for]").on("click", this.saveConfig.bind(this))
    $("#tsHotBar *[data-opt]").on("change", this.saveConfig.bind(this))
  }

  const HotBar = () => `
    <div id="tsHotBar">
      ${ App.$button("☰", false, "tsOpen") }
      ${ App.$toggle("is_afk", "AFK", false, 'hbIsAfk') }
      ${ App.$toggle("auto_b", "Autobop", false, 'hbAutoB') }
      ${ App.$toggle("auto_q", "AutoQueue", false, 'hbAutoQ') }
      ${ App.$toggle("nextdj", "Next DJ", false, 'hbNextDJ') }

      ${ App.$qtbtn("1") } ${ App.$qtbtn("2") } ${ App.$qtbtn("3") }

      ${ App.$toggle("bubble", "Bubbles", false, "hbBubbles") }
      ${ App.$toggle("people", "People", false, "hbPeople") }
      ${ App.$toggle("player", "Player", false, "hbPlayer") }
    </div>
  `

}
},{}],34:[function(require,module,exports){
// layout.js | internal templating

module.exports = App => {

  App.$button = (name, item, id, func) => `
    <button class="ts-button" ${ id ? `id="${ id }"` : '' }
      ${ item ? `data-for="${ item }"` : '' }
      ${ func ? `onclick="$tS.${ func }()"` : '' }>
      ${ name }
    </button>
  `

  App.$toggle = function (item, name, group, id) { 
    return `
    <label class="ts-toggle" ${ id ? `id="${ id }"` : '' }>
      <input type="checkbox" 
        data-opt="${ item }" data-cat="${ group || '' }"
        ${ getValue(this.config, item, group) ? 'checked' : ''} />
      <span></span> ${ name }
    </label>`
  }

  App.$string = function (item, name, group) { return `
    <input type="text" class="ts-inputs"
      data-opt="${ item }" data-cat="${ group || '' }"
      value="${ getValue(this.config, item, group) }" />
    ${ this.$button(name, item) }`
  }

  App.$field = function (item, name, group) { return `
    <textarea class="ts-inputs" rows="10"
      data-opt="${ item }" data-cat=${ group || '' }>
      ${ getValue(this.config, item, group) }
    </textarea>
    ${ this.$button(name, item) }`
  }

  App.$select = function (list, group) { return `
    <select class="ts-choice"
      data-opt="${ list }" data-cat="${ group || '' }">
      <option value="">No ${ this.cap(list) }</option>
      ${ getOptions(this.options, this.config, list, group) }
    </select>`
  }

  App.$qtbtn = function (i) {
    let name = `qtbtn${i}`
    let data = this.config.qtbtns[name]
    let text = `QT${i}`
    // parse label
    if (data.indexOf('||') > -1) {
      data = data.split('||')
      text = data.shift()
      data = data.join(' ')
    }
    return this.$button(text, false, name, name)
  }

}

const getValue = function (config, item, group) {
  return group ? config[group][item] : config[item]
}

const getOptions = function (options, config, list, group) {
  let value = getValue(config, list, group)
  return Object.keys(options[list]).map(data => {
    let name = options[list][data]
    let curr = data == value ? 'selected' : ''
    return `<option value="${ data }" ${ curr }>${ name }</option>`
  }).join('')
}
},{}],35:[function(require,module,exports){
// tabbed.js | defining our window tabs

module.exports = App => {

  App.tabs = [ 
    "General",
    "Visual",
    "Hotbar",
    "Alerts",
    "Support" 
  ]

  App.tabbed = {
    General: () => tabContent("General", `
      <h3>Automate</h3>
      <h5>${ App.$toggle("auto_b", "Enable Autobop") }</h5>
      <p>Vote "Awesome" after every new song starts, automatically!</p>

      <h5>${ App.$toggle("nextdj", "Take Next DJ Spot") }</h5>
      <p>turnStyles will attempt to add you as a DJ when a spot becomes available.</p>

      <h5>${ App.$toggle("auto_q", "Enable AutoQueue") }</h5>
      ${ App.$string("q_text", "Save Queue Ping") }
      <p>For bots with a queue: Paste your queue ping above to auto DJ on ping!</p>

      <h3>General</h3>
      <h5>${ App.$toggle("is_afk", "Currently AFK" ) }</h5>
      ${ App.$string("afkstr", "Save AFK Response") }
      <p>Sends the AFK Response when you go AFK, and when you're pinged while AFK.</p>

      <h5>${ App.$toggle("volume", "Override Volume") }</h5>
      <p>Move volume controls out of the menu, and adds Mute For One Song.</p>
    `, true),

    Visual: () => tabContent("Visual", `
      <h3>Theme/Style</h3>
      ${ App.$select("theme") }
      ${ App.$select("style") }

      <h3>Visual Tweaks</h3>
      <h5>${ App.$toggle("played", "Show Recently Played") }</h5>
      <p>Highlights songs in playlist that were recently played in the room.</p>

      <h5>${ App.$toggle("stamps", "Add Timestamps To Chat") }</h5>
      <p>Adds a timestamp to the right of room chat messages.</p>

      <h5>${ App.$toggle("emojis", "Use Twitch/BTTV Emojis")}</h5>
      <p>Use the <strong>:emoji:</strong> format to access external emojis.<br>
      <em>note: can only be seen by other turnStyles users!</em><br>
      <em>note: using this disables the :P emoji!</em></p>

      <h3>Turntable</h3>
      ${ App.$toggle("bubble", "Show Chat Bubbles") }
      ${ App.$toggle("people", "Show Room Audience") }
      ${ App.$toggle("player", "Show Video Player") }

      <h3>Custom CSS</h3>
      ${ App.$field("u_css", "Save & Apply Styles") }
      <p>Add your own custom CSS snippets to turntable!</p>
    `),

    Hotbar: () => tabContent("Hotbar", `
      <h3>QuickText</h3>
      <h5>${ App.$toggle("qtbtn1", "Enable QT 1", "hotbar") }</h5>
      ${ App.$string("qtbtn1", "Save QT 1", "qtbtns") }
      <p>Send your most common messages at the push of a button!</p>

      <h5>${ App.$toggle("qtbtn2", "Enable QT 2", "hotbar") }</h5>
      ${ App.$string("qtbtn2", "Save QT 2", "qtbtns") }
      <p>Prefix with <strong>label || </strong> to add a button label!</p>
      <kbd>hello || hello world!</kbd>

      <h5>${ App.$toggle("qtbtn3", "Enable QT 3", "hotbar") }</h5>
      ${ App.$string("qtbtn3", "Save QT 3", "qtbtns") }
      <p>Send multiple by adding <strong>;;</strong></p>
      <kbd>welcome || Hello! || Rules! || Gif!</kbd>

      <h3>Show In Hotbar</h3>
      ${ App.$toggle("is_afk", "AFK", "hotbar") }
      ${ App.$toggle("auto_b", "Autobop", "hotbar") }
      ${ App.$toggle("auto_q", "AutoQueue", "hotbar") }
      ${ App.$toggle("nextdj", "Next DJ", "hotbar") }
      ${ App.$toggle("bubble", "Chat Bubble Toggle", "hotbar") }
      ${ App.$toggle("people", "Audience Toggle", "hotbar") }
      ${ App.$toggle("player", "Player Toggle", "hotbar") }
    `),

    Alerts: () => tabContent("Alerts", `
      <h3>Hot Words</h3>
      ${ App.$string("text", "Save Hot Words", "notify") }
      <p>Desktop Notifications/Highlight Message on word match in chat. Use more than one in a comma separated list.</p>

      <h3>Notify</h3>
      ${ App.$toggle("chat", "On New PM", "notify") }
      ${ App.$toggle("ding", "On New Mention", "notify") }
      ${ App.$toggle("song", "On New Songs", "notify") }
      <p>Send Desktop Notifications</p>

      <h3>Alerts</h3>
      ${ App.$toggle("song", "Last Song Stats", "alerts") }
      ${ App.$toggle("spun", "Last DJ Stats", "alerts") }
      ${ App.$toggle("snag", "Song Snags", "alerts") }
      ${ App.$toggle("join", "On User Join", "alerts") }
      ${ App.$toggle("left", "On User Leave", "alerts") }
      <p>Alerts show up in room chat but are only visible to you.</p>

      <h3>Reminder</h3>
      ${ App.$select("remind", "timing") }
      ${ App.$string("text", "Save Reminder", "timing") }
      <p>Sends Reminder to room at the selected interval! Useful for themes, rules, whatever you like!</p>
    `),

    Support: () => tabContent("Support", `
      <h3>Debug</h3>
      ${ App.$toggle("debug", "Print Logs In Console") }
      ${ App.$toggle("logger", "Show Logs In Room Tab") }
      <div style="width: 0px;height: 10px;"></div>
      ${ App.$button("Reload turnStyles", false, false, "reload") }
      ${ App.$button("Reload Players", false, false, "reloadMusic") }

      <h3>turnStyles Data</h3>
      ${ App.$button("Backup", false, false, "backupData") }
      <label id="tsBackup" class="ts-button"><input type="file">Restore</label>
      ${ App.$button("Reset", false, false, "resetData") }
      ${ App.$button("Delete", false, false, "deleteData") }

      <h3>Support</h3>
      <a href="https://discord.gg/wqmAVvgSbE" class="ts-button" target="_blank">turnStyles Discord</a>
      <a href="https://discord.gg/jnRs4WnPjM" class="ts-button" target="_blank">turntable.fm Discord</a>

      <h3>Sharing</h3>
      <a href="https://chrome.google.com/webstore/detail/turntable-tweaks/pmlkackfnbbnjfejpddpakallilkbdme" class="ts-button" target="_blank">Chrome / Opera</a>
      <a href="https://addons.mozilla.org/en-US/firefox/addon/turnstyles-for-turntable-fm/" class="ts-button" target="_blank">Firefox</a>
      <a href="https://ts.pixelcrisis.co" class="ts-button" target="_blank">Bookmarklet</a>
      <a href="https://ts.pixelcrisis.co" class="ts-button" target="_blank">Beta</a>

      <h3>Author</h3>
      <em>turnStyles v${ App.config.version }<em><br />
      <strong>@crisis</strong> on Discord<br />
      <strong>@crisis</strong> on Turntable<br />
      <a target="_blank" href="https://patreon.com/pixelcrisis">patreon.com/pixelcrisis</a><br />
      <em>Request Themes & More on Patreon!</em>
    `)
  }

}

const tabContent = (name, content, active) => `
  <div class="ts-tabbed ${ active ? "active" : "" }" 
    data-tab="${ name }">${ content }</div>
`
},{}],36:[function(require,module,exports){
// window.js | our settings window

module.exports = App => {

  App.bindWindow = function () {
    $("#tsWindow").remove()
    $("body").append(`<div id="tsWindow">${ Options() }</div>`)

    $("#tsClose").on("click", () => $("#tsWindow").removeClass("active"))
    $("#tsWindow *[data-for]").on("click", this.saveConfig.bind(this))
    $("#tsWindow *[data-opt]").on("change", this.saveConfig.bind(this))

    $(".ts-tab").on("click", e => {
      let target = e.target.dataset.tab
      $("#tsWindow .active").removeClass("active")
      $(`*[data-tab="${ target }"]`).addClass("active")
    })

    $("#tsBackup input").on("change", this.uploadData)
    $("#tsWindow").on("click", function (event) {
      let click = event.target == this
      if (click) $("#tsWindow").removeClass("active")
    })
  }
  
  const Options = () => `
    <div id="tsConfig">
      <nav>
        <h2><span id="tsClose">✖</span>turnStyles</h2>
        ${ App.tabs.map(tab => `
            <div data-tab="${ tab }" 
              class="ts-tab ${ tab == "General" ? "active" : "" }">
              ${ tab }
            </div>`).join('') }
      </nav>
      ${ App.tabs.map(tab => App.tabbed[tab]()).join('') }
    </div>
  `

}
},{}]},{},[24]);
