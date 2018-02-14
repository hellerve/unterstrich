const html = require("choo/html");

const style = require("../lib/style");
const { removeLocal } = require("../lib/storage");

module.exports = function(state, emit) {
  return html`
    <body class=${style}>
      <div class="content">
        <div class="welcome">
          <h1><span id="logo">_</span> Unterstrich</h1>
        </div>
        <div class="right">
          ${greet()}
        </div>
        <p>We foster artistic expression.</p>
        <p>We help you get paid.</p>
        <p>We make it easy.</p>
      </div>
    </body>
  `;

  function goTo(route) {
    return () => emit("pushState", route);
  }

  function greet() {
    if (state.login.token) {
      return html`
        <div>
          <p>
            Hello, <a href="/${state.login.username}">${
        state.login.username
      }</a>!</p>
          <button onclick=${logout}>Log Out</button>
        </div>
      `;
    }
    return html`
      <div>
        <button onclick=${goTo("/login")}>Log In</button>
        <button onclick=${goTo("/signup")}>Sign Up</button>
      </div>
    `;
  }

  function logout() {
    removeLocal("token");
    emit("updateLogin", { key: "token", value: "" });
    emit("render");
  }
};
