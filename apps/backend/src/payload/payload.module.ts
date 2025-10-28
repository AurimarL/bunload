import { DynamicModule, Global, Module } from "@nestjs/common";
import payload, { type Payload } from "payload";
import buildConfig from "../payload.config";
import { PAYLOAD_INSTANCE } from "./payload.constants";

@Global()
@Module({})
export class PayloadModule {
	static forRootAsync(): DynamicModule {
		const payloadProvider = {
			provide: PAYLOAD_INSTANCE,
			useFactory: async (): Promise<Payload> => {
				try {
					const instance = await payload.init({ config: buildConfig });
					return instance;
				} catch (err) {
					console.error("Failed to initialize Payload:", err);
					throw err;
				}
			}
		};

		return {
			module: PayloadModule,
			providers: [payloadProvider],
			exports: [payloadProvider],
		};
	}
}
