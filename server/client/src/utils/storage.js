"use strict";
exports.__esModule = true;
exports.setInStorage = exports.getFromStorage = void 0;
function getFromStorage(key) {
    if (!key) {
        return null;
    }
    try {
        var valueStr = localStorage.getItem(key);
        if (valueStr) {
            return JSON.parse(valueStr);
        }
        return null;
    }
    catch (err) {
        return null;
    }
}
exports.getFromStorage = getFromStorage;
function setInStorage(key, obj) {
    if (!key) {
        console.error("Error: Key is missing");
    }
    try {
        localStorage.setItem(key, JSON.stringify(obj));
    }
    catch (err) {
        console.error(err);
    }
}
exports.setInStorage = setInStorage;
