// import { WebElement } from "selenium-webdriver/lib/webdriver";

const rootURL: string = "https://swapi.dev/api/";
// export const INDEX_SECTIONS_MAPPING: Object = {
//   people: "People",
//   planets: "Planets",
//   films: "Films",
//   species: "Species",
//   vehicles: "Vehicles",
//   starships: "Starships",
// };

export async function reachAPI(url: string) {
  const response = await fetch(url);
  const movies = await response.json();
  return movies;
}

export function getHTMLListByID(id: string): HTMLElement {
  return document.querySelector(id) as HTMLElement;
}

export function writeItemsToHTMLList(
  items: Object,
  ulElementHandle: HTMLElement, 
  processor: ItemProcessor
) {
  // This function writes items from an Object to some HTML <ul> element.

  const newUlElementHandle = { ...ulElementHandle };
  console.log(items);
  // Extract the keys in an array.
  const objectKeys = Object.keys(items) as Array<keyof Object>;
  const objectValues = Object.values(items) as Array<Object>;

  /* Iterate using the keys, and process each item. This means that 
   we crate a list element for each item that contains a hyperlink
   <a> field. Such hyperlink contains the key as its innerText, 
   and the url as the href attribute.*/
  for (let i: number = 0; i < objectKeys.length; i++) {
    const objectKey : string = objectKeys[i];
    const objectValue : Object = objectValues[i];
    processor.createChild(objectKey, objectValue, ulElementHandle);
  }
}

export function renderIndexPage() {
  reachAPI(rootURL).then((data) => {
    const ulItem = <HTMLElement>document.querySelector(".index-content");
    const processor = new IndexItemProcessor();
    writeItemsToHTMLList(data, ulItem, processor);
  });
}

// export function renderPageByURL(url: Object) {
//   reachAPI(url).then((data) => {
//     // First, get the UL element handle.
//     const ulItem = <HTMLElement>document.querySelector(".index-content");
//     console.log(ulItem.children);
//     // Then, clear the UL element from any children it may contain.
//     clearLIElementsFromElement(ulItem);

//     const processor = new IndexItemProcessor();
//     // Then, write data to the UL element.
//     console.log(ulItem.children, data);
//     writeItemsToHTMLList(data, ulItem, processor);
//     console.log(ulItem.children);
//   });
// }

export function clearLIElementsFromElement(ulElement: HTMLElement) {
  // We need a function that removes LI Element from the index-content
  // UL Element. This is because we are implementing a single page app.

  // Iterate to remove all the children.
  while (ulElement.firstChild) {
    ulElement.removeChild(ulElement.firstChild);
  }
}

abstract class ItemProcessor {
  abstract createChild( objectKey: string,
    objectValues: Object,
    parentHandle: HTMLElement) : void;
}

export class IndexItemProcessor extends ItemProcessor{
  private INDEX_SECTIONS_MAPPING: Object = {
    people: "People",
    planets: "Planets",
    films: "Films",
    species: "Species",
    vehicles: "Vehicles",
    starships: "Starships",
  };

  createChild(
    objectKey: keyof Object,
    objectValue: Object,
    parentHandle: HTMLElement
  ) {
    // Create the list element.
    const li = document.createElement("li");

    // Create the hyperlink element, and set some of its attributes.
    const a = document.createElement("a");
    a.setAttribute("class", "index-item");
    // Add a listener for "click". In our case, whenever a section is
    // clicked we want to render its content in the same index-content
    // UL element.
    // a.onclick = async () => {
    //   const newItems = await renderPageByURL(objectValue);
    //   console.log(newItems);
    // };

    // Set the text to the mapping we created in this file. This is so the text makes more sense.
    const sectionName : Object= this.INDEX_SECTIONS_MAPPING[objectKey];
    if ( sectionName !== undefined) {
      a.innerText = sectionName.toString();

      // Append the hyperlink to the list element.
      li.appendChild(a);

      parentHandle.appendChild(li);
    }
  }
}
