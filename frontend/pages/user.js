const html = require("choo/html");

const style = require("../lib/style");
const artworks = require("./artworks");
const modal = require("./artworks-modal");

module.exports = function(state, emit) {
  if (!state.userInfo) {
    emit("getUserInfo");
    return null;
  }

  return html`
    <body class=${style}>
      ${modal(state, emit)}
      <div class="content">
        <div class="welcome">
          <h1><span id="logo">_</span> ${state.userInfo.username}</h1>
          ${artistBadge()}
          ${curatorBadge()}
          ${social()}
          ${artworks(state, emit, state.userInfo.username)}
        </div>
        <div class="right">
          <button onclick="${showModal}">
            Add Artwork
          </button>
      </div>
    </body>
  `;

  function showModal() {
    emit("showArtworkModal", true);
    emit("render");
  }

  function artistBadge() {
    if (state.userInfo.is_artist) {
      return html`<span class="badge">Artist</span>`;
    }
    return null;
  }

  function curatorBadge() {
    if (state.userInfo.is_curator) {
      return html`<span class="badge">Curator</span>`;
    }
    return null;
  }

  function social() {
    if (!state.userInfo.social) {
      return null;
    }
    return html`
      <div class="social">
        ${socialItem("website")}
        ${socialItem("github")}
        ${socialItem("ello")}
      </div>
    `;
  }

  function socialItem(item) {
    if (!state.userInfo.social[item]) {
      return null;
    }
    return html`
        <a href="${state.userInfo.social[item]}">
          ${item[0].toUppercase() + item.slice(1)}
        </a>
    `;
  }
};
