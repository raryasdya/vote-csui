require("dotenv").config();
const express = require("express");
const path = require("path");
const SSO = require("sso-ui");
const db = require("./app/models");
const controller = require("./app/controllers/controller");

// const bodyParser = require("body-parser");
// const cors = require("cors");

const app = express();
const session = require("express-session");
const PORT = process.env.PORT || 8000;

app.set("views", path.join(__dirname, ""));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/static"));

var sso = new SSO({
  url: "http://localhost:3000", //required
  session_sso: "sso_user", // defaults to sso_user
});

app.use(
  session({
    secret: "supersecretkey",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(sso.middleware);

// set port, listen for requests
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

app.get("/", async (req, res) => {
  const user_sso = req.sso_user;
  if (user_sso) {
    const role = user_sso.role;
    const faculty = user_sso.faculty;
    const year = parseInt(user_sso.npm.slice(0, 2));

    if (role != "mahasiswa" || faculty != "ILMU KOMPUTER" || year > 20) {
      res.render("static/unqualified", { user: user_sso });
    } else {
      const [user, created] = await controller.createOrGetUser(user_sso);
      const calonNama = await controller.findAllNamaAngkatan();

      let dataPemilih = await controller.groupYear();
      dataPemilih = JSON.parse(JSON.stringify(dataPemilih));

      console.log(dataPemilih);

      res.render("static/home", {
        user: user,
        calonNama: calonNama,
        dataPemilih: dataPemilih,
      });
    }
  } else {
    res.redirect("/login");
  }
});

app.get("/login", sso.login, async (req, res) => {
  res.redirect("/");
});

app.get("/logout", sso.logout);

app.post("/:angkatanId", async (req, res) => {
  var user_sso = req.sso_user;
  var [user, created] = await controller.createOrGetUser(user_sso);
  await controller.voteNamaAngkatan(user, req.params.angkatanId);
  res.redirect("/");
});

app.get("/stats", async (req, res) => {
  let dataPemilih = await controller.groupYear();
  dataPemilih = JSON.parse(JSON.stringify(dataPemilih));

  for (pemilih of dataPemilih) {
    pemilih.y = parseInt(pemilih.total);
    pemilih.label = pemilih.year.toString();
    delete pemilih.total;
    delete pemilih.year;
  }

  res.json(dataPemilih);
});

const run = async () => {
  await controller.createNamaAngkatan("Omega");
  await controller.createNamaAngkatan("Tarung");
  await controller.createNamaAngkatan("Quanta");
  await controller.createNamaAngkatan("Maung");
};

db.sequelize.sync().then(() => {
  // db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  run();
});

// var corsOptions = {
//   origin: "http://localhost:8081"
// };

// app.use(cors(corsOptions));

// // parse requests of content-type - application/json
// app.use(bodyParser.json());

// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));
