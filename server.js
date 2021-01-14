const express = require("express");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 4545;
const app = express();

const mailer = require("./mailer");

app.use(bodyParser.json());

app.post("/api/contact", (req, res) => {
  const { email, name, text, phone, companyName } = req.body;
  mailer({ email, name, text, phone, companyName })
    .then(() => {
      console.log("SUCCESS");
      res.send("SUCCESS");
    })
    .catch((err) => {
      console.log("ERORR --> ", err);
      res.send(err);
    });
});

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`> listening on http://localhost:${PORT}`);
});
