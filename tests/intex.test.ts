const { Builder, By, Key, until } = require("selenium-webdriver");
import { reachAPI } from "../src/index";
import "selenium-webdriver/firefox";
import "geckodriver";
// import "jasmine";

async function getElementById(id) {
  const el = await driver.wait(until.elementLocated(By.id(id)), waitUntilTime);
  return await driver.wait(until.elementIsVisible(el), waitUntilTime);
}
async function getElementByXPath(xpath) {
  const el = await driver.wait(
    until.elementLocated(By.xpath(xpath)),
    waitUntilTime
  );
  return await driver.wait(until.elementIsVisible(el), waitUntilTime);
}

// Initialize selenium
const rootURL = "https://www.mozilla.org/en-US/";
const d = new Builder().forBrowser("firefox").build();
const waitUntilTime = 20000;
let driver, el, actual, expected;
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 60 * 5;

describe("testing index file", () => {
  test("SWAPI should return some default fields that we can then read.", async () => {
    const a = await reachAPI();
    expect(Object.keys(a)).toEqual([
      "people",
      "planets",
      "films",
      "species",
      "vehicles",
      "starships",
    ]);
  });
});
