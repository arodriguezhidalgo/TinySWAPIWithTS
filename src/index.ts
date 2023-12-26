// import { WebElement } from "selenium-webdriver/lib/webdriver";

export async function reachAPI() {
  const response = await fetch("https://swapi.dev/api/");
  const movies = await response.json();
  return movies;
}

export function getHTMLListByID(id: string): HTMLElement {
  return document.querySelector(id) as HTMLElement;
}

export function writeItemsToHTMLList(
  items: Object,
  ulElementHandle: HTMLElement
): HTMLElement {
  // This function writes items from an Object to some HTML <ul> element.

  // Extract the keys in an array.
  const objectKeys = Object.keys(items) as Array<keyof Object>;

  // Iterate using the keys, and process each item.
  for (let key of objectKeys) {
    const li = document.createElement("li");
    li.setAttribute("class", "index-item");
    li.innerText = key;

    ulElementHandle.appendChild(li);
  }

  return <HTMLElement>ulElementHandle;
}

export function renderIndexPage() {
  reachAPI().then((data) => {
    const ulItem = <HTMLElement>document.querySelector(".index-content");
    writeItemsToHTMLList(data, ulItem);
  });
}

