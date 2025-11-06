
require("@testing-library/jest-dom");


global.importMetaEnv = { VITE_API_URL: "http://localhost:5000/api" };
global.import = { meta: { env: global.importMetaEnv } };
