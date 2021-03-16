const DarkCSS = () => {
  let styles = document.createElement('style')
  styles.textContent = DarkTheme
  document.head.append(styles)
}

const DarkTheme = `
  .room-name,
  .filter.btn,
  .song .title,
  .chat .messages,
  .room-info-wrap,
  .panel-button .text,
  .tabbed-panel .separator,
  .room-tab .room-info-link h3,
  .message-view .message-fragment,
  .message-view .message-username {
    color: #dddddd !important;
  }

  .room-info-intro {
    color: #888888 !important;
  }

  #songs,
  .tab-pane,
  .message-history,
  .chat .message:nth-child(odd),
  .striped-list>:nth-child(odd):not(.separator), 
  .song-list>ul>:nth-child(odd):not(.separator),
  .message-history>:nth-child(odd):not(.separator) {
    background: #222222 !important;
  }

  .flat-button,
  .room-info-wrap,
  .chat .message:nth-child(even),
  .striped-list>:nth-child(even):not(.separator), 
  .song-list>ul>:nth-child(even):not(.separator),
  .message-history>:nth-child(even):not(.separator) { 
    background: #333333 !important;
  }

  .message-input-view,
  .floating-panel-bar,
  .floating-panel-header, 
  .tabbed-panel .separator {
    border-top: 1px solid #333333 !important;
    border-bottom: 1px solid #000000 !important;
    background: linear-gradient(to bottom, #444444, #222222) !important;
  }

  .panel-button {
    background: linear-gradient(to bottom, #555555 ,#444444) !important;
  }

  .flat-button,
  .panel-button,
  .chat .message,
  .room-info-wrap,
  .striped-list>*, 
  .song-list>ul>*,
  .room-info-intro,
  .message-history > * {
    border-color: #444444 !important;
  }

  .panel-button,
  .queue-message,
  .room-info-wrap,
  .default-message,
  .panel-button .text,
  .message-input-view,
  .floating-panel-bar,
  .floating-panel-header, 
  .tabbed-panel .separator {
    box-shadow: none !important;
    text-shadow: none !important;
  }

  .floating-panel-bar .divider,
  .floating-panel-header .divider {
    box-shadow: inset 1px 0 0 0 #111, inset -1px 0 0 0 #000 !important;
  }

  .options-menu .nib {
    filter: invert(100%) !important;
  }
`