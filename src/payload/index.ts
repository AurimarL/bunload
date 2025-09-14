import config from "@payload-config";
import { getPayload } from "payload";

const payloadConfig = await config;
const payload = await getPayload({ config: payloadConfig });

export default payload;
