// debugs.js | log default events for debug

module.exports = App => {

  App.logJoin = function (e) {
    for (let u of e.user) {
      this.Log(`[join] ${ user.name }`, user.userid)
    }
  }

  App.logLeft = function (e) {
    for (let u of e.user) {
      this.Log(`[left] ${ user.name }`, user.userid)
    }
  }

  App.logNewDJ = function (e) {
    let user = e.user[0].userid
    let name = this.findName(user)
    this.Log(`[new dj] ${ name }`, user)
  }

  App.logOldDJ = function (e) {
    let user = e.user[0].userid
    let name = this.findName(user)
    this.Log(`[old dj] ${ name }`, user)
  }

  App.logVote = function (e) {
    let list = e.room.metadata.votelog
    let last = list[ list.length - 1 ]
    let user = last[0], vote = last[1]
    let name = this.findName(last[0])
    this.Log(`[vote] ${ name }: ${ vote }`)
  }

  App.logConfig = function (key, val) {
    this.Log(`[config] ${ key }: ${ val }`)
  }

  App.bindDebugs = function () {
    console.log('hi?')
    this.Bind("add_dj", this.logNewDJ)
    this.Bind("rem_dj", this.logOldDJ)
    this.Bind("update", this.logConfig)
    this.Bind("registered", this.logJoin)
    this.Bind("deregistered", this.logLeft)
    this.Bind("update_votes", this.logVote)
  }

}