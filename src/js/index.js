"use strict";
// import { WebElement } from "selenium-webdriver/lib/webdriver";
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
exports.renderIndexPage = exports.writeItemsToHTMLList = exports.getHTMLListByID = exports.reachAPI = exports.INDEX_SECTIONS_MAPPING = void 0;
var rootURL = "https://swapi.dev/api/";
exports.INDEX_SECTIONS_MAPPING = {
    people: "People",
    planets: "Planets",
    films: "Films",
    species: "Species",
    vehicles: "Vehicles",
    starships: "Starships",
};
function reachAPI() {
    return __awaiter(this, void 0, void 0, function () {
        var response, movies;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(rootURL)];
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
function writeItemsToHTMLList(items, ulElementHandle) {
    // This function writes items from an Object to some HTML <ul> element.
    // Extract the keys in an array.
    var objectKeys = Object.keys(items);
    var objectValues = Object.values(items);
    /* Iterate using the keys, and process each item. This means that
     we crate a list element for each item that contains a hyperlink
     <a> field. Such hyperlink contains the key as its innerText,
     and the url as the href attribute.*/
    for (var i = 0; i < objectKeys.length; i++) {
        // Create the list element.
        var li = document.createElement("li");
        // Create the hyperlink element, and set some of its attributes.
        var a = document.createElement("a");
        a.setAttribute("class", "index-item");
        a.setAttribute("href", objectValues[i]);
        // Set the text to the mapping we created in this file. This is so the text makes more sense.    
        a.innerText = exports.INDEX_SECTIONS_MAPPING[objectKeys[i]].toString();
        // Append the hyperlink to the list element.
        li.appendChild(a);
        ulElementHandle.appendChild(li);
    }
    return ulElementHandle;
}
exports.writeItemsToHTMLList = writeItemsToHTMLList;
function renderIndexPage() {
    reachAPI().then(function (data) {
        var ulItem = document.querySelector(".index-content");
        writeItemsToHTMLList(data, ulItem);
    });
}
exports.renderIndexPage = renderIndexPage;