const moment = require("moment");
const { fetchData } = require("./fetchData");
const { converter, SYSTEM } = require("@kushalst/numbers-to-words-converter");

const fetch = require("node-fetch");

const {
  getStateNameByStateCode,
  getStateCodeByStateName,
} = require("india-state-codes");

const restructuredData = async function restructuredData(options) {
  const data = await fetchData();
  let dataObject = {
    success: true,
    data: {
      total_data: {
        affected: {},
        recovered: {},
        deceased: {},
        tested: {},
        vaccinated_first_dose: {},
        vaccinated_second_dose: {},
      },
      sorted_data: {
        sorted_by_most_affected: {},
        sorted_by_most_recovered: {},
        sorted_by_most_deceased: {},
        sorted_by_most_tested: {},
        sorted_by_most_vaccinated_first_dose: {},
        sorted_by_most_vaccinated_second_dose: {},
      },
      states: [],
      union_territories: [],
    },
  };

  const unionTerritories = ["PY", "LD", "LA", "JK", "DL", "DD", "CH", "AN"];

  const population = await fetch(
    "https://disease.sh/v3/covid-19/countries/india"
  ).then((res) => res.json());

  function toText(number, opt) {
    if (opt === "int") {
      const letterText = converter.toWords(
        number.toLocaleString(),
        SYSTEM.INTL
      );
      const firstLetter = letterText.slice(0, 1).toUpperCase();
      const text = `${firstLetter}${letterText
        .slice(1, letterText.length)
        .toLowerCase()}`;

      return text;
    }

    const letterText = converter.toWords(number.toLocaleString(), SYSTEM.IN);
    const firstLetter = letterText.slice(0, 1).toUpperCase();
    const text = `${firstLetter}${letterText
      .slice(1, letterText.length)
      .toLowerCase()}`;

    return text;
  }
  // Display India COVID-19 data here

  let numberOfAffected = 0;
  let numberOfRecovered = 0;
  let numberOfDeceased = 0;
  let numberOfTested = 0;
  let vaccinatedFirstDose = 0;
  let vaccinatedSecondDose = 0;

  for (const states in data) {
    if (states === "TT") {
      continue;
    }

    let stateName = getStateNameByStateCode(states) ?? states;

    if (stateName === "WB") stateName = "West Bengal";
    if (stateName === "LA") stateName = "Ladakh";

    const stateObject = {};

    stateObject.name = stateName;
    stateObject.name_abbrevation = getStateCodeByStateName(states) ?? states;

    const affectedCitizens = data[states].total.confirmed;
    stateObject.affected = {
      number: affectedCitizens,
      text: toText(affectedCitizens),
      text_international: toText(affectedCitizens, "int"),
      formatted: affectedCitizens.toLocaleString(),
      percentage_in_country_population: Number(
        (affectedCitizens / population.population) * 100
      ),
      round_percentage_in_country_population: Math.round(
        Number((affectedCitizens / population.population) * 100)
      ),
      percentage_in_state_population: Number(
        (affectedCitizens / data[states].meta.population) * 100
      ),
      round_percentage_in_state_population: Math.round(
        Number((affectedCitizens / data[states].meta.population) * 100)
      ),
    };

    const recoveredCitizens = data[states].total.recovered;
    stateObject.recovered = {
      number: recoveredCitizens,
      text: toText(recoveredCitizens),
      text_international: toText(recoveredCitizens, "int"),
      formatted: recoveredCitizens.toLocaleString(),
      percentage_in_country_population: Number(
        (recoveredCitizens / population.population) * 100
      ),
      round_percentage_in_country_population: Math.round(
        Number((recoveredCitizens / population.population) * 100)
      ),
      percentage_in_state_population: Number(
        (recoveredCitizens / data[states].meta.population) * 100
      ),
      round_percentage_in_state_population: Math.round(
        Number((recoveredCitizens / data[states].meta.population) * 100)
      ),
    };

    const deceasedCitizens = data[states].total.deceased;
    stateObject.deceased = {
      number: deceasedCitizens,
      text: toText(deceasedCitizens),
      text_international: toText(deceasedCitizens, "int"),
      formatted: deceasedCitizens.toLocaleString(),
      percentage_in_country_population: Number(
        (deceasedCitizens / population.population) * 100
      ),
      round_percentage_in_country_population: Math.round(
        Number((deceasedCitizens / population.population) * 100)
      ),
      percentage_in_state_population: Number(
        (deceasedCitizens / data[states].meta.population) * 100
      ),
      round_percentage_in_state_population: Math.round(
        Number((deceasedCitizens / data[states].meta.population) * 100)
      ),
    };

    const testedCitizens = data[states].total.tested;
    stateObject.tested = {
      number: testedCitizens,
      text: toText(testedCitizens),
      text_international: toText(testedCitizens, "int"),
      formatted: testedCitizens.toLocaleString(),
      percentage_in_country_population: Number(
        (testedCitizens / population.population) * 100
      ),
      round_percentage_in_country_population: Math.round(
        Number((testedCitizens / population.population) * 100)
      ),
      percentage_in_state_population: Number(
        (testedCitizens / data[states].meta.population) * 100
      ),
      round_percentage_in_state_population: Math.round(
        Number((testedCitizens / data[states].meta.population) * 100)
      ),
    };

    const vaccinated1 = data[states].total.vaccinated1;
    stateObject.vaccinated_first_dose = {
      number: vaccinated1,
      text: toText(vaccinated1),
      text_international: toText(vaccinated1, "int"),
      formatted: vaccinated1.toLocaleString(),
      percentage_in_country_population: Number(
        (vaccinated1 / population.population) * 100
      ),
      round_percentage_in_country_population: Math.round(
        Number((vaccinated1 / population.population) * 100)
      ),
      percentage_in_state_population: Number(
        (vaccinated1 / data[states].meta.population) * 100
      ),
      round_percentage_in_state_population: Math.round(
        Number((vaccinated1 / data[states].meta.population) * 100)
      ),
    };

    const vaccinated2 = data[states].total.vaccinated2;
    stateObject.vaccinated_second_dose = {
      number: vaccinated2,
      text: toText(vaccinated2),
      text_international: toText(vaccinated2, "int"),
      formatted: vaccinated2.toLocaleString(),
      percentage_in_country_population: Number(
        (vaccinated2 / population.population) * 100
      ),
      round_percentage_in_country_population: Math.round(
        Number((vaccinated2 / population.population) * 100)
      ),
      percentage_in_state_population: Number(
        (vaccinated2 / data[states].meta.population) * 100
      ),
      round_percentage_in_state_population: Math.round(
        Number((vaccinated2 / data[states].meta.population) * 100)
      ),
    };

    const rawTime = data[states].meta.last_updated;
    stateObject.last_updated = {
      raw: rawTime,
      time: new Date(rawTime).valueOf(),
      relative: moment(rawTime).fromNow(),
    };

    stateObject.source = data[states].meta?.tested?.source ?? null;

    numberOfAffected = Number(numberOfAffected + data[states].total.confirmed);
    numberOfRecovered = Number(
      numberOfRecovered + data[states].total.recovered
    );
    numberOfDeceased = Number(numberOfDeceased + data[states].total.deceased);
    numberOfTested = Number(numberOfTested + data[states].total.tested);
    vaccinatedFirstDose = Number(
      vaccinatedFirstDose + data[states].total.vaccinated1
    );
    vaccinatedSecondDose = Number(
      vaccinatedSecondDose + data[states].total.vaccinated2
    );

    if (unionTerritories.includes(states)) {
      dataObject.data.union_territories.push(stateObject);
    } else {
      dataObject.data.states.push(stateObject);
    }
  }

  dataObject.data.total_data.affected.number = numberOfAffected;
  dataObject.data.total_data.affected.text = toText(numberOfAffected);
  dataObject.data.total_data.affected.text_international = toText(
    numberOfAffected,
    "int"
  );
  dataObject.data.total_data.affected.formatted =
    numberOfAffected.toLocaleString("en-IN");
  dataObject.data.total_data.affected.percentage = `${Number(
    (numberOfAffected / population.population) * 100
  )}`;
  dataObject.data.total_data.affected.round_percentage = `${Math.round(
    Number((numberOfAffected / population.population) * 100)
  )}`;

  dataObject.data.total_data.recovered.number = numberOfRecovered;
  dataObject.data.total_data.recovered.text = toText(numberOfRecovered);
  dataObject.data.total_data.recovered.text_international = toText(
    numberOfRecovered,
    "int"
  );
  dataObject.data.total_data.recovered.formatted =
    numberOfRecovered.toLocaleString();
  dataObject.data.total_data.recovered.percentage = `${Number(
    (numberOfRecovered / population.population) * 100
  )}`;
  dataObject.data.total_data.recovered.round_percentage = `${Math.round(
    Number((numberOfRecovered / population.population) * 100)
  )}`;

  dataObject.data.total_data.deceased.number = numberOfDeceased;
  dataObject.data.total_data.deceased.text = toText(numberOfDeceased);
  dataObject.data.total_data.deceased.text_international = toText(
    numberOfDeceased,
    "int"
  );
  dataObject.data.total_data.deceased.formatted =
    numberOfDeceased.toLocaleString();
  dataObject.data.total_data.deceased.percentage = `${Number(
    (numberOfDeceased / population.population) * 100
  )}`;
  dataObject.data.total_data.deceased.round_percentage = `${Math.round(
    Number((numberOfDeceased / population.population) * 100)
  )}`;

  dataObject.data.total_data.tested.number = numberOfTested;
  dataObject.data.total_data.tested.text = toText(numberOfTested);
  dataObject.data.total_data.tested.text_international = toText(
    numberOfTested,
    "int"
  );
  dataObject.data.total_data.tested.formatted = numberOfTested.toLocaleString();
  dataObject.data.total_data.tested.percentage = `${Number(
    (numberOfTested / population.population) * 100
  )}`;
  dataObject.data.total_data.tested.round_percentage = `${Math.round(
    Number((numberOfTested / population.population) * 100)
  )}`;

  dataObject.data.total_data.vaccinated_first_dose.number = vaccinatedFirstDose;
  dataObject.data.total_data.vaccinated_first_dose.text =
    toText(vaccinatedFirstDose);
  dataObject.data.total_data.vaccinated_first_dose.text_international = toText(
    vaccinatedFirstDose,
    "int"
  );
  dataObject.data.total_data.vaccinated_first_dose.formatted =
    vaccinatedFirstDose.toLocaleString();
  dataObject.data.total_data.vaccinated_first_dose.percentage = `${Number(
    (vaccinatedFirstDose / population.population) * 100
  )}`;
  dataObject.data.total_data.vaccinated_first_dose.round_percentage = `${Math.round(
    Number((vaccinatedFirstDose / population.population) * 100)
  )}`;

  dataObject.data.total_data.vaccinated_second_dose.number =
    vaccinatedSecondDose;
  dataObject.data.total_data.vaccinated_second_dose.text =
    toText(vaccinatedSecondDose);
  dataObject.data.total_data.vaccinated_second_dose.text_international = toText(
    vaccinatedSecondDose,
    "int"
  );
  dataObject.data.total_data.vaccinated_second_dose.formatted =
    vaccinatedSecondDose.toLocaleString();
  dataObject.data.total_data.vaccinated_second_dose.percentage = `${Number(
    (vaccinatedSecondDose / population.population) * 100
  )}`;
  dataObject.data.total_data.vaccinated_second_dose.round_percentage = `${Math.round(
    Number((vaccinatedSecondDose / population.population) * 100)
  )}`;

  dataObject.data.sorted_data.sorted_by_most_affected = dataObject.data.states
    .sort((a, b) => b.affected.number - a.affected.number)
    .map((state) => {
      return {
        name: state.name,
        name_abbrevation: state.name_abbrevation,
        affected: state.affected,
      };
    });

  dataObject.data.sorted_data.sorted_by_most_recovered = dataObject.data.states
    .sort((a, b) => b.recovered.number - a.recovered.number)
    .map((state) => {
      return {
        name: state.name,
        name_abbrevation: state.name_abbrevation,
        recovered: state.recovered,
      };
    });

  dataObject.data.sorted_data.sorted_by_most_deceased = dataObject.data.states
    .sort((a, b) => b.deceased.number - a.deceased.number)
    .map((state) => {
      return {
        name: state.name,
        name_abbrevation: state.name_abbrevation,
        deceased: state.deceased,
      };
    });

  dataObject.data.sorted_data.sorted_by_most_tested = dataObject.data.states
    .sort((a, b) => b.tested.number - a.tested.number)
    .map((state) => {
      return {
        name: state.name,
        name_abbrevation: state.name_abbrevation,
        tested: state.tested,
      };
    });

  dataObject.data.sorted_data.sorted_by_most_vaccinated_first_dose =
    dataObject.data.states
      .sort(
        (a, b) =>
          b.vaccinated_first_dose.number - a.vaccinated_first_dose.number
      )
      .map((state) => {
        return {
          name: state.name,
          name_abbrevation: state.name_abbrevation,
          vaccinated_first_dose: state.vaccinated_first_dose,
        };
      });

  dataObject.data.sorted_data.sorted_by_most_vaccinated_second_dose =
    dataObject.data.states
      .sort(
        (a, b) =>
          b.vaccinated_second_dose.number - a.vaccinated_second_dose.number
      )
      .map((state) => {
        return {
          name: state.name,
          name_abbrevation: state.name_abbrevation,
          vaccinated_second_dose: state.vaccinated_second_dose,
        };
      });

  if (options.state) {
    const filter = (state) =>
      state.name.toLowerCase() === options.state.toLowerCase() ||
      state.name_abbrevation.toLowerCase() === options.state.toLowerCase();
    const state = dataObject.data.states.find(filter);

    const didYouMean = dataObject.data.states
      .filter(
        (state) =>
          state.name.toLowerCase().includes(options.state.toLowerCase()) ||
          state.name_abbrevation
            .toLowerCase()
            .includes(options.state.toLowerCase())
      )
      .map((filtered) => filtered.name);

    if (!state) {
      dataObject = {
        success: false,
        message: "Invalid state provided.",
        data: [],
        didYouMean,
      };
    } else {
      dataObject = {
        success: true,
        data: state,
      };
    }
  }

  return dataObject;
};

module.exports.restructuredData = restructuredData;
