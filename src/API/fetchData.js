const fetch = require("node-fetch");
const baseURL = "https://data.covid19india.org/v4/min/data.min.json";

const fetchData = async function fetchAllData() {

    const fetchedData = await fetch(baseURL).then(res => res.json());
    return fetchedData;

};

module.exports.fetchData = fetchData;