import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ cacheDir: 'C:/Users/shive/Downloads/template/tina/__generated__/.cache/1780653771297', url: 'http://localhost:4001/graphql', token: '', queries,  });
export default client;
  