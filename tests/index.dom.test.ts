/** Pragma to use jsdom for these tests.
 * See: https://jestjs.io/docs/configuration#testenvironment-string
 * @jest-environment jsdom
 */

import {
  reachAPI,
  writeItemsToHTMLList,
  IndexItemProcessor,
  ItemProcessor,
  clearLIElementsFromElement,
  renderPageByURL,
} from "../src/js/index";

describe("Unit tests for function writeItemsToHTMLList.", () => {
  test("Created items contain onclick function.", async () => {
    // Create a dummy ul element, to which we will add an li item.
    const dummyUL = document.createElement("ul");

    // Create a dummy item to add. We define such item as a
    // dictionary, which represents a page ID and its url
    const dummyItems = { species: "someURL" };

    // Run the specimen function.
    const processor = new IndexItemProcessor();
    writeItemsToHTMLList(dummyItems, dummyUL, processor);

    // Extract the created li item from the updated ul.
    const liElement = <HTMLElement>dummyUL.querySelector(".index-item");

    // Verify that the onclick function is not empty, which means that a
    // priori we managed to set a callback function.
    expect(liElement.onclick).not.toBe(null);
  });

  test("Renders mapped name, not field name provided by the API.", () => {
    const dummyUL = document.createElement("ul");

    // Create a dummy item to add. We define such item as a
    // dictionary, which represents a page ID and its url
    const dummyItems = { planets: "someURL" };

    // Run the specimen function.
    const processor = new IndexItemProcessor();
    writeItemsToHTMLList(dummyItems, dummyUL, processor);

    // Extract the created li item from the updated ul.
    const liElement = <HTMLElement>dummyUL.querySelector(".index-item");

    expect(liElement.innerText).toBe("Planets");
  });

  test("Can write multiple items to index-ul", () => {
    // Create a dummy ul element, to which we will add an li item.
    const dummyUL = document.createElement("ul");

    // Create a list of dummy items to add.
    const dummyItems = { planets: "someURL", starships: "yetAnotherURL" };

    // Run the specimen function.
    const processor = new IndexItemProcessor();
    writeItemsToHTMLList(dummyItems, dummyUL, processor);

    // Extract the created li items from the updated ul. Notice that
    // querySelectorAll returns a NodeList, as opposed HTMLElement.
    const liElements = dummyUL.querySelectorAll(".index-item");

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
    const dummyItems: Object = {
      planets: "someURL",
      dummy: "yetAnotherURL",
      starships: "url3",
    };

    // Run the specimen function.
    const processor = new IndexItemProcessor();
    writeItemsToHTMLList(dummyItems, dummyUL, processor);

    // Extract the created li items from the updated ul. Notice that
    // querySelectorAll returns a NodeList, as opposed HTMLElement.
    const liElements = dummyUL.querySelectorAll(".index-item");

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

  test("Can remove children from UL element.", () => {
    const dummyUL = document.createElement("ul");

    // Create two children LI for our UL element.
    // Create a list of dummy items to add.
    const dummyItems = {
      planets: "planetURL",
      people: "peopleURL",
      starships: "starshipURL",
    };

    // Use the writeItemsToHTMLList to attach the children to a UL.
    // We don't care about the rest of features of such function, but
    // only about the UL it returns.
    const processor = new IndexItemProcessor();
    writeItemsToHTMLList(dummyItems, dummyUL, processor);

    // Assert that such UL contains three children.
    expect(dummyUL.children.length).toBe(3);

    // Now, run the specimen function to remove children from the UL element.
    clearLIElementsFromElement(dummyUL);

    // Verify that after running the specimen function, there are no elements
    // left in the ul.
    expect(dummyUL.children.length).toBe(0);
  });

  test.skip("Tests for renderPageByURL()", () => {
    // This needs a system test, because we cannot mock the reachAPI
    // function, at least for now.
  });
});

describe("Tests for IndexItemProcessor", () => {
  let specimen: IndexItemProcessor;

  test("Implements ItemProcessor", () => {
    expect(specimen).toBeInstanceOf(ItemProcessor);
  });

  test("Creates child on demand", () => {
    const parentHandle = document.createElement("ul");

    const dictionary = {
      people: "peopleURL",
    };

    const objectKey = <keyof Object>Object.keys(dictionary)[0];
    specimen.createChild(objectKey, Object.values(dictionary), parentHandle);

    // The parent handle should contain a single child
    expect(parentHandle.children.length).toBe(1);

    // The child should have innerText People, which exists in our entries dictionary
    // for the index page.
    const liElement = <HTMLElement>parentHandle.querySelector(".index-item");
    expect(liElement.innerText).toBe("People");

    // Verify that the onclick function is not empty for the child element.
    // This is the function that will render the items of the subpage.
    expect(liElement.onclick).not.toBe(null);
  });

  test("Doesn't create a child if Key doesn't exist in INDEX_SECTIONS_MAPPING", () => {
    const parentHandle = document.createElement("ul");

    // Add three elements: two valid and a single invalid one.
    const dictionary = {      
      dummy: "dummyURL",      
    };

    const objectKey = <keyof Object>Object.keys(dictionary)[0];
    specimen.createChild(objectKey, Object.values(dictionary), parentHandle);

    // Given that dummy is not part of the INDEX_SECTIONS_MAPPING property, the 
    // parent handle should have no children.
    expect(parentHandle.children.length).toBe(0);
  });

  beforeEach(() => {
    // Reset the specimen before every test case.
    specimen = new IndexItemProcessor();
  });
});
