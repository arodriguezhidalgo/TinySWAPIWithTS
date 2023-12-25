export async function reachAPI() {
  const response = await fetch("https://swapi.dev/api/");
  const movies = await response.json();
  return movies;
}

function getHTMLListByID(id: string): HTMLElement {
  return document.querySelector(id) as HTMLElement;
}

export function writeItemsToHTMLList(
  items: Object,
  ulElementHandle: HTMLElement
): void {
  // This function writes items from an Object to some HTML <ul> element.
}
