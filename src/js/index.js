"use strict";
// import { WebElement } from "selenium-webdriver/lib/webdriver";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChildrenItemProcessor = exports.IndexItemProcessor = exports.ItemProcessor = exports.clearLIElementsFromElement = exports.renderPageByURL = exports.renderIndexPage = exports.writeItemsToHTMLList = exports.getHTMLListByID = exports.reachAPI = void 0;
var rootURL = "https://swapi.dev/api/";
function reachAPI(url) {
    return __awaiter(this, void 0, void 0, function () {
        var response, movies;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(url)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    movies = _a.sent();
                    return [2 /*return*/, movies];
            }
        });
    });
}
exports.reachAPI = reachAPI;
function getHTMLListByID(id) {
    return document.querySelector(id);
}
exports.getHTMLListByID = getHTMLListByID;
function writeItemsToHTMLList(items, ulElementHandle, processor) {
    // This function writes items from an Object to some HTML <ul> element.
    var newUlElementHandle = __assign({}, ulElementHandle);
    // Extract the keys in an array.
    var objectKeys = Object.keys(items);
    var objectValues = Object.values(items);
    /* Iterate using the keys, and process each item. This means that
     we crate a list element for each item that contains a hyperlink
     <a> field. Such hyperlink contains the key as its innerText,
     and the url as the href attribute.*/
    for (var i = 0; i < objectKeys.length; i++) {
        var objectKey = objectKeys[i];
        var objectValue = objectValues[i];
        processor.createChild(objectKey, objectValue, ulElementHandle);
    }
}
exports.writeItemsToHTMLList = writeItemsToHTMLList;
function renderIndexPage() {
    reachAPI(rootURL).then(function (data) {
        var ulItem = document.querySelector(".index-content");
        var processor = new IndexItemProcessor();
        writeItemsToHTMLList(data, ulItem, processor);
    });
}
exports.renderIndexPage = renderIndexPage;
function renderPageByURL(url) {
    reachAPI(url).then(function (data) {
        // First, get the UL element handle.
        var ulItem = document.querySelector(".index-content");
        // Then, clear the UL element from any children it may contain.
        clearLIElementsFromElement(ulItem);
        // From data, we extract the URLs of the previous and next pages. This 
        // will useful for navigation purposes.
        var nextPage = data["next"];
        var previousPage = data["previous"];
        // Then, we extract the actual data that we will render in our page 
        // (aka results).
        var results = data["results"];
        var processor = new ChildrenItemProcessor();
        // Then, write results to the UL element.
        writeItemsToHTMLList(results, ulItem, processor);
    });
}
exports.renderPageByURL = renderPageByURL;
function clearLIElementsFromElement(ulElement) {
    // We need a function that removes LI Element from the index-content
    // UL Element. This is because we are implementing a single page app.
    // Iterate to remove all the children.
    while (ulElement.firstChild) {
        ulElement.removeChild(ulElement.firstChild);
    }
}
exports.clearLIElementsFromElement = clearLIElementsFromElement;
var ItemProcessor = /** @class */ (function () {
    function ItemProcessor() {
    }
    return ItemProcessor;
}());
exports.ItemProcessor = ItemProcessor;
var IndexItemProcessor = /** @class */ (function (_super) {
    __extends(IndexItemProcessor, _super);
    function IndexItemProcessor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.INDEX_SECTIONS_MAPPING = {
            people: "People",
            planets: "Planets",
            films: "Films",
            species: "Species",
            vehicles: "Vehicles",
            starships: "Starships",
        };
        return _this;
    }
    IndexItemProcessor.prototype.createChild = function (objectKey, objectValue, parentHandle) {
        var sectionName = this.INDEX_SECTIONS_MAPPING[objectKey];
        if (sectionName !== undefined) {
            // Create the list element.
            var li = document.createElement("li");
            // Create the hyperlink element, and set some of its attributes.
            var a = document.createElement("a");
            a.setAttribute("class", "index-item");
            // Add a listener for "click". In our case, whenever a section is
            // clicked we want to render its content in the same index-content
            // UL element.
            a.onclick = function () {
                var newItems = renderPageByURL(objectValue.toString());
            };
            // Set the text to the mapping we created in this file. This is so the text makes more sense.
            a.innerText = sectionName.toString();
            // Append the hyperlink to the list element.
            li.appendChild(a);
            parentHandle.appendChild(li);
        }
    };
    return IndexItemProcessor;
}(ItemProcessor));
exports.IndexItemProcessor = IndexItemProcessor;
var ChildrenItemProcessor = /** @class */ (function (_super) {
    __extends(ChildrenItemProcessor, _super);
    function ChildrenItemProcessor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* This class is used to create children using for a specified
    parent handle.
    */
    ChildrenItemProcessor.prototype.createChild = function (objectKey, objectValue, parentHandle) {
        // In the case of children, we don't filter any element in order to render the right names
        // using a dictionary. Instead, we just grab the items and render their .name property.
        console.log(Object.values(objectValue), typeof (objectValue));
        // Create the list element.
        var li = document.createElement("li");
        // Create the hyperlink element, and set some of its attributes.
        var a = document.createElement("a");
        a.setAttribute("class", "index-item");
        // Retrieve the name, and use it as the innerText of the <a> element.
        // Notice that we create a key object in order to extract it's value from the object.
        var nameKey = "name";
        a.innerText = objectValue[nameKey].toString();
        // Set the text to the mapping we created in this file. This is so the text makes more sense.
        a.innerText = objectValue[nameKey].toString();
        // Append the hyperlink to the list element.
        li.appendChild(a);
        parentHandle.appendChild(li);
    };
    return ChildrenItemProcessor;
}(ItemProcessor));
exports.ChildrenItemProcessor = ChildrenItemProcessor;
