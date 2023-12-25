/** Pragma to use jsdom for these tests.
 * See: https://jestjs.io/docs/configuration#testenvironment-string
 * @jest-environment jsdom
 */

import { reachAPI, writeItemsToHTMLList } from "../src/index";

describe("testing index file", () => {
  test("Can write single item to HTMLElement", () => {
    // Create a dummy ul element, to which we will add an li item.
    const dummyUL =  document.createElement("ul");    

    // Create a dummy item to add. We define such item as a 
    // dictionary, which represents a page ID and its url
    const dummyItems = {"pageID": "someURL"};

    // Run the specimen function.
    const returnedUL = writeItemsToHTMLList(dummyItems, dummyUL);

    // console.log(newUL?.querySelector(".index-item")?.innerHTML);
    // Extract the created li item from the updated ul.
    const liElement = <HTMLElement> returnedUL.querySelector(".index-item");
    expect(liElement.innerText).toBe("pageID");
    
  });
});
