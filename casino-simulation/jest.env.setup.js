import { TextEncoder, TextDecoder } from "util";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;



global.importMetaEnv = { VITE_API_URL: "http://localhost:5000/api" };
global.import = { meta: { env: global.importMetaEnv } };