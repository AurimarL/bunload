import { Injectable } from "@nestjs/common";
import type { Payload } from "payload";
import { InjectPayload } from "../payload/inject-payload.decorator";

@Injectable()
export class AppService {
  constructor(@InjectPayload() private readonly payload: Payload) { }

  async getPong(): Promise<string> {
    console.log((await this.payload.find({ collection: "users" })).docs)
    return "Pong";
  }
}
