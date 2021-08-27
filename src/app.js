const app = require("express")();
const { restructuredData } = require("./API/restructuredData");

app.get("/v1/api/covid/:country", async (req, res) => {

  const country = req.params.country;

  if (country.toLowerCase() === "india") {
    const options = req.query;

    const data = await restructuredData(options);
    res.json(data);
  };

  return;

});

const path = require('path');
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
})

app.listen(process.env.PORT || 3000)

console.clear();
console.log("Running!");
