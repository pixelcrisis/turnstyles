module.exports = TS => {

	// our plugins! (features!)
	require("./visual.js")(TS)
	require("./player.js")(TS)
	require("./volume.js")(TS)
	require("./alerts.js")(TS)
	require("./idling.js")(TS)
	require("./remind.js")(TS)
	require("./ondeck.js")(TS)
	require("./emojis.js")(TS)
	require("./suggest.js")(TS)
	require("./patrons.js")(TS)
	require("./autoBop.js")(TS)
	require("./roomTab.js")(TS)
	require("./chatTab.js")(TS)
	require("./songTab.js")(TS)

}