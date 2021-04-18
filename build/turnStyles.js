!function(){var t,e,n=(t=function(t,e){t.exports={version:"5.6.4"}},function(n){return e||t(e={exports:{},parent:n},e.exports),e.exports});const s=function(t,e){for(let n in t){let s=t[n];if(null!=s&&s[e])return s}};const i=t=>`\n  <div id="ts_wrap">\n    <div id="turnStyles">\n      ${o}\n      ${a(t)}\n\n      ${l(t)}\n      ${r(t)}\n      ${d(t)}\n      ${u(t)}\n\n      ${m(t)}\n    </div>\n  </div>\n`,o='\n  <h3 id="ts_menu" class="ts_menu_toggle">\n    <span class="open">\u2261</span>\n    <span class="close">\u2716</span>\n    tS\n  </h3>\n\n  <div id="ts_tabs">\n    <div class="tab_opts active">Options</div>\n    <div class="tab_room">Room</div>\n    <div class="tab_ding">Notify</div>\n    <div class="tab_css">Custom Css</div>\n  </div>\n',a=t=>`\n  <div id="ts_quick">\n    ${h(t,"is_afk","Go AFK")}\n    ${h(t,"autobop","Autobop")}\n    ${h(t,"nextdj","Next DJ Spot")}\n    ${h(t,"auto_q","Auto-Queue")}\n  </div>\n`,l=t=>`\n  <div class="ts_tab tab_opts active">\n    <div>\n      <h4>General Features</h4>\n      ${h(t,"autobop","Autobop")}\n      ${h(t,"has_vol","Control Volume")}\n      ${h(t,"nextdj","Next DJ Spot")}\n    </div>\n    <div>\n      <h4>Hide Elements</h4>\n      ${h(t,"no_bub","Hide Chat Bubbles")}\n      ${h(t,"no_aud","Hide Audience")}\n      ${h(t,"no_vid","Hide Player")}\n    </div>\n    <div>\n      <h4>Visual Options</h4>\n      ${c(t,"theme")}\n      ${c(t,"style")}\n    </div>\n  </div>\n`,r=t=>`\n  <div class="ts_tab tab_room">\n    <div>\n      <h4>Automated Queue</h4>\n      ${h(t,"auto_q","Auto-Queue")} \n      <input type="text" id="ts_q_ping" class="ts_inputs"\n        value="${t.config.q_ping}" />\n      ${g("q_ping","Save Queue Ping")}\n      <small><em>Paste your bot's queue message above to take the decks automatically when you're called.</em></small>\n    </div>\n    <div>\n      <h4>AFK Reminder</h4>\n      ${h(t,"is_afk","Go AFK")}\n      <input type="text" id="ts_afk_ping" class="ts_inputs"\n        value="${t.config.afk_ping}" />\n      ${g("afk_ping","Save AFK Response")}\n      <small><em>Sends the response when you go AFK, and if you get pinged while gone.</em></small>\n    </div>\n    <div>\n      <h4>Automated Reminder</h4>\n      ${c(t,"remind",!0)} \n      <input type="text" id="ts_reminder" class="ts_inputs"\n        value="${t.config.reminder}" />\n      ${g("reminder","Save Reminder")}\n      <small><em>Send an automated message at a set interval in your room - prefixed with [tS]</em></small>\n    </div>\n    <div>\n      <h4>Debugging</h4>\n      ${h(t,"logging","Show Logs In Room Tab")}\n      ${p("reloadMusic","Fix Glitched Music Player")}\n      ${p("reload","Reload turnStyles")}\n    </div>\n  </div>\n`,d=t=>`\n  <div class="ts_tab tab_ding">\n    <div>\n      <h4>Messages In Chat</h4>\n      ${h(t,"chat_song","Last Song Stats")}\n      ${h(t,"chat_spun","Dropped DJ Stats")}\n      ${h(t,"chat_snag","User Snags")}\n      ${h(t,"chat_join","User Joins")}\n      ${h(t,"chat_left","User Leaves")}\n    </div>\n    <div>\n      <h4>Desktop Notifications</h4>\n      ${h(t,"ping_pm","On DMs")}\n      ${h(t,"ping_chat","On Mentions")}\n      ${h(t,"ping_song","On New Songs")}\n    </div>\n  </div>\n`,u=t=>`\n  <div class="ts_tab tab_css">\n    <div>\n      <h4>Custom CSS</h4>\n      <textarea id="ts_user_css" class="ts_inputs" cols="60" rows="10">${t.config.user_css}</textarea>\n      ${g("user_css","Save And Apply Styles")}\n    </div>\n  </div>\n`,h=(t,e,n)=>`\n  <label class="ts_toggle">\n    <input data-for="${e}" class="ts_option" type="checkbox"\n      ${t.config[e]?"checked":""}>\n    </input>\n    <span>\u2022</span>\n    ${n}\n  </label>\n`,c=(t,e,n)=>{return`\n  <select data-for="${e}" class="ts_option ts_inputs">\n    ${n?"":(s=e,`<option value="">No ${i=s,i[0].toUpperCase()+i.substring(1)}</option>`)}\n    ${Object.keys(t.options[e]).map(n=>`\n      <option value="${n}" ${t.config[e]==n?"selected":""}>\n        ${t.options[e][n]}\n      </option>\n    `).join("")}\n  </select>\n`;var s,i},g=(t,e)=>`\n  <button class="ts_inputs ts_optbtn" data-for="ts_${t}">${e}</button>\n`,p=(t,e)=>`\n  <button class="ts_inputs" onclick="$tS.${t}()">${e}</button>\n`,m=t=>`\n  <div class="ts_credits">\n    <small id="ts_close" class="ts_menu_toggle">\u2714\ufe0e CLOSE</small>\n    <small>v${t.config.version}</small>\n    <small>\n      <a href="https://discord.gg/jnRs4WnPjM" target="_blank">\n        Join me on the TT Discord\n      </a>\n    </small>\n  </div>\n`;const f=function(t){let e=document.createElement("style");e.classList.add("tScss"),e.type="text/css",e.innerHTML=t,$("style.tScss").remove(),document.head.append(e)},_=function(t,e,n){return`${n?`${t}/${n}`:""+t}/${e}.css`},v=function(t,e,n){let s=document.createElement("link");s.classList.add("tS-"+(n||"core")),s.type="text/css",s.rel="stylesheet",s.href=_(t,e,n),document.head.append(s)},b=function(t,e,n){let s=$("link.tS-"+n);if(!e)return!!s.length&&s.remove();s.length?s.attr("href",_(t,e,n)):v(t,e,n)};const w=(t,e,n)=>$(t).on("DOMSubtreeModified",e,n),y=function(){let t=window.turntable.playlist;t.isFiltering&&t.clearSearchBar(),$("#queue-header").removeClass("normal").addClass("edit"),t.queue.batchEditMode()},k=function(){let t=$("#playlist-header .text")[0],e=window.turntable.playlist.fileids.length,n=t.innerHTML.split("<em>")[0];t.innerHTML=`${n} <em>${e}</em>`},S=function(){if($(".profile.modal .statslink").length)return;let t=$(".profile.modal .userid"),e=t.length?t[0].innerHTML:"";24==e.length&&($(".profile.modal .section.web-links").show(),$(".profile.modal .website").append(`\n    <a class="statslink" href="https://ttstats.info/user/${e}" \n      target="_blank" onclick="$('.modal .close-x')[0].click()">\n      ttStats Profile\n    </a>\n  `))};const C=t=>Math.log(t/100)/Math.LN2+4,j=t=>{let e=t||window.util.getSetting("volume");return 100*Math.pow(2,e-4)};const x=()=>{$(window).focus();let t={bubbles:!0,cancelable:!0,view:window},e=document.querySelectorAll(".awesome-button")[0],n=new MouseEvent("click",t);return!e.dispatchEvent(n)};const M={};(t=>{t.default={logging:!1,theme:"dark",style:"",autobop:!0,nextdj:!1,auto_q:!1,q_ping:"Hey @user - it's your turn!",has_vol:!1,no_aud:!1,no_vid:!1,no_bub:!1,ping_pm:!1,ping_song:!1,ping_chat:!1,chat_song:!1,chat_spun:!1,chat_snag:!1,chat_join:!1,chat_left:!1,is_afk:!1,afk_ping:"I'm AFK - Back in a sec!",beats:0,remind:0,reminder:"Today's theme is: Cool.",user_css:""},t.options={theme:{dark:"Dark Mode",night:"Night Mode",forest:"Forest",cosmic:"Cosmic",midnight:"Midnight"},style:{pink:"Pink",blue:"Blue",teal:"Teal",green:"Green",purple:"Purple"},remind:{0:"Don't Remind",15:"Every 15m",30:"Every 30m",60:"Every 1h",120:"Every 2h"}}})(M),(t=>{t.on=function(t,e){this.events||(this.events={}),this.events[t]||(this.events[t]=[]),this.events[t].push(e.bind(this))},t.emit=function(t,e,n){let s=this.events[t];if(s)for(let i of s)i(e,n)},t.handle=function(t){t.command&&(t.$ping=this.pinged(t.text),t.$name=this.userName(t.userid),t.$from=this.buddyName(t.senderid),t.$self=t.userid==window.turntable.user.id,this.emit(t.command,t))},t.events={}})(M),(t=>{t.view=()=>window.turntable.topViewController,t.userName=t=>{let e=window.turntable.topViewController.userMap[t];return e?e.attributes.name:"Someone"},t.buddyName=t=>{let e=window.turntable.buddyList.pmWindows[t];return!!e&&e.otherUser.attributes.name},t.pinged=t=>{let e="@"+window.turntable.user.attributes.name;return t&&t.toLowerCase().indexOf(e.toLowerCase())>-1},t.speak=t=>{let e={api:"room.speak",text:t,roomid:window.turntable.topViewController.roomId,section:window.turntable.topViewController.section};window.turntable.sendMessage(e)},t.reloadMusic=()=>{let t=window.youtube,e=window.soundcloudplayer;e.song&&(e.songTime=e.player.currentTime()/1e3,e.previewStartTime=Date.now()-1e3,e.resumeSong(e.song)),t.song&&(t.songTime=t.player[0].getCurrentTime(),t.previewStartTime=Date.now()-3e3,t.resumeSong(t.song)),$("#turnStyles").removeClass("active")},t.toggleClass=(t,e)=>{let n=$("body").hasClass(t);e&&!n&&$("body").addClass(t),n&&!e&&$("body").removeClass(t)}})(M),(t=>{t.on("attach",(function(t){for(let e of t.djids)this.cacheNewDJ(e);this.cacheTrack(t.currentSong)})),t.on("update_votes",(function(t){this.now_playing.love=t.room.metadata.upvotes,this.now_playing.hate=t.room.metadata.downvotes})),t.on("snagged",(function(){this.now_playing.snags+=1})),t.cacheNewDJ=function(t,e){let n=t.user?t.user[0].userid:t,s=this.current_djs[n],i=this.userName(n);s||(this.current_djs[n]={spun:e&&e.spun?e.spun:0,love:e&&e.love?e.love:0,hate:e&&e.hate?e.hate:0,snag:e&&e.snag?e.snag:0}),this.Log(`new dj: [${i}](${n})`)},t.clearOldDJ=function(t){let e=t.user[0].name,n=t.user[0].userid;if(!this.current_djs[n])return;let s={...this.current_djs[n]},i=`${s.love}\u2764\ufe0f${s.hate}\ud83d\udc94${s.snag}\ud83d\udc96${s.spun}\u25b6\ufe0f`;delete this.current_djs[n],this.Log(`old dj: [${e}] (${n})`),this.emit("dropped",e,i)},t.cacheTrack=function(t){let e=t&&t.room?t.room.metadata.current_song:t,n=t&&t.upvoters?t.upvoters.length:0,s=!!e&&e.djid,i={...this.now_playing},o={love:n,hate:0,snag:0,dj:s};this.last_played=i,this.now_playing=e?{...e.metadata,...o}:{},i.song&&this.current_djs[i.dj]?(this.current_djs[i.dj].spun+=1,this.current_djs[i.dj].love+=i.love,this.current_djs[i.dj].hate+=i.hate,this.current_djs[i.dj].snag+=i.snag):i.song&&this.cacheNewDJ(i.dj,i);let a=!1;i.song&&(a=`${i.love}\u2764\ufe0f${i.hate}\ud83d\udc94${i.snag}\ud83d\udc96`),this.Log("new song: "+(this.now_playing.song||"none")),this.emit("tracked",a)},t.on("add_dj",t.cacheNewDJ),t.on("rem_dj",t.clearOldDJ),t.on("nosong",t.cacheTrack),t.on("newsong",t.cacheTrack),t.last_played={},t.now_playing={},t.current_djs={}})(M),(t=>{t.init=function(){this.__base=window.tsBase||"https://ts.pixelcrisis.co/build";let t=window.localStorage.getItem("tsdb"),e=t?JSON.parse(t):{},s=n({}).version;this.config={...this.default,...e,version:s},this.config.is_afk=!1,this.emit("loaded",this.config),this.attach()},t.attach=function(){let e=window.turntable;if(!e)return this.Log("no room");if(this.lobby=$("#turntable #topBG").length,this.lobby)return this.buildWindow();let n=()=>setTimeout(t.attach.bind(this),150);if(!e.user)return n();let i=s(e,"roomId");return i&&s(i,"roomData")?(this.handler=this.handle.bind(this),window.turntable.addEventListener("message",this.handler),this.emit("attach",i),void this.Log("loaded room")):n()},t.reload=function(){clearInterval(this.heart),window.turntable.removeEventListener("message",this.handler),$('script[src*="turnStyles.js"]').remove();const t=document.createElement("script");t.src=`${this.__base}/turnStyles.js?${Math.random()}`,t.type="text/javascript",this.Log("reloading"),document.body.append(t)}})(M),(t=>{t.saveConfig=function(t){let e=t.target.dataset.for,n="checkbox"==t.target.type?t.target.checked:t.target.value;0===e.indexOf("ts_")&&(n=$("#"+e).val(),e=e.split("ts_").join("")),this.writeConfig(e,n),!["style","theme","user_css"].includes(e)&&this.lobby||this.emit("update",e,n)},t.writeConfig=function(t,e){this.config[t]=e;let n=JSON.stringify(this.config);window.localStorage.setItem("tsdb",n);let s="boolean"==typeof e;$(`*[data-for="${t}"]`).prop(s?"checked":"value",e)}})(M),(t=>{t.Log=function(t){let e=`[${(new Date).toLocaleTimeString("en-us")}]`;console.info(`${e} turnStyles :: ${t}`),this.logBook.push(`[tS] ${e} <span>${t}</span>`),this.Logged()},t.Logged=function(){this.logBook.length>50&&this.logBook.shift();let t=$("#ts_logs")[0];t&&(t.innerHTML=this.logBook.join("<br>"),t.scrollTop=t.scrollHeight)},t.logBook=[]})(M),(t=>{t.suspend=function(t,e,n){this.holding||(this.holding={}),this.holding[n]?clearTimeout(this.holding[n]):t&&t();let s=1e3*e;this.holding[n]=setTimeout((()=>{delete this.holding[n]}).bind(this),s)},t.holding={}})(M),(t=>{t.beat=function(){this.config.beats=parseInt(this.config.beats)+1,this.emit("heartbeat",this.config.beats)},t.on("attach",(function(){this.heart=setInterval(t.beat.bind(this),6e4)}))})(M),(t=>{t.buildWindow=function(){$("#ts_wrap").remove(),$(".header-bar").append(i(this)),$("#ts_logs").remove(),$(".room-info-nav").after('<div id="ts_logs"></div>'),$(".ts_menu_toggle").on("click",()=>{$("#turnStyles").toggleClass("active")}),$("#ts_tabs div").on("click",t=>{$("#ts_tabs div, .ts_tab").removeClass("active"),$("."+t.currentTarget.className).addClass("active")}),$(".ts_optbtn").on("click",t.saveConfig.bind(this)),$(".ts_option").on("change",t.saveConfig.bind(this))},t.on("attach",t.buildWindow)})(M),(t=>{t.on("loaded",(function(t){$("link.tS-core").remove(),v(this.__base,"turnStyles"),$("link.tS-themes").remove(),v(this.__base,t.theme,"themes"),$("link.tS-styles").remove(),v(this.__base,t.style,"styles"),f(t.user_css)})),t.on("update",(function(t,e){"theme"==t&&b(this.__base,e,"themes"),"style"==t&&b(this.__base,e,"styles"),"user_css"==t&&f(e)}))})(M),(t=>{t.on("attach",(function(){k(),w("#songs-wrapper","#songs",k),w("#maindiv",".overlay .profile",S),$("#upload-button").after('<div id="ts_upload"></div>'),$("#ts_upload").on("click",y),this.toggleClass("ts_hide_videos",this.config.no_vid),this.toggleClass("ts_hide_audience",this.config.no_aud),this.toggleClass("ts_hide_bubbles",this.config.no_bub),this.toggleClass("ts_has_logging",this.config.logging)})),t.on("update",(function(t,e){"no_vid"==t&&this.toggleClass("ts_hide_videos",e),"no_aud"==t&&this.toggleClass("ts_hide_audience",e),"no_bub"==t&&this.toggleClass("ts_hide_bubbles",e),"logging"==t&&this.toggleClass("ts_has_logging",e)}))})(M),(t=>{t.loadVolume=function(){let t=this.config.has_vol,e=$("body").hasClass("has-volume");this.toggleClass("has-volume",t);let n=window.turntablePlayer.realVolume;this.realVolume||(this.realVolume=n),e&&!t&&this.remVolume(),t&&!e&&this.addVolume()},t.addVolume=function(){$(".header-content").append(`\n      <div id="ts_volume">\n        <span id="ts_mute"></span>\n        <input id="ts_slider" type="range" \n          min="0" max="100" value="${j()}">\n        </input>\n        <em id="ts_muted">Muted For One Song</em>\n      </div>\n    `),$("#ts_mute").on("click",this.toggleMute.bind(this)),$("#ts_slider").on("input",this.saveVolume.bind(this)),$("#ts_slider").on("DOMMouseScroll mousewheel",this.onVolWheel.bind(this))},t.remVolume=function(){$("#ts_volume").remove(),window.turntablePlayer.realVolume=this.realVolume},t.saveVolume=function(t){let e=(t=t.target?t.target.value:t)>0?C(t):-3;window.turntablePlayer.realVolume=e>6?this.realVolume:j,window.turntablePlayer.setVolume(e),window.util.setSetting("volume",e)},t.onVolWheel=function(t){const e=j();let n=t.originalEvent.shiftKey?1:5,s=t.originalEvent.deltaY>0?e-n:e+n;return s=s<0?0:s>100?100:s,$("#ts_slider")[0].value=s,this.saveVolume(s),!1},t.toggleMute=function(){this.mute=!this.mute,$("#ts_volume").toggleClass("muted",this.mute);let t=this.mute?-3:C(j());window.turntablePlayer.setVolume(t),this.Log("turned mute "+(this.mute?"on":"off"))},t.checkMuted=function(){this.mute&&this.toggleMute()},t.on("attach",t.loadVolume),t.on("update",t.loadVolume),t.on("nosong",t.checkMuted),t.on("newsong",t.checkMuted)})(M),(t=>{t.on("update",(function(t,e){if("is_afk"!=t)return;let n=this.config.afk_ping;e&&n&&this.speak(n)})),t.on("speak",(function(t){let e=this.config.is_afk,n=this.config.afk_ping;!t.$self&&t.$ping&&e&&n?this.speak(n):t.$self&&e&&t.text!=n&&(this.writeConfig("is_afk",!1),this.postToChat("Welcome Back!","I've turned off AFK for you!","stat"))}))})(M),(t=>{t.on("tracked",(function(t){let e=this.now_playing,n=this.last_played;if(e.song&&this.config.ping_song){let n="Now Playing: "+e.song,s=t||"By: "+e.artist;this.notifyUser(n,s)}if(t&&this.config.chat_song){let e=`${n.song} by ${n.artist}`;this.postToChat(t,e,"stat")}})),t.on("dropped",(function(t,e){if(!this.config.chat_spun)return;let n=`${t} - ${e}`;this.postToChat(n," - is done spinning!","stat")}))})(M),(t=>{t.checkDecks=function(){if(this.config.nextdj)return $(".become-dj").length?(this.Log("nextdj: taking spot"),void this.view().becomeDj()):this.Log("nextdj: no spot")},t.on("add_dj",(function(t){if(!this.config.nextdj)return;if(window.turntable.user.id!=t.user[0].userid)return;let e="You've Hopped On Deck!",n="NextDJ is now disabled.";this.notifyUser(e,n),this.postToChat(e,n),this.writeConfig("nextdj",!1)})),t.on("speak",(function(t){this.config.auto_q&&this.config.q_ping==t.text&&this.view().becomeDj()})),t.on("attach",t.checkDecks),t.on("update",t.checkDecks),t.on("rem_dj",t.checkDecks)})(M),(t=>{t.notifyAuth=function(){let t=this.config;return!(!(t.ping_chat||t.ping_pm||t.ping_song)||!("Notification"in window)||"denied"===Notification.permission||"default"===Notification.permission&&(this.Log("requesting notifcation permission"),Notification.requestPermission(),1))},t.notifyUser=function(t,e,n){if(!this.notifyAuth()||document.hasFocus())return;let s=this.__base+"/images/icon128.png",i=()=>{let n=new Notification(t,{icon:s,body:e});n.onclick=()=>{window.focus(),n.close()}};return n?this.suspend(i,5,n):i()},t.postToChat=function(t,e,n){$(".chat .messages").append(`\n      <div class="message ${n}">\n        <em>\n          <span class="subject">${t}</span>\n          <span class="text">${e}</span>\n        </em>\n      </div>\n    `),this.view().updateChatScroll()},t.on("attach",t.notifyAuth),t.on("update",t.notifyAuth)})(M),(t=>{t.on("pmmed",(function(t){if(!this.config.ping_pm)return;let e="New PM "+(t.$from?"from: "+t.$from:"");this.notifyUser(e,t.text,"pm_ping")})),t.on("speak",(function(t){if(!t.$ping||!this.config.ping_chat)return;let e=`[${this.view().roomData.name}] @${t.name}`;this.notifyUser(e,t.text,"chat_ping")})),t.on("snagged",(function(t){this.config.chat_snag&&this.postToChat(t.$name,"has snagged this track!","snag")})),t.on("registered",(function(t){for(let e of t.user)this.Log(`[${e.name}](${e.userid}) joined.`),this.config.chat_join&&this.postToChat(e.name,"joined.","join")})),t.on("deregistered",(function(t){for(let e of t.user)this.Log(`[${e.name}](${e.userid}) left.`),this.config.chat_join&&this.postToChat(e.name,"left.","left")})),t.on("update_votes",(function(t){let e=t.room.metadata.votelog,n=e[e.length-1],s=this.userName(n[0]);this.Log(`[${s}] voted: ${n[1]}`)}))})(M),(t=>{t.autoBop=function(){if(this.bopping&&clearTimeout(this.bopping),!this.config.autobop)return;let t=7*Math.random()*100;this.bopping=setTimeout(x,t)},t.on("attach",t.autoBop),t.on("newsong",t.autoBop)})(M),(t=>{t.on("heartbeat",(function(t){let e=this.config.reminder;t%parseInt(this.config.remind)==0&&e&&this.speak("[tS] "+e)}))})(M),window.$tS=M,window.$tS.init()}();