// import { WebElement } from "selenium-webdriver/lib/webdriver";

const rootURL: string = "https://swapi.dev/api/";

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
  // Extract the keys in an array.
  const objectKeys = Object.keys(items) as Array<keyof Object>;
  const objectValues = Object.values(items) as Array<Object>;

  /* Iterate using the keys, and process each item. This means that 
   we crate a list element for each item that contains a hyperlink
   <a> field. Such hyperlink contains the key as its innerText, 
   and the url as the href attribute.*/
  for (let i: number = 0; i < objectKeys.length; i++) {
    const objectKey: string = objectKeys[i];
    const objectValue: Object = objectValues[i];
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

export function renderPageByURL(url: string) {
  reachAPI(url).then((data) => {
    // First, get the UL element handle.
    const ulItem = <HTMLElement>document.querySelector(".index-content");

    // Then, clear the UL element from any children it may contain.
    clearLIElementsFromElement(ulItem);
    
    // From data, we extract the URLs of the previous and next pages. This 
    // will useful for navigation purposes.
    const nextPage = data["next"];
    const previousPage = data["previous"];

    // Then, we extract the actual data that we will render in our page 
    // (aka results).
    const results = data["results"];

    const processor = new ChildrenItemProcessor();
    // Then, write results to the UL element.
    writeItemsToHTMLList(results, ulItem, processor);
  });
}

export function clearLIElementsFromElement(ulElement: HTMLElement) {
  // We need a function that removes LI Element from the index-content
  // UL Element. This is because we are implementing a single page app.

  // Iterate to remove all the children.
  while (ulElement.firstChild) {
    ulElement.removeChild(ulElement.firstChild);
  }
}

export abstract class ItemProcessor {
  /* This class is used to create children using for a specified
  parent handle.
  */
  abstract createChild(
    objectKey: string,
    objectValues: Object,
    parentHandle: HTMLElement
  ): void;
}

export class IndexItemProcessor extends ItemProcessor {
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
  ): void {
    const sectionName: Object = this.INDEX_SECTIONS_MAPPING[objectKey];
    if (sectionName !== undefined) {
      // Create the list element.
      const li = document.createElement("li");

      // Create the hyperlink element, and set some of its attributes.
      const a = document.createElement("a");
      a.setAttribute("class", "index-item");
      // Add a listener for "click". In our case, whenever a section is
      // clicked we want to render its content in the same index-content
      // UL element.
      a.onclick = () => {
        const newItems = renderPageByURL(objectValue.toString());
      };

      // Set the text to the mapping we created in this file. This is so the text makes more sense.
      a.innerText = sectionName.toString();

      // Append the hyperlink to the list element.
      li.appendChild(a);

      parentHandle.appendChild(li);
    }
  }
}

export class ChildrenItemProcessor extends ItemProcessor {
  /* This class is used to create children using for a specified
  parent handle.
  */
  createChild(
    objectKey: string,
    objectValue: Object,
    parentHandle: HTMLElement
  ): void {
    // In the case of children, we don't filter any element in order to render the right names
    // using a dictionary. Instead, we just grab the items and render their .name property.    

     // Create the list element.
     const li = document.createElement("li");

     // Create the hyperlink element, and set some of its attributes.
     const a = document.createElement("a");
     a.setAttribute("class", "index-item");
     // Retrieve the name, and use it as the innerText of the <a> element.
     // Notice that we create a key object in order to extract it's value from the object.
     const nameKey = "name" as keyof typeof objectValue;
     a.innerText = objectValue[nameKey].toString();

     // Set the text to the mapping we created in this file. This is so the text makes more sense.
     a.innerText = objectValue[nameKey].toString();

     // Append the hyperlink to the list element.
     li.appendChild(a);

     parentHandle.appendChild(li);
  }
}
