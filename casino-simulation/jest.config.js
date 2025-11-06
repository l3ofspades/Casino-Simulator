export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
transformIgnorePatterns: [
  "/node_modules/(?!(@mongoosejs|mongoose|mongodb|bson)/)"
],

  
  setupFiles: ["<rootDir>/jest.env.setup.js"],        
  setupFilesAfterEnv: ["<rootDir>/jest.dom.setup.js"] 
};
