module.exports.db = {
  users : [
    {
      id: 0,
      name: "John",
      age: 33,
      comments: [
        {
          date: 01022020,
          commentID: 316751,
          text: "lorem ipsum ..."
        }
      ]
    },
    {
      id: 1,
      name: "Lily",
      age: 30,
      comments: [
        {
          date: 03042020,
          commentID: 314713,
          text: "lorem ipsum ..."
        }
      ]
    }
  ],
  products: [
    {
      id: 1,
      type: "laptop",
      brand: "Qualcomm",
      model: "9CXE",
      details: {
        memory: "16GB DDR5",
        storage: "1TB SSD",
        cpu: "Qualcomm 9XC"
      }
    },

  ]
};