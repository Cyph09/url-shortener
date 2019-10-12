module.exports = {
  ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 5000,
  MONGODB_URI:
    process.MONGODB_URI ||
    "mongodb+srv://mhina:mhina123@cluster0-s4yha.mongodb.net/test?retryWrites=true&w=majority",
  BASE_URL: "http://localhost:5000/"
  //   const production  = 'https://examplePage.com';
  // const development = 'http://localhost:3000/';
  // const url = (process.env.NODE_ENV ? production : development);
};
