/* Page: signup */

const html = require("choo/html");

const style = require("../lib/style");

function signup(state, emit) {
  return html`
    <body class=${style}>
      <div class="signup">
        <h1>signup</h1>
        <input id="signup-email" placeholder="email"
               value=${state.signup.email}
               onchange=${update("email")}>
        <input id="signup-username" placeholder="username"
               value=${state.signup.username}
               onchange=${update("username")}>
        <input id="signup-password" type="password"
               placeholder="password" value=${state.signup.password}
               onchange=${update("password")}>
        <label for="signup-artist">Artist?</label>
        <input id="signup-artist" type="checkbox"
               value=${state.signup.is_artist}
               onchange=${updateBool("is_artist")}>
        <label for="signup-curator">Curator?</label>
        <input id="signup-curator" type="checkbox"
               value=${state.signup.is_curator}
               onchange=${updateBool("is_curator")}>
        <button onclick=${submitSignup}>Sign Up</button>
      </div>
    </body>
  `;

  function update(key) {
    return e =>
      emit("updateSignup", {
        key,
        value: e.target.value
      });
  }

  function updateBool(key) {
    return e =>
      emit("updateSignupBool", {
        key,
        value: e.target.checked
      });
  }

  function submitSignup() {
    fetch("/users", {
      method: "POST",
      body: JSON.stringify({
        username: state.signup.username,
        password: state.signup.password,
        email: state.signup.email,
        is_artist: state.signup.is_artist,
        is_curator: state.signup.is_curator
      })
    })
      .then(res => {
        if (res.status == 200) {
          res.json().then(json => {
            emit("update", { key: "password", value: "" });
            emit("pushState", `/`);
          });
        } else {
          emit("loginError", res.status);
        }
      })
      .catch(res => {
        emit("loginError", res.status);
      });
  }
}

module.exports = signup;
