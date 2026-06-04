import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ cacheDir: 'C:/Users/shive/Downloads/template/tina/__generated__/.cache/1780553487191', url: 'http://localhost:4001/graphql', token: 'null', queries,  });
export default client;
  