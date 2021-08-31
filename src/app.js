const app = require("express")();
const { restructuredData } = require("./API/restructuredData");

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

const path = require("path");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/Pages" + "/main.html"));
});

app.get("/docs", (req, res) => {
  res.sendFile(path.join(__dirname + "/Pages" + "/docs.html"));
});

app.listen(process.env.PORT || 3000);

console.clear();
console.log("Running!");
