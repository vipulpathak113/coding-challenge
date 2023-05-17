// add this to a jest.config.js file
module.exports = {
  testEnvironment: "jsdom",
  // important to expose all the jest-dom api globally in each test
   setupFilesAfterEnv: ["@testing-library/jest-dom/"]
 };
 