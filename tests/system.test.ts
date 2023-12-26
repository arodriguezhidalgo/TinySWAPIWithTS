
const { Builder, By, Key, until } = require("selenium-webdriver");
import { reachAPI, writeItemsToHTMLList } from "../src/index";
import "selenium-webdriver/firefox";
import "geckodriver";

// Initialize selenium
const rootURL = "file:///home/antonior/Projects/sw/src/index.html";
// let driver, document;
// Increase timeout so the browser has enough time to open.
jest.setTimeout(20000);
let driver: any;
// Setup.
beforeAll(async () => {
  // Create the driver object.
  driver = new Builder().forBrowser("firefox").build();
  console.log(driver)
  // document = driver.document;
  // Locate our index web page, which will work as our test fixture.
  await driver.get(rootURL);
});

// Teardown.
afterAll(() => {
  driver.close();
});

async function getElementById(id : string) {
  const el = await driver.wait(until.elementLocated(By.id(id)), waitUntilTime);
  return await driver.wait(until.elementIsVisible(el), waitUntilTime);
}
async function getElementByXPath(xpath: string) {
  const el = await driver.wait(
    until.elementLocated(By.xpath(xpath)),
    waitUntilTime
  );
  return await driver.wait(until.elementIsVisible(el), waitUntilTime);
}


const waitUntilTime = 20000;
// let driver, el, actual, expected;
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 60 * 5;

describe("testing index file", () => {
  test("Writes elements in the index ul.", async () => {
    // More about locators here: https://www.selenium.dev/documentation/webdriver/elements/locators/
    const ulItem = <HTMLElement> await driver.findElement(By.className("index-content"));
    console.log(ulItem);
    
    // Create a list of dummy items. For now, we don't use the URL.
    const dummyItems = { planets: "someURL", ships: "yetAnotherURL" };

    // const newULItem = writeItemsToHTMLList(dummyItems, ulItem);    
    
    // Get the parent
    // const parentDiv = ulItem.parentNode;
    // parentDiv.replaceChild(ulItem, newULItem);
  });
});
