/** Pragma to use jsdom for these tests.
 * See: https://jestjs.io/docs/configuration#testenvironment-string
 * @jest-environment jsdom
 */

import {
  reachAPI,
  writeItemsToHTMLList,
  INDEX_SECTIONS_MAPPING,
} from "../src/js/index";

describe("Unit tests for function writeItemsToHTMLList.", () => {
  test("Created items contain hyperlink elements <a> inside.", async () => {
    // Create a dummy ul element, to which we will add an li item.
    const dummyUL = document.createElement("ul");

    // Create a dummy item to add. We define such item as a
    // dictionary, which represents a page ID and its url
    const dummyItems = { species: "someURL" };

    // Run the specimen function.
    const returnedUL = writeItemsToHTMLList(dummyItems, dummyUL);

    // Extract the created li item from the updated ul.
    const liElement = <HTMLElement>returnedUL.querySelector(".index-item");

    expect(liElement.getAttribute("href")).toBe("someURL");
  });

  test("Renders mapped name, not field name provided by the API.", () => {
    const dummyUL = document.createElement("ul");

    // Create a dummy item to add. We define such item as a
    // dictionary, which represents a page ID and its url
    const dummyItems = { planets: "someURL" };

    // Run the specimen function.
    const returnedUL = writeItemsToHTMLList(dummyItems, dummyUL);

    // Extract the created li item from the updated ul.
    const liElement = <HTMLElement>returnedUL.querySelector(".index-item");

    expect(liElement.innerText).toBe("Planets");
  });

  test("Can write multiple items to index-ul", () => {
    // Create a dummy ul element, to which we will add an li item.
    const dummyUL = document.createElement("ul");

    // Create a list of dummy items to add.
    const dummyItems = { planets: "someURL", starships: "yetAnotherURL" };

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
    expect(nodeItem.innerText).toBe("Planets");

    // Extract the second node from NodeList liElements.
    nodeItem = <HTMLElement>liElements[1];
    expect(nodeItem.innerText).toBe("Starships");
  });

  test("Doesn't render entries that don't exist in the section dictionary", () => {
    // Create a dummy ul element, to which we will add an li item.
    const dummyUL = document.createElement("ul");

    // Create a list of dummy items to add.
    const dummyItems = {
      planets: "someURL",
      dummy: "yetAnotherURL",
      starships: "url3",
    };

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
    expect(nodeItem.innerText).toBe("Planets");

    // The third entry should exist, but in position 2 (starship). The unexisting
    // one just got skipped
    nodeItem = <HTMLElement>liElements[1];

    // Verify that the first item contains innerText "planets"
    expect(nodeItem.innerText).toBe("Starships");

    // Try to extract the third node from NodeList liElements. Since this
    // one doesn't exist in the Section object, it should be undefined.
    nodeItem = <HTMLElement>liElements[2];
    expect(nodeItem).toBe(undefined);
  });
});
