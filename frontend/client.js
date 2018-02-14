const choo = require("choo");
const app = choo();

app.use(require("./stores/login"));
app.use(require("./stores/signup"));
app.use(require("./stores/users"));
app.use(require("./stores/artworks"));
app.route("/", require("./pages/home"));
app.route("/login", require("./pages/login"));
app.route("/signup", require("./pages/signup"));
app.route("/:username", require("./pages/user"));

if (module.parent) {
  module.exports = app;
} else {
  app.mount("body");
}
