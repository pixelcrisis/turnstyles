!function(){var t,e,n=(t=function(t,e){t.exports={version:"5.1.0"}},function(n){return e||t(e={exports:{},parent:n},e.exports),e.exports});const o=function(){this.loadConfig(),this.loadThemes(),this.attachRoom()};(t=>{t.prototype.log=function(t){console.info("turnStyles :: "+t)},t.prototype.named=t=>{let e=window.turntable.topViewController.userMap[t];return e?e.attributes.name:"Someone"},t.prototype.buddy=t=>{let e=window.turntable.buddyList.pmWindows[t];return!!e&&e.otherUser.attributes.name},t.prototype.pinged=function(t){let e="@"+this.core.user.attributes.name.toLowerCase();return t.toLowerCase().indexOf(e)>-1},t.prototype.scaleVol=t=>Math.log(t/100)/Math.LN2+4,t.prototype.holding={},t.prototype.suspend=function(t,e,n){this.holding[n]?delete this.holding[n]:t&&t(),this.holding[n]=setTimeout((()=>{delete this.holding[n]}).bind(this),1e3*e)},t.prototype.click=function(t){$(window).focus();let e={bubbles:!0,cancelable:!0,view:window},n=document.querySelectorAll(t)[0],o=new MouseEvent("click",e);return!n.dispatchEvent(o)}})(o),(t=>{t.prototype.default={theme:"dark",style:"",autobop:!0,nextdj:!1,pingdj:!1,has_vol:!1,ping_pm:!1,ping_song:!1,ping_chat:!1,chat_song:!1,chat_spun:!1,chat_snag:!1,chat_join:!1,chat_left:!1},t.prototype.options={theme:{dark:"Dark Mode",night:"Night Mode"},style:{pink:"Pink",blue:"Blue",teal:"Teal",green:"Green"}},t.prototype.loadConfig=function(){this.buildCache(),this.chrome=!!window.tsBase,this.__base=window.tsBase||"https://ts.pixelcrisis.co/build";let t=window.localStorage.getItem("tsdb"),e=t?JSON.parse(t):{};this.config={...this.default,...e},this.log("loaded config")},t.prototype.saveConfig=function(t){let e="checkbox"==t.target.type,n=t.target.id.split("ts_").join(""),o=e?t.target.checked:t.target.value;$(`#ts_panel #${t.target.id}, #ts_window #${t.target.id}`).prop(e?"checked":"value",o),this.config[n]=o;let i=JSON.stringify(this.config);window.localStorage.setItem("tsdb",i),this.log("saved config"),this.handleSave(n)}})(o),(t=>{t.prototype.buildCache=function(){this.last_played||(this.last_played={}),this.now_playing||(this.now_playing={}),this.current_djs||(this.current_djs={})},t.prototype.cacheTrack=function(t,e=0){let n={...this.now_playing};if(this.last_played=n,this.now_playing=t?{...t.metadata,love:e,hate:0,snag:0,dj:t.djid}:{},!n.song)return!1;let o=this.current_djs[n.dj];return o||this.cacheNewDJ(n.dj,1),o.spun+=1,o.love+=n.love,o.hate+=n.hate,o.snag+=n.snag,`${n.love}\u2764\ufe0f${n.hate}\ud83d\udc94${n.snag}\ud83d\udc96`},t.prototype.cacheNewDJ=function(t,e=0){this.current_djs[t]||(this.current_djs[t]={spun:e,love:0,hate:0,snag:0})},t.prototype.clearOldDJ=function(t){if(!this.current_djs[t])return!1;let e={...this.current_djs[t],user:t};return delete this.current_djs[t.userid],`${e.love}\u2764\ufe0f${e.hate}\ud83d\udc94${e.snag}\ud83d\udc96${e.spun}\u25b6\ufe0f`}})(o),(t=>{t.prototype.handle=function(t){switch(t.command){case"pmmed":this.handlePmmed(t);break;case"speak":this.handleSpeak(t);break;case"nosong":this.handleTrack(t);break;case"add_dj":this.handleAddDJ(t);break;case"rem_dj":this.handleRemDJ(t);break;case"newsong":this.handleTrack(t);break;case"snagged":this.handleSteal(t);break;case"registered":this.handleJoins(t);break;case"deregistered":this.handleLeave(t);break;case"update_votes":this.handleVotes(t)}},t.prototype.handleLoad=function(){this.buildPanel(),this.runAutobop(),this.handleSave(),this.log("loaded room: "+this.room.roomId)},t.prototype.handleSave=function(t){let e=t&&"nextdj"==t,n=t&&"has_vol"==t,o=t&&"theme"==t||"style"==t,i=t&&0===t.indexOf("ping_");t&&!e||this.checkDecks(),t&&!o||this.loadThemes(),t&&!n||this.loadVolume(),t&&!i||this.notifyAuth()},t.prototype.handlePmmed=function(t){if(this.config.ping_pm){let e=this.buddy(t.senderid),n=e?"New PM from: "+e:"New PM";this.notifyUser({head:n,text:t.text},"ping_pm")}},t.prototype.handleSpeak=function(t){if(this.pinged(t.text)){if(this.config.ping_chat){let e=`[${this.room.roomData.name}] @${t.name}`;this.notifyUser({head:e,text:t.text},"ping_chat")}this.holding.nextdj&&(this.log("nextdj: received ping"),this.tryJumping())}},t.prototype.handleTrack=function(t){let e=t.room.metadata.current_song,n=this.cacheTrack(e);if(this.mute&&this.toggleMute(),this.config.ping_song){let t="Now Playing: "+this.now_playing.song,e=n||"By: "+this.now_playing.artist;this.notifyUser({head:t,text:e})}if(this.config.chat_song&&n){let t=this.last_played;this.sendToChat(n,`${t.song} by ${t.artist}`,"stat")}this.runAutobop()},t.prototype.handleAddDJ=function(t){this.cacheNewDJ(t.user[0].userid),this.user==t.user[0].userid&&this.config.nextdj&&this.isSpinning()},t.prototype.handleRemDJ=function(t){if(this.checkDecks(),this.config.chat_spun){let e=t.user[0].name,n="- is done spinning!",o=this.clearOldDJ(t.user[0].userid);this.sendToChat(`${e} - ${o}`,n,"stat")}},t.prototype.handleSteal=function(t){if(this.now_playing.snag+=1,this.config.chat_snag){let e=this.named(t.userid),n="has snagged this track!";this.sendToChat(e,n,"snag")}},t.prototype.handleVotes=function(t){this.now_playing.love=t.room.metadata.upvotes,this.now_playing.hate=t.room.metadata.downvotes},t.prototype.handleJoins=function(t){if(this.config.chat_join){let e=t.user[0].name;this.sendToChat(e,"joined.","join")}},t.prototype.handleLeave=function(t){if(this.config.chat_left){let e=t.user[0].name;this.sendToChat(e,"left.","left")}}})(o),(t=>{t.prototype.loadThemes=function(){$("link.tS-core").length||this.createLink("turnStyles"),this.refreshURL(this.config.theme,"themes"),this.refreshURL(this.config.style,"styles"),this.hideUpload(),this.log("refreshed themes")},t.prototype.hideUpload=function(){let t=$("#ts_upload");this.config.theme&&!t.length?($("#upload-button").after('<div id="ts_upload"></div>'),$("#ts_upload").on("click",this.fakeUpload.bind(this))):!this.config.theme&&t.length&&t.remove()},t.prototype.fakeUpload=function(){$("#queue-header").removeClass("normal").addClass("edit");let t=this.core.playlist;t.isFiltering&&t.clearSearchBar(),t.queue.batchEditMode()},t.prototype.locatePath=function(t,e){return`${e?`${this.__base}/${e}`:""+this.__base}/${t}.css`},t.prototype.refreshURL=function(t,e){let n=$("link.tS-"+(e||"core"));if(!t)return!!n.length&&n.remove();n.length?n.attr("href",this.locatePath(t,e)):this.createLink(t,e)},t.prototype.createLink=function(t,e){let n=e||"core",o=document.createElement("link");o.classList.add("tS-"+n),o.rel="stylesheet",o.type="text/css",o.href=this.locatePath(t,e),document.head.append(o)}})(o),(t=>{t.prototype.attachRoom=function(){if(!window.turntable)return this.log("no room");let n=()=>setTimeout(t.prototype.attachRoom.bind(this),250);if(this.core=window.turntable,this.user=this.core.user.id,this.view=this.core.topViewController,this.room=e(this.core,"roomId"),!this.room)return n();if(this.ttfm=e(this.room,"roomData"),!this.ttfm)return n();this.cacheTrack(this.room.currentSong,this.room.upvoters.length);for(let t of this.room.djids)this.cacheNewDJ(t);this.realVolume=window.turntablePlayer.realVolume,this.core.addEventListener("message",this.handle.bind(this)),this.handleLoad()};const e=function(t,e){for(let n in t){let o=t[n];if(null!=o&&o[e])return o}}})(o),(t=>{const e=".opts_tab, .chat_tab, .ding_tab",o=n({}).version;t.prototype.buildPanel=function(){$(".header-bar").append(s(this)),$(e).on("click",i),$(".ts_toggle").on("click",()=>$("#ts_panel, #ts_window").toggleClass("active")),$("#ts_panel input, #ts_window input, #ts_window select").on("change",this.saveConfig.bind(this))};const i=t=>{$(e).removeClass("active"),$("."+t.currentTarget.className).addClass("active")},s=t=>`\n    <div id="ts_panel">\n      <h3 class="ts_toggle">\u2630 tS</h3>\n      <label> ${l(t,"autobop")} Autobop </label>\n      <label> ${l(t,"nextdj")} Next DJ Spot </label>\n      <label> ${l(t,"pingdj")} Next DJ On Ping </label>\n      <button class="ts_toggle">...more</button>\n    </div>\n    <div id="ts_window">\n      <h3 class="ts_toggle">\u2630 turnStyles</h3>\n      <label> ${a(t,"theme")} </label>\n      <label> ${a(t,"style")} </label>\n      <div id="ts_tabs">\n        <div class="opts_tab active">Options</div>\n        <div class="chat_tab">In Chat</div>\n        <div class="ding_tab">Notifications</div>\n      </div>\n      <div class="opts_tab active">\n        <label> ${l(t,"autobop")} Autobop </label>\n        <label> ${l(t,"has_vol")} Control Volume </label>\n        <br>\n        <label> ${l(t,"nextdj")} Next DJ Spot </label>\n        <label> ${l(t,"pingdj")} Next DJ On Ping</label>\n        <br> <h5>Use On Ping For Rooms With Queues</h5>\n      </div>\n      <div class="chat_tab">\n        <label>${l(t,"chat_song")} Last Song Stats</label>\n        <label>${l(t,"chat_spun")} Dropped DJ Stats</label>\n        <br>\n        <label>${l(t,"chat_snag")} User Snags</label>\n        <label>${l(t,"chat_join")} User Joins</label>\n        <label>${l(t,"chat_left")} User Leaves</label>\n      </div>\n      <div class="ding_tab">\n        <label>${l(t,"ping_pm")} On DMs</label>\n        <label>${l(t,"ping_chat")} On Mentions</label>\n        <label>${l(t,"ping_song")} On New Songs</label>\n      </div>\n      <div class="ts_credits">\n        <button class="ts_toggle">\u2714\ufe0e Close</button>\n        <small>v${o}</small>\n        <small>\n          <a href="https://discord.gg/jnRs4WnPjM" target="_blank">\n            Join me on the TT Discord\n          </a>\n        </small>\n      </div>\n    </div>\n  `,a=(t,e)=>`\n    <select id="ts_${e}">\n      <option value="">No ${e[0].toUpperCase()+e.substring(1)}</option>\n      ${Object.keys(t.options[e]).map(n=>`\n        <option value="${n}" ${t.config[e]==n?"selected":""}>\n          ${t.options[e][n]}\n        </option>\n      `).join("")}\n    </select>\n  `,l=(t,e)=>`\n    <input id="ts_${e}" type="checkbox"\n      ${t.config[e]?"checked":""}>\n    </input>\n  `})(o),(t=>{t.prototype.loadVolume=function(){let t=$("body").hasClass("has-volume");if(this.config.has_vol&&!t){$("body").addClass("has-volume"),$(".header-content").append(e(this));let t=$("#ts_mute"),n=$("#ts_slider");t.on("click",this.toggleMute.bind(this)),n.on("input",this.saveVolume.bind(this)),n.on("DOMMouseScroll mousewheel",this.onVolWheel.bind(this))}else!this.config.has_vol&&t&&($("#ts_volume").remove(),$("body").removeClass("has-volume"),window.turntablePlayer.realVolume=this.realVolume)},t.prototype.currVolume=function(t){let e=t||window.util.getSetting("volume");return 100*Math.pow(2,e-4)},t.prototype.saveVolume=function(t){let e=(t=t.target?t.target.value:t)>0?this.scaleVol(t):-3;window.turntablePlayer.realVolume=e>6?this.realVolume:this.currVolume,window.turntablePlayer.setVolume(e),window.util.setSetting("volume",e)},t.prototype.toggleMute=function(){this.mute=!this.mute,$("#ts_volume").toggleClass("muted",this.mute),window.turntablePlayer.setVolume(this.mute?-3:this.scaleVol(this.currVolume())),this.log("turned mute "+(this.mute?"on":"off"))},t.prototype.onVolWheel=function(t){const e=this.currVolume();let n=t.originalEvent.shiftKey?1:5,o=t.originalEvent.deltaY>0?e-n:e+n;return o=o<0?0:o>100?100:o,$("#ts_slider")[0].value=o,this.saveVolume(o),!1};const e=t=>`\n    <div id="ts_volume">\n      <span id="ts_mute"></span>\n      <input id="ts_slider" type="range" \n        min="0" max="100" value="${t.currVolume()}">\n      </input>\n      <em id="ts_muted">Muted For One Song</em>\n    </div>\n    `})(o),(t=>{t.prototype.runAutobop=function(){if(this.autobop&&clearTimeout(this.autobop),!this.config.autobop)return;let t=7*Math.random()*100;this.autobop=setTimeout((()=>this.click(".awesome-button")).bind(this),t)}})(o),(t=>{t.prototype.checkDecks=function(){this.config.nextdj&&(this.config.pingdj?this.suspend(null,1,"nextdj"):this.tryJumping())},t.prototype.tryJumping=function(){if(!$(".become-dj").length)return this.log("nextdj: no spot");this.log("nextdj: taking spot"),this.room.becomeDj()},t.prototype.isSpinning=function(){$("#ts_pane").removeClass("active"),this.config.nextdj=!1,$("#ts_nextdj").prop("checked",!1),setTimeout(this.saveConfig.bind(this),5e3),this.notifyUser({head:"You've Hopped On Deck!",text:"NextDJ is now disabled."})}})(o),(t=>{t.prototype.notifyAuth=function(){let t=this.config;return!(!(t.ping_chat||t.ping_pm||t.ping_song)||this.chrome||!("Notification"in window)||"denied"===Notification.permission||"default"===Notification.permission&&(Notification.requestPermission(),this.log("requesting notification permission"),1))},t.prototype.notifyUser=function(t,e){if(document.hasFocus())return;let o=n(this,t),i=()=>{window.postMessage(o)};if(!this.chrome){if(!this.notifyAuth())return;i=()=>{const e=new Notification(t.head,o);e.onclick=()=>{window.focus(),e.close()}}}return e?this.suspend(i,10,e):i()},t.prototype.sendToChat=function(t,n,o){$(".chat .messages").append(e(t,n,o)),this.view.updateChatScroll()};const e=(t,e,n="")=>`\n    <div class="message ${n}">\n      <em>\n        <span class="subject">${t}</span>\n        <span class="text">${e}</span>\n      </em>\n    </div>\n  `,n=(t,e)=>t.chrome?{type:"tsNotify",notification:e}:{icon:"https://ts.pixelcrisis.co/build/images/icon128.png",body:e.text}})(o),window.$tS=new o}();