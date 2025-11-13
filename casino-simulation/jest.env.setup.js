const { TextEncoder, TextDecoder } = require("util");

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock Vite environment variables for tests
global.importMetaEnv = { VITE_API_URL: "http://localhost:5000/api" };
global.import = { meta: { env: global.importMetaEnv } };
process.env.VITE_API_URL = "http://localhost:5000/api";
