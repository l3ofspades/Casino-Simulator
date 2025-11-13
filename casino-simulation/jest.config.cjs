module.exports = {
  testEnvironment: "jsdom",

  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },

  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/__mocks__/fileMock.js"
  },

  transformIgnorePatterns: [
    "/node_modules/(?!(@mongoosejs|mongoose|mongodb|bson)/)"
  ],

  // IMPORTANT — load base env before Jest starts
  setupFiles: ["<rootDir>/jest.env.setup.js"],

  
  setupFilesAfterEnv: [
    "<rootDir>/jest.dom.setup.js",
    "<rootDir>/jest.setup.js"   
  ],
};
