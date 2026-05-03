import { describe, expect, test } from "vitest";
import { IncomingHttpHeaders } from "http";
import { getAPIKey } from "../api/auth.js";

describe("headers", () => {
  test("x-api-key is defined", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey test-api-key",
    };
    const result = getAPIKey(headers);

    expect(result).toBeDefined();
    expect(result).toBe("test-api-key");
  });

  test("x-api-key is inprovided", () => {
    const headers: IncomingHttpHeaders = {};
    const result = getAPIKey(headers);

    expect(result).toBeNull();
  });

  test("returns null if the authorization type is not ApiKey (for example, Bearer)", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "Bearer test-api-key",
    };
    const result = getAPIKey(headers);

    expect(result).toBeNull();
  });

  test("returns null if the key is missing (only ApiKey is provided)", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey",
    };
    const result = getAPIKey(headers);

    expect(result).toBeNull();
  });
});
