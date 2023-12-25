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
let driver;
jest.setTimeout(20000);
beforeAll(() => {
  
  driver = new Builder().forBrowser("firefox").build();
});

afterAll(() => {
  driver.close();
})

const waitUntilTime = 20000;
// let driver, el, actual, expected;
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 60 * 5;

describe("testing index file", () => {
  test("Writes elements in the index ul.", async () => {
    await driver.get("file:///home/antonior/Projects/sw/src/index.html");    
    const ulItem = await driver.findElement(By.className("index-content"));
    console.log(ulItem);
  });
});


