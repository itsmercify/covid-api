const app = require("express")();
const { restructuredData } = require("./API/restructuredData");
const path = require("path");
const config = require("./Config/config.json");
const docs = require("../src/Documentation/docs");

app.set("views", path.join(__dirname, "./Pages"));
app.set("view engine", "ejs");

app.get("/api/:state", async (req, res) => {
  if (req.params.state === "all") {
    const options = req.query;

    if (
      Object.keys(options).length &&
      !Object.keys(options).includes("state")
    ) {
      res.status(400);
      return res.json({
        success: false,
        data: [],
        message: "Invalid parameter.",
      });
    }

    const data = await restructuredData(options);

    res.status(200);
    if (data.success === false) res.status(400);

    res.json(data);
    return;
  }

  const data = await restructuredData({
    state: req.params.state,
  });

  res.status(200);
  if (data.success === false) res.status(400);

  res.json(data);

  return;
});

app.get("/", (req, res) => {
  res.render("main_page", {
    config,
  });
});

app.get("/docs", (req, res) => {
  res.render("docs", {
    docs,
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Running!");
});
