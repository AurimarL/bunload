import { DynamicModule, Global, Module } from "@nestjs/common";
import payload, { type Payload } from "payload";
import buildConfig from "../payload.config";
import { PAYLOAD_INSTANCE } from "./payload.constants";

@Global()
@Module({})
// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class PayloadModule {
	static forRoot(): DynamicModule {
		const payloadProvider = {
			provide: PAYLOAD_INSTANCE,
			useFactory: async (): Promise<Payload> => {
				const instance = await payload.init({
					config: buildConfig,
				});
				return instance;
			},
		};

		return {
			module: PayloadModule,
			providers: [payloadProvider],
			exports: [payloadProvider],
		};
	}
}
