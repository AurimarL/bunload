// tests/app.test.ts
import { describe, it, expect, beforeEach } from "bun:test";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

describe("AppController", () => {
  let appController: AppController;

  beforeEach(() => {
    const mockPayload = {
      find: async () => ({ docs: [] }),
    } as any; // simplifica o tipo

    const appService = new AppService(mockPayload);
    appController = new AppController(appService);
  });

  describe("root", () => {
    it('should return "Pong"', async () => {
      expect(await appController.getPong()).toBe("Pong");
    });
  });
});
