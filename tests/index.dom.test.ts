/** Pragma to use jsdom for these tests.
 * See: https://jestjs.io/docs/configuration#testenvironment-string
 * @jest-environment jsdom
 */

import { reachAPI, writeItemsToHTMLList } from "../src/index";

describe("Unit tests for function writeItemsToHTMLList.", () => {
  test("Can write single item to index-ul.", () => {
    // Create a dummy ul element, to which we will add an li item.
    const dummyUL = document.createElement("ul");

    // Create a dummy item to add. We define such item as a
    // dictionary, which represents a page ID and its url
    const dummyItems = { pageID: "someURL" };

    // Run the specimen function.
    const returnedUL = writeItemsToHTMLList(dummyItems, dummyUL);

    // Extract the created li item from the updated ul.
    const liElement = <HTMLElement>returnedUL.querySelector(".index-item");
    expect(liElement.innerText).toBe("pageID");
  });

  test("Can write multiple items to index-ul", () => {
    // Create a dummy ul element, to which we will add an li item.
    const dummyUL = document.createElement("ul");

    // Create a list of dummy items to add.
    const dummyItems = { planets: "someURL", ships: "yetAnotherURL" };

    // Run the specimen function.
    const returnedUL = writeItemsToHTMLList(dummyItems, dummyUL);

    // Extract the created li items from the updated ul. Notice that
    // querySelectorAll returns a NodeList, as opposed HTMLElement.
    const liElements = returnedUL.querySelectorAll(".index-item");

    // We extract the first node and cast it to HTMLElement. Otherwise,
    // TS doesn't want to extract its innerText (it thinks it's of
    // generic Element class).
    let nodeItem = <HTMLElement>liElements[0];

    // Verify that the first item contains innerText "planets"
    expect(nodeItem.innerText).toBe("planets");

    // Extract the second node from NodeList liElements.
    nodeItem = <HTMLElement>liElements[1];
    expect(nodeItem.innerText).toBe("ships");
  });

  test("Created items contain hyperlink elements <a> inside.", async () => {
    // Create a dummy ul element, to which we will add an li item.
    const dummyUL = document.createElement("ul");

    // Create a dummy item to add. We define such item as a
    // dictionary, which represents a page ID and its url
    const dummyItems = { pageID: "someURL" };

    // Run the specimen function.
    const returnedUL = writeItemsToHTMLList(dummyItems, dummyUL);

    // Extract the created li item from the updated ul.
    const liElement = <HTMLElement>returnedUL.querySelector(".index-item");

    expect(liElement.getAttribute("href")).toBe("someURL");
  });
});
