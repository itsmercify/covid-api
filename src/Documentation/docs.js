module.exports = {
  docs: [
    {
      name: "/api/all",
      description: "Returns JSON object with data about all the states.",
      url: "http://localhost:3000/api/all",
      message_near_hyperlink: null,
    },
    {
      name: "/api/{state}",
      description:
        "Returns JSON object with data about the specified Indian state.",
      url: "http://localhost:3000/api/kerala",
      message_near_hyperlink: "(Example state: Kerala)",
    },
  ],
};
