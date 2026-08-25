/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/neverthrow/dist/index.es.js":
/*!**************************************************!*\
  !*** ./node_modules/neverthrow/dist/index.es.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   err: () => (/* binding */ err),
/* harmony export */   ok: () => (/* binding */ ok)
/* harmony export */ });
/* unused harmony exports Err, Ok, Result, ResultAsync, errAsync, fromAsyncThrowable, fromPromise, fromSafePromise, fromThrowable, okAsync, safeTry */
const defaultErrorConfig = {
    withStackTrace: false,
};
// Custom error object
// Context / discussion: https://github.com/supermacro/neverthrow/pull/215
const createNeverThrowError = (message, result, config = defaultErrorConfig) => {
    const data = result.isOk()
        ? { type: 'Ok', value: result.value }
        : { type: 'Err', value: result.error };
    const maybeStack = config.withStackTrace ? new Error().stack : undefined;
    return {
        data,
        message,
        stack: maybeStack,
    };
};

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

class ResultAsync {
    constructor(res) {
        this._promise = res;
    }
    static fromSafePromise(promise) {
        const newPromise = promise.then((value) => new Ok(value));
        return new ResultAsync(newPromise);
    }
    static fromPromise(promise, errorFn) {
        const newPromise = promise
            .then((value) => new Ok(value))
            .catch((e) => new Err(errorFn(e)));
        return new ResultAsync(newPromise);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromThrowable(fn, errorFn) {
        return (...args) => {
            return new ResultAsync((() => __awaiter(this, void 0, void 0, function* () {
                try {
                    return new Ok(yield fn(...args));
                }
                catch (error) {
                    return new Err(errorFn ? errorFn(error) : error);
                }
            }))());
        };
    }
    static combine(asyncResultList) {
        return combineResultAsyncList(asyncResultList);
    }
    static combineWithAllErrors(asyncResultList) {
        return combineResultAsyncListWithAllErrors(asyncResultList);
    }
    map(f) {
        return new ResultAsync(this._promise.then((res) => __awaiter(this, void 0, void 0, function* () {
            if (res.isErr()) {
                return new Err(res.error);
            }
            return new Ok(yield f(res.value));
        })));
    }
    mapErr(f) {
        return new ResultAsync(this._promise.then((res) => __awaiter(this, void 0, void 0, function* () {
            if (res.isOk()) {
                return new Ok(res.value);
            }
            return new Err(yield f(res.error));
        })));
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    andThen(f) {
        return new ResultAsync(this._promise.then((res) => {
            if (res.isErr()) {
                return new Err(res.error);
            }
            const newValue = f(res.value);
            return newValue instanceof ResultAsync ? newValue._promise : newValue;
        }));
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    orElse(f) {
        return new ResultAsync(this._promise.then((res) => __awaiter(this, void 0, void 0, function* () {
            if (res.isErr()) {
                return f(res.error);
            }
            return new Ok(res.value);
        })));
    }
    match(ok, _err) {
        return this._promise.then((res) => res.match(ok, _err));
    }
    unwrapOr(t) {
        return this._promise.then((res) => res.unwrapOr(t));
    }
    /**
     * Emulates Rust's `?` operator in `safeTry`'s body. See also `safeTry`.
     */
    safeUnwrap() {
        return __asyncGenerator(this, arguments, function* safeUnwrap_1() {
            return yield __await(yield __await(yield* __asyncDelegator(__asyncValues(yield __await(this._promise.then((res) => res.safeUnwrap()))))));
        });
    }
    // Makes ResultAsync implement PromiseLike<Result>
    then(successCallback, failureCallback) {
        return this._promise.then(successCallback, failureCallback);
    }
}
const okAsync = (value) => new ResultAsync(Promise.resolve(new Ok(value)));
const errAsync = (err) => new ResultAsync(Promise.resolve(new Err(err)));
const fromPromise = ResultAsync.fromPromise;
const fromSafePromise = ResultAsync.fromSafePromise;
const fromAsyncThrowable = ResultAsync.fromThrowable;

/**
 * Short circuits on the FIRST Err value that we find
 */
const combineResultList = (resultList) => {
    let acc = ok([]);
    for (const result of resultList) {
        if (result.isErr()) {
            acc = err(result.error);
            break;
        }
        else {
            acc.map((list) => list.push(result.value));
        }
    }
    return acc;
};
/* This is the typesafe version of Promise.all
 *
 * Takes a list of ResultAsync<T, E> and success if all inner results are Ok values
 * or fails if one (or more) of the inner results are Err values
 */
const combineResultAsyncList = (asyncResultList) => ResultAsync.fromSafePromise(Promise.all(asyncResultList)).andThen(combineResultList);
/**
 * Give a list of all the errors we find
 */
const combineResultListWithAllErrors = (resultList) => {
    let acc = ok([]);
    for (const result of resultList) {
        if (result.isErr() && acc.isErr()) {
            acc.error.push(result.error);
        }
        else if (result.isErr() && acc.isOk()) {
            acc = err([result.error]);
        }
        else if (result.isOk() && acc.isOk()) {
            acc.value.push(result.value);
        }
        // do nothing when result.isOk() && acc.isErr()
    }
    return acc;
};
const combineResultAsyncListWithAllErrors = (asyncResultList) => ResultAsync.fromSafePromise(Promise.all(asyncResultList)).andThen(combineResultListWithAllErrors);

// eslint-disable-next-line @typescript-eslint/no-namespace
var Result;
(function (Result) {
    /**
     * Wraps a function with a try catch, creating a new function with the same
     * arguments but returning `Ok` if successful, `Err` if the function throws
     *
     * @param fn function to wrap with ok on success or err on failure
     * @param errorFn when an error is thrown, this will wrap the error result if provided
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function fromThrowable(fn, errorFn) {
        return (...args) => {
            try {
                const result = fn(...args);
                return ok(result);
            }
            catch (e) {
                return err(errorFn ? errorFn(e) : e);
            }
        };
    }
    Result.fromThrowable = fromThrowable;
    function combine(resultList) {
        return combineResultList(resultList);
    }
    Result.combine = combine;
    function combineWithAllErrors(resultList) {
        return combineResultListWithAllErrors(resultList);
    }
    Result.combineWithAllErrors = combineWithAllErrors;
})(Result || (Result = {}));
const ok = (value) => new Ok(value);
const err = (err) => new Err(err);
function safeTry(body) {
    const n = body().next();
    if (n instanceof Promise) {
        return n.then((r) => r.value);
    }
    return n.value;
}
class Ok {
    constructor(value) {
        this.value = value;
    }
    isOk() {
        return true;
    }
    isErr() {
        return !this.isOk();
    }
    map(f) {
        return ok(f(this.value));
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mapErr(_f) {
        return ok(this.value);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    andThen(f) {
        return f(this.value);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    orElse(_f) {
        return ok(this.value);
    }
    asyncAndThen(f) {
        return f(this.value);
    }
    asyncMap(f) {
        return ResultAsync.fromSafePromise(f(this.value));
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    unwrapOr(_v) {
        return this.value;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    match(ok, _err) {
        return ok(this.value);
    }
    safeUnwrap() {
        const value = this.value;
        /* eslint-disable-next-line require-yield */
        return (function* () {
            return value;
        })();
    }
    _unsafeUnwrap(_) {
        return this.value;
    }
    _unsafeUnwrapErr(config) {
        throw createNeverThrowError('Called `_unsafeUnwrapErr` on an Ok', this, config);
    }
}
class Err {
    constructor(error) {
        this.error = error;
    }
    isOk() {
        return false;
    }
    isErr() {
        return !this.isOk();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    map(_f) {
        return err(this.error);
    }
    mapErr(f) {
        return err(f(this.error));
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    andThen(_f) {
        return err(this.error);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    orElse(f) {
        return f(this.error);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    asyncAndThen(_f) {
        return errAsync(this.error);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    asyncMap(_f) {
        return errAsync(this.error);
    }
    unwrapOr(v) {
        return v;
    }
    match(_ok, err) {
        return err(this.error);
    }
    safeUnwrap() {
        const error = this.error;
        return (function* () {
            yield err(error);
            throw new Error('Do not use this generator out of `safeTry`');
        })();
    }
    _unsafeUnwrap(config) {
        throw createNeverThrowError('Called `_unsafeUnwrap` on an Err', this, config);
    }
    _unsafeUnwrapErr(_) {
        return this.error;
    }
}
const fromThrowable = Result.fromThrowable;
//#endregion




/***/ }),

/***/ "./src/errors/index.ts":
/*!*****************************!*\
  !*** ./src/errors/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Il2CppContextCreationError: () => (/* binding */ Il2CppContextCreationError),
/* harmony export */   MetadataParsingError: () => (/* binding */ MetadataParsingError),
/* harmony export */   UnresolvedMetadataError: () => (/* binding */ UnresolvedMetadataError)
/* harmony export */ });
class CustomError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        Object.setPrototypeOf(this, new.target.prototype);
    }
    print() {
        return this.name + ": " + this.message;
    }
}
class UnresolvedMetadataError extends CustomError {
    constructor() {
        super(...arguments);
        this.name = "UnresolvedMetadataError";
    }
}
class MetadataParsingError extends CustomError {
    constructor() {
        super(...arguments);
        this.name = "MetadataParsingError";
    }
}
class Il2CppContextCreationError extends CustomError {
    constructor() {
        super(...arguments);
        this.name = "Il2CppContextCreationError";
    }
}


/***/ }),

/***/ "./src/extras/index.ts":
/*!*****************************!*\
  !*** ./src/extras/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KeyCode: () => (/* binding */ KeyCode),
/* harmony export */   dataTypeSizes: () => (/* binding */ dataTypeSizes)
/* harmony export */ });
const dataTypeSizes = {
    // Every type ValueWrapper.writeField can encode must appear here, or the
    // size lookup fails and the write is silently refused.
    i8: 1,
    u8: 1,
    i16: 2,
    u16: 2,
    i32: 4,
    u32: 4,
    f32: 4,
};
// TODO: Resolve and create these kinds of enums dynamically (and remove hardcoding)
var KeyCode;
(function (KeyCode) {
    KeyCode[KeyCode["None"] = 0] = "None";
    KeyCode[KeyCode["Backspace"] = 8] = "Backspace";
    KeyCode[KeyCode["Tab"] = 9] = "Tab";
    KeyCode[KeyCode["Clear"] = 12] = "Clear";
    KeyCode[KeyCode["Return"] = 13] = "Return";
    KeyCode[KeyCode["Pause"] = 19] = "Pause";
    KeyCode[KeyCode["Escape"] = 27] = "Escape";
    KeyCode[KeyCode["Space"] = 32] = "Space";
    KeyCode[KeyCode["Exclaim"] = 33] = "Exclaim";
    KeyCode[KeyCode["DoubleQuote"] = 34] = "DoubleQuote";
    KeyCode[KeyCode["Hash"] = 35] = "Hash";
    KeyCode[KeyCode["Dollar"] = 36] = "Dollar";
    KeyCode[KeyCode["Ampersand"] = 38] = "Ampersand";
    KeyCode[KeyCode["Quote"] = 39] = "Quote";
    KeyCode[KeyCode["LeftParen"] = 40] = "LeftParen";
    KeyCode[KeyCode["RightParen"] = 41] = "RightParen";
    KeyCode[KeyCode["Asterisk"] = 42] = "Asterisk";
    KeyCode[KeyCode["Plus"] = 43] = "Plus";
    KeyCode[KeyCode["Comma"] = 44] = "Comma";
    KeyCode[KeyCode["Minus"] = 45] = "Minus";
    KeyCode[KeyCode["Period"] = 46] = "Period";
    KeyCode[KeyCode["Slash"] = 47] = "Slash";
    KeyCode[KeyCode["Alpha0"] = 48] = "Alpha0";
    KeyCode[KeyCode["Alpha1"] = 49] = "Alpha1";
    KeyCode[KeyCode["Alpha2"] = 50] = "Alpha2";
    KeyCode[KeyCode["Alpha3"] = 51] = "Alpha3";
    KeyCode[KeyCode["Alpha4"] = 52] = "Alpha4";
    KeyCode[KeyCode["Alpha5"] = 53] = "Alpha5";
    KeyCode[KeyCode["Alpha6"] = 54] = "Alpha6";
    KeyCode[KeyCode["Alpha7"] = 55] = "Alpha7";
    KeyCode[KeyCode["Alpha8"] = 56] = "Alpha8";
    KeyCode[KeyCode["Alpha9"] = 57] = "Alpha9";
    KeyCode[KeyCode["Colon"] = 58] = "Colon";
    KeyCode[KeyCode["Semicolon"] = 59] = "Semicolon";
    KeyCode[KeyCode["Less"] = 60] = "Less";
    KeyCode[KeyCode["Equals"] = 61] = "Equals";
    KeyCode[KeyCode["Greater"] = 62] = "Greater";
    KeyCode[KeyCode["Question"] = 63] = "Question";
    KeyCode[KeyCode["At"] = 64] = "At";
    KeyCode[KeyCode["LeftBracket"] = 91] = "LeftBracket";
    KeyCode[KeyCode["Backslash"] = 92] = "Backslash";
    KeyCode[KeyCode["RightBracket"] = 93] = "RightBracket";
    KeyCode[KeyCode["Caret"] = 94] = "Caret";
    KeyCode[KeyCode["Underscore"] = 95] = "Underscore";
    KeyCode[KeyCode["BackQuote"] = 96] = "BackQuote";
    KeyCode[KeyCode["A"] = 97] = "A";
    KeyCode[KeyCode["B"] = 98] = "B";
    KeyCode[KeyCode["C"] = 99] = "C";
    KeyCode[KeyCode["D"] = 100] = "D";
    KeyCode[KeyCode["E"] = 101] = "E";
    KeyCode[KeyCode["F"] = 102] = "F";
    KeyCode[KeyCode["G"] = 103] = "G";
    KeyCode[KeyCode["H"] = 104] = "H";
    KeyCode[KeyCode["I"] = 105] = "I";
    KeyCode[KeyCode["J"] = 106] = "J";
    KeyCode[KeyCode["K"] = 107] = "K";
    KeyCode[KeyCode["L"] = 108] = "L";
    KeyCode[KeyCode["M"] = 109] = "M";
    KeyCode[KeyCode["N"] = 110] = "N";
    KeyCode[KeyCode["O"] = 111] = "O";
    KeyCode[KeyCode["P"] = 112] = "P";
    KeyCode[KeyCode["Q"] = 113] = "Q";
    KeyCode[KeyCode["R"] = 114] = "R";
    KeyCode[KeyCode["S"] = 115] = "S";
    KeyCode[KeyCode["T"] = 116] = "T";
    KeyCode[KeyCode["U"] = 117] = "U";
    KeyCode[KeyCode["V"] = 118] = "V";
    KeyCode[KeyCode["W"] = 119] = "W";
    KeyCode[KeyCode["X"] = 120] = "X";
    KeyCode[KeyCode["Y"] = 121] = "Y";
    KeyCode[KeyCode["Z"] = 122] = "Z";
    KeyCode[KeyCode["Delete"] = 127] = "Delete";
    KeyCode[KeyCode["Keypad0"] = 256] = "Keypad0";
    KeyCode[KeyCode["Keypad1"] = 257] = "Keypad1";
    KeyCode[KeyCode["Keypad2"] = 258] = "Keypad2";
    KeyCode[KeyCode["Keypad3"] = 259] = "Keypad3";
    KeyCode[KeyCode["Keypad4"] = 260] = "Keypad4";
    KeyCode[KeyCode["Keypad5"] = 261] = "Keypad5";
    KeyCode[KeyCode["Keypad6"] = 262] = "Keypad6";
    KeyCode[KeyCode["Keypad7"] = 263] = "Keypad7";
    KeyCode[KeyCode["Keypad8"] = 264] = "Keypad8";
    KeyCode[KeyCode["Keypad9"] = 265] = "Keypad9";
    KeyCode[KeyCode["KeypadPeriod"] = 266] = "KeypadPeriod";
    KeyCode[KeyCode["KeypadDivide"] = 267] = "KeypadDivide";
    KeyCode[KeyCode["KeypadMultiply"] = 268] = "KeypadMultiply";
    KeyCode[KeyCode["KeypadMinus"] = 269] = "KeypadMinus";
    KeyCode[KeyCode["KeypadPlus"] = 270] = "KeypadPlus";
    KeyCode[KeyCode["KeypadEnter"] = 271] = "KeypadEnter";
    KeyCode[KeyCode["KeypadEquals"] = 272] = "KeypadEquals";
    KeyCode[KeyCode["UpArrow"] = 273] = "UpArrow";
    KeyCode[KeyCode["DownArrow"] = 274] = "DownArrow";
    KeyCode[KeyCode["RightArrow"] = 275] = "RightArrow";
    KeyCode[KeyCode["LeftArrow"] = 276] = "LeftArrow";
    KeyCode[KeyCode["Insert"] = 277] = "Insert";
    KeyCode[KeyCode["Home"] = 278] = "Home";
    KeyCode[KeyCode["End"] = 279] = "End";
    KeyCode[KeyCode["PageUp"] = 280] = "PageUp";
    KeyCode[KeyCode["PageDown"] = 281] = "PageDown";
    KeyCode[KeyCode["F1"] = 282] = "F1";
    KeyCode[KeyCode["F2"] = 283] = "F2";
    KeyCode[KeyCode["F3"] = 284] = "F3";
    KeyCode[KeyCode["F4"] = 285] = "F4";
    KeyCode[KeyCode["F5"] = 286] = "F5";
    KeyCode[KeyCode["F6"] = 287] = "F6";
    KeyCode[KeyCode["F7"] = 288] = "F7";
    KeyCode[KeyCode["F8"] = 289] = "F8";
    KeyCode[KeyCode["F9"] = 290] = "F9";
    KeyCode[KeyCode["F10"] = 291] = "F10";
    KeyCode[KeyCode["F11"] = 292] = "F11";
    KeyCode[KeyCode["F12"] = 293] = "F12";
    KeyCode[KeyCode["F13"] = 294] = "F13";
    KeyCode[KeyCode["F14"] = 295] = "F14";
    KeyCode[KeyCode["F15"] = 296] = "F15";
    KeyCode[KeyCode["Numlock"] = 300] = "Numlock";
    KeyCode[KeyCode["CapsLock"] = 301] = "CapsLock";
    KeyCode[KeyCode["ScrollLock"] = 302] = "ScrollLock";
    KeyCode[KeyCode["RightShift"] = 303] = "RightShift";
    KeyCode[KeyCode["LeftShift"] = 304] = "LeftShift";
    KeyCode[KeyCode["RightControl"] = 305] = "RightControl";
    KeyCode[KeyCode["LeftControl"] = 306] = "LeftControl";
    KeyCode[KeyCode["RightAlt"] = 307] = "RightAlt";
    KeyCode[KeyCode["LeftAlt"] = 308] = "LeftAlt";
    KeyCode[KeyCode["RightApple"] = 309] = "RightApple";
    KeyCode[KeyCode["RightCommand"] = 309] = "RightCommand";
    KeyCode[KeyCode["LeftApple"] = 310] = "LeftApple";
    KeyCode[KeyCode["LeftCommand"] = 310] = "LeftCommand";
    KeyCode[KeyCode["LeftWindows"] = 311] = "LeftWindows";
    KeyCode[KeyCode["RightWindows"] = 312] = "RightWindows";
    KeyCode[KeyCode["AltGr"] = 313] = "AltGr";
    KeyCode[KeyCode["Help"] = 315] = "Help";
    KeyCode[KeyCode["Print"] = 316] = "Print";
    KeyCode[KeyCode["SysReq"] = 317] = "SysReq";
    KeyCode[KeyCode["Break"] = 318] = "Break";
    KeyCode[KeyCode["Menu"] = 319] = "Menu";
    KeyCode[KeyCode["Mouse0"] = 323] = "Mouse0";
    KeyCode[KeyCode["Mouse1"] = 324] = "Mouse1";
    KeyCode[KeyCode["Mouse2"] = 325] = "Mouse2";
    KeyCode[KeyCode["Mouse3"] = 326] = "Mouse3";
    KeyCode[KeyCode["Mouse4"] = 327] = "Mouse4";
    KeyCode[KeyCode["Mouse5"] = 328] = "Mouse5";
    KeyCode[KeyCode["Mouse6"] = 329] = "Mouse6";
    KeyCode[KeyCode["JoystickButton0"] = 330] = "JoystickButton0";
    KeyCode[KeyCode["JoystickButton1"] = 331] = "JoystickButton1";
    KeyCode[KeyCode["JoystickButton2"] = 332] = "JoystickButton2";
    KeyCode[KeyCode["JoystickButton3"] = 333] = "JoystickButton3";
    KeyCode[KeyCode["JoystickButton4"] = 334] = "JoystickButton4";
    KeyCode[KeyCode["JoystickButton5"] = 335] = "JoystickButton5";
    KeyCode[KeyCode["JoystickButton6"] = 336] = "JoystickButton6";
    KeyCode[KeyCode["JoystickButton7"] = 337] = "JoystickButton7";
    KeyCode[KeyCode["JoystickButton8"] = 338] = "JoystickButton8";
    KeyCode[KeyCode["JoystickButton9"] = 339] = "JoystickButton9";
    KeyCode[KeyCode["JoystickButton10"] = 340] = "JoystickButton10";
    KeyCode[KeyCode["JoystickButton11"] = 341] = "JoystickButton11";
    KeyCode[KeyCode["JoystickButton12"] = 342] = "JoystickButton12";
    KeyCode[KeyCode["JoystickButton13"] = 343] = "JoystickButton13";
    KeyCode[KeyCode["JoystickButton14"] = 344] = "JoystickButton14";
    KeyCode[KeyCode["JoystickButton15"] = 345] = "JoystickButton15";
    KeyCode[KeyCode["JoystickButton16"] = 346] = "JoystickButton16";
    KeyCode[KeyCode["JoystickButton17"] = 347] = "JoystickButton17";
    KeyCode[KeyCode["JoystickButton18"] = 348] = "JoystickButton18";
    KeyCode[KeyCode["JoystickButton19"] = 349] = "JoystickButton19";
    KeyCode[KeyCode["Joystick1Button0"] = 350] = "Joystick1Button0";
    KeyCode[KeyCode["Joystick1Button1"] = 351] = "Joystick1Button1";
    KeyCode[KeyCode["Joystick1Button2"] = 352] = "Joystick1Button2";
    KeyCode[KeyCode["Joystick1Button3"] = 353] = "Joystick1Button3";
    KeyCode[KeyCode["Joystick1Button4"] = 354] = "Joystick1Button4";
    KeyCode[KeyCode["Joystick1Button5"] = 355] = "Joystick1Button5";
    KeyCode[KeyCode["Joystick1Button6"] = 356] = "Joystick1Button6";
    KeyCode[KeyCode["Joystick1Button7"] = 357] = "Joystick1Button7";
    KeyCode[KeyCode["Joystick1Button8"] = 358] = "Joystick1Button8";
    KeyCode[KeyCode["Joystick1Button9"] = 359] = "Joystick1Button9";
    KeyCode[KeyCode["Joystick1Button10"] = 360] = "Joystick1Button10";
    KeyCode[KeyCode["Joystick1Button11"] = 361] = "Joystick1Button11";
    KeyCode[KeyCode["Joystick1Button12"] = 362] = "Joystick1Button12";
    KeyCode[KeyCode["Joystick1Button13"] = 363] = "Joystick1Button13";
    KeyCode[KeyCode["Joystick1Button14"] = 364] = "Joystick1Button14";
    KeyCode[KeyCode["Joystick1Button15"] = 365] = "Joystick1Button15";
    KeyCode[KeyCode["Joystick1Button16"] = 366] = "Joystick1Button16";
    KeyCode[KeyCode["Joystick1Button17"] = 367] = "Joystick1Button17";
    KeyCode[KeyCode["Joystick1Button18"] = 368] = "Joystick1Button18";
    KeyCode[KeyCode["Joystick1Button19"] = 369] = "Joystick1Button19";
    KeyCode[KeyCode["Joystick2Button0"] = 370] = "Joystick2Button0";
    KeyCode[KeyCode["Joystick2Button1"] = 371] = "Joystick2Button1";
    KeyCode[KeyCode["Joystick2Button2"] = 372] = "Joystick2Button2";
    KeyCode[KeyCode["Joystick2Button3"] = 373] = "Joystick2Button3";
    KeyCode[KeyCode["Joystick2Button4"] = 374] = "Joystick2Button4";
    KeyCode[KeyCode["Joystick2Button5"] = 375] = "Joystick2Button5";
    KeyCode[KeyCode["Joystick2Button6"] = 376] = "Joystick2Button6";
    KeyCode[KeyCode["Joystick2Button7"] = 377] = "Joystick2Button7";
    KeyCode[KeyCode["Joystick2Button8"] = 378] = "Joystick2Button8";
    KeyCode[KeyCode["Joystick2Button9"] = 379] = "Joystick2Button9";
    KeyCode[KeyCode["Joystick2Button10"] = 380] = "Joystick2Button10";
    KeyCode[KeyCode["Joystick2Button11"] = 381] = "Joystick2Button11";
    KeyCode[KeyCode["Joystick2Button12"] = 382] = "Joystick2Button12";
    KeyCode[KeyCode["Joystick2Button13"] = 383] = "Joystick2Button13";
    KeyCode[KeyCode["Joystick2Button14"] = 384] = "Joystick2Button14";
    KeyCode[KeyCode["Joystick2Button15"] = 385] = "Joystick2Button15";
    KeyCode[KeyCode["Joystick2Button16"] = 386] = "Joystick2Button16";
    KeyCode[KeyCode["Joystick2Button17"] = 387] = "Joystick2Button17";
    KeyCode[KeyCode["Joystick2Button18"] = 388] = "Joystick2Button18";
    KeyCode[KeyCode["Joystick2Button19"] = 389] = "Joystick2Button19";
    KeyCode[KeyCode["Joystick3Button0"] = 390] = "Joystick3Button0";
    KeyCode[KeyCode["Joystick3Button1"] = 391] = "Joystick3Button1";
    KeyCode[KeyCode["Joystick3Button2"] = 392] = "Joystick3Button2";
    KeyCode[KeyCode["Joystick3Button3"] = 393] = "Joystick3Button3";
    KeyCode[KeyCode["Joystick3Button4"] = 394] = "Joystick3Button4";
    KeyCode[KeyCode["Joystick3Button5"] = 395] = "Joystick3Button5";
    KeyCode[KeyCode["Joystick3Button6"] = 396] = "Joystick3Button6";
    KeyCode[KeyCode["Joystick3Button7"] = 397] = "Joystick3Button7";
    KeyCode[KeyCode["Joystick3Button8"] = 398] = "Joystick3Button8";
    KeyCode[KeyCode["Joystick3Button9"] = 399] = "Joystick3Button9";
    KeyCode[KeyCode["Joystick3Button10"] = 400] = "Joystick3Button10";
    KeyCode[KeyCode["Joystick3Button11"] = 401] = "Joystick3Button11";
    KeyCode[KeyCode["Joystick3Button12"] = 402] = "Joystick3Button12";
    KeyCode[KeyCode["Joystick3Button13"] = 403] = "Joystick3Button13";
    KeyCode[KeyCode["Joystick3Button14"] = 404] = "Joystick3Button14";
    KeyCode[KeyCode["Joystick3Button15"] = 405] = "Joystick3Button15";
    KeyCode[KeyCode["Joystick3Button16"] = 406] = "Joystick3Button16";
    KeyCode[KeyCode["Joystick3Button17"] = 407] = "Joystick3Button17";
    KeyCode[KeyCode["Joystick3Button18"] = 408] = "Joystick3Button18";
    KeyCode[KeyCode["Joystick3Button19"] = 409] = "Joystick3Button19";
    KeyCode[KeyCode["Joystick4Button0"] = 410] = "Joystick4Button0";
    KeyCode[KeyCode["Joystick4Button1"] = 411] = "Joystick4Button1";
    KeyCode[KeyCode["Joystick4Button2"] = 412] = "Joystick4Button2";
    KeyCode[KeyCode["Joystick4Button3"] = 413] = "Joystick4Button3";
    KeyCode[KeyCode["Joystick4Button4"] = 414] = "Joystick4Button4";
    KeyCode[KeyCode["Joystick4Button5"] = 415] = "Joystick4Button5";
    KeyCode[KeyCode["Joystick4Button6"] = 416] = "Joystick4Button6";
    KeyCode[KeyCode["Joystick4Button7"] = 417] = "Joystick4Button7";
    KeyCode[KeyCode["Joystick4Button8"] = 418] = "Joystick4Button8";
    KeyCode[KeyCode["Joystick4Button9"] = 419] = "Joystick4Button9";
    KeyCode[KeyCode["Joystick4Button10"] = 420] = "Joystick4Button10";
    KeyCode[KeyCode["Joystick4Button11"] = 421] = "Joystick4Button11";
    KeyCode[KeyCode["Joystick4Button12"] = 422] = "Joystick4Button12";
    KeyCode[KeyCode["Joystick4Button13"] = 423] = "Joystick4Button13";
    KeyCode[KeyCode["Joystick4Button14"] = 424] = "Joystick4Button14";
    KeyCode[KeyCode["Joystick4Button15"] = 425] = "Joystick4Button15";
    KeyCode[KeyCode["Joystick4Button16"] = 426] = "Joystick4Button16";
    KeyCode[KeyCode["Joystick4Button17"] = 427] = "Joystick4Button17";
    KeyCode[KeyCode["Joystick4Button18"] = 428] = "Joystick4Button18";
    KeyCode[KeyCode["Joystick4Button19"] = 429] = "Joystick4Button19";
    KeyCode[KeyCode["Joystick5Button0"] = 430] = "Joystick5Button0";
    KeyCode[KeyCode["Joystick5Button1"] = 431] = "Joystick5Button1";
    KeyCode[KeyCode["Joystick5Button2"] = 432] = "Joystick5Button2";
    KeyCode[KeyCode["Joystick5Button3"] = 433] = "Joystick5Button3";
    KeyCode[KeyCode["Joystick5Button4"] = 434] = "Joystick5Button4";
    KeyCode[KeyCode["Joystick5Button5"] = 435] = "Joystick5Button5";
    KeyCode[KeyCode["Joystick5Button6"] = 436] = "Joystick5Button6";
    KeyCode[KeyCode["Joystick5Button7"] = 437] = "Joystick5Button7";
    KeyCode[KeyCode["Joystick5Button8"] = 438] = "Joystick5Button8";
    KeyCode[KeyCode["Joystick5Button9"] = 439] = "Joystick5Button9";
    KeyCode[KeyCode["Joystick5Button10"] = 440] = "Joystick5Button10";
    KeyCode[KeyCode["Joystick5Button11"] = 441] = "Joystick5Button11";
    KeyCode[KeyCode["Joystick5Button12"] = 442] = "Joystick5Button12";
    KeyCode[KeyCode["Joystick5Button13"] = 443] = "Joystick5Button13";
    KeyCode[KeyCode["Joystick5Button14"] = 444] = "Joystick5Button14";
    KeyCode[KeyCode["Joystick5Button15"] = 445] = "Joystick5Button15";
    KeyCode[KeyCode["Joystick5Button16"] = 446] = "Joystick5Button16";
    KeyCode[KeyCode["Joystick5Button17"] = 447] = "Joystick5Button17";
    KeyCode[KeyCode["Joystick5Button18"] = 448] = "Joystick5Button18";
    KeyCode[KeyCode["Joystick5Button19"] = 449] = "Joystick5Button19";
    KeyCode[KeyCode["Joystick6Button0"] = 450] = "Joystick6Button0";
    KeyCode[KeyCode["Joystick6Button1"] = 451] = "Joystick6Button1";
    KeyCode[KeyCode["Joystick6Button2"] = 452] = "Joystick6Button2";
    KeyCode[KeyCode["Joystick6Button3"] = 453] = "Joystick6Button3";
    KeyCode[KeyCode["Joystick6Button4"] = 454] = "Joystick6Button4";
    KeyCode[KeyCode["Joystick6Button5"] = 455] = "Joystick6Button5";
    KeyCode[KeyCode["Joystick6Button6"] = 456] = "Joystick6Button6";
    KeyCode[KeyCode["Joystick6Button7"] = 457] = "Joystick6Button7";
    KeyCode[KeyCode["Joystick6Button8"] = 458] = "Joystick6Button8";
    KeyCode[KeyCode["Joystick6Button9"] = 459] = "Joystick6Button9";
    KeyCode[KeyCode["Joystick6Button10"] = 460] = "Joystick6Button10";
    KeyCode[KeyCode["Joystick6Button11"] = 461] = "Joystick6Button11";
    KeyCode[KeyCode["Joystick6Button12"] = 462] = "Joystick6Button12";
    KeyCode[KeyCode["Joystick6Button13"] = 463] = "Joystick6Button13";
    KeyCode[KeyCode["Joystick6Button14"] = 464] = "Joystick6Button14";
    KeyCode[KeyCode["Joystick6Button15"] = 465] = "Joystick6Button15";
    KeyCode[KeyCode["Joystick6Button16"] = 466] = "Joystick6Button16";
    KeyCode[KeyCode["Joystick6Button17"] = 467] = "Joystick6Button17";
    KeyCode[KeyCode["Joystick6Button18"] = 468] = "Joystick6Button18";
    KeyCode[KeyCode["Joystick6Button19"] = 469] = "Joystick6Button19";
    KeyCode[KeyCode["Joystick7Button0"] = 470] = "Joystick7Button0";
    KeyCode[KeyCode["Joystick7Button1"] = 471] = "Joystick7Button1";
    KeyCode[KeyCode["Joystick7Button2"] = 472] = "Joystick7Button2";
    KeyCode[KeyCode["Joystick7Button3"] = 473] = "Joystick7Button3";
    KeyCode[KeyCode["Joystick7Button4"] = 474] = "Joystick7Button4";
    KeyCode[KeyCode["Joystick7Button5"] = 475] = "Joystick7Button5";
    KeyCode[KeyCode["Joystick7Button6"] = 476] = "Joystick7Button6";
    KeyCode[KeyCode["Joystick7Button7"] = 477] = "Joystick7Button7";
    KeyCode[KeyCode["Joystick7Button8"] = 478] = "Joystick7Button8";
    KeyCode[KeyCode["Joystick7Button9"] = 479] = "Joystick7Button9";
    KeyCode[KeyCode["Joystick7Button10"] = 480] = "Joystick7Button10";
    KeyCode[KeyCode["Joystick7Button11"] = 481] = "Joystick7Button11";
    KeyCode[KeyCode["Joystick7Button12"] = 482] = "Joystick7Button12";
    KeyCode[KeyCode["Joystick7Button13"] = 483] = "Joystick7Button13";
    KeyCode[KeyCode["Joystick7Button14"] = 484] = "Joystick7Button14";
    KeyCode[KeyCode["Joystick7Button15"] = 485] = "Joystick7Button15";
    KeyCode[KeyCode["Joystick7Button16"] = 486] = "Joystick7Button16";
    KeyCode[KeyCode["Joystick7Button17"] = 487] = "Joystick7Button17";
    KeyCode[KeyCode["Joystick7Button18"] = 488] = "Joystick7Button18";
    KeyCode[KeyCode["Joystick7Button19"] = 489] = "Joystick7Button19";
    KeyCode[KeyCode["Joystick8Button0"] = 490] = "Joystick8Button0";
    KeyCode[KeyCode["Joystick8Button1"] = 491] = "Joystick8Button1";
    KeyCode[KeyCode["Joystick8Button2"] = 492] = "Joystick8Button2";
    KeyCode[KeyCode["Joystick8Button3"] = 493] = "Joystick8Button3";
    KeyCode[KeyCode["Joystick8Button4"] = 494] = "Joystick8Button4";
    KeyCode[KeyCode["Joystick8Button5"] = 495] = "Joystick8Button5";
    KeyCode[KeyCode["Joystick8Button6"] = 496] = "Joystick8Button6";
    KeyCode[KeyCode["Joystick8Button7"] = 497] = "Joystick8Button7";
    KeyCode[KeyCode["Joystick8Button8"] = 498] = "Joystick8Button8";
    KeyCode[KeyCode["Joystick8Button9"] = 499] = "Joystick8Button9";
    KeyCode[KeyCode["Joystick8Button10"] = 500] = "Joystick8Button10";
    KeyCode[KeyCode["Joystick8Button11"] = 501] = "Joystick8Button11";
    KeyCode[KeyCode["Joystick8Button12"] = 502] = "Joystick8Button12";
    KeyCode[KeyCode["Joystick8Button13"] = 503] = "Joystick8Button13";
    KeyCode[KeyCode["Joystick8Button14"] = 504] = "Joystick8Button14";
    KeyCode[KeyCode["Joystick8Button15"] = 505] = "Joystick8Button15";
    KeyCode[KeyCode["Joystick8Button16"] = 506] = "Joystick8Button16";
    KeyCode[KeyCode["Joystick8Button17"] = 507] = "Joystick8Button17";
    KeyCode[KeyCode["Joystick8Button18"] = 508] = "Joystick8Button18";
    KeyCode[KeyCode["Joystick8Button19"] = 509] = "Joystick8Button19";
})(KeyCode || (KeyCode = {}));


/***/ }),

/***/ "./src/il2cpp/index.ts":
/*!*****************************!*\
  !*** ./src/il2cpp/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createIl2CppContext: () => (/* binding */ createIl2CppContext),
/* harmony export */   createMetadata: () => (/* binding */ createMetadata)
/* harmony export */ });
/* unused harmony export metadataVer */
/* harmony import */ var neverthrow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! neverthrow */ "./node_modules/neverthrow/dist/index.es.js");
/* harmony import */ var _utils_binary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/binary */ "./src/utils/binary/index.ts");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../errors */ "./src/errors/index.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils */ "./src/utils/index.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




// updating this
let metadataVer = 0;
// Records a synthesised lookup name for a method, but never at the cost of a
// name that actually exists in the metadata — a game is free to declare a real
// method literally called `Foo_1`.
function addMethodAlias(bucket, realNames, key, ptr) {
    if (realNames.has(key))
        return false;
    bucket[key] = ptr;
    return true;
}
// Records one callable method under exactly one key, and returns that key (or
// null if it could not be stored). Shared by the ordinary per-assembly walk and
// the generic-instantiation pass so both produce identical naming.
//
// Overload 0 lives under the plain name (an earlier build deleted that name as
// soon as a second overload appeared, which broke `call(type, "Method")` for
// every overloaded method). Overloads 1..N get `Method_1` … `Method_N`.
//
// `Method_0` and the pointer-suffixed `Method_7837` form the old loader emitted
// are NOT stored — resolveMethodEntry derives them on lookup, which costs
// nothing at load time and is memoised per call site. Storing them meant ~200k
// extra keys and string concatenations per load to serve a few dozen lookups.
function storeMethodPointer(bucket, realNames, overloadCounters, fullTypeName, methodName, ptr) {
    // Generic method *definitions* and methods whose pointer index falls outside
    // the module's table have no callable code behind them. Counting them would
    // push real overloads down a slot and let an unusable 0 squat on the name.
    if (typeof ptr !== "number" || ptr <= 0)
        return null;
    const overloadKey = `${fullTypeName}::${methodName}`;
    const overloadCount = overloadCounters.get(overloadKey) || 0;
    overloadCounters.set(overloadKey, overloadCount + 1);
    if (overloadCount === 0) {
        bucket[methodName] = ptr;
        // Only a real name shaped like an alias can be clobbered by one. The
        // charCode test rejects essentially every name before the regex.
        const lastCh = methodName.charCodeAt(methodName.length - 1);
        if (lastCh >= 48 && lastCh <= 57 && ALIAS_SHAPED_NAME.test(methodName))
            realNames.add(methodName);
        return methodName;
    }
    const alias = `${methodName}_${overloadCount}`;
    if (addMethodAlias(bucket, realNames, alias, ptr))
        return alias;
    // A real method in this type already owns that exact name, so the positional
    // alias can't be used. Fall back to the legacy table-index suffix; without it
    // this overload would have no key at all.
    const legacy = `${methodName}_${ptr}`;
    return addMethodAlias(bucket, realNames, legacy, ptr) ? legacy : null;
}
// Matches the shape of a synthesised overload alias (`Something_12`). Only real
// method names of this shape can collide with one, so only those need tracking.
const ALIAS_SHAPED_NAME = /_\d+$/;
// Il2CppTypeEnum values needed to render a generic argument's name.
const IL2CPP_TYPE_NAMES = {
    1: "System.Void", 2: "System.Boolean", 3: "System.Char",
    4: "System.SByte", 5: "System.Byte", 6: "System.Int16", 7: "System.UInt16",
    8: "System.Int32", 9: "System.UInt32", 10: "System.Int64", 11: "System.UInt64",
    12: "System.Single", 13: "System.Double", 14: "System.String",
    22: "System.TypedReference", 24: "System.IntPtr", 25: "System.UIntPtr",
    28: "System.Object",
};
const IL2CPP_TYPE_PTR = 15, IL2CPP_TYPE_VALUETYPE = 17, IL2CPP_TYPE_CLASS = 18;
// sizeof(Il2CppObject) on wasm32: class pointer plus monitor pointer. A value
// type's recorded size is its *boxed* size, so its payload is that much smaller.
// (The runtime module has its own copy — these are separate webpack modules.)
const IL2CPP_BOXED_HEADER = 8;
// A "value size" past this is a misread of the sizes table, not a struct.
const IL2CPP_MAX_VALUE_SIZE = 1 << 20;
const IL2CPP_TYPE_VAR = 19, IL2CPP_TYPE_ARRAY = 20, IL2CPP_TYPE_GENERICINST = 21;
const IL2CPP_TYPE_SZARRAY = 29, IL2CPP_TYPE_MVAR = 30;
// Reads type/method names straight out of the metadata buffer by index. The
// sparse metadata read only materialises the referenced assemblies' defs, but
// generic instantiations can point anywhere, so these go to the source.
class MetadataNameResolver {
    constructor(metadataBuffer, layout) {
        this.layout = layout;
        this.reader = new _utils_binary__WEBPACK_IMPORTED_MODULE_1__.BinaryReader(metadataBuffer);
        this.view = new DataView(metadataBuffer);
        this.byteLength = metadataBuffer.byteLength;
        this.typeNameCache = new Map();
    }
    inRange(offset, size) {
        return offset >= 0 && offset + size <= this.byteLength;
    }
    string(index) {
        const offset = this.layout.stringOffset + index;
        if (!this.inRange(offset, 1))
            return null;
        this.reader.seek(offset);
        return this.reader.readNullTerminatedUTF8String();
    }
    // { nameIndex, declaringType } for a methoddef, by absolute method index.
    methodDef(index) {
        const L = this.layout;
        if (index < 0 || index >= L.totalMethodCount)
            return null;
        const base = L.methodsOffset + index * L.methodDefStructSize;
        if (!this.inRange(base, L.methodDefStructSize))
            return null;
        const declSize = L.indexSizes.typeDefinitionIndex;
        const declOffset = base + 4;
        const declaringType = declSize === 1 ? this.view.getUint8(declOffset)
            : declSize === 2 ? this.view.getUint16(declOffset, true)
                : this.view.getInt32(declOffset, true);
        return { nameIndex: this.view.getUint32(base, true), declaringType };
    }
    // Full "Namespace.Type" for a typedef index, memoised.
    typeName(index) {
        const cached = this.typeNameCache.get(index);
        if (cached !== undefined)
            return cached;
        const L = this.layout;
        let result = null;
        if (index >= 0 && index < L.totalTypeCount) {
            const base = L.typeDefsOffset + index * L.typeDefStructSize;
            if (this.inRange(base, 8)) {
                const name = this.string(this.view.getUint32(base, true));
                const ns = this.string(this.view.getUint32(base + 4, true));
                if (name !== null)
                    result = ns ? ns + "." + name : name;
            }
        }
        this.typeNameCache.set(index, result);
        return result;
    }
}
// Renders an Il2CppType (8 bytes on wasm32: 4-byte data union, 4-byte bitfield)
// into a display name. Best effort — anything exotic degrades to "?" rather than
// failing the whole instantiation.
function renderIl2CppType(view, names, typePtr, depth) {
    if (depth > 4 || typePtr <= 0 || typePtr + 8 > view.byteLength)
        return "?";
    const data = view.getUint32(typePtr, true);
    const bits = view.getUint32(typePtr + 4, true);
    const kind = (bits >>> 16) & 0xff;
    const simple = IL2CPP_TYPE_NAMES[kind];
    if (simple)
        return simple;
    switch (kind) {
        case IL2CPP_TYPE_VALUETYPE:
        case IL2CPP_TYPE_CLASS: {
            const name = names.typeName(data);
            return name !== null ? name : "?";
        }
        case IL2CPP_TYPE_SZARRAY:
            return renderIl2CppType(view, names, data, depth + 1) + "[]";
        case IL2CPP_TYPE_ARRAY: {
            // Il2CppArrayType { Il2CppType* etype; uint8 rank; ... }
            if (data + 5 > view.byteLength)
                return "?";
            const rank = view.getUint8(data + 4);
            return renderIl2CppType(view, names, view.getUint32(data, true), depth + 1) +
                "[" + ",".repeat(Math.max(0, rank - 1)) + "]";
        }
        case IL2CPP_TYPE_PTR:
            return renderIl2CppType(view, names, data, depth + 1) + "*";
        case IL2CPP_TYPE_GENERICINST: {
            // Il2CppGenericClass { Il2CppTypeDefinitionIndex/ptr type; Il2CppGenericContext context; }
            // The context's class_inst is what carries the arguments.
            return "?";
        }
        case IL2CPP_TYPE_VAR:
        case IL2CPP_TYPE_MVAR:
            return "T";
        default:
            return "?";
    }
}
// Reads Il2CppGenericInst { uint32 type_argc; Il2CppType** type_argv; } and
// renders "<A, B>". Returns "" when there are no arguments.
function renderGenericInst(view, names, instPtr) {
    if (instPtr <= 0 || instPtr + 8 > view.byteLength)
        return "";
    const argc = view.getUint32(instPtr, true);
    const argv = view.getUint32(instPtr + 4, true);
    if (argc === 0 || argc > 32 || argv <= 0 || argv + argc * 4 > view.byteLength)
        return "";
    const parts = [];
    for (let i = 0; i < argc; i++)
        parts.push(renderIl2CppType(view, names, view.getUint32(argv + i * 4, true), 0));
    return "<" + parts.join(",") + ">";
}
// IL2CPP compiles each *instantiation* of a generic method separately. The
// definition (`List`1::Add`) has a null method pointer; the concrete code for
// `List<int>::Add` sits in CodeRegistration.genericMethodPointers, indexed
// through MetadataRegistration's genericMethodTable → methodSpecs chain.
//
// Each instantiation is registered twice:
//   * under the raw definition name  — `System...List`1` :: `Add`, joining the
//     normal overload numbering, so `Add`, `Add_1`, … and `Add_<tableIndex>` work
//   * under a rendered name          — `System...List<System.Int32>` :: `Add`,
//     which is what you actually want to type
//
// Returns a summary; never throws — a build whose registration can't be
// validated simply gets no generic entries.
function addGenericInstantiations(opts) {
    const summary = { found: false, instantiations: 0, registered: 0, skipped: 0 };
    const layout = opts.metadata.layout;
    if (!layout || !opts.metadata.buffer || opts.metadata.buffer.byteLength === 0)
        return summary;
    const genericMethodPointerCount = opts.codeRegistration.genericMethodPointersCount;
    const genericMethodPointersAddr = opts.codeRegistration.genericMethodPointers;
    if (!genericMethodPointerCount || !genericMethodPointersAddr)
        return summary;
    const view = new DataView(opts.memoryBuffer);
    const bufLen = opts.memoryBuffer.byteLength;
    const u32 = (offset) => (offset >= 0 && offset + 4 <= bufLen ? view.getUint32(offset, true) : 0);
    const i32 = (offset) => (offset >= 0 && offset + 4 <= bufLen ? view.getInt32(offset, true) : -1);
    const registration = opts.registration !== undefined
        ? opts.registration
        : opts.sectionHelper.findMetadataRegistration(layout.typeDefinitionsCount);
    if (!registration) {
        console.debug("[UnityWebModkit] MetadataRegistration not located — generic method instantiations unavailable");
        return summary;
    }
    summary.found = true;
    summary.address = registration;
    const genericInstsCount = u32(registration + 8);
    const genericInstsAddr = u32(registration + 12);
    const tableCount = u32(registration + 16);
    const tableAddr = u32(registration + 20);
    const methodSpecsCount = u32(registration + 32);
    const methodSpecsAddr = u32(registration + 36);
    summary.instantiations = tableCount;
    const names = new MetadataNameResolver(opts.metadata.buffer, layout);
    const genericInstAt = (index) => (index >= 0 && index < genericInstsCount ? u32(genericInstsAddr + index * 4) : 0);
    const renderCache = new Map();
    const renderInst = (index) => {
        if (index < 0)
            return "";
        const hit = renderCache.get(index);
        if (hit !== undefined)
            return hit;
        const rendered = renderGenericInst(view, names, genericInstAt(index));
        renderCache.set(index, rendered);
        return rendered;
    };
    const bucketFor = (typeName) => {
        let bucket = opts.scriptData[typeName];
        if (!bucket) {
            bucket = Object.create(null);
            opts.scriptData[typeName] = bucket;
        }
        let real = opts.realNames.get(typeName);
        if (!real) {
            real = new Set();
            opts.realNames.set(typeName, real);
        }
        return { bucket, real };
    };
    // Il2CppGenericMethodFunctionsDefinitions (metadata v29+, wasm32):
    //   0 genericMethodIndex   4 indices.methodIndex
    //   8 indices.invokerIndex 12 indices.adjustorThunkIndex
    // Il2CppMethodSpec: 0 methodDefinitionIndex  4 classIndexIndex  8 methodIndexIndex
    for (let i = 0; i < tableCount; i++) {
        const entry = tableAddr + i * 16;
        const genericMethodIndex = u32(entry);
        const pointerIndex = u32(entry + 4);
        if (genericMethodIndex >= methodSpecsCount || pointerIndex >= genericMethodPointerCount) {
            summary.skipped++;
            continue;
        }
        const spec = methodSpecsAddr + genericMethodIndex * 12;
        const methodDefinitionIndex = i32(spec);
        const classIndexIndex = i32(spec + 4);
        const methodIndexIndex = i32(spec + 8);
        const tableIndex = u32(genericMethodPointersAddr + pointerIndex * 4);
        if (tableIndex <= 0) {
            summary.skipped++;
            continue;
        }
        const methodDef = names.methodDef(methodDefinitionIndex);
        if (!methodDef) {
            summary.skipped++;
            continue;
        }
        // Prune to the plugin's referenced assemblies before paying for any
        // string decoding — most instantiations belong to types nobody asked for.
        const declaring = methodDef.declaringType;
        if (declaring < 0 || declaring >= opts.typeDefPos.length || opts.typeDefPos[declaring] === 0)
            continue;
        const definitionTypeName = names.typeName(declaring);
        const methodName = names.string(methodDef.nameIndex);
        if (!definitionTypeName || !methodName) {
            summary.skipped++;
            continue;
        }
        const methodArgs = renderInst(methodIndexIndex);
        const definitionMethodName = methodName + methodArgs;
        const raw = bucketFor(definitionTypeName);
        if (storeMethodPointer(raw.bucket, raw.real, opts.overloadCounters, definitionTypeName, definitionMethodName, tableIndex))
            summary.registered++;
        // `System.Collections.Generic.List`1` + `<System.Int32>` reads as
        // `System.Collections.Generic.List<System.Int32>`.
        const classArgs = renderInst(classIndexIndex);
        if (!classArgs)
            continue;
        const tick = definitionTypeName.lastIndexOf("`");
        const closedTypeName = (tick === -1 ? definitionTypeName : definitionTypeName.slice(0, tick)) + classArgs;
        if (closedTypeName === definitionTypeName)
            continue;
        const closed = bucketFor(closedTypeName);
        storeMethodPointer(closed.bucket, closed.real, opts.overloadCounters, closedTypeName, definitionMethodName, tableIndex);
    }
    return summary;
}
function createIl2CppContext(buffer, metadata, referencedAssemblies) {
    var _a, _b;
    console.debug("Creating IL2CPP Context");
    if (!buffer || buffer.byteLength === 0) {
        return (0,neverthrow__WEBPACK_IMPORTED_MODULE_0__.err)(new _errors__WEBPACK_IMPORTED_MODULE_2__.Il2CppContextCreationError("createIl2CppContext: WASM buffer is empty/null"));
    }
    if (!metadata) {
        return (0,neverthrow__WEBPACK_IMPORTED_MODULE_0__.err)(new _errors__WEBPACK_IMPORTED_MODULE_2__.Il2CppContextCreationError("createIl2CppContext: metadata is null"));
    }
    const dataSections = [];
    const reader = new _utils_binary__WEBPACK_IMPORTED_MODULE_1__.BinaryReader(buffer);
    reader.seek(8);
    while (reader.offset < buffer.byteLength) {
        const id = reader.readULEB128();
        const len = reader.readULEB128();
        if (id !== 11) {
            // Skip until we reach data section
            reader.seek(reader.offset + len);
            continue;
        }
        const count = reader.readULEB128();
        const sectionEnd = reader.offset + len;
        for (let i = 0; i < count; i++) {
            // Segment encoding (bulk-memory):
            //   0 -> active, memory 0, offset expr, data
            //   1 -> passive, data only (no memory, no offset)
            //   2 -> active, explicit memory index, offset expr, data
            // Reading every segment as if it were form 0 desynchronises the
            // whole section on anything else, which yields a corrupt memory
            // image and therefore silently wrong method pointers.
            const flags = reader.readULEB128();
            if (flags & 0x02)
                reader.readULEB128(); // explicit memory index
            let offset = 0;
            if (!(flags & 0x01)) {
                // Init expression: i32.const <sleb> end (or a global.get we
                // cannot evaluate statically).
                const opcode = reader.readUint8();
                if (opcode === 0x41) {
                    offset = reader.readULEB128();
                }
                else {
                    console.warn("[UnityWebModkit] Data segment %d uses an unsupported offset expression (opcode 0x%s); skipping it", i, opcode.toString(16));
                    while (reader.offset < sectionEnd && reader.readUint8() !== 0x0b) { /* scan to END */ }
                    reader.readUint8ArrayView(reader.readULEB128());
                    continue;
                }
                if (reader.readUint8() !== 0x0b) {
                    console.warn("[UnityWebModkit] Data segment %d offset expression did not end where expected; stopping the scan", i);
                    break;
                }
            }
            const size = reader.readULEB128();
            if (reader.offset + size > buffer.byteLength) {
                console.warn("[UnityWebModkit] Data segment %d claims %d bytes past the end of the binary; stopping the scan", i, size);
                break;
            }
            // View, not copy — we only immediately memoryBytes.set() this into the
            // virtual address space below.
            const data = reader.readUint8ArrayView(size);
            // A passive segment has no fixed address, so it is not part of the
            // static image the IL2CPP scan walks.
            if (flags & 0x01)
                continue;
            dataSections.push({
                index: 0,
                offset,
                data,
            });
        }
        break;
    }
    if (dataSections.length === 0) {
        return (0,neverthrow__WEBPACK_IMPORTED_MODULE_0__.err)(new _errors__WEBPACK_IMPORTED_MODULE_2__.Il2CppContextCreationError("createIl2CppContext: no WASM data sections found — binary may be encrypted/malformed"));
    }
    const last = dataSections[dataSections.length - 1];
    const bssStart = last.offset + last.data.length;
    // Allocate only enough space for the data sections (up to bssStart) — the
    // original allocated the entire WASM size which can be tens of MB of dead
    // space we never read or scan.
    const memoryBuffer = new ArrayBuffer(bssStart);
    const memoryReader = new _utils_binary__WEBPACK_IMPORTED_MODULE_1__.BinaryReader(memoryBuffer);
    const memoryBytes = new Uint8Array(memoryBuffer);
    for (let i = 0; i < dataSections.length; i++) {
        const ds = dataSections[i];
        memoryBytes.set(ds.data, ds.offset);
    }
    // Scan range narrowed to bssStart — everything past the last data section is
    // zero-filled and never references the patterns we look for.
    const sectionHelper = getSectionHelper(bssStart, memoryBuffer, bssStart, metadata.methodDefs.length, metadata.originalImageDefCount);
    const codeRegistration = sectionHelper.findCodeRegistration();
    if (codeRegistration === 0) {
        return (0,neverthrow__WEBPACK_IMPORTED_MODULE_0__.err)(new _errors__WEBPACK_IMPORTED_MODULE_2__.Il2CppContextCreationError(`createIl2CppContext: failed to locate codeRegistration (imageCount=${metadata.originalImageDefCount}). Game may be unsupported, encrypted, or use a different metadata layout.`));
    }
    const pCodeRegistration = readCodeRegistration(memoryReader, codeRegistration);
    if (!pCodeRegistration.codeGenModulesCount) {
        return (0,neverthrow__WEBPACK_IMPORTED_MODULE_0__.err)(new _errors__WEBPACK_IMPORTED_MODULE_2__.Il2CppContextCreationError("createIl2CppContext: codeRegistration has 0 codeGenModules"));
    }
    const pCodeGenModules = readCodeGenModules(memoryReader, pCodeRegistration.codeGenModules, pCodeRegistration.codeGenModulesCount);
    const codeGenModules = {};
    const codeGenModuleMethodPointers = {};
    const referencedSet = referencedAssemblies ? new Set(referencedAssemblies) : null;
    for (let i = 0; i < pCodeGenModules.length; i++) {
        const pCodeGenModule = readCodeGenModule(memoryReader, pCodeGenModules[i]);
        memoryReader.seek(pCodeGenModule.moduleName);
        const moduleName = memoryReader.readNullTerminatedUTF8String();
        if (!referencedSet || !referencedSet.has(moduleName))
            continue;
        codeGenModules[moduleName] = pCodeGenModule;
        const methodPointers = readCodeGenModuleMethodPointers(memoryReader, pCodeGenModule.methodPointers, pCodeGenModule.methodPointerCount);
        codeGenModuleMethodPointers[moduleName] = methodPointers;
    }
    // Prototype-less dictionary objects — avoids hidden-class churn and inherited
    // property checks for the (potentially tens of thousands of) string keys that
    // get added here.
    const scriptData = Object.create(null);
    // Tracks how many times each "TypeName::methodName" has been seen so that
    // overloads can be numbered _0, _1, _2 … in encounter order.
    const overloadCounters = new Map();
    // Per type, the real metadata method names shaped like a synthesised overload
    // alias (`Something_12`) — the only ones an alias can collide with. A real
    // name always wins, whichever order the two are encountered in.
    const realNames = new Map();
    const metadataReader = new _utils_binary__WEBPACK_IMPORTED_MODULE_1__.BinaryReader(metadata.buffer);
    // Build index lookups once; the previous .find() inside the inner loops was
    // O(typeDefs * methodDefs) per image and is the largest hot-loop cost here.
    //
    // These were Maps with one entry per typedef and per methoddef — 100k+
    // entries hashed on the critical path just to be read back a moment later.
    // A flat typed array indexed by the metadata index does the same job with
    // no hashing and no per-entry allocation. Stored value is position+1 so 0
    // reads as "absent" without having to prefill.
    const buildPositionTable = (defs, indexField) => {
        let maxIndex = -1;
        for (let i = 0; i < defs.length; i++) {
            const idx = defs[i][indexField];
            if (idx !== undefined && idx > maxIndex)
                maxIndex = idx;
        }
        const table = new Int32Array(maxIndex + 2);
        for (let i = 0; i < defs.length; i++) {
            const idx = defs[i][indexField];
            if (idx !== undefined)
                table[idx] = i + 1;
        }
        return table;
    };
    // Collected here rather than re-walked later: this loop already resolves
    // every referenced type's full name, which is what the field table needs.
    const indexedTypes = [];
    const typeDefPos = buildPositionTable(metadata.typeDefs, "typeIndex");
    const methodDefPos = buildPositionTable(metadata.methodDefs, "methodIndex");
    const stringOffset = (_a = metadata.header.stringOffset) !== null && _a !== void 0 ? _a : metadata.header.stringsOffset;
    // Located once, up front: the method walk below needs it to tell a struct
    // return from a scalar one, and the field table needs it too — searching for
    // it twice would mean scanning the image twice.
    const metadataRegistration = sectionHelper.findMetadataRegistration(metadata.layout.typeDefinitionsCount);
    const typeResolver = createTypeResolver({
        memoryBuffer,
        metadata,
        metadataReader,
        stringOffset,
        typeDefPos,
        registration: metadataRegistration,
    });
    // TypeName -> methodKey -> { type, size } for every method that returns a
    // value type. Only struct returns are recorded, which keeps this to a few
    // hundred entries rather than one per method in the game.
    const structReturns = Object.create(null);
    const returnTypeIndex = createReturnTypeIndex();
    // Property names and their accessors, which the get_/set_ convention alone
    // cannot recover on an obfuscated build.
    const propertyData = Object.create(null);
    // Which stored keys name a static method. Parameter count alone cannot
    // tell a no-argument instance method from a one-argument static — both
    // compile to two parameters — and picking the wrong one calls a method
    // with an unrelated object as `this`.
    const staticKeys = Object.create(null);
    const propertySummary = { types: 0, properties: 0, rejected: 0, unresolved: 0, renamedAccessors: 0 };
    const metaView = new DataView(metadata.buffer);
    for (let j = 0; j < metadata.imageDefs.length; j++) {
        const imageDef = metadata.imageDefs[j];
        const imageName = getStringFromIndex(metadataReader, stringOffset, imageDef.nameIndex);
        // Hoist the method-pointers table lookup out of the per-method loop.
        // If this image isn't referenced (no codeGenModule entry) we can skip
        // every type and method in the image without parsing strings.
        const ptrs = codeGenModuleMethodPointers[imageName];
        if (!ptrs)
            continue;
        const typeEnd = imageDef.typeStart + imageDef.typeCount;
        for (let k = imageDef.typeStart; k < typeEnd; k++) {
            const typePos = k >= 0 && k < typeDefPos.length ? typeDefPos[k] : 0;
            if (typePos === 0)
                continue;
            const typeDef = metadata.typeDefs[typePos - 1];
            const typeName = getStringFromIndex(metadataReader, stringOffset, typeDef.nameIndex);
            const namespaceName = getStringFromIndex(metadataReader, stringOffset, typeDef.namespaceIndex);
            const fullTypeName = namespaceName === "" ? typeName : namespaceName + "." + typeName;
            let typeBucket = scriptData[fullTypeName];
            if (!typeBucket) {
                typeBucket = Object.create(null);
                scriptData[fullTypeName] = typeBucket;
            }
            indexedTypes.push({ fullTypeName, typeDef });
            let typeRealNames = realNames.get(fullTypeName);
            if (!typeRealNames) {
                typeRealNames = new Set();
                realNames.set(fullTypeName, typeRealNames);
            }
            const methodEnd = typeDef.methodStart + typeDef.method_count;
            // Keyed by index within the type, because that is how the property
            // table refers to its accessors.
            const methodKeys = new Array(typeDef.method_count);
            const methodStatic = new Array(typeDef.method_count);
            for (let l = typeDef.methodStart; l < methodEnd; l++) {
                const methodPos = l >= 0 && l < methodDefPos.length ? methodDefPos[l] : 0;
                if (methodPos === 0)
                    continue;
                const methodDef = metadata.methodDefs[methodPos - 1];
                const methodName = getStringFromIndex(metadataReader, stringOffset, methodDef.nameIndex);
                const methodPointerIndex = methodDef.token & 0x00ffffff;
                const storedAs = storeMethodPointer(typeBucket, typeRealNames, overloadCounters, fullTypeName, methodName, ptrs[methodPointerIndex - 1]);
                // A method returning a value type is compiled with a hidden
                // out-pointer as its first argument and no return value at all.
                // Recording which methods those are is the whole reason
                // `transform.position` can be read without hand-written glue.
                if (storedAs !== null) {
                    methodKeys[l - typeDef.methodStart] = storedAs;
                    const isStatic = (methodDef.flags & METHOD_ATTRIBUTE_STATIC) !== 0;
                    methodStatic[l - typeDef.methodStart] = isStatic;
                    if (isStatic)
                        staticKeys[fullTypeName] = (staticKeys[fullTypeName] || ";") + storedAs + ";";
                    returnTypeIndex.record(fullTypeName, storedAs, typeResolver.nameAt(methodDef.returnType));
                    const returns = typeResolver.structAt(methodDef.returnType);
                    if (returns) {
                        let returnBucket = structReturns[fullTypeName];
                        if (!returnBucket)
                            returnBucket = structReturns[fullTypeName] = Object.create(null);
                        returnBucket[storedAs] = returns;
                    }
                }
            }
            addTypeProperties(propertyData, {
                layout: metadata.layout,
                metaView,
                metadataReader,
                stringOffset,
                fullTypeName,
                typeDef,
                methodKeys,
                methodStatic,
                summary: propertySummary,
            });
        }
    }
    // Generic methods have no entry in any module's method-pointer table — their
    // code lives in CodeRegistration.genericMethodPointers, reachable only via
    // MetadataRegistration. Fail-soft: if the registration can't be located, every
    // non-generic method above still resolves exactly as before.
    const generics = addGenericInstantiations({
        memoryBuffer,
        memoryReader,
        metadata,
        sectionHelper,
        codeRegistration: pCodeRegistration,
        scriptData,
        overloadCounters,
        realNames,
        typeDefPos,
        registration: metadataRegistration,
    });
    // Unboxed size of every value type that got indexed. `structSizes` doubles
    // as the "is this a struct" test everywhere downstream: enums and reference
    // types are deliberately absent.
    const structSizes = Object.create(null);
    for (const entry of indexedTypes) {
        const info = typeResolver.structAt(entry.typeDef.byvalTypeIndex);
        if (info && info.size)
            structSizes[entry.fullTypeName] = info.size;
    }
    // Instance field offsets, so `obj.someField` works without the IL2CPP C API.
    const fields = addFieldOffsets({
        memoryBuffer,
        metadata,
        metadataReader,
        stringOffset,
        sectionHelper,
        indexedTypes,
        typeDefPos,
        registration: metadataRegistration,
        typeResolver,
    });
    if (propertySummary.properties)
        console.debug(`[UnityWebModkit] Properties: ${propertySummary.properties} on ${propertySummary.types} types ` +
            `(${propertySummary.renamedAccessors} with accessors the get_/set_ convention would miss` +
            `${propertySummary.rejected ? ", " + propertySummary.rejected + " rejected" : ""})`);
    else if (propertySummary.rejected)
        console.debug(`[UnityWebModkit] Property table unusable — ${propertySummary.rejected} records failed validation`);
    if (fields.summary.found)
        console.debug(`[UnityWebModkit] Field offsets: ${fields.summary.fields} on ${fields.summary.types} types (${fields.summary.mode})`);
    else
        console.debug(`[UnityWebModkit] Field offsets unavailable — ${fields.summary.reason}`);
    // Leave typeIndex/methodIndex intact so this function remains idempotent —
    // previously deleting them broke any subsequent context rebuild.
    return (0,neverthrow__WEBPACK_IMPORTED_MODULE_0__.ok)({
        codeGenModules,
        codeGenModuleMethodPointers,
        scriptData,
        fieldData: fields.fieldData,
        fieldSummary: fields.summary,
        typeParents: fields.parents,
        structReturns,
        structSizes,
        returnTypes: returnTypeIndex.finish(),
        // Discarded whole if the stride did not validate: a half-read property
        // table would name accessors that belong to other members.
        propertyData: propertySummary.rejected > propertySummary.properties ? Object.create(null) : propertyData,
        propertySummary,
        staticKeys,
        generics,
        name: "il2cpp",
    });
}
function createMetadata(buffer, referencedAssemblies) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        console.debug("Creating Metadata");
        if (!buffer || buffer.byteLength < 8) {
            return (0,neverthrow__WEBPACK_IMPORTED_MODULE_0__.err)(new _errors__WEBPACK_IMPORTED_MODULE_2__.MetadataParsingError(`createMetadata: buffer is empty or too small (${(_a = buffer === null || buffer === void 0 ? void 0 : buffer.byteLength) !== null && _a !== void 0 ? _a : "null"} bytes) — global-metadata.dat may be missing or truncated`));
        }
        const reader = new _utils_binary__WEBPACK_IMPORTED_MODULE_1__.BinaryReader(buffer);
        const sanity = reader.readUint32();
        if (sanity !== 0xfab11baf)
            return (0,neverthrow__WEBPACK_IMPORTED_MODULE_0__.err)(new _errors__WEBPACK_IMPORTED_MODULE_2__.MetadataParsingError("Metadata file supplied is not a valid metadata file."));
        const version = reader.readUint32();
        metadataVer = version;
        if (version < 0 || version > 1000)
            return (0,neverthrow__WEBPACK_IMPORTED_MODULE_0__.err)(new _errors__WEBPACK_IMPORTED_MODULE_2__.MetadataParsingError("Metadata file supplied is not a valid metadata file."));
        // TODO: Support more metadata versions
        if (!(version == 31 || version == 29 || version == 35 || version == 39))
            return (0,neverthrow__WEBPACK_IMPORTED_MODULE_0__.err)(new _errors__WEBPACK_IMPORTED_MODULE_2__.MetadataParsingError(`Metadata file supplied is not a supported version [${version}].`));
        reader.seek(0);
        const header = readHeader(reader, version);
        // Calculate index sizes for v38+
        const getIndexSize = (count) => {
            if (count <= 0xff)
                return 1;
            if (count <= 0xffff)
                return 2;
            return 4;
        };
        const typeIndexSize = version >= 38 ? header.parametersSize / header.parametersCount - 8 : 4;
        const typeDefinitionIndexSize = version >= 38 ? getIndexSize(header.typeDefinitionsCount) : 4;
        const genericContainerIndexSize = version >= 38 ? getIndexSize(header.genericContainersCount) : 4;
        const parameterIndexSize = version >= 38 ? getIndexSize(header.parametersCount) : 4;
        const indexSizes = {
            typeIndex: typeIndexSize,
            typeDefinitionIndex: typeDefinitionIndexSize,
            genericContainerIndex: genericContainerIndexSize,
            parameterIndex: parameterIndexSize,
        };
        // Helper to resolve offset/size field from the header, supporting both v<38 (e.g. imagesOffset) and v38+ (imagesOffset from "images" section)
        const hOffset = (legacyOffsetName, newSectionName) => { var _a, _b; return version >= 38 ? (_a = header[newSectionName + "Offset"]) !== null && _a !== void 0 ? _a : 0 : (_b = header[legacyOffsetName]) !== null && _b !== void 0 ? _b : 0; };
        const hSize = (legacySizeName, newSectionName) => { var _a, _b; return version >= 38 ? (_a = header[newSectionName + "Size"]) !== null && _a !== void 0 ? _a : 0 : (_b = header[legacySizeName]) !== null && _b !== void 0 ? _b : 0; };
        const hCount = (newSectionName) => { var _a; return (version >= 38 ? (_a = header[newSectionName + "Count"]) !== null && _a !== void 0 ? _a : 0 : 0); };
        const imageOffset = hOffset("imagesOffset", "images");
        const imageSize = hSize("imagesSize", "images");
        const imageDefs = readImageDefinitions(reader, imageOffset, imageSize, indexSizes, version);
        const referencedImageDefs = [];
        // Switch the include() check to Set.has() once per image — cheap, and avoids
        // the per-call linear scan when the assembly list is non-trivial.
        const referencedSet = referencedAssemblies ? new Set(referencedAssemblies) : null;
        for (let i = 0, len = imageDefs.length; i < len; i++) {
            const imageDef = imageDefs[i];
            const imageName = getStringFromIndex(reader, hOffset("stringOffset", "strings"), imageDef.nameIndex);
            if (referencedSet === null || referencedSet === void 0 ? void 0 : referencedSet.has(imageName))
                referencedImageDefs.push(imageDef);
        }
        let typeDefs = readTypeDefinitions(reader, hOffset("typeDefinitionsOffset", "typeDefinitions"), hSize("typeDefinitionsSize", "typeDefinitions"), referencedImageDefs, indexSizes, version);
        // Read only the method ranges declared by referenced typedefs. The total
        // method count in a typical Unity build is in the hundreds of thousands;
        // referenced assemblies usually cover < 10% of them.
        const methodsOffset = hOffset("methodsOffset", "methods");
        const methodsSize = hSize("methodsSize", "methods");
        const methodDefs = readMethodDefinitionsSparse(reader, methodsOffset, methodsSize, typeDefs, indexSizes);
        const totalMethodCount = computeTotalMethodCount(methodsSize, indexSizes);
        const typeDefsOffset = hOffset("typeDefinitionsOffset", "typeDefinitions");
        const typeDefsSize = hSize("typeDefinitionsSize", "typeDefinitions");
        const typeDefStructSize = typeDefStructSizeFor(indexSizes, version);
        return (0,neverthrow__WEBPACK_IMPORTED_MODULE_0__.ok)({
            buffer,
            header,
            imageDefs: referencedImageDefs,
            typeDefs,
            methodDefs,
            originalImageDefCount: imageDefs.length,
            originalMethodDefCount: totalMethodCount,
            version,
            name: "metadata",
            referencedAssemblies,
            integrityHash: "",
            // Layout descriptors so later passes (generic-method resolution) can
            // random-access typedefs/methoddefs that the sparse read skipped,
            // without re-deriving the header maths.
            layout: {
                indexSizes,
                stringOffset: hOffset("stringOffset", "strings"),
                methodsOffset,
                methodDefStructSize: methodDefStructSize(indexSizes),
                totalMethodCount,
                typeDefsOffset,
                typeDefStructSize,
                // Where fieldStart and field_count sit inside a record, so the
                // field pass can retry them at an offset when a build's layout
                // doesn't match. field_count is the third of the eight uint16
                // counters that follow the eight int32 start indices.
                fieldStartRel: fieldStartRelFor(indexSizes, version),
                fieldCountRel: fieldStartRelFor(indexSizes, version) + 8 * 4 + 2 * 2,
                // v38+ sizes its index fields to their table counts, so a field
                // record is not a fixed 12 bytes. The header states the count,
                // which gives the width exactly rather than by assumption.
                fieldsCount: hCount("fields"),
                fieldDefStructSize: (() => {
                    const size = hSize("fieldsSize", "fields");
                    const count = hCount("fields");
                    if (version >= 38 && count > 0 && size % count === 0)
                        return size / count;
                    return 12;
                })(),
                // The property table: the only place a property's *name* lives.
                // An obfuscated build renames accessors, so `get_Foo` need not
                // exist — this is what a decompiler reads to show the property.
                propertiesOffset: hOffset("propertiesOffset", "properties"),
                propertiesCount: hCount("properties"),
                propertyDefStructSize: (() => {
                    const size = hSize("propertiesSize", "properties");
                    const count = hCount("properties");
                    if (version >= 38 && count > 0 && size % count === 0)
                        return size / count;
                    return IL2CPP_PROPERTY_DEF_SIZE;
                })(),
                totalTypeCount: typeDefStructSize > 0 ? Math.floor(typeDefsSize / typeDefStructSize) : 0,
                // MetadataRegistration.typeDefinitionsSizesCount matches this.
                // v38+ states it outright; earlier versions only imply it via size.
                typeDefinitionsCount: (_b = header.typeDefinitionsCount) !== null && _b !== void 0
                    ? _b
                    : (typeDefStructSize > 0 ? Math.floor(typeDefsSize / typeDefStructSize) : 0),
            },
        });
    });
}
// Field offsets live in the binary (MetadataRegistration.fieldOffsets); field
// names and types live in global-metadata.dat. Joining the two here is what lets
// `obj.someField` resolve on a build that doesn't export the IL2CPP C API —
// which is most Unity WebGL builds, since il2cpp_* symbols are only exported
// when something in the build references them.
//
// Everything is validated before it is trusted: a build whose layout doesn't
// match reports a reason and leaves field access exactly as it was.
const IL2CPP_FIELD_DEF_SIZE = 12; // nameIndex, typeIndex, token — metadata v24.1+
// Il2CppPropertyDefinition { nameIndex, get, set, attrs, token }. `get`/`set`
// are method indices *relative to the declaring type's methodStart*, or -1.
const IL2CPP_PROPERTY_DEF_SIZE = 20;
const METHOD_ATTRIBUTE_STATIC = 0x0010;
// The IL2CPP property table. A property's *name* lives here and nowhere else:
// its accessors are ordinary methods, and an obfuscated build is free to call
// them anything at all — in one game measured here, 1,929 of 5,963 properties
// have a getter that is not named `get_<property>`. Deriving properties from the
// get_/set_ prefix therefore misses roughly a third of them, which from the
// outside looks like "the decompiler shows it but scriptData doesn't have it".
//
// `get`/`set` are method indices relative to the declaring type's methodStart,
// or -1, so they are resolved against the keys that type's methods were just
// stored under.
function addTypeProperties(propertyData, opts) {
    const typeDef = opts.typeDef;
    const count = typeDef.property_count;
    const summary = opts.summary;
    const layout = opts.layout;
    if (!count || !layout.propertiesOffset)
        return;
    const stride = layout.propertyDefStructSize || IL2CPP_PROPERTY_DEF_SIZE;
    const view = opts.metaView;
    const metaLen = view.byteLength;
    let bucket = null;
    for (let i = 0; i < count; i++) {
        const record = layout.propertiesOffset + (typeDef.propertyStart + i) * stride;
        if (record < 0 || record + 12 > metaLen) {
            summary.rejected++;
            continue;
        }
        const get = view.getInt32(record + 4, true);
        const set = view.getInt32(record + 8, true);
        // The strongest validator available: both accessors must land inside
        // this type's own method range. A wrong stride fails this immediately.
        if (get < -1 || get >= typeDef.method_count || set < -1 || set >= typeDef.method_count) {
            summary.rejected++;
            continue;
        }
        let name = null;
        try {
            name = getStringFromIndex(opts.metadataReader, opts.stringOffset, view.getUint32(record, true));
        }
        catch (err) {
            name = null;
        }
        if (!name || name.length > 256 || /[\x00-\x1f]/.test(name)) {
            summary.rejected++;
            continue;
        }
        const getter = get >= 0 ? opts.methodKeys[get] : null;
        const setter = set >= 0 ? opts.methodKeys[set] : null;
        // Both accessors stripped (abstract, or no code emitted) — the property
        // exists in the metadata but there is nothing to call.
        if (!getter && !setter) {
            summary.unresolved++;
            continue;
        }
        if (!bucket) {
            bucket = Object.create(null);
            propertyData[opts.fullTypeName] = bucket;
            summary.types++;
        }
        bucket[name.toLowerCase()] = {
            name,
            get: getter || null,
            set: setter || null,
            static: !!(getter ? opts.methodStatic[get] : opts.methodStatic[set]),
        };
        summary.properties++;
        if (getter && getter !== "get_" + name)
            summary.renamedAccessors++;
    }
}
// Reads MetadataRegistration's two side tables — `types` and
// `typeDefinitionsSizes` — so an Il2CppType index can be turned into "which
// value type is this, and how many bytes is it unboxed".
//
// This is what makes value types work without the IL2CPP C API. A method's
// return type is an index into `types`; if that names a struct, the compiled
// function returns it through a hidden out-pointer, and the call has to be made
// differently. Nothing else in the loader can tell those two shapes apart.
function createTypeResolver(opts) {
    const view = new DataView(opts.memoryBuffer);
    const bufLen = opts.memoryBuffer.byteLength;
    const u32 = (at) => (at >= 0 && at + 4 <= bufLen ? view.getUint32(at, true) : 0);
    const registration = opts.registration || 0;
    const typesCount = registration ? u32(registration + 24) : 0;
    const typesAddr = registration ? u32(registration + 28) : 0;
    const sizesCount = registration ? u32(registration + 48) : 0;
    const sizesAddr = registration ? u32(registration + 52) : 0;
    const plausiblePointer = (p) => p >= 1024 && p < bufLen;
    const nameOfTypeDef = (index) => {
        const pos = index >= 0 && index < opts.typeDefPos.length ? opts.typeDefPos[index] : 0;
        if (!pos)
            return null;
        const td = opts.metadata.typeDefs[pos - 1];
        if (!td)
            return null;
        try {
            const name = getStringFromIndex(opts.metadataReader, opts.stringOffset, td.nameIndex);
            const ns = getStringFromIndex(opts.metadataReader, opts.stringOffset, td.namespaceIndex);
            return name ? (ns ? ns + "." + name : name) : null;
        }
        catch (err) {
            return null;
        }
    };
    const typeDefAt = (index) => {
        const pos = index >= 0 && index < opts.typeDefPos.length ? opts.typeDefPos[index] : 0;
        return pos ? opts.metadata.typeDefs[pos - 1] : null;
    };
    // `typeDefinitionsSizes` is an array of *pointers* to Il2CppTypeDefinitionSizes
    // — { instance_size, native_size, static_fields_size, thread_static_fields_size }
    // — indexed by typeDefinitionIndex, exactly like `types` and `fieldOffsets`.
    // instance_size is the boxed size, so a value type's payload is that minus
    // the object header.
    const unboxedSize = (typeDefIndex) => {
        if (!sizesAddr || typeDefIndex < 0 || typeDefIndex >= sizesCount)
            return 0;
        const record = u32(sizesAddr + typeDefIndex * 4);
        if (!plausiblePointer(record))
            return 0;
        const size = u32(record) - IL2CPP_BOXED_HEADER;
        return size > 0 && size < IL2CPP_MAX_VALUE_SIZE ? size : 0;
    };
    // Memoised per Il2CppType index: the same handful of return types
    // (Vector3, Quaternion, Color…) recur across tens of thousands of methods.
    const cache = new Map();
    const structAt = (typeIndex) => {
        if (!typesAddr || typeIndex === undefined || typeIndex < 0 || typeIndex >= typesCount)
            return null;
        const cached = cache.get(typeIndex);
        if (cached !== undefined)
            return cached;
        let result = null;
        const typePtr = u32(typesAddr + typeIndex * 4);
        if (plausiblePointer(typePtr) && ((u32(typePtr + 4) >>> 16) & 0xff) === IL2CPP_TYPE_VALUETYPE) {
            const typeDefIndex = u32(typePtr);
            const typeName = nameOfTypeDef(typeDefIndex);
            const typeDef = typeDefAt(typeDefIndex);
            // An enum is a value type too, but its storage *is* its underlying
            // integer: it returns in a register and reads as a plain number.
            // Treating it as a struct would redirect a scalar return into a
            // buffer and hand back garbage.
            const parentPtr = typeDef && typeDef.parentIndex >= 0 && typeDef.parentIndex < typesCount
                ? u32(typesAddr + typeDef.parentIndex * 4) : 0;
            const parentName = plausiblePointer(parentPtr) ? nameOfTypeDef(u32(parentPtr)) : null;
            if (typeName && parentName !== "System.Enum")
                result = { type: typeName, size: unboxedSize(typeDefIndex) };
        }
        cache.set(typeIndex, result);
        return result;
    };
    // Display name for any Il2CppType index — what a method declares it returns.
    // renderIl2CppType handles everything except a generic instance, which needs
    // one more hop through Il2CppGenericClass to name the open type and its
    // arguments. Memoised: a few thousand distinct types serve every method in
    // the game.
    const names = new MetadataNameResolver(opts.metadata.buffer, opts.metadata.layout);
    const renderCache = new Map();
    const renderAt = (typePtr) => {
        const kind = (u32(typePtr + 4) >>> 16) & 0xff;
        if (kind !== IL2CPP_TYPE_GENERICINST)
            return renderIl2CppType(view, names, typePtr, 0);
        // Il2CppGenericClass { const Il2CppType* type; Il2CppGenericContext
        // { class_inst, method_inst }; Il2CppClass* cached_class; }. Since
        // metadata v27 the first member is a type pointer, not a typedef index —
        // reading it as an index names an unrelated type rather than failing.
        const generic = u32(typePtr);
        if (!plausiblePointer(generic))
            return "?";
        const open = renderIl2CppType(view, names, u32(generic), 1);
        if (open === "?")
            return "?";
        return open.replace(/`\d+$/, "") + renderGenericInst(view, names, u32(generic + 4));
    };
    const nameAt = (typeIndex) => {
        if (!typesAddr || typeIndex === undefined || typeIndex < 0 || typeIndex >= typesCount)
            return null;
        const cached = renderCache.get(typeIndex);
        if (cached !== undefined)
            return cached;
        const typePtr = u32(typesAddr + typeIndex * 4);
        let rendered = null;
        try {
            rendered = plausiblePointer(typePtr) ? renderAt(typePtr) : null;
        }
        catch (err) {
            rendered = null;
        }
        renderCache.set(typeIndex, rendered);
        return rendered;
    };
    return { registration, typesAddr, typesCount, sizesAddr, structAt, nameAt, nameOfTypeDef, unboxedSize };
}
// Return types, stored as a shared pool of names plus one string per type
// ("Fire=12;Update=0"). A game has tens of thousands of methods but only a few
// thousand distinct return types, and one string per type costs a fraction of
// what an object keyed by method name would — this is metadata for reading, not
// for calling, so it is parsed on demand and never on the load path.
function createReturnTypeIndex() {
    const names = [];
    const pool = new Map();
    const pending = Object.create(null);
    return {
        record(typeName, methodKey, returnName) {
            if (!returnName)
                return;
            let id = pool.get(returnName);
            if (id === undefined) {
                id = names.length;
                names.push(returnName);
                pool.set(returnName, id);
            }
            const list = pending[typeName] || (pending[typeName] = []);
            list.push(methodKey + "=" + id);
        },
        finish() {
            const byType = Object.create(null);
            for (const typeName in pending)
                byType[typeName] = pending[typeName].join(";");
            return { names, byType };
        },
    };
}
function addFieldOffsets(opts) {
    const summary = { found: false, types: 0, fields: 0, mode: null, reason: null };
    const fieldData = Object.create(null);
    // Filled further down, but declared here so the early bails can return it —
    // inheritance does not depend on the field table succeeding.
    const parents = Object.create(null);
    const layout = opts.metadata.layout;
    const fieldsOffset = opts.metadata.header.fieldsOffset;
    if (!fieldsOffset) {
        summary.reason = "metadata header has no fields table";
        return { fieldData, parents, summary };
    }
    const registration = opts.registration !== undefined
        ? opts.registration
        : opts.sectionHelper.findMetadataRegistration(layout.typeDefinitionsCount);
    if (!registration) {
        summary.reason = "MetadataRegistration not located";
        return { fieldData, parents, summary };
    }
    const view = new DataView(opts.memoryBuffer);
    const bufLen = opts.memoryBuffer.byteLength;
    const u32 = (at) => (at >= 0 && at + 4 <= bufLen ? view.getUint32(at, true) : 0);
    const i32 = (at) => (at >= 0 && at + 4 <= bufLen ? view.getInt32(at, true) : -1);
    const fieldOffsetsCount = u32(registration + 40);
    const fieldOffsetsAddr = u32(registration + 44);
    const typesCount = u32(registration + 24);
    const typesAddr = u32(registration + 28);
    // Everything the extraction depends on, reported whether it works or not.
    // The struct offsets below are the v29+ MetadataRegistration layout, and a
    // build that lays it out differently is only visible as numbers that do not
    // add up — so publish the numbers.
    summary.probe = {
        metadataVersion: opts.metadata.version,
        registration,
        bufferLength: bufLen,
        typeDefinitionsCount: layout.typeDefinitionsCount,
        typeDefinitionsSizesCount: u32(registration + 48),
        fieldOffsetsCount,
        fieldOffsetsAddr,
        typesCount,
        typesAddr,
        fieldsOffset,
        indexedTypes: opts.indexedTypes.length,
        maxTypeIndex: opts.indexedTypes.reduce((m, e) => Math.max(m, e.typeDef.typeIndex), 0),
        typesWithFields: opts.indexedTypes.filter((e) => e.typeDef.field_count > 0).length,
        totalDeclaredFields: opts.indexedTypes.reduce((n, e) => n + (e.typeDef.field_count || 0), 0),
    };
    // fieldsSize must divide evenly by the record width, and every type's
    // [fieldStart, fieldStart+field_count) must land inside the table. When most
    // of them don't, the fault is the *typeDef* stride upstream — the field
    // records are being indexed with garbage — and no amount of retrying the
    // record layout will help. Reported so the two cases stay distinguishable.
    const fieldsSize = (opts.metadata.layout && opts.metadata.layout.fieldsCount
        ? opts.metadata.layout.fieldDefStructSize * opts.metadata.layout.fieldsCount
        : opts.metadata.header.fieldsSize) | 0;
    const metaLen = opts.metadata.buffer.byteLength;
    const recordSize = (opts.metadata.layout && opts.metadata.layout.fieldDefStructSize) || IL2CPP_FIELD_DEF_SIZE;
    const recordCount = Math.floor(fieldsSize / recordSize);
    // The token is always a uint32; what is left splits between the name and
    // type indices, and only their total is known. Both orderings are tried.
    const splits = [];
    for (const nameW of [4, 2, 1]) {
        const typeW = recordSize - 4 - nameW;
        if (typeW === 4 || typeW === 2 || typeW === 1)
            splits.push({ nameW, typeW });
    }
    if (!splits.length)
        splits.push({ nameW: 4, typeW: 4 });
    let outOfRange = 0;
    for (const entry of opts.indexedTypes) {
        const t = entry.typeDef;
        if (!t.field_count)
            continue;
        if (t.fieldStart < 0 || t.fieldStart + t.field_count > recordCount)
            outOfRange++;
    }
    summary.probe.fieldsSize = fieldsSize;
    summary.probe.fieldRecordSize = recordSize;
    summary.probe.fieldRecordCount = recordCount;
    summary.probe.fieldsSizeDividesEvenly = fieldsSize % recordSize === 0;
    summary.probe.typesWithFieldRangeOutOfTable = outOfRange;
    summary.probe.metadataLength = metaLen;
    if (!fieldOffsetsAddr || !fieldOffsetsCount) {
        summary.reason = "MetadataRegistration has no fieldOffsets table";
        return { fieldData, parents, summary };
    }
    const plausiblePointer = (p) => p >= 1024 && p < bufLen;
    // Parent chain, straight out of the metadata. typeDef.parentIndex is an index
    // into MetadataRegistration.types; that Il2CppType's `data` word is the
    // parent's typeDefinitionIndex, which names it. This is the only route to
    // inheritance on a build that doesn't export il2cpp_class_get_parent.
    const nameOfTypeDef = (index) => {
        const pos = index >= 0 && index < opts.typeDefPos.length ? opts.typeDefPos[index] : 0;
        if (!pos)
            return null;
        const td = opts.metadata.typeDefs[pos - 1];
        if (!td)
            return null;
        try {
            const name = getStringFromIndex(opts.metadataReader, opts.stringOffset, td.nameIndex);
            const ns = getStringFromIndex(opts.metadataReader, opts.stringOffset, td.namespaceIndex);
            return name ? (ns ? ns + "." + name : name) : null;
        }
        catch (err) {
            return null;
        }
    };
    if (typesAddr && typesCount) {
        for (const entry of opts.indexedTypes) {
            const parentIndex = entry.typeDef.parentIndex;
            if (parentIndex === undefined || parentIndex < 0 || parentIndex >= typesCount)
                continue;
            const typePtr = u32(typesAddr + parentIndex * 4);
            if (!plausiblePointer(typePtr))
                continue;
            const kind = (u32(typePtr + 4) >>> 16) & 0xff;
            // CLASS or VALUETYPE: `data` is the type-definition index. A generic
            // instance parent points at an Il2CppGenericClass instead, which is
            // not resolvable this way.
            if (kind !== 18 && kind !== 17)
                continue;
            const parentName = nameOfTypeDef(u32(typePtr));
            if (parentName && parentName !== entry.fullTypeName)
                parents[entry.fullTypeName] = parentName;
        }
    }
    summary.probe.parentsResolved = Object.keys(parents).length;
    // Two layouts exist: `int32_t** fieldOffsets`, one array per type (modern),
    // and a flat `int32_t*` indexed by global field index. Decided from the data
    // rather than from a version number. Guessing from the first word was not
    // enough: a wrong guess reads pointers where offsets should be, every field
    // then looks static, and the result is an empty table that still reports
    // success. So both layouts are extracted and the one that actually produces
    // instance offsets wins.
    const plausibleName = (name) => {
        if (typeof name !== "string" || name.length === 0 || name.length > 256)
            return false;
        for (let i = 0; i < name.length; i++)
            if (name.charCodeAt(i) < 0x20)
                return false;
        return true;
    };
    // A build whose typeDef layout differs reads fieldStart from the wrong
    // member: the stride still lines up (so type names decode) but the indices
    // point at unrelated records. Re-reading the pair at a byte offset covers
    // the members that come and go between metadata versions.
    const tdLayout = layout || {};
    const metaView = new DataView(opts.metadata.buffer);
    const readRange = (typeDef, delta) => {
        if (!delta)
            return { start: typeDef.fieldStart, count: typeDef.field_count };
        const base = tdLayout.typeDefsOffset + typeDef.typeIndex * tdLayout.typeDefStructSize;
        const startAt = base + tdLayout.fieldStartRel + delta;
        const countAt = base + tdLayout.fieldCountRel + delta;
        if (startAt < 0 || startAt + 4 > metaLen || countAt < 0 || countAt + 2 > metaLen)
            return null;
        return { start: metaView.getInt32(startAt, true), count: metaView.getUint16(countAt, true) };
    };
    const extract = (usePointerTable, delta, split) => {
        const fieldData = Object.create(null);
        const result = { mode: usePointerTable ? "int32**" : "int32*", delta, split: `${split.nameW}+${split.typeW}+4`,
            fieldData, types: 0, fields: 0, rejected: 0,
            skippedNoSlot: 0, skippedBadPointer: 0, offsetOutOfRange: 0 };
        for (const entry of opts.indexedTypes) {
            const typeDef = entry.typeDef;
            const range = readRange(typeDef, delta);
            if (!range)
                continue;
            const count = range.count;
            if (!count || range.start < 0 || range.start + count > recordCount)
                continue;
            let perType = 0;
            if (usePointerTable) {
                if (typeDef.typeIndex >= fieldOffsetsCount) {
                    result.skippedNoSlot++;
                    continue;
                }
                perType = u32(fieldOffsetsAddr + typeDef.typeIndex * 4);
                if (!plausiblePointer(perType)) {
                    result.skippedBadPointer++;
                    continue;
                }
            }
            let bucket = null;
            for (let k = 0; k < count; k++) {
                const fieldIndex = range.start + k;
                try {
                    const record = fieldsOffset + fieldIndex * recordSize;
                    if (record < 0 || record + recordSize > metaLen) {
                        result.rejected++;
                        continue;
                    }
                    const nameIndex = split.nameW === 4 ? metaView.getUint32(record, true)
                        : split.nameW === 2 ? metaView.getUint16(record, true) : metaView.getUint8(record);
                    const typeAt = record + split.nameW;
                    const typeIndex = split.typeW === 4 ? metaView.getInt32(typeAt, true)
                        : split.typeW === 2 ? metaView.getUint16(typeAt, true) : metaView.getUint8(typeAt);
                    // Checked before the read, not after: a wild index makes the
                    // reader walk the whole buffer looking for a terminator and
                    // log about it, thousands of times over.
                    const at = opts.stringOffset + nameIndex;
                    if (nameIndex < 0 || at < 0 || at >= metaLen) {
                        result.rejected++;
                        continue;
                    }
                    const name = getStringFromIndex(opts.metadataReader, opts.stringOffset, nameIndex);
                    if (!plausibleName(name)) {
                        result.rejected++;
                        continue;
                    }
                    const offset = usePointerTable ? i32(perType + k * 4) : i32(fieldOffsetsAddr + fieldIndex * 4);
                    // A static or thread-static field's "offset" is into the
                    // type's static storage, not into any object; it reads as 0
                    // or -1 and is simply not an instance field. Reading the
                    // *wrong* table makes every field look like this, which is
                    // why the count below is what decides the layout.
                    if (offset <= 0 || offset > 0x100000) {
                        result.offsetOutOfRange++;
                        continue;
                    }
                    // The Il2CppType says how wide the slot is. Only the kind
                    // byte is kept — the runtime module owns the kind -> reader
                    // mapping, so it stays in one place.
                    let kind = 0;
                    if (typeIndex >= 0 && typeIndex < typesCount) {
                        const typePtr = u32(typesAddr + typeIndex * 4);
                        if (plausiblePointer(typePtr))
                            kind = (u32(typePtr + 4) >>> 16) & 0xff;
                    }
                    if (!bucket) {
                        bucket = Object.create(null);
                        fieldData[entry.fullTypeName] = bucket;
                        result.types++;
                    }
                    // A field that *is* a struct is stored inline, so reading it
                    // needs the nested type's own layout. Enums come back null
                    // here and keep falling through to their integer storage.
                    const nested = kind === IL2CPP_TYPE_VALUETYPE && opts.typeResolver
                        ? opts.typeResolver.structAt(typeIndex) : null;
                    // Keyed lowercase to match the rest of the proxy layer; the
                    // real spelling rides along for diagnostics.
                    bucket[name.toLowerCase()] = nested
                        ? { name, offset, kind, structType: nested.type, structSize: nested.size }
                        : { name, offset, kind };
                    result.fields++;
                }
                catch (err) {
                    result.rejected++;
                }
            }
        }
        return result;
    };
    let candidates = [];
    for (const split of splits)
        candidates.push(extract(true, 0, split), extract(false, 0, split));
    // Only when the declared layout fails does it cost anything to look further,
    // so a build that parses cleanly never pays for this.
    const primary = candidates.slice().sort((a, b) => b.fields - a.fields)[0];
    // Zero fields counts as failure too: a wrong layout often indexes clean out
    // of the table, so everything is skipped and nothing is even rejected.
    if (tdLayout.typeDefStructSize && (!primary.fields || primary.rejected > primary.fields)) {
        for (const delta of [-4, 4, -8, 8]) {
            for (const split of splits)
                candidates.push(extract(true, delta, split), extract(false, delta, split));
        }
    }
    candidates = candidates.sort((a, b) => (b.fields - b.rejected) - (a.fields - a.rejected));
    const best = candidates[0];
    summary.scores = candidates.map((c) => ({ mode: c.mode, delta: c.delta, split: c.split, types: c.types, fields: c.fields,
        rejected: c.rejected, skippedNoSlot: c.skippedNoSlot, skippedBadPointer: c.skippedBadPointer,
        offsetOutOfRange: c.offsetOutOfRange }));
    // Zero usable offsets from either layout means the fieldOffsets table was
    // not where we looked, or the field records are a different width. Reporting
    // that beats handing out offsets that would corrupt the heap on first write.
    if (!best.fields) {
        summary.reason = `no instance offsets from either layout (${JSON.stringify(summary.scores)})`;
        return { fieldData, parents, summary };
    }
    if (best.rejected > best.fields) {
        const p = summary.probe;
        summary.reason = `field names did not validate (${best.fields} usable, ${best.rejected} rejected)` +
            (p.typesWithFieldRangeOutOfTable > p.typesWithFields / 2
                ? ` — ${p.typesWithFieldRangeOutOfTable} of ${p.typesWithFields} types index outside the ` +
                  `${p.fieldRecordCount}-record table, so the typeDef stride is wrong for metadata v${p.metadataVersion}`
                : !p.fieldsSizeDividesEvenly
                    ? " — fieldsSize is not a multiple of the record width"
                    : ` — ranges are in bounds, so fieldStart is being read from the wrong member of the typeDef ` +
                      `record for metadata v${p.metadataVersion}; retried at ${summary.scores.length} layouts and none validated`);
        return { fieldData, parents, summary };
    }
    summary.found = true;
    summary.mode = best.mode;
    summary.fieldStartDelta = best.delta;
    summary.recordSplit = best.split;
    summary.types = best.types;
    summary.fields = best.fields;
    return { fieldData: best.fieldData, parents, summary };
}
function getStringFromIndex(reader, base, offset) {
    reader.seek(base + offset);
    return reader.readNullTerminatedUTF8String();
}
function isReferencedType(imageDefinitions, typeDefinitionsOffset, readerOffset, typeDefStructSize) {
    for (const imageDef of imageDefinitions) {
        let typeStart = imageDef.typeStart * typeDefStructSize + typeDefinitionsOffset;
        let typeCount = imageDef.typeCount * typeDefStructSize;
        let typeEnd = typeStart + typeCount;
        if (readerOffset >= typeStart && readerOffset < typeEnd) {
            return true;
        }
    }
    return false;
}
function readHeader(reader, version) {
    if (version >= 38) {
        const sanity = reader.readUint32();
        const ver = reader.readInt32();
        const header = { sanity, version: ver };
        const fields = [
            "stringLiterals",
            "stringLiteralData",
            "strings",
            "events",
            "properties",
            "methods",
            "parameterDefaultValues",
            "fieldDefaultValues",
            "fieldAndParameterDefaultValueData",
            "fieldMarshaledSizes",
            "parameters",
            "fields",
            "genericParameters",
            "genericParameterConstraints",
            "genericContainers",
            "nestedTypes",
            "interfaces",
            "vtableMethods",
            "interfaceOffsets",
            "typeDefinitions",
            "images",
            "assemblies",
            "fieldRefs",
            "referencedAssemblies",
            "attributeData",
            "attributeDataRanges",
            "unresolvedIndirectCallParameterTypes",
            "unresolvedIndirectCallParameterRanges",
            "windowsRuntimeTypeNames",
            "windowsRuntimeStrings",
            "exportedTypeDefinitions",
        ];
        for (const f of fields) {
            header[f + "Offset"] = reader.readUint32();
            header[f + "Size"] = reader.readInt32();
            header[f + "Count"] = reader.readUint32();
        }
        return header;
    }
    return {
        sanity: reader.readUint32(),
        version: reader.readInt32(),
        stringLiteralOffset: reader.readUint32(),
        stringLiteralSize: reader.readInt32(),
        stringLiteralDataOffset: reader.readUint32(),
        stringLiteralDataSize: reader.readInt32(),
        stringOffset: reader.readUint32(),
        stringSize: reader.readInt32(),
        eventsOffset: reader.readUint32(),
        eventsSize: reader.readInt32(),
        propertiesOffset: reader.readUint32(),
        propertiesSize: reader.readInt32(),
        methodsOffset: reader.readUint32(),
        methodsSize: reader.readInt32(),
        parameterDefaultValuesOffset: reader.readUint32(),
        parameterDefaultValuesSize: reader.readInt32(),
        fieldDefaultValuesOffset: reader.readUint32(),
        fieldDefaultValuesSize: reader.readInt32(),
        fieldAndParameterDefaultValueDataOffset: reader.readUint32(),
        fieldAndParameterDefaultValueDataSize: reader.readInt32(),
        fieldMarshaledSizesOffset: reader.readInt32(),
        fieldMarshaledSizesSize: reader.readInt32(),
        parametersOffset: reader.readUint32(),
        parametersSize: reader.readInt32(),
        fieldsOffset: reader.readUint32(),
        fieldsSize: reader.readInt32(),
        genericParametersOffset: reader.readUint32(),
        genericParametersSize: reader.readInt32(),
        genericParameterConstraintsOffset: reader.readUint32(),
        genericParameterConstraintsSize: reader.readInt32(),
        genericContainersOffset: reader.readUint32(),
        genericContainersSize: reader.readInt32(),
        nestedTypesOffset: reader.readUint32(),
        nestedTypesSize: reader.readInt32(),
        interfacesOffset: reader.readUint32(),
        interfacesSize: reader.readInt32(),
        vtableMethodsOffset: reader.readUint32(),
        vtableMethodsSize: reader.readInt32(),
        interfaceOffsetsOffset: reader.readInt32(),
        interfaceOffsetsSize: reader.readInt32(),
        typeDefinitionsOffset: reader.readUint32(),
        typeDefinitionsSize: reader.readInt32(),
        /*rgctxEntriesOffset: reader.readUint32(), Max v24.1
            //rgctxEntriesCount: reader.readInt32(),*/
        imagesOffset: reader.readUint32(),
        imagesSize: reader.readInt32(),
        assembliesOffset: reader.readUint32(),
        assembliesSize: reader.readInt32(),
        /*metadataUsageListsOffset: reader.readUint32(), Max v24.5
            metadataUsageListsCount: reader.readInt32(),
            metadataUsagePairsOffset: reader.readUint32(),
            metadataUsagePairsCount: reader.readInt32(),*/
        fieldRefsOffset: reader.readUint32(),
        fieldRefsSize: reader.readInt32(),
        referencedAssembliesOffset: reader.readInt32(),
        referencedAssembliesSize: reader.readInt32(),
        /*attributesInfoOffset: reader.readUint32(), Max v27.2
            attributesInfoCount: reader.readInt32(),
            attributeTypesOffset: reader.readUint32(),
            attributeTypesCount: reader.readInt32(),*/
        attributeDataOffset: reader.readUint32(),
        attributeDataSize: reader.readInt32(),
        attributeDataRangeOffset: reader.readUint32(),
        attributeDataRangeSize: reader.readInt32(),
        unresolvedVirtualCallParameterTypesOffset: reader.readInt32(),
        unresolvedVirtualCallParameterTypesSize: reader.readInt32(),
        unresolvedVirtualCallParameterRangesOffset: reader.readInt32(),
        unresolvedVirtualCallParameterRangesSize: reader.readInt32(),
        windowsRuntimeTypeNamesOffset: reader.readInt32(),
        windowsRuntimeTypeNamesSize: reader.readInt32(),
        windowsRuntimeStringsOffset: reader.readInt32(),
        windowsRuntimeStringsSize: reader.readInt32(),
        exportedTypeDefinitionsOffset: reader.readInt32(),
        exportedTypeDefinitionsSize: reader.readInt32(),
    };
}
function readImageDefinitions(reader, offset, size, indexSizes, version) {
    if (offset === 0 || size === 0) {
        console.error("[readImageDefinitions] offset or size is 0 — header was parsed incorrectly!");
        return [];
    }
    reader.seek(offset);
    const imageDefinitions = [];
    const imagesEnd = offset + size;
    while (reader.offset < imagesEnd) {
        imageDefinitions.push({
            nameIndex: reader.readUint32(),
            assemblyIndex: reader.readInt32(),
            typeStart: reader.readIndex(indexSizes.typeDefinitionIndex),
            typeCount: reader.readUint32(),
            exportedTypeStart: version >= 24 ? reader.readIndex(indexSizes.typeDefinitionIndex) : 0,
            exportedTypeCount: version >= 24 ? reader.readUint32() : 0,
            entryPointIndex: reader.readInt32(),
            token: version >= 19 ? reader.readUint32() : 0,
            customAttributeStart: version >= 24.1 ? reader.readInt32() : 0,
            customAttributeCount: version >= 24.1 ? reader.readUint32() : 0,
        });
    }
    return imageDefinitions;
}
// Byte size of one Il2CppTypeDefinition, based on the fields readTypeDefinitions
// consumes:
// 2x uint32 (nameIndex, namespaceIndex) = 8
// byvalTypeIndex(typeIndex), declaringTypeIndex(typeDef), parentIndex(typeIndex)
// elementTypeIndex only for version < 35 = typeIndex
// genericContainerIndex, flags (uint32) = 4
// fieldStart..interfaceOffsetsStart = 8 x int32 = 32
// 8 x uint16 (counts) = 16, then bitfield + token = 8
function typeDefStructSizeFor(indexSizes, version) {
    const sz = indexSizes;
    return (8 + // nameIndex, namespaceIndex
        sz.typeIndex + // byvalTypeIndex
        sz.typeDefinitionIndex + // declaringTypeIndex
        sz.typeIndex + // parentIndex
        (version < 35 ? sz.typeIndex : 0) + // elementTypeIndex
        sz.genericContainerIndex + // genericContainerIndex
        4 + // flags
        8 * 4 + // fieldStart..interfaceOffsetsStart (8 x int32)
        8 * 2 + // method_count..interface_offsets_count (8 x uint16)
        4 +
        4); // bitfield, token
}
// updated
// Byte offset of `fieldStart` within a typeDef record. The members before it
// are version-dependent, which is exactly what goes wrong on a build whose
// layout doesn't match — so it is recorded and can be retried at an offset.
function fieldStartRelFor(indexSizes, version) {
    const sz = indexSizes;
    return (8 + sz.typeIndex + sz.typeDefinitionIndex + sz.typeIndex +
        (version < 35 ? sz.typeIndex : 0) + sz.genericContainerIndex + 4);
}
function readTypeDefinitions(reader, offset, size, imageDefinitions, indexSizes, version) {
    console.debug("Reading Type Defs");
    const typeDefStructSize = typeDefStructSizeFor(indexSizes, version);
    // Random-access each referenced image's [typeStart, typeStart + typeCount)
    // range and parse only those entries, instead of reading every typedef in
    // the metadata (often 100k+) and filtering after the fact. The byte ranges
    // are non-overlapping by construction.
    const typeDefinitions = [];
    const totalTypeCount = Math.floor(size / typeDefStructSize);
    const sortedImages = imageDefinitions.slice().sort((a, b) => a.typeStart - b.typeStart);
    for (const imageDef of sortedImages) {
        const start = imageDef.typeStart;
        const end = Math.min(start + imageDef.typeCount, totalTypeCount);
        if (end <= start)
            continue;
        reader.seek(offset + start * typeDefStructSize);
        for (let i = start; i < end; i++) {
            typeDefinitions.push({
                typeIndex: i,
                nameIndex: reader.readUint32(),
                namespaceIndex: reader.readUint32(),
                byvalTypeIndex: reader.readIndex(indexSizes.typeIndex),
                declaringTypeIndex: reader.readIndex(indexSizes.typeDefinitionIndex),
                parentIndex: reader.readIndex(indexSizes.typeIndex),
                elementTypeIndex: version < 35 ? reader.readIndex(indexSizes.typeIndex) : 0,
                genericContainerIndex: reader.readIndex(indexSizes.genericContainerIndex),
                flags: reader.readUint32(),
                fieldStart: reader.readInt32(),
                methodStart: reader.readInt32(),
                eventStart: reader.readInt32(),
                propertyStart: reader.readInt32(),
                nestedTypesStart: reader.readInt32(),
                interfacesStart: reader.readInt32(),
                vtableStart: reader.readInt32(),
                interfaceOffsetsStart: reader.readInt32(),
                method_count: reader.readUint16(),
                property_count: reader.readUint16(),
                field_count: reader.readUint16(),
                event_count: reader.readUint16(),
                nested_type_count: reader.readUint16(),
                vtable_count: reader.readUint16(),
                interfaces_count: reader.readUint16(),
                interface_offsets_count: reader.readUint16(),
                bitfield: reader.readUint32(),
                token: reader.readUint32(),
            });
        }
    }
    return typeDefinitions;
}
function methodDefStructSize(indexSizes) {
    // Mirrors the bytes consumed per entry by readSingleMethodDefinition.
    return (4 + // nameIndex
        indexSizes.typeDefinitionIndex + // declaringType
        indexSizes.typeIndex + // returnType
        4 + // returnParameterToken
        indexSizes.parameterIndex + // parameterStart
        indexSizes.genericContainerIndex + // genericContainerIndex
        4 + // token
        2 * 4 // flags, iflags, slot, parameterCount (uint16 each)
    );
}
function computeTotalMethodCount(size, indexSizes) {
    const struct = methodDefStructSize(indexSizes);
    return struct > 0 ? Math.floor(size / struct) : 0;
}
function readSingleMethodDefinition(reader, indexSizes, methodIndex) {
    return {
        methodIndex,
        nameIndex: reader.readUint32(),
        declaringType: reader.readIndex(indexSizes.typeDefinitionIndex),
        returnType: reader.readIndex(indexSizes.typeIndex),
        returnParameterToken: reader.readInt32(),
        parameterStart: reader.readIndex(indexSizes.parameterIndex),
        genericContainerIndex: reader.readIndex(indexSizes.genericContainerIndex),
        token: reader.readUint32(),
        flags: reader.readUint16(),
        iflags: reader.readUint16(),
        slot: reader.readUint16(),
        parameterCount: reader.readUint16(),
    };
}
// Parses only the [methodStart, methodStart + method_count) ranges declared by
// referenced typeDefs, instead of every method in the metadata. Ranges are
// merged so overlapping/adjacent regions parse once.
function readMethodDefinitionsSparse(reader, offset, size, typeDefs, indexSizes) {
    const structSize = methodDefStructSize(indexSizes);
    const total = computeTotalMethodCount(size, indexSizes);
    // Collect [start, end) ranges, sort, then coalesce adjacent/overlapping ones.
    const ranges = [];
    for (const t of typeDefs) {
        if (t.method_count === 0)
            continue;
        const start = t.methodStart;
        if (start < 0)
            continue;
        const end = Math.min(start + t.method_count, total);
        if (end > start)
            ranges.push([start, end]);
    }
    if (ranges.length === 0)
        return [];
    ranges.sort((a, b) => a[0] - b[0]);
    const merged = [ranges[0]];
    for (let i = 1; i < ranges.length; i++) {
        const tail = merged[merged.length - 1];
        if (ranges[i][0] <= tail[1]) {
            if (ranges[i][1] > tail[1])
                tail[1] = ranges[i][1];
        }
        else {
            merged.push(ranges[i]);
        }
    }
    const methodDefinitions = [];
    for (const [start, end] of merged) {
        reader.seek(offset + start * structSize);
        for (let i = start; i < end; i++) {
            methodDefinitions.push(readSingleMethodDefinition(reader, indexSizes, i));
        }
    }
    return methodDefinitions;
}
function readCodeRegistration(reader, offset) {
    console.debug("Reading Code Registration");
    reader.seek(offset);
    return {
        reversePInvokeWrapperCount: reader.readUint32(),
        reversePInvokeWrappers: reader.readUint32(),
        genericMethodPointersCount: reader.readUint32(),
        genericMethodPointers: reader.readUint32(),
        genericAdjustorThunks: reader.readUint32(),
        invokerPointersCount: reader.readUint32(),
        invokerPointers: reader.readUint32(),
        unresolvedVirtualCallCount: reader.readUint32(),
        unresolvedVirtualCallPointers: reader.readUint32(),
        interopDataCount: reader.readUint32(),
        interopData: reader.readUint32(),
        windowsRuntimeFactoryCount: reader.readUint32(),
        windowsRuntimeFactoryTable: reader.readUint32(),
        codeGenModulesCount: reader.readUint32(),
        codeGenModules: reader.readUint32(),
    };
}
function readCodeGenModules(reader, offset, size) {
    console.debug("Reading CodeGen Modules");
    if (size === 0)
        return [];
    // Bulk-read all module pointers in one typed-array view instead of
    // size individual readUint32() calls.  Unity guarantees 4-byte alignment.
    if (offset % 4 === 0 && offset + size * 4 <= reader.buffer.byteLength) {
        const u32 = new Uint32Array(reader.buffer, offset, size);
        const modules = new Array(size);
        for (let i = 0; i < size; i++)
            modules[i] = u32[i];
        return modules;
    }
    reader.seek(offset);
    const modules = new Array(size);
    for (let i = 0; i < size; i++)
        modules[i] = reader.readUint32();
    return modules;
}
function readCodeGenModule(reader, offset) {
    reader.seek(offset);
    return {
        moduleName: reader.readUint32(),
        methodPointerCount: reader.readInt32(),
        methodPointers: reader.readUint32(),
        adjustorThunkCount: reader.readInt32(),
        adjustorThunks: reader.readUint32(),
        invokerIndices: reader.readUint32(),
        reversePInvokeWrapperCount: reader.readUint32(),
        reversePInvokeWrapperIndices: reader.readUint32(),
        rgctxRangesCount: reader.readInt32(),
        rgctxRanges: reader.readUint32(),
        rgctxsCount: reader.readInt32(),
        rgctxs: reader.readUint32(),
        debuggerMetadata: reader.readUint32(),
        moduleInitializer: reader.readUint32(),
        staticConstructorTypeIndices: reader.readUint32(),
        metadataRegistration: reader.readUint32(),
        codeRegistration: reader.readUint32(),
    };
}
function readCodeGenModuleMethodPointers(reader, offset, size) {
    if (size === 0)
        return [];
    // Bulk-read via Uint32Array view.  Avoids up to 50k+ readUint32() calls per module.
    // Unity's WASM data layout guarantees 4-byte alignment for pointer arrays.
    if (offset % 4 === 0 && offset + size * 4 <= reader.buffer.byteLength) {
        const u32 = new Uint32Array(reader.buffer, offset, size);
        const ptrs = new Array(size);
        for (let i = 0; i < size; i++)
            ptrs[i] = u32[i];
        return ptrs;
    }
    reader.seek(offset);
    const ptrs = new Array(size);
    for (let i = 0; i < size; i++)
        ptrs[i] = reader.readUint32();
    return ptrs;
}
function getSectionHelper(length, memoryBuffer, bssStart, methodCount, imageCount) {
    const exec = {
        offset: 0,
        offsetEnd: methodCount,
        address: 0,
        addressEnd: methodCount,
    };
    const data = {
        offset: 1024,
        offsetEnd: length,
        address: 1024,
        addressEnd: length,
    };
    const bss = {
        offset: bssStart,
        offsetEnd: BigInt(9223372036854775807),
        address: bssStart,
        addressEnd: BigInt(9223372036854775807),
    };
    const sectionHelper = new SectionHelper(memoryBuffer, imageCount);
    sectionHelper.setExecSection(exec);
    sectionHelper.setDataSection(data);
    sectionHelper.setBssSection(bss);
    return sectionHelper;
}
class SectionHelper {
    constructor(memoryBuffer, imageCount) {
        this.exec = [];
        this.data = [];
        this.bss = [];
        this.memoryReader = new _utils_binary__WEBPACK_IMPORTED_MODULE_1__.BinaryReader(memoryBuffer);
        this.memoryBuffer = memoryBuffer;
        this.imageCount = imageCount;
    }
    setExecSection(exec) {
        this.exec.push(exec);
    }
    setDataSection(data) {
        this.data.push(data);
    }
    setBssSection(bss) {
        this.bss.push(bss);
    }
    findCodeRegistration() {
        let codeRegistration = this.findCodeRegistrationData();
        return codeRegistration;
    }
    // Il2CppMetadataRegistration — needed to resolve generic method
    // instantiations, which have no entry in a module's method-pointer table.
    // 32-bit layout for metadata v29+ (il2cpp v27+, where metadataUsages is gone):
    //    0 genericClassesCount        4 genericClasses
    //    8 genericInstsCount         12 genericInsts
    //   16 genericMethodTableCount   20 genericMethodTable
    //   24 typesCount                28 types
    //   32 methodSpecsCount          36 methodSpecs
    //   40 fieldOffsetsCount         44 fieldOffsets
    //   48 typeDefinitionsSizesCount 52 typeDefinitionsSizes
    //
    // typeDefinitionsSizesCount always equals the metadata's type count, so the
    // existing value index finds every candidate in O(matches); the struct around
    // each hit is then validated before it's accepted.
    findMetadataRegistration(typeDefinitionsCount) {
        if (!typeDefinitionsCount)
            return 0;
        const candidates = this.findReference(typeDefinitionsCount);
        const bufLen = this.memoryBuffer.byteLength;
        const view = new DataView(this.memoryBuffer);
        // Every pointer in this struct is a 4-byte-aligned address inside the
        // image. Dropping the alignment requirement let a misaligned candidate
        // through that satisfied everything else by coincidence.
        const okPtr = (p) => p >= 1024 && p < bufLen && (p & 3) === 0;
        const okCount = (c) => c >= 0 && c < 0x00400000;
        for (let i = 0; i < candidates.length; i++) {
            const base = candidates[i] - 48;
            if (base < 0 || base + 56 > bufLen)
                continue;
            const u = (off) => view.getUint32(base + off, true);
            // IL2CPP emits the type-definition count for BOTH fieldOffsetsCount
            // and typeDefinitionsSizesCount. Requiring both is what separates the
            // real struct from a stretch of unrelated data that happens to hold
            // the count at +48 — which is what used to be found here, yielding a
            // fieldOffsets table of garbage and a near-empty field map.
            if (u(40) !== typeDefinitionsCount)
                continue;
            const genericInstsCount = u(8);
            const genericMethodTableCount = u(16);
            const typesCount = u(24);
            const methodSpecsCount = u(32);
            if (!okCount(genericInstsCount) || !okCount(genericMethodTableCount) ||
                !okCount(typesCount) || !okCount(methodSpecsCount))
                continue;
            // Every real build has types; a table of generic method functions can
            // never be larger than the method-spec table it indexes into.
            if (typesCount === 0 || genericMethodTableCount > methodSpecsCount)
                continue;
            if (!okPtr(u(4)) || !okPtr(u(12)) || !okPtr(u(20)) || !okPtr(u(28)) ||
                !okPtr(u(36)) || !okPtr(u(44)) || !okPtr(u(52)))
                continue;
            return base;
        }
        return 0;
    }
    findCodeRegistrationData() {
        return this.findCodeRegistration2019(this.data);
    }
    buildValueIndex() {
        if (this.valueIndex)
            return;
        // Open-addressing bucket index over every 4-byte-aligned word in the data
        // sections, stored entirely in typed arrays.
        //
        // This used to be a Map<number, number[]>: one Map entry plus one heap
        // Array per distinct word. A Unity data segment holds a few million
        // words, so that allocated millions of short-lived objects and spent
        // more time in GC than the rest of the load put together. The chains
        // here are two Int32Arrays and cost ~12 bytes per word with no GC churn.
        const indexes = [];
        const bufLen = this.memoryBuffer.byteLength;
        for (let i = 0; i < this.data.length; i++) {
            const dataSec = this.data[i];
            const start = dataSec.offset;
            const end = Math.min(dataSec.offsetEnd, bufLen) - 4;
            if (end < start) {
                indexes.push(null);
                continue;
            }
            const count = Math.floor((end - start) / 4) + 1;
            // start is always 1024 (set in getSectionHelper), so the view is aligned;
            // copy through a DataView on the off chance a caller changes that.
            let values;
            if (start % 4 === 0) {
                values = new Uint32Array(this.memoryBuffer, start, count);
            }
            else {
                values = new Uint32Array(count);
                const view = new DataView(this.memoryBuffer);
                for (let j = 0; j < count; j++)
                    values[j] = view.getUint32(start + j * 4, true);
            }
            let capacity = 16;
            while (capacity < count * 2)
                capacity *= 2;
            const mask = capacity - 1;
            const head = new Int32Array(capacity).fill(-1);
            const next = new Int32Array(count);
            // Insert back-to-front so each chain walks in ascending position order,
            // matching the order the old Map-of-arrays produced. findCodeRegistration
            // returns its first viable candidate, so this ordering is load-bearing.
            for (let j = count - 1; j >= 0; j--) {
                const h = (Math.imul(values[j], 2654435761) >>> 17) & mask;
                next[j] = head[h];
                head[h] = j;
            }
            indexes.push({ values, head, next, mask, start });
        }
        this.valueIndex = indexes;
    }
    findCodeRegistration2019(secs) {
        this.buildValueIndex();
        for (let i = 0; i < secs.length; i++) {
            const sec = secs[i];
            this.memoryReader.seek(sec.offset);
            const buff = this.memoryReader.readUint8ArrayView(sec.offsetEnd - sec.offset);
            const matches = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.patternSearch)(buff, SectionHelper.featureBytes);
            for (let j = 0; j < matches.length; j++) {
                const dllva = matches[j] + sec.address;
                const refvas = this.findReference(dllva);
                for (let k = 0; k < refvas.length; k++) {
                    const refva = refvas[k];
                    const refva2s = this.findReference(refva);
                    for (let l = 0; l < refva2s.length; l++) {
                        const refva2 = refva2s[l];
                        for (let m = this.imageCount - 1; m >= 0; m--) {
                            const refva3s = this.findReference(refva2 - m * 4);
                            for (let n = 0; n < refva3s.length; n++) {
                                const refva3 = refva3s[n];
                                this.memoryReader.seek(refva3 - 4);
                                if (this.memoryReader.readInt32() === this.imageCount) {
                                    return refva3 - 4 * 14;
                                }
                            }
                        }
                    }
                }
            }
        }
        return 0;
    }
    findReference(addr) {
        // Returns "addresses" (offsets translated by dataSec.address - dataSec.offset).
        // With the prebuilt index this is O(matches) instead of O(section size).
        this.buildValueIndex(); // no-op once built
        const references = [];
        const indexes = this.valueIndex;
        const needle = addr >>> 0;
        if (needle !== addr)
            return references; // negative / non-uint32 can't appear in the index
        for (let i = 0; i < this.data.length; i++) {
            const idx = indexes[i];
            if (!idx)
                continue;
            const dataSec = this.data[i];
            const delta = dataSec.address - dataSec.offset + idx.start;
            const values = idx.values;
            const next = idx.next;
            let j = idx.head[(Math.imul(needle, 2654435761) >>> 17) & idx.mask];
            while (j !== -1) {
                if (values[j] === needle)
                    references.push(j * 4 + delta);
                j = next[j];
            }
        }
        return references;
    }
}
SectionHelper.featureBytes = new Uint8Array([0x6d, 0x73, 0x63, 0x6f, 0x72, 0x6c, 0x69, 0x62, 0x2e, 0x64, 0x6c, 0x6c, 0x00]);


/***/ }),

/***/ "./src/logger/index.ts":
/*!*****************************!*\
  !*** ./src/logger/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LogLevel: () => (/* binding */ LogLevel),
/* harmony export */   Logger: () => (/* binding */ Logger)
/* harmony export */ });
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["NONE"] = 0] = "NONE";
    LogLevel[LogLevel["ERROR"] = 1] = "ERROR";
    LogLevel[LogLevel["WARN"] = 2] = "WARN";
    LogLevel[LogLevel["INFO"] = 4] = "INFO";
    LogLevel[LogLevel["DEBUG"] = 8] = "DEBUG";
    LogLevel[LogLevel["MESSAGE"] = 16] = "MESSAGE";
    LogLevel[LogLevel["ALL"] = 31] = "ALL";
})(LogLevel || (LogLevel = {}));
class Logger {
    constructor(name) {
        this.name = name;
    }
    error(...args) {
        this.log(LogLevel.ERROR, ...args);
    }
    warn(...args) {
        this.log(LogLevel.WARN, ...args);
    }
    info(...args) {
        this.log(LogLevel.INFO, ...args);
    }
    debug(...args) {
        this.log(LogLevel.DEBUG, ...args);
    }
    message(...args) {
        this.log(LogLevel.MESSAGE, ...args);
    }
    log(level, ...args) {
        if (this.shouldLog(level) && args.length > 0) {
            const logPrefix = `%c[${this.name}] %c[${LogLevel[level]}]%c`;
            let message = args.shift();
            if (typeof message !== "string") {
                args.push(message);
                message = "";
            }
            else {
                message = " " + message;
            }
            let logStyles = "color: #fff;";
            let messageStyles;
            switch (level) {
                case LogLevel.ERROR:
                    messageStyles = "color: #FF6E74;";
                    break;
                case LogLevel.WARN:
                    messageStyles = "color: #FFB36A;";
                    break;
                case LogLevel.INFO:
                    messageStyles = "color: #35EA93;";
                    break;
                case LogLevel.DEBUG:
                    messageStyles = "color: #BE7CFF;";
                    break;
                case LogLevel.MESSAGE:
                    messageStyles = "color: #56C4FF;";
                    break;
            }
            console.log(logPrefix + message, logStyles, messageStyles, "color: default;", ...args);
        }
    }
    shouldLog(level) {
        if (level === LogLevel.DEBUG)
            // @ts-ignore
            return true;
        return true;
    }
}


/***/ }),

/***/ "./src/mod.ts":
/*!********************!*\
  !*** ./src/mod.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KeyCode: () => (/* reexport safe */ _extras__WEBPACK_IMPORTED_MODULE_2__.KeyCode),
/* harmony export */   LogLevel: () => (/* reexport safe */ _logger__WEBPACK_IMPORTED_MODULE_1__.LogLevel),
/* harmony export */   Logger: () => (/* reexport safe */ _logger__WEBPACK_IMPORTED_MODULE_1__.Logger),
/* harmony export */   Runtime: () => (/* binding */ Runtime),
/* harmony export */   clearBuildCache: () => (/* reexport safe */ _runtime__WEBPACK_IMPORTED_MODULE_0__.clearBuildCache),
/* harmony export */   clearUnityCache: () => (/* reexport safe */ _preloader__WEBPACK_IMPORTED_MODULE_3__.clearUnityCache),
/* harmony export */   ValueWrapper: () => (/* reexport safe */ _runtime__WEBPACK_IMPORTED_MODULE_0__.ValueWrapper),
/* harmony export */   dataTypeSizes: () => (/* reexport safe */ _extras__WEBPACK_IMPORTED_MODULE_2__.dataTypeSizes),
/* harmony export */   revision: () => (/* reexport safe */ _preloader__WEBPACK_IMPORTED_MODULE_3__.revision),
/* harmony export */   version: () => (/* binding */ version)
/* harmony export */ });
/* harmony import */ var _runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./runtime */ "./src/runtime/index.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logger */ "./src/logger/index.ts");
/* harmony import */ var _extras__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extras */ "./src/extras/index.ts");
/* harmony import */ var _preloader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./preloader */ "./src/preloader/index.ts");
// Exports


const Runtime = new _runtime__WEBPACK_IMPORTED_MODULE_0__.Runtime();


// @ts-ignore Set by webpack at bundle time
const version = "1.1.0";


/***/ }),

/***/ "./src/preloader/index.ts":
/*!********************************!*\
  !*** ./src/preloader/index.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildHash: () => (/* binding */ buildHash),
/* harmony export */   revision: () => (/* binding */ revision),
/* harmony export */   clearUnityCache: () => (/* binding */ clearUnityCache),
/* harmony export */   preload: () => (/* binding */ preload)
/* harmony export */ });
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../logger */ "./src/logger/index.ts");
/* harmony import */ var _web_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../web-data */ "./src/web-data/index.ts");
/* harmony import */ var _mod__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../mod */ "./src/mod.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



const logger = new _logger__WEBPACK_IMPORTED_MODULE_0__.Logger("Preloader");
// Identifies this build of the loader. Folded into the derived-artifact cache
// key so rebuilding the loader can never replay a binary produced by the old
// rewriter — which would be silently wrong rather than merely stale.
// Bumped on every edit to this file. `buildHash` comes from webpack and does not
// move when the bundle is edited in place, so it can answer neither "is the copy
// the browser loaded the copy I just changed?" nor "is the cached patched build
// still valid?" — this can, and it is folded into the derived-artifact cache key
// for exactly that reason. Available as UnityWebModkit.revision.
const revision = "2026-08-11.no-capi-diagnostics";
let buildHash = "dev";
try {
    // @ts-ignore Set by webpack at bundle time
    buildHash = String(__webpack_require__.h());
}
catch (err) {
    // Not running through webpack (tests, or an inlined copy) — "dev" is fine.
}
function preload() {
    logger.info("UnityWebModkit v%s (rev %s) - %s", _mod__WEBPACK_IMPORTED_MODULE_2__.version, revision, window.location.hostname);
    logger.info("Build hash: %s", buildHash);
    // Two copies on the page — a userscript @require plus a bundled build, say —
    // both run this preloader, but only one of them ends up as
    // window.UnityWebModkit. The console then reads "new" while every API call
    // goes to the old one. Detect it instead of leaving it to guesswork.
    const existing = typeof window !== "undefined" ? window.UnityWebModkit : undefined;
    if (existing && existing.revision !== revision) {
        logger.warn("Another UnityWebModkit is already on this page (rev %s) and this one is rev %s. " +
            "Whichever loads last owns window.UnityWebModkit — remove one copy.", existing.revision || "unknown", revision);
    }
    return preloadInternal();
}
// Unity's loader serves already-cached assets out of the CacheStorage API and
// never calls window.fetch for them, so on a warm load the interceptor below
// simply never fires. Rather than deleting the cache to force a re-download
// (which is exactly the slow path this is meant to avoid), read the archive
// back out of the cache.
function findCachedWebDataResponse() {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof caches === "undefined")
            return null;
        let names;
        try {
            names = yield caches.keys();
        }
        catch (err) {
            return null; // no CacheStorage (insecure context, or blocked)
        }
        // Unity's is called "UnityCache"; look there first but don't rely on it.
        names.sort((a, b) => (b.toLowerCase().indexOf("unity") + 1) - (a.toLowerCase().indexOf("unity") + 1));
        for (const name of names) {
            try {
                const cache = yield caches.open(name);
                const requests = yield cache.keys();
                for (const request of requests) {
                    if (request.url.indexOf(".data") === -1)
                        continue;
                    const response = yield cache.match(request);
                    if (response) {
                        logger.debug("[Preloader] Found the web data in CacheStorage '%s': %s", name, request.url);
                        return response;
                    }
                }
            }
            catch (err) {
                // A cache we can't read is not a reason to fail the load.
            }
        }
        return null;
    });
}
// Older Unity loaders cached responses in IndexedDB instead of CacheStorage, and
// the schema moved around between versions. Rather than encode any particular
// one, walk every store and look for an entry that is plainly the .data archive:
// a key or field that looks like its URL, alongside a binary payload.
function findCachedWebDataInIndexedDb() {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof indexedDB === "undefined")
            return null;
        let names = ["UnityCache"];
        try {
            if (indexedDB.databases) {
                const listed = yield indexedDB.databases();
                names = listed.map((db) => db.name).filter(Boolean);
                // Prefer Unity's own, but don't insist on the name.
                names.sort((a, b) => (b.toLowerCase().indexOf("unity") + 1) - (a.toLowerCase().indexOf("unity") + 1));
            }
        }
        catch (err) {
            // databases() unsupported — fall through with the default guess.
        }
        const asBytes = (value) => {
            if (!value || typeof value !== "object")
                return null;
            if (value instanceof ArrayBuffer)
                return value;
            if (ArrayBuffer.isView(value))
                return value.buffer.slice(value.byteOffset, value.byteOffset + value.byteLength);
            for (const key in value) {
                const inner = value[key];
                if (inner instanceof ArrayBuffer)
                    return inner;
                if (ArrayBuffer.isView(inner))
                    return inner.buffer.slice(inner.byteOffset, inner.byteOffset + inner.byteLength);
            }
            return null;
        };
        const looksLikeWebData = (key, value) => {
            if (typeof key === "string" && key.indexOf(".data") !== -1)
                return true;
            if (value && typeof value === "object" && typeof value.url === "string" && value.url.indexOf(".data") !== -1)
                return true;
            return false;
        };
        for (const name of names) {
            let db = null;
            try {
                db = yield new Promise((resolve) => {
                    // No version: opening with one would trigger an upgrade and
                    // could destroy Unity's own cache.
                    const request = indexedDB.open(name);
                    request.onsuccess = () => resolve(request.result);
                    request.onerror = () => resolve(null);
                    request.onblocked = () => resolve(null);
                });
                if (!db || !db.objectStoreNames.length)
                    continue;
                const stores = Array.from(db.objectStoreNames);
                const found = yield new Promise((resolve) => {
                    let tx;
                    try {
                        tx = db.transaction(stores, "readonly");
                    }
                    catch (err) {
                        resolve(null);
                        return;
                    }
                    let pending = stores.length;
                    let answer = null;
                    const done = () => { if (--pending <= 0) resolve(answer); };
                    for (const store of stores) {
                        const cursorRequest = tx.objectStore(store).openCursor();
                        cursorRequest.onsuccess = () => {
                            const cursor = cursorRequest.result;
                            if (!cursor || answer) {
                                if (!cursor)
                                    done();
                                return;
                            }
                            if (looksLikeWebData(cursor.key, cursor.value)) {
                                const bytes = asBytes(cursor.value);
                                if (bytes && bytes.byteLength > 0) {
                                    answer = bytes;
                                    resolve(answer);
                                    return;
                                }
                            }
                            cursor.continue();
                        };
                        cursorRequest.onerror = () => done();
                    }
                    tx.onerror = () => resolve(answer);
                    tx.onabort = () => resolve(answer);
                });
                if (found) {
                    logger.debug("[Preloader] Found the web data in IndexedDB '%s' (%d KB)", name, (found.byteLength / 1024) | 0);
                    return found;
                }
            }
            catch (err) {
                // Move on to the next database.
            }
            finally {
                if (db)
                    db.close();
            }
        }
        return null;
    });
}
// Polls both caches briefly: on a warm load the entry is already there, and on a
// cold one the fetch interceptor wins this race anyway.
function recoverWebDataFromCache(attempts, delayMs) {
    return __awaiter(this, void 0, void 0, function* () {
        const usable = (webData) => webData && webData.getNode("Il2CppData/Metadata/global-metadata.dat");
        for (let i = 0; i < attempts; i++) {
            const response = yield findCachedWebDataResponse();
            if (response) {
                const webData = yield readWebDataPrefix(response);
                // Only claim the race if this archive is actually the one we need.
                if (usable(webData)) {
                    logger.info("[Preloader] Recovered the web data from the browser cache — no re-download needed");
                    return webData;
                }
                logger.debug("[Preloader] A cached .data was found but has no metadata node; still waiting on fetch");
            }
            const buffer = yield findCachedWebDataInIndexedDb();
            if (buffer) {
                const webData = parseWebData(buffer);
                if (usable(webData)) {
                    logger.info("[Preloader] Recovered the web data from IndexedDB — no re-download needed");
                    return webData;
                }
            }
            yield new Promise((resolve) => setTimeout(resolve, delayMs));
        }
        // Never resolves the race — the fetch path is still live.
        return new Promise(() => { });
    });
}
function preloadInternal() {
    return __awaiter(this, void 0, void 0, function* () {
        // Install the fetch hook FIRST before any async work, so we never miss
        // a Unity request that fires during or before anything else runs.
        logger.debug("[Preloader] Installing fetch hook early...");
        const webDataPromise = fallbackInterceptFetch();
        // …and race it against the cache, because a warm load never fetches.
        const cachedPromise = recoverWebDataFromCache(20, 250);
        // Unity's own IndexedDB cache is left alone on purpose. Deleting it used
        // to force a full re-download of the .data archive and the WASM binary —
        // frequently hundreds of megabytes — on *every* load, which dwarfed
        // everything else the loader does. Nothing here depends on those caches
        // being cold: the fetch hook tees whatever Unity serves, from network or
        // from disk, and the derived-artifact cache is keyed by the binary's own
        // content hash, so a game update invalidates it automatically.
        //
        // Call UnityWebModkit.clearUnityCache() by hand if a build ever needs it.
        logger.debug("[Preloader] Waiting for Unity web data...");
        return yield Promise.race([webDataPromise, cachedPromise]);
    });
}
// ---------------------------------------------------------------------------
// Cache Clearing Utilities
// ---------------------------------------------------------------------------
function clearUnityIndexedDB() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!window.indexedDB)
            return;
        try {
            const existing = yield indexedDB.databases();
            const names = existing.map((db) => db.name);
            if (!names.includes("UnityCache"))
                return;
        }
        catch (_a) {
            // browsers that don't support indexedDB.databases() — fall through and try anyway
        }
        return new Promise((resolve) => {
            const req = indexedDB.deleteDatabase("UnityCache");
            req.onsuccess = () => {
                console.log("[Preloader] UnityCache IndexedDB deleted.");
                resolve();
            };
            req.onerror = (e) => {
                console.warn("[Preloader] Failed to delete UnityCache IndexedDB.", e);
                resolve();
            };
            req.onblocked = () => {
                // Another connection is holding the DB open; don't hang — resolve and move on.
                console.warn("[Preloader] Delete blocked — another connection holds UnityCache. Continuing anyway.");
                resolve();
            };
        });
    });
}
function clearUnityCacheStorage() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deleted = yield caches.delete("UnityCache");
            console.log("[Preloader] CacheStorage UnityCache deleted:", deleted);
        }
        catch (e) {
            console.warn("[Preloader] Failed to clear CacheStorage UnityCache:", e);
        }
    });
}
function clearUnityCache() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("[Preloader] Clearing all Unity caches...");
        // Run IDB deletion, the known UnityCache CacheStorage delete, and the
        // "look for any other Unity-named caches" sweep concurrently.
        const otherUnityCaches = (() => __awaiter(this, void 0, void 0, function* () {
            try {
                const names = yield caches.keys();
                const unityNames = names.filter((n) => n.toLowerCase().includes("unity"));
                yield Promise.all(unityNames.map((n) => caches.delete(n)));
            }
            catch (e) {
                console.warn("[Preloader] Failed checking CacheStorage keys:", e);
            }
        }))();
        yield Promise.allSettled([clearUnityIndexedDB(), clearUnityCacheStorage(), otherUnityCaches]);
        console.log("[Preloader] All Unity caches cleared.");
    });
}
window.clearUnityCache = clearUnityCache

function fallbackInterceptFetch() {
    return __awaiter(this, void 0, void 0, function* () {
        logger.debug("Installing fetch interceptor for Unity web data");
        return new Promise((resolve) => {
            const originalFetch = window.fetch;
            const urlFromInput = (input) => {
                if (typeof input === "string")
                    return input;
                if (input instanceof URL)
                    return input.href;
                if (typeof Request !== "undefined" && input instanceof Request)
                    return input.url;
                return "";
            };
            let settled = false;
            const finish = (webData) => {
                if (settled)
                    return;
                // Only stand down once an archive that actually contains the
                // metadata has been seen. Uninstalling on the first URL that
                // merely contained ".data" used to burn the one chance we get.
                if (!webData || !webData.getNode("Il2CppData/Metadata/global-metadata.dat")) {
                    logger.debug("[Preloader] Intercepted a .data request with no metadata node; staying installed");
                    return;
                }
                settled = true;
                if (window.fetch === hooked)
                    window.fetch = originalFetch;
                resolve(webData);
            };
            const hooked = function (input, init) {
                const url = urlFromInput(input);
                // Use indexOf for a marginal win over .includes() (and avoid the
                // `then`/`await` machinery for the overwhelmingly common non-match path).
                if (settled || url.indexOf(".data") === -1) {
                    return originalFetch.call(this, input, init);
                }
                const responsePromise = originalFetch.call(this, input, init);
                // Parse the web data in parallel: clone the response immediately and
                // start reading its body, but return the original response to Unity
                // straight away so Unity can begin its own pipeline (WASM fetch,
                // initialization) without waiting for our parse.
                responsePromise.then((response) => readWebDataPrefix(response.clone()).then(finish), (err) => {
                    // This request failed. Stay installed — Unity retries, and
                    // the cache probe is still running — but don't leave the
                    // caller waiting forever with nothing to show for it.
                    logger.error("A Unity .data request failed (%s); still waiting for another source", (err && err.message) || err);
                });
                return responsePromise;
            };
            window.fetch = hooked;
        });
    });
}
// The only two archive members anything downstream reads. The second element,
// when present, caps how many bytes of that member we need.
const RESOLVABLE_NODES = [["data.unity3d", 32], ["Il2CppData/Metadata/global-metadata.dat"]];
function parseWebData(data) {
    return new _web_data__WEBPACK_IMPORTED_MODULE_1__.WebData(data, RESOLVABLE_NODES);
}
// A .data archive is frequently the largest asset a Unity build ships — hundreds
// of megabytes is normal. Everything downstream (metadataReady, and therefore
// every WebAssembly.instantiate the game attempts) used to block on the whole
// file arriving, and buffered a second full copy of it to do so.
//
// We only need the archive directory plus the two members above, so read the
// response body incrementally and stop at the last byte that actually matters.
// On a typical build that is a small fraction of the file, and Unity's WASM
// instantiation stops waiting on the rest of the download.
const WEBDATA_HEADER_PROBE = 8192; // don't bother parsing the directory before this much has arrived
const WEBDATA_MAX_HEADER = 64 * 1024 * 1024; // sanity bound on a claimed directory length
function flattenChunks(chunks, total) {
    const out = new Uint8Array(total);
    let at = 0;
    for (let i = 0; i < chunks.length && at < total; i++) {
        const chunk = chunks[i];
        const take = Math.min(chunk.length, total - at);
        out.set(take === chunk.length ? chunk : chunk.subarray(0, take), at);
        at += take;
    }
    return out;
}
// Byte length of the shortest prefix containing every resolvable node.
// Returns 0 when the directory isn't fully buffered yet, -1 when the header
// doesn't look like a web-data archive at all (caller falls back to the whole file).
function webDataPrefixLength(bytes) {
    const len = bytes.length;
    let p = 0;
    while (p < len && bytes[p] !== 0)
        p++;
    if (p >= len)
        return p > 512 ? -1 : 0; // absurdly long "signature" ⇒ not our format
    p++; // null terminator
    if (p + 4 > len)
        return 0;
    const view = new DataView(bytes.buffer, bytes.byteOffset, len);
    const headLen = view.getUint32(p, true);
    p += 4;
    if (headLen <= p || headLen > WEBDATA_MAX_HEADER)
        return -1;
    if (len < headLen)
        return 0; // directory itself still downloading
    let end = headLen;
    const decoder = new TextDecoder("utf-8");
    while (p + 12 <= headLen) {
        const offset = view.getUint32(p, true);
        const size = view.getUint32(p + 4, true);
        const nameLen = view.getUint32(p + 8, true);
        p += 12;
        if (nameLen > headLen - p)
            return -1; // malformed directory
        const name = decoder.decode(bytes.subarray(p, p + nameLen));
        p += nameLen;
        for (let i = 0; i < RESOLVABLE_NODES.length; i++) {
            if (RESOLVABLE_NODES[i][0] !== name)
                continue;
            const needed = offset + (RESOLVABLE_NODES[i][1] !== undefined ? RESOLVABLE_NODES[i][1] : size);
            if (needed > end)
                end = needed;
        }
    }
    return end;
}
function readWebDataPrefix(response) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = response.body;
        if (!body || typeof body.getReader !== "function") {
            // No streams support — fall back to the old whole-file read.
            return parseWebData(yield response.arrayBuffer());
        }
        const reader = body.getReader();
        const chunks = [];
        let received = 0;
        let needed = 0; // 0 = directory not parsed yet
        let probeAt = WEBDATA_HEADER_PROBE;
        try {
            for (;;) {
                const step = yield reader.read();
                if (step.done)
                    break;
                chunks.push(step.value);
                received += step.value.length;
                if (needed === 0 && received >= probeAt) {
                    const prefix = webDataPrefixLength(flattenChunks(chunks, received));
                    if (prefix === -1) {
                        needed = Infinity; // unrecognised header — read it all, as before
                    }
                    else if (prefix > 0) {
                        needed = prefix;
                    }
                    else {
                        // Directory not fully buffered; re-probe once we've doubled.
                        probeAt = received * 2;
                    }
                }
                if (needed !== 0 && received >= needed) {
                    // Releases the tee buffer the clone would otherwise keep growing.
                    void reader.cancel();
                    break;
                }
            }
        }
        catch (e) {
            // The body is already disturbed, so response.arrayBuffer() can't be
            // retried — hand WebData whatever arrived and let its bounds checks
            // report which node is missing.
            logger.warn("Streaming web-data read failed after %d bytes (%s) — parsing what arrived", received, (e === null || e === void 0 ? void 0 : e.message) || e);
            try {
                void reader.cancel();
            }
            catch (_a) { /* already errored */ }
            return parseWebData(flattenChunks(chunks, received).buffer);
        }
        const total = needed !== 0 && needed !== Infinity ? Math.min(needed, received) : received;
        logger.debug("Read %d KB of web data (of %d KB streamed) before stopping", (total / 1024) | 0, (received / 1024) | 0);
        return parseWebData(flattenChunks(chunks, total).buffer);
    });
}


/***/ }),

/***/ "./src/runtime/index.ts":
/*!******************************!*\
  !*** ./src/runtime/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Runtime: () => (/* binding */ Runtime),
/* harmony export */   ValueWrapper: () => (/* binding */ ValueWrapper),
/* harmony export */   clearBuildCache: () => (/* binding */ clearBuildCache)
/* harmony export */ });
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../logger */ "./src/logger/index.ts");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../errors */ "./src/errors/index.ts");
/* harmony import */ var _il2cpp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../il2cpp */ "./src/il2cpp/index.ts");
/* harmony import */ var _preloader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../preloader */ "./src/preloader/index.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils */ "./src/utils/index.ts");
/* harmony import */ var _wail__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../wail */ "./src/wail/index.js");
/* harmony import */ var _utils_binary__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/binary */ "./src/utils/binary/index.ts");
/* harmony import */ var _extras__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../extras */ "./src/extras/index.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};








const debugMode = true;
// Shared logger for class-level helpers (ValueWrapper, free-function utilities)
// that aren't instance-scoped. Plugin authors who run into a null have a clear
// trail to where the failure came from instead of "Cannot read properties of
// undefined (reading 'asm')".
const moduleLogger = new _logger__WEBPACK_IMPORTED_MODULE_0__.Logger("UnityWebModkit");
// Guard helpers. Each returns the value (or null when missing) and logs a
// scoped error describing what was missing and where. Centralising the
// messages means every null bubbles up with the same format.
function requireGame(where) {
    // @ts-ignore
    // Templates differ in what they name the instance, so accept the lot rather
    // than making plugins shim `window.unityInstance = window.unityGameInstance`
    // (which some do from inside a per-frame hook).
    const g = window.unityInstance || window.unityGame || window.unityGameInstance ||
        (typeof game !== "undefined" ? game : undefined);
    if (!g) {
        moduleLogger.error("%s: Unity is not initialized (no window.unityInstance / unityGame). Did the WASM module load yet?", where);
        return null;
    }
    if (!g.Module) {
        moduleLogger.error("%s: Unity instance has no .Module — the loader likely hasn't finished startup", where);
        return null;
    }
    return g;
}
// Emscripten renamed Module.asm to Module.wasmExports in 3.1.44 (2023), so a
// build made with a newer toolchain has no `.asm` at all. Reading only `.asm`
// made every il2cpp_* entry point look missing on those games — which silently
// disabled class lookup, fields, .ctor and every struct helper.
function wasmExportsOf(_game) {
    const module = _game ? _game.Module : null;
    if (module && (module.wasmExports || module.asm))
        return module.wasmExports || module.asm;
    // Nothing published on Module: fall back to the exports object the loader
    // itself received from WebAssembly.instantiate, which is the real table
    // whether or not Unity's own loader chose to republish it.
    return (activeRuntime && activeRuntime._wasmExports) || null;
}
function requireAsm(where, _game) {
    const asm = wasmExportsOf(_game);
    if (!asm) {
        moduleLogger.error("%s: neither _game.Module.wasmExports nor _game.Module.asm is present", where);
        return null;
    }
    return asm;
}
function requireHeap(where, _game) {
    var _a;
    const heap = (_a = _game === null || _game === void 0 ? void 0 : _game.Module) === null || _a === void 0 ? void 0 : _a.HEAPU8;
    if (!heap) {
        moduleLogger.error("%s: _game.Module.HEAPU8 is null/undefined", where);
        return null;
    }
    return heap;
}
function requireExport(where, asm, name) {
    // Some builds expose only the `_`-prefixed JS wrapper rather than the bare
    // WASM export.
    const fn = asm ? (typeof asm[name] === "function" ? asm[name] : asm["_" + name]) : undefined;
    if (typeof fn !== "function") {
        moduleLogger.error("%s: WASM export '%s' is missing or not a function (got %s)", where, name, typeof fn);
        return null;
    }
    return fn;
}
// The single Runtime instance (created in mod.ts). ValueWrapper needs a way back
// to it for `.as()`, and it has no constructor reference of its own.
let activeRuntime = null;
// Distinguishes "this property does not exist" from "it exists and is undefined".
const MISSING_PROPERTY = Symbol("missing");
// Emscripten keeps the first page as a null guard and puts static data above it;
// no managed object ever lives below this.
const IL2CPP_MIN_OBJECT_ADDRESS = 1024;
// sizeof(Il2CppObject) on wasm32: the class pointer plus the monitor pointer.
// A value type's fields are laid out as if it were boxed, so its recorded field
// offsets are this much larger than the offsets into an unboxed buffer.
const IL2CPP_OBJECT_HEADER = 8;
// A "value size" past this is a misread, not a struct; refuse rather than
// handing malloc a nonsense length.
const IL2CPP_MAX_STRUCT_SIZE = 1 << 20;
// A name with every non-ASCII character shown as \uXXXX. Obfuscated builds name
// fields with homoglyphs — `Ӏ` (U+04C0) and `Ι` (U+0399) render identically to
// `l` and `I` — so the printable form of two different identifiers can be the
// same. This is the form to paste into source.
function escapeIdentifier(name) {
    let out = "";
    for (let i = 0; i < String(name).length; i++) {
        const code = String(name).charCodeAt(i);
        out += code > 126 || code < 32
            ? "\\u" + code.toString(16).toUpperCase().padStart(4, "0")
            : String(name)[i];
    }
    return out;
}
// Homoglyph obfuscators pick characters that render as a bare vertical stroke:
// `l`, `I`, `1`, `Ӏ`, `Ι` and `ı` are pixel-identical in most fonts. A
// name copied out of a decompiler by eye almost always has the wrong one, and
// the failure looks exactly like "that member does not exist".
function foldConfusables(name) {
    return String(name).replace(/[lI1|ӀΙı]/g, "|");
}
// Bounded C-string read out of the WASM heap.
function readHeapCString(view, pointer, max = 512) {
    if (pointer <= 0 || pointer >= view.byteLength)
        return null;
    const limit = Math.min(view.byteLength, pointer + max);
    let end = pointer;
    while (end < limit && view.getUint8(end) !== 0)
        end++;
    let out = "";
    for (let i = pointer; i < end; i++)
        out += String.fromCharCode(view.getUint8(i));
    return out;
}
// Il2CppTypeEnum -> the element descriptor to read/write a field of that type.
// VALUETYPE covers enums, whose storage is almost always a 4-byte int; pass an
// explicit type to $static.get/set if a build uses a different underlying type.
const IL2CPP_KIND_TO_ELEMENT = {
    2: "bool", 3: "char", 4: "i8", 5: "u8", 6: "i16", 7: "u16", 8: "i32", 9: "u32",
    10: "i64", 11: "u64", 12: "f32", 13: "f64", 14: "str", 15: "u32", 17: "i32",
    18: "obj", 19: "obj", 20: "obj", 21: "obj", 24: "i32", 25: "u32", 28: "obj",
    29: "obj", 30: "obj",
};
const IL2CPP_ELEMENT_WRITERS = {
    bool: (v, o, x) => v.setUint8(o, x ? 1 : 0),
    i8: (v, o, x) => v.setInt8(o, x),
    u8: (v, o, x) => v.setUint8(o, x),
    char: (v, o, x) => v.setUint16(o, typeof x === "string" ? x.charCodeAt(0) : x, true),
    i16: (v, o, x) => v.setInt16(o, x, true),
    u16: (v, o, x) => v.setUint16(o, x, true),
    i32: (v, o, x) => v.setInt32(o, x, true),
    u32: (v, o, x) => v.setUint32(o, x >>> 0, true),
    f32: (v, o, x) => v.setFloat32(o, x, true),
    f64: (v, o, x) => v.setFloat64(o, x, true),
    i64: (v, o, x) => v.setBigInt64(o, BigInt(x), true),
    u64: (v, o, x) => v.setBigUint64(o, BigInt(x), true),
    ptr: (v, o, x) => v.setUint32(o, x >>> 0, true),
    obj: (v, o, x) => v.setUint32(o, x >>> 0, true),
};
// Element type -> the corlib class a value of that type boxes into.
const IL2CPP_BOX_CLASSES = {
    bool: "System.Boolean", i8: "System.SByte", u8: "System.Byte",
    i16: "System.Int16", u16: "System.UInt16", char: "System.Char",
    i32: "System.Int32", u32: "System.UInt32", i64: "System.Int64",
    u64: "System.UInt64", f32: "System.Single", f64: "System.Double",
};
// …and back, so `newArray("System.Int32", …)` knows to store raw ints rather
// than boxed references.
const IL2CPP_PRIMITIVE_ELEMENTS = {};
for (const element in IL2CPP_BOX_CLASSES)
    IL2CPP_PRIMITIVE_ELEMENTS[IL2CPP_BOX_CLASSES[element]] = element;
// What a bare JS value becomes when no type is given. C# distinctions JS doesn't
// have (float vs double, int vs long) need the explicit { type, value } form.
function inferIl2CppType(value) {
    if (typeof value === "string")
        return "str";
    if (typeof value === "boolean")
        return "bool";
    if (typeof value === "bigint")
        return "i64";
    if (typeof value === "number")
        return Number.isInteger(value) && value >= -2147483648 && value <= 2147483647 ? "i32" : "f64";
    return "obj";
}
// The IL2CPP C API as exported by Emscripten on Module.asm.
//
// Going through it — rather than reading Il2CppClass/Il2CppFieldInfo by hand —
// is what makes static fields, .ctor and .cctor work without a single hard-coded
// struct offset. Those layouts shift between Unity versions; these entry points
// do not. Everything degrades to a clear message when a build doesn't export them.
class Il2CppApi {
    constructor(runtime) {
        this._runtime = runtime;
        this._fns = new Map();
        this._images = null;
        this._classes = new Map();
        this._fields = new Map();
        this._layouts = new Map();
        this._building = new Set();
        this._reported = new Set();
    }
    // One message per type, however many times a per-frame hook asks.
    reportOnce(key, ...message) {
        if (this._reported.has(key))
            return;
        this._reported.add(key);
        moduleLogger.error(...message);
    }
    fn(name) {
        if (this._fns.has(name))
            return this._fns.get(name);
        const _game = this._runtime.resolveGame();
        const module = _game ? _game.Module : null;
        const asm = wasmExportsOf(_game);
        if (!asm) {
            // The module isn't up yet — plugin onLoaded runs before instantiate.
            // Caching the miss here would permanently disable every il2cpp_*
            // entry point for the rest of the session.
            return null;
        }
        // Three places the same entry point can live: the export table under its
        // bare name, the same table with Emscripten's underscore prefix, or as a
        // `_`-prefixed JS wrapper hung off Module itself.
        let resolved = null;
        for (const source of [asm, module]) {
            if (!source)
                continue;
            const candidate = typeof source[name] === "function" ? source[name] : source["_" + name];
            if (typeof candidate === "function") {
                resolved = candidate;
                break;
            }
        }
        this._fns.set(name, resolved);
        return resolved;
    }
    get available() {
        return this.fn("il2cpp_class_from_name") !== null;
    }
    view() {
        const _game = this._runtime.resolveGame();
        if (!_game)
            return null;
        const heap = requireHeap("Il2CppApi", _game);
        return heap ? new DataView(heap.buffer) : null;
    }
    // Runs `use` with a temporary null-terminated C string in the WASM heap.
    withCString(text, use) {
        const bytes = new TextEncoder().encode(text);
        const at = this._runtime.malloc(bytes.length + 1);
        if (!at)
            return undefined;
        try {
            const _game = this._runtime.resolveGame();
            const heap = requireHeap("Il2CppApi.withCString", _game);
            if (!heap)
                return undefined;
            heap.set(bytes, at);
            heap[at + bytes.length] = 0;
            return use(at);
        }
        finally {
            this._runtime.free(at);
        }
    }
    // Every loaded assembly's image, so a type can be found without the caller
    // naming which assembly it lives in.
    images() {
        if (this._images)
            return this._images;
        const out = [];
        const domainGet = this.fn("il2cpp_domain_get");
        const getAssemblies = this.fn("il2cpp_domain_get_assemblies");
        const assemblyImage = this.fn("il2cpp_assembly_get_image");
        if (domainGet && getAssemblies && assemblyImage) {
            const countAt = this._runtime.malloc(4);
            if (countAt) {
                try {
                    const array = getAssemblies(domainGet(), countAt);
                    // Taken *after* the allocation: growing the WASM memory
                    // detaches any DataView made before it.
                    const view = this.view();
                    if (!view)
                        return (this._images = out);
                    const count = view.getUint32(countAt, true);
                    for (let i = 0; i < count && i < 4096; i++) {
                        const assembly = view.getUint32(array + i * 4, true);
                        const image = assembly ? assemblyImage(assembly) : 0;
                        if (image)
                            out.push(image);
                    }
                }
                finally {
                    this._runtime.free(countAt);
                }
            }
        }
        else {
            // Older exports: open each referenced assembly by name instead.
            const open = this.fn("il2cpp_domain_assembly_open");
            if (domainGet && open && assemblyImage) {
                const domain = domainGet();
                for (const name of this._runtime.allReferencedAssemblies) {
                    const assembly = this.withCString(name.replace(/\.dll$/i, ""), (at) => open(domain, at));
                    const image = assembly ? assemblyImage(assembly) : 0;
                    if (image)
                        out.push(image);
                }
            }
        }
        // Only memoised once something was actually found: called before the
        // domain exists this returns [], and caching that would leave every
        // later classOf() with nothing to search.
        if (out.length)
            this._images = out;
        return out;
    }
    // "Namespace.Name" of an Il2CppClass, via the API rather than by offset.
    classFullName(klass) {
        const getName = this.fn("il2cpp_class_get_name");
        const getNamespace = this.fn("il2cpp_class_get_namespace");
        const view = this.view();
        if (!klass || !getName || !view)
            return null;
        const name = readHeapCString(view, getName(klass));
        if (!name)
            return null;
        const namespaze = getNamespace ? readHeapCString(view, getNamespace(klass)) : "";
        return namespaze ? namespaze + "." + name : name;
    }
    parentOf(klass) {
        const getParent = this.fn("il2cpp_class_get_parent");
        return klass && getParent ? getParent(klass) || 0 : 0;
    }
    // The assembly a class was compiled into, e.g. "ECM2.dll". This is exactly
    // what belongs in referencedAssemblies when a type isn't being indexed.
    imageNameOfClass(klass) {
        const getImage = this.fn("il2cpp_class_get_image");
        const imageName = this.fn("il2cpp_image_get_name");
        const view = this.view();
        if (!klass || !getImage || !imageName || !view)
            return null;
        const image = getImage(klass);
        return image ? readHeapCString(view, imageName(image)) : null;
    }
    // Element class of a managed array, e.g. System.Int32 for an int[].
    elementClassOfArray(pointer) {
        const klass = this.classOfObject(pointer);
        const getElement = this.fn("il2cpp_class_get_element_class");
        return klass && getElement ? getElement(klass) || 0 : 0;
    }
    // Il2CppClass* of a live object. Prefers the runtime's own accessor; falls
    // back to the class pointer in the object header.
    classOfObject(pointer) {
        if (!pointer)
            return 0;
        const getClass = this.fn("il2cpp_object_get_class");
        if (getClass)
            return getClass(pointer) || 0;
        const view = this.view();
        if (!view || pointer + 4 > view.byteLength)
            return 0;
        return view.getUint32(pointer, true);
    }
    // Il2CppClass* for a full type name, or 0.
    classOf(typeName) {
        const cached = this._classes.get(typeName);
        if (cached !== undefined)
            return cached;
        let klass = 0;
        let searched = false;
        const fromName = this.fn("il2cpp_class_from_name");
        if (fromName) {
            const dot = typeName.lastIndexOf(".");
            const namespaze = dot === -1 ? "" : typeName.slice(0, dot);
            const name = dot === -1 ? typeName : typeName.slice(dot + 1);
            for (const image of this.images()) {
                searched = true;
                klass = this.withCString(namespaze, (nsAt) => this.withCString(name, (nameAt) => fromName(image, nsAt, nameAt))) || 0;
                if (klass)
                    break;
            }
        }
        // A lookup that ran before the runtime was up searched nothing; caching
        // that 0 would make the type permanently unresolvable.
        if (klass || searched)
            this._classes.set(typeName, klass);
        return klass;
    }
    // Forces the static constructor to run. IL2CPP does this lazily, so a static
    // field read before any of the type's code has executed would otherwise see
    // a zeroed slot.
    classInit(typeName) {
        const klass = this.classOf(typeName);
        const init = this.fn("il2cpp_runtime_class_init");
        if (!klass || !init)
            return false;
        init(klass);
        return true;
    }
    // il2cpp_class_get_field_from_name walks base classes, which matters for
    // types like Photon's Hashtable that declare nothing themselves.
    fieldFromClass(klass, fieldName) {
        if (!klass)
            return 0;
        const key = klass + "::" + fieldName;
        const cached = this._fields.get(key);
        if (cached !== undefined)
            return cached;
        const fromName = this.fn("il2cpp_class_get_field_from_name");
        const field = fromName ? this.withCString(fieldName, (at) => fromName(klass, at)) || 0 : 0;
        // A miss made before the export was reachable must not be memoised, or
        // the field stays invisible for the rest of the session.
        if (field || fromName)
            this._fields.set(key, field);
        return field;
    }
    fieldOf(typeName, fieldName) {
        return this.fieldFromClass(this.classOf(typeName), fieldName);
    }
    // Byte offset of a field on a live object's own class (bases included).
    offsetOfObjectField(pointer, fieldName) {
        const view = this.view();
        if (!view || !pointer || pointer + 4 > view.byteLength)
            return 0;
        const field = this.fieldFromClass(view.getUint32(pointer, true), fieldName);
        const getOffset = this.fn("il2cpp_field_get_offset");
        return field && getOffset ? getOffset(field) : 0;
    }
    // Element descriptor name for a field, read from its Il2CppType.
    fieldElementType(field) {
        const getType = this.fn("il2cpp_field_get_type");
        const view = this.view();
        if (!getType || !view)
            return "i32";
        const typePtr = getType(field);
        if (!typePtr || typePtr + 8 > view.byteLength)
            return "i32";
        const kind = (view.getUint32(typePtr + 4, true) >>> 16) & 0xff;
        return IL2CPP_KIND_TO_ELEMENT[kind] || "i32";
    }
    // Whether a named method is static. Used to stop the type-level proxy from
    // invoking an *instance* accessor with no `this` — IL2CPP would then read
    // through a null pointer and trap, taking the game down.
    // Returns null when the runtime can't tell us.
    isStaticMethod(typeName, methodName) {
        const klass = this.classOf(typeName);
        const fromName = this.fn("il2cpp_class_get_method_from_name");
        const getFlags = this.fn("il2cpp_method_get_flags");
        if (!klass || !fromName || !getFlags)
            return null;
        const method = this.withCString(methodName, (at) => fromName(klass, at, 0));
        if (!method)
            return null;
        // METHOD_ATTRIBUTE_STATIC
        return (getFlags(method, 0) & 0x0010) !== 0;
    }
    // FIELD_ATTRIBUTE_STATIC. Returns false when the runtime can't tell us,
    // which keeps the previous (instance) behaviour.
    isStaticField(field) {
        const getFlags = this.fn("il2cpp_field_get_flags");
        return field && getFlags ? (getFlags(field) & 0x0010) !== 0 : false;
    }
    // FIELD_ATTRIBUTE_LITERAL — a `const`, which has no storage in the object.
    isLiteralField(field) {
        const getFlags = this.fn("il2cpp_field_get_flags");
        return field && getFlags ? (getFlags(field) & 0x0040) !== 0 : false;
    }
    // Byte offset of an instance field within its object.
    fieldOffset(typeName, fieldName) {
        const field = this.fieldOf(typeName, fieldName);
        const getOffset = this.fn("il2cpp_field_get_offset");
        return field && getOffset ? getOffset(field) : 0;
    }
    // How a field is stored: an element descriptor name, plus the value type's
    // own name when the field is a struct held inline rather than referenced.
    describeFieldType(field) {
        const getType = this.fn("il2cpp_field_get_type");
        const view = this.view();
        const plain = (element) => ({ element, structType: null, klass: 0 });
        if (!getType || !view)
            return plain("i32");
        const typePtr = getType(field);
        if (!typePtr || typePtr + 8 > view.byteLength)
            return plain("i32");
        const kind = (view.getUint32(typePtr + 4, true) >>> 16) & 0xff;
        // VALUETYPE and GENERICINST both *can* be a struct stored inline. An
        // enum is a value type too, but its storage is its underlying integer,
        // so it must keep falling through to the primitive mapping.
        if (kind === 17 || kind === 21) {
            const fromType = this.fn("il2cpp_class_from_type");
            const isValueType = this.fn("il2cpp_class_is_valuetype");
            const isEnum = this.fn("il2cpp_class_is_enum");
            const klass = fromType ? fromType(typePtr) || 0 : 0;
            if (klass && isValueType && isValueType(klass) && !(isEnum && isEnum(klass)))
                return { element: "struct", structType: this.classFullName(klass), klass };
        }
        return plain(IL2CPP_KIND_TO_ELEMENT[kind] || "i32");
    }
    // Unboxed size of a *value type* in bytes, or 0 when the runtime won't say.
    // Meaningless for a reference type — use instanceSizeOf for those.
    valueSizeOf(klass) {
        if (!klass)
            return 0;
        const valueSize = this.fn("il2cpp_class_value_size");
        if (valueSize) {
            const size = valueSize(klass, 0) | 0;
            if (size > 0 && size < IL2CPP_MAX_STRUCT_SIZE)
                return size;
        }
        // Older exports only offer the boxed size; the payload is what follows
        // the header.
        const size = this.instanceSizeOf(klass) - IL2CPP_OBJECT_HEADER;
        return size > 0 && size < IL2CPP_MAX_STRUCT_SIZE ? size : 0;
    }
    // Size of an object of this class, header included.
    instanceSizeOf(klass) {
        const instanceSize = this.fn("il2cpp_class_instance_size");
        if (!klass || !instanceSize)
            return 0;
        const size = instanceSize(klass) | 0;
        return size > 0 && size < IL2CPP_MAX_STRUCT_SIZE ? size : 0;
    }
    // Storage width of one field, including inline structs.
    sizeOfField(field) {
        if (field.element === "struct")
            return this.valueSizeOf(field.klass) || 4;
        const desc = IL2CPP_ELEMENT_TYPES[field.element];
        return desc ? desc.size : 4;
    }
    // Every field a class declares itself, in declaration order — inherited ones
    // belong to the parent and are reached by walking up. Statics are left out
    // unless asked for: their "offset" is into the type's static storage, not
    // into any object. Returns null (not []) when the runtime can't enumerate
    // them, so "no fields" and "can't ask" stay distinguishable.
    fieldsOfClass(klass, includeStatic) {
        const getFields = this.fn("il2cpp_class_get_fields");
        const getName = this.fn("il2cpp_field_get_name");
        const getOffset = this.fn("il2cpp_field_get_offset");
        if (!klass || !getFields || !getName || !getOffset)
            return null;
        // il2cpp_class_get_fields takes a `void**` cursor that it advances.
        const iter = this._runtime.malloc(4);
        if (!iter)
            return null;
        const out = [];
        try {
            let view = this.view();
            if (!view || iter + 4 > view.byteLength)
                return null;
            view.setUint32(iter, 0, true);
            for (let guard = 0; guard < 4096; guard++) {
                const field = getFields(klass, iter);
                if (!field)
                    break;
                // Re-taken each turn: the first call sets the class's fields up,
                // which can allocate, and growing the memory detaches the view.
                view = this.view();
                if (!view)
                    break;
                // A const has no storage at all, so it is never listed.
                if (this.isLiteralField(field))
                    continue;
                const isStatic = this.isStaticField(field);
                if (isStatic && !includeStatic)
                    continue;
                const name = readHeapCString(view, getName(field));
                if (!name)
                    continue;
                out.push(Object.assign({ name, offset: getOffset(field) | 0, isStatic }, this.describeFieldType(field)));
            }
        }
        finally {
            this._runtime.free(iter);
        }
        return out;
    }
    // Cached field layout of a type, keyed by lowercased field name. This is
    // what lets a struct be read by name instead of by a hard-coded offset.
    structLayout(typeName) {
        const cached = this._layouts.get(typeName);
        if (cached)
            return cached;
        // Guards a self-referential lookup without memoising the miss: a layout
        // asked for before Module.asm exists must be retried later, not
        // poisoned for the rest of the session.
        if (this._building.has(typeName))
            return null;
        this._building.add(typeName);
        let layout = null;
        try {
            layout = this.buildStructLayout(typeName);
        }
        finally {
            this._building.delete(typeName);
        }
        if (layout)
            this._layouts.set(typeName, layout);
        return layout;
    }
    // A layout supplied by hand, for a build that doesn't export the field API
    // or a type whose offsets the caller already knows:
    //   defineStruct("UnityEngine.RaycastHit", { size: 0x28, fields: {
    //     point: [0, "vector3"], distance: [24, "f32"], collider: [32, "obj"] } })
    defineStruct(typeName, descriptor) {
        const source = (descriptor && descriptor.fields) || {};
        const order = [];
        const byName = new Map();
        for (const name in source) {
            const raw = source[name];
            const spec = Array.isArray(raw) ? { offset: raw[0], type: raw[1] } : raw;
            const element = spec.type || spec.element || "i32";
            const structType = IL2CPP_ELEMENT_TYPES[element] ? null : element;
            const entry = {
                name,
                offset: spec.offset | 0,
                element: structType ? "struct" : element,
                structType,
                klass: structType ? this.classOf(structType) : 0,
                size: spec.size || (IL2CPP_ELEMENT_TYPES[element] ? IL2CPP_ELEMENT_TYPES[element].size : 0),
            };
            if (!entry.size)
                entry.size = this.sizeOfField(entry);
            order.push(entry);
            byName.set(name.toLowerCase(), entry);
        }
        let size = descriptor && descriptor.size ? descriptor.size | 0 : 0;
        for (const entry of order)
            size = Math.max(size, entry.offset + entry.size);
        const layout = { typeName, klass: this.classOf(typeName), isValueType: true, size, fields: order, byName, declared: true };
        this._layouts.set(typeName, layout);
        return layout;
    }
    // A layout that came from defineStruct, or undefined. Unlike structLayout
    // this never tries to build one, so it is safe to probe for a type the
    // runtime knows nothing about.
    declaredLayout(typeName) {
        const layout = this._layouts.get(typeName);
        return layout && layout.declared ? layout : undefined;
    }
    // A layout assembled from global-metadata.dat: the field offsets the proxy
    // layer already uses, joined with the unboxed size out of
    // MetadataRegistration.typeDefinitionsSizes. This is the route that works on
    // a build exporting none of the IL2CPP C API, and it is tried first because
    // it needs nothing of the runtime to be up yet.
    buildMetadataLayout(typeName) {
        const ctx = this._runtime.il2CppContext;
        const sizes = ctx ? ctx.structSizes : null;
        const size = sizes ? sizes[typeName] : 0;
        const bucket = ctx && ctx.fieldData ? ctx.fieldData[typeName] : null;
        if (!size || !bucket)
            return null;
        const candidates = [];
        for (const key in bucket) {
            const field = bucket[key];
            // A field that is itself a struct is stored inline; an enum is not
            // (its storage is its integer), which is why structSizes decides.
            const element = field.structType && sizes[field.structType] ? "struct"
                : IL2CPP_KIND_TO_ELEMENT[field.kind] || "i32";
            const width = element === "struct"
                ? (field.structSize || sizes[field.structType] || 4)
                : (IL2CPP_ELEMENT_TYPES[element] ? IL2CPP_ELEMENT_TYPES[element].size : 4);
            candidates.push({ field, element, width });
        }
        // The metadata records a value type's offsets as if it were boxed on
        // most builds, but not all — and the table also carries the type's
        // *static* fields, whose offsets are into static storage and would
        // otherwise look like wild instance offsets. Both problems answer to the
        // same test: assume a header, assume none, and keep whichever reading
        // puts more fields inside the type's own size.
        const fits = (header) => candidates.filter((c) => c.field.offset >= header &&
            c.field.offset - header + c.width <= size);
        const boxed = fits(IL2CPP_OBJECT_HEADER);
        const flat = fits(0);
        const header = boxed.length >= flat.length ? IL2CPP_OBJECT_HEADER : 0;
        const kept = header ? boxed : flat;
        if (!kept.length)
            return null;
        kept.sort((a, b) => a.field.offset - b.field.offset);
        const order = [];
        const byName = new Map();
        const alias = (name, entry) => {
            const key = name.toLowerCase();
            if (name && !byName.has(key))
                byName.set(key, entry);
        };
        for (const candidate of kept) {
            const entry = {
                name: candidate.field.name,
                offset: candidate.field.offset - header,
                element: candidate.element,
                structType: candidate.element === "struct" ? candidate.field.structType : null,
                klass: 0,
                size: candidate.width,
            };
            order.push(entry);
            byName.set(entry.name.toLowerCase(), entry);
            // `m_Point` is Unity's spelling of the backing field behind `point`,
            // and `<Point>k__BackingField` is the C# compiler's. Accept the
            // property name for both.
            if (entry.name.length > 2 && entry.name.slice(0, 2) === "m_")
                alias(entry.name.slice(2), entry);
            const backing = /^<(.+)>k__BackingField$/.exec(entry.name);
            if (backing)
                alias(backing[1], entry);
        }
        return { typeName, klass: this.classOf(typeName), isValueType: true, size, fields: order, byName, source: "metadata" };
    }
    buildStructLayout(typeName) {
        const metadataLayout = this.buildMetadataLayout(typeName);
        if (metadataLayout)
            return metadataLayout;
        const klass = this.classOf(typeName);
        if (!klass) {
            this.reportOnce("class:" + typeName, "structLayout('%s'): could not resolve the Il2CppClass — is its assembly listed in referencedAssemblies, and does this build export il2cpp_class_from_name?", typeName);
            return null;
        }
        const fields = this.fieldsOfClass(klass);
        if (!fields) {
            this.reportOnce("fields:" + typeName, "structLayout('%s'): this build does not export il2cpp_class_get_fields — describe the layout by hand with Runtime.defineStruct('%s', { size, fields })", typeName, typeName);
            return null;
        }
        const isValueTypeFn = this.fn("il2cpp_class_is_valuetype");
        const isValueType = isValueTypeFn ? !!isValueTypeFn(klass) : true;
        // A reference type gets a layout too — its field offsets are exactly
        // what you need to read a live object — but it is sized as an object,
        // header included, and can never be allocated as scratch memory.
        const size = isValueType ? this.valueSizeOf(klass) : this.instanceSizeOf(klass);
        let lowest = Infinity;
        let end = 0;
        for (const field of fields) {
            lowest = Math.min(lowest, field.offset);
            end = Math.max(end, field.offset + this.sizeOfField(field));
        }
        // A value type's offsets are recorded as if it were boxed, so they carry
        // the object header. Detected rather than assumed: the header is only
        // subtracted when the fields genuinely overrun the unboxed size.
        const header = isValueType && lowest >= IL2CPP_OBJECT_HEADER && (!size || end > size)
            ? IL2CPP_OBJECT_HEADER : 0;
        const order = [];
        const byName = new Map();
        const alias = (name, entry) => {
            const key = name.toLowerCase();
            if (name && !byName.has(key))
                byName.set(key, entry);
        };
        for (const field of fields) {
            const entry = {
                name: field.name,
                offset: field.offset - header,
                element: field.element,
                structType: field.structType,
                klass: field.klass,
                size: this.sizeOfField(field),
            };
            if (entry.offset < 0) {
                moduleLogger.debug("structLayout('%s'): skipping '%s' — negative offset %d", typeName, field.name, entry.offset);
                continue;
            }
            order.push(entry);
            byName.set(field.name.toLowerCase(), entry);
            // Unity spells the backing field of the property `point` as
            // `m_Point`, and the C# compiler spells an auto-property's as
            // `<Point>k__BackingField`. Accept the property name for both, so a
            // port doesn't have to know which convention a type happens to use.
            if (field.name.length > 2 && field.name.slice(0, 2) === "m_")
                alias(field.name.slice(2), entry);
            const backing = /^<(.+)>k__BackingField$/.exec(field.name);
            if (backing)
                alias(backing[1], entry);
        }
        return { typeName, klass, isValueType, size: size || Math.max(end - header, 0), fields: order, byName };
    }
    // Boxes a value type held in raw memory into a managed object.
    boxStruct(klass, address) {
        const valueBox = this.fn("il2cpp_value_box");
        return klass && address && valueBox ? valueBox(klass, address) || 0 : 0;
    }
    // Keeps an object alive across allocations the GC can't see a root for.
    // Nothing in JS is scanned by the collector, so an object held only by a
    // JS variable is collectable the moment anything else allocates.
    pin(pointer) {
        const newHandle = this.fn("il2cpp_gchandle_new");
        return pointer && newHandle ? newHandle(pointer, 0) || 0 : 0;
    }
    unpin(handle) {
        const free = this.fn("il2cpp_gchandle_free");
        if (handle && free)
            free(handle);
    }
    newString(text) {
        const stringNew = this.fn("il2cpp_string_new");
        if (!stringNew) {
            moduleLogger.error("Il2CppApi.newString: this build does not export il2cpp_string_new");
            return 0;
        }
        return this.withCString(String(text), (at) => stringNew(at)) || 0;
    }
    // Turns a JS value into a managed object pointer. Strings become
    // System.String, primitives get boxed, and anything already managed (a
    // ValueWrapper, an instance proxy, a raw pointer) passes straight through.
    // Pass { type, value } to pick the storage type explicitly — that's how you
    // say 1.23f rather than 1.23.
    box(value, type) {
        let raw = value;
        // Something already managed stays managed. Without this the unwrapped
        // pointer would fall through to inference and get boxed as an Int32.
        let alreadyManaged = false;
        if (raw instanceof ValueWrapper) {
            raw = raw.val(); // also covers instance proxies
            alreadyManaged = true;
        }
        else if (raw !== null && typeof raw === "object" && typeof raw.type === "string" && "value" in raw) {
            return this.box(raw.value, raw.type);
        }
        if (raw === null || raw === undefined)
            return 0;
        const kind = type || (alreadyManaged ? "obj" : inferIl2CppType(raw));
        if (kind === "obj" || kind === "ptr")
            return typeof raw === "number" ? raw : 0;
        if (kind === "str")
            return typeof raw === "string" ? this.newString(raw) : raw >>> 0;
        const className = IL2CPP_BOX_CLASSES[kind];
        const write = IL2CPP_ELEMENT_WRITERS[kind];
        const valueBox = this.fn("il2cpp_value_box");
        const klass = className ? this.classOf(className) : 0;
        if (!className || !write) {
            moduleLogger.error("Il2CppApi.box: cannot box a value of type '%s'", kind);
            return 0;
        }
        if (!valueBox || !klass) {
            // Same fallback as newArray: Activator.CreateInstance gives a boxed
            // default and the payload is written after the object header.
            const managed = this._runtime.managedBox(raw, kind);
            if (managed)
                return managed;
            moduleLogger.error("Il2CppApi.box: need il2cpp_value_box and the %s class to box '%s', and the managed " +
                "fallback could not run either — is mscorlib listed in referencedAssemblies?", className, kind);
            return 0;
        }
        const scratch = this._runtime.malloc(8);
        if (!scratch)
            return 0;
        try {
            const view = this.view();
            if (!view)
                return 0;
            view.setFloat64(scratch, 0, true); // clear both words first
            write(view, scratch, raw);
            return valueBox(klass, scratch) || 0;
        }
        finally {
            this._runtime.free(scratch);
        }
    }
    // Allocates a managed array and fills it.
    //   newArray("System.Object", ["asd", 123, { type: "f32", value: 1.23 }])
    //   newArray("System.Int32", [1, 2, 3])       // stored raw, not boxed
    newArray(elementTypeName, values) {
        const arrayNew = this.fn("il2cpp_array_new");
        const elementClass = arrayNew ? this.classOf(elementTypeName) : 0;
        if (!arrayNew || !elementClass) {
            // Which half failed matters — "not exported" and "exported but the
            // class lookup failed" need different fixes — but only once the
            // fallback has failed too. A working fallback stays silent.
            const reason = arrayNew
                ? "il2cpp_array_new is exported but the class could not be resolved (il2cpp_class_from_name)"
                : "il2cpp_array_new is not exported";
            // No C API — which is most Unity WebGL builds. An ArrayList filled
            // through ordinary managed calls produces the same array.
            const managed = this._runtime.managedArray(elementTypeName, values);
            if (managed)
                return managed;
            // Once only: this sits behind whatever the caller is doing, which is
            // very often a per-frame hook, and the old message repeated hundreds
            // of times a second until the console was unusable.
            this._runtime.reportOnce("newArray:" + elementTypeName, "Il2CppApi.newArray('%s'): %s, and the managed fallback could not run " +
                "either — it needs System.Type, System.Activator and System.Collections.ArrayList reachable and reflection " +
                "by name working. Neither route exists on this build, so managed arrays cannot be created at all; " +
                "call the method that takes the values directly instead. See Runtime.diagnose().", elementTypeName, reason);
            return 0;
        }
        const list = values || [];
        const array = arrayNew(elementClass, list.length) || 0;
        if (!array)
            return 0;
        const primitive = IL2CPP_PRIMITIVE_ELEMENTS[elementTypeName];
        const descriptor = primitive ? IL2CPP_ELEMENT_TYPES[primitive] : null;
        const stride = descriptor ? descriptor.size : 4;
        const write = primitive ? IL2CPP_ELEMENT_WRITERS[primitive] : null;
        // Boxing allocates, and a GC triggered mid-fill would collect this array
        // — JS references are invisible to the collector. Hold it down until the
        // last element is in.
        const handle = this.pin(array);
        try {
            const view = this.view();
            if (!view || array + 16 + list.length * stride > view.byteLength)
                return array;
            for (let i = 0; i < list.length; i++) {
                const at = array + 16 + i * stride;
                if (write) {
                    let raw = list[i];
                    if (raw instanceof ValueWrapper)
                        raw = raw.val();
                    else if (raw !== null && typeof raw === "object" && "value" in raw)
                        raw = raw.value;
                    write(view, at, raw);
                }
                else {
                    // A reference element: box, then store the pointer. Re-read the
                    // view each time, since allocating can grow (and detach) memory.
                    const boxed = this.box(list[i]);
                    const current = this.view();
                    if (current)
                        current.setUint32(at, boxed >>> 0, true);
                }
            }
        }
        finally {
            this.unpin(handle);
        }
        return array;
    }
    staticGet(typeName, fieldName, elementType) {
        const field = this.fieldOf(typeName, fieldName);
        const get = this.fn("il2cpp_field_static_get_value");
        if (!field || !get)
            return MISSING_PROPERTY;
        this.classInit(typeName);
        const type = elementType || this.fieldElementType(field);
        const desc = il2CppElementType(type, "Il2CppApi.staticGet");
        if (!desc)
            return undefined;
        const scratch = this._runtime.malloc(8);
        if (!scratch)
            return undefined;
        try {
            get(field, scratch);
            const view = this.view();
            if (!view)
                return undefined;
            const raw = desc.read(view, scratch);
            // Hand back the same shapes property access produces.
            return raw instanceof ValueWrapper ? wrapIl2CppValue(this._runtime, raw.val()) : raw;
        }
        finally {
            this._runtime.free(scratch);
        }
    }
    staticSet(typeName, fieldName, value, elementType) {
        const field = this.fieldOf(typeName, fieldName);
        const set = this.fn("il2cpp_field_static_set_value");
        if (!field || !set)
            return false;
        this.classInit(typeName);
        const type = elementType || this.fieldElementType(field);
        const write = IL2CPP_ELEMENT_WRITERS[type === "str" ? "obj" : type];
        if (!write) {
            moduleLogger.error("Il2CppApi.staticSet: cannot write a field of type '%s'", type);
            return false;
        }
        let raw = value instanceof ValueWrapper ? value.val() : value;
        if (raw && typeof raw === "object" && typeof raw.$ptr === "number")
            raw = raw.$ptr;
        if (type === "str" && typeof raw === "string")
            raw = this._runtime.createMstr(raw);
        const scratch = this._runtime.malloc(8);
        if (!scratch)
            return false;
        try {
            const view = this.view();
            if (!view)
                return false;
            view.setFloat64(scratch, 0, true); // clear both words first
            write(view, scratch, raw);
            set(field, scratch);
            return true;
        }
        finally {
            this._runtime.free(scratch);
        }
    }
}
// Turns a raw return value into the most useful JS thing it can be:
//   * 0 / null              -> null
//   * a managed string      -> a JS string
//   * an object we can name -> an instance proxy (properties, methods)
//   * anything else         -> the raw number, untouched
// Scalars (a float from get_fieldOfView, a bool from get_enabled) fall through
// the last branch, which is what makes `cam.fieldOfView` read back as 90.
function wrapIl2CppValue(runtime, raw, typeHint) {
    if (raw === null || raw === undefined)
        return null;
    // Anything below the heap base cannot be an object, so a small int or a
    // whole-numbered float (a fieldOfView of exactly 90) is never mistaken for
    // a pointer. Above that, classNameOf still has to match a known type name
    // before the value is treated as an object.
    if (typeof raw !== "number" || !Number.isInteger(raw) || raw < IL2CPP_MIN_OBJECT_ADDRESS)
        return raw;
    // Strings are decoded from the object's actual class, not from scriptData:
    // a string is a string whether or not mscorlib happened to be listed in
    // referencedAssemblies, and returning a bare pointer for a name or a message
    // is never what the caller wanted.
    const rawName = typeHint ? null : runtime.rawClassNameOf(raw);
    if (rawName === "System.String")
        return ValueWrapper.readManagedString(raw);
    // An array is never a scriptData key: it declares no methods of its own, and
    // `Player[]` would not appear however many assemblies were referenced. It is
    // read with .array()/.list(), which live on ValueWrapper — so hand one back
    // rather than warn about a type nobody can add.
    if (rawName && rawName.charCodeAt(rawName.length - 1) === 93 /* ] */)
        return new ValueWrapper(raw);
    const typeName = typeHint || runtime.classNameOf(raw);
    if (!typeName) {
        // Looks like an object but we couldn't name its class, so it can't be
        // given properties/methods. Say so — returning it silently is what makes
        // `get_main().set_fieldOfView` fail with a baffling "not a function".
        runtime.reportUntypedObject(raw);
        // A ValueWrapper, exactly as that message says: .val(), .as(), .array(),
        // .list() and .readField() all still work. Returning the bare number
        // left the caller with nothing to do but re-wrap it by hand.
        return new ValueWrapper(raw);
    }
    if (typeName === "System.String")
        return ValueWrapper.readManagedString(raw);
    return createInstanceProxy(runtime, new ValueWrapper(raw), typeName);
}
function instancePropertyGet(runtime, wrapper, typeName, name, soft) {
    const getter = runtime.accessorOf(typeName, name, "get");
    if (getter === null) {
        if (soft)
            return MISSING_PROPERTY;
        moduleLogger.error("%s has no property '%s' (looked for get_%s on %s). Public fields have no accessor — use readField(offset, type).", typeName, name, name, runtime.typeChain(typeName).join(" -> ") || typeName);
        return undefined;
    }
    const result = runtime.invoke(getter.typeName, getter.key, [wrapper.val()]);
    if (result === undefined || isStructHandle(result))
        return result;
    
    return wrapIl2CppValue(runtime, result.val());
}
// A property setter takes exactly what its getter returns, so `t.position =
// { x: 1, y: 2, z: 3 }` (or `[1, 2, 3]`) resolves without a parameter table.
function coerceStructArgument(runtime, typeName, propertyName, value) {
    if (!value || typeof value !== "object" || isStructHandle(value) || value instanceof ValueWrapper)
        return value;
    const getter = runtime.resolveMember(typeName, "get_" + propertyName);
    const declared = getter && runtime.declaredStructReturn(getter.typeName, getter.key);
    return declared ? createStructValue(runtime, declared.type, value) : value;
}
function instancePropertySet(runtime, wrapper, typeName, name, value) {
    // A JS string becomes a managed string inside invoke; a plain object becomes
    // the value type the matching getter returns.
    if (typeof value !== "string")
        value = coerceStructArgument(runtime, typeName, name, value);
    const setter = runtime.accessorOf(typeName, name, "set");
    if (setter === null) {
        moduleLogger.error("%s has no settable property '%s' (looked for set_%s on %s). Public fields have no accessor — use writeField(offset, type, value).", typeName, name, name, runtime.typeChain(typeName).join(" -> ") || typeName);
        return false;
    }
    runtime.invoke(setter.typeName, setter.key, [wrapper.val(), value]);
    return true;
}
// A call that can also be chained without parentheses:
//
//   cam.get_gameObject()                  -> invoke
//   cam.get_gameObject.get_transform      -> invoke, then keep going on the result
//
// Only applied to `get_*` members, so touching an ordinary method name can never
// call into the game by accident. `$call` is the explicit, non-chaining form.
function createChainableCall(runtime, call, meta) {
    const target = (...args) => call(args);
    return new Proxy(target, {
        apply: (_t, _self, args) => call(args),
        get(_t, prop) {
            if (typeof prop !== "string" || PROXY_PASSTHROUGH.has(prop))
                return undefined;
            if (prop === "$call")
                return target;
            // Metadata about the accessor itself (.index, .overloads(), …) must
            // never trigger the call.
            if (meta && Object.prototype.hasOwnProperty.call(meta, prop))
                return meta[prop];
            const result = call([]);
            if (result === null || result === undefined)
                return undefined;
            return result[prop];
        },
    });
}
// Plain (non-property) instance fields. The offset comes from
// il2cpp_field_get_offset, so nothing here depends on a guessed layout.
// A field offset declared by hand with Runtime.defineStruct, searched up the
// base chain. This is the only route to fields on a build that doesn't export
// il2cpp_field_get_offset — the offsets in an Il2CppDumper/dnSpy dump are
// exactly what goes in, and they already include the object header.
function declaredFieldEntry(runtime, typeName, name) {
    const chain = runtime.typeChain(typeName);
    const owners = chain.indexOf(typeName) === -1 ? [typeName].concat(chain) : chain;
    for (const owner of owners) {
        const layout = runtime.il2cpp.declaredLayout(owner);
        const entry = layout && layout.byName.get(String(name).toLowerCase());
        if (entry)
            return entry;
    }
    return null;
}
function readDeclaredField(runtime, wrapper, entry) {
    // An inline value type is a live window into the object it sits in, which is
    // what makes `obj.someVector.x = 1` write through to the object.
    if (entry.element === "struct" && entry.structType)
        return createStructProxy(runtime, wrapper.val() + entry.offset, entry.structType, false);
    const desc = IL2CPP_ELEMENT_TYPES[entry.element];
    const view = runtime.il2cpp.view();
    const at = wrapper.val() + entry.offset;
    if (!desc || !view || at < 0 || at + desc.size > view.byteLength)
        return MISSING_PROPERTY;
    const raw = desc.read(view, at);
    return raw instanceof ValueWrapper ? wrapIl2CppValue(runtime, raw.val()) : raw;
}
function writeDeclaredField(runtime, wrapper, entry, value) {
    if (entry.element === "struct" && entry.structType) {
        const field = createStructProxy(runtime, wrapper.val() + entry.offset, entry.structType, false);
        return !!field.$copyFrom(value);
    }
    const write = IL2CPP_ELEMENT_WRITERS[entry.element === "str" ? "obj" : entry.element];
    if (!write)
        return false;
    let raw = value instanceof ValueWrapper ? value.val() : value;
    if (raw && typeof raw === "object" && typeof raw.$ptr === "number")
        raw = raw.$ptr;
    if (typeof raw === "string")
        raw = runtime.managedString(raw);
    // Taken last: allocating the string above can grow the WASM memory.
    const view = runtime.il2cpp.view();
    const desc = IL2CPP_ELEMENT_TYPES[entry.element];
    const at = wrapper.val() + entry.offset;
    if (!view || !desc || at < 0 || at + desc.size > view.byteLength)
        return false;
    write(view, at, raw);
    return true;
}
function instanceFieldGet(runtime, wrapper, typeName, name) {
    const api = runtime.il2cpp;
    const field = api.fieldOf(typeName, name);
    if (!field) {
        // No runtime answer: an explicit defineStruct wins, then the offsets
        // read out of the metadata at load time.
        const fallback = declaredFieldEntry(runtime, typeName, name) || runtime.metadataField(typeName, name);
        if (fallback)
            return readDeclaredField(runtime, wrapper, fallback);
        runtime.reportFieldMiss(typeName, name);
        return MISSING_PROPERTY;
    }
    // A static field's "offset" is into the type's static storage, not into any
    // object — reading it at object+offset returns unrelated instance bytes.
    if (api.isStaticField(field)) {
        const value = api.staticGet(typeName, name);
        return value === MISSING_PROPERTY ? MISSING_PROPERTY : value;
    }
    const offset = api.fieldOffset(typeName, name);
    if (!offset)
        return MISSING_PROPERTY;
    // describeFieldType, not fieldElementType: only the former distinguishes an
    // inline value type from the integer its first word would otherwise read as.
    const described = api.describeFieldType(field);
    if (described.element === "struct" && described.structType)
        return createStructProxy(runtime, wrapper.val() + offset, described.structType, false);
    const desc = il2CppElementType(described.element, "instanceFieldGet");
    const view = api.view();
    if (!desc || !view)
        return MISSING_PROPERTY;
    const at = wrapper.val() + offset;
    if (at + desc.size > view.byteLength)
        return MISSING_PROPERTY;
    const raw = desc.read(view, at);
    return raw instanceof ValueWrapper ? wrapIl2CppValue(runtime, raw.val()) : raw;
}
function instanceFieldSet(runtime, wrapper, typeName, name, value) {
    const api = runtime.il2cpp;
    const field = api.fieldOf(typeName, name);
    if (field && api.isStaticField(field))
        return api.staticSet(typeName, name, value);
    const offset = field ? api.fieldOffset(typeName, name) : 0;
    if (!offset) {
        // Same fallback as the read path: a hand-declared offset is all there is
        // when the runtime can't resolve the field itself.
        const fallback = declaredFieldEntry(runtime, typeName, name) || runtime.metadataField(typeName, name);
        if (!fallback)
            return false;
        return writeDeclaredField(runtime, wrapper, fallback, value);
    }
    const described = api.describeFieldType(field);
    if (described.element === "struct" && described.structType)
        return !!createStructProxy(runtime, wrapper.val() + offset, described.structType, false).$copyFrom(value);
    const type = described.element;
    const write = IL2CPP_ELEMENT_WRITERS[type === "str" ? "obj" : type];
    if (!write)
        return false;
    let raw = value instanceof ValueWrapper ? value.val() : value;
    if (raw && typeof raw === "object" && typeof raw.$ptr === "number")
        raw = raw.$ptr;
    if (typeof raw === "string")
        raw = runtime.managedString(raw);
    // The view is taken last: allocating a managed string above can grow the
    // WASM memory, which detaches any DataView made before it.
    const view = api.view();
    if (!view)
        return false;
    const at = wrapper.val() + offset;
    if (at < 0 || at + 8 > view.byteLength)
        return false;
    write(view, at, raw);
    return true;
}
// Method calls made through the proxies keep returning a ValueWrapper (so
// .val()/.str()/.list() still work everywhere), except when the result is an
// object we can name — then it becomes an instance proxy so the call chains:
//   scriptData["UnityEngine.Camera"].get_main().set_fieldOfView(90)
function reWrapCallResult(runtime, result) {
    // A value type is already the useful thing; its first word is data, not a
    // pointer, and wrapping it would read that word as an object.
    if (isStructHandle(result))
        return result;
    const wrapped = wrapIl2CppValue(runtime, result.val());
    return wrapped !== null && typeof wrapped === "object" ? wrapped : result;
}
// Wraps a live object so its C# properties and instance methods read and write
// like ordinary JS ones:
//
//   const cam = scriptData.UnityEngine.Camera.main;
//   cam.fieldOfView = 90;
//   cam.Render();
//
// `typeName` is either resolved from the object's Il2CppClass or supplied
// explicitly via `Type.wrap(ptr)` / `.as("Namespace.Type")`.
function createInstanceProxy(runtime, wrapper, typeName) {
    return new Proxy(wrapper, {
        get(target, prop) {
            if (typeof prop !== "string")
                return undefined;
            switch (prop) {
                case "$type": return typeName;
                case "$ptr": return target.val();
                case "$wrapper": return target;
                // Read/write a member by name, whatever kind it is. This is the
                // route for an identifier you can't type — take it verbatim out
                // of $fields rather than retyping a homoglyph.
                case "$get": return (name) => {
                    const property = instancePropertyGet(runtime, target, typeName, name, true);
                    if (property !== MISSING_PROPERTY)
                        return property;
                    const field = instanceFieldGet(runtime, target, typeName, name);
                    return field === MISSING_PROPERTY ? undefined : field;
                };
                case "$set": return (name, value) => {
                    if (runtime.matchMethodName(typeName, "set_" + name) !== undefined)
                        return instancePropertySet(runtime, target, typeName, name, value);
                    return instanceFieldSet(runtime, target, typeName, name, value)
                        || instancePropertySet(runtime, target, typeName, name, value);
                };
                case "$call": return (name, ...args) => runtime.invoke(typeName, name, [target.val()].concat(args));
                case "$properties": return runtime.listProperties(typeName);
                case "$fields": return runtime.fieldsOf(typeName, { statics: true });
                case "$members": return runtime.members(typeName);
                // Live values. Fields only unless { properties: true } — every
                // property read is a call into the game.
                case "$dump": return (options) => runtime.dumpObject(target, options);
                // `.as("Ns.Type")` retypes the handle; `.as()` with no argument
                // resolves the object's *concrete* class instead. Naming a base
                // is an upcast — it hides everything the real class adds.
                case "as": return (other) => other ? createInstanceProxy(runtime, target, other) : runtime.wrap(target);
                case "$concrete": return runtime.wrap(target);
                // The object's real class, whatever this handle was told to be.
                // (Type-level `$class` is the Il2CppClass pointer; this is a name.)
                case "$realType": return runtime.rawClassNameOf(target.val());
            }
            // ValueWrapper's own API wins: .val(), .readField(), .list(), …
            const own = target[prop];
            if (own !== undefined)
                return typeof own === "function" ? own.bind(target) : own;
            if (PROXY_PASSTHROUGH.has(prop))
                return undefined;
            const value = instancePropertyGet(runtime, target, typeName, prop, true);
            if (value !== MISSING_PROPERTY)
                return value;
            // Then an instance method — including inherited ones — with `this`
            // implied. Results are re-wrapped so calls chain.
            const member = runtime.resolveMember(typeName, prop);
            if (member !== null) {
                const call = (args) => {
                    const result = runtime.invoke(member.typeName, member.key, [target.val()].concat(args));
                    return result === undefined ? undefined : reWrapCallResult(runtime, result);
                };
                // `get_x` is a property accessor, so allow the parenthesis-free form.
                return prop.startsWith("get_") ? createChainableCall(runtime, call) : (...args) => call(args);
            }
            if (runtime.resolveMethodEntry(typeName, prop))
                return (...args) => runtime.invoke(typeName, prop, [target.val()].concat(args));
            // Finally a plain instance field, whose offset comes from the runtime.
            const field = instanceFieldGet(runtime, target, typeName, prop);
            return field === MISSING_PROPERTY ? undefined : field;
        },
        set(target, prop, value) {
            if (typeof prop !== "string")
                return false;
            // Never shadow ValueWrapper's own state through the property path.
            if (prop === "_result") {
                target._result = value;
                return true;
            }
            // The old test, unchanged, plus the one case it could not see: a
            // property whose setter is not named `set_<prop>`.
            if (runtime.matchMethodName(typeName, "set_" + prop) !== undefined ||
                runtime.propertyEntry(typeName, prop) !== null) {
                instancePropertySet(runtime, target, typeName, prop, value);
                return true;
            }
            if (!instanceFieldSet(runtime, target, typeName, prop, value))
                instancePropertySet(runtime, target, typeName, prop, value); // reports the miss
            return true;
        },
        has: (target, prop) => typeof prop === "string" &&
            (target[prop] !== undefined || runtime.accessorOf(typeName, prop, "get") !== null),
    });
}
// Scratch space for value types crossing the WASM boundary — the hidden
// out-pointer a struct return is written through, and the buffers struct
// arguments are passed by.
//
// Strictly stack-disciplined: a caller takes a mark, allocates, and releases
// back to that mark when the call returns. That is enough because every user of
// this is one `invoke`, and a nested invoke (from a hook firing mid-call) takes
// its own mark above the outer one. No per-call malloc, and nothing to leak.
class StructArena {
    constructor(runtime) {
        this._runtime = runtime;
        this._base = 0;
        this._size = 0;
        this._used = 0;
        this._overflow = [];
    }
    mark() {
        return { used: this._used, overflow: this._overflow.length };
    }
    release(mark) {
        this._used = mark.used;
        while (this._overflow.length > mark.overflow)
            this._runtime.free(this._overflow.pop());
    }
    // Zeroed, 8-byte aligned. Returns 0 if the heap can't be reached at all.
    alloc(size) {
        const want = (size + 7) & ~7;
        if (want <= 0)
            return 0;
        if (!this._base || this._used + want > this._size) {
            if (!this._grow(this._used + want)) {
                // Past the arena's ceiling: fall back to a plain allocation,
                // tracked so release() still reclaims it.
                const block = this._runtime.malloc(want);
                if (!block)
                    return 0;
                this._overflow.push(block);
                this._zero(block, want);
                return block;
            }
        }
        const at = this._base + this._used;
        this._used += want;
        this._zero(at, want);
        return at;
    }
    _grow(needed) {
        // Only ever grows while empty — moving live slots would invalidate
        // pointers the caller is mid-call with.
        if (this._used !== 0 || needed > STRUCT_ARENA_MAX)
            return false;
        const size = Math.max(STRUCT_ARENA_INITIAL, needed * 2);
        const block = this._runtime.malloc(size);
        if (!block)
            return false;
        if (this._base)
            this._runtime.free(this._base);
        this._base = block;
        this._size = size;
        return true;
    }
    _zero(at, size) {
        const _game = this._runtime.resolveGame();
        const heap = _game ? requireHeap("StructArena", _game) : null;
        if (heap && at + size <= heap.length)
            heap.fill(0, at, at + size);
    }
}
const STRUCT_ARENA_INITIAL = 4096;
const STRUCT_ARENA_MAX = 1 << 20;
// True for anything produced by createStructProxy / createStructValue, whichever
// side of the WASM boundary its bytes are on. Call results have to be tested for
// this before they are put through wrapIl2CppValue, which would read a struct's
// first word as an object pointer.
function isStructHandle(value) {
    return !!value && typeof value === "object" && value.$isStruct === true;
}
// Copies `size` bytes inside the WASM heap. Both addresses are in the same
// buffer, so this is a move within one Uint8Array.
function copyStructBytes(runtime, dest, src, size) {
    const _game = runtime.resolveGame();
    const heap = _game ? requireHeap("copyStructBytes", _game) : null;
    if (!heap || size <= 0)
        return false;
    if (dest < 0 || src < 0 || dest + size > heap.length || src + size > heap.length) {
        moduleLogger.error("copyStructBytes: %d bytes from %d to %d is outside the heap", size, src, dest);
        return false;
    }
    heap.copyWithin(dest, src, src + size);
    return true;
}
// Where a struct's bytes live.
//
// A *heap* store is a live window onto WASM memory: writing through it writes
// the object, which is what a struct field on a live object must do, and what an
// `out` parameter needs.
//
// A *value* store owns a detached JS copy. That is what a by-value return
// actually is — `transform.position` hands back a copy, and mutating it must not
// touch the transform — and it means there is nothing to free: the copy is only
// materialised into the arena for the length of a call that takes it.
function heapStructStore(runtime, wrapper) {
    return {
        detached: false,
        view: () => runtime.il2cpp.view(),
        base: () => wrapper.val(),
        nested: (offset) => heapStructStore(runtime, new ValueWrapper(wrapper.val() + offset)),
    };
}
function valueStructStore(runtime, bytes, byteOffset = 0) {
    const view = new DataView(
        bytes.buffer,
        bytes.byteOffset,
        bytes.byteLength
    );

    const at = byteOffset | 0;

    return {
        detached: true,
        bytes,
        view: () => view,
        base: () => at,
        nested: (offset) => valueStructStore(runtime, bytes, at + offset)
    };
}
// The bytes behind any struct-shaped thing, as a JS copy.
function structBytesOf(runtime, handle, size) {
    if (isStructHandle(handle))
        return handle.$bytes();
    const pointer = handle instanceof ValueWrapper ? handle.val()
        : handle && typeof handle === "object" && typeof handle.$ptr === "number" ? handle.$ptr
            : typeof handle === "number" ? handle : 0;
    return pointer ? runtime.memory(pointer, size) : null;
}
// A value type — either living in raw memory (the port of `new SomeStruct(ptr)`
// from the pointer-based loaders) or held as a detached copy. Every offset comes
// from the runtime's own field layout, so nothing here is a hard-coded number:
//
//   const hit = scriptData.UnityEngine.RaycastHit.$alloc();
//   scriptData.UnityEngine.Physics.Raycast.overload(n)(origin, direction, hit, …);
//   hit.point.x; hit.distance; hit.collider.name;
//   hit.$free();
//
//   player.transform.position.x            // a detached copy, nothing to free
//
// The proxy wraps a ValueWrapper, so a struct in the heap passes straight into a
// call as its address and still answers .val() / .readField() like every other
// handle. A detached one is materialised by `invoke` for the length of the call.
function createStructProxy(runtime, pointer, typeName, owned) {
    const api = runtime.il2cpp;
    const store = pointer && typeof pointer === "object" && typeof pointer.base === "function"
        ? pointer
        : null;
    const target = store
        ? new ValueWrapper(store.detached ? 0 : store.base())
        : pointer instanceof ValueWrapper ? pointer
            : new ValueWrapper(pointer instanceof Object && typeof pointer.$ptr === "number" ? pointer.$ptr : pointer);
    const bytes = store || heapStructStore(runtime, target);
    const layout = api.structLayout(typeName);
    let owns = !!owned;
    const fieldAt = (name) => layout ? layout.byName.get(name.toLowerCase()) : undefined;
    const readField = (entry) => {
        if (entry.element === "struct") {
            if (!entry.structType) {
                moduleLogger.error("%s.%s: an inline struct whose type could not be named — read it with .$bytes()", typeName, entry.name);
                return undefined;
            }
            return createStructProxy(runtime, bytes.nested(entry.offset), entry.structType, false);
        }
        const at = bytes.base() + entry.offset;
        const desc = IL2CPP_ELEMENT_TYPES[entry.element];
        const view = bytes.view();
        if (!desc || !view || at < 0 || at + desc.size > view.byteLength)
            return undefined;
        const raw = desc.read(view, at);
        return raw instanceof ValueWrapper ? wrapIl2CppValue(runtime, raw.val()) : raw;
    };
    const writeField = (entry, value) => {
        if (entry.element === "struct") {
            // Another struct (or any pointer-bearing handle) is a byte copy;
            // a plain JS object assigns field by field.
            const source = structBytesOf(runtime, value, entry.size);
            if (source && source.length) {
                const view = bytes.view();
                const at = bytes.base() + entry.offset;
                if (!view || at < 0 || at + entry.size > view.byteLength)
                    return false;
                for (let i = 0; i < entry.size && i < source.length; i++)
                    view.setUint8(at + i, source[i]);
                return true;
            }
            if (value && typeof value === "object" && entry.structType)
                return applyStructInit(runtime, createStructProxy(runtime, bytes.nested(entry.offset), entry.structType, false), value);
            moduleLogger.error("%s.%s is a %s — assign another struct, or { field: value }", typeName, entry.name, entry.structType || "struct");
            return false;
        }
        const write = IL2CPP_ELEMENT_WRITERS[entry.element === "str" ? "obj" : entry.element];
        if (!write) {
            moduleLogger.error("%s.%s: no writer for element type '%s'", typeName, entry.name, entry.element);
            return false;
        }
        let raw = value instanceof ValueWrapper ? value.val() : value;
        if (raw && typeof raw === "object" && typeof raw.$ptr === "number")
            raw = raw.$ptr;
        // A JS string becomes a managed System.String. Note that the collector
        // cannot see a reference stored in a malloc'd buffer — pin it if the
        // struct outlives the call it is being passed to.
        if (typeof raw === "string")
            raw = runtime.managedString(raw);
        // Taken last: allocating the string above can grow the WASM memory,
        // which detaches any DataView made before it.
        const view = bytes.view();
        const at = bytes.base() + entry.offset;
        const desc = IL2CPP_ELEMENT_TYPES[entry.element];
        if (!view || at < 0 || at + (desc ? desc.size : 4) > view.byteLength)
            return false;
        write(view, at, raw);
        return true;
    };
    const members = {
        // A detached copy has no address until a call needs one, and `invoke`
        // is what gives it one — reporting 0 keeps anything else from passing
        // a stale or bogus pointer into the game.
        $isStruct: () => true,
        $detached: () => bytes.detached,
        $store: () => bytes,
        $type: () => typeName,
        $size: () => (layout ? layout.size : 0),
        $layout: () => layout,
        $fields: () => (layout ? layout.fields.map((f) => f.name) : []),
        $wrapper: () => target,
        $class: () => (layout ? layout.klass : api.classOf(typeName)),
        $owned: () => owns,
    };
    // Declared up front so the fluent members ($clear, $copyFrom) can hand the
    // proxy back rather than the bare ValueWrapper they are defined against.
    let proxySelf;
    proxySelf = new Proxy(target, {
        get(_t, prop) {
            if (typeof prop !== "string")
                return prop === Symbol.toPrimitive ? () => target.val() : target[prop];
            if (Object.prototype.hasOwnProperty.call(members, prop))
                return members[prop]();
            switch (prop) {
                case "$ptr": return bytes.detached ? 0 : target.val()
                case "$get": return (name) => { const e = fieldAt(name); return e ? readField(e) : undefined; };
                case "$set": return (name, value) => { const e = fieldAt(name); return e ? writeField(e, value) : false; };
                case "$offsetOf": return (name) => { const e = fieldAt(name); return e ? e.offset : -1; };
                // The raw bytes, as a copy — for a layout the runtime couldn't
                // describe, and the route every struct-to-struct copy goes via.
                case "$bytes": return () => {
                    const size = layout ? layout.size : 0;
                    if (!bytes.detached)
                        return runtime.memory(target.val(), size);
                    const from = bytes.base();
                    return bytes.bytes.slice(from, from + (size || bytes.bytes.length - from));
                };
                case "$clear": return () => {
                    const size = layout ? layout.size : 0;
                    if (bytes.detached) {
                        bytes.bytes.fill(0, bytes.base(), bytes.base() + size);
                        return proxySelf;
                    }
                    const _game = runtime.resolveGame();
                    const heap = _game ? requireHeap("struct.$clear", _game) : null;
                    if (heap && size && target.val() + size <= heap.length)
                        heap.fill(0, target.val(), target.val() + size);
                    return proxySelf;
                };
                // A detached copy of this value, safe to keep across calls.
                case "$copy": return () => createStructValue(runtime, typeName, proxySelf.$bytes());
                // Boxes the value into a managed object, e.g. to hand a struct
                // to a method that takes `object`.
                case "$box": return () => {
                    const klass = layout ? layout.klass : api.classOf(typeName);
                    if (!bytes.detached) {
                        const boxed = api.boxStruct(klass, target.val());
                        return boxed ? createInstanceProxy(runtime, new ValueWrapper(boxed), typeName) : null;
                    }
                    // Detached: give it an address for exactly as long as
                    // il2cpp_value_box needs to read it.
                    const arena = runtime.structArena();
                    const mark = arena.mark();
                    try {
                        const at = materialiseStruct(runtime, arena, proxySelf);
                        const boxed = at ? api.boxStruct(klass, at) : 0;
                        return boxed ? createInstanceProxy(runtime, new ValueWrapper(boxed), typeName) : null;
                    }
                    finally {
                        arena.release(mark);
                    }
                };
                case "$copyFrom": return (source) => {
                    const size = layout ? layout.size : 0;
                    const from = structBytesOf(runtime, source, size);
                    if (from && from.length) {
                        const view = bytes.view();
                        const at = bytes.base();
                        if (view && at >= 0 && at + size <= view.byteLength)
                            for (let i = 0; i < size && i < from.length; i++)
                                view.setUint8(at + i, from[i]);
                    }
                    else if (source && typeof source === "object") {
                        applyStructInit(runtime, proxySelf, source);
                    }
                    return proxySelf;
                };
                case "$toObject": return () => {
                    const out = {};
                    if (layout) {
                        for (const entry of layout.fields) {
                            const value = readField(entry);
                            out[entry.name] = value && typeof value === "object" && typeof value.$toObject === "function"
                                ? value.$toObject() : value;
                        }
                    }
                    return out;
                };
                case "toJSON": return () => proxySelf.$toObject();
                // Only a struct this proxy allocated may be freed through it —
                // a nested field points into its parent's buffer, and freeing
                // that would corrupt the allocator.
                case "$free": return () => {
                    // A detached copy is plain JS memory — freeing is the
                    // garbage collector's job and asking is not a mistake.
                    if (bytes.detached)
                        return true;
                    if (!owns) {
                        moduleLogger.warn("%s.$free(): this handle does not own its memory (it is a view into another buffer or a caller-supplied pointer) — ignored", typeName);
                        return false;
                    }
                    owns = false;
                    runtime.free(target.val());
                    target.set(0);
                    return true;
                };
                case "as": return (other) => {
                    if (bytes.detached) {
                        moduleLogger.error("%s.as('%s'): this is a detached copy of a value type, not an object in the heap — there is nothing to reinterpret", typeName, other);
                        return undefined;
                    }
                    return other ? createInstanceProxy(runtime, target, other) : runtime.wrap(target);
                };
                case "$struct": return (other) => createStructProxy(runtime, bytes.detached ? bytes : target, other, false);
            }
            // A field wins over ValueWrapper's own API here (the opposite of the
            // instance proxy): a struct is data, and `hit.point` must not be
            // shadowed by a helper. `$get`/`$set` reach a colliding name.
            const entry = fieldAt(prop);
            if (entry)
                return readField(entry);
            if (PROXY_PASSTHROUGH.has(prop))
                return undefined;
            const own = target[prop];
            if (own !== undefined)
                return typeof own === "function" ? own.bind(target) : own;
            // Then a method declared on the value type itself, with `this` being
            // the address of the buffer — how IL2CPP compiles a struct method.
            // The handle goes through rather than a bare address so a detached
            // copy is materialised (and written back, since a struct method may
            // mutate `this`) for the length of the call.
            const member = runtime.resolveMember(typeName, prop);
            if (member !== null)
                return (...args) => {
                    const result = runtime.invoke(member.typeName, member.key, [proxySelf].concat(args));
                    return result === undefined || isStructHandle(result) ? result : reWrapCallResult(runtime, result);
                };
            if (layout)
                moduleLogger.debug("%s has no field '%s' — known: %s", typeName, prop, layout.fields.map((f) => f.name).join(", "));
            return undefined;
        },
        set(_t, prop, value) {
            if (typeof prop !== "string")
                return false;
            if (prop === "_result") {
                target._result = value;
                return true;
            }
            const entry = fieldAt(prop);
            if (entry)
                return writeField(entry, value) || true;
            moduleLogger.error("%s has no field '%s' — known: %s", typeName, prop, layout ? layout.fields.map((f) => f.name).join(", ") : "(layout unavailable)");
            return true;
        },
        has: (_t, prop) => typeof prop === "string" && (fieldAt(prop) !== undefined || target[prop] !== undefined),
        ownKeys: () => (layout ? layout.fields.map((f) => f.name) : []).concat("_result"),
        getOwnPropertyDescriptor: () => ({ enumerable: true, configurable: true }),
    });
    return proxySelf;
}
// Assigns `{ x: 1, y: 2 }` onto a struct, recursing into nested value types.
// An array assigns positionally, so `new Vector3(1, 2, 3)` reads as [1, 2, 3].
function applyStructInit(runtime, struct, init) {
    if (!init || typeof init !== "object")
        return false;
    if (Array.isArray(init)) {
        const names = struct.$fields;
        for (let i = 0; i < init.length && i < names.length; i++)
            struct[names[i]] = init[i];
        return true;
    }
    for (const name in init) {
        // `_result` is the hook layer's channel, and `$…` are this proxy's own
        // members — neither is a field, and assigning them logs a miss.
        if (name === "_result" || name.charCodeAt(0) === 36)
            continue;
        struct[name] = init[name];
    }
    return true;
}
// A value type held as a detached JS copy — what a by-value return, or a struct
// built from `{ x, y, z }`, actually is. `bytes` is taken as-is when it is
// already the right length, so a call's out-buffer is copied exactly once.
function createStructValue(runtime, typeName, source) {
    const size = runtime.sizeOfStruct(typeName);
    let bytes;
    if (source instanceof Uint8Array)
        bytes = source.length === size || !size ? source : source.slice(0, size);
    else
        bytes = new Uint8Array(size || 0);
    const ptr = runtime.malloc(size || 1)
    const struct = createStructProxy(runtime, new ValueWrapper(ptr), typeName, true);
    if (source && !(source instanceof Uint8Array) && typeof source === "object")
        applyStructInit(runtime, struct, source);
    return struct;
}
// Gives a struct an address in the arena for the length of one call. A handle
// already in the heap keeps the address it has; a detached copy is written into
// scratch space. Returns 0 if there is nowhere to put it.
function materialiseStruct(runtime, arena, handle) {
    if (!handle.$detached)
        return handle.$ptr;
    const source = handle.$bytes();
    const at = arena.alloc(source.length || runtime.sizeOfStruct(handle.$type) || 4);
    if (!at)
        return 0;
    const heap = requireHeap("materialiseStruct", runtime.resolveGame());
    if (!heap || at + source.length > heap.length)
        return 0;
    heap.set(source, at);
    return at;
}
// Reads a materialised struct back into its detached copy. A method taking
// `ref`/`out` writes through the pointer it was given, and this is what makes
// that visible on the handle the caller still holds.
function absorbStruct(runtime, handle, at) {
    if (!handle.$detached || !at)
        return;
    const bytes = handle.$store.bytes;
    const base = handle.$store.base();
    const size = runtime.sizeOfStruct(handle.$type) || bytes.length - base;
    const heap = requireHeap("absorbStruct", runtime.resolveGame());
    if (heap && at + size <= heap.length)
        bytes.set(heap.subarray(at, at + size), base);
}
// Property names that must never be treated as a type/method lookup, or things
// like `await scriptData.Foo` and `console.log(scriptData)` misbehave.
// Deliberately narrow: `name`, `length` and `call` are all real C# member names
// (GameObject.name, ICollection.Count's neighbours, UnityEvent.Invoke…), so only
// the identifiers that JS machinery itself probes belong here.
// `$isStruct` is here for the same reason: every call argument is tested for it,
// and without an early answer that test would run a full property-then-field
// lookup — and log a miss — on every object passed to every method. The struct
// proxy answers it from its own members before this set is consulted.
const PROXY_PASSTHROUGH = new Set([
    "then", "catch", "finally", "constructor", "prototype", "toJSON", "inspect", "nodeType",
    "$isStruct",
]);
// Ergonomic view over the raw scriptData dictionary:
//
//   scriptData["UnityEngine.Camera"].WorldToScreenPoint   exact
//   scriptData.UnityEngine.Camera.WorldToScreenPoint      walk the namespace
//   scriptData.shooter.onKill                             case-insensitive
//   scriptData.shooter.onkill(player)                     …and callable
//
// Nothing inside the loader reads through this — internal resolution uses
// `rawScriptData` — so the lazy indexes below are only ever built if a plugin
// actually uses the ergonomic form.
const EMPTY_SCRIPT_DATA = Object.create(null);
// Gives an object the `.hook()` family, bound to one resolved method.
//
// The signature is deliberately not required: it is read out of the binary's own
// TYPE/FUNCTION sections when the hook is applied, so callers never have to work
// out whether an instance method carries an implicit `this` or how a struct
// argument was lowered.
function attachHookApi(target, runtime, typeName, methodName, overloadIndex, owner) {
    const register = (kind, callback, options) => {
        if (typeof callback !== "function") {
            moduleLogger.error("%s::%s hook: expected a callback function, got %s", typeName, methodName, typeof callback);
            return undefined;
        }
        const plugin = owner || runtime.hookOwner();
        if (!plugin) {
            moduleLogger.error("%s::%s hook: no plugin to attach to — call Runtime.createPlugin() first", typeName, methodName);
            return undefined;
        }
        const opts = options || {};
        return plugin.hook({
            typeName,
            methodName,
            overloadIndex,
            // Left undefined on purpose: resolved from the binary at load time.
            params: opts.params,
            returnType: opts.returnType,
        }, callback, kind);
    };
    // .hook() defaults to a prefix, which is what you want when you mean
    // "run before, and optionally cancel or rewrite the arguments".
    target.hook = (callback, options) => register(0, callback, options);
    target.hookPrefix = (callback, options) => register(0, callback, options);
    target.hookPostfix = (callback, options) => register(1, callback, options);
    return target;
}
// A path being built before the IL2CPP context exists.
//
// At the top level of a plugin — which is where hooks have to be registered if
// they are to be applied at call sites — scriptData is not populated yet. The
// dotted path is still known statically, so this records it and splits it at the
// last segment when .hook() is called: everything before is the type, the last
// piece is the method.
function createPendingPath(runtime, path, overloadIndex, owner) {
    const split = () => {
        const dot = path.lastIndexOf(".");
        return dot === -1
            ? { typeName: path, methodName: path }
            : { typeName: path.slice(0, dot), methodName: path.slice(dot + 1) };
    };
    const node = new Proxy(Object.create(null), {
        get(_t, prop) {
            if (typeof prop !== "string" || PROXY_PASSTHROUGH.has(prop))
                return undefined;
            if (prop === "$proxy")
                return true;
            if (prop === "$path")
                return path;
            if (prop === "$pending")
                return true;
            if (prop === "overload")
                return (n) => createPendingPath(runtime, path, n, owner);
            if (prop === "hook" || prop === "hookPrefix" || prop === "hookPostfix") {
                const target = split();
                const holder = attachHookApi({}, runtime, target.typeName, target.methodName, overloadIndex, owner);
                return holder[prop];
            }
            return createPendingPath(runtime, path === "" ? prop : path + "." + prop, undefined, owner);
        },
    });
    return node;
}
function createScriptDataProxy(runtime, source, hookOwner) {
    // `source` may be the dictionary itself or a thunk that materialises it, so
    // a replayed build can postpone rebuilding ~180k keys until first use.
    const rawOf = typeof source === "function" ? source : () => source;
    let lowerTypes = null; // lowercased full type name -> exact name
    let lowerPrefixes = null; // lowercased namespace prefix -> exact prefix
    let indexedRaw = null; // which dictionary the two above were built from
    const buildIndexes = () => {
        const current = rawOf();
        if (lowerTypes && indexedRaw === current)
            return;
        indexedRaw = current;
        lowerTypes = new Map();
        lowerPrefixes = new Map();
        const raw = current;
        for (const typeName in raw) {
            const lower = typeName.toLowerCase();
            if (!lowerTypes.has(lower))
                lowerTypes.set(lower, typeName);
            for (let dot = typeName.indexOf("."); dot !== -1; dot = typeName.indexOf(".", dot + 1)) {
                const prefix = typeName.slice(0, dot);
                const lowerPrefix = prefix.toLowerCase();
                if (!lowerPrefixes.has(lowerPrefix))
                    lowerPrefixes.set(lowerPrefix, prefix);
            }
        }
    };
    // A resolved method: callable, and carrying everything you'd want to inspect.
    const makeMethod = (typeName, key) => {
        const entry = runtime.resolveMethodEntry(typeName, key);
        if (!entry)
            return undefined;
        const invoke = (args) => {
            const result = runtime.invoke(typeName, key, args);
            return result === undefined ? undefined : reWrapCallResult(runtime, result);
        };
        const base = key.replace(ALIAS_SUFFIX, "");
        const meta = {
            typeName,
            methodName: key,
            returns: runtime.returnTypeOf(typeName, key),
            index: entry.index, // WASM function-table index
            overloads: () => runtime.listOverloads(typeName, base),
            overload: (n) => {
                const resolved = makeMethod(typeName, `${base}_${n}`);
                if (resolved)
                    attachHookApi(resolved, runtime, typeName, base, n, hookOwner);
                return resolved;
            },
            // Ready to spread into plugin.hookPrefix / hookPostfix, which still
            // need the WASM signature spelled out.
            hookTarget: (params, returnType) => ({ typeName, methodName: key, params: params || [], returnType }),
            toString: () => {
                const returns = runtime.returnTypeOf(typeName, key);
                return `${typeName}::${key} -> table[${entry.index}]` + (returns ? ` : ${returns}` : "");
            },
            valueOf: () => entry.index,
        };
        // `.hook(cb)` / `.hookPrefix` / `.hookPostfix` work straight off the
        // handle, including after `.overload(n)`.
        attachHookApi(meta, runtime, typeName, key, undefined, hookOwner);
        // Static accessors chain without parentheses, the same as instance ones.
        if (key.startsWith("get_"))
            return createChainableCall(runtime, invoke, meta);
        const handle = (...args) => invoke(args);
        return Object.assign(handle, meta);
    };
    // Type.$static.foo / Type.$static.foo = x, plus .get/.set when the storage
    // type has to be named explicitly.
    const makeStaticFields = (typeName) => new Proxy(Object.create(null), {
        get(_t, prop) {
            if (typeof prop !== "string" || PROXY_PASSTHROUGH.has(prop))
                return undefined;
            if (prop === "get")
                return (name, elementType) => {
                    const value = runtime.il2cpp.staticGet(typeName, name, elementType);
                    return value === MISSING_PROPERTY ? undefined : value;
                };
            if (prop === "set")
                return (name, value, elementType) => runtime.il2cpp.staticSet(typeName, name, value, elementType);
            const value = runtime.il2cpp.staticGet(typeName, prop);
            if (value === MISSING_PROPERTY) {
                moduleLogger.error("%s has no static field '%s'", typeName, prop);
                return undefined;
            }
            return value;
        },
        set(_t, prop, value) {
            if (typeof prop === "string" && !runtime.il2cpp.staticSet(typeName, prop, value))
                moduleLogger.error("%s has no static field '%s'", typeName, prop);
            return true;
        },
    });
    // Type.$new(...) — il2cpp_object_new followed by .ctor, returned already
    // wrapped so the new object's properties and fields are usable immediately.
    const makeConstructor = (typeName) => {
        const construct = (ctorName, args) => {
            const klass = runtime.il2cpp.classOf(typeName);
            if (!klass) {
                moduleLogger.error("%s.$new: could not resolve the Il2CppClass — is the assembly loaded, and does this build export il2cpp_class_from_name?", typeName);
                return undefined;
            }
            runtime.il2cpp.classInit(typeName);
            const pointer = runtime.createObject(klass);
            if (!pointer) {
                moduleLogger.error("%s.$new: il2cpp_object_new returned null", typeName);
                return undefined;
            }
            // .ctor is an ordinary method, so it goes through the function table
            // like any other call — no need for il2cpp_runtime_invoke.
            if (runtime.resolveMethodEntry(typeName, ctorName))
                runtime.invoke(typeName, ctorName, [pointer].concat(args));
            else
                moduleLogger.warn("%s.$new: no '%s' found — the object is allocated but unconstructed", typeName, ctorName);
            return createInstanceProxy(runtime, new ValueWrapper(pointer), typeName);
        };
        const factory = (...args) => construct(".ctor", args);
        // Pick a specific constructor overload: Type.$new.overload(1)(a, b)
        factory.overload = (n) => (...args) => construct(n === 0 ? ".ctor" : `.ctor_${n}`, args);
        factory.overloads = () => runtime.listOverloads(typeName, ".ctor");
        return factory;
    };
    const makeType = (typeName) => new Proxy(Object.create(null), {
        get(_t, prop) {
            if (typeof prop !== "string" || PROXY_PASSTHROUGH.has(prop))
                return undefined;
            switch (prop) {
                // Marks this as an ergonomic view rather than a raw bucket, so
                // internal lookups can tell the two apart.
                case "$proxy": return true;
                case "$name": return typeName;
                // A type reached through the Il2CppClass rather than through
                // the metadata scan has no method bucket at all — a struct that
                // declares none is still worth having $alloc/$sizeof for.
                case "$methods": return runtime.methodsOf(typeName);
                // Just the callable names, for filtering and pasting.
                case "$methodNames": return Object.keys(rawOf()[typeName] || EMPTY_SCRIPT_DATA);
                case "$properties": return runtime.listProperties(typeName);
                // Fields have no accessors, so they never show up in $methods.
                case "$fields": return runtime.fieldsOf(typeName, { statics: true });
                // Everything at once, base classes included.
                case "$members": return runtime.members(typeName);
                case "$raw": return rawOf()[typeName];
                // Bind an object pointer to this type explicitly, skipping the
                // Il2CppClass probe — the escape hatch when a subclass, an
                // interface reference or an unreferenced assembly defeats it.
                case "wrap": return (pointer) => createInstanceProxy(runtime, pointer instanceof ValueWrapper ? pointer : new ValueWrapper(pointer), typeName);
                case "$class": return runtime.il2cpp.classOf(typeName);
                // Run the static constructor (.cctor). IL2CPP defers this until
                // the type is first touched, so statics read as 0 before it.
                case "$init": return () => runtime.il2cpp.classInit(typeName);
                // Explicit static-field access, for when you need to name the
                // storage type (enums with a non-int base, say).
                case "$static": return makeStaticFields(typeName);
                // Allocate and construct: il2cpp_object_new + .ctor.
                case "$new": return makeConstructor(typeName);
                // Value types. `$alloc` is the replacement for the old
                // `ctx.malloc(0x48)` + hand-written wrapper class: the size and
                // the field offsets both come from the runtime.
                case "$alloc": return (init) => runtime.allocStruct(typeName, init);
                // A detached value, the way C# would write `new Vector3(1, 2, 3)`
                // — nothing to free, and safe to keep across calls.
                case "$value": return (...init) => runtime.structValue(typeName, init.length === 1 ? init[0] : init);
                // …and `$struct(ptr)` is `new SomeStruct(ptr)`: name a buffer
                // that already exists (an `out` parameter a hook handed you).
                case "$struct": return (pointer) => runtime.struct(typeName, pointer);
                case "$sizeof": return runtime.sizeOfStruct(typeName);
                case "$layout": return runtime.il2cpp.structLayout(typeName);
            }
            // Members are looked up on the type and then its base classes.
            const exact = runtime.resolveMember(typeName, prop);
            if (exact !== null)
                return makeMethod(exact.typeName, exact.key);
            // Static property: `Camera.main` is `get_main()`. The accessor may
            // not be spelled that way at all, so the property table answers too.
            const getter = runtime.accessorOf(typeName, prop, "get");
            if (getter !== null) {
                // An *instance* accessor reached this way would be called with no
                // `this`, i.e. a null pointer, which traps inside IL2CPP and kills
                // the game. Refuse when the runtime tells us it isn't static.
                if (runtime.il2cpp.isStaticMethod(getter.typeName, getter.key) === false) {
                    moduleLogger.error("'%s.%s' is an instance property — read it from an object " +
                        "(e.g. %s.main.%s), not from the type", typeName, prop, typeName, prop);
                    return undefined;
                }
                const result = runtime.invoke(getter.typeName, getter.key, []);
                if (result === undefined || isStructHandle(result))
                    return result;
                return wrapIl2CppValue(runtime, result.val());
            }
            // Static field: `GameManager.instance`, with no accessor behind it.
            const staticValue = runtime.il2cpp.staticGet(typeName, prop);
            if (staticValue !== MISSING_PROPERTY)
                return staticValue;
            // Derived forms (`Method_0`, `Method_7837`) aren't stored as keys.
            const derived = makeMethod(typeName, prop);
            if (derived === undefined && !runtime.il2CppContext)
                return createPendingPath(runtime, typeName + "." + prop, undefined, hookOwner);
            if (derived === undefined && prop.charCodeAt(0) !== 36 /* $ */)
                runtime.reportMemberMiss(typeName, prop);
            return derived;
        },
        set(_t, prop, value) {
            if (typeof prop !== "string")
                return false;
            // Static property: `Time.timeScale = 2` is `set_timeScale(2)`.
            const setter = runtime.accessorOf(typeName, prop, "set");
            if (setter !== null) {
                if (runtime.il2cpp.isStaticMethod(setter.typeName, setter.key) === false) {
                    // Assigning here would pass the value as `this` and drop the
                    // real argument entirely.
                    moduleLogger.error("'%s.%s' is an instance property — assign it on an object " +
                        "(e.g. %s.main.%s = …), not on the type", typeName, prop, typeName, prop);
                    return true;
                }
                // Same as the instance path: a JS string has to become a managed
                // string or it arrives at the setter as 0, and a plain object
                // becomes the value type the matching getter returns.
                runtime.invoke(setter.typeName, setter.key, [typeof value === "string" ? value : coerceStructArgument(runtime, typeName, prop, value)]);
                return true;
            }
            // Static field.
            if (!runtime.il2cpp.staticSet(typeName, prop, value)) {
                moduleLogger.error("%s has no static property or field '%s' (looked for %s::set_%s and a static field)", typeName, prop, typeName, prop);
            }
            return true;
        },
        has: (_t, prop) => typeof prop === "string" && (rawOf()[typeName] || EMPTY_SCRIPT_DATA)[prop] !== undefined,
        ownKeys: () => Object.keys(rawOf()[typeName] || EMPTY_SCRIPT_DATA),
        getOwnPropertyDescriptor: () => ({ enumerable: true, configurable: true }),
    });
    const makeNode = (path) => new Proxy(Object.create(null), {
        get(_t, prop) {
            if (typeof prop !== "string" || PROXY_PASSTHROUGH.has(prop))
                return undefined;
            if (prop === "$proxy")
                return true;
            if (prop === "$path")
                return path;
            if (prop === "$raw")
                return rawOf();
            if (prop === "$types")
                return Object.keys(rawOf()).filter((t) => path === "" || t.startsWith(path + "."));
            const candidate = path === "" ? prop : path + "." + prop;
            // 1. exact type
            if (rawOf()[candidate] !== undefined)
                return makeType(candidate);
            buildIndexes();
            // 2. case-insensitive type
            const exactType = lowerTypes.get(candidate.toLowerCase());
            if (exactType !== undefined)
                return makeType(exactType);
            // 3. namespace segment — keep walking
            const exactPrefix = lowerPrefixes.get(candidate.toLowerCase());
            if (exactPrefix !== undefined)
                return makeNode(exactPrefix);
            // 4. Nothing is loaded yet. Plugins register hooks at their top
            //    level, long before the game's binary has been seen, so the path
            //    is recorded and resolved later rather than reported as missing.
            if (!runtime.il2CppContext)
                return createPendingPath(runtime, candidate, undefined, hookOwner);
            // 5. A type the metadata scan never indexed, because it has no
            //    methods of its own — a plain data struct, typically. The
            //    runtime still knows its layout, so $alloc/$sizeof/$struct and
            //    the inherited members all work.
            if (runtime.il2cpp.available && runtime.il2cpp.classOf(candidate)) {
                runtime.warnUnindexedType(candidate);
                return makeType(candidate);
            }
            return undefined;
        },
        has: (_t, prop) => typeof prop === "string" && rawOf()[path === "" ? prop : path + "." + prop] !== undefined,
        // Only what actually lives under this node — listing every type in the
        // build at every level produced keys that then resolved to nothing.
        ownKeys: () => {
            const prefix = path === "" ? "" : path + ".";
            const seen = new Set();
            for (const typeName in rawOf()) {
                if (prefix && !typeName.startsWith(prefix))
                    continue;
                const rest = typeName.slice(prefix.length);
                const dot = rest.indexOf(".");
                seen.add(dot === -1 ? rest : rest.slice(0, dot));
            }
            return Array.from(seen);
        },
        getOwnPropertyDescriptor: () => ({ enumerable: true, configurable: true }),
    });
    return makeNode("");
}
const ALIAS_SUFFIX = /_\d+$/;
// A length this large means the pointer almost certainly isn't the collection it
// was claimed to be; better to say so than to walk gigabytes of heap.
const IL2CPP_MAX_COLLECTION = 1 << 24;
function alignUp(value, alignment) {
    const a = alignment > 0 ? alignment : 1;
    return Math.ceil(value / a) * a;
}
// How to read one element of a managed collection. `ptr`/`obj` hand back a
// ValueWrapper so the result can be chained; `str` materialises the string.
const IL2CPP_ELEMENT_TYPES = {
    bool: { size: 1, read: (v, o) => v.getUint8(o) !== 0 },
    i8: { size: 1, read: (v, o) => v.getInt8(o) },
    u8: { size: 1, read: (v, o) => v.getUint8(o) },
    char: { size: 2, read: (v, o) => String.fromCharCode(v.getUint16(o, true)) },
    i16: { size: 2, read: (v, o) => v.getInt16(o, true) },
    u16: { size: 2, read: (v, o) => v.getUint16(o, true) },
    i32: { size: 4, read: (v, o) => v.getInt32(o, true) },
    u32: { size: 4, read: (v, o) => v.getUint32(o, true) },
    f32: { size: 4, read: (v, o) => v.getFloat32(o, true) },
    f64: { size: 8, read: (v, o) => v.getFloat64(o, true) },
    i64: { size: 8, read: (v, o) => v.getBigInt64(o, true) },
    u64: { size: 8, read: (v, o) => v.getBigUint64(o, true) },
    ptr: { size: 4, read: (v, o) => new ValueWrapper(v.getUint32(o, true)) },
    obj: { size: 4, read: (v, o) => new ValueWrapper(v.getUint32(o, true)) },
    str: { size: 4, read: (v, o) => ValueWrapper.readManagedString(v.getUint32(o, true)) },
    // `object` — decode whatever it turns out to be (string, boxed primitive,
    // or another object). The default for non-generic collections.
    boxed: { size: 4, read: (v, o) => unboxIl2CppValue(v.getUint32(o, true)) },
};
// A boxed value type stores its payload immediately after the 8-byte object
// header, so unboxing is a read at ptr+8 once the class name is known.
const IL2CPP_BOXED_READERS = {
    "System.Boolean": (v, o) => v.getUint8(o) !== 0,
    "System.SByte": (v, o) => v.getInt8(o),
    "System.Byte": (v, o) => v.getUint8(o),
    "System.Int16": (v, o) => v.getInt16(o, true),
    "System.UInt16": (v, o) => v.getUint16(o, true),
    "System.Char": (v, o) => String.fromCharCode(v.getUint16(o, true)),
    "System.Int32": (v, o) => v.getInt32(o, true),
    "System.UInt32": (v, o) => v.getUint32(o, true),
    "System.Int64": (v, o) => v.getBigInt64(o, true),
    "System.UInt64": (v, o) => v.getBigUint64(o, true),
    "System.Single": (v, o) => v.getFloat32(o, true),
    "System.Double": (v, o) => v.getFloat64(o, true),
};
// Turns an `object` reference into the JS value it actually represents:
// strings decode, boxed primitives unbox, everything else stays wrapped.
// This is what makes a Hashtable of Photon custom properties read as plain data.
function unboxIl2CppValue(pointer) {
    const runtime = activeRuntime;
    if (!pointer || !runtime)
        return pointer ? new ValueWrapper(pointer) : null;
    const typeName = runtime.rawClassNameOf(pointer);
    if (typeName === "System.String")
        return ValueWrapper.readManagedString(pointer);
    const reader = IL2CPP_BOXED_READERS[typeName];
    if (reader) {
        const _game = runtime.resolveGame();
        const heap = _game ? requireHeap("unboxIl2CppValue", _game) : null;
        if (heap) {
            const view = new DataView(heap.buffer);
            if (pointer + 16 <= view.byteLength)
                return reader(view, pointer + 8);
        }
    }
    // A reference type: give back something chainable when we can name it, and
    // a plain ValueWrapper otherwise (quietly — a mixed collection is expected
    // to contain types the plugin never referenced).
    const known = runtime.classNameOf(pointer);
    return known ? createInstanceProxy(runtime, new ValueWrapper(pointer), known) : new ValueWrapper(pointer);
}
// Accepts a name from the table above, or a custom `{ size, read(view, offset) }`
// descriptor for a struct element the table can't describe.
function il2CppElementType(type, where) {
    if (type && typeof type === "object" && typeof type.read === "function" && type.size > 0)
        return type;
    const desc = IL2CPP_ELEMENT_TYPES[type];
    if (!desc) {
        moduleLogger.error("%s: unknown element type '%s' — expected one of %s, or { size, read }", where, type, Object.keys(IL2CPP_ELEMENT_TYPES).join(", "));
        return null;
    }
    return desc;
}
// Shared walk over Dictionary entries / HashSet slots: both are Il2CppArrays of
// a struct whose first two ints are { hashCode, next }, where a negative
// hashCode marks a slot that was freed and must be skipped.
function readIl2CppSlots(view, arrayPtr, slotCount, slotSize, opts, emit, where) {
    if (slotCount > IL2CPP_MAX_COLLECTION) {
        moduleLogger.error("%s: implausible entry count %d — check the layout offsets", where, slotCount);
        return [];
    }
    const dataOffset = opts.dataOffset !== undefined ? opts.dataOffset : 16;
    // max_length sits at +12 and is four bytes wide, so the guard needs +16.
    // At +12 the last four addresses in the heap passed the check and then threw
    // out of DataView.getUint32.
    const capacity = arrayPtr > 0 && arrayPtr + 16 <= view.byteLength ? view.getUint32(arrayPtr + 12, true) : 0;
    const usable = Math.min(slotCount, capacity);
    const base = arrayPtr + dataOffset;
    if (base + usable * slotSize > view.byteLength) {
        moduleLogger.error("%s: %d entries of %d bytes from 0x%s run past the end of the heap", where, usable, slotSize, base.toString(16));
        return [];
    }
    const isLive = opts.isLive || ((v, at) => v.getInt32(at, true) >= 0);
    const limit = opts.limit !== undefined ? opts.limit : Infinity;
    const out = [];
    for (let i = 0; i < usable && out.length < limit; i++) {
        const at = base + i * slotSize;
        if (!isLive(view, at))
            continue;
        emit(out, at);
    }
    return out;
}
// ---------------------------------------------------------------------------
// Derived-artifact cache
// ---------------------------------------------------------------------------
// Rebuilding the patched binary from scratch costs the whole IL2CPP context
// scan plus two WASM rewrite passes. None of it depends on anything that
// changes between runs — given the same game binary and the same set of hooks,
// the output is byte-identical. So it is stored in IndexedDB and replayed.
const UWMK_DB_NAME = "UnityWebModkitCache";
const UWMK_DB_VERSION = 1;
const UWMK_STORE = "builds";
// Bump whenever the record shape, the rewrite logic, or scriptData naming
// changes — an old entry replayed against new code would be silently wrong.
const UWMK_CACHE_FORMAT = 7;
const UWMK_MAX_ENTRIES = 3;
// How long to wait for global-metadata.dat once Unity is actually blocked on us.
// Generous, because a cold load may still be streaming the archive prefix — but
// finite, so a build we can never read starts the game unpatched instead of
// hanging its boot forever.
const METADATA_WAIT_MS = 60000;
function openModkitDb() {
    return new Promise((resolve) => {
        if (typeof indexedDB === "undefined") {
            resolve(null);
            return;
        }
        let request;
        try {
            request = indexedDB.open(UWMK_DB_NAME, UWMK_DB_VERSION);
        }
        catch (err) {
            resolve(null);
            return;
        }
        request.onupgradeneeded = () => {
            const db = request.result;
            if (!db.objectStoreNames.contains(UWMK_STORE))
                db.createObjectStore(UWMK_STORE, { keyPath: "key" });
        };
        let settled = false;
        request.onsuccess = () => {
            if (settled) {
                // Already gave up (blocked); close it so we don't hold a
                // connection that would block the next upgrade.
                try {
                    request.result.close();
                }
                catch (err) { /* nothing useful to do */ }
                return;
            }
            settled = true;
            resolve(request.result);
        };
        request.onerror = () => {
            if (!settled) {
                settled = true;
                resolve(null);
            }
        };
        // Another tab holding an older version open would block us forever.
        request.onblocked = () => {
            if (!settled) {
                settled = true;
                resolve(null);
            }
        };
    });
}
function modkitCacheGet(key) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield openModkitDb();
        if (!db)
            return null;
        try {
            return yield new Promise((resolve) => {
                const tx = db.transaction(UWMK_STORE, "readonly");
                const request = tx.objectStore(UWMK_STORE).get(key);
                request.onsuccess = () => resolve(request.result || null);
                request.onerror = () => resolve(null);
                tx.onabort = () => resolve(null);
            });
        }
        finally {
            db.close();
        }
    });
}
function modkitCachePut(record) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield openModkitDb();
        if (!db)
            return false;
        try {
            return yield new Promise((resolve) => {
                let tx;
                try {
                    tx = db.transaction(UWMK_STORE, "readwrite");
                }
                catch (err) {
                    resolve(false);
                    return;
                }
                const store = tx.objectStore(UWMK_STORE);
                store.put(record);
                // Keep only the newest few builds so a game that updates often
                // can't grow this without bound.
                const all = store.getAll();
                all.onsuccess = () => {
                    const entries = (all.result || []).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
                    for (let i = UWMK_MAX_ENTRIES; i < entries.length; i++)
                        store.delete(entries[i].key);
                };
                tx.oncomplete = () => resolve(true);
                // Quota exhaustion is expected on small budgets — degrade to
                // "no cache" rather than failing the load.
                tx.onerror = () => resolve(false);
                tx.onabort = () => resolve(false);
            });
        }
        finally {
            db.close();
        }
    });
}
// FNV-1a over 32-bit words plus a second mixing accumulator, so a game rebuild
// that keeps the same length still changes the key. Runs at multiple GB/s, so
// it stays off the critical path even for a 40 MB binary.
function hashBytes(bytes, seed) {
    let h1 = (seed || 0x811c9dc5) >>> 0;
    let h2 = 0x9e3779b9;
    const wordCount = bytes.byteLength >>> 2;
    if ((bytes.byteOffset & 3) === 0 && wordCount > 0) {
        const words = new Uint32Array(bytes.buffer, bytes.byteOffset, wordCount);
        for (let i = 0; i < wordCount; i++) {
            const v = words[i];
            h1 = Math.imul(h1 ^ v, 0x01000193) >>> 0;
            h2 = (Math.imul(h2 + v, 0x85ebca6b) ^ (h2 >>> 13)) >>> 0;
        }
        // Fold in the tail bytes the word loop could not cover.
        for (let i = wordCount << 2; i < bytes.byteLength; i++)
            h1 = Math.imul(h1 ^ bytes[i], 0x01000193) >>> 0;
    }
    else {
        // Unaligned view (or fewer than 4 bytes): plain byte-wise pass.
        for (let i = 0; i < bytes.byteLength; i++) {
            h1 = Math.imul(h1 ^ bytes[i], 0x01000193) >>> 0;
            h2 = (Math.imul(h2 + bytes[i], 0x85ebca6b) ^ (h2 >>> 13)) >>> 0;
        }
    }
    return `${h1.toString(36)}${h2.toString(36)}${bytes.byteLength.toString(36)}`;
}
function hashString(text) {
    let h = 0x811c9dc5;
    for (let i = 0; i < text.length; i++)
        h = Math.imul(h ^ text.charCodeAt(i), 0x01000193) >>> 0;
    return h.toString(36);
}
// scriptData is ~180k string keys. Structured-cloning it as nested objects is
// slow to write and slower to read back, and the clone would come back with
// Object.prototype attached — which would make `bucket["toString"]` resolve to
// a function. Flatten it into two joined strings and two typed arrays instead.
function encodeScriptData(scriptData) {
    const typeNames = Object.keys(scriptData);
    const methodNames = [];
    const counts = new Uint32Array(typeNames.length);
    const indices = [];
    for (let t = 0; t < typeNames.length; t++) {
        const bucket = scriptData[typeNames[t]];
        let n = 0;
        for (const method in bucket) {
            methodNames.push(method);
            indices.push(bucket[method]);
            n++;
        }
        counts[t] = n;
    }
    return {
        // \u0000 is the one character an IL2CPP name can never contain, so it is
        // safe as a separator where a space or comma would not be (generic
        // instantiations render as `List<System.Int32>`).
        types: typeNames.join("\u0000"),
        methods: methodNames.join("\u0000"),
        counts,
        indices: Int32Array.from(indices),
    };
}
function decodeScriptData(encoded) {
    const typeNames = encoded.types.length ? encoded.types.split("\u0000") : [];
    const methodNames = encoded.methods.length ? encoded.methods.split("\u0000") : [];
    const counts = encoded.counts;
    const indices = encoded.indices;
    if (!counts || !indices || counts.length !== typeNames.length)
        throw new Error("cached scriptData is inconsistent (type/count mismatch)");
    // Null prototypes, exactly as createIl2CppContext builds them.
    const scriptData = Object.create(null);
    let m = 0;
    for (let t = 0; t < typeNames.length; t++) {
        const bucket = Object.create(null);
        const n = counts[t];
        for (let k = 0; k < n; k++, m++)
            bucket[methodNames[m]] = indices[m];
        scriptData[typeNames[t]] = bucket;
    }
    return scriptData;
}
// Drops every cached patched build. Exposed as UnityWebModkit.clearBuildCache()
// for when a plugin's hooks change in a way the key can't see, or to reclaim space.
function clearBuildCache() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield openModkitDb();
        if (!db)
            return false;
        try {
            return yield new Promise((resolve) => {
                const tx = db.transaction(UWMK_STORE, "readwrite");
                tx.objectStore(UWMK_STORE).clear();
                tx.oncomplete = () => resolve(true);
                tx.onerror = () => resolve(false);
                tx.onabort = () => resolve(false);
            });
        }
        finally {
            db.close();
        }
    });
}
// Wraps a JS function as a real WASM function so it can be stored in the
// module's function table. A one-function module is compiled per hook.
function makeWasmFunc(params, results, jsImpl) {
    function wasmType(t) {
        switch (t) {
            case "i32":
                return 0x7f;
            case "i64":
                return 0x7e;
            case "f32":
                return 0x7d;
            case "f64":
                return 0x7c;
            default:
                throw new Error("Unsupported type " + t);
        }
    }
    const paramTypes = params.map(wasmType);
    const resultTypes = results.map(wasmType);
    const typeVec = [0x60, paramTypes.length, ...paramTypes, resultTypes.length, ...resultTypes];
    const typeSection = [0x01, typeVec.length + 1, 0x01, ...typeVec];
    const importEntry = [0x01, 0x65, 0x01, 0x66, 0x00, 0x00];
    const importSection = [0x02, importEntry.length + 1, 0x01, ...importEntry];
    const exportEntry = [0x01, 0x67, 0x00, 0x00];
    const exportSection = [0x07, exportEntry.length + 1, 0x01, ...exportEntry];
    const bytes = new Uint8Array([0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00, ...typeSection, ...importSection, ...exportSection]);
    const mod = new WebAssembly.Module(bytes);
    const inst = new WebAssembly.Instance(mod, { e: { f: jsImpl } });
    return inst.exports.g;
}
class Runtime {
    constructor() {
        activeRuntime = this;
        // Set UnityWebModkit.Runtime.disableBuildCache = true (before the game
        // loads) to always rebuild from scratch — useful when hacking on the
        // rewriter itself, where the cache would hide your changes.
        this.disableBuildCache = false;
        this.plugins = [];
        this.startedInitializing = false;
        this.allReferencedAssemblies = [];
        this.resolvedIl2CppFunctions = {};
        this.logger = new _logger__WEBPACK_IMPORTED_MODULE_0__.Logger("UnityWebModkit");
        this.metadataReady = new Promise((resolve, reject) => {
            this.resolveMetadataReady = resolve;
            this.rejectMetadataReady = reject;
        });
    }
    createPlugin(opts) {
        if (!this.startedInitializing)
            this.initialize();
        const plugin = new ModkitPlugin(opts.name, opts.version, opts.referencedAssemblies, this);
        this.plugins.push(plugin);
        this._hookOwner = plugin;
        return plugin;
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof window === "undefined") {
                console.log("\x1b[37m[UnityWebModkit]\x1b[0m \x1b[33m[WARN]\x1b[0m Not running in a browser environment! Nothing will be executed.");
                return;
            }
            // Unity's own caches are left alone — see preloadInternal. The previous
            // duplicate deletion here raced the preloader and could leave dangling onerror
            // handlers attached to a request that the preloader had already superseded.
            this.startedInitializing = true;
            // An unfakeable statement of what *this* Runtime object can do. "That
            // method isn't there" is otherwise impossible to tell apart from a
            // second copy of the loader winning the window.UnityWebModkit global,
            // and the console is the one place both sides can see the same thing.
            const api = this.features;
            this.logger.message("Runtime API (%d): %s", api.length, api.join(" "));
            // The identity of the object those methods live on, so it can be
            // compared against whatever window.UnityWebModkit turns out to be.
            if (window.UnityWebModkit && window.UnityWebModkit.Runtime !== this) {
                this.logger.warn("window.UnityWebModkit.Runtime is NOT this Runtime — two copies of the loader are on " +
                    "the page and your plugin is talking to the other one. Compare " +
                    "UnityWebModkit.Runtime.features with the list above.");
            }
            this.hookWasmInstantiate();
            const webData = yield (0,_preloader__WEBPACK_IMPORTED_MODULE_3__.preload)();
            this.logger.debug("Parsed web data into %d node(s)", webData.nodes.length);
            webData.unityVersion
                ? this.logger.info("Running under Unity %s", webData.unityVersion)
                : this.logger.warn("Unable to determine Unity version from web data!");
            // Always rebuild — no caching.
            this.loadGlobalMetadata(webData);
        });
    }
    loadGlobalMetadata(webData) {
        return __awaiter(this, void 0, void 0, function* () {
            const metadataNode = webData.getNode("Il2CppData/Metadata/global-metadata.dat");
            if (!metadataNode || !metadataNode.data) {
                const err = new _errors__WEBPACK_IMPORTED_MODULE_1__.UnresolvedMetadataError("Unable to find global-metadata.dat! The game may be encrypted, corrupt or unsupported.");
                this.logger.error(err.print());
                this.rejectMetadataReady(err);
                return;
            }
            this.allReferencedAssemblies = this.plugins.flatMap((plugin) => plugin.referencedAssemblies);
            // Materialising the blob copies global-metadata.dat (commonly 10-30 MB)
            // and pins it for a minute, on the critical path of every load. Expose it
            // on demand instead — call UnityWebModkit.Runtime.dumpMetadata() from the
            // console when you actually want the file.
            if (debugMode) {
                // Held in a field, not a closure variable, so the post-instantiate
                // cleanup can drop it along with the other load-time allocations.
                this._metadataDumpSource = metadataNode.data;
                this.dumpMetadata = () => {
                    if (!this._metadataDumpSource) {
                        this.logger.warn("dumpMetadata: metadata buffer was already released after startup");
                        return null;
                    }
                    const url = URL.createObjectURL(new Blob([this._metadataDumpSource], { type: "application/octet-stream" }));
                    this.logger.info("global-metadata.dat download url:", url);
                    setTimeout(() => URL.revokeObjectURL(url), 60000);
                    return url;
                };
            }
            // Only the *bytes* are resolved here. Parsing them costs a full walk
            // of the type and method tables, and a cached build never needs it —
            // so it is deferred until something actually misses the cache, where
            // it also stops competing with Unity's own startup for the main thread.
            this._metadataBytes = metadataNode.data;
            this.resolveMetadataReady();
        });
    }
    // Parses global-metadata.dat on first demand and memoises the result.
    ensureGlobalMetadata() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.globalMetadata)
                return this.globalMetadata;
            if (this._metadataParse)
                return this._metadataParse;
            this._metadataParse = (() => __awaiter(this, void 0, void 0, function* () {
                // Bounded, because this is the one place the wait actually costs
                // anything: Unity is blocked on the instantiate that led here.
                // readWebDataPrefix stops as soon as it reaches the metadata
                // member, so this is nowhere near a full archive download.
                let timer;
                const deadline = new Promise((_, reject) => {
                    timer = setTimeout(() => reject(new _errors__WEBPACK_IMPORTED_MODULE_1__.UnresolvedMetadataError("timed out waiting for global-metadata.dat (" + (METADATA_WAIT_MS / 1000) + "s)")), METADATA_WAIT_MS);
                });
                try {
                    yield Promise.race([this.metadataReady, deadline]);
                }
                finally {
                    clearTimeout(timer);
                }
                if (!this._metadataBytes)
                    throw new _errors__WEBPACK_IMPORTED_MODULE_1__.UnresolvedMetadataError("global-metadata.dat was never captured");
                const parsed = yield (0,_il2cpp__WEBPACK_IMPORTED_MODULE_2__.createMetadata)(this._metadataBytes, this.allReferencedAssemblies);
                if (parsed.isErr()) {
                    this.logger.error(parsed.error.print());
                    throw parsed.error;
                }
                this.globalMetadata = parsed.value;
                return parsed.value;
            }))();
            return this._metadataParse;
        });
    }
    hookWasmInstantiate() {
        // Bind to WebAssembly so the originals always see the correct `this`,
        // regardless of how callers invoke our stored reference.
        this.instantiateStreaming = WebAssembly.instantiateStreaming.bind(WebAssembly);
        WebAssembly.instantiateStreaming = this.onWebAssemblyInstantiateStreaming.bind(this);
        this.instantiate = WebAssembly.instantiate.bind(WebAssembly);
        WebAssembly.instantiate = this.onWebAssemblyInstantiate.bind(this);
    }
    onWebAssemblyInstantiateStreaming(source, importObject) {
        return __awaiter(this, void 0, void 0, function* () {
            // The body has to be materialised either way (a rewritten module can't
            // be streamed), but nothing else is decided until handleWasm has had a
            // chance to serve the build from cache.
            let bufferSource;
            if (source instanceof Promise) {
                bufferSource = yield source.then((res) => res.arrayBuffer());
            }
            else if (source instanceof Response) {
                bufferSource = yield source.arrayBuffer();
            }
            else {
                this.logger.error("TypeError: Got an unexpected object type as the first argument to WebAssembly.instantiateStreaming;", typeof source);
                return this.instantiateStreaming(source, importObject);
            }
            return this.handleWasm(bufferSource, importObject);
        });
    }
    onWebAssemblyInstantiate(source, importObject) {
        return __awaiter(this, void 0, void 0, function* () {
            let bufferSource;
            if (source instanceof ArrayBuffer) {
                bufferSource = source;
            }
            else if (ArrayBuffer.isView(source)) {
                // Honour byteOffset/byteLength — the view may cover only part of its backing buffer.
                const view = source;
                bufferSource = view.buffer.slice(view.byteOffset, view.byteOffset + view.byteLength);
            }
            else {
                // A pre-compiled WebAssembly.Module cannot be re-parsed; fall back to the original.
                this.logger.warn("WebAssembly.instantiate called with a Module; cannot re-parse, delegating to original.");
                return this.instantiate(source, importObject);
            }
            return this.handleWasm(bufferSource, importObject);
        });
    }
    // Shared entry point for both instantiate hooks. Tries the cache before
    // anything else — a hit needs neither global-metadata.dat nor either rewrite
    // pass, so it must not block on metadataReady.
    handleWasm(bufferSource, importObject) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!importObject)
                importObject = {};
            const cached = yield this.tryCachedBuild(bufferSource, importObject);
            if (cached)
                return cached;
            // Cache miss: now the metadata actually matters, so parse it.
            try {
                yield this.ensureGlobalMetadata();
            }
            catch (err) {
                // No usable metadata. Run the game unmodified rather than leaving
                // WebAssembly.instantiate permanently unsettled — an unsettled
                // promise here hangs Unity's boot forever.
                this.logger.error("Metadata unavailable (%s) — starting the game without any patches", (err && err.message) || err);
                return this.instantiate(bufferSource, importObject);
            }
            if (((_a = this.globalMetadata) === null || _a === void 0 ? void 0 : _a.imageDefs.length) === 0) {
                this.logger.warn("None of the referenced assemblies are present in this build — starting the game without any patches");
                return this.instantiate(bufferSource, importObject);
            }
            return this.handleBuffer(bufferSource, importObject);
        });
    }
    // Replays a previously patched binary. Returns the instantiation on a hit,
    // or null to fall through to a full rebuild.
    tryCachedBuild(bufferSource, importObject) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.disableBuildCache)
                return null;
            let key;
            try {
                key = this._pendingCacheKey = this.buildCacheKey(bufferSource);
            }
            catch (err) {
                return null;
            }
            let record = null;
            try {
                record = yield modkitCacheGet(key);
            }
            catch (err) {
                record = null;
            }
            // fieldData included: a record written before the field table existed
            // restores a context whose every field read is silently undefined.
            if (!record || !record.binary || !record.scriptData || !record.fieldData || !record.typeParents ||
                !record.structReturns || !record.structSizes || !record.returnTypes || !record.propertyData ||
                !record.staticKeys)
                return null;
            try {
                const restored = this.restoreBuildFromCache(record);
                this.logger.message("Reusing cached patched build (%d hook(s), %d KB) — skipped metadata parsing and both rewrite passes", restored, (record.binary.byteLength / 1024) | 0);
                this.logger.info("%d plugin(s) to load", this.plugins.length);
                // Same ordering as a cold load: plugins get onLoaded before the
                // module is instantiated, and any hooks they register there are
                // picked up by the table pass below.
                for (const plugin of this.plugins) {
                    if (!plugin.onLoaded)
                        continue;
                    try {
                        plugin.onLoaded();
                    }
                    catch (err) {
                        this.logger.error("Plugin [%s] onLoaded threw: %s", plugin.name, (err && err.stack) || err);
                    }
                }
                const imports = this.buildHookImports(importObject);
                let instantiated;
                if (record.module instanceof WebAssembly.Module) {
                    // Already compiled — this skips the single most expensive step
                    // left on a warm load. Note the different return shape:
                    // instantiate(Module) resolves to an Instance, not a pair.
                    const instance = yield this.instantiate(record.module, imports);
                    instantiated = { module: record.module, instance: instance.instance || instance };
                }
                else {
                    instantiated = yield this.instantiate(record.binary, imports);
                }
                this.applyTableHooks(instantiated);
                this.logger.message("Chainloader startup complete (cached)");
                return instantiated;
            }
            catch (err) {
                // A stale or corrupt entry must never brick the load.
                this.logger.warn("Cached build could not be used (%s) — rebuilding", (err && err.message) || err);
                this.il2CppContext = undefined;
                for (const plugin of this.plugins)
                    for (const hook of plugin.hooks)
                        hook.applied = false;
                return null;
            }
        });
    }
    handleBuffer(bufferSource, importObject) {
        return new Promise((resolve, reject) => {
            // The body is wrapped in an IIFE so a synchronous throw from any of the
            // parsing/loading steps is converted into a Promise rejection. Previously
            // the executor was `async` directly, which swallowed synchronous errors.
            (() => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d;
                this.logger.debug("handling buffer");
                if (!importObject)
                    importObject = {};
                // Note: the previous context is NOT cleared first. A game that
                // instantiates a second, non-IL2CPP module would otherwise wipe the
                // good context built from the main one.
                if (!this.searchWasmBinary(bufferSource)) {
                    // Not an IL2CPP binary we can patch (or the scan failed).
                    // Run it unmodified — rejecting here would take the game down.
                    this.logger.warn("No IL2CPP context could be built from this module — instantiating it unpatched");
                    resolve(yield this.instantiate(bufferSource, importObject));
                    return;
                }
                const bufferUint8Array = new Uint8Array(bufferSource);
                // These are filled by the preparse below, but only when absent —
                // so a second, different module would silently reuse the first
                // one's type and element tables.
                this.internalWasmTypes = undefined;
                this.internalMappings = undefined;
                this.internalWasmFunctions = undefined;
                // Scan-only: this pass exists to fill internalWasmTypes /
                // internalMappings, and its rewritten output is discarded. Building
                // that output meant allocating 2× the WASM size and memcpy'ing the
                // entire binary through it for nothing.
                const wailPreparser = new _wail__WEBPACK_IMPORTED_MODULE_5__.WailParser(bufferUint8Array, true);
                // Discovery pass — only the TYPE and ELEMENT sections matter here:
                // TYPE feeds internalWasmTypes (used to resolve hook signature indices)
                // ELEMENT feeds internalMappings (used by getInternalIndex).
                // The previous version also set SECTION_CODE, which forced the parser
                // to walk every function in the binary just to populate the unused
                // internalWasmCode field — by far the largest cost in the load.
                wailPreparser._optionalSectionFlags |= 1 << _wail__WEBPACK_IMPORTED_MODULE_5__.SECTION_ELEMENT;
                wailPreparser._optionalSectionFlags |= 1 << _wail__WEBPACK_IMPORTED_MODULE_5__.SECTION_TYPE;
                // IMPORT + FUNCTION give every defined function its type index,
                // which is what lets a hook's WASM signature be derived instead
                // of spelled out by hand. Both are cheap: neither walks any code.
                wailPreparser._optionalSectionFlags |= 1 << _wail__WEBPACK_IMPORTED_MODULE_5__.SECTION_IMPORT;
                wailPreparser._optionalSectionFlags |= 1 << _wail__WEBPACK_IMPORTED_MODULE_5__.SECTION_FUNCTION;
                wailPreparser.parse();
                this.internalImportFuncCount = wailPreparser._importFuncCount;
                const wail = new _wail__WEBPACK_IMPORTED_MODULE_5__.WailParser(bufferUint8Array);
                // this.exportIl2CppFunctions(wail);
                this.logger.message("Chainloader initialized");
                this.logger.info("%d plugin(s) to load", this.plugins.length);
                const replacementFuncIndexes = [];
                const oldFuncIndexes = [];
                const injectedHooks = [];
                // Precompute a (params-key, returnType) -> wasm type index map so each
                // hook is an O(1) lookup. Params are arrays of WASM-type strings
                // (e.g. "i32"), so a plain join is cheaper than JSON.stringify and
                // produces the same uniqueness guarantee for this domain.
                const wasmTypeIndex = new Map();
                for (let t = 0; t < this.internalWasmTypes.length; t++) {
                    const ty = this.internalWasmTypes[t];
                    wasmTypeIndex.set(ty.params.join(",") + "|" + ((_a = ty.returnType) !== null && _a !== void 0 ? _a : ""), t);
                }
                let hookOrdinal = 0;
                var i = 0, pluginLen = this.plugins.length;
                while (i < pluginLen) {
                    const usePlugin = this.plugins[i];
                    this.logger.info("Loading [%s %s]", usePlugin.name, usePlugin.version);
                    var j = 0, hookLen = usePlugin.hooks.length;
                    while (j < hookLen) {
                        const useHook = usePlugin.hooks[j];
                        useHook.tableIndex = this.getTableIndex(useHook.typeName, useHook.methodName, useHook.overloadIndex);
                        if (useHook.tableIndex === -1) {
                            this.logger.warn(useHook.overloadIndex !== undefined
                                ? "Hook '%s::%s' (overload %d) skipped — method not found in scriptData"
                                : "Hook '%s::%s' skipped — method not found in scriptData", useHook.typeName, useHook.methodName, useHook.overloadIndex);
                            ++j;
                            continue;
                        }
                        useHook.index = this.getInternalIndex(useHook.tableIndex);
                        if (useHook.index === undefined) {
                            this.logger.warn("Hook '%s::%s' skipped — internalMappings lookup returned undefined for tableIndex %d", useHook.typeName, useHook.methodName, useHook.tableIndex);
                            ++j;
                            continue;
                        }
                        // A hook registered without an explicit signature (the
                        // scriptData `.hook()` form) gets it from the binary.
                        if (!useHook.params) {
                            const signature = this.signatureOf(useHook.tableIndex);
                            if (!signature) {
                                this.logger.warn("Hook '%s::%s' skipped — could not read its WASM signature from the binary; " +
                                    "pass params/returnType explicitly", useHook.typeName, useHook.methodName);
                                ++j;
                                continue;
                            }
                            useHook.params = signature.params;
                            if (useHook.returnType === undefined)
                                useHook.returnType = signature.returnType;
                            this.logger.debug("Hook '%s::%s' signature resolved as (%s) -> %s", useHook.typeName, useHook.methodName, useHook.params.join(", ") || "void", useHook.returnType || "void");
                        }
                        // Deterministic, not random: the patched binary embeds these
                        // names, so a cached build can only be replayed if the same
                        // importObject keys are rebuilt. The ordinal keeps them unique
                        // even when one method is hooked by several plugins.
                        const injectName = `${useHook.tableIndex}xx${useHook.returnType}_${hookOrdinal++}`;
                        useHook.injectName = injectName;
                        const lookupKey = useHook.params.join(",") + "|" + ((_b = useHook.returnType) !== null && _b !== void 0 ? _b : "");
                        const injectType = (_c = wasmTypeIndex.get(lookupKey)) !== null && _c !== void 0 ? _c : -1;
                        if (injectType === -1) {
                            // Emitting an import with type index -1 produces a
                            // binary that fails WebAssembly validation, taking the
                            // whole game down over one mistyped hook. Skip this one
                            // instead; the function-table pass will still try it.
                            this.logger.warn("Hook '%s::%s' — no WASM type matches signature (%s) -> %s. " +
                                "Check that params/returnType exactly match the IL2CPP method's WASM signature " +
                                "(instance methods typically have an implicit i32 'this' as the first param). " +
                                "This hook will not be applied at its call sites.", useHook.typeName, useHook.methodName, useHook.params.join(", ") || "void", (_d = useHook.returnType) !== null && _d !== void 0 ? _d : "void");
                            ++j;
                            continue;
                        }
                        const injectFunc = this.createHookImplementation(useHook);
                        importObject.env = importObject.env || {};
                        importObject.env[injectName] = injectFunc;
                        const replacementFuncIndex = wail.addImportEntry({
                            moduleStr: "env",
                            fieldStr: injectName,
                            kind: "func",
                            type: injectType,
                        });
                        replacementFuncIndexes.push(replacementFuncIndex);
                        const oldFuncIndex = wail.getFunctionIndex(useHook.index);
                        oldFuncIndexes.push(oldFuncIndex);
                        // Hooks that were skipped above are absent from these
                        // arrays, so the ordinal below is NOT a position in
                        // plugins/hooks — keep the object itself.
                        injectedHooks.push(useHook);
                        ++j;
                    }
                    // One plugin throwing here used to abandon the whole load —
                    // no further plugins, no instantiate, and the promise rejected.
                    if (usePlugin.onLoaded) {
                        try {
                            usePlugin.onLoaded();
                        }
                        catch (err) {
                            this.logger.error("Plugin [%s] onLoaded threw: %s", usePlugin.name, (err && err.stack) || err);
                        }
                    }
                    ++i;
                }
                this.resolveIl2CppFunctions(importObject);
                this.exportIl2CppFunctions(wail);
                // Build the callTarget -> hookIndex map ONCE outside the per-instruction
                // callback.  setCallHookData stores it on the parser for inline lookup
                // during _readInstruction — no per-OP_CALL BufferReader allocation.
                // These are WailVariables whose function indexes are not known
                // until the IMPORT section has been parsed, so they are handed
                // over as-is; the parser re-keys the map once they resolve.
                // Calling .i32() here produced wrapper objects that could never
                // match the numeric lookup, so no direct call was ever redirected.
                const callTargetToHookIndex = new Map();
                for (let h = 0; h < oldFuncIndexes.length; h++) {
                    callTargetToHookIndex.set(oldFuncIndexes[h], h);
                }
                const runtime = this;
                wail.setCallHookData(callTargetToHookIndex, (hookIdx) => replacementFuncIndexes[hookIdx], (hookIdx) => {
                    const hook = injectedHooks[hookIdx];
                    if (hook)
                        hook.applied = true;
                });
                wail.parse();
                const wasmOutput = wail.write();
                this.instantiate(wasmOutput, importObject).then((instantiatedSource) => {
                    try {
                        // Held only long enough for the cache write below.
                        this._compiledModule = instantiatedSource.module;
                        // The authoritative export table, kept so lookups never
                        // depend on Unity's loader republishing it on Module.
                        if (instantiatedSource.instance && instantiatedSource.instance.exports)
                            this._wasmExports = instantiatedSource.instance.exports;
                        this.applyTableHooks(instantiatedSource);
                        this.logger.message("Chainloader startup complete");
                        // Persist for next time. Deliberately not awaited: the game
                        // is already running, and a slow or failing write must not
                        // hold up startup.
                        if (this._pendingCacheKey && !this.disableBuildCache) {
                            void this.saveBuildToCache(this._pendingCacheKey, wasmOutput);
                            this._pendingCacheKey = undefined;
                        }
                        // Release heavy load-time allocations. These were only needed to
                        // build the patched WASM module:
                        //   - the global-metadata buffer (often 10+ MB)
                        //   - typeDefs / methodDefs / imageDefs structures
                        //   - both WAIL parser instances (each holds the entire WASM, in
                        //     plus an out buffer of comparable size)
                        //   - the script-data lookup map (we keep scriptData on
                        //     il2CppContext for plugin .call() resolution, but type/method
                        //     defs aren't read again after this point)
                        if (this.globalMetadata) {
                            this.globalMetadata.buffer = new ArrayBuffer(0);
                            this.globalMetadata.typeDefs = [];
                            this.globalMetadata.methodDefs = [];
                            this.globalMetadata.imageDefs = [];
                        }
                        this._metadataDumpSource = undefined;
                        // The raw archive member is 10-30 MB and is only needed to
                        // reach this point; holding it would keep it alive for the
                        // whole session.
                        this._metadataBytes = undefined;
                        resolve(instantiatedSource);
                    }
                    catch (err) {
                        this.logger.error("Error in post-instantiate hook setup:", err);
                        reject(err);
                    }
                }).catch((err) => {
                    this.logger.error("WebAssembly.instantiate failed — modified WASM binary may be invalid:", err);
                    reject(err);
                });
            }))().catch((err) => {
                this.logger.error("handleBuffer threw before instantiate:", err);
                reject(err);
            });
        });
    }
    // Returns whether a usable context was produced. On failure the previously
    // built context (if any) is left untouched.
    searchWasmBinary(bufferSource) {
        if (!this.globalMetadata)
            return false;
        const il2CppContext = (0,_il2cpp__WEBPACK_IMPORTED_MODULE_2__.createIl2CppContext)(bufferSource, this.globalMetadata, this.allReferencedAssemblies);
        if (il2CppContext.isErr()) {
            this.logger.error(il2CppContext.error.print());
            return false;
        }
        this.il2CppContext = il2CppContext.value;
        // Method resolutions and Il2CppClass names are memoised against the
        // previous scriptData.
        this.resetLookupCaches();
        // Keep the plain dictionary for internal resolution — every hot lookup in
        // this file goes through `rawScriptData` and never touches the proxy — and
        // expose the ergonomic view under the original name.
        this.il2CppContext.rawScriptData = this.il2CppContext.scriptData;
        this.il2CppContext.scriptData = createScriptDataProxy(this, this.il2CppContext.rawScriptData);
        const generics = this.il2CppContext.generics;
        if (generics && generics.found)
            this.logger.info("Resolved %d generic method instantiation(s) from %d table entries", generics.registered, generics.instantiations);
        else
            this.logger.warn("Generic method instantiations unavailable — MetadataRegistration was not located in this build");
        return true;
    }
    // public for debugging purposes
    resolveIl2CppFunctions(_importObject) {
        this.resolvedIl2CppFunctions["il2cpp_string_new"] = 2169;
        // TODO: This is a hack, but seems to work consistently with Unity 2021.3.15f1 (hopefully 2023 too)
        this.resolvedIl2CppFunctions["il2cpp_object_new"] = 2158;
    }
    exportIl2CppFunctions(wail) {
        for (const key in this.resolvedIl2CppFunctions) {
            const rawIndex = this.resolvedIl2CppFunctions[key];
            const value = wail.getFunctionIndex(rawIndex);
            wail.addExportEntry(value, {
                fieldStr: key,
                kind: "func",
            });
        }
        this.logger.info("Exported %d Il2Cpp functions", Object.keys(this.resolvedIl2CppFunctions).length);
    }
    resolveTableName(asm) {
        // Hook callbacks invoke this on every call. Memoise the result on the
        // runtime so subsequent calls are an O(1) field read instead of an
        // Object.keys + find sweep over the entire asm exports object.
        if (this.tableName)
            return this.tableName;
        if (!asm)
            return "Unknown";
        // Emscripten exports plenty of null/primitive entries alongside the
        // table; reading `.constructor` off those throws or misreports.
        const name = Object.keys(asm).find((key) => {
            const value = asm[key];
            return (value != null &&
                (typeof WebAssembly.Table === "function"
                    ? value instanceof WebAssembly.Table
                    : typeof value.get === "function" && typeof value.length === "number"));
        });
        if (!name) {
            moduleLogger.error("resolveTableName: no WebAssembly.Table found among %d asm exports", Object.keys(asm).length);
            return "Unknown";
        }
        // Only memoise a real hit, so a lookup that ran before the table existed
        // doesn't poison every later call with "Unknown".
        this.tableName = name;
        return name;
    }
    // Module / asm cache. The previous code did `window.unityInstance || game`
    // on every malloc / free / memory / createObject call. Now we resolve once
    // and reuse — also makes it trivial for plugin code to grab the same refs.
    resolveGame() {
        if (this._game)
            return this._game;
        const g = requireGame("Runtime.resolveGame");
        if (g)
            this._game = g;
        return g;
    }
    createObject(typeInfo) {
        const _game = this.resolveGame();
        if (!_game)
            return 0;
        const asm = requireAsm("Runtime.createObject", _game);
        if (!asm)
            return 0;
        const fn = requireExport("Runtime.createObject", asm, "il2cpp_object_new");
        if (!fn)
            return 0;
        return fn(typeInfo instanceof ValueWrapper ? typeInfo.val() : typeInfo);
    }
    createMstr(char) {
        const _game = this.resolveGame();
        if (!_game)
            return 0;
        const asm = requireAsm("Runtime.createMstr", _game);
        const heap = requireHeap("Runtime.createMstr", _game);
        if (!asm || !heap)
            return 0;
        const stringNew = requireExport("Runtime.createMstr", asm, "il2cpp_string_new");
        if (!stringNew)
            return 0;
        const encoded = new TextEncoder().encode(char);
        // il2cpp_string_new takes a NUL-terminated C string, so the buffer needs
        // one byte more than the encoded text — without it the terminator was
        // written (or read) one byte past the allocation.
        const charAlloc = this.malloc(encoded.length + 1);
        if (charAlloc === 0) {
            moduleLogger.error("Runtime.createMstr: malloc returned 0 for %d bytes", encoded.length + 1);
            return 0;
        }
        try {
            (0,_utils__WEBPACK_IMPORTED_MODULE_4__.writeUint8ArrayAtOffset)(heap, encoded, charAlloc);
            heap[charAlloc + encoded.length] = 0;
            // il2cpp_string_new copies the bytes into a managed string, so the
            // temporary native buffer must be freed to avoid leaking WASM heap.
            return stringNew(charAlloc, encoded.length);
        }
        finally {
            this.free(charAlloc);
        }
    }
    memory(address, size) {
        const _game = this.resolveGame();
        if (!_game)
            return new Uint8Array(0);
        const heap = requireHeap("Runtime.memory", _game);
        if (!heap)
            return new Uint8Array(0);
        if (address instanceof ValueWrapper)
            address = address.val();
        return heap.slice(address, address + size);
    }
    malloc(size) {
        const _game = this.resolveGame();
        if (!_game)
            return 0;
        const asm = requireAsm("Runtime.malloc", _game);
        if (!asm)
            return 0;
        const fn = requireExport("Runtime.malloc", asm, "malloc");
        if (!fn)
            return 0;
        return fn(size);
    }
    free(block) {
        var _a, _b;
        const _game = this.resolveGame();
        if (!_game)
            return;
        const asm = requireAsm("Runtime.free", _game);
        if (!asm)
            return;
        const addr = block instanceof ValueWrapper ? block.val() : block;
        if (addr === 0) {
            // free(0) is a no-op in libc — log + skip rather than letting the
            // WASM export potentially trap.
            return;
        }
        // Modern Emscripten builds expose `free` on Module.asm and don't always
        // emit the legacy `Module._free` JS wrapper, so prefer the WASM export
        // (which mirrors how `malloc` is called) and fall back to the wrapper
        // for older builds.
        const fn = (_b = (_a = asm.free) !== null && _a !== void 0 ? _a : asm._free) !== null && _b !== void 0 ? _b : _game.Module._free;
        if (typeof fn !== "function") {
            moduleLogger.error("Runtime.free: no `free` export on Module.asm or Module._free");
            return;
        }
        fn(addr);
    }
    // The ergonomic scriptData view — `Runtime.scriptData.shooter.onKill`.
    //
    // Available immediately, before the game's binary has been seen: the proxy
    // reads the context through a thunk, and an unresolved path becomes a
    // pending one so `.hook()` can be called at a plugin's top level.
    get scriptData() {
        if (!this._scriptDataProxy) {
            this._scriptDataProxy = createScriptDataProxy(this, () => {
                const ctx = this.il2CppContext;
                return ctx ? ctx.rawScriptData : EMPTY_SCRIPT_DATA;
            });
        }
        return this._scriptDataProxy;
    }
    // Which plugin a bare `scriptData…hook()` belongs to. With one plugin this
    // is unambiguous; with several, the most recently created one owns it, and
    // `plugin.scriptData` pins it explicitly.
    hookOwner() {
        return this._hookOwner || this.plugins[this.plugins.length - 1] || null;
    }
    // Rebuilds the env imports a cached binary expects. The binary embeds the
    // names, so these have to match what the original rewrite produced — which
    // is why injectName is derived deterministically rather than randomly.
    buildHookImports(importObject) {
        const imports = importObject || {};
        imports.env = imports.env || {};
        for (const plugin of this.plugins) {
            for (const hook of plugin.hooks) {
                if (!hook.injectName)
                    continue;
                imports.env[hook.injectName] = this.createHookImplementation(hook);
            }
        }
        return imports;
    }
    // Patches the function table for every hook whose call sites were not
    // rewritten. Shared by the cold and cached paths so both end in the same state.
    applyTableHooks(instantiatedSource) {
        const exports = instantiatedSource.instance.exports;
        const tableName = this.tableName || this.resolveTableName(exports);
        const table = exports[tableName];
        if (!table || typeof table.get !== "function") {
            this.logger.error("Post-instantiate: function table '%s' missing on the instantiated module", tableName);
            return;
        }
        // Bind every hook's original function now, from the module we just
        // instantiated. The import implementations fall back to an async lookup
        // when this is missing, and an async fallback cannot work across the WASM
        // boundary — it returns a Promise, which the game reads as 0 while the
        // real call happens later.
        for (const plugin of this.plugins) {
            for (const hook of plugin.hooks) {
                if (hook.originalFunc || hook.tableIndex === undefined || hook.tableIndex < 0)
                    continue;
                const original = table.get(hook.tableIndex);
                if (typeof original === "function")
                    hook.originalFunc = original;
            }
        }
        const unappliedHooks = this.getUnappliedHooks();
        for (let h = 0; h < unappliedHooks.length; h++) {
            const hook = unappliedHooks[h];
            // 0 is a legitimate table index, so these must be compared against
            // undefined rather than tested for truthiness.
            if (hook.tableIndex === undefined || hook.tableIndex === -1 || hook.index === undefined) {
                hook.tableIndex = this.getTableIndex(hook.typeName, hook.methodName, hook.overloadIndex);
                if (hook.tableIndex === -1) {
                    this.logger.warn("Unapplied hook '%s::%s' skipped — method not found in scriptData", hook.typeName, hook.methodName);
                    continue;
                }
                hook.index = this.getInternalIndex(hook.tableIndex);
                if (hook.index === undefined) {
                    this.logger.warn("Unapplied hook '%s::%s' skipped — internalMappings lookup returned undefined for tableIndex %d", hook.typeName, hook.methodName, hook.tableIndex);
                    continue;
                }
            }
            const originalFunc = table.get(hook.tableIndex);
            if (typeof originalFunc !== "function") {
                this.logger.warn("Unapplied hook '%s::%s' skipped — table entry %d is not a function", hook.typeName, hook.methodName, hook.tableIndex);
                continue;
            }
            hook.originalFunc = originalFunc;
            if (!hook.params) {
                const signature = this.signatureOf(hook.tableIndex);
                if (!signature) {
                    this.logger.warn("Unapplied hook '%s::%s' skipped — no WASM signature available; " +
                        "pass params/returnType explicitly", hook.typeName, hook.methodName);
                    continue;
                }
                hook.params = signature.params;
                if (hook.returnType === undefined)
                    hook.returnType = signature.returnType;
            }
            const hookResults = hook.returnType ? [hook.returnType] : [];
            const jsImpl = this.createHookImplementation(hook);
            try {
                table.set(hook.tableIndex, makeWasmFunc(hook.params, hookResults, jsImpl));
                hook.applied = true;
            }
            catch (err) {
                this.logger.warn("Unapplied hook '%s::%s' could not be installed into the table: %s", hook.typeName, hook.methodName, (err && err.message) || err);
            }
        }
    }
    // The JS function a hook's injected import (and its function-table patch)
    // both call. Extracted so the cached-build path can rebuild the importObject
    // without re-running the rewrite that produced it.
    createHookImplementation(hook) {
        // Capture `this` as a local so the closures don't have to traverse
        // an arrow's lexical `this` per call.
        const runtime = this;
        // Resolves the original WASM function once (after Unity is ready),
        // then memoises it on the hook for every subsequent fire.
        const resolveOriginal = () => __awaiter(this, void 0, void 0, function* () {
            // Hit the cache.
            if (hook.originalFunc)
                return hook.originalFunc;
            let g = runtime._game;
            if (!g) {
                // @ts-ignore
                g = window.unityInstance || window.unityGame || window.unityGameInstance;
                if (!g) {
                    try {
                        // @ts-ignore
                        yield (0,_utils__WEBPACK_IMPORTED_MODULE_4__.waitFor)(() => window.unityInstance || window.unityGame || window.unityGameInstance);
                    }
                    catch (err) {
                        moduleLogger.error("Hook '%s::%s': timed out waiting for Unity to initialize. Hook will no-op.", hook.typeName, hook.methodName);
                        return null;
                    }
                    // @ts-ignore
                    g = window.unityInstance || window.unityGame || window.unityGameInstance;
                }
                runtime._game = g;
            }
            const asm = requireAsm(`Hook '${hook.typeName}::${hook.methodName}'`, g);
            if (!asm)
                return null;
            const tn = runtime.tableName || runtime.resolveTableName(asm);
            const table = asm[tn];
            if (!table || typeof table.get !== "function") {
                moduleLogger.error("Hook '%s::%s': function table '%s' missing or invalid on Module.asm", hook.typeName, hook.methodName, tn);
                return null;
            }
            const fn = table.get(hook.tableIndex);
            if (typeof fn !== "function") {
                moduleLogger.error("Hook '%s::%s': table.get(%d) returned non-function (%s)", hook.typeName, hook.methodName, hook.tableIndex, typeof fn);
                return null;
            }
            hook.originalFunc = fn;
            return fn;
        });
        // A hook callback is plugin code running inside the game's own call
        // frame. A JS exception thrown there unwinds through the WASM frame that
        // called it, which does not just fail the hook — it takes the game down.
        // Swallowed and reported instead, once per hook, and the original is
        // left to run exactly as if the hook were disabled.
        const safely = (...callbackArgs) => {
            try {
                return hook.callback(...callbackArgs);
            }
            catch (err) {
                if (!hook.threw) {
                    hook.threw = true;
                    moduleLogger.error("Hook '%s::%s' threw — the original method still ran, and this is reported once. %s",
                        hook.typeName, hook.methodName, runtime.describeException(err));
                }
                return undefined;
            }
        };
        let injectFunc;
        if (!hook.kind) {
            // PREFIX
            injectFunc = (...args) => {
                const cached = hook.originalFunc;
                if (cached) {
                    // Hot path — fully synchronous after the first call.
                    if (!hook.enabled) {
                        return hook.returnType ? cached(...args) : (cached(...args), undefined);
                    }
                    const wrappedArgs = args.map((arg) => new ValueWrapper(arg));
                    const result = safely(...wrappedArgs);
                    const unwrapped = wrappedArgs.map((arg) => arg.val());
                    if (result === undefined || result === true) {
                        return hook.returnType ? cached(...unwrapped) : (cached(...unwrapped), undefined);
                    }
                    return hook.returnType ? undefined : undefined;
                }
                // Cold path — only runs until Unity is ready.
                return resolveOriginal().then((originalFunction) => {
                    if (!originalFunction)
                        return hook.returnType ? 0 : undefined;
                    if (!hook.enabled) {
                        return hook.returnType ? originalFunction(...args) : (originalFunction(...args), undefined);
                    }
                    const wrappedArgs = args.map((arg) => new ValueWrapper(arg));
                    const result = safely(...wrappedArgs);
                    args = wrappedArgs.map((arg) => arg.val());
                    if (result === undefined || result === true) {
                        return hook.returnType ? originalFunction(...args) : (originalFunction(...args), undefined);
                    }
                });
            };
        }
        else {
            // POSTFIX
            injectFunc = (...args) => {
                const cached = hook.originalFunc;
                if (cached) {
                    // Hot path
                    let originalResult = cached(...args);
                    if (!hook.enabled)
                        return hook.returnType ? originalResult : undefined;
                    if (originalResult !== undefined)
                        originalResult = new ValueWrapper(originalResult);
                    const wrappedArgs = args.map((arg) => new ValueWrapper(arg));
                    safely(originalResult, ...wrappedArgs);
                    return originalResult === null || originalResult === void 0 ? void 0 : originalResult.val();
                }
                return resolveOriginal().then((originalFunction) => {
                    if (!originalFunction)
                        return hook.returnType ? 0 : undefined;
                    let originalResult = originalFunction(...args);
                    if (!hook.enabled)
                        return hook.returnType ? originalResult : undefined;
                    if (originalResult !== undefined)
                        originalResult = new ValueWrapper(originalResult);
                    const wrappedArgs = args.map((arg) => new ValueWrapper(arg));
                    safely(originalResult, ...wrappedArgs);
                    return originalResult === null || originalResult === void 0 ? void 0 : originalResult.val();
                });
            };
        }
        return injectFunc;
    }
    // Everything the patched binary depends on: the game itself, the exact set
    // of hooks (their signatures decide the injected imports and therefore the
    // whole function-index layout), and the assemblies scriptData was built
    // from. Any change to any of it must miss the cache.
    buildCacheKey(bufferSource) {
        const hooks = [];
        for (const plugin of this.plugins) {
            for (const hook of plugin.hooks) {
                hooks.push([
                    hook.typeName, hook.methodName, hook.overloadIndex, hook.kind,
                    (hook.params || []).join(","), hook.returnType || "",
                ].join("|"));
            }
        }
        const assemblies = this.plugins
            .flatMap((plugin) => plugin.referencedAssemblies)
            .slice()
            .sort()
            .join(",");
        const wasm = hashBytes(bufferSource instanceof Uint8Array ? bufferSource : new Uint8Array(bufferSource));
        // `revision` is in here deliberately: buildHash does not move when the
        // bundle is edited in place, so without it a rebuilt loader replays a
        // binary — and a context — produced by the old one.
        const loader = hashString(`${UWMK_CACHE_FORMAT}:${_preloader__WEBPACK_IMPORTED_MODULE_3__.buildHash}:${_preloader__WEBPACK_IMPORTED_MODULE_3__.revision}`);
        return `${UWMK_CACHE_FORMAT}.${loader}.${wasm}.${hashString(hooks.join(";"))}.${hashString(assemblies)}`;
    }
    // Stores the patched binary plus the resolved lookups it took to build.
    // Fire-and-forget: a failure here only costs the next load its head start.
    saveBuildToCache(key, patchedBinary) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.il2CppContext || !this.il2CppContext.rawScriptData)
                return;
            try {
                const hooks = [];
                for (const plugin of this.plugins) {
                    for (const hook of plugin.hooks) {
                        hooks.push({
                            typeName: hook.typeName,
                            methodName: hook.methodName,
                            overloadIndex: hook.overloadIndex,
                            tableIndex: hook.tableIndex,
                            injectName: hook.injectName,
                            applied: !!hook.applied,
                            // Derived from the binary's TYPE/FUNCTION sections,
                            // which a cached load never parses.
                            params: hook.params,
                            returnType: hook.returnType,
                        });
                    }
                }
                // Copy out of the parser's output buffer — it is a subarray of a
                // much larger allocation, and structured clone would store all of it.
                const binary = patchedBinary.slice().buffer;
                const record = {
                    key,
                    createdAt: Date.now(),
                    binary,
                    hooks,
                    scriptData: encodeScriptData(this.il2CppContext.rawScriptData),
                    // Plain objects of { offset, kind }, so they clone into
                    // IndexedDB as-is. Without this a warm load would silently
                    // lose every field.
                    fieldData: this.il2CppContext.fieldData || null,
                    fieldSummary: this.il2CppContext.fieldSummary || null,
                    typeParents: this.il2CppContext.typeParents || null,
                    // Which methods return a value type, and how big each value
                    // type is. Without these a warm load can still call them —
                    // just with the struct written over the wrong argument.
                    structReturns: this.il2CppContext.structReturns || null,
                    structSizes: this.il2CppContext.structSizes || null,
                    returnTypes: this.il2CppContext.returnTypes || null,
                    propertyData: this.il2CppContext.propertyData || null,
                    staticKeys: this.il2CppContext.staticKeys || null,
                    // Built here while the binary tables still exist; a warm
                    // load has no way to recompute it.
                    sretArity: this.sretArity() || null,
                    corlibKeys: this.corlibKeys() || null,
                    propertySummary: this.il2CppContext.propertySummary || null,
                    generics: this.il2CppContext.generics || null,
                };
                // Some engines can persist an already-compiled module, which saves
                // recompiling tens of megabytes on the next load. Where they can't,
                // the write below simply fails and we keep only the bytes.
                let stored = false;
                if (this._compiledModule) {
                    record.module = this._compiledModule;
                    stored = yield modkitCachePut(record);
                    if (!stored) {
                        delete record.module;
                        this.logger.debug("This engine will not persist a compiled WebAssembly.Module — caching bytes only");
                    }
                }
                this._compiledModule = undefined;
                if (!stored)
                    stored = yield modkitCachePut(record);
                if (stored)
                    this.logger.debug("Cached patched build (%d KB) as %s", (binary.byteLength / 1024) | 0, key);
                else
                    this.logger.debug("Could not cache the patched build (quota or storage unavailable)");
            }
            catch (err) {
                this.logger.debug("Build cache write skipped: %s", (err && err.message) || err);
            }
        });
    }
    // Rebuilds just enough runtime state to use a cached binary: scriptData for
    // the lookup API, and each hook's resolved table index so the post-instantiate
    // pass behaves exactly as it would on a cold load.
    restoreBuildFromCache(record) {
        const context = {
            name: "il2cpp",
            codeGenModules: {},
            codeGenModuleMethodPointers: {},
            generics: record.generics || undefined,
            // Restored verbatim: field offsets are derived from the same binary
            // this record was keyed on, so they are as valid as the binary is.
            fieldData: record.fieldData || null,
            fieldSummary: record.fieldSummary || { found: false, reason: "not present in the cached build" },
            typeParents: record.typeParents || null,
            structReturns: record.structReturns || null,
            structSizes: record.structSizes || null,
            returnTypes: record.returnTypes || null,
            propertyData: record.propertyData || null,
            staticKeys: record.staticKeys || null,
            sretArity: record.sretArity || undefined,
            corlibKeys: record.corlibKeys || undefined,
            propertySummary: record.propertySummary || null,
        };
        // Rebuilding ~180k dictionary keys is the only material cost left on a
        // cache hit, and nothing needs them to get the game running — hooks take
        // their table indices from the record. Decode on first touch instead, so
        // it lands after startup (or never, if no plugin looks anything up).
        let decoded = null;
        const materialise = () => {
            if (!decoded) {
                decoded = decodeScriptData(record.scriptData);
                this.logger.debug("Decoded cached scriptData (%d types) on first use", Object.keys(decoded).length);
            }
            return decoded;
        };
        Object.defineProperty(context, "rawScriptData", { configurable: true, get: materialise });
        context.scriptData = createScriptDataProxy(this, materialise);
        this.il2CppContext = context;
        this.resetLookupCaches();
        // Matched by position, not by name: two plugins may hook the very same
        // method, and those hooks are distinct imports in the binary. The cache
        // key covers the whole ordered hook manifest, so if the key matched then
        // the order matches too — but verify rather than trust.
        const live = [];
        for (const plugin of this.plugins)
            for (const hook of plugin.hooks)
                live.push(hook);
        if (live.length !== record.hooks.length)
            throw new Error(`cached build has ${record.hooks.length} hooks, this run has ${live.length}`);
        for (let i = 0; i < live.length; i++) {
            if (live[i].typeName !== record.hooks[i].typeName || live[i].methodName !== record.hooks[i].methodName)
                throw new Error(`cached hook ${i} is '${record.hooks[i].typeName}::${record.hooks[i].methodName}', this run has '${live[i].typeName}::${live[i].methodName}'`);
        }
        for (let i = 0; i < live.length; i++) {
            live[i].tableIndex = record.hooks[i].tableIndex;
            live[i].injectName = record.hooks[i].injectName;
            if (!live[i].params && record.hooks[i].params)
                live[i].params = record.hooks[i].params;
            if (live[i].returnType === undefined)
                live[i].returnType = record.hooks[i].returnType;
            // The cached binary already has this hook's call sites rewritten, so
            // it must not be table-patched a second time.
            live[i].applied = record.hooks[i].applied;
        }
        return live.length;
    }
    resetLookupCaches() {
        this._resolveCache = undefined;
        this._classNameCache = undefined;
        this._lowerMethodCache = undefined;
        this._typeChainCache = undefined;
        this._simpleNameIndex = undefined;
        this._rawClassNameCache = undefined;
        this._untypedWarned = undefined;
        this._il2cppApi = undefined;
    }
    // The IL2CPP C API surface (classes, fields, .cctor). Created on demand so a
    // plugin that never touches fields never resolves any of it.
    get il2cpp() {
        if (this._il2cppApi === undefined)
            this._il2cppApi = new Il2CppApi(this);
        return this._il2cppApi;
    }
    // A type and its base classes, nearest first, restricted to the ones present
    // in scriptData. `Camera.gameObject` is declared on Component, so member
    // lookup has to climb — without this, everything inherited looks missing.
    typeChain(typeName) {
        if (this._typeChainCache === undefined)
            this._typeChainCache = new Map();
        const cached = this._typeChainCache.get(typeName);
        if (cached)
            return cached;
        const chain = this.getTypeBucket(typeName) ? [typeName] : [];
        let klass = this.il2cpp.classOf(typeName);
        // Whether the runtime was actually able to answer. A chain built before
        // Module.asm existed isn't empty, it's *wrong* — and memoising it would
        // leave every later lookup climbing the wrong list for the session.
        const walked = klass !== 0;
        // Keep climbing past bases that aren't in scriptData — an unreferenced
        // assembly in the middle of the hierarchy must not truncate the walk.
        for (let depth = 0; klass && depth < 32; depth++) {
            klass = this.il2cpp.parentOf(klass);
            if (!klass)
                break;
            const name = this.il2cpp.classFullName(klass);
            if (name && this.getTypeBucket(name) && chain.indexOf(name) === -1)
                chain.push(name);
        }
        // No C API — most Unity WebGL builds. The chain read out of
        // global-metadata.dat at load time is just as good, and it is the only
        // reason inheritance works at all on those games.
        const parents = this.il2CppContext ? this.il2CppContext.typeParents : null;
        if (!walked && parents) {
            let name = typeName;
            for (let depth = 0; depth < 32; depth++) {
                name = parents[name];
                if (!name)
                    break;
                if (this.getTypeBucket(name) && chain.indexOf(name) === -1)
                    chain.push(name);
            }
        }
        if (walked || parents)
            this._typeChainCache.set(typeName, chain);
        return chain;
    }
    // Every method the *loaded* build actually has. "That API doesn't exist" is
    // almost always a browser serving a cached copy of the loader, so make it
    // possible to see what's live without trusting the file on disk.
    get features() {
        const names = new Set();
        for (let proto = Object.getPrototypeOf(this); proto && proto !== Object.prototype; proto = Object.getPrototypeOf(proto)) {
            for (const name of Object.getOwnPropertyNames(proto))
                if (name !== "constructor" && name.charCodeAt(0) !== 95 /* _ */)
                    names.add(name);
        }
        return Array.from(names).sort();
    }
    // Everything the IL2CPP C API path depends on, in one object. When a type
    // resolves to `klass: 0` this says which link in the chain is missing.
    // scriptData (method calls, hooks), inheritance, field offsets and value
    // types all come out of the metadata and work without any of it; .ctor,
    // .cctor, boxing and pinning are what still need the C API.
    diagnose() {
        const _game = this.resolveGame();
        const module = _game ? _game.Module : null;
        const probes = [
            "il2cpp_class_from_name", "il2cpp_domain_get", "il2cpp_domain_get_assemblies",
            "il2cpp_domain_assembly_open", "il2cpp_assembly_get_image", "il2cpp_image_get_name",
            "il2cpp_class_get_name", "il2cpp_class_get_namespace", "il2cpp_class_get_parent",
            "il2cpp_object_get_class", "il2cpp_class_get_field_from_name", "il2cpp_class_get_fields",
            "il2cpp_field_get_offset", "il2cpp_field_get_type", "il2cpp_class_value_size",
            "il2cpp_class_is_valuetype", "il2cpp_object_new", "il2cpp_string_new",
            "il2cpp_runtime_class_init", "il2cpp_gchandle_new", "malloc", "free",
        ];
        const present = [];
        const missing = [];
        for (const name of probes)
            (this.il2cpp.fn(name) ? present : missing).push(name);
        return {
            gameInstance: _game ? "found" : "missing (window.unityInstance / unityGame / unityGameInstance)",
            exportTable: module ? (module.wasmExports ? "Module.wasmExports" : module.asm ? "Module.asm" : "neither") : "no Module",
            heap: module && module.HEAPU8 ? module.HEAPU8.length : 0,
            apiAvailable: this.il2cpp.available,
            images: this.il2cpp.images().length,
            valueTypes: this.structSummary(),
            present,
            missing,
            // A type every build has. 0 here means the lookup path is broken, not
            // that your type name is wrong.
            sanityCheck: { "System.String": this.il2cpp.classOf("System.String") },
        };
    }
    // Every field on a type, inherited ones included, with the offset each lives
    // at. Offsets are relative to the object pointer, so they drop straight into
    // readField/writeField. For a value type the unboxed layout is what you want
    // instead — that comes from `$layout` / il2cpp.structLayout.
    //   opts.own      only what this type declares
    //   opts.statics  include static fields (their offset is into static
    //                 storage, not the object — read them with $static.get)
    fieldsOf(typeName, opts) {
        const options = opts || {};
        const out = [];
        const seen = new Set();
        let klass = this.il2cpp.classOf(typeName);
        if (!klass) {
            // No C API: fall back to the offsets read out of the metadata, which
            // is the only source on a build that doesn't export il2cpp_*.
            const table = this.il2CppContext ? this.il2CppContext.fieldData : null;
            const chain = this.typeChain(typeName);
            const owners = chain.indexOf(typeName) === -1 ? [typeName].concat(chain) : chain;
            for (const owner of owners) {
                const bucket = table ? table[owner] : null;
                for (const key in bucket) {
                    if (seen.has(bucket[key].name))
                        continue;
                    seen.add(bucket[key].name);
                    out.push({
                        name: bucket[key].name,
                        offset: bucket[key].offset,
                        // A value type reports as itself rather than as the
                        // integer its first word would read as.
                        type: bucket[key].structType || IL2CPP_KIND_TO_ELEMENT[bucket[key].kind] || "i32",
                        static: false,
                        declaredOn: owner,
                    });
                }
                if (options.own)
                    break;
            }
            if (!out.length)
                moduleLogger.error("fieldsOf('%s'): no Il2CppClass and no metadata field table — see Runtime.diagnose() and Runtime.fieldSummary()", typeName);
            return out;
        }
        for (let depth = 0; klass && depth < 32; depth++) {
            const declaredOn = this.il2cpp.classFullName(klass) || typeName;
            for (const field of this.il2cpp.fieldsOfClass(klass, true) || []) {
                // A derived class may shadow a base field of the same name; the
                // nearest declaration is the one that wins, as in C#.
                if (seen.has(field.name))
                    continue;
                seen.add(field.name);
                if (field.isStatic && !options.statics)
                    continue;
                out.push({
                    name: field.name,
                    offset: field.offset,
                    type: field.structType || field.element,
                    static: field.isStatic,
                    declaredOn,
                });
            }
            if (options.own)
                break;
            klass = this.il2cpp.parentOf(klass);
        }
        return out;
    }
    // Everything a type exposes — methods, properties and fields — with the
    // class each one is declared on, walking the base chain.
    members(typeName) {
        const chain = this.typeChain(typeName);
        const methods = [];
        const properties = [];
        const seenMethod = new Set();
        const seenProperty = new Set();
        for (const owner of chain) {
            const bucket = this.getTypeBucket(owner) || EMPTY_SCRIPT_DATA;
            for (const key in bucket) {
                // `Foo_1` is this loader's name for the second overload of
                // `Foo`; fold them into one entry with a count.
                const base = key.replace(ALIAS_SUFFIX, "");
                if (bucket[base] === undefined || seenMethod.has(base))
                    continue;
                seenMethod.add(base);
                methods.push({
                    name: base,
                    returns: this.returnTypeOf(owner, base),
                    declaredOn: owner,
                    index: bucket[base],
                    overloads: this.listOverloads(owner, base).length,
                });
            }
            for (const property of this.listProperties(owner)) {
                if (seenProperty.has(property.name))
                    continue;
                seenProperty.add(property.name);
                properties.push(Object.assign({ declaredOn: owner }, property));
            }
        }
        methods.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
        properties.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
        return { typeName, chain, methods, properties, fields: this.fieldsOf(typeName, { statics: true }) };
    }
    // Live values off an object. Fields are read straight out of memory, which
    // is why they are the default: a C# property is a *method call*, and
    // invoking a hundred getters on a live object can allocate, throw, or change
    // game state. Pass { properties: true } when you want them anyway.
    dumpObject(pointer, opts) {
        const options = opts || {};
        const wrapper = pointer instanceof ValueWrapper ? pointer
            : new ValueWrapper(pointer && typeof pointer === "object" && typeof pointer.$ptr === "number" ? pointer.$ptr : pointer);
        const address = wrapper.val();
        const typeName = (pointer && typeof pointer === "object" && pointer.$type) || this.classNameOf(address);
        if (!typeName) {
            moduleLogger.error("dumpObject: could not identify the type of 0x%s", (address >>> 0).toString(16));
            return null;
        }
        const out = { $type: typeName, $realType: this.rawClassNameOf(address), $ptr: address, fields: {} };
        for (const field of this.fieldsOf(typeName)) {
            const desc = IL2CPP_ELEMENT_TYPES[field.type];
            if (!desc) {
                // An inline struct, or something with no reader — say what it is
                // rather than dropping it silently.
                out.fields[field.name] = "<" + field.type + " @" + field.offset + ">";
                continue;
            }
            const view = this.il2cpp.view();
            const at = address + field.offset;
            if (!view || at < 0 || at + desc.size > view.byteLength) {
                out.fields[field.name] = undefined;
                continue;
            }
            const raw = desc.read(view, at);
            out.fields[field.name] = raw instanceof ValueWrapper ? wrapIl2CppValue(this, raw.val()) : raw;
        }
        if (options.properties) {
            out.properties = {};
            for (const property of this.members(typeName).properties) {
                if (!property.readable)
                    continue;
                try {
                    out.properties[property.name] = instancePropertyGet(this, wrapper, typeName, property.name, true);
                }
                catch (err) {
                    out.properties[property.name] = "<threw: " + ((err && err.message) || err) + ">";
                }
            }
        }
        return out;
    }
    // A field's offset and storage kind, read out of global-metadata.dat joined
    // with MetadataRegistration.fieldOffsets at load time. This is the route
    // that does not need the IL2CPP C API, so it is what makes fields work on a
    // build that doesn't export il2cpp_field_get_offset.
    metadataField(typeName, name) {
        const ctx = this.il2CppContext;
        const table = ctx ? ctx.fieldData : null;
        if (!table)
            return null;
        const key = String(name).toLowerCase();
        // Declared on the type, or on any base — same order member lookup uses.
        const chain = this.typeChain(typeName);
        const owners = chain.indexOf(typeName) === -1 ? [typeName].concat(chain) : chain;
        for (const owner of owners) {
            const bucket = table[owner];
            const entry = bucket ? bucket[key] : undefined;
            if (entry) {
                // A field that is itself a value type is stored inline, so it
                // reads as a window onto the object's own bytes rather than as
                // whatever integer happens to sit at that offset.
                const inline = entry.structType && this.structTypes()[entry.structType];
                return inline
                    ? { offset: entry.offset, element: "struct", structType: entry.structType,
                        size: entry.structSize || inline, name: entry.name, declaredOn: owner }
                    : { offset: entry.offset, element: IL2CPP_KIND_TO_ELEMENT[entry.kind] || "i32", name: entry.name, declaredOn: owner };
            }
        }
        return null;
    }
    // A property by name, out of the metadata's own property table, searched up
    // the base chain. This is the only route that works when the obfuscator
    // renamed the accessors: a decompiler shows the property because it reads
    // this table, and `get_<name>` genuinely does not exist.
    propertyEntry(typeName, name) {
        const ctx = this.il2CppContext;
        const table = ctx ? ctx.propertyData : null;
        if (!table)
            return null;
        const key = String(name).toLowerCase();
        const chain = this.typeChain(typeName);
        const owners = chain.indexOf(typeName) === -1 ? [typeName].concat(chain) : chain;
        for (const owner of owners) {
            const bucket = table[owner];
            const entry = bucket ? bucket[key] : undefined;
            if (entry)
                return { name: entry.name, get: entry.get, set: entry.set, static: entry.static, declaredOn: owner };
        }
        return null;
    }
    // The method behind `name`'s getter or setter, as { typeName, key }, or null.
    // Convention first — `get_<name>` is right for every unobfuscated build and
    // costs one memoised lookup — then the property table.
    accessorOf(typeName, name, kind) {
        // Memoised on the same terms as resolveMember: every field read on an
        // instance proxy comes through here first and misses, and the property
        // table walk behind it is not free.
        if (this._accessorCache === undefined)
            this._accessorCache = new Map();
        const cacheKey = kind + ":" + typeName + "::" + name;
        const cached = this._accessorCache.get(cacheKey);
        if (cached !== undefined)
            return cached;
        const byConvention = this.resolveMember(typeName, kind + "_" + name);
        const property = byConvention === null ? this.propertyEntry(typeName, name) : null;
        const accessor = property ? property[kind] : null;
        const resolved = byConvention !== null ? byConvention
            : accessor ? { typeName: property.declaredOn, key: accessor, property } : null;
        // Only once the context exists, so a lookup made before the game loaded
        // does not pin a spurious miss for the session.
        if (this.getTypeBucket(typeName))
            this._accessorCache.set(cacheKey, resolved);
        return resolved;
    }
    // Members of a type whose names are visually indistinguishable from `name`,
    // nearest first. Methods and fields both: they live in different tables, and
    // the usual mistake is reaching for one through the other.
    similarMembers(typeName, name) {
        const wanted = String(name);
        const target = foldConfusables(wanted);
        const table = this.il2CppContext ? this.il2CppContext.fieldData : null;
        const propertyTable = this.il2CppContext ? this.il2CppContext.propertyData : null;
        const chain = this.typeChain(typeName);
        const owners = chain.indexOf(typeName) === -1 ? [typeName].concat(chain) : chain;
        const out = [];
        for (const owner of owners) {
            const bucket = this.getTypeBucket(owner);
            for (const key in bucket)
                if (foldConfusables(key) === target)
                    out.push({ kind: "method", name: key, escaped: escapeIdentifier(key), declaredOn: owner, index: bucket[key] });
            const properties = propertyTable ? propertyTable[owner] : null;
            for (const key in properties) {
                const property = properties[key];
                if (foldConfusables(property.name) !== target)
                    continue;
                out.push({ kind: "property", name: property.name, escaped: escapeIdentifier(property.name), declaredOn: owner,
                    accessors: { get: property.get, set: property.set }, static: property.static });
            }
            const fields = table ? table[owner] : null;
            for (const key in fields) {
                const field = fields[key];
                if (foldConfusables(field.name) !== target)
                    continue;
                out.push({ kind: "field", name: field.name, escaped: escapeIdentifier(field.name), declaredOn: owner,
                    offset: field.offset, type: field.structType || IL2CPP_KIND_TO_ELEMENT[field.kind] || "i32" });
            }
        }
        for (const entry of out) {
            let distance = 99;
            if (entry.name.length === wanted.length) {
                distance = 0;
                for (let i = 0; i < entry.name.length; i++)
                    if (entry.name[i] !== wanted[i])
                        distance++;
            }
            entry.distance = distance;
        }
        return out.sort((a, b) => a.distance - b.distance);
    }
    // Why `scriptData[type][name]` came back undefined. Silence here is the
    // worst outcome: with an obfuscated build the name *looks* right, so there
    // is nothing to see and nothing to try.
    reportMemberMiss(typeName, name) {
        // Deduped first: similarMembers walks the whole base chain and folds
        // every member name, and this fires from a proxy trap that a render
        // loop can hit every frame.
        if (this._reportedForType === undefined)
            this._reportedForType = new Set();
        if (this._reportedForType.has("member:" + name + "::" + typeName))
            return;
        const similar = this.similarMembers(typeName, name);
        const exact = similar.find((entry) => entry.distance === 0);
        if (exact && exact.kind === "property") {
            // Resolution already consults the property table, so getting here
            // means the accessor exists but is an instance one being read off
            // the type — or the property is write-only.
            this.reportOnceForType("member:" + name, typeName, "'%s' is %s property on %s, not a method. Read it as %s.%s%s", exact.escaped, exact.static ? "a static" : "an instance", exact.declaredOn, exact.static ? typeName : "<instance>", exact.escaped, exact.accessors.get ? "" : " (it is write-only — there is no getter)");
            return;
        }
        if (exact && exact.kind === "field") {
            this.reportOnceForType("member:" + name, typeName, "'%s' is a field on %s, not a method — fields have no entry in scriptData. " +
                "Read it off an instance: obj.$get(\"%s\") (offset 0x%s, %s), or Runtime.fieldsOf('%s') for the whole list.", name, exact.declaredOn, exact.escaped, exact.offset.toString(16), exact.type, typeName);
            return;
        }
        const near = similar.filter((entry) => entry.distance <= 2).slice(0, 6);
        const lines = [`${typeName} has no method '${escapeIdentifier(name)}'.`];
        if (!near.length) {
            lines.push("Nothing on it or its bases has a name that even looks like that.");
        }
        else {
            lines.push(`${similar.length} member(s) render identically — this build obfuscates with homoglyphs, so a ` +
                "name retyped from a decompiler is usually one character out. Nearest:");
            for (const entry of near) {
                lines.push("  " + entry.kind.padEnd(6) + " " + entry.escaped +
                    (entry.kind === "field" ? `  @0x${entry.offset.toString(16)} ${entry.type}`
                        : entry.kind === "property" ? `  ${entry.static ? "static " : ""}property` : `  table[${entry.index}]`) +
                    (entry.distance ? `  (${entry.distance} char${entry.distance > 1 ? "s" : ""} different)` : ""));
            }
            if (similar.length > near.length)
                lines.push(`  …and ${similar.length - near.length} more; Runtime.similarMembers('${typeName}', name) lists them all.`);
        }
        this.reportOnceForType("member:" + name, typeName, "%s", lines.join("\n"));
    }
    // One message per (kind, type), so a per-frame hook can't flood the console.
    reportOnceForType(kind, typeName, ...message) {
        if (this._reportedForType === undefined)
            this._reportedForType = new Set();
        const key = kind + "::" + typeName;
        if (this._reportedForType.has(key))
            return;
        this._reportedForType.add(key);
        moduleLogger.error(...message);
    }
    // A field lookup that misses on a type we *do* have a field table for is
    // almost always a spelling mismatch, and with an obfuscated build that means
    // a homoglyph: `Ӏ` (U+04C0, Cyrillic palochka) and `Ι` (U+0399, Greek capital
    // iota) are pixel-identical to `l`/`I` in most fonts but are different
    // characters. Print the real names, escaped, so the difference is visible.
    reportFieldMiss(typeName, name) {
        const ctx = this.il2CppContext;
        const table = ctx ? ctx.fieldData : null;
        // No table at all is a different failure from a name that isn't in it,
        // and it used to produce nothing but an undefined — say which it is.
        if (!table) {
            this.reportOnceForType("nofieldtable", typeName, "%s.%s: this build has no field table, so no field on any type can be read. %s " +
                "(Runtime.fieldSummary() has the detail; if it says the build was cached before the table existed, " +
                "run await UnityWebModkit.clearBuildCache() and reload.)", typeName, name, this.fieldSummary().reason || "reason unknown");
            return;
        }
        const chain = this.typeChain(typeName);
        const owners = chain.indexOf(typeName) === -1 ? [typeName].concat(chain) : chain;
        const known = [];
        for (const owner of owners) {
            const bucket = table[owner];
            for (const key in bucket)
                known.push(bucket[key].name);
        }
        if (!known.length)
            return;
        if (this._fieldMissWarned === undefined)
            this._fieldMissWarned = new Set();
        const seenKey = typeName + "::" + name;
        if (this._fieldMissWarned.has(seenKey))
            return;
        this._fieldMissWarned.add(seenKey);
        // Only the ones that look the same once homoglyphs are folded together,
        // if any — otherwise the whole list.
        // Everything that renders as a vertical stroke folds together — that is
        // exactly the set an obfuscator picks from. Generous on purpose: this
        // only runs on a miss, and showing one candidate too many beats none.
        const fold = (text) => String(text).toLowerCase()
            .replace(/[lI1|ӀӏІіΙιİı]/g, "i")
            .replace(/[Ѕѕ]/g, "s").replace(/[ОоΟο0]/g, "o");
        const wanted = fold(name);
        const near = known.filter((k) => fold(k) === wanted);
        const show = (list) => list.map((k) => k + " [" + escapeIdentifier(k) + "]").join(", ");
        if (near.length) {
            moduleLogger.error("%s has no field '%s' [%s] — but it has a look-alike: %s. " +
                "This build's identifiers use homoglyphs; copy the escaped form, or use obj.$get(obj.$fields[i].name).", typeName, name, escapeIdentifier(name), show(near));
        }
        else {
            moduleLogger.error("%s has no field '%s' [%s]. Known: %s", typeName, name, escapeIdentifier(name), show(known.slice(0, 40)));
        }
    }
    // What the field table managed to read at load time, and why if it didn't.
    fieldSummary() {
        const ctx = this.il2CppContext;
        return (ctx && ctx.fieldSummary) || { found: false, reason: "no il2cpp context yet" };
    }
    // Indexed types that derive from `typeName`. typeChain only ever walks
    // *up*, so when a handle is missing members the usual reason is that the
    // object's real class is further down — this is how you find it. A full scan
    // of every indexed type, so it's a console tool, not a hot path.
    subclassesOf(typeName) {
        const target = this.il2cpp.classOf(typeName);
        if (!target) {
            moduleLogger.error("subclassesOf('%s'): could not resolve the Il2CppClass — see Runtime.diagnose()", typeName);
            return [];
        }
        const raw = this.il2CppContext ? this.il2CppContext.rawScriptData : null;
        const out = [];
        for (const name in raw) {
            if (name === typeName)
                continue;
            let klass = this.il2cpp.classOf(name);
            for (let depth = 0; klass && depth < 32; depth++) {
                klass = this.il2cpp.parentOf(klass);
                if (klass === target) {
                    out.push(name);
                    break;
                }
            }
        }
        return out;
    }
    // Which assembly declares a type — what to put in referencedAssemblies.
    assemblyOf(typeName) {
        return this.il2cpp.imageNameOfClass(this.il2cpp.classOf(typeName));
    }
    // Why a type isn't behaving: whether it was indexed, what member lookup
    // actually walks, and what to add to referencedAssemblies if it wasn't.
    explainType(typeName) {
        const bucket = this.getTypeBucket(typeName);
        const chain = this.typeChain(typeName);
        const klass = this.il2cpp.classOf(typeName);
        const assembly = this.il2cpp.imageNameOfClass(klass);
        const out = {
            typeName,
            inScriptData: !!bucket,
            methods: bucket ? Object.keys(bucket).length : 0,
            klass,
            assembly,
            referencedAssemblies: this.allReferencedAssemblies.slice(),
            chain,
            membersResolveOn: chain[0] || null,
            // klass 0 means the base-class walk never ran, so `chain` is the type
            // alone and nothing inherited resolves.
            inheritanceAvailable: klass !== 0,
        };
        out.advice = bucket
            ? (klass
                ? "indexed — member lookup starts here and climbs the chain"
                : "indexed, so its own " + out.methods + " methods resolve — but the runtime could not resolve its " +
                    "Il2CppClass, so nothing inherited, no fields, no $new/$alloc and no struct helpers. " +
                    "Runtime.diagnose() lists which IL2CPP exports are missing.")
            : klass
                ? "not indexed: the runtime knows this class, but no methods were scanned for it, so every member " +
                    "resolves on " + (chain[0] || "nothing") + " instead. Add " +
                    (assembly ? "'" + assembly + "'" : "its assembly") + " to referencedAssemblies."
                : "the runtime cannot resolve this class at all — check the spelling, and that the game has loaded";
        return out;
    }
    // Asking for a type that was never indexed silently resolves every member on
    // its nearest indexed base. That still works for anything genuinely
    // inherited, but for an override it calls the *base* implementation — so say
    // so, once per type.
    warnUnindexedType(typeName) {
        if (this._unindexedWarned === undefined)
            this._unindexedWarned = new Set();
        if (this._unindexedWarned.has(typeName) || this.getTypeBucket(typeName))
            return;
        this._unindexedWarned.add(typeName);
        const klass = this.il2cpp.classOf(typeName);
        if (!klass) {
            // On a build with no IL2CPP C API this is *always* the branch taken,
            // so returning silently meant a misspelled `.as("Foo.Bar")` handed
            // back a proxy whose every member read undefined, with no output.
            moduleLogger.warn("'%s' is not in scriptData%s — every member on this handle will read as undefined. " +
                "Check the spelling, or that its assembly is in referencedAssemblies.", typeName, this.il2cpp.available ? "" : ", and this build exports no IL2CPP C API so the name cannot be verified");
            return;
        }
        const assembly = this.il2cpp.imageNameOfClass(klass);
        moduleLogger.warn("'%s' is not in scriptData, so its members resolve on %s instead — an override would call " +
            "the base implementation. Add %s to referencedAssemblies. " +
            "UnityWebModkit.Runtime.explainType('%s') has the details.", typeName, this.typeChain(typeName)[0] || "(nothing)", assembly ? "'" + assembly + "'" : "its assembly", typeName);
    }
    // First type in the chain that declares `name`, as { typeName, key }.
    resolveMember(typeName, name) {
        const chain = this.typeChain(typeName);
        for (let i = 0; i < chain.length; i++) {
            const key = this.matchMethodName(chain[i], name);
            if (key !== undefined)
                return { typeName: chain[i], key };
        }
        return null;
    }
    // Managed `object[]` from JS values — the C# `new object[] { … }`.
    // Values are inferred (string -> String, integer -> Int32, non-integer ->
    // Double, boolean -> Boolean); use { type, value } where C# is more specific
    // than JS can be, e.g. { type: "f32", value: 1.23 } for 1.23f.
    newObjectArray(values) {
        return new ValueWrapper(this.il2cpp.newArray("System.Object", values));
    }
    // Any managed array: newArray("System.Int32", [1, 2, 3]) stores raw ints,
    // newArray("System.String", ["a"]) stores string references.
    newArray(elementTypeName, values) {
        return new ValueWrapper(this.il2cpp.newArray(elementTypeName, values));
    }
    // A single boxed value, or a managed string.
    box(value, type) {
        return new ValueWrapper(this.il2cpp.box(value, type));
    }
    newString(text) {
        return new ValueWrapper(this.il2cpp.newString(text));
    }
    // --- Value types ------------------------------------------------------
    // Unboxed size of a value type, straight from the runtime. This is the
    // number that used to be hand-counted into `ctx.malloc(0x48)`.
    sizeOfStruct(typeName) {
        const layout = this.il2cpp.structLayout(typeName);
        return layout ? layout.size : 0;
    }
    // Name an existing buffer: the port of `new SomeStruct(ptr)`. The handle
    // does not own the memory, so `$free()` on it is refused.
    struct(typeName, pointer) {
        return createStructProxy(this, pointer, typeName, false);
    }
    // A value type as a detached copy — what C# writes as `new Vector3(1, 2, 3)`.
    // Takes `{ x, y, z }`, `[1, 2, 3]`, or nothing for a zeroed one. There is no
    // WASM memory behind it until a call needs an address, so nothing to free.
    structValue(typeName, init) {
        return createStructValue(this, typeName, init);
    }
    // Zeroed scratch memory for a value type, sized by the runtime, optionally
    // initialised from a plain object. Release it with `.$free()`.
    allocStruct(typeName, init) {
        const layout = this.il2cpp.structLayout(typeName);
        const size = layout ? layout.size : 0;
        if (!layout || !size) {
            moduleLogger.error("allocStruct('%s'): unknown size — the layout could not be read. Use Runtime.defineStruct('%s', { size, fields }) to describe it.", typeName, typeName);
            return undefined;
        }
        // A reference type is not scratch memory: a bare buffer has no
        // Il2CppClass header, so anything the game does with it would fault.
        // Type.$new() allocates one properly.
        if (!layout.isValueType) {
            moduleLogger.error("allocStruct('%s'): that is a reference type, not a struct — use scriptData['%s'].$new() to allocate and construct one.", typeName, typeName);
            return undefined;
        }
        const at = this.malloc(size);
        if (!at) {
            moduleLogger.error("allocStruct('%s'): malloc(%d) returned 0", typeName, size);
            return undefined;
        }
        const _game = this.resolveGame();
        const heap = _game ? requireHeap("Runtime.allocStruct", _game) : null;
        // malloc does not zero, and a struct read before it is written is a
        // frequent source of "why is my RaycastHit full of garbage".
        if (heap && at + size <= heap.length)
            heap.fill(0, at, at + size);
        const struct = createStructProxy(this, at, typeName, true);
        if (init)
            applyStructInit(this, struct, init);
        return struct;
    }
    // Allocate, run `use`, free — even if `use` throws. The shape almost every
    // `out` parameter wants.
    withStruct(typeName, use) {
        const struct = this.allocStruct(typeName);
        if (!struct)
            return undefined;
        try {
            return use(struct);
        }
        finally {
            struct.$free();
        }
    }
    // Describe a layout by hand, for a build that doesn't export the field API
    // or a type whose offsets you already have from a dump.
    defineStruct(typeName, descriptor) {
        return this.il2cpp.defineStruct(typeName, descriptor);
    }
    // Keep an object alive while only JS holds it; release with unpin(handle).
    pin(pointer) {
        return this.il2cpp.pin(pointer instanceof ValueWrapper ? pointer.val() : pointer);
    }
    unpin(handle) {
        this.il2cpp.unpin(handle);
    }
    // Exact stored method name for a case-insensitive query, or undefined.
    // Memoised per type; both the scriptData proxy and instance property access
    // resolve through here, so `camera.fieldofview` and `camera.fieldOfView`
    // behave identically.
    matchMethodName(typeName, name) {
        const bucket = this.getTypeBucket(typeName);
        if (!bucket)
            return undefined;
        if (bucket[name] !== undefined)
            return name;
        if (this._lowerMethodCache === undefined)
            this._lowerMethodCache = new Map();
        let index = this._lowerMethodCache.get(typeName);
        if (!index) {
            index = new Map();
            for (const key in bucket) {
                const lower = key.toLowerCase();
                if (!index.has(lower))
                    index.set(lower, key);
            }
            this._lowerMethodCache.set(typeName, index);
        }
        return index.get(name.toLowerCase());
    }
    // Every C# property name on a type, derived from its get_/set_ accessors.
    listProperties(typeName) {
        const props = new Map();
        // The metadata table names properties outright, accessors included.
        const table = this.il2CppContext ? this.il2CppContext.propertyData : null;
        const declared = table ? table[typeName] : null;
        for (const key in declared) {
            const entry = declared[key];
            props.set(entry.name, { name: entry.name, readable: !!entry.get, writable: !!entry.set,
                static: entry.static, accessors: { get: entry.get, set: entry.set } });
        }
        // Then anything only the get_/set_ convention shows — a generic
        // instantiation, say, which has methods but no property records.
        const bucket = this.getTypeBucket(typeName);
        if (!bucket)
            return Array.from(props.values());
        for (const key in bucket) {
            const name = key.startsWith("get_") ? key.slice(4) : key.startsWith("set_") ? key.slice(4) : null;
            if (name === null || ALIAS_SUFFIX.test(name))
                continue;
            const entry = props.get(name) || { name, readable: false, writable: false };
            if (key.charCodeAt(0) === 103 /* g */)
                entry.readable = true;
            else
                entry.writable = true;
            props.set(name, entry);
        }
        return Array.from(props.values());
    }
    // Full "Namespace.Name" of a live object, read from its Il2CppClass:
    // object -> klass @0, then Il2CppClass { image @0, gc_desc @4, name @8,
    // namespaze @12 }.
    //
    // The result is only returned when it names a type that is actually in
    // scriptData. That makes the read self-validating: on a build where these
    // offsets differ, property access reports "no such type" instead of
    // silently operating on a garbage name.
    classNameOf(pointer) {
        const raw = this.rawClassNameOf(pointer);
        if (!raw)
            return null;
        if (this._classNameCache === undefined)
            this._classNameCache = new Map();
        const cached = this._classNameCache.get(raw);
        if (cached !== undefined)
            return cached;
        let resolved = null;
        const dot = raw.lastIndexOf(".");
        const simple = dot === -1 ? raw : raw.slice(dot + 1);
        if (this.getTypeBucket(raw))
            resolved = raw;
        else if (this.getTypeBucket(simple))
            resolved = simple;
        else {
            // The namespace may have come back empty. If exactly one known type
            // has this simple name, that's the one — ambiguous names are never
            // guessed at.
            resolved = this.simpleNameToType(simple);
        }
        if (!resolved) {
            // The concrete class isn't in scriptData at all (an unreferenced
            // assembly, or a compiler-generated subclass). Fall back to the
            // nearest base that is — everything declared there still works.
            for (let parent = this.il2cpp.parentOf(this.il2cpp.classOfObject(pointer)), depth = 0; parent && depth < 32; parent = this.il2cpp.parentOf(parent), depth++) {
                const parentName = this.il2cpp.classFullName(parent);
                if (parentName && this.getTypeBucket(parentName)) {
                    resolved = parentName;
                    break;
                }
            }
        }
        if (!resolved) {
            // Same walk, from the metadata chain, for builds with no C API.
            // Without this a returned object comes back as a bare number and
            // every call on it has to be preceded by an explicit .as().
            const parents = this.il2CppContext ? this.il2CppContext.typeParents : null;
            let name = raw;
            for (let depth = 0; parents && depth < 32; depth++) {
                name = parents[name];
                if (!name)
                    break;
                if (this.getTypeBucket(name)) {
                    resolved = name;
                    break;
                }
            }
        }
        // A miss recorded before scriptData was materialised would stick for the
        // whole session, permanently mistyping every object of that class. Only
        // memoise a real answer, or a null the loader was actually able to reach.
        if (resolved || (this.il2CppContext && this.il2CppContext.rawScriptData))
            this._classNameCache.set(raw, resolved);
        return resolved;
    }
    // "Namespace.Name" straight off an object's Il2CppClass, whether or not the
    // type is in scriptData. classNameOf() is the scriptData-validated form;
    // this one is for identifying boxed primitives and foreign objects.
    rawClassNameOf(pointer) {
        if (!pointer || !Number.isInteger(pointer) || pointer < IL2CPP_MIN_OBJECT_ADDRESS)
            return null;
        const klass = this.il2cpp.classOfObject(pointer);
        if (!klass)
            return null;
        if (this._rawClassNameCache === undefined)
            this._rawClassNameCache = new Map();
        const cached = this._rawClassNameCache.get(klass);
        if (cached !== undefined)
            return cached;
        // Ask the runtime first — il2cpp_class_get_name/get_namespace are stable
        // across Unity versions, whereas the offsets of `name`/`namespaze` inside
        // Il2CppClass are not. The header read is only the fallback.
        let full = this.il2cpp.classFullName(klass);
        if (!full) {
            const _game = this.resolveGame();
            const heap = _game ? requireHeap("Runtime.rawClassNameOf", _game) : null;
            if (heap) {
                const view = new DataView(heap.buffer);
                if (klass + 16 <= view.byteLength) {
                    const name = readHeapCString(view, view.getUint32(klass + 8, true));
                    const namespaze = name ? readHeapCString(view, view.getUint32(klass + 12, true)) : null;
                    full = name ? (namespaze ? namespaze + "." + name : name) : null;
                }
            }
        }
        // Same rule as classNameOf: a name that couldn't be read because the
        // module wasn't up yet must be retried, not memoised.
        if (full)
            this._rawClassNameCache.set(klass, full);
        return full || null;
    }
    // "Camera" -> "UnityEngine.Camera", but only when exactly one known type has
    // that simple name. Ambiguous names resolve to nothing rather than guessing.
    simpleNameToType(simpleName) {
        if (this._simpleNameIndex === undefined) {
            const index = new Map();
            const raw = this.il2CppContext ? this.il2CppContext.rawScriptData : null;
            for (const key in raw) {
                const dot = key.lastIndexOf(".");
                const simple = dot === -1 ? key : key.slice(dot + 1);
                index.set(simple, index.has(simple) ? null : key);
            }
            // Built before scriptData existed it would be empty — and cached
            // empty, so no simple name would ever resolve again.
            if (index.size)
                this._simpleNameIndex = index;
            else
                return null;
        }
        return this._simpleNameIndex.get(simpleName) || null;
    }
    // Warns once per class when a returned object can't be typed, since the
    // symptom downstream ("x is not a function") points nowhere near the cause.
    reportUntypedObject(pointer) {
        const info = this.describeObject(pointer);
        const key = info ? info.klass : pointer;
        if (this._untypedWarned === undefined)
            this._untypedWarned = new Set();
        if (this._untypedWarned.has(key))
            return;
        this._untypedWarned.add(key);
        if (!info || !info.klass) {
            moduleLogger.warn("Could not read a class for the object at 0x%s — it may not be a managed object. " +
                "Use .as('Namespace.Type') to bind it explicitly.", (pointer >>> 0).toString(16));
            return;
        }
        moduleLogger.warn("Object at 0x%s is '%s' (name='%s', namespace='%s'), which is not in scriptData — " +
            "returning a plain ValueWrapper, so properties and methods are unavailable on it. " +
            "Add its assembly to referencedAssemblies, or bind it explicitly with " +
            ".as('%s'). Runtime.describeObject(ptr) shows what was read.", (pointer >>> 0).toString(16), info.fullName || "?", info.name || "?", info.namespace || "", info.fullName || "Namespace.Type");
    }
    // What the loader sees when it looks at an object — for working out why a
    // type didn't resolve, straight from the console.
    describeObject(pointer) {
        const value = pointer instanceof ValueWrapper ? pointer.val() : pointer;
        const _game = this.resolveGame();
        if (!_game || !value || !Number.isInteger(value))
            return null;
        const heap = requireHeap("Runtime.describeObject", _game);
        if (!heap)
            return null;
        const view = new DataView(heap.buffer);
        if (value + 4 > view.byteLength)
            return null;
        const klass = this.il2cpp.classOfObject(value);
        if (!klass || klass + 16 > view.byteLength)
            return { pointer: value, klass: klass, headerName: null, apiName: null, fullName: null, inScriptData: false };
        // Both routes, reported side by side: when they disagree, the header
        // offsets are wrong for this build and the API route is the good one.
        const headerName = (() => {
            const n = readHeapCString(view, view.getUint32(klass + 8, true));
            if (!n)
                return null;
            const ns = readHeapCString(view, view.getUint32(klass + 12, true));
            return ns ? ns + "." + n : n;
        })();
        const apiName = this.il2cpp.classFullName(klass);
        const fullName = this.rawClassNameOf(value);
        const dot = fullName ? fullName.lastIndexOf(".") : -1;
        const simple = fullName ? (dot === -1 ? fullName : fullName.slice(dot + 1)) : null;
        return {
            pointer: value,
            klass,
            headerName,
            apiName,
            fullName,
            inScriptData: !!(fullName && this.getTypeBucket(fullName)),
            simpleNameMatch: simple ? this.simpleNameToType(simple) : null,
            resolvedAs: this.classNameOf(value),
            api: {
                available: this.il2cpp.available,
                objectGetClass: this.il2cpp.fn("il2cpp_object_get_class") !== null,
                classGetName: this.il2cpp.fn("il2cpp_class_get_name") !== null,
                classGetParent: this.il2cpp.fn("il2cpp_class_get_parent") !== null,
            },
        };
    }
    // Bind a pointer to a type by name, bypassing the Il2CppClass probe.
    wrap(pointer, typeName) {
        const wrapper = pointer instanceof ValueWrapper ? pointer : new ValueWrapper(pointer);
        const resolved = typeName || this.classNameOf(wrapper.val());
        if (!resolved) {
            moduleLogger.error("Runtime.wrap: could not identify the type of 0x%s — pass one explicitly, e.g. wrap(ptr, 'UnityEngine.Camera')", (wrapper.val() >>> 0).toString(16));
            return undefined;
        }
        // `.as("Ns.Type")` is an explicit assertion, so an unindexed target is
        // worth saying out loud: the handle will report that type but behave
        // like its nearest indexed base.
        if (typeName)
            this.warnUnindexedType(typeName);
        return createInstanceProxy(this, wrapper, resolved);
    }
    // Raw per-type method map, or undefined when the type isn't in scriptData
    // at all (usually: its assembly wasn't listed in referencedAssemblies).
    getTypeBucket(targetClass) {
        const ctx = this.il2CppContext;
        if (!ctx)
            return undefined;
        // rawScriptData is the plain dictionary, and the only safe source. The
        // fallback exists for a context that has no raw copy, but ctx.scriptData
        // may be the ergonomic proxy — which answers *every* name with another
        // proxy, so using one as a bucket recurses until the stack runs out.
        const raw = ctx.rawScriptData;
        if (raw && raw[targetClass] !== undefined)
            return raw[targetClass];
        const fallback = ctx.scriptData;
        return !fallback || fallback.$proxy ? undefined : fallback[targetClass];
    }
    // The stored names for `targetMethod` on `targetClass` — the plain name plus
    // `_1`…`_N` for overloads — so a failed resolve can tell the caller what it
    // *could* have asked for. (`_0` and pointer-suffixed forms also resolve; they
    // just aren't stored.)
    listOverloads(targetClass, targetMethod) {
        const bucket = this.getTypeBucket(targetClass);
        if (!bucket)
            return [];
        const prefix = `${targetMethod}_`;
        return Object.keys(bucket).filter((k) => k === targetMethod || k.startsWith(prefix));
    }
    // Finds the overload of `base` whose table index is `wanted`. Used to honour
    // the pointer-suffixed names (`WorldToScreenPoint_7837`) the pre-rewrite
    // loader produced, without storing an alias per method at load time.
    findOverloadByTableIndex(bucket, base, wanted) {
        if (bucket[base] === wanted)
            return { index: wanted, key: base };
        const prefix = base + "_";
        for (const key in bucket) {
            if (bucket[key] === wanted && key.length > prefix.length && key.startsWith(prefix))
                return { index: wanted, key };
        }
        return null;
    }
    // Resolves a method name to `{ index, key }`, or null when nothing matches.
    // Accepts the plain name, a positional alias (`Method_0` … `Method_N`), and
    // the pointer-suffixed alias the older loader emitted (`Method_7837`).
    //
    // Memoised: a hook firing every frame can call through here, and the
    // fallback paths below do a linear scan of the type's methods.
    resolveMethodEntry(targetClass, targetMethod, overloadIndex) {
        const cacheKey = `${targetClass}::${targetMethod}#${overloadIndex !== undefined ? overloadIndex : ""}`;
        if (this._resolveCache === undefined)
            this._resolveCache = new Map();
        const cached = this._resolveCache.get(cacheKey);
        if (cached !== undefined)
            return cached;
        const resolved = this._resolveMethodEntryUncached(targetClass, targetMethod, overloadIndex);
        // Only cache once scriptData exists, so a lookup made before the context
        // is built doesn't pin a spurious miss.
        if (this.getTypeBucket(targetClass))
            this._resolveCache.set(cacheKey, resolved);
        return resolved;
    }
    _resolveMethodEntryUncached(targetClass, targetMethod, overloadIndex) {
        const bucket = this.getTypeBucket(targetClass);
        if (!bucket)
            return null;
        const tryKey = (key) => {
            const value = bucket[key];
            return typeof value === "number" && value > 0 ? { index: value, key } : null;
        };
        // An explicit overloadIndex is a precise request — don't paper over it
        // by falling back to a different overload. Overload 0 is stored under the
        // plain name, so it needs the extra hop.
        if (overloadIndex !== undefined) {
            return overloadIndex === 0
                ? tryKey(`${targetMethod}_0`) || tryKey(targetMethod)
                : tryKey(`${targetMethod}_${overloadIndex}`);
        }
        const exact = tryKey(targetMethod);
        if (exact) {
            // The plain name resolves to overload 0. Say which one got picked
            // when there is more than one, so a wrong-signature call is at
            // least traceable.
            if (bucket[`${targetMethod}_1`] !== undefined)
                moduleLogger.debug("'%s::%s' is overloaded (%s) — resolving to the first overload; " +
                    "pass overloadIndex to pick a different one", targetClass, targetMethod, this.listOverloads(targetClass, targetMethod).join(", "));
            return exact;
        }
        const suffixed = /^(.+)_(\d+)$/.exec(targetMethod);
        if (suffixed) {
            const base = suffixed[1];
            const suffix = Number(suffixed[2]);
            // `Method_7837` — the old loader's pointer-suffixed naming.
            const byTableIndex = this.findOverloadByTableIndex(bucket, base, suffix);
            if (byTableIndex)
                return byTableIndex;
            // `Method_0` on a method that isn't actually overloaded.
            const positional = tryKey(base);
            if (positional && suffix === 0)
                return positional;
            // `Method_1234` that resolved against a *different* build of the
            // game: the suffix is a stale table index, so it names nothing here.
            // Fall back to the base name rather than failing outright, but say so
            // loudly — the overload picked may not be the one intended.
            if (positional) {
                moduleLogger.warn("'%s::%s' does not exist in this build — falling back to '%s' (table index %d). " +
                    "The trailing number is a table index from a different build; use an explicit " +
                    "overloadIndex instead. Available: %s", targetClass, targetMethod, positional.key, positional.index, this.listOverloads(targetClass, base).join(", ") || "(none)");
                return positional;
            }
        }
        return null;
    }
    getTableIndex(targetClass, targetMethod, overloadIndex) {
        const entry = this.resolveMethodEntry(targetClass, targetMethod, overloadIndex);
        return entry ? entry.index : -1;
    }
    // Resolves the WASM function behind a table index, or null.
    functionAt(tableIndex, where) {
        const _game = this.resolveGame();
        if (!_game)
            return null;
        const asm = requireAsm(where, _game);
        if (!asm)
            return null;
        const tableName = this.tableName || this.resolveTableName(asm);
        const table = asm[tableName];
        if (!table || typeof table.get !== "function") {
            moduleLogger.error("%s: function table '%s' missing on Module.asm", where, tableName);
            return null;
        }
        const fn = table.get(tableIndex);
        if (typeof fn !== "function") {
            moduleLogger.error("%s: table entry %d is not a function (%s)", where, tableIndex, typeof fn);
            return null;
        }
        return fn;
    }
    // Calls an IL2CPP method by name. Instance methods take the object pointer as
    // the first argument, exactly as the compiled signature expects.
    invoke(typeName, methodName, args, overloadIndex) {
        const where = `invoke('${typeName}::${methodName}')`;
        const entry = this.resolveMethodEntry(typeName, methodName, overloadIndex);
        if (!entry) {
            if (!this.getTypeBucket(typeName)) {
                moduleLogger.error("%s: type '%s' is not in scriptData — check that its assembly is listed in referencedAssemblies", where, typeName);
            }
            else {
                const base = (/^(.+)_(\d+)$/.exec(methodName) || [])[1] || methodName;
                moduleLogger.error("%s: no such method. Known names for '%s': %s", where, base, this.listOverloads(typeName, base).join(", ") || "(none)");
            }
            return undefined;
        }
        const fn = this.functionAt(entry.index, where);
        if (!fn)
            return undefined;
        const list = args || [];
        // A method returning a value type is compiled with a hidden out-pointer
        // as its first argument and no return value at all. Calling it the
        // ordinary way passes `this` where the buffer belongs and writes the
        // struct over whatever object was in argument two — which is what the
        // hand-written `ctx.malloc(0x48)` dance used to work around.
        const sret = this.structReturnOf(typeName, entry.key, entry.index, list.length);
        const arena = this.structArena();
        const mark = arena.mark();
        try {
            const offset = sret ? 1 : 0;
            const unwrapped = new Array(list.length + offset);
            // Struct arguments cross by pointer too, so a detached copy needs an
            // address for the length of the call. Recorded so anything the
            // callee wrote through a `ref`/`out` lands back on the handle.
            let materialised = null;
            for (let i = 0; i < list.length; i++) {
                const value = list[i];
                if (isStructHandle(value)) {
                    const at = materialiseStruct(this, arena, value);
                    unwrapped[i + offset] = at;
                    if (at && value.$detached)
                        (materialised || (materialised = [])).push([value, at]);
                }
                else if (typeof value === "string") {
                    // Passed straight through, a JS string is coerced to a
                    // number at the WASM boundary and arrives as 0. Every other
                    // write path already converted; arguments did not.
                    unwrapped[i + offset] = this.plugins[0].createMstr(value)?.val();
                }
                else {
                    unwrapped[i + offset] = value instanceof ValueWrapper ? value.val() : value;
                }
            }
            if (!sret) {
                const result = new ValueWrapper(fn(...unwrapped));
                if (materialised)
                    for (const [handle, at] of materialised)
                        absorbStruct(this, handle, at);
                return result;
            }
            const size = sret.size || this.sizeOfStruct(sret.type);
            if (!size) {
                moduleLogger.error("%s returns %s by value but its size is unknown — describe it with Runtime.defineStruct('%s', { size, fields })", where, sret.type, sret.type);
                return undefined;
            }
            const out = arena.alloc(size);
            if (!out) {
                moduleLogger.error("%s: no scratch memory for the %d-byte %s it returns", where, size, sret.type);
                return undefined;
            }
            unwrapped[0] = out;
            fn(...unwrapped);
            if (materialised)
                for (const [handle, at] of materialised)
                    absorbStruct(this, handle, at);
            // Copied out before the arena unwinds: the value the caller keeps is
            // a copy, which is exactly what a by-value return is.
            return createStructValue(this, sret.type, this.memory(out, size));
        }
        catch (err) {
            // Emscripten surfaces a C++/managed exception as a bare pointer, so
            // an IL2CPP throw arrives here as a meaningless number. Say which
            // method produced it — that is the only thing that makes it
            // actionable — then rethrow, so behaviour is unchanged.
            this.reportOnce("threw:" + typeName + "::" + entry.key, "%s threw: %s", where, this.describeException(err));
            throw err;
        }
        finally {
            arena.release(mark);
        }
    }
    // Turns whatever crossed the WASM boundary into something readable. A number
    // is an Emscripten exception pointer; newer builds can decode it, and where
    // they can't the address is at least reported as one.
    describeException(err) {
        if (typeof err !== "number")
            return (err && (err.stack || err.message)) || String(err);
        const _game = this.resolveGame();
        const module = _game ? _game.Module : null;
        const decode = module && (module.getExceptionMessage || module.getCppExceptionMessage);
        if (typeof decode === "function") {
            try {
                const message = decode.call(module, err);
                if (message)
                    return `${Array.isArray(message) ? message.filter(Boolean).join(": ") : message} (native exception at 0x${(err >>> 0).toString(16)})`;
            }
            catch (nested) {
                // fall through to the address
            }
        }
        return `a native exception at 0x${(err >>> 0).toString(16)} — the game's own code threw. ` +
            "Its message is only decodable on builds that export getExceptionMessage; the method named above is where it came from";
    }
    // A managed System.String from a JS one, as a raw pointer.
    //
    // Prefers il2cpp_string_new. Where that isn't exported — which is most Unity
    // WebGL builds — it goes through Marshal.PtrToStringAnsi instead, an
    // ordinary method call that needs no C API at all. Returns 0 if neither
    // route is available.
    managedString(text) {
      return this.createMstr(text);
    }
    // The corlib entry points the no-C-API fallbacks are built on, chosen by the
    // shape of the compiled signature and, where that alone doesn't decide it,
    // the declared return type. Cached on the context because a warm cache load
    // never rebuilds the binary's type tables and so could not work them out.
    corlibKeys() {
        const ctx = this.il2CppContext;
        if (!ctx)
            return null;
        if (ctx.corlibKeys)
            return ctx.corlibKeys;
        if (!this.internalWasmTypes || !this.internalMappings || !this.internalMappings.length)
            return null;
        const pick = (typeName, base, wantStatic, test) => {
            for (const key of this.listOverloads(typeName, base)) {
                // Staticness first: `Type.GetType()` (instance, no arguments) and
                // `Type.GetType(string)` (static, one argument) are both two
                // parameters wide, and calling the first with a string passes it
                // as `this`.
                if (this.isStaticMethodKey(typeName, key) !== wantStatic)
                    continue;
                const entry = this.resolveMethodEntry(typeName, key);
                if (!entry)
                    continue;
                const signature = this.signatureOf(entry.index);
                if (signature && test(signature, this.returnTypeOf(typeName, key)))
                    return key;
            }
            return null;
        };
        // A static method compiles to (args…, methodInfo); an instance one adds
        // `this` in front. So a one-argument static is two parameters wide, and
        // so is a no-argument instance method — hence the staticness test above.
        const keys = {
            getType: pick("System.Type", "GetType", true, (s) => s.params.length === 2),
            activate: pick("System.Activator", "CreateInstance", true, (s) => s.params.length === 2),
            listAdd: pick("System.Collections.ArrayList", "Add", false, (s) => s.params.length === 3),
            // Two ToArray overloads: the bare one is declared to return
            // System.Object[] outright, the other takes the element type.
            toArray: pick("System.Collections.ArrayList", "ToArray", false, (s, r) => s.params.length === 2 && r === "System.Object[]"),
            toArrayTyped: pick("System.Collections.ArrayList", "ToArray", false, (s) => s.params.length === 3),
        };
        ctx.corlibKeys = keys;
        return keys;
    }
    // Whether a stored method key names a static method, straight out of the
    // metadata's method flags. The C API answers this too, but almost no Unity
    // WebGL build exports it — and the compiled signature cannot tell a
    // no-argument instance method from a one-argument static, since both are
    // two parameters wide.
    isStaticMethodKey(typeName, methodKey) {
        const ctx = this.il2CppContext;
        const table = ctx ? ctx.staticKeys : null;
        const keys = table ? table[typeName] : null;
        return keys ? keys.indexOf(";" + methodKey + ";") !== -1 : false;
    }
    // System.Type for a type name, memoised. Type.GetType resolves corlib types
    // by plain name; anything else needs an assembly-qualified one.
    managedType(typeName) {
        if (this._managedTypes === undefined)
            this._managedTypes = new Map();
        const cached = this._managedTypes.get(typeName);
        if (cached !== undefined)
            return cached;
        const keys = this.corlibKeys();
        if (!keys || !keys.getType)
            return 0;
        let type = 0;
        try {
            const result = this.invoke("System.Type", keys.getType, [typeName]);
            type = result ? result.val() : 0;
        }
        catch (err) {
            // Reflection by name is often stripped, and some builds do not
            // implement it at all. Report it once and stay out of the way.
            this.reportOnce("managedType", "Runtime.managedType('%s'): System.Type.GetType threw — %s. " +
                "Reflection by name is unavailable on this build, so anything built on it (managed arrays, boxing) " +
                "cannot work; the IL2CPP C API is the only route left.", typeName, this.describeException(err));
            type = 0;
        }
        if (type)
            this._managedTypes.set(typeName, type);
        return type;
    }
    // A boxed value without il2cpp_value_box: Activator.CreateInstance hands
    // back a boxed default, and the payload is written straight after the
    // object header. Reference values are already boxed and pass through.
    managedBox(value, elementType) {
        if (value === null || value === undefined)
            return 0;
        if (typeof value === "string")
            return this.managedString(value);
        if (isStructHandle(value)) {
            const bytes = value.$bytes();
            const boxed = this.managedInstance(value.$type);
            if (!boxed)
                return 0;
            const heap = requireHeap("Runtime.managedBox", this.resolveGame());
            if (heap && boxed + IL2CPP_OBJECT_HEADER + bytes.length <= heap.length)
                heap.set(bytes, boxed + IL2CPP_OBJECT_HEADER);
            return boxed;
        }
        if (value instanceof ValueWrapper)
            return value.val();
        if (typeof value === "object")
            return typeof value.$ptr === "number" ? value.$ptr : 0;
        const kind = elementType || (typeof value === "boolean" ? "bool"
            : Number.isInteger(value) ? "i32" : "f32");
        const className = IL2CPP_BOX_CLASSES[kind];
        const write = IL2CPP_ELEMENT_WRITERS[kind];
        if (!className || !write) {
            moduleLogger.error("Runtime.managedBox: cannot box a value of type '%s'", kind);
            return 0;
        }
        const boxed = this.managedInstance(className);
        if (!boxed)
            return 0;
        const view = this.il2cpp.view();
        if (!view || boxed + IL2CPP_OBJECT_HEADER + 8 > view.byteLength)
            return 0;
        write(view, boxed + IL2CPP_OBJECT_HEADER, value);
        return boxed;
    }
    // Activator.CreateInstance(Type) — allocates and runs the parameterless
    // constructor, which is il2cpp_object_new + .ctor without needing either.
    managedInstance(typeName) {
        const keys = this.corlibKeys();
        const type = this.managedType(typeName);
        if (!keys || !keys.activate || !type)
            return 0;
        const result = this.invoke("System.Activator", keys.activate, [type]);
        return result ? result.val() : 0;
    }
    // A managed array without il2cpp_array_new: fill an ArrayList and take its
    // ToArray(), which is exactly `object[]`, or ToArray(Type) for anything else.
    //
    // Every managed call here can throw — reflection is frequently stripped from
    // an IL2CPP build, and Type.GetType in particular may simply not be
    // supported. A fallback that lets that escape would abort the game frame it
    // was called from, so it is contained and reported as a plain failure.
    managedArray(elementTypeName, values) {
        try {
            return this._managedArray(elementTypeName, values);
        }
        catch (err) {
            this.reportOnce("managedArray", "Runtime.managedArray('%s'): the managed fallback threw — %s. " +
                "This build cannot build arrays by reflection; see Runtime.diagnose().", elementTypeName, this.describeException(err));
            return 0;
        }
    }
    _managedArray(elementTypeName, values) {
        const keys = this.corlibKeys();
        if (!keys || !keys.listAdd || !(keys.toArray || keys.toArrayTyped))
            return 0;
        const list = this.managedInstance("System.Collections.ArrayList");
        if (!list)
            return 0;
        // Boxing allocates, and a JS reference is invisible to the collector.
        const pinned = this.pin(list);
        try {
            for (const value of values || []) {
                const boxed = this.managedBox(value.val, value.type);
                if (this.invoke("System.Collections.ArrayList", keys.listAdd, [list, boxed]) === undefined)
                    return 0;
            }
            const objects = elementTypeName === "System.Object" && keys.toArray;
            const result = objects
                ? this.invoke("System.Collections.ArrayList", keys.toArray, [list])
                : this.invoke("System.Collections.ArrayList", keys.toArrayTyped, [list, this.managedType(elementTypeName)]);
            return result ? result.val() : 0;
        }
        finally {
            this.unpin(pinned);
        }
    }
    // One message per key, so a per-frame call site can't flood the console.
    reportOnce(key, ...message) {
        if (this._reportedOnce === undefined)
            this._reportedOnce = new Set();
        if (this._reportedOnce.has(key))
            return;
        this._reportedOnce.add(key);
        moduleLogger.error(...message);
    }
    // Scratch space for value types crossing the WASM boundary, created on first
    // use so a session that never touches a struct never allocates one.
    structArena() {
        if (this._structArena === undefined)
            this._structArena = new StructArena(this);
        return this._structArena;
    }
    // { type, size } when this method returns a value type through a hidden
    // out-pointer, else null.
    //
    // Both halves have to agree. The metadata says what the method returns; the
    // compiled signature says how. A struct small enough to come back in a
    // register (and an enum, whose storage is its integer) still declares a
    // return value, and redirecting one of those into a buffer would hand back
    // uninitialised scratch.
    structReturnOf(typeName, methodKey, tableIndex, argumentCount) {
        const info = this.declaredStructReturn(typeName, methodKey);
        if (!info)
            return null;
        const arity = this.sretArity();
        const params = arity ? arity[tableIndex] : undefined;
        // Absent means either "not lowered through an out-pointer after all"
        // (a struct small enough to come back in a register, or an enum) or
        // "the binary's type tables were never parsed". Guessing wrong writes a
        // struct over an argument, so don't guess — leave the call exactly as it
        // was before this layer existed.
        if (params === undefined)
            return null;
        // A caller that has already filled every declared parameter is using the
        // lowered form directly — `get_position(out, this, methodInfo)`, which is
        // how every pointer-era plugin calls these. Prepending a second
        // out-pointer there shifts `this` into the buffer slot, and IL2CPP then
        // dereferences a bare malloc'd buffer as an object.
        if (argumentCount !== undefined && argumentCount >= params)
            return null;
        return info;
    }
    // tableIndex -> declared parameter count, for every method the metadata says
    // returns a value type and the binary confirms returns nothing.
    //
    // Snapshotted once, for two reasons. Asking per call meant a signature
    // lookup on every `transform.position` in every frame — and on a warm cache
    // load the element table is never parsed, so each of those also logged a
    // warning. It rides along in the build cache because that table does not
    // exist on a warm load at all, and without it the value-type path would
    // quietly stop working the second time a game was opened.
    sretArity() {
        const ctx = this.il2CppContext;
        if (!ctx)
            return null;
        if (ctx.sretArity)
            return ctx.sretArity;
        // Checked before signatureOf, which warns when they are missing.
        if (!this.internalWasmTypes || !this.internalMappings || !this.internalMappings.length)
            return null;
        const table = Object.create(null);
        const returns = ctx.structReturns || EMPTY_SCRIPT_DATA;
        for (const typeName in returns) {
            for (const methodKey in returns[typeName]) {
                const entry = this.resolveMethodEntry(typeName, methodKey);
                if (!entry)
                    continue;
                const signature = this.signatureOf(entry.index);
                if (signature && signature.returnType === undefined)
                    table[entry.index] = signature.params.length;
            }
        }
        ctx.sretArity = table;
        moduleLogger.debug("Value types: %d method(s) return a struct through an out-pointer", Object.keys(table).length);
        return table;
    }
    // What the metadata says this method returns, with no regard for how it was
    // compiled. Enough to know a property's type; not enough to decide a call.
    declaredStructReturn(typeName, methodKey) {
        const ctx = this.il2CppContext;
        const table = ctx && ctx.structReturns ? ctx.structReturns[typeName] : null;
        return (table && table[methodKey]) || null;
    }
    // Declared return type of every method on a type, as a Map from the stored
    // method key. Parsed on first ask and memoised: the table is held as one
    // string per type precisely so nothing is materialised for the thousands of
    // types nobody ever inspects.
    returnTypesOf(typeName) {
        const ctx = this.il2CppContext;
        const table = ctx && ctx.returnTypes ? ctx.returnTypes : null;
        if (!table || !table.byType)
            return null;
        if (this._returnTypeCache === undefined)
            this._returnTypeCache = new Map();
        const cached = this._returnTypeCache.get(typeName);
        if (cached !== undefined)
            return cached;
        const raw = table.byType[typeName];
        let parsed = null;
        if (raw) {
            parsed = new Map();
            for (const pair of raw.split(";")) {
                // lastIndexOf: a method name can carry rendered generic
                // arguments, and only the trailing "=<id>" is the separator.
                const at = pair.lastIndexOf("=");
                if (at > 0)
                    parsed.set(pair.slice(0, at), table.names[+pair.slice(at + 1)] || null);
            }
        }
        this._returnTypeCache.set(typeName, parsed);
        return parsed;
    }
    // What one method returns, or null when the metadata never named it.
    returnTypeOf(typeName, methodKey) {
        const map = this.returnTypesOf(typeName);
        return (map && map.get(methodKey)) || null;
    }
    // Every method a type declares, with its return type and table index.
    // Overloads stay separate (`Fire`, `Fire_1`) because that is the name you
    // call by; `members()` folds them and walks the base chain instead.
    methodsOf(typeName) {
        const bucket = this.getTypeBucket(typeName);
        if (!bucket)
            return [];
        const returns = this.returnTypesOf(typeName);
        const out = [];
        for (const key in bucket)
            out.push({ name: key, returns: (returns && returns.get(key)) || null, index: bucket[key] });
        return out;
    }
    // Every value type the metadata could name, and its unboxed size.
    structTypes() {
        const ctx = this.il2CppContext;
        return ctx && ctx.structSizes ? ctx.structSizes : EMPTY_SCRIPT_DATA;
    }
    // What the value-type layer knows, and where it came from. `known: 0` means
    // no struct can be read or returned — check fieldSummary() for why, since
    // both tables come out of the same MetadataRegistration.
    structSummary() {
        const ctx = this.il2CppContext;
        const sizes = ctx && ctx.structSizes ? ctx.structSizes : null;
        const returns = ctx && ctx.structReturns ? ctx.structReturns : null;
        let methods = 0;
        for (const typeName in returns)
            methods += Object.keys(returns[typeName]).length;
        return {
            known: sizes ? Object.keys(sizes).length : 0,
            structReturningMethods: methods,
            // Whether a call can tell an sret method from an ordinary one. The
            // metadata alone is not enough: it says *what* is returned, and the
            // compiled signature says *how*.
            signaturesAvailable: !!this.internalWasmTypes,
            examples: sizes ? Object.keys(sizes).filter((n) => /^UnityEngine\.(Vector[23]|Quaternion|Color|Bounds|RaycastHit)$/.test(n))
                .map((n) => `${n} (${sizes[n]} bytes)`) : [],
        };
    }
    // The compiled WASM signature of whatever sits at a function-table slot,
    // as { params, returnType }. Read from the module's own TYPE/FUNCTION
    // sections, so it is exactly what the binary declares — no guessing at
    // whether an instance method has an implicit `this`, or how a struct
    // argument was lowered.
    signatureOf(tableIndex) {
        if (this._signatureCache === undefined)
            this._signatureCache = new Map();
        const cached = this._signatureCache.get(tableIndex);
        if (cached !== undefined)
            return cached;
        const resolved = this._signatureOfUncached(tableIndex);
        // A miss before the binary was scanned must not be pinned.
        if (resolved || this.internalWasmTypes)
            this._signatureCache.set(tableIndex, resolved);
        return resolved;
    }
    _signatureOfUncached(tableIndex) {
        const types = this.internalWasmTypes;
        const functions = this.internalWasmFunctions;
        if (!types || !functions || tableIndex === undefined || tableIndex < 0)
            return null;
        const functionIndex = this.getInternalIndex(tableIndex);
        if (functionIndex === undefined)
            return null;
        // The function index space is imports first, then the FUNCTION section.
        const defined = functionIndex - (this.internalImportFuncCount || 0);
        if (defined < 0 || defined >= functions.length)
            return null;
        const entry = functions[defined];
        const type = entry ? types[entry.funcType] : null;
        if (!type)
            return null;
        return {
            params: (type.params || []).slice(),
            // A void function is stored with returnType undefined.
            returnType: type.returnType === undefined || type.returnType === null ? undefined : type.returnType,
        };
    }
    // Element-table slot -> function index. Returns undefined rather than
    // throwing: every caller already handles a miss by skipping that one hook,
    // whereas a throw from here used to abort the entire post-instantiate pass
    // (and reject WebAssembly.instantiate) because of a single bad lookup.
    getInternalIndex(tableIndex) {
        if (!this.internalMappings || this.internalMappings.length === 0) {
            moduleLogger.warn("getInternalIndex(%d): the element table has not been parsed — this is expected on a cached build, where no hook should need it", tableIndex);
            return undefined;
        }
        const mapping = this.internalMappings[0];
        if (!mapping || !mapping.elements) {
            moduleLogger.warn("getInternalIndex(%d): internalMappings[0].elements is missing", tableIndex);
            return undefined;
        }
        return mapping.elements[tableIndex - 1];
    }
    getHookByIndex(index) {
        let totalHooksCount = 0;
        for (const plugin of this.plugins) {
            const hooksCount = plugin.hooks.length;
            // Check if the index is within the current plugin's hooks range
            if (index < totalHooksCount + hooksCount) {
                const hookIndex = index - totalHooksCount;
                return plugin.hooks[hookIndex];
            }
            totalHooksCount += hooksCount;
        }
        // If the index is out of range, return null
        return null;
    }
    getUnappliedHooks() {
        return this.plugins.flatMap((plugin) => plugin.hooks).filter((hook) => !hook.applied);
    }
}
class ModkitPlugin {
    constructor(name, version, referencedAssemblies, runtime) {
        this.onLoaded = undefined;
        this._referencedAssemblies = [];
        this._hooks = [];
        this.name = name;
        this.version = version || "1.0.0";
        this.logger = new _logger__WEBPACK_IMPORTED_MODULE_0__.Logger(name);
        this._referencedAssemblies = referencedAssemblies || [];
        this._runtime = runtime;
    }
    get hooks() {
        return this._hooks;
    }
    get referencedAssemblies() {
        return this._referencedAssemblies;
    }
    hookPrefix(target, callback) {
        return this.hook(target, callback, 0);
    }
    hookPostfix(target, callback) {
        return this.hook(target, callback, 1);
    }
    hook(target, callback, kind) {
        const hook = {
            typeName: target.typeName,
            methodName: target.methodName,
            params: target.params,
            returnType: target.returnType,
            overloadIndex: target.overloadIndex,
            applied: false,
            enabled: true,
            kind,
            callback,
        };
        this._hooks.push(hook);
        return hook;
    }
    // The ergonomic scriptData view — `plugin.scriptData.shooter.onKill(...)`.
    // Hooks registered through this view belong to *this* plugin.
    get scriptData() {
        if (!this._scriptData) {
            const runtime = this._runtime;
            this._scriptData = createScriptDataProxy(runtime, () => {
                const ctx = runtime.il2CppContext;
                return ctx ? ctx.rawScriptData : EMPTY_SCRIPT_DATA;
            }, this);
        }
        return this._scriptData;
    }
    // Building managed values to pass into the game. See Runtime for details.
    newObjectArray(values) {
        return this._runtime.newObjectArray(values);
    }
    newArray(elementTypeName, values) {
        return this._runtime.newArray(elementTypeName, values);
    }
    box(value, type) {
        return this._runtime.box(value, type);
    }
    // Value types — see Runtime for details.
    allocStruct(typeName, init) {
        return this._runtime.allocStruct(typeName, init);
    }
    struct(typeName, pointer) {
        return this._runtime.struct(typeName, pointer);
    }
    structValue(typeName, init) {
        return this._runtime.structValue(typeName, init);
    }
    withStruct(typeName, use) {
        return this._runtime.withStruct(typeName, use);
    }
    sizeOfStruct(typeName) {
        return this._runtime.sizeOfStruct(typeName);
    }
    defineStruct(typeName, descriptor) {
        return this._runtime.defineStruct(typeName, descriptor);
    }
    newString(text) {
        return this._runtime.newString(text);
    }
    pin(pointer) {
        return this._runtime.pin(pointer);
    }
    unpin(handle) {
        this._runtime.unpin(handle);
    }
    // public call(target: string, args: any[]): void;
    // public call(targetClass: string, targetMethod: string, args: any[]): void;
    call(target, targetMethodOrArgs, args) {
        var _a;
        let typeName;
        let methodName;
        let invokeArgs;
        if (typeof targetMethodOrArgs === "string") {
            typeName = target;
            methodName = targetMethodOrArgs;
            invokeArgs = args !== null && args !== void 0 ? args : [];
        }
        else {
            const sep = target.indexOf("::");
            typeName = sep === -1 ? target : target.slice(0, sep);
            methodName = sep === -1 ? "" : target.slice(sep + 2);
            invokeArgs = (_a = targetMethodOrArgs) !== null && _a !== void 0 ? _a : [];
        }
        if (!methodName) {
            moduleLogger.error("Plugin[%s].call: target '%s' has no method part — expected 'Namespace.Type::Method'", this.name, target);
            return undefined;
        }
        return this._runtime.invoke(typeName, methodName, invokeArgs);
    }
    createObject(typeInfo) {
        return new ValueWrapper(this._runtime.createObject(typeInfo));
    }
    createMstr(char) {
        const _game = this._runtime.resolveGame();
        if (!_game)
            return new ValueWrapper(0);
        const heap = requireHeap(`Plugin[${this.name}].createMstr`, _game);
        if (!heap)
            return new ValueWrapper(0);
        const charArray = new TextEncoder().encode(char);
        const nullTerminatedArray = new Uint8Array(charArray.length + 1);
        nullTerminatedArray.set(charArray);
        const charAlloc = this._runtime.malloc(nullTerminatedArray.length);
        if (charAlloc === 0) {
            moduleLogger.error("Plugin[%s].createMstr: malloc returned 0 for %d bytes", this.name, nullTerminatedArray.length);
            return new ValueWrapper(0);
        }
        try {
            (0,_utils__WEBPACK_IMPORTED_MODULE_4__.writeUint8ArrayAtOffset)(heap, nullTerminatedArray, charAlloc);
            // PtrToStringAnsi copies into a managed string; free the temporary native buffer.
            return this.call("System.Runtime.InteropServices.Marshal", "PtrToStringAnsi", [charAlloc]);
        }
        finally {
            this._runtime.free(charAlloc);
        }
    }
    slice(address, size = 256) {
        return this._runtime.memory(address, size);
    }
    malloc(size) {
        return new ValueWrapper(this._runtime.malloc(size));
    }
    free(block) {
        this._runtime.free(block);
    }
    memcpy(dest, src, count) {
        const _game = this._runtime.resolveGame();
        if (!_game)
            return;
        const heap = requireHeap(`Plugin[${this.name}].memcpy`, _game);
        if (!heap)
            return;
        (0,_utils__WEBPACK_IMPORTED_MODULE_4__.writeUint8ArrayAtOffset)(heap, this.slice(src, count), dest instanceof ValueWrapper ? dest.val() : dest);
    }
}
class ValueWrapper {
    constructor(result) {
        this._result = result;
    }
    set(value) {
        this._result = value instanceof ValueWrapper ? value.val() : value;
    }
    val() {
        return this._result;
    }
    mstr() {
        return ValueWrapper.readUtf16Char(this._result + 12);
    }
    deref() {
        var _a;
        const val = (_a = this.readField(0, "u32")) === null || _a === void 0 ? void 0 : _a.val();
        return val === undefined ? undefined : new ValueWrapper(val);
    }
    getClassName() {
        var _a;
        if (this._result === 0) {
            console.trace("[UnityWebModkit] ValueWrapper.getClassName: called on a null pointer (0)");
            return null;
        }
        const g = requireGame("ValueWrapper.getClassName");
        if (!g)
            return null;
        const heap = requireHeap("ValueWrapper.getClassName", g);
        if (!heap)
            return null;
        try {
            const classPtr = new DataView(heap.slice(this._result, this._result + 4).buffer).getUint32(0, true);
            if (classPtr === 0) {
                moduleLogger.warn("ValueWrapper.getClassName: object at 0x%s has null class pointer", this._result.toString(16));
                return null;
            }
            const classNamePtr = new DataView(heap.slice(classPtr + 8, classPtr + 12).buffer).getUint32(0, true);
            if (classNamePtr === 0) {
                moduleLogger.warn("ValueWrapper.getClassName: class at 0x%s has null name pointer", classPtr.toString(16));
                return null;
            }
            const classNameReader = new _utils_binary__WEBPACK_IMPORTED_MODULE_6__.BinaryReader(heap.slice(classNamePtr, classNamePtr + 128).buffer);
            return classNameReader.readNullTerminatedUTF8String();
        }
        catch (err) {
            moduleLogger.error("ValueWrapper.getClassName: heap read failed at 0x%s: %s", this._result.toString(16), (_a = err === null || err === void 0 ? void 0 : err.message) !== null && _a !== void 0 ? _a : err);
            return null;
        }
    }
    readField(offset, type) {
        if (this._result === 0) {
            moduleLogger.warn("ValueWrapper.readField('%s', offset=%d): called on a null pointer", type, offset);
            return undefined;
        }
        const g = requireGame("ValueWrapper.readField");
        if (!g)
            return undefined;
        const heap = requireHeap("ValueWrapper.readField", g);
        if (!heap)
            return undefined;
        const valAddress = this._result + offset;
        const valArray = heap.slice(valAddress, valAddress + 4);
        const reader = new _utils_binary__WEBPACK_IMPORTED_MODULE_6__.BinaryReader(valArray.buffer);
        switch (type) {
            case "i8":
                return new ValueWrapper(reader.readInt8());
            case "i16":
                return new ValueWrapper(reader.readInt16());
            case "i32":
                return new ValueWrapper(reader.readInt32());
            case "f32":
                return new ValueWrapper(reader.readFloat());
            case "u8":
                return new ValueWrapper(reader.readUint8());
            case "u16":
                return new ValueWrapper(reader.readUint16());
            case "u32":
                return new ValueWrapper(reader.readUint32());
            default:
                moduleLogger.error("ValueWrapper.readField: unknown type '%s' (offset=%d)", type, offset);
                return undefined;
        }
    }
    writeField(offset, type, value) {
        if (this._result === 0) {
            moduleLogger.warn("ValueWrapper.writeField('%s', offset=%d): called on a null pointer", type, offset);
            return;
        }
        const g = requireGame("ValueWrapper.writeField");
        if (!g)
            return;
        const heap = requireHeap("ValueWrapper.writeField", g);
        if (!heap)
            return;
        const size = _extras__WEBPACK_IMPORTED_MODULE_7__.dataTypeSizes[type];
        if (!size) {
            moduleLogger.error("ValueWrapper.writeField: unknown type '%s' (offset=%d) — no size in dataTypeSizes", type, offset);
            return;
        }
        const writer = new _utils_binary__WEBPACK_IMPORTED_MODULE_6__.BinaryWriter(new ArrayBuffer(size));
        if (value instanceof ValueWrapper)
            value = value.val();
        switch (type) {
            case "i8":
                writer.writeInt8(value);
                break;
            case "i16":
                writer.writeInt16(value);
                break;
            case "i32":
                writer.writeInt32(value);
                break;
            case "f32":
                writer.writeFloat(value);
                break;
            case "u8":
                writer.writeUint8(value);
                break;
            case "u16":
                writer.writeUint16(value);
                break;
            case "u32":
                writer.writeUint32(value);
                break;
            default:
                moduleLogger.error("ValueWrapper.writeField: unknown type '%s' (offset=%d)", type, offset);
                return;
        }
        (0,_utils__WEBPACK_IMPORTED_MODULE_4__.writeUint8ArrayAtOffset)(heap, writer.finalize(), this._result + offset);
    }
    // Re-read this pointer as a live object of the given type, so its C#
    // properties and instance methods become ordinary JS ones. Omit the name to
    // let it be read from the object's Il2CppClass.
    //   hook((self) => { self.as("UnityEngine.Camera").fieldOfView = 90; })
    as(typeName) {
        if (!activeRuntime) {
            moduleLogger.error("ValueWrapper.as: the runtime has not been created yet");
            return undefined;
        }
        return activeRuntime.wrap(this, typeName);
    }
    // ---- managed collections -------------------------------------------------
    //
    // All offsets below are the layouts Unity's IL2CPP emits on wasm32 (4-byte
    // pointers, 8-byte object header of klass + monitor). They are stable across
    // the Unity versions this loader supports, but every one of them can be
    // overridden through the options argument if a build differs — see the
    // `opts.*Offset` reads in each method.
    heapView(where) {
        const g = requireGame(where);
        if (!g)
            return null;
        const heap = requireHeap(where, g);
        if (!heap)
            return null;
        // Re-derived per call: growing the WASM memory detaches the old buffer.
        return new DataView(heap.buffer);
    }
    // Length-aware sibling of mstr(). System.String stores its length at +8 and
    // its UTF-16 payload at +12, so this handles embedded nulls correctly where
    // the null-terminated scan in mstr() would truncate.
    str() {
        return ValueWrapper.readManagedString(this._result);
    }
    // Element count of an Il2CppArray (max_length at +12).
    arrayLength() {
        if (this._result === 0)
            return 0;
        const view = this.heapView("ValueWrapper.arrayLength");
        if (!view || this._result + 16 > view.byteLength)
            return 0;
        return view.getUint32(this._result + 12, true);
    }
    // Element class name of a managed array — "System.Int32" for an int[],
    // "System.Object" for an object[]. Null when it can't be determined.
    elementClassName() {
        if (!activeRuntime || !this._result)
            return null;
        const api = activeRuntime.il2cpp;
        const elementClass = api.elementClassOfArray(this._result);
        return elementClass ? api.classFullName(elementClass) : null;
    }
    // The element type string array() would use for this array, worked out from
    // its own class. Lets you read an array without knowing what's in it.
    elementType() {
        const name = this.elementClassName();
        if (!name)
            return null;
        if (IL2CPP_PRIMITIVE_ELEMENTS[name])
            return IL2CPP_PRIMITIVE_ELEMENTS[name];
        if (name === "System.String")
            return "str";
        const api = activeRuntime ? activeRuntime.il2cpp : null;
        const elementClass = api ? api.elementClassOfArray(this._result) : 0;
        if (api && elementClass) {
            // An enum array stores its underlying integers inline, not references.
            const isEnum = api.fn("il2cpp_class_is_enum");
            const enumBase = api.fn("il2cpp_class_enum_basetype");
            if (isEnum && enumBase && isEnum(elementClass)) {
                const baseType = enumBase(elementClass);
                const view = api.view();
                if (baseType && view && baseType + 8 <= view.byteLength) {
                    const kind = (view.getUint32(baseType + 4, true) >>> 16) & 0xff;
                    const element = IL2CPP_KIND_TO_ELEMENT[kind];
                    if (element && element !== "obj" && element !== "str")
                        return element;
                }
                return "i32"; // enums are int-backed unless told otherwise
            }
            // Any other value type is stored inline at a size we don't know, so
            // there is no safe default — reading it as a reference would produce
            // nonsense. Say nothing and let the caller pass a descriptor.
            const isValueType = api.fn("il2cpp_class_is_valuetype");
            if (isValueType && isValueType(elementClass)) {
                moduleLogger.warn("ValueWrapper.array: '%s' is a value type stored inline; pass an explicit " +
                    "{ size, read } descriptor (or an element type) — its layout cannot be inferred", name);
                return null;
            }
        }
        // A reference: "boxed" decodes strings and boxed primitives and leaves
        // other objects wrapped.
        return "boxed";
    }
    // T[] — elements start at +16.
    //
    // With no element type given, the array's own element class decides — so
    // `array()` reads an int[] as numbers, a string[] as strings and an
    // object[] as decoded values. Falls back to raw pointers when the runtime
    // can't tell us (no il2cpp_class_get_element_class export).
    array(elementType, options) {
        const opts = options || {};
        if (elementType === undefined || elementType === "auto")
            elementType = this.elementType() || "ptr";
        const desc = il2CppElementType(elementType, "ValueWrapper.array");
        if (!desc)
            return [];
        if (this._result === 0) {
            moduleLogger.warn("ValueWrapper.array: called on a null pointer");
            return [];
        }
        const view = this.heapView("ValueWrapper.array");
        if (!view)
            return [];
        const dataOffset = opts.dataOffset !== undefined ? opts.dataOffset : 16;
        const stride = opts.stride !== undefined ? opts.stride : desc.size;
        if (this._result + dataOffset > view.byteLength) {
            moduleLogger.error("ValueWrapper.array: pointer 0x%s is outside the heap", this._result.toString(16));
            return [];
        }
        let total = view.getUint32(this._result + 12, true);
        if (total > IL2CPP_MAX_COLLECTION) {
            moduleLogger.error("ValueWrapper.array: implausible length %d at 0x%s — is this really an array?", total, this._result.toString(16));
            return [];
        }
        const start = opts.start || 0;
        const limit = opts.limit !== undefined ? opts.limit : total;
        const count = Math.max(0, Math.min(total - start, limit));
        const base = this._result + dataOffset + start * stride;
        if (base + count * stride > view.byteLength) {
            moduleLogger.error("ValueWrapper.array: %d elements from 0x%s run past the end of the heap", count, base.toString(16));
            return [];
        }
        const out = new Array(count);
        for (let i = 0; i < count; i++)
            out[i] = desc.read(view, base + i * stride);
        return out;
    }
    // List<T> — { T[] _items @8; int _size @12 }. _items is usually longer than
    // _size, so the count comes from _size.
    list(elementType, options) {
        const opts = options || {};
        if (this._result === 0) {
            moduleLogger.warn("ValueWrapper.list: called on a null pointer");
            return [];
        }
        const view = this.heapView("ValueWrapper.list");
        if (!view)
            return [];
        const itemsOffset = opts.itemsOffset !== undefined ? opts.itemsOffset : 8;
        const sizeOffset = opts.sizeOffset !== undefined ? opts.sizeOffset : 12;
        if (this._result + sizeOffset + 4 > view.byteLength)
            return [];
        const itemsPtr = view.getUint32(this._result + itemsOffset, true);
        const size = view.getInt32(this._result + sizeOffset, true);
        if (itemsPtr === 0 || size <= 0)
            return [];
        // The backing array is longer than _size, so the cap is relative to
        // `start`: without subtracting it, list(…, { start: n }) would read n
        // stale slots past the logical end.
        const start = opts.start || 0;
        const available = Math.max(0, size - start);
        const limit = opts.limit !== undefined ? Math.min(available, opts.limit) : available;
        return new ValueWrapper(itemsPtr).array(elementType, Object.assign({}, opts, { limit }));
    }
    // Dictionary<K,V> — { int[] buckets @8; Entry[] entries @12; int count @16 },
    // Entry { int hashCode; int next; K key; V value }. Entries at or past `count`
    // are untouched, and freed slots carry a negative hashCode.
    // Returns [{ key, value }] in insertion order.
    dictionary(keyType = "ptr", valueType = "ptr", options) {
        const opts = options || {};
        const kd = il2CppElementType(keyType, "ValueWrapper.dictionary(key)");
        const vd = il2CppElementType(valueType, "ValueWrapper.dictionary(value)");
        if (!kd || !vd)
            return [];
        if (this._result === 0) {
            moduleLogger.warn("ValueWrapper.dictionary: called on a null pointer");
            return [];
        }
        const view = this.heapView("ValueWrapper.dictionary");
        if (!view)
            return [];
        const entriesOffset = opts.entriesOffset !== undefined ? opts.entriesOffset : 12;
        const countOffset = opts.countOffset !== undefined ? opts.countOffset : 16;
        if (this._result + countOffset + 4 > view.byteLength)
            return [];
        const entriesPtr = view.getUint32(this._result + entriesOffset, true);
        const count = view.getInt32(this._result + countOffset, true);
        if (entriesPtr === 0 || count <= 0)
            return [];
        const keyOffset = opts.keyOffset !== undefined ? opts.keyOffset : 8;
        const valueOffset = opts.valueOffset !== undefined ? opts.valueOffset : alignUp(keyOffset + kd.size, Math.min(vd.size, 8));
        const entrySize = opts.entrySize !== undefined ? opts.entrySize : alignUp(valueOffset + vd.size, Math.max(4, Math.min(Math.max(kd.size, vd.size), 8)));
        return readIl2CppSlots(view, entriesPtr, count, entrySize, opts, (out, at) => {
            out.push({ key: kd.read(view, at + keyOffset), value: vd.read(view, at + valueOffset) });
        }, "ValueWrapper.dictionary");
    }
    // Same as dictionary(), collapsed into a plain object. Only useful when the
    // keys stringify sensibly (strings, numbers, enums).
    dictionaryObject(keyType = "str", valueType = "ptr", options) {
        const out = Object.create(null);
        for (const pair of this.dictionary(keyType, valueType, options))
            out[pair.key instanceof ValueWrapper ? pair.key.val() : pair.key] = pair.value;
        return out;
    }
    // HashSet<T> — { int[] buckets @8; Slot[] slots @12; int count @16;
    // int lastIndex @20 }, Slot { int hashCode; int next; T value }. Iteration
    // runs to lastIndex, not count, because freed slots leave holes.
    hashSet(elementType = "ptr", options) {
        const opts = options || {};
        const desc = il2CppElementType(elementType, "ValueWrapper.hashSet");
        if (!desc)
            return [];
        if (this._result === 0) {
            moduleLogger.warn("ValueWrapper.hashSet: called on a null pointer");
            return [];
        }
        const view = this.heapView("ValueWrapper.hashSet");
        if (!view)
            return [];
        const slotsOffset = opts.slotsOffset !== undefined ? opts.slotsOffset : 12;
        const lastIndexOffset = opts.lastIndexOffset !== undefined ? opts.lastIndexOffset : 20;
        if (this._result + lastIndexOffset + 4 > view.byteLength)
            return [];
        const slotsPtr = view.getUint32(this._result + slotsOffset, true);
        const lastIndex = view.getInt32(this._result + lastIndexOffset, true);
        if (slotsPtr === 0 || lastIndex <= 0)
            return [];
        const valueOffset = opts.valueOffset !== undefined ? opts.valueOffset : 8;
        const slotSize = opts.entrySize !== undefined ? opts.entrySize : alignUp(valueOffset + desc.size, Math.max(4, Math.min(desc.size, 8)));
        return readIl2CppSlots(view, slotsPtr, lastIndex, slotSize, opts, (out, at) => {
            out.push(desc.read(view, at + valueOffset));
        }, "ValueWrapper.hashSet");
    }
    // System.Collections.Hashtable (and anything deriving from it, such as
    // ExitGames.Client.Photon.Hashtable).
    //
    // Two layouts exist in the wild and both are handled, because the field
    // offsets are resolved *by name* through the IL2CPP runtime rather than
    // hard-coded:
    //   CoreFX / .NET Framework  `_buckets` (or `buckets`) of
    //                            struct bucket { object key; object val; int hash_coll }  — 12 bytes
    //   Mono                     `table` of struct Slot { object key; object value }      — 8 bytes
    // Both put key at +0 and value at +4, so only the stride differs.
    //
    // Keys and values are `object`, so they arrive boxed; the default "boxed"
    // element type decodes them to plain JS values.
    // Returns [{ key, value }].
    hashtable(keyType = "boxed", valueType = "boxed", options) {
        const opts = options || {};
        const kd = il2CppElementType(keyType, "ValueWrapper.hashtable(key)");
        const vd = il2CppElementType(valueType, "ValueWrapper.hashtable(value)");
        if (!kd || !vd)
            return [];
        if (this._result === 0) {
            moduleLogger.warn("ValueWrapper.hashtable: called on a null pointer");
            return [];
        }
        const api = activeRuntime ? activeRuntime.il2cpp : null;
        let bucketsOffset = opts.bucketsOffset;
        let stride = opts.stride;
        if (bucketsOffset === undefined && api) {
            for (const candidate of [["_buckets", 12], ["buckets", 12], ["table", 8]]) {
                const offset = api.offsetOfObjectField(this._result, candidate[0]);
                if (offset) {
                    bucketsOffset = offset;
                    if (stride === undefined)
                        stride = candidate[1];
                    break;
                }
            }
        }
        // Only now: resolving the field above goes through malloc/free, and a
        // heap growth would have detached a view taken earlier.
        const view = this.heapView("ValueWrapper.hashtable");
        if (!view)
            return [];
        if (bucketsOffset !== undefined && stride === undefined) {
            // Caller pinned the field but not the layout: assume the CoreFX
            // 12-byte bucket. Leaving it undefined made every subsequent offset
            // NaN, which slipped past the bounds checks and read from 0.
            stride = 12;
        }
        if (bucketsOffset === undefined) {
            // No IL2CPP C API to ask — fall back to the common CoreFX layout.
            moduleLogger.warn("ValueWrapper.hashtable: could not resolve the bucket field by name " +
                "(is the il2cpp C API exported?) — assuming the default layout. " +
                "Pass { bucketsOffset, stride } if this build differs.");
            bucketsOffset = 8;
            stride = stride === undefined ? 12 : stride;
        }
        if (this._result + bucketsOffset + 4 > view.byteLength)
            return [];
        const bucketsPtr = view.getUint32(this._result + bucketsOffset, true);
        if (!bucketsPtr || bucketsPtr + 16 > view.byteLength)
            return [];
        const capacity = view.getUint32(bucketsPtr + 12, true);
        if (capacity > IL2CPP_MAX_COLLECTION) {
            moduleLogger.error("ValueWrapper.hashtable: implausible bucket count %d — check the layout offsets", capacity);
            return [];
        }
        const data = bucketsPtr + (opts.dataOffset !== undefined ? opts.dataOffset : 16);
        if (data + capacity * stride > view.byteLength) {
            moduleLogger.error("ValueWrapper.hashtable: %d buckets of %d bytes run past the end of the heap", capacity, stride);
            return [];
        }
        const limit = opts.limit !== undefined ? opts.limit : Infinity;
        const out = [];
        for (let i = 0; i < capacity && out.length < limit; i++) {
            const at = data + i * stride;
            const keyPtr = view.getUint32(at, true);
            // An empty bucket has a null key; a removed one is tombstoned by
            // pointing its key at the bucket array itself.
            if (!keyPtr || keyPtr === bucketsPtr)
                continue;
            out.push({ key: kd.read(view, at), value: vd.read(view, at + 4) });
        }
        return out;
    }
    // Same as hashtable(), collapsed into a plain object.
    hashtableObject(keyType = "boxed", valueType = "boxed", options) {
        const out = Object.create(null);
        for (const pair of this.hashtable(keyType, valueType, options))
            out[pair.key instanceof ValueWrapper ? pair.key.val() : pair.key] = pair.value;
        return out;
    }
    // Length-aware System.String read: length at +8, UTF-16 payload at +12.
    static readManagedString(ptr) {
        if (ptr === 0)
            return "";
        const g = requireGame("ValueWrapper.readManagedString");
        if (!g)
            return "";
        const heap = requireHeap("ValueWrapper.readManagedString", g);
        if (!heap)
            return "";
        const view = new DataView(heap.buffer);
        if (ptr + 12 > view.byteLength)
            return "";
        const length = view.getInt32(ptr + 8, true);
        if (length < 0 || length > 0x00ffffff || ptr + 12 + length * 2 > view.byteLength) {
            // Not a plausible string — fall back to the terminator scan.
            return ValueWrapper.readUtf16Char(ptr + 12);
        }
        return new TextDecoder("utf-16le").decode(new Uint8Array(heap.buffer, ptr + 12, length * 2));
    }
    static readUtf16Char(ptr) {
        if (ptr === 0) {
            moduleLogger.warn("ValueWrapper.mstr/readUtf16Char: called on a null pointer (0)");
            return "";
        }
        const g = requireGame("ValueWrapper.readUtf16Char");
        if (!g)
            return "";
        const heap = requireHeap("ValueWrapper.readUtf16Char", g);
        if (!heap)
            return "";
        if (ptr & 1) {
            moduleLogger.warn("ValueWrapper.readUtf16Char: 0x%s is not 2-byte aligned; a UTF-16 read from here " +
                "would scan past the terminator and decode garbage", ptr.toString(16));
            return "";
        }
        const buffer = new Uint16Array(heap.buffer);
        let offset = ptr / 2; // divide by 2 to convert from byte offset to character offset
        const start = offset;
        // Cap the scan so a corrupt pointer or unterminated string can't walk the entire heap.
        const MAX_CHARS = 1 << 16;
        const limit = Math.min(buffer.length, start + MAX_CHARS);
        while (offset < limit && buffer[offset] !== 0)
            offset++;
        const decoder = new TextDecoder("utf-16le");
        return decoder.decode(buffer.subarray(start, offset));
    }
}


/***/ }),

/***/ "./src/utils/binary/index.ts":
/*!***********************************!*\
  !*** ./src/utils/binary/index.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BinaryReader: () => (/* binding */ BinaryReader),
/* harmony export */   BinaryWriter: () => (/* binding */ BinaryWriter)
/* harmony export */ });
class BinaryReader {
    constructor(arrayBuffer, littleEndian = true) {
        this._view = new DataView(arrayBuffer);
        this._buffer = arrayBuffer;
        this._bytes = new Uint8Array(arrayBuffer);
        this._offset = 0;
        this._littleEndian = littleEndian;
        this._utf8decoder = new TextDecoder("utf-8");
    }
    get offset() {
        return this._offset;
    }
    get buffer() {
        return this._buffer;
    }
    seek(offset) {
        if (offset < 0 || offset > this._buffer.byteLength) {
            // Don't throw — some call sites speculatively seek; just log so a malformed
            // metadata/WASM produces a useful breadcrumb instead of a downstream NaN.
            console.warn(`[UnityWebModkit] BinaryReader.seek(${offset}) out of range (buffer length ${this._buffer.byteLength})`);
        }
        this._offset = offset;
    }
    readNullTerminatedUTF8String() {
        const bytes = this._bytes;
        const startOffset = this._offset;
        let off = startOffset;
        const limit = bytes.length;
        while (off < limit && bytes[off] !== 0)
            off++;
        if (off >= limit) {
            console.warn(`[UnityWebModkit] BinaryReader.readNullTerminatedUTF8String: walked to end of buffer without finding null terminator (start=${startOffset})`);
        }
        this._offset = off + 1; // consume null terminator
        // IL2CPP type and method names are ASCII in practice, and this runs
        // ~100k+ times per load. TextDecoder's fixed per-call cost dominates for
        // strings this short, so take the pure-ASCII case directly. The length
        // bound keeps fromCharCode.apply off its argument-count limit.
        const len = off - startOffset;
        if (len <= 1024) {
            let ascii = true;
            for (let i = startOffset; i < off; i++) {
                if (bytes[i] > 0x7f) {
                    ascii = false;
                    break;
                }
            }
            if (ascii)
                return String.fromCharCode.apply(null, bytes.subarray(startOffset, off));
        }
        return this._utf8decoder.decode(bytes.subarray(startOffset, off));
    }
    readUTF8StringWithLength() {
        const stringLength = this.readUint32();
        const start = this._offset;
        this._offset = start + stringLength;
        return this._utf8decoder.decode(this._bytes.subarray(start, this._offset));
    }
    readUint8() {
        const value = this._view.getUint8(this._offset);
        this._offset++;
        return value;
    }
    readInt8() {
        const value = this._view.getInt8(this._offset);
        this._offset++;
        return value;
    }
    readUint16() {
        const value = this._view.getUint16(this._offset, this._littleEndian);
        this._offset += 2;
        return value;
    }
    readInt16() {
        const value = this._view.getInt16(this._offset, this._littleEndian);
        this._offset += 2;
        return value;
    }
    readInt32() {
        const value = this._view.getInt32(this._offset, this._littleEndian);
        this._offset += 4;
        return value;
    }
    readUint32() {
        const value = this._view.getUint32(this._offset, this._littleEndian);
        this._offset += 4;
        return value;
    }
    readIndex(size) {
        if (size === 1)
            return this.readUint8();
        if (size === 2)
            return this.readUint16();
        return this.readInt32(); // 4
    }
    readFloat() {
        const value = this._view.getFloat32(this._offset, this._littleEndian);
        this._offset += 4;
        return value;
    }
    readULEB128() {
        let result = 0;
        let shift = 0;
        let byte;
        do {
            byte = this.readUint8();
            result |= (byte & 0x7f) << shift;
            shift += 7;
        } while (byte & 0x80);
        return result;
    }
    readUint8Array(length) {
        // Copy once into a freshly-owned buffer. The previous version sliced the
        // underlying ArrayBuffer and then wrapped the resulting buffer in a
        // Uint8Array, allocating twice.
        const out = new Uint8Array(this._buffer, this._offset, length).slice();
        this._offset += length;
        return out;
    }
    // Returns a NON-OWNING view into the underlying buffer. The caller must not
    // hold the result past the buffer's lifetime, and must not mutate the source.
    // Use when you'll immediately copy out with .set() — avoids the temporary
    // allocation that readUint8Array makes.
    readUint8ArrayView(length) {
        const out = new Uint8Array(this._buffer, this._offset, length);
        this._offset += length;
        return out;
    }
    readSlice(offset, length) {
        return this._buffer.slice(offset, offset + length);
    }
}
class BinaryWriter {
    constructor(buffer, littleEndian = true) {
        this._view = new DataView(buffer);
        this._offset = 0;
        this._littleEndian = littleEndian;
    }
    seek(offset) {
        if (offset >= 0 && offset < this._view.byteLength) {
            this._offset = offset;
        }
        else {
            throw new Error("Invalid offset value.");
        }
    }
    writeUint8(value) {
        if (this._offset < this._view.byteLength) {
            this._view.setUint8(this._offset, value);
            this._offset += 1;
        }
        else {
            throw new Error("Buffer overflow: Cannot write beyond the ArrayBuffer length.");
        }
    }
    writeInt8(value) {
        if (this._offset < this._view.byteLength) {
            this._view.setInt8(this._offset, value);
            this._offset += 1;
        }
        else {
            throw new Error("Buffer overflow: Cannot write beyond the ArrayBuffer length.");
        }
    }
    writeUint16(value) {
        if (this._offset < this._view.byteLength) {
            this._view.setUint16(this._offset, value, this._littleEndian);
            this._offset += 2;
        }
        else {
            throw new Error("Buffer overflow: Cannot write beyond the ArrayBuffer length.");
        }
    }
    writeInt16(value) {
        if (this._offset < this._view.byteLength) {
            this._view.setInt16(this._offset, value, this._littleEndian);
            this._offset += 2;
        }
        else {
            throw new Error("Buffer overflow: Cannot write beyond the ArrayBuffer length.");
        }
    }
    writeInt32(value) {
        if (this._offset < this._view.byteLength) {
            this._view.setInt32(this._offset, value, this._littleEndian);
            this._offset += 4;
        }
        else {
            throw new Error("Buffer overflow: Cannot write beyond the ArrayBuffer length.");
        }
    }
    writeUint32(value) {
        if (this._offset < this._view.byteLength) {
            this._view.setUint32(this._offset, value, this._littleEndian);
            this._offset += 4;
        }
        else {
            throw new Error("Buffer overflow: Cannot write beyond the ArrayBuffer length.");
        }
    }
    writeFloat(value) {
        if (this._offset < this._view.byteLength) {
            this._view.setFloat32(this._offset, value, this._littleEndian);
            this._offset += 4;
        }
        else {
            throw new Error("Buffer overflow: Cannot write beyond the ArrayBuffer length.");
        }
    }
    writeBytes(bytes) {
        const src = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
        if (this._offset + src.length > this._view.byteLength) {
            throw new Error("Buffer overflow: Cannot write beyond the ArrayBuffer length.");
        }
        // Bulk-copy via the typed-array set() — orders of magnitude faster than
        // the previous per-byte setUint8 loop when writing multi-MB data sections.
        new Uint8Array(this._view.buffer, this._view.byteOffset, this._view.byteLength).set(src, this._offset);
        this._offset += src.length;
    }
    finalize() {
        return new Uint8Array(this._view.buffer);
    }
}


/***/ }),

/***/ "./src/utils/index.ts":
/*!****************************!*\
  !*** ./src/utils/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   makeId: () => (/* binding */ makeId),
/* harmony export */   patternSearch: () => (/* binding */ patternSearch),
/* harmony export */   waitFor: () => (/* binding */ waitFor),
/* harmony export */   writeUint8ArrayAtOffset: () => (/* binding */ writeUint8ArrayAtOffset)
/* harmony export */ });
/* unused harmony exports concatenateUint8Arrays, uint8ArrayStartsWith, bufToHex */
function waitFor(conditionFunction, timeoutMs = 60000, intervalMs = 400) {
    // Fast path: synchronous resolution. No promise allocation overhead avoided
    // (we still return a Promise), but we skip the setTimeout / pagehide
    // listener / Date.now bookkeeping that the polling path needs. Hook
    // callbacks call this on every fire, so this matters.
    try {
        if (conditionFunction())
            return Promise.resolve();
    }
    catch (err) {
        return Promise.reject(err);
    }
    return new Promise((resolve, reject) => {
        const startedAt = Date.now();
        let timerId;
        let cleanup;
        const finish = () => {
            if (cleanup && typeof window !== "undefined") {
                window.removeEventListener("pagehide", cleanup);
            }
        };
        const poll = () => {
            try {
                if (conditionFunction()) {
                    finish();
                    resolve();
                    return;
                }
            }
            catch (err) {
                finish();
                reject(err);
                return;
            }
            if (Date.now() - startedAt >= timeoutMs) {
                finish();
                reject(new Error(`waitFor: condition not met within ${timeoutMs}ms`));
                return;
            }
            timerId = setTimeout(poll, intervalMs);
        };
        // Only register a pagehide cleanup when we have a timer to clean up.
        if (typeof window !== "undefined") {
            cleanup = () => {
                if (timerId !== undefined)
                    clearTimeout(timerId);
            };
            window.addEventListener("pagehide", cleanup, { once: true });
        }
        poll();
    });
}
function makeId(length) {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
function patternSearch(mainArray, subArray) {
    const indexes = [];
    const patLen = subArray.length;
    if (patLen === 0)
        return indexes;
    const mainLen = mainArray.length;
    // Typed arrays get a native indexOf, which scans for the first byte roughly
    // an order of magnitude faster than the per-byte JS comparison loop the KMP
    // implementation used. Candidates are then confirmed with a short memcmp.
    // Over a multi-megabyte data segment that difference is most of this call.
    if (typeof mainArray.indexOf === "function" && ArrayBuffer.isView(mainArray)) {
        const first = subArray[0];
        const last = mainLen - patLen;
        let i = 0;
        while (i <= last) {
            const at = mainArray.indexOf(first, i);
            if (at === -1 || at > last)
                break;
            let k = 1;
            while (k < patLen && mainArray[at + k] === subArray[k])
                k++;
            if (k === patLen)
                indexes.push(at);
            // Advance by one so overlapping occurrences are still reported,
            // matching the KMP behaviour this replaced.
            i = at + 1;
        }
        return indexes;
    }
    const lps = generateLPSArray(subArray);
    let i = 0;
    let j = 0;
    while (i < mainLen) {
        if (mainArray[i] === subArray[j]) {
            i++;
            j++;
        }
        if (j === patLen) {
            indexes.push(i - j);
            j = lps[j - 1];
        }
        else if (i < mainLen && mainArray[i] !== subArray[j]) {
            if (j !== 0) {
                j = lps[j - 1];
            }
            else {
                i++;
            }
        }
    }
    return indexes;
}
function concatenateUint8Arrays(arrays) {
    // Calculate the total length of the concatenated array
    let totalLength = 0;
    arrays.forEach((array) => {
        totalLength += array.length;
    });
    // Create a new Uint8Array with the total length
    const concatenatedArray = new Uint8Array(totalLength);
    // Use the set() method to copy the contents of each Uint8Array into the concatenated array
    let offset = 0;
    arrays.forEach((array) => {
        concatenatedArray.set(array, offset);
        offset += array.length;
    });
    return concatenatedArray;
}
function uint8ArrayStartsWith(array, expectedNumbers) {
    if (array.length < expectedNumbers.length) {
        return false;
    }
    for (let i = 0; i < expectedNumbers.length; i++) {
        if (array[i] !== expectedNumbers[i]) {
            return false;
        }
    }
    return true;
}
function writeUint8ArrayAtOffset(destination, source, offset) {
    if (offset + source.length > destination.length) {
        throw new Error("Source array does not fit at the specified offset in the destination array.");
    }
    for (let i = 0; i < source.length; i++) {
        destination[offset + i] = source[i];
    }
}
function bufToHex(buffer) {
    return [...new Uint8Array(buffer)].map((x) => x.toString(16).padStart(2, "0")).join("");
}
function generateLPSArray(pattern) {
    const lps = [];
    lps[0] = 0;
    let len = 0;
    let i = 1;
    while (i < pattern.length) {
        if (pattern[i] === pattern[len]) {
            len++;
            lps[i] = len;
            i++;
        }
        else {
            if (len !== 0) {
                len = lps[len - 1];
            }
            else {
                lps[i] = 0;
                i++;
            }
        }
    }
    return lps;
}


/***/ }),

/***/ "./src/web-data/index.ts":
/*!*******************************!*\
  !*** ./src/web-data/index.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WebData: () => (/* binding */ WebData)
/* harmony export */ });
/* harmony import */ var _utils_binary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/binary */ "./src/utils/binary/index.ts");

class WebData {
    constructor(buffer, resolvableNodes) {
        var _a;
        this.nodes = [];
        if (!buffer || buffer.byteLength === 0) {
            console.error("[UnityWebModkit] WebData: buffer is empty/null — Unity .data file failed to load");
            this.signature = "";
            this.headLen = 0;
            return;
        }
        const reader = new _utils_binary__WEBPACK_IMPORTED_MODULE_0__.BinaryReader(buffer);
        this.signature = reader.readNullTerminatedUTF8String();
        this.headLen = reader.readUint32();
        if (this.headLen > buffer.byteLength) {
            console.error("[UnityWebModkit] WebData: headLen %d > buffer length %d — file is truncated or malformed", this.headLen, buffer.byteLength);
            this.headLen = buffer.byteLength;
        }
        while (reader.offset < this.headLen) {
            // Each entry is 3 uint32s plus the name. Stop cleanly if the prefix
            // we were given ends mid-entry rather than throwing out of DataView.
            if (reader.offset + 12 > buffer.byteLength)
                break;
            const node = {
                offset: reader.readUint32(),
                size: reader.readUint32(),
                name: reader.readUTF8StringWithLength(),
            };
            if (reader.offset > buffer.byteLength)
                break;
            const resolvableNode = resolvableNodes === null || resolvableNodes === void 0 ? void 0 : resolvableNodes.find((item) => item[0] === node.name);
            if (!resolvableNode)
                continue;
            node.size = (_a = resolvableNode[1]) !== null && _a !== void 0 ? _a : node.size;
            this.nodes.push(node);
        }
        for (const node of this.nodes) {
            if (node.offset + node.size > buffer.byteLength) {
                console.error("[UnityWebModkit] WebData: node '%s' offset+size (%d) overflows buffer length (%d)", node.name, node.offset + node.size, buffer.byteLength);
                continue;
            }
            node.data = reader.readSlice(node.offset, node.size);
        }
        this.resolveUnityVersion(reader);
    }
    getNode(name) {
        return this.nodes.find((n) => n.name === name);
    }
    resolveUnityVersion(reader) {
        const dataUnity3dNode = this.getNode("data.unity3d");
        if (!dataUnity3dNode || !dataUnity3dNode.data)
            return;
        const dataUnity3dReader = new _utils_binary__WEBPACK_IMPORTED_MODULE_0__.BinaryReader(dataUnity3dNode.data);
        dataUnity3dReader.seek(18);
        this.unityVersion = dataUnity3dReader.readNullTerminatedUTF8String();
    }
}


/***/ }),

/***/ "./src/wail/index.js":
/*!***************************!*\
  !*** ./src/wail/index.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SECTION_ELEMENT: () => (/* binding */ SECTION_ELEMENT),
/* harmony export */   SECTION_FUNCTION: () => (/* binding */ SECTION_FUNCTION),
/* harmony export */   SECTION_IMPORT: () => (/* binding */ SECTION_IMPORT),
/* harmony export */   SECTION_TYPE: () => (/* binding */ SECTION_TYPE),
/* harmony export */   WailParser: () => (/* binding */ WailParser)
/* harmony export */ });
/* unused harmony exports SECTION_CODE, OP_CALL, VarUint32ToArray, WailVariable, BufferReader */
/**
Copyright 2019 Jack Baker

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/**
 * @ignore
 */
const SECTION_CUSTOM = 0;
const SECTION_TYPE = 1;
const SECTION_IMPORT = 2;
const SECTION_FUNCTION = 3;
const SECTION_TABLE = 4;
const SECTION_MEMORY = 5;
const SECTION_GLOBAL = 6;
const SECTION_EXPORT = 7;
const SECTION_START = 8;
const SECTION_ELEMENT = 9;
const SECTION_CODE = 10;
const SECTION_DATA = 11;
const SECTION_DATACOUNT = 12;
const SECTION_TAG = 13;
const MAX_SECTION_ID = 13;

const KIND_FUNC = 0x00;
const KIND_TABLE = 0x01;
const KIND_MEMORY = 0x02;
const KIND_GLOBAL = 0x03;
const KIND_TAG = 0x04;

const kindStr = {
  func: KIND_FUNC,
  table: KIND_TABLE,
  memory: KIND_MEMORY,
  global: KIND_GLOBAL,
  tag: KIND_TAG,
};
// inverse
Object.entries(kindStr).forEach(([str, code]) => (kindStr[code] = str));

const convertKind = function (string) {
  const kindVal = kindStr[string];

  if (typeof kindVal === "undefined") {
    throw new Error("Invalid kind " + string);
  }

  return kindVal;
};

const VALUE_TYPE_I32 = 0x7f;
const VALUE_TYPE_I64 = 0x7e;
const VALUE_TYPE_F32 = 0x7d;
const VALUE_TYPE_F64 = 0x7c;
const VALUE_TYPE_ANYFUNC = 0x70;
const VALUE_TYPE_FUNC = 0x60;
const VALUE_TYPE_BLOCK = 0x40;

const valueTypeStr = {
  i32: VALUE_TYPE_I32,
  i64: VALUE_TYPE_I64,
  f32: VALUE_TYPE_F32,
  f64: VALUE_TYPE_F64,
  anyfunc: VALUE_TYPE_ANYFUNC,
  func: VALUE_TYPE_FUNC,
  block: VALUE_TYPE_BLOCK,
};

Object.entries(valueTypeStr).forEach(([str, code]) => (valueTypeStr[code] = str));

const convertValueType = function (string) {
  const typeVal = valueTypeStr[string];

  if (typeof typeVal === "undefined") {
    throw new Error("Invalid value type " + string);
  }

  return typeVal;
};

const OP_UNREACHABLE = 0x00;
const OP_NOP = 0x01;
const OP_BLOCK = 0x02;
const OP_LOOP = 0x03;
const OP_IF = 0x04;
const OP_ELSE = 0x05;
const OP_THROW = 0x08;
const OP_THROW_REF = 0x0a;
const OP_END = 0x0b;
const OP_BR = 0x0c;
const OP_BR_IF = 0x0d;
const OP_BR_TABLE = 0x0e;
const OP_RETURN = 0x0f;
const OP_CALL = 0x10;
const OP_CALL_INDIRECT = 0x11;
const OP_DROP = 0x1a;
const OP_SELECT = 0x1b;
const OP_TRY_TABLE = 0x1f;
const OP_GET_LOCAL = 0x20;
const OP_SET_LOCAL = 0x21;
const OP_TEE_LOCAL = 0x22;
const OP_GET_GLOBAL = 0x23;
const OP_SET_GLOBAL = 0x24;
const OP_I32_LOAD = 0x28;
const OP_I64_LOAD = 0x29;
const OP_F32_LOAD = 0x2a;
const OP_F64_LOAD = 0x2b;
const OP_I32_LOAD8_S = 0x2c;
const OP_I32_LOAD8_U = 0x2d;
const OP_I32_LOAD16_S = 0x2e;
const OP_I32_LOAD16_U = 0x2f;
const OP_I64_LOAD8_S = 0x30;
const OP_I64_LOAD8_U = 0x31;
const OP_I64_LOAD16_S = 0x32;
const OP_I64_LOAD16_U = 0x33;
const OP_I64_LOAD32_S = 0x34;
const OP_I64_LOAD32_U = 0x35;
const OP_I32_STORE = 0x36;
const OP_I64_STORE = 0x37;
const OP_F32_STORE = 0x38;
const OP_F64_STORE = 0x39;
const OP_I32_STORE8 = 0x3a;
const OP_I32_STORE16 = 0x3b;
const OP_I64_STORE8 = 0x3c;
const OP_I64_STORE16 = 0x3d;
const OP_I64_STORE32 = 0x3e;
const OP_MEMORY_SIZE = 0x3f;
const OP_MEMORY_GROW = 0x40;
const OP_I32_CONST = 0x41;
const OP_I64_CONST = 0x42;
const OP_F32_CONST = 0x43;
const OP_F64_CONST = 0x44;
const OP_I32_EQZ = 0x45;
const OP_I32_EQ = 0x46;
const OP_I32_NE = 0x47;
const OP_I32_LT_S = 0x48;
const OP_I32_LT_U = 0x49;
const OP_I32_GT_S = 0x4a;
const OP_I32_GT_U = 0x4b;
const OP_I32_LE_S = 0x4c;
const OP_I32_LE_U = 0x4d;
const OP_I32_GE_S = 0x4e;
const OP_I32_GE_U = 0x4f;
const OP_I64_EQZ = 0x50;
const OP_I64_EQ = 0x51;
const OP_I64_NE = 0x52;
const OP_I64_LT_S = 0x53;
const OP_I64_LT_U = 0x54;
const OP_I64_GT_S = 0x55;
const OP_I64_GT_U = 0x56;
const OP_I64_LE_S = 0x57;
const OP_I64_LE_U = 0x58;
const OP_I64_GE_S = 0x59;
const OP_I64_GE_U = 0x5a;
const OP_F32_EQ = 0x5b;
const OP_F32_NE = 0x5c;
const OP_F32_LT = 0x5d;
const OP_F32_GT = 0x5e;
const OP_F32_LE = 0x5f;
const OP_F32_GE = 0x60;
const OP_F64_EQ = 0x61;
const OP_F64_NE = 0x62;
const OP_F64_LT = 0x63;
const OP_F64_GT = 0x64;
const OP_F64_LE = 0x65;
const OP_F64_GE = 0x66;
const OP_I32_CLZ = 0x67;
const OP_I32_CTZ = 0x68;
const OP_I32_POPCNT = 0x69;
const OP_I32_ADD = 0x6a;
const OP_I32_SUB = 0x6b;
const OP_I32_MUL = 0x6c;
const OP_I32_DIV_S = 0x6d;
const OP_I32_DIV_U = 0x6e;
const OP_I32_REM_S = 0x6f;
const OP_I32_REM_U = 0x70;
const OP_I32_AND = 0x71;
const OP_I32_OR = 0x72;
const OP_I32_XOR = 0x73;
const OP_I32_SHL = 0x74;
const OP_I32_SHR_S = 0x75;
const OP_I32_SHR_U = 0x76;
const OP_I32_ROTL = 0x77;
const OP_I32_ROTR = 0x78;
const OP_I64_CLZ = 0x79;
const OP_I64_CTZ = 0x7a;
const OP_I64_POPCNT = 0x7b;
const OP_I64_ADD = 0x7c;
const OP_I64_SUB = 0x7d;
const OP_I64_MUL = 0x7e;
const OP_I64_DIV_S = 0x7f;
const OP_I64_DIV_U = 0x80;
const OP_I64_REM_S = 0x81;
const OP_I64_REM_U = 0x82;
const OP_I64_AND = 0x83;
const OP_I64_OR = 0x84;
const OP_I64_XOR = 0x85;
const OP_I64_SHL = 0x86;
const OP_I64_SHR_S = 0x87;
const OP_I64_SHR_U = 0x88;
const OP_I64_ROTL = 0x89;
const OP_I64_ROTR = 0x8a;
const OP_F32_ABS = 0x8b;
const OP_F32_NEG = 0x8c;
const OP_F32_CEIL = 0x8d;
const OP_F32_FLOOR = 0x8e;
const OP_F32_TRUNC = 0x8f;
const OP_F32_NEAREST = 0x90;
const OP_F32_SQRT = 0x91;
const OP_F32_ADD = 0x92;
const OP_F32_SUB = 0x93;
const OP_F32_MUL = 0x94;
const OP_F32_DIV = 0x95;
const OP_F32_MIN = 0x96;
const OP_F32_MAX = 0x97;
const OP_F32_COPYSIGN = 0x98;
const OP_F64_ABS = 0x99;
const OP_F64_NEG = 0x9a;
const OP_F64_CEIL = 0x9b;
const OP_F64_FLOOR = 0x9c;
const OP_F64_TRUNC = 0x9d;
const OP_F64_NEAREST = 0x9e;
const OP_F64_SQRT = 0x9f;
const OP_F64_ADD = 0xa0;
const OP_F64_SUB = 0xa1;
const OP_F64_MUL = 0xa2;
const OP_F64_DIV = 0xa3;
const OP_F64_MIN = 0xa4;
const OP_F64_MAX = 0xa5;
const OP_F64_COPYSIGN = 0xa6;
const OP_I32_WRAP_I64 = 0xa7;
const OP_I32_TRUNC_S_F32 = 0xa8;
const OP_I32_TRUNC_U_F32 = 0xa9;
const OP_I32_TRUNC_S_F64 = 0xaa;
const OP_I32_TRUNC_U_F64 = 0xab;
const OP_I64_EXTEND_S_I32 = 0xac;
const OP_I64_EXTEND_U_I32 = 0xad;
const OP_I64_TRUNC_S_F32 = 0xae;
const OP_I64_TRUNC_U_F32 = 0xaf;
const OP_I64_TRUNC_S_F64 = 0xb0;
const OP_I64_TRUNC_U_F64 = 0xb1;
const OP_F32_CONVERT_S_I32 = 0xb2;
const OP_F32_CONVERT_U_I32 = 0xb3;
const OP_F32_CONVERT_S_I64 = 0xb4;
const OP_F32_CONVERT_U_I64 = 0xb5;
const OP_F32_DEMOTE_F64 = 0xb6;
const OP_F64_CONVERT_S_I32 = 0xb7;
const OP_F64_CONVERT_U_I32 = 0xb8;
const OP_F64_CONVERT_S_I64 = 0xb9;
const OP_F64_CONVERT_U_I64 = 0xba;
const OP_F64_PROMOTE_F32 = 0xbb;
const OP_I32_REINTERPRET_F32 = 0xbc;
const OP_I64_REINTERPRET_F64 = 0xbd;
const OP_F32_REINTERPRET_I32 = 0xbe;
const OP_F64_REINTERPRET_I64 = 0xbf;
const OP_I32_EXTEND8_S = 0xc0;
const OP_I32_EXTEND16_S = 0xc1;
const OP_I64_EXTEND8_S = 0xc2;
const OP_I64_EXTEND16_S = 0xc3;
const OP_I64_EXTEND32_S = 0xc4;
const OP_BULK_MEMORY = 0xfc;
const OP_SIMD = 0xfd;
const OP_ATOMIC = 0xfe;

const ARG_MEMORY_INIT = 0x08;
const ARG_DATA_DROP = 0x09;
const ARG_MEMORY_COPY = 0x0a;
const ARG_MEMORY_FILL = 0x0b;
const ARG_TABLE_INIT = 0x0c;
const ARG_ELEM_DROP = 0x0d;
const ARG_TABLE_COPY = 0x0e;

const SIMD_V128_LOAD = 0x00;
const SIMD_V128_LOAD8X8_S = 0x01;
const SIMD_V128_LOAD8X8_U = 0x02;
const SIMD_V128_LOAD16X4_S = 0x03;
const SIMD_V128_LOAD16X4_U = 0x04;
const SIMD_V128_LOAD32X2_S = 0x05;
const SIMD_V128_LOAD32X2_U = 0x06;
const SIMD_V128_LOAD8_SPLAT = 0x07;
const SIMD_V128_LOAD16_SPLAT = 0x08;
const SIMD_V128_LOAD32_SPLAT = 0x09;
const SIMD_V128_LOAD64_SPLAT = 0x0a;
const SIMD_V128_STORE = 0x0b;
const SIMD_V128_CONST = 0x0c;
const SIMD_I8X16_SHUFFLE = 0x0d;
const SIMD_I8X16_SWIZZLE = 0x0e;
const SIMD_I8X16_SPLAT = 0x0f;
const SIMD_I16X8_SPLAT = 0x10;
const SIMD_I32X4_SPLAT = 0x11;
const SIMD_I64X2_SPLAT = 0x12;
const SIMD_F32X4_SPLAT = 0x13;
const SIMD_F64X2_SPLAT = 0x14;
const SIMD_I8X16_EXTRACT_LANE_S = 0x15;
const SIMD_I8X16_EXTRACT_LANE_U = 0x16;
const SIMD_I8X16_REPLACE_LANE = 0x17;
const SIMD_I16X8_EXTRACT_LANE_S = 0x18;
const SIMD_I16X8_EXTRACT_LANE_U = 0x19;
const SIMD_I16X8_REPLACE_LANE = 0x1a;
const SIMD_I32X4_EXTRACT_LANE = 0x1b;
const SIMD_I32X4_REPLACE_LANE = 0x1c;
const SIMD_I64X2_EXTRACT_LANE = 0x1d;
const SIMD_I64X2_REPLACE_LANE = 0x1e;
const SIMD_F32X4_EXTRACT_LANE = 0x1f;
const SIMD_F32X4_REPLACE_LANE = 0x20;
const SIMD_F64X2_EXTRACT_LANE = 0x21;
const SIMD_F64X2_REPLACE_LANE = 0x22;
const SIMD_I8X16_EQ = 0x23;
const SIMD_I8X16_NE = 0x24;
const SIMD_I8X16_LT_S = 0x25;
const SIMD_I8X16_LT_U = 0x26;
const SIMD_I8X16_GT_S = 0x27;
const SIMD_I8X16_GT_U = 0x28;
const SIMD_I8X16_LE_S = 0x29;
const SIMD_I8X16_LE_U = 0x2a;
const SIMD_I8X16_GE_S = 0x2b;
const SIMD_I8X16_GE_U = 0x2c;
const SIMD_I16X8_EQ = 0x2d;
const SIMD_I16X8_NE = 0x2e;
const SIMD_I16X8_LT_S = 0x2f;
const SIMD_I16X8_LT_U = 0x30;
const SIMD_I16X8_GT_S = 0x31;
const SIMD_I16X8_GT_U = 0x32;
const SIMD_I16X8_LE_S = 0x33;
const SIMD_I16X8_LE_U = 0x34;
const SIMD_I16X8_GE_S = 0x35;
const SIMD_I16X8_GE_U = 0x36;
const SIMD_I32X4_EQ = 0x37;
const SIMD_I32X4_NE = 0x38;
const SIMD_I32X4_LT_S = 0x39;
const SIMD_I32X4_LT_U = 0x3a;
const SIMD_I32X4_GT_S = 0x3b;
const SIMD_I32X4_GT_U = 0x3c;
const SIMD_I32X4_LE_S = 0x3d;
const SIMD_I32X4_LE_U = 0x3e;
const SIMD_I32X4_GE_S = 0x3f;
const SIMD_I32X4_GE_U = 0x40;
const SIMD_F32X4_EQ = 0x41;
const SIMD_F32X4_NE = 0x42;
const SIMD_F32X4_LT = 0x43;
const SIMD_F32X4_GT = 0x44;
const SIMD_F32X4_LE = 0x45;
const SIMD_F32X4_GE = 0x46;
const SIMD_F64X2_EQ = 0x47;
const SIMD_F64X2_NE = 0x48;
const SIMD_F64X2_LT = 0x49;
const SIMD_F64X2_GT = 0x4a;
const SIMD_F64X2_LE = 0x4b;
const SIMD_F64X2_GE = 0x4c;
const SIMD_V128_NOT = 0x4d;
const SIMD_V128_AND = 0x4e;
const SIMD_V128_ANDNOT = 0x4f;
const SIMD_V128_OR = 0x50;
const SIMD_V128_XOR = 0x51;
const SIMD_V128_BITSELECT = 0x52;
const SIMD_I8X16_ABS = 0x60;
const SIMD_I8X16_NEG = 0x61;
const SIMD_I8X16_ALL_TRUE = 0x63;
const SIMD_I8X16_BITMASK = 0x64;
const SIMD_I8X16_NARROW_I16X8_S = 0x65;
const SIMD_I8X16_NARROW_I16X8_U = 0x66;
const SIMD_I8X16_SHL = 0x6b;
const SIMD_I8X16_SHR_S = 0x6c;
const SIMD_I8X16_SHR_U = 0x6d;
const SIMD_I8X16_ADD = 0x6e;
const SIMD_I8X16_ADD_SAT_S = 0x6f;
const SIMD_I8X16_ADD_SAT_U = 0x70;
const SIMD_I8X16_SUB = 0x71;
const SIMD_I8X16_SUB_SAT_S = 0x72;
const SIMD_I8X16_SUB_SAT_U = 0x73;
const SIMD_I8X16_MIN_S = 0x76;
const SIMD_I8X16_MIN_U = 0x77;
const SIMD_I8X16_MAX_S = 0x78;
const SIMD_I8X16_MAX_U = 0x79;
const SIMD_I8X16_AVGR_U = 0x7b;
const SIMD_I16X8_ABS = 0x80;
const SIMD_I16X8_NEG = 0x81;
const SIMD_I16X8_ALL_TRUE = 0x83;
const SIMD_I16X8_BITMASK = 0x84;
const SIMD_I16X8_NARROW_I32X4_S = 0x85;
const SIMD_I16X8_NARROW_I32X4_U = 0x86;
const SIMD_I16X8_EXTEND_LOW_I8X16_S = 0x87;
const SIMD_I16X8_EXTEND_HIGH_I8X16_S = 0x88;
const SIMD_I16X8_EXTEND_LOW_I8X16_U = 0x89;
const SIMD_I16X8_EXTEND_HIGH_I8X16_U = 0x8a;
const SIMD_I16X8_SHL = 0x8b;
const SIMD_I16X8_SHR_S = 0x8c;
const SIMD_I16X8_SHR_U = 0x8d;
const SIMD_I16X8_ADD = 0x8e;
const SIMD_I16X8_ADD_SAT_S = 0x8f;
const SIMD_I16X8_ADD_SAT_U = 0x90;
const SIMD_I16X8_SUB = 0x91;
const SIMD_I16X8_SUB_SAT_S = 0x92;
const SIMD_I16X8_SUB_SAT_U = 0x93;
const SIMD_I16X8_MUL = 0x95;
const SIMD_I16X8_MIN_S = 0x96;
const SIMD_I16X8_MIN_U = 0x97;
const SIMD_I16X8_MAX_S = 0x98;
const SIMD_I16X8_MAX_U = 0x99;
const SIMD_I16X8_AVGR_U = 0x9b;
const SIMD_I32X4_ABS = 0xa0;
const SIMD_I32X4_NEG = 0xa1;
const SIMD_I32X4_ALL_TRUE = 0xa3;
const SIMD_I32X4_BITMASK = 0xa4;
const SIMD_I32X4_EXTEND_LOW_I16X8_S = 0xa7;
const SIMD_I32X4_EXTEND_HIGH_I16X8_S = 0xa8;
const SIMD_I32X4_EXTEND_LOW_I16X8_U = 0xa9;
const SIMD_I32X4_EXTEND_HIGH_I16X8_U = 0xaa;
const SIMD_I32X4_SHL = 0xab;
const SIMD_I32X4_SHR_S = 0xac;
const SIMD_I32X4_SHR_U = 0xad;
const SIMD_I32X4_ADD = 0xae;
const SIMD_I32X4_SUB = 0xb1;
const SIMD_I32X4_MUL = 0xb5;
const SIMD_I32X4_MIN_S = 0xb6;
const SIMD_I32X4_MIN_U = 0xb7;
const SIMD_I32X4_MAX_S = 0xb8;
const SIMD_I32X4_MAX_U = 0xb9;
const SIMD_I32X4_DOT_I16X8_S = 0xba;
const SIMD_I64X2_ABS = 0xc0;
const SIMD_I64X2_NEG = 0xc1;
const SIMD_I64X2_BITMASK = 0xc4;
const SIMD_I64X2_EXTEND_LOW_I32X4_S = 0xc7;
const SIMD_I64X2_EXTEND_HIGH_I32X4_S = 0xc8;
const SIMD_I64X2_EXTEND_LOW_I32X4_U = 0xc9;
const SIMD_I64X2_EXTEND_HIGH_I32X4_U = 0xca;
const SIMD_I64X2_SHL = 0xcb;
const SIMD_I64X2_SHR_S = 0xcc;
const SIMD_I64X2_SHR_U = 0xcd;
const SIMD_I64X2_ADD = 0xce;
const SIMD_I64X2_SUB = 0xd1;
const SIMD_I64X2_MUL = 0xd5;
const SIMD_F32X4_CEIL = 0x67;
const SIMD_F32X4_FLOOR = 0x68;
const SIMD_F32X4_TRUNC = 0x69;
const SIMD_F32X4_NEAREST = 0x6a;
const SIMD_F64X2_CEIL = 0x74;
const SIMD_F64X2_FLOOR = 0x75;
const SIMD_F64X2_TRUNC = 0x7a;
const SIMD_F64X2_NEAREST = 0x94;
const SIMD_F32X4_ABS = 0xe0;
const SIMD_F32X4_NEG = 0xe1;
const SIMD_F32X4_SQRT = 0xe3;
const SIMD_F32X4_ADD = 0xe4;
const SIMD_F32X4_SUB = 0xe5;
const SIMD_F32X4_MUL = 0xe6;
const SIMD_F32X4_DIV = 0xe7;
const SIMD_F32X4_MIN = 0xe8;
const SIMD_F32X4_MAX = 0xe9;
const SIMD_F32X4_PMIN = 0xea;
const SIMD_F32X4_PMAX = 0xeb;
const SIMD_F64X2_ABS = 0xec;
const SIMD_F64X2_NEG = 0xed;
const SIMD_F64X2_SQRT = 0xef;
const SIMD_F64X2_ADD = 0xf0;
const SIMD_F64X2_SUB = 0xf1;
const SIMD_F64X2_MUL = 0xf2;
const SIMD_F64X2_DIV = 0xf3;
const SIMD_F64X2_MIN = 0xf4;
const SIMD_F64X2_MAX = 0xf5;
const SIMD_F64X2_PMIN = 0xf6;
const SIMD_F64X2_PMAX = 0xf7;
const SIMD_I32X4_TRUNC_SAT_F32X4_S = 0xf8;
const SIMD_I32X4_TRUNC_SAT_F32X4_U = 0xf9;
const SIMD_F32X4_CONVERT_I32X4_S = 0xfa;
const SIMD_F32X4_CONVERT_I32X4_U = 0xfb;
const SIMD_V128_LOAD32_ZERO = 0x5c;
const SIMD_V128_LOAD64_ZERO = 0x5d;
const SIMD_I16X8_EXTMUL_LOW_I8X16_S = 0x9c;
const SIMD_I16X8_EXTMUL_HIGH_I8X16_S = 0x9d;
const SIMD_I16X8_EXTMUL_LOW_I8X16_U = 0x9e;
const SIMD_I16X8_EXTMUL_HIGH_I8X16_U = 0x9f;
const SIMD_I32X4_EXTMUL_LOW_I16X8_S = 0xbc;
const SIMD_I32X4_EXTMUL_HIGH_I16X8_S = 0xbd;
const SIMD_I32X4_EXTMUL_LOW_I16X8_U = 0xbe;
const SIMD_I32X4_EXTMUL_HIGH_I16X8_U = 0xbf;
const SIMD_I64X2_EXTMUL_LOW_I32X4_S = 0xdc;
const SIMD_I64X2_EXTMUL_HIGH_I32X4_S = 0xdd;
const SIMD_I64X2_EXTMUL_LOW_I32X4_U = 0xde;
const SIMD_I64X2_EXTMUL_HIGH_I32X4_U = 0xdf;
const SIMD_I16X8_Q15MULR_SAT_S = 0x82;
const SIMD_V128_ANY_TRUE = 0x53;
const SIMD_V128_LOAD8_LANE = 0x54;
const SIMD_V128_LOAD16_LANE = 0x55;
const SIMD_V128_LOAD32_LANE = 0x56;
const SIMD_V128_LOAD64_LANE = 0x57;
const SIMD_V128_STORE8_LANE = 0x58;
const SIMD_V128_STORE16_LANE = 0x59;
const SIMD_V128_STORE32_LANE = 0x5a;
const SIMD_V128_STORE64_LANE = 0x5b;
const SIMD_I64X2_EQ = 0xd6;
const SIMD_I64X2_NE = 0xd7;
const SIMD_I64X2_LT_S = 0xd8;
const SIMD_I64X2_GT_S = 0xd9;
const SIMD_I64X2_LE_S = 0xda;
const SIMD_I64X2_GE_S = 0xdb;
const SIMD_I64X2_ALL_TRUE = 0xc3;
const SIMD_F64X2_CONVERT_LOW_I32X4_S = 0xfe;
const SIMD_F64X2_CONVERT_LOW_I32X4_U = 0xff;
const SIMD_I32X4_TRUNC_SAT_F64X2_S_ZERO = 0xfc;
const SIMD_I32X4_TRUNC_SAT_F64X2_U_ZERO = 0xfd;
const SIMD_F32X4_DEMOTE_F64X2_ZERO = 0x5e;
const SIMD_F64X2_PROMOTE_LOW_F32X4 = 0x5f;
const SIMD_I8X16_POPCNT = 0x62;
const SIMD_I16X8_EXTADD_PAIRWISE_I8X16_S = 0x7c;
const SIMD_I16X8_EXTADD_PAIRWISE_I8X16_U = 0x7d;
const SIMD_I32X4_EXTADD_PAIRWISE_I16X8_S = 0x7e;
const SIMD_I32X4_EXTADD_PAIRWISE_I16X8_U = 0x7f;

const ARG_ATOMIC_WAKE = 0x00;
const ARG_I32_ATOMIC_WAIT = 0x01;
const ARG_I64_ATOMIC_WAIT = 0x02;
const ARG_I32_ATOMIC_LOAD = 0x10;
const ARG_I64_ATOMIC_LOAD = 0x11;
const ARG_I32_ATOMIC_LOAD_8U = 0x12;
const ARG_I32_ATOMIC_LOAD_16U = 0x13;
const ARG_I64_ATOMIC_LOAD_8U = 0x14;
const ARG_I64_ATOMIC_LOAD_16U = 0x15;
const ARG_I64_ATOMIC_LOAD_32U = 0x16;
const ARG_I32_ATOMIC_STORE = 0x17;
const ARG_I64_ATOMIC_STORE = 0x18;
const ARG_I32_ATOMIC_STORE_8 = 0x19;
const ARG_I32_ATOMIC_STORE_16 = 0x1a;
const ARG_I64_ATOMIC_STORE_8 = 0x1b;
const ARG_I64_ATOMIC_STORE_16 = 0x1c;
const ARG_I64_ATOMIC_STORE_32 = 0x1d;
const ARG_I32_ATOMIC_RMW_ADD = 0x1e;
const ARG_I64_ATOMIC_RMW_ADD = 0x1f;
const ARG_I32_ATOMIC_RMW_ADD_8U = 0x20;
const ARG_I32_ATOMIC_RMW_ADD_16U = 0x21;
const ARG_I64_ATOMIC_RMW_ADD_8U = 0x22;
const ARG_I64_ATOMIC_RMW_ADD_16U = 0x23;
const ARG_I64_ATOMIC_RMW_ADD_32U = 0x24;
const ARG_I32_ATOMIC_RMW_SUB = 0x25;
const ARG_I64_ATOMIC_RMW_SUB = 0x26;
const ARG_I32_ATOMIC_RMW_SUB_8U = 0x27;
const ARG_I32_ATOMIC_RMW_SUB_16U = 0x28;
const ARG_I64_ATOMIC_RMW_SUB_8U = 0x29;
const ARG_I64_ATOMIC_RMW_SUB_16U = 0x2a;
const ARG_I64_ATOMIC_RMW_SUB_32U = 0x2b;
const ARG_I32_ATOMIC_RMW_AND = 0x2c;
const ARG_I64_ATOMIC_RMW_AND = 0x2d;
const ARG_I32_ATOMIC_RMW_AND_8U = 0x2e;
const ARG_I32_ATOMIC_RMW_AND_16U = 0x2f;
const ARG_I64_ATOMIC_RMW_AND_8U = 0x30;
const ARG_I64_ATOMIC_RMW_AND_16U = 0x31;
const ARG_I64_ATOMIC_RMW_AND_32U = 0x32;
const ARG_I32_ATOMIC_RMW_OR = 0x33;
const ARG_I64_ATOMIC_RMW_OR = 0x34;
const ARG_I32_ATOMIC_RMW_OR_8U = 0x35;
const ARG_I32_ATOMIC_RMW_OR_16U = 0x36;
const ARG_I64_ATOMIC_RMW_OR_8U = 0x37;
const ARG_I64_ATOMIC_RMW_OR_16U = 0x38;
const ARG_I64_ATOMIC_RMW_OR_32U = 0x39;
const ARG_I32_ATOMIC_RMW_XOR = 0x3a;
const ARG_I64_ATOMIC_RMW_XOR = 0x3b;
const ARG_I32_ATOMIC_RMW_XOR_8U = 0x3c;
const ARG_I32_ATOMIC_RMW_XOR_16U = 0x3d;
const ARG_I64_ATOMIC_RMW_XOR_8U = 0x3e;
const ARG_I64_ATOMIC_RMW_XOR_16U = 0x3f;
const ARG_I64_ATOMIC_RMW_XOR_32U = 0x40;
const ARG_I32_ATOMIC_RMW_XCHG = 0x41;
const ARG_I64_ATOMIC_RMW_XCHG = 0x42;
const ARG_I32_ATOMIC_RMW_XCHG_8U = 0x43;
const ARG_I32_ATOMIC_RMW_XCHG_16U = 0x44;
const ARG_I64_ATOMIC_RMW_XCHG_8U = 0x45;
const ARG_I64_ATOMIC_RMW_XCHG_16U = 0x46;
const ARG_I64_ATOMIC_RMW_XCHG_32U = 0x47;
const ARG_I32_ATOMIC_RMW_CMPXCHG = 0x48;
const ARG_I64_ATOMIC_RMW_CMPXCHG = 0x49;
const ARG_I32_ATOMIC_RMW_CMPXCHG_8U = 0x4a;
const ARG_I32_ATOMIC_RMW_CMPXCHG_16U = 0x4b;
const ARG_I64_ATOMIC_RMW_CMPXCHG_8U = 0x4c;
const ARG_I64_ATOMIC_RMW_CMPXCHG_16U = 0x4d;
const ARG_I64_ATOMIC_RMW_CMPXCHG_32U = 0x4e;

const convertOpcode = function (string) {
  const opcodeVal = opcodeStr[string];

  if (typeof opcodeVal === "undefined") {
    throw new Error("Invalid opcode " + string);
  }

  return opcodeVal;
};

const convertOpcodeArray = function (opcodeArray) {
  const result = [];

  for (let i = 0; i < opcodeArray.length; i++) {
    const thisElement = opcodeArray[i];

    let convertedElement = thisElement;

    if (typeof thisElement === "string") {
      convertedElement = convertOpcode(thisElement);
    }

    result.push(convertedElement);
  }

  return result;
};

const Uint8ToArray = function (x) {
  return [x & 0xff];
};

const Uint32ToArray = function (x) {
  return [x & 0x000000ff, (x & 0x0000ff00) >> 8, (x & 0x00ff0000) >> 16, (x & 0xff000000) >> 24];
};

const Uint64ToArray = function (x) {
  return [
    x & 0x00000000000000ff,
    (x & 0x000000000000ff00) >> 8,
    (x & 0x0000000000ff0000) >> 16,
    (x & 0x00000000ff000000) >> 24,
    (x & 0x000000ff00000000) >> 32,
    (x & 0x0000ff0000000000) >> 40,
    (x & 0x00ff000000000000) >> 48,
    (x & 0xff00000000000000) >> 56,
  ];
};

const VarUint32ToArray = function (x) {
  const result = [];
  let current = x;

  if (x == 0) {
    return [0];
  }

  while (current > 0) {
    let thisByte = current & 0x7f;

    current >>= 7;

    if (current) {
      thisByte |= 0x80;
    }

    result.push(thisByte);
  }

  return result;
};

const VarSint32ToArray = function (x) {
  const result = [];
  let current = x;

  while (1) {
    thisByte = current & 0x7f;
    current >>= 7;

    if (current == -1 && thisByte & 0x40) {
      result.push(thisByte);

      break;
    } else if (current == 0 && !(thisByte & 0x40)) {
      result.push(thisByte);

      break;
    } else {
      thisByte |= 0x80;

      result.push(thisByte);
    }
  }

  return result;
};

// From https://stackoverflow.com/questions/16893817/javascript-ascii-string-to-hex-byte-array
const stringToByteArray = function (str) {
  return str.split("").map(function (c) {
    return c.charCodeAt(0);
  });
};

const VarUint32 = function (value) {
  if (typeof value == "number") {
    return VarUint32ToArray(value);
  } else if (value instanceof WailVariable) {
    return value.varUint32();
  } else {
    // TODO Handle error
  }
};

// WailVariable is the base class representing values that will be resolved while parsing.
// Users can dictate the particular binary representation of a WailVariable by using
// the type methods (i32(), f32(), etc)
// If a representation is not explicitly selected, Wail will select a representation
// contextually if possible, or throw an exception if not
class WailVariable {
  constructor() {
    this._value = null;
  }

  get value() {
    if (this._value === null) {
      throw new Error("Attempted to resolve WailVariable before set");
    }

    return this._value;
  }

  set value(newValue) {
    this._value = newValue;
  }

  i32() {
    if (this._value !== null) {
      return this.value;
    }

    return new WailI32(this);
  }

  f32() {
    if (this._value !== null) {
      const f32Array = new Float32Array([this._value]);

      return new Uint8Array(f32Array.buffer);
    }

    return new WailF32(this);
  }

  i64() {
    if (this._value !== null) {
      return this.value;
    }

    return new WailI64(this);
  }

  f64() {
    if (this._value !== null) {
      const f64Array = new Float64Array([this._value]);

      return new Uint8Array(f64Array.buffer);
    }

    return new WailF64(this);
  }

  varUint32() {
    if (this._value !== null) {
      return VarUint32(this.value);
    }

    return new WailVarUint32(this);
  }
}

class TypedWailVariable {
  constructor(parentVariable) {
    this._parent = parentVariable;
  }
}

class WailI32 extends TypedWailVariable {
  get value() {
    return Uint32ToArray(this._parent.value);
  }
}

class WailF32 extends TypedWailVariable {
  get value() {
    // TODO Fix
    return Uint32ToArray(this._parent.value);
  }
}

class WailI64 extends TypedWailVariable {
  get value() {
    return Uint64ToArray(this._parent.value);
  }
}

class WailF64 extends TypedWailVariable {
  get value() {
    // TODO Fix
    return Uint64ToArray(this._parent.value);
  }
}

class WailVarUint32 extends TypedWailVariable {
  get value() {
    return VarUint32ToArray(this._parent.value);
  }
}

const EMPTY_BYTES = new Uint8Array(0);

const BufferReader = class {
  // scanOnly: the caller wants the side effects of parsing (the type table, the
  // element table) but will never look at write(). Skipping the output buffer
  // avoids allocating 2× the input and memcpy'ing the whole thing through it —
  // for a discovery pass over a multi-MB WASM that is pure waste.
  constructor(buffer, scanOnly) {
    this.inBuffer = null;
    this.outBuffer = null;
    this._scanOnly = scanOnly === true;

    if (typeof buffer !== "undefined") {
      // Avoid copying when the caller already has a Uint8Array.
      // new Uint8Array(existingUint8Array) copies every byte; just assign instead.
      this.inBuffer = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);

      // The rewritten binary is the input plus a handful of imports/exports and
      // some re-encoded LEB128s — a few percent at most. Reserving 2× meant
      // zero-filling an extra whole WASM's worth of memory (tens of MB) on every
      // load. resize() still covers the case where the estimate is wrong.
      this.outBuffer = this._scanOnly
        ? null
        : new Uint8Array(this.inBuffer.length + (this.inBuffer.length >> 3) + 65536);
    } else if (!this._scanOnly) {
      this.outBuffer = new Uint8Array(1);
    }

    this.inPos = 0;
    this._copyPos = 0;
    this.outPos = 0;

    this._anchor = null;
  }

  load(buffer) {
    this.inBuffer = new Uint8Array(buffer);

    this.outBuffer = new Uint8Array(this.inBuffer.length * 2);
  }

  // Reinitialise for reuse without allocating a new output buffer.
  // If the new input is larger than the current output buffer can hold (2×),
  // the output buffer is reallocated; otherwise it is reused.
  reset(newInput) {
    this.inBuffer = newInput;
    this.inPos = 0;
    this._copyPos = 0;
    this._anchor = null;
    if (!this._scanOnly) {
      const needed = newInput.length * 2;
      if (!this.outBuffer || this.outBuffer.length < needed) {
        this.outBuffer = new Uint8Array(needed);
      }
    }
    this.outPos = 0;
  }

  // Write a VarUint32 (LEB128) value directly to outBuffer without creating
  // an intermediate array.  Grows outBuffer if needed.
  writeVarUint32(val) {
    if (this._scanOnly) { this.updateCopyPosition(); return; }
    do {
      while (this.outPos >= this.outBuffer.length) this.resize();
      const b = val & 0x7f;
      val >>>= 7;
      this.outBuffer[this.outPos++] = val > 0 ? (b | 0x80) : b;
    } while (val > 0);
    this.updateCopyPosition();
  }

  // Write a contiguous slice [srcOffset, srcOffset+length) of src directly
  // to outBuffer.  Avoids the intermediate .slice() that copyBuffer needs when
  // called with a Uint8Array.
  writeDirectBytes(src, srcOffset, length) {
    if (this._scanOnly) { this.updateCopyPosition(); return; }
    while (this.outPos + length > this.outBuffer.length) this.resize();
    this.outBuffer.set(src.subarray(srcOffset, srcOffset + length), this.outPos);
    this.outPos += length;
    this.updateCopyPosition();
  }

  resize() {
    if (this.outBuffer.length == 0) {
      throw new Error("Attempted to resize 0-length buffer");
    }
    // Grow factor of 2x instead of 1.25x — halves the number of resize calls
    // (each of which copies the entire prefix) at the cost of slightly more
    // peak memory. For multi-MB WASM outputs this is a clear win.
    const newBuffer = new Uint8Array(this.outBuffer.length * 2);
    newBuffer.set(this.outBuffer.subarray(0, this.outPos));
    this.outBuffer = newBuffer;
  }

  readUint8() {
    return this.inBuffer[this.inPos++];
  }

  readUint32() {
    const b1 = this.inBuffer[this.inPos++];
    const b2 = this.inBuffer[this.inPos++];
    const b3 = this.inBuffer[this.inPos++];
    const b4 = this.inBuffer[this.inPos++];

    return b1 | (b2 << 8) | (b3 << 16) | (b4 << 24);
  }

  readVarUint32() {
    // Inline single-byte fast path: the vast majority of WASM LEB128 operands
    // (small local indices, function counts, short constants) fit in one byte.
    // Skipping the loop setup saves ~70% of the work for those values.
    const b0 = this.inBuffer[this.inPos++];
    if (!(b0 & 0x80)) return b0;
    let result = b0 & 0x7f;
    let shift = 7;
    let byte;
    do {
      byte = this.inBuffer[this.inPos++];
      result |= (byte & 0x7f) << shift;
      shift += 7;
    } while (byte & 0x80);
    return result;
  }

  readUint64() {
    const b1 = this.inBuffer[this.inPos++];
    const b2 = this.inBuffer[this.inPos++];
    const b3 = this.inBuffer[this.inPos++];
    const b4 = this.inBuffer[this.inPos++];
    const b5 = this.inBuffer[this.inPos++];
    const b6 = this.inBuffer[this.inPos++];
    const b7 = this.inBuffer[this.inPos++];
    const b8 = this.inBuffer[this.inPos++];

    return b1 | (b2 << 8) | (b3 << 16) | (b4 << 24) | (b5 << 32) | (b6 << 40) | (b7 << 48) | (b8 << 56);
  }

  readUint128() {
    const b1 = this.inBuffer[this.inPos++];
    const b2 = this.inBuffer[this.inPos++];
    const b3 = this.inBuffer[this.inPos++];
    const b4 = this.inBuffer[this.inPos++];
    const b5 = this.inBuffer[this.inPos++];
    const b6 = this.inBuffer[this.inPos++];
    const b7 = this.inBuffer[this.inPos++];
    const b8 = this.inBuffer[this.inPos++];
    const b9 = this.inBuffer[this.inPos++];
    const b10 = this.inBuffer[this.inPos++];
    const b11 = this.inBuffer[this.inPos++];
    const b12 = this.inBuffer[this.inPos++];
    const b13 = this.inBuffer[this.inPos++];
    const b14 = this.inBuffer[this.inPos++];
    const b15 = this.inBuffer[this.inPos++];
    const b16 = this.inBuffer[this.inPos++];

    return (
      b1 |
      (b2 << 8) |
      (b3 << 16) |
      (b4 << 24) |
      (b5 << 32) |
      (b6 << 40) |
      (b7 << 48) |
      (b8 << 56) |
      (b9 << 64) |
      (b10 << 72) |
      (b11 << 80) |
      (b12 << 88) |
      (b13 << 96) |
      (b14 << 104) |
      (b15 << 112) |
      (b16 << 120)
    );
  }

  readBytes(length) {
    // Bulk copy via subarray + slice — orders of magnitude faster than the
    // previous per-byte loop on multi-MB WASM payloads.
    const result = this.inBuffer.slice(this.inPos, this.inPos + length);
    this.inPos += length;
    return result;
  }

  copyBuffer(buffer) {
    if (this._scanOnly) { this.updateCopyPosition(); return; }
    const len = buffer.length;
    while (len + this.outPos > this.outBuffer.length) {
      this.resize();
    }
    // `buffer` may be a plain number[] (from VarUint32ToArray etc) or a typed
    // array. Uint8Array.set handles both via the typed-array form, but plain
    // arrays need a conversion. Branch keeps the typed-array fast path.
    if (buffer instanceof Uint8Array || (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView(buffer))) {
      this.outBuffer.set(buffer, this.outPos);
    } else {
      for (let i = 0; i < len; i++) this.outBuffer[this.outPos + i] = buffer[i];
    }
    this.outPos += len;
    this.updateCopyPosition();
  }

  commitBytes() {
    if (this._scanOnly) { this._copyPos = this.inPos; return; }
    const len = this.inPos - this._copyPos;
    if (len === 0) return;
    while (this.outPos + len > this.outBuffer.length) this.resize();
    // Fast path for the most common case (single-byte no-arg instructions).
    if (len === 1) {
      this.outBuffer[this.outPos++] = this.inBuffer[this._copyPos++];
      return;
    }
    this.outBuffer.set(this.inBuffer.subarray(this._copyPos, this.inPos), this.outPos);
    this.outPos += len;
    this._copyPos = this.inPos;
  }

  updateCopyPosition() {
    this._copyPos = this.inPos;
  }

  setAnchor() {
    this._anchor = this.outPos;
  }

  readFromAnchor() {
    return this.outBuffer.slice(this._anchor, this.outPos);
  }

  writeAtAnchor(buffer) {
    const len = buffer.length;
    while (this._anchor + len > this.outBuffer.length) {
      this.resize();
    }
    if (buffer instanceof Uint8Array || (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView(buffer))) {
      this.outBuffer.set(buffer, this._anchor);
    } else {
      for (let i = 0; i < len; i++) this.outBuffer[this._anchor + i] = buffer[i];
    }
    this.outPos = this._anchor + len;
  }

  write() {
    if (this._scanOnly) return EMPTY_BYTES;
    // subarray is a zero-copy view; callers either pass it to copyBuffer (which
    // copies) or to WebAssembly.instantiate (which also copies internally).
    // There is no risk of the underlying buffer being mutated after this call
    // since the reader is not used again.
    return this.outBuffer.subarray(0, this.outPos);
  }
};

class WailParser extends BufferReader {
  // scanOnly parsers exist purely to populate the type/element tables; they
  // never produce a rewritten binary. See BufferReader's constructor.
  constructor(bufferSource, scanOnly) {
    super(bufferSource, scanOnly);

    this._finished = false;

    this._newSections = [];

    this._removeSectionIds = [];

    this._resolvedTables = false;

    // We need to keep track of how many imported functions there are to
    // properly rebuild function table
    this._importFuncCount = 0;
    this._importFuncNewCount = 0;

    // Same logic as with imported functions
    this._importGlobalCount = 0;
    this._importGlobalNewCount = 0;

    this._globalImportCallback = null;
    this._importCallbacks = [];

    this._globalExportCallback = null;
    this._exportCallbacks = [];

    this._globalFunctionCallback = null;
    this._functionCallbacks = [];

    this._globalInstructionCallback = null;
    this._instructionCallbacks = {};
    // Fast-path flag: if false, the instruction callback dispatch is skipped
    // entirely per instruction — saves a property lookup on every opcode.
    this._hasInstructionCallbacks = false;

    // Inline call-hook data — avoids per-OP_CALL BufferReader allocation and
    // outBuffer.slice() that the generic _instructionCallbacks path incurs.
    this._callHookMap = null;
    this._callHookGetReplacement = null;
    this._callHookOnApplied = null;

    // Pre-computed flag: true only when per-function callbacks or existingEntries
    // are registered. Lets _readFunction skip 3 property lookups per function when
    // neither feature is used (the common case in UWMK).
    this._hasSpecialFunctions = false;

    this._sectionOptions = {};

    // Each section has three sets of parameters that can be set before parsing begins
    //      "newEntries" includes newly created section entries
    //      "existingExtries" includes parameters used to modify existing entries
    //      "pending" includes variables that require info from this section to resolve
    for (let i = 0; i <= MAX_SECTION_ID; i++) {
      this._sectionOptions[i] = {
        newEntries: [],
        existingEntries: [],
        pending: [],
      };
    }

    // To keep parsing as minimal as possible, we keep two masks of sections the user
    // has requested we parse
    //
    // The first defines sections that the binary must have. If the binary does not already
    // have this section, we will add it
    //
    // The second defines sections that should be parsed if they exist. There is no reason
    // to add these new sections if they do not exist
    this._requiredSectionFlags = 0;
    this._optionalSectionFlags = 0;

    this._parsedSections = 0;

    this.__variables = [];
  }

  parse() {
    // Read magic and version in one operation if possible
    const magic = this.readUint32();

    // Early exit for invalid magic
    if (magic !== 0x6d736100) {
      throw new Error("Invalid magic. Probably not a WebAssembly binary");
    }

    // Read version (still needed for validation but we don't use it)
    this.readUint32();

    const bufferLength = this.inBuffer.length;
    while (this.inPos < bufferLength) {
      this._readSection();
    }

    // Single commit at the end (more efficient than multiple commits)
    this.commitBytes();

    // Set finished flag
    this._finished = true;

    // Optional: return this for method chaining
    return this;
  }

  // TODO Support removing sections by name
  removeSection(id) {
    if (typeof id === "number") {
      this._removeSectionIds.push(id);
    } else {
      throw new Error("Invalid argument to removeSection()");
    }
  }

  addTypeEntry(options) {
    const newEntry = {};

    const form = options.form;

    if (typeof form === "number") {
      newEntry.form = form;
    } else {
      newEntry.form = convertValueType(form);
    }

    const params = options.params;

    if (params instanceof Array) {
      const convertedParams = [];

      for (let i = 0; i < params.length; i++) {
        const thisParam = params[i];

        if (typeof thisParam === "number") {
          convertedParams.push(thisParam);
        } else {
          convertedParams.push(convertValueType(thisParam));
        }
      }

      newEntry.params = convertedParams;
    } else {
      newEntry.params = [];
    }

    const returnType = options.returnType;

    if (typeof returnType === "number") {
      newEntry.returnType = returnType;
    } else if (typeof returnType === "string") {
      newEntry.returnType = convertValueType(returnType);
    }

    const newVariable = this._createVariable();

    newEntry.variable = newVariable;

    this._sectionOptions[SECTION_TYPE].newEntries.push(newEntry);

    this._requiredSectionFlags |= 1 << SECTION_TYPE;

    return newVariable;
  }

  editTypeEntry(index, options) {
    const savedEntry = {};

    // As is, editTypeEntry() has no purpose to receive WailVariables
    // So unlike some other edit functions, it only accepts numeric indices
    if (typeof index !== "number") {
      throw new Error("Invalid index in editTypeEntry()");
    }

    savedEntry.index = index;

    const params = options.params;

    if (params instanceof Array) {
      savedEntry.params = params;
    } else {
      savedEntry.params = [];
    }

    const returnType = options.returnType;

    if (returnType) {
      savedEntry.returnType = returnType;
    }

    this._sectionOptions[SECTION_TYPE].existingEntries.push(savedEntry);

    this._optionalSectionFlags |= 1 << SECTION_TYPE;
  }

  addImportEntry(options) {
    const newEntry = {};

    const moduleStr = options.moduleStr;

    if (typeof moduleStr == "string" || moduleStr instanceof String) {
      newEntry.moduleStr = moduleStr;
    } else {
      throw new Error("Invalid moduleStr");
    }

    const fieldStr = options.fieldStr;

    if (typeof fieldStr == "string" || fieldStr instanceof String) {
      newEntry.fieldStr = fieldStr;
    } else {
      throw new Error("Invalid fieldStr");
    }

    const kind = options.kind;

    let convertedKind;

    if (typeof kind === "number") {
      convertedKind = kind;
    } else {
      convertedKind = convertKind(kind);
    }

    let type = options.type;

    newEntry.kind = convertedKind;

    switch (convertedKind) {
      case KIND_FUNC:
        this._importFuncNewCount++;

        if (typeof type === "number") {
          newEntry.type = type;
        } else if (type instanceof WailVarUint32) {
          newEntry.type = type;
        } else if (type instanceof WailVariable) {
          newEntry.type = type.varUint32();
        } else {
          throw new Error("Invalid type");
        }

        break;
      case KIND_GLOBAL:
        this._importGlobalNewCount++;

        if (typeof type === "number") {
          newEntry.type = type;
        } else {
          throw new Error("Invalid type");
        }

        // Mutable imported globals is not supported by all browsers, but
        // we allow it regardless.
        if (options.mutability === 0 || options.mutability === 1 || options.mutability === true || options.mutability === false) {
          newEntry.mutability = options.mutability;
        } else {
          throw new Error("Invalid mutability");
        }

        break;
      case KIND_MEMORY:
        throw new Error("Adding new memory object not currently supported");
      case KIND_TABLE:
        throw new Error("Adding new table object not currently supported");
      default:
        throw new Error("Invalid kind");
    }

    const newVariable = this._createVariable();

    newEntry.variable = newVariable;

    this._sectionOptions[SECTION_IMPORT].newEntries.push(newEntry);

    this._requiredSectionFlags |= 1 << SECTION_IMPORT;

    // Adding functions to the import section changes the function table.
    // This means we need to patch up any other section that contains function indexes
    if (this._importFuncNewCount > 0) {
      this._optionalSectionFlags |= 1 << SECTION_EXPORT;
      this._optionalSectionFlags |= 1 << SECTION_ELEMENT;
      this._optionalSectionFlags |= 1 << SECTION_CODE;
      this._optionalSectionFlags |= 1 << SECTION_START;
    }

    // Same logic as above. If we add an imported global, we need to parse
    // any potentially affected sections.
    if (this._importGlobalNewCount > 0) {
      this._optionalSectionFlags |= 1 << SECTION_EXPORT;
      this._optionalSectionFlags |= 1 << SECTION_CODE;
    }

    return newVariable;
  }

  // TODO WAIL does not currently support modifying the "kind" of an existing import
  // Is there any realistic reason to do so?
  editImportEntry(index, options) {
    const savedEntry = {};

    savedEntry.index = index;

    if (typeof index !== "number" && !(index instanceof WailVariable)) {
      throw new Error("Invalid index in editImportEntry()");
    }

    const moduleStr = options.moduleStr;

    if (typeof moduleStr == "string" || moduleStr instanceof String) {
      savedEntry.moduleStr = stringToByteArray(moduleStr);
    }

    const fieldStr = options.fieldStr;

    if (typeof fieldStr == "string" || fieldStr instanceof String) {
      savedEntry.fieldStr = stringToByteArray(fieldStr);
    }

    this._sectionOptions[SECTION_IMPORT].existingEntries.push(savedEntry);

    this._optionalSectionFlags |= 1 << SECTION_IMPORT;
  }

  addImportElementParser(index, callback) {
    if (typeof callback !== "function") {
      throw new Error("Bad callback in addImportElementParser()");
    }

    if (index === null) {
      this._globalImportCallback = callback;
    } else if (typeof index !== "number" && !(index instanceof WailVariable)) {
      throw new Error("Bad id " + index + " in addImportElementParser()");
    } else {
      const callbackObj = {};
      callbackObj.index = index;
      callbackObj.callback = callback;

      this._importCallbacks.push(callbackObj);
    }

    this._optionalSectionFlags |= 1 << SECTION_IMPORT;
  }

  addFunctionEntry(options) {
    const newEntry = {};

    const type = options.type;

    if (typeof type === "number") {
      newEntry.type = type;
    } else if (type instanceof WailVarUint32) {
      newEntry.type = type;
    } else if (type instanceof WailVariable) {
      newEntry.type = type.varUint32();
    } else {
      throw new Error("Invalid type");
    }

    const newVariable = this._createVariable();

    newEntry.variable = newVariable;

    this._sectionOptions[SECTION_FUNCTION].newEntries.push(newEntry);
    this._requiredSectionFlags |= 1 << SECTION_FUNCTION;

    return newVariable;
  }

  editFunctionEntry(index, options) {
    const savedEntry = {};

    savedEntry.index = index;

    if (typeof index !== "number" && !(index instanceof WailVariable)) {
      throw new Error("Invalid index in editFunctionEntry()");
    }

    const givenType = options.type;

    if (typeof givenType !== "number") {
      throw new Error("Invalid type in editFunctionEntry()");
    }

    savedEntry.type = givenType;

    this._sectionOptions[SECTION_FUNCTION].existingEntries.push(savedEntry);

    this._optionalSectionFlags |= 1 << SECTION_FUNCTION;
  }

  getFunctionIndex(oldIndex) {
    if (this._finished) {
      if (oldIndex instanceof WailVariable) {
        return oldIndex;
      }
      const newVariable = this._createVariable();
      newVariable.value = this._getAdjustedFunctionIndex(oldIndex);
      return newVariable;
    }

    const newVariable = this._createVariable();

    if (typeof oldIndex !== "number") {
      throw new Error("Invalid index in getFunctionIndex()");
    }

    this._sectionOptions[SECTION_FUNCTION].pending.push({
      oldIndex: oldIndex,
      variable: newVariable,
    });

    // Resolving function indexes can be done by only parsing the IMPORT section
    // since newly added FUNCTION entries will be added to the end of the list
    this._optionalSectionFlags |= 1 << SECTION_IMPORT;

    return newVariable;
  }

  addGlobalEntry(options) {
    const newEntry = {};

    newEntry.globalType = {};

    if (typeof options.globalType === "undefined") {
      throw new Error("Invalid globalType");
    }

    if (typeof options.globalType.contentType === "number") {
      newEntry.globalType.contentType = options.globalType.contentType;
    } else {
      newEntry.globalType.contentType = convertValueType(options.globalType.contentType);
    }

    const mutability = options.globalType.mutability;

    if (mutability == true) {
      newEntry.globalType.mutability = 1;
    } else if (mutability == false) {
      newEntry.globalType.mutability = 0;
    } else {
      throw new Error("Invalid mutability");
    }

    if (options.initExpr instanceof Array) {
      newEntry.initExpr = convertOpcodeArray(options.initExpr);
    } else {
      // Default to initExpr value of "i32.const 0" if not specified
      newEntry.initExpr = [OP_I32_CONST, VarUint32(0x00), OP_END];
    }

    const newVariable = this._createVariable();

    newEntry.variable = newVariable;

    this._sectionOptions[SECTION_GLOBAL].newEntries.push(newEntry);

    this._requiredSectionFlags |= 1 << SECTION_GLOBAL;

    return newVariable;
  }

  // TODO Handle editing initExpr
  editGlobalEntry(globalIndex, options) {
    const savedEntry = {};

    if (typeof globalIndex === "number") {
      console.warn("Using raw indexes in editGlobalEntry() can have unpredictable " + "results. Consider using getGlobalIndex() instead");
    } else if (!(globalIndex instanceof WailVariable)) {
      throw new Error("Invalid globalIndex in addCodeEntry()");
    }

    savedEntry.index = globalIndex;

    savedEntry.globalType = {};

    if (typeof options.globalType === "undefined") {
      throw new Error("Invalid globalType");
    }

    if (typeof options.globalType.contentType === "number") {
      savedEntry.globalType.contentType = options.globalType.contentType;
    } else {
      savedEntry.globalType.contentType = convertValueType(options.globalType.contentType);
    }

    const mutability = options.globalType.mutability;

    if (mutability == true) {
      savedEntry.globalType.mutability = 1;
    } else if (mutability == false) {
      savedEntry.globalType.mutability = 0;
    } else {
      throw new Error("Invalid mutability");
    }

    this._sectionOptions[SECTION_GLOBAL].existingEntries.push(savedEntry);

    this._requiredSectionFlags |= 1 << SECTION_GLOBAL;
  }

  getGlobalIndex(oldIndex) {
    if (this._finished) {
      if (oldIndex instanceof WailVariable) {
        return oldIndex.value;
      } else {
        return this._getAdjustedGlobalIndex(oldIndex);
      }
    }

    const newVariable = this._createVariable();

    if (typeof oldIndex !== "number") {
      throw new Error("Invalid index in getGlobalIndex()");
    }

    const pendingOptions = {
      oldIndex: oldIndex,
      variable: newVariable,
    };

    this._sectionOptions[SECTION_GLOBAL].pending.push(pendingOptions);

    // Resolving function indexes can be done by only parsing the IMPORT section
    // since newly added GLOBAL entries will be added to the end of the list
    this._optionalSectionFlags |= 1 << SECTION_IMPORT;

    return newVariable;
  }

  addExportEntry(index, options) {
    const newEntry = {};

    if (typeof options.fieldStr == "string" || options.fieldStr instanceof String) {
      newEntry.fieldStr = options.fieldStr;
    } else {
      throw new Error("Invalid fieldStr");
    }

    if (typeof options.kind == "number") {
      newEntry.kind = options.kind;
    } else {
      newEntry.kind = convertKind(options.kind);
    }

    if (typeof index === "number") {
      newEntry.index = index;
    } else if (index instanceof WailVarUint32) {
      newEntry.index = index;
    } else if (index instanceof WailVariable) {
      newEntry.index = index.varUint32();
    } else {
      throw new Error("Invalid type");
    }

    const newVariable = this._createVariable();

    newEntry.variable = newVariable;

    this._sectionOptions[SECTION_EXPORT].newEntries.push(newEntry);

    this._requiredSectionFlags |= 1 << SECTION_EXPORT;

    return newVariable;
  }

  editExportEntry(index, options) {
    const savedEntry = {};

    savedEntry.index = index;

    if (typeof index !== "number" && !(index instanceof WailVariable)) {
      throw new Error("Invalid index in editExportEntry()");
    }

    const fieldStr = options.fieldStr;

    if (typeof fieldStr == "string" || fieldStr instanceof String) {
      savedEntry.fieldStr = stringToByteArray(fieldStr);
    }

    // TODO Validate
    savedEntry.kind = options.kind;
    savedEntry.funcIndex = options.index;

    this._sectionOptions[SECTION_EXPORT].existingEntries.push(savedEntry);

    this._optionalSectionFlags |= 1 << SECTION_EXPORT;
  }

  addExportElementParser(index, callback) {
    if (typeof callback !== "function") {
      throw new Error("Bad callback in addExportElementParser()");
    }

    if (index === null) {
      this._globalExportCallback = callback;
    } else if (typeof index !== "number" && !(index instanceof WailVariable)) {
      throw new Error("Bad id " + index + " in addExportElementParser()");
    } else {
      const callbackObj = {};
      callbackObj.index = index;
      callbackObj.callback = callback;

      this._exportCallbacks.push(callbackObj);
    }

    this._optionalSectionFlags |= 1 << SECTION_EXPORT;
  }

  // There is no addStartEntry since the start section can only have one element
  editStartEntry(newIndex) {
    if (typeof newIndex !== "number" && !(newIndex instanceof WailVariable)) {
      throw new Error("Invalid index in editStartEntry()");
    }

    this._sectionOptions[SECTION_START].existingEntries.push(newIndex);

    // Unlike other edit functions, editing the START entry should add the
    // section if it doesn't exist
    this._requiredSectionFlags |= 1 << SECTION_START;
  }

  // TODO Validate
  addElementEntry(options) {
    const newVariable = this._createVariable();

    options.variable = newVariable;

    this._sectionOptions[SECTION_ELEMENT].newEntries.push(options);

    this._requiredSectionFlags |= 1 << SECTION_ELEMENT;

    return newVariable;
  }

  editElementEntry(index, options) {
    const savedEntry = {};

    savedEntry.index = index;

    if (typeof index !== "number" && !(index instanceof WailVariable)) {
      throw new Error("Invalid index in editElementEntry()");
    }

    savedEntry.elems = [];

    this._sectionOptions[SECTION_ELEMENT].existingEntries.push(savedEntry);

    this._optionalSectionFlags |= 1 << SECTION_ELEMENT;
  }

  addCodeEntry(funcIndex, options) {
    const newEntry = {};

    if (typeof funcIndex === "number") {
      console.warn("Using raw indexes in addCodeEntry() can have unpredictable " + "results. Consider using getFunctionIndex() instead");
    } else if (!(funcIndex instanceof WailVariable)) {
      throw new Error("Invalid funcIndex in addCodeEntry()");
    }

    newEntry.index = funcIndex;

    const locals = options.locals;

    if (locals instanceof Array) {
      const fixedLocals = [];

      for (let i = 0; i < locals.length; i++) {
        const thisLocal = locals[i];

        if (typeof thisLocal === "number") {
          fixedLocals.push(thisLocal);
        } else if (typeof thisLocal === "string") {
          fixedLocals.push(convertValueType(thisLocal));
        } else {
          throw new Error("Invalid local entry in addCodeEntry()");
        }
      }

      newEntry.locals = fixedLocals;
    } else {
      newEntry.locals = [];
    }

    const code = options.code;

    if (code instanceof Array) {
      newEntry.code = convertOpcodeArray(code);
    } else {
      throw new Error("Invalid code");
    }

    const newVariable = this._createVariable();

    newEntry.variable = newVariable;

    this._sectionOptions[SECTION_CODE].newEntries.push(newEntry);

    this._requiredSectionFlags |= 1 << SECTION_CODE;

    return newVariable;
  }

  editCodeEntry(funcIndex, options) {
    const savedEntry = {};

    if (typeof funcIndex === "number") {
      console.warn("Using raw indexes in editCodeEntry() can have unpredictable " + "results. Consider using getFunctionIndex() instead");
    } else if (!(funcIndex instanceof WailVariable)) {
      throw new Error("Invalid funcIndex in addCodeEntry()");
    }

    savedEntry.index = funcIndex;

    const locals = options.locals;

    if (locals instanceof Array) {
      const fixedLocals = [];

      for (let i = 0; i < locals.length; i++) {
        const thisLocal = locals[i];

        if (typeof thisLocal === "number") {
          fixedLocals.push(thisLocal);
        } else if (typeof thisLocal === "string") {
          fixedLocals.push(convertValueType(thisLocal));
        } else {
          throw new Error("Invalid local entry in addCodeEntry()");
        }
      }

      savedEntry.locals = fixedLocals;
    } else {
      savedEntry.locals = [];
    }

    const code = options.code;

    if (code instanceof Array) {
      savedEntry.code = convertOpcodeArray(code);
    } else {
      throw new Error("Invalid code");
    }

    this._sectionOptions[SECTION_CODE].existingEntries.push(savedEntry);

    this._hasSpecialFunctions = true;
    this._optionalSectionFlags |= 1 << SECTION_IMPORT;
    this._optionalSectionFlags |= 1 << SECTION_CODE;
  }

  // TODO Validate
  addDataEntry(options) {
    const newVariable = this._createVariable();

    options.variable = newVariable;

    this._sectionOptions[SECTION_DATA].newEntries.push(options);

    this._requiredSectionFlags |= 1 << SECTION_DATA;

    return newVariable;
  }

  // TODO Validate
  editDataEntry(index, options) {
    const savedEntry = {};

    if (typeof index !== "number") {
      throw new Error("Invalid index in editTypeEntry()");
    }

    savedEntry.index = index;

    if (typeof options.data === "string") {
      savedEntry.data = stringToByteArray(options.data);
    } else {
      savedEntry.data = options.data;
    }

    this._sectionOptions[SECTION_DATA].existingEntries.push(savedEntry);

    this._optionalSectionFlags |= 1 << SECTION_DATA;
  }

  addCodeElementParser(index, callback) {
    if (typeof callback !== "function") {
      throw new Error("Bad callback in addCodeElementParser()");
    }

    if (index === null) {
      this._globalFunctionCallback = callback;
    } else if (typeof index !== "number" && !(index instanceof WailVariable)) {
      throw new Error("Bad id " + index + " in addCodeElementParser()");
    } else {
      const callbackObj = {};
      callbackObj.index = index;
      callbackObj.callback = callback;

      this._functionCallbacks.push(callbackObj);
    }

    this._hasSpecialFunctions = true;
    this._optionalSectionFlags |= 1 << SECTION_IMPORT;
    this._optionalSectionFlags |= 1 << SECTION_CODE;
  }

  // TODO Global callbacks
  addInstructionParser(opcode, callback) {
    if (typeof callback !== "function") {
      throw new Error("Bad callback in addInstructionParser()");
    }

    if (opcode === null) {
      this._globalInstructionCallback = callback;
    } else if (isNaN(opcode) && !(opcode instanceof WailVariable)) {
      throw new Error("Bad opcode " + opcode + " in addCodeElementParser()");
    } else {
      this._instructionCallbacks[opcode] = callback;
    }

    this._hasInstructionCallbacks = true;
    this._optionalSectionFlags |= 1 << SECTION_CODE;
  }

  // High-performance alternative to addInstructionParser(OP_CALL, ...).
  // Stores the hook map directly on the parser so the OP_CALL case in
  // _readInstruction can do an inline Map lookup without allocating a
  // BufferReader or slicing the output buffer per call instruction.
  //
  //   hookMap       — Map<adjustedCallTarget, hookArrayIndex>
  //   getReplacement(hookIdx) — returns the replacement function index (number)
  //   onApplied(hookIdx)      — called when a hook is applied (may be null)
  setCallHookData(hookMap, getReplacement, onApplied) {
    this._callHookMap = hookMap;
    this._callHookGetReplacement = getReplacement;
    this._callHookOnApplied = onApplied;
    this._callHookResolved = false;
    this._optionalSectionFlags |= 1 << SECTION_CODE;
  }

  // The hook map is handed to us before parsing, when the function indexes it
  // refers to are still unresolved WailVariables. Re-key it with the actual
  // numbers once _resolveTableIndices has run — otherwise every lookup in
  // _readInstruction compares a number against an object and silently misses,
  // which left every direct call to a hooked method un-redirected.
  _resolveCallHookMap() {
    if (this._callHookMap === null || this._callHookResolved) {
      return;
    }

    const resolved = new Map();

    for (const entry of this._callHookMap) {
      const target = entry[0];
      let index = target;

      if (target instanceof WailVariable) {
        index = target._value;
      } else if (target instanceof TypedWailVariable) {
        index = target._parent._value;
      }

      if (typeof index !== "number") {
        console.warn("[UnityWebModkit] Call hook target could not be resolved to a function index; " +
                     "that hook will fall back to a function-table patch");
        continue;
      }

      resolved.set(index, entry[1]);
    }

    this._callHookMap = resolved;
    this._callHookResolved = true;
  }

  addRawSection(id, sectionBytes) {
    const sectionEntry = {};

    if (typeof id !== "number") {
      throw new Error("Bad section index " + index + " in addRawSection()");
    }

    sectionEntry.id = id;
    sectionEntry.bytes = sectionBytes;

    this._newSections.push(sectionEntry);
  }

  _createVariable() {
    const variableId = this.__variables.length;

    const newVariable = new WailVariable(this, variableId);

    this.__variables.push(newVariable);

    return newVariable;
  }

  _getVariable(id) {
    return this.__variables[id];
  }

  _setVariable(id, value) {
    this.__variables[id] = value;
  }

  // Parses an array in order to expand any variables to their proper representation.
  // Throws an exception if the user has not specified a binary representation
  // (Such as passing a WailVariable instead of a TypedWailVariable
  _expandArrayVariables(array) {
    for (let i = 0; i < array.length; i++) {
      const currentValue = array[i];

      // TODO Remove spread operator since it's so slow
      if (currentValue instanceof Array) {
        array.splice(i, 1);

        array.splice(i, 0, ...currentValue);
      } else if (currentValue instanceof TypedWailVariable) {
        const thisVariable = currentValue;

        array.splice(i, 1);

        array.splice(i, 0, ...thisVariable.value);
      }
      // TODO Improve
      else if (currentValue instanceof WailVariable) {
        throw new Error("Untyped WailVariable in " + "_expandArrayVariables()");
      }
    }

    return array;
  }

  _readSection() {
    this.commitBytes();

    const id = this.readUint8();

    if (id > MAX_SECTION_ID) {
      throw new Error("Illegal section ID " + id + ". Probably parsing incorrectly");
    }

    let payloadLen;

    // Skip over removed sections
    if (this._removeSectionIds.includes(id)) {
      payloadLen = this.readVarUint32();
      this.inPos += payloadLen;   // advance past payload without allocating a copy

      this.updateCopyPosition();

      return;
    }

    let parseSection = false;

    if (this._requiredSectionFlags & (1 << id) || this._optionalSectionFlags & (1 << id)) {
      parseSection = true;
    }

    // The DataCount section violates the usual rule that non-custom sections must occur in
    // numeric order. As a result, we must not assume a section is missing just because we have
    // encountered the DataCount section
    if (id != SECTION_DATACOUNT || id != SECTION_TAG) {
      // At this point we want to check if a required section does not exist
      // If so, we want to add an empty version of that section and add any new
      // elements to it
      for (let missingId = 0; missingId < id; missingId++) {
        const thisFlag = 1 << missingId;

        const thisSectionRequired = this._requiredSectionFlags & thisFlag;

        if (thisSectionRequired && !(thisSectionRequired & this._parsedSections)) {
          switch (missingId) {
            case SECTION_TYPE:
              this._addTypeSection();
              break;
            case SECTION_IMPORT:
              this._addImportSection();
              break;
            case SECTION_FUNCTION:
              this._addFunctionSection();
              break;
            case SECTION_GLOBAL:
              this._addGlobalSection();
              break;
            case SECTION_EXPORT:
              this._addExportSection();
              break;
            case SECTION_START:
              this._addStartSection();
              break;
            case SECTION_ELEMENT:
              this._addElementSection();
              break;
            case SECTION_CODE:
              this._addCodeSection();
              break;
            case SECTION_DATA:
              this._addDataSection();
              break;
            default:
              throw new Error("Attempted to add unhandled section");
          }

          this._parsedSections |= thisFlag;

          // FIXME This breaks if we need to add 2 missing sections consecutively
          // See https://www.y8.com/games/slope_football for a testcase
          this.copyBuffer([id]);
        }
      }
    }

    for (let i = 0; i < this._newSections.length; i++) {
      const thisNewSection = this._newSections[i];

      if (id > thisNewSection.id) {
        const newPayload = thisNewSection.bytes;

        const newPayloadLen = VarUint32ToArray(newPayload.length);

        this.copyBuffer([thisNewSection.id]);
        this.copyBuffer(newPayloadLen);
        this.copyBuffer(newPayload);
      }
    }

    // Skip over the section if the user has not requested we parse it
    if (!parseSection) {
      payloadLen = this.readVarUint32();
      this.inPos += payloadLen;   // advance past payload; commitBytes next round copies it verbatim

      return;
    }

    // If we have passed the IMPORT section (Regardless of whether or not it exists)
    // it is safe to resolve any pending function indices
    if (id > SECTION_IMPORT && this._resolvedTables == false) {
      this._resolveTableIndices();
    }

    // Now we can handle the new section
    switch (id) {
      case SECTION_TYPE:
        this._parseTypeSection();
        break;
      case SECTION_IMPORT:
        this._parseImportSection();
        break;
      case SECTION_FUNCTION:
        this._parseFunctionSection();
        break;
      case SECTION_GLOBAL:
        this._parseGlobalSection();
        break;
      case SECTION_EXPORT:
        this._parseExportSection();
        break;
      case SECTION_START:
        this._parseStartSection();
        break;
      case SECTION_ELEMENT:
        this._parseElementSection();
        break;
      case SECTION_CODE:
        this._parseCodeSection();
        break;
      case SECTION_DATA:
        this._parseDataSection();
        break;
      default:
        throw new Error("Attempted to parse unhandled section");
    }

    this._parsedSections |= 1 << id;
  }

  // This function will resolve any WailVariables referring to indices into the function
  // or global tables. We need to wait until after the IMPORT section has been parsed
  // to do this because we need to know the count of imported functions/globals in
  // order to properly build the associated tables
  _resolveTableIndices() {
    const pendingFuncs = this._sectionOptions[SECTION_FUNCTION].pending;

    for (let i = 0; i < pendingFuncs.length; i++) {
      const oldIndex = pendingFuncs[i].oldIndex;
      const variable = pendingFuncs[i].variable;

      variable.value = this._getAdjustedFunctionIndex(oldIndex);
    }

    // Same logic as above, but with global indexes
    const pendingGlobals = this._sectionOptions[SECTION_GLOBAL].pending;

    for (let i = 0; i < pendingGlobals.length; i++) {
      const oldIndex = pendingGlobals[i].oldIndex;
      const variable = pendingGlobals[i].variable;

      variable.value = this._getAdjustedGlobalIndex(oldIndex);
    }

    this._resolvedTables = true;
  }

  _addTypeSection() {
    const reader = new BufferReader();

    const newEntries = this._sectionOptions[SECTION_TYPE].newEntries;

    const entryCountArray = VarUint32ToArray(newEntries.length);

    reader.copyBuffer(entryCountArray);

    for (let i = 0; i < newEntries.length; i++) {
      const optionsEntry = newEntries[i];

      const form = optionsEntry.form;
      const params = optionsEntry.params;

      let returnType = null;

      if (typeof optionsEntry.returnType !== "undefined") {
        returnType = optionsEntry.returnType;
      }

      if (optionsEntry.variable instanceof WailVariable) {
        optionsEntry.variable.value = oldCount + i;
      }

      reader.copyBuffer(Uint8ToArray(form));
      reader.copyBuffer(VarUint32ToArray(params.length));
      reader.copyBuffer(params);

      if (returnType !== null) {
        reader.copyBuffer(Uint8ToArray(1));
        reader.copyBuffer(Uint8ToArray(returnType));
      } else {
        reader.copyBuffer(Uint8ToArray(0));
      }
    }

    const newPayload = reader.write();
    const newPayloadLen = VarUint32ToArray(newPayload.length);

    this.copyBuffer([SECTION_TYPE]);
    this.copyBuffer(newPayloadLen);
    this.copyBuffer(newPayload);
  }

  _parseTypeSection() {
    this.commitBytes();

    const oldPayloadLen = this.readVarUint32();

    const start = this.inPos;
    const oldCount = this.readVarUint32();
    const oldCountLength = this.inPos - start;
    const typePayloadLen = oldPayloadLen - oldCountLength;
    const typePayloadStart = this.inPos;
    this.inPos += typePayloadLen;
    this.updateCopyPosition();
    const oldPayload = this.inBuffer.subarray(typePayloadStart, typePayloadStart + typePayloadLen);

    const reader = new BufferReader(oldPayload, this._scanOnly);

    const newEntries = this._sectionOptions[SECTION_TYPE].newEntries;
    const existingEntries = this._sectionOptions[SECTION_TYPE].existingEntries;

    const newCount = oldCount + newEntries.length;

    let populateThisTimeOnly = false;
    if (!window.UnityWebModkit.Runtime || !window.UnityWebModkit.Runtime.internalWasmTypes) {
      populateThisTimeOnly = true;
      window.UnityWebModkit.Runtime.internalWasmTypes = [];
    }

    reader.copyBuffer(VarUint32ToArray(newCount));

    for (let typeIndex = 0; typeIndex < oldCount; typeIndex++) {
      // TODO Is there any purpose to modifying form?
      const form = reader.readUint8();

      let paramCount = reader.readVarUint32();

      let params = [];

      for (let j = 0; j < paramCount; j++) {
        params.push(reader.readUint8());
      }

      let returnCount = reader.readUint8();

      let returnType = null;

      if (returnCount == 1) {
        returnType = reader.readUint8();
      }
      // Return count can only be 1 or 0
      else if (returnCount != 0) {
        throw new Error("Invalid returnCount");
      }

      for (let i = 0; i < existingEntries.length; i++) {
        const thisEntry = existingEntries[i];

        const thisIndex = thisEntry.index;

        if (typeIndex == thisIndex) {
          if (typeof thisEntry.params !== "undefined") {
            params = mod.params;
          }

          // TODO This doesn't allow for the possibility of removing return
          if (typeof thisEntry.returnType !== "undefined") {
            returnCount = 1;
            returnType = mod.returnType;
          }
        }
      }

      reader.copyBuffer(Uint8ToArray(form));
      reader.copyBuffer(VarUint32ToArray(params.length));
      reader.copyBuffer(params);

      if (returnCount) {
        reader.copyBuffer(Uint8ToArray(1));
        reader.copyBuffer(Uint8ToArray(returnType));
      } else {
        reader.copyBuffer(Uint8ToArray(0));
      }

      if (!populateThisTimeOnly) continue;

      window.UnityWebModkit.Runtime.internalWasmTypes.push({
        form: valueTypeStr[form],
        params: params.map((code) => valueTypeStr[code]),
        returnType: valueTypeStr[returnType],
      });
    }

    for (let i = 0; i < newEntries.length; i++) {
      const optionsEntry = newEntries[i];

      const form = optionsEntry.form;
      const params = optionsEntry.params;

      let returnType = null;

      if (typeof optionsEntry.returnType !== "undefined") {
        returnType = optionsEntry.returnType;
      }

      if (optionsEntry.variable instanceof WailVariable) {
        optionsEntry.variable.value = oldCount + i;
      }

      reader.copyBuffer(Uint8ToArray(form));
      reader.copyBuffer(VarUint32ToArray(params.length));
      reader.copyBuffer(params);

      if (returnType !== null) {
        reader.copyBuffer(Uint8ToArray(1));
        reader.copyBuffer(Uint8ToArray(returnType));
      } else {
        reader.copyBuffer(Uint8ToArray(0));
      }
    }

    const newPayload = reader.write();

    const newPayloadLen = VarUint32ToArray(newPayload.length);

    this.copyBuffer(newPayloadLen);
    this.copyBuffer(newPayload);
  }

  _addImportSection() {
    const newEntries = this._sectionOptions[SECTION_IMPORT].newEntries;
    if (newEntries.length === 0) return;

    // Pre-allocate buffer with estimated size
    const estimatedSize = newEntries.length * 64; // Rough estimate
    const writer = new BufferWriter(estimatedSize);

    writer.writeVarUint32(newEntries.length);

    let importFuncIndex = 0;
    let importGlobalIndex = 0;
    const importFuncCount = this._importFuncCount;
    const importGlobalCount = this._importGlobalCount;

    for (let i = 0; i < newEntries.length; i++) {
      const entry = newEntries[i];

      // Convert strings to bytes once
      const moduleBytes = stringToByteArray(entry.moduleStr);
      const fieldBytes = stringToByteArray(entry.fieldStr);

      writer.writeVarUint32(moduleBytes.length);
      writer.writeBytes(moduleBytes);
      writer.writeVarUint32(fieldBytes.length);
      writer.writeBytes(fieldBytes);

      // Write kind
      writer.writeUint8(entry.kind);

      // Handle type based on kind
      if (entry.kind === KIND_FUNC) {
        let typeBytes;
        if (entry.type instanceof TypedWailVariable) {
          typeBytes = entry.type.value;
        } else if (entry.type instanceof WailVariable) {
          throw new Error("Untyped WailVariable in _addImportSection()");
        } else {
          typeBytes = VarUint32ToArray(entry.type);
        }
        writer.writeBytes(typeBytes);

        // Set variable value
        if (entry.variable instanceof WailVariable) {
          entry.variable.value = importFuncCount + importFuncIndex;
        }
        importFuncIndex++;
      } else if (entry.kind === KIND_GLOBAL) {
        writer.writeUint8(entry.type);
        writer.writeUint8(entry.mutability);

        // Set variable value
        if (entry.variable instanceof WailVariable) {
          entry.variable.value = importGlobalCount + importGlobalIndex;
        }
        importGlobalIndex++;
      }
      // Other kinds could be added here if needed
    }

    const newPayload = writer.toUint8Array();
    const newPayloadLen = VarUint32ToArray(newPayload.length);

    this.copyBuffer([SECTION_IMPORT]);
    this.copyBuffer(newPayloadLen);
    this.copyBuffer(newPayload);

    // Resolve pending indices
    this._resolvePendingIndices();
  }

  // Helper method to resolve all pending indices
  _resolvePendingIndices() {
    // Resolve function indices
    const pendingFuncs = this._sectionOptions[SECTION_FUNCTION].pending;
    for (let i = 0; i < pendingFuncs.length; i++) {
      const pending = pendingFuncs[i];
      pending.variable.value = this._getAdjustedFunctionIndex(pending.oldIndex);
    }

    // Resolve global indices
    const pendingGlobals = this._sectionOptions[SECTION_GLOBAL].pending;
    for (let i = 0; i < pendingGlobals.length; i++) {
      const pending = pendingGlobals[i];
      pending.variable.value = this._getAdjustedGlobalIndex(pending.oldIndex);
    }
  }

  _parseImportSection() {
    this.commitBytes();

    const oldPayloadLen = this.readVarUint32();

    // Optimized position tracking
    const countStart = this.inPos;
    const oldCount = this.readVarUint32();
    const oldCountLength = this.inPos - countStart;
    const importPayloadLen = oldPayloadLen - oldCountLength;
    const importPayloadStart = this.inPos;
    this.inPos += importPayloadLen;
    this.updateCopyPosition();
    const oldPayload = this.inBuffer.subarray(importPayloadStart, importPayloadStart + importPayloadLen);
    const reader = new BufferReader(oldPayload);

    const newEntries = this._sectionOptions[SECTION_IMPORT].newEntries;
    const existingEntries = this._sectionOptions[SECTION_IMPORT].existingEntries;

    // Create lookup map for existing entries
    const existingEntriesMap = new Map();
    for (let i = 0; i < existingEntries.length; i++) {
      const entry = existingEntries[i];
      existingEntriesMap.set(entry.index, entry);
    }

    const globalImportCallback = this._globalImportCallback;
    const hasGlobalCallback = typeof globalImportCallback === "function";

    // Process existing imports
    for (let importIndex = 0; importIndex < oldCount; importIndex++) {
      reader.commitBytes();

      // Read module
      let moduleLen = reader.readVarUint32();
      let moduleBytes = reader.readBytes(moduleLen);

      // Read field
      let fieldLen = reader.readVarUint32();
      let fieldBytes = reader.readBytes(fieldLen);

      // Check for modifications
      const existingEntry = existingEntriesMap.get(importIndex);
      if (existingEntry) {
        if (existingEntry.moduleStr) {
          moduleBytes = existingEntry.moduleStr;
          moduleLen = moduleBytes.length;
        }
        if (existingEntry.fieldStr) {
          fieldBytes = existingEntry.fieldStr;
          fieldLen = fieldBytes.length;
        }
      }

      // Write back module and field
      reader.copyBuffer(VarUint32ToArray(moduleLen));
      reader.copyBuffer(moduleBytes);
      reader.copyBuffer(VarUint32ToArray(fieldLen));
      reader.copyBuffer(fieldBytes);

      // Read and process kind
      const kind = reader.readUint8();

      // Handle based on kind
      switch (kind) {
        case KIND_FUNC:
          this._importFuncCount++;
          reader.readVarUint32(); // Skip type index
          break;
        case KIND_TABLE:
          reader.readUint8(); // Skip elem_type
          const tableFlags = reader.readUint8();
          reader.readVarUint32(); // Skip initial
          if (tableFlags) {
            reader.readVarUint32(); // Skip maximum
          }
          break;
        case KIND_MEMORY:
          const memoryFlags = reader.readUint8();
          reader.readVarUint32(); // Skip initial
          if (memoryFlags) {
            reader.readVarUint32(); // Skip maximum
          }
          break;
        case KIND_GLOBAL:
          this._importGlobalCount++;
          reader.readUint8(); // Skip value_type
          reader.readUint8(); // Skip mutability
          break;
        default:
          throw new Error(`Invalid type kind: ${kind}`);
      }

      // Call global callback if exists
      if (hasGlobalCallback) {
        const parameters = {
          module: moduleBytes,
          field: fieldBytes,
          kind: kind,
        };
        globalImportCallback(parameters);
      }

      reader.commitBytes();
    }

    // Process new entries
    let newCount = oldCount;
    const importFuncCount = this._importFuncCount;
    const importGlobalCount = this._importGlobalCount;

    // Pre-allocate arrays for new entries if there are many
    if (newEntries.length > 0) {
      for (let i = 0; i < newEntries.length; i++, newCount++) {
        const entry = newEntries[i];

        // Convert strings once
        const moduleBytes = stringToByteArray(entry.moduleStr);
        const fieldBytes = stringToByteArray(entry.fieldStr);

        reader.copyBuffer(VarUint32ToArray(moduleBytes.length));
        reader.copyBuffer(moduleBytes);
        reader.copyBuffer(VarUint32ToArray(fieldBytes.length));
        reader.copyBuffer(fieldBytes);
        reader.copyBuffer([entry.kind]);

        if (entry.kind === KIND_FUNC) {
          let typeBytes;
          if (entry.type instanceof TypedWailVariable) {
            typeBytes = entry.type.value;
          } else if (entry.type instanceof WailVariable) {
            throw new Error("Untyped WailVariable in _parseImportSection()");
          } else {
            typeBytes = VarUint32ToArray(entry.type);
          }
          reader.copyBuffer(typeBytes);

          if (entry.variable instanceof WailVariable) {
            entry.variable.value = importFuncCount + i;
          }
        } else if (entry.kind === KIND_GLOBAL) {
          reader.copyBuffer([entry.type, entry.mutability]);

          if (entry.variable instanceof WailVariable) {
            entry.variable.value = importGlobalCount + i;
          }
        }
      }
    }

    // Write final output
    const newCountArray = VarUint32ToArray(newCount);
    const newPayload = reader.write();
    const newPayloadLen = VarUint32ToArray(newCountArray.length + newPayload.length);

    this.copyBuffer(newPayloadLen);
    this.copyBuffer(newCountArray);
    this.copyBuffer(newPayload);

    // Resolve pending indices if needed
    if (!this._resolvedTables) {
      this._resolveTableIndices();
    }
  }

  _addFunctionSection() {
    const reader = new BufferReader();

    const newEntries = this._sectionOptions[SECTION_FUNCTION].newEntries;

    const entryCountArray = VarUint32ToArray(newEntries.length);

    reader.copyBuffer(entryCountArray);

    for (let i = 0; i < newEntries.length; i++) {
      let optionsEntry = newEntries[i];

      let type;

      if (optionsEntry.type instanceof TypedWailVariable) {
        type = optionsEntry.type.value;
      } else if (optionsEntry.type instanceof WailVariable) {
        throw new Error("Untyped WailVariable in _parseFunctionSection()");
      } else {
        type = VarUint32ToArray(optionsEntry.type);
      }

      reader.copyBuffer(type);

      if (optionsEntry.variable instanceof WailVariable) {
        const functionIndex = i + this._importFuncCount;

        optionsEntry.variable.value = this._getAdjustedFunctionIndex(functionIndex);
      }
    }

    const newPayload = reader.write();
    const newPayloadLen = VarUint32ToArray(newPayload.length);

    this.copyBuffer([SECTION_FUNCTION]);
    this.copyBuffer(newPayloadLen);
    this.copyBuffer(newPayload);
  }

  _parseFunctionSection() {
    this.commitBytes();

    // Cache references for faster access
    const newEntries = this._sectionOptions[SECTION_FUNCTION].newEntries;
    const existingEntries = this._sectionOptions[SECTION_FUNCTION].existingEntries;

    const oldPayloadLen = this.readVarUint32();

    // Read old count with single position tracking
    const countStart = this.inPos;
    const oldCount = this.readVarUint32();
    const oldCountLength = this.inPos - countStart;
    const funcPayloadLen = oldPayloadLen - oldCountLength;
    const funcPayloadStart = this.inPos;
    this.inPos += funcPayloadLen;
    this.updateCopyPosition();
    const oldPayload = this.inBuffer.subarray(funcPayloadStart, funcPayloadStart + funcPayloadLen);
    const reader = new BufferReader(oldPayload);

    // Optimize Unity runtime check
    let populateThisTimeOnly = false;
    const unityRuntime = window.UnityWebModkit?.Runtime;
    if (unityRuntime) {
      if (!unityRuntime.internalWasmFunctions) {
        populateThisTimeOnly = true;
        unityRuntime.internalWasmFunctions = [];
      }
    }

    const internalWasmFunctions = unityRuntime?.internalWasmFunctions;

    // Create lookup map for existing entries to avoid O(n^2) search
    const existingEntriesMap = new Map();
    if (existingEntries.length > 0) {
      for (let i = 0; i < existingEntries.length; i++) {
        const entry = existingEntries[i];
        existingEntriesMap.set(entry.index, entry);
      }
    }

    // Pre-allocate array if populating (better for V8 optimization)
    let wasmFunctionsArray = null;
    if (populateThisTimeOnly && internalWasmFunctions) {
      wasmFunctionsArray = internalWasmFunctions;
    }

    // Process existing functions
    for (let funcIndex = 0; funcIndex < oldCount; funcIndex++) {
      reader.commitBytes();

      // Read current function type
      let funcType = reader.readVarUint32();

      // Check if we need to modify this function
      const existingEntry = existingEntriesMap.get(funcIndex);
      if (existingEntry) {
        funcType = existingEntry.type;
      }

      // Write back the (possibly modified) function type
      reader.copyBuffer(VarUint32ToArray(funcType));

      // Only populate if needed
      if (wasmFunctionsArray) {
        wasmFunctionsArray.push({ funcType });
      }
    }

    // Process new entries
    let newCount = oldCount;
    const importFuncCount = this._importFuncCount;

    for (let i = 0; i < newEntries.length; i++, newCount++) {
      const optionsEntry = newEntries[i];

      // Determine type with minimal branching
      let typeBytes;
      const typeField = optionsEntry.type;

      if (typeField instanceof TypedWailVariable) {
        typeBytes = typeField.value;
      } else if (typeField instanceof WailVariable) {
        throw new Error("Untyped WailVariable in _parseFunctionSection()");
      } else {
        typeBytes = VarUint32ToArray(typeField);
      }

      reader.copyBuffer(typeBytes);

      // Set variable value if needed
      const variable = optionsEntry.variable;
      if (variable instanceof WailVariable) {
        const functionIndex = newCount + importFuncCount;
        variable.value = this._getAdjustedFunctionIndex(functionIndex);
      }
    }

    // Write final output
    const newCountArray = VarUint32ToArray(newCount);
    const newPayload = reader.write();
    const newPayloadLen = VarUint32ToArray(newCountArray.length + newPayload.length);

    this.copyBuffer(newPayloadLen);
    this.copyBuffer(newCountArray);
    this.copyBuffer(newPayload);
  }

  _addGlobalSection() {
    const reader = new BufferReader();

    const newEntries = this._sectionOptions[SECTION_GLOBAL].newEntries;

    const entryCountArray = VarUint32ToArray(newEntries.length);

    reader.copyBuffer(entryCountArray);

    for (let i = 0; i < newEntries.length; i++) {
      const optionsEntry = newEntries[i];

      reader.copyBuffer(Uint8ToArray(optionsEntry.globalType.contentType));
      reader.copyBuffer(Uint8ToArray(optionsEntry.globalType.mutability));

      const initExpr = this._expandArrayVariables(optionsEntry.initExpr);

      reader.copyBuffer(initExpr);

      if (optionsEntry.variable instanceof WailVariable) {
        optionsEntry.variable.value = this._importGlobalCount + i;
      }
    }

    const newPayload = reader.write();
    const newPayloadLen = VarUint32ToArray(newPayload.length);

    this.copyBuffer([SECTION_GLOBAL]);
    this.copyBuffer(newPayloadLen);
    this.copyBuffer(newPayload);
  }

  _parseGlobalSection() {
    this.commitBytes();

    const oldPayloadLen = this.readVarUint32();

    const start = this.inPos;
    const oldCount = this.readVarUint32();
    const oldCountLength = this.inPos - start;
    const globalPayloadLen = oldPayloadLen - oldCountLength;
    const globalPayloadStart = this.inPos;
    this.inPos += globalPayloadLen;
    this.updateCopyPosition();
    const oldPayload = this.inBuffer.subarray(globalPayloadStart, globalPayloadStart + globalPayloadLen);

    const reader = new BufferReader(oldPayload);

    const newEntries = this._sectionOptions[SECTION_GLOBAL].newEntries;
    const existingEntries = this._sectionOptions[SECTION_GLOBAL].existingEntries;

    const newCount = oldCount + newEntries.length;

    reader.copyBuffer(VarUint32ToArray(newCount));

    for (let globalIndex = 0; globalIndex < oldCount; globalIndex++) {
      let newContentType;
      let newMutability;

      for (let i = 0; i < existingEntries.length; i++) {
        const thisEntry = existingEntries[i];

        let thisIndex = thisEntry.index;

        if (thisIndex instanceof WailVariable) {
          thisIndex = thisIndex.value;
        }

        if (globalIndex == thisIndex) {
          newContentType = thisEntry.globalType.contentType;
          newMutability = thisEntry.globalType.mutability;
        }
      }

      let contentType = reader.readUint8();

      if (typeof newContentType !== "undefined") {
        reader.copyBuffer([newContentType]);
      }

      reader.commitBytes();

      let mutability = reader.readUint8();

      if (typeof newMutability !== "undefined") {
        reader.copyBuffer([newMutability]);
      }

      let current;
      do {
        current = this._readInstruction(reader);
      } while (current !== OP_END);

      reader.commitBytes();
    }

    for (let i = 0; i < newEntries.length; i++) {
      const optionsEntry = newEntries[i];

      reader.copyBuffer([optionsEntry.globalType.contentType]);
      reader.copyBuffer([optionsEntry.globalType.mutability]);
      reader.copyBuffer(this._expandArrayVariables(optionsEntry.initExpr));

      if (optionsEntry.variable instanceof WailVariable) {
        optionsEntry.variable.value = this._importGlobalCount + oldCount + i;
      }
    }

    const newPayload = reader.write();

    const newPayloadLen = VarUint32ToArray(newPayload.length);

    this.copyBuffer(newPayloadLen);
    this.copyBuffer(newPayload);
  }

  _addExportSection() {
    const reader = new BufferReader();

    const newEntries = this._sectionOptions[SECTION_EXPORT].newEntries;

    const entryCountArray = VarUint32ToArray(newEntries.length);

    reader.copyBuffer(entryCountArray);

    for (let i = 0; i < newEntries.length; i++) {
      const optionsEntry = newEntries[i];

      const fieldStr = stringToByteArray(optionsEntry.fieldStr);
      const fieldLen = VarUint32ToArray(fieldStr.length);
      const kind = Uint8ToArray(optionsEntry.kind);

      let index;

      if (optionsEntry.index instanceof TypedWailVariable) {
        index = optionsEntry.index.value;
      } else if (optionsEntry.index instanceof WailVariable) {
        throw new Error("Untyped WailVariable in _parseExportSection()");
      } else {
        index = VarUint32ToArray(optionsEntry.index);
      }

      reader.copyBuffer(fieldLen);
      reader.copyBuffer(fieldStr);
      reader.copyBuffer(kind);
      reader.copyBuffer(index);
    }

    const newPayload = reader.write();
    const newPayloadLen = VarUint32ToArray(newPayload.length);

    this.copyBuffer([SECTION_EXPORT]);
    this.copyBuffer(newPayloadLen);
    this.copyBuffer(newPayload);
  }

  _parseExportSection() {
    this.commitBytes();

    const oldPayloadLen = this.readVarUint32();

    const exportPayloadStart = this.inPos;
    this.inPos += oldPayloadLen;
    this.updateCopyPosition();
    const oldPayload = this.inBuffer.subarray(exportPayloadStart, exportPayloadStart + oldPayloadLen);

    const reader = new BufferReader(oldPayload);

    const oldCount = reader.readVarUint32();

    const newEntries = this._sectionOptions[SECTION_EXPORT].newEntries;
    const existingEntries = this._sectionOptions[SECTION_EXPORT].existingEntries;

    const newCount = oldCount + newEntries.length;

    reader.copyBuffer(VarUint32ToArray(newCount));

    for (let exportIndex = 0; exportIndex < oldCount; exportIndex++) {
      reader.commitBytes();

      let fieldLen = reader.readVarUint32();
      let fieldStr = reader.readBytes(fieldLen);

      let kind = reader.readUint8();

      let oldIndex = reader.readVarUint32();

      for (let i = 0; i < existingEntries.length; i++) {
        const thisEntry = existingEntries[i];

        const thisIndex = thisEntry.index;

        if (exportIndex == thisIndex) {
          if (typeof thisEntry.fieldStr !== "undefined") {
            fieldStr = thisEntry.fieldStr;
            fieldLen = thisEntry.fieldStr.length;
          }

          if (typeof thisEntry.kind !== "undefined") {
            kind = thisEntry.kind;
          }

          if (typeof thisEntry.funcIndex !== "undefined") {
            oldIndex = thisEntry.funcIndex;
          }
        }
      }

      let newIndex = oldIndex;

      if (oldIndex instanceof WailVariable) {
        newIndex = oldIndex.value;
      } else {
        // Fix up export table based on any additions to the import table
        if (kind == KIND_FUNC) {
          newIndex = this._getAdjustedFunctionIndex(oldIndex);
        } else if (kind == KIND_GLOBAL) {
          newIndex = this._getAdjustedGlobalIndex(oldIndex);
        }
      }

      reader.copyBuffer(VarUint32ToArray(fieldLen));
      reader.copyBuffer(fieldStr);
      reader.copyBuffer([kind]);
      reader.copyBuffer(VarUint32ToArray(newIndex));

      // TODO Should return value of entry, not just name and kind
      // TODO Should allow modification
      if (typeof this._globalExportCallback === "function") {
        const parameters = {};

        parameters.field = fieldStr;
        parameters.kind = kind;

        this._globalExportCallback(parameters);
      }
    }

    for (let i = 0; i < newEntries.length; i++) {
      const optionsEntry = newEntries[i];

      const fieldStr = stringToByteArray(optionsEntry.fieldStr);
      const fieldLen = VarUint32ToArray(fieldStr.length);
      const kind = Uint8ToArray(optionsEntry.kind);

      let index;

      if (optionsEntry.index instanceof TypedWailVariable) {
        index = optionsEntry.index.value;
      } else if (optionsEntry.index instanceof WailVariable) {
        throw new Error("Untyped WailVariable in _parseExportSection()");
      } else {
        index = VarUint32ToArray(optionsEntry.index);
      }

      reader.copyBuffer(fieldLen);
      reader.copyBuffer(fieldStr);
      reader.copyBuffer(kind);
      reader.copyBuffer(index);
    }

    const newPayload = reader.write();

    const newPayloadLen = VarUint32ToArray(newPayload.length);

    this.copyBuffer(newPayloadLen);
    this.copyBuffer(newPayload);
  }

  _parseStartSection() {
    this.commitBytes();

    // We effectively ignore elementCount since (AFAIK) there is no circumstance
    // where there is more than one start entry in a binary
    const payloadSize = this.readVarUint32();
    const oldStart = this.readVarUint32();

    const existingEntries = this._sectionOptions[SECTION_START].existingEntries;

    let newStart;

    if (existingEntries.length > 0) {
      // As far as I can tell there's no purpose to calling editStartEntry multiple
      // times, but this is consistent with how other edit functions work
      for (let i = 0; i < existingEntries.length; i++) {
        const thisEntry = existingEntries[i];

        if (typeof thisEntry === "number") {
          newStart = thisEntry;
        } else if (thisEntry instanceof WailVariable) {
          newStart = thisEntry.value;
        } else {
          throw new Error("Invalid function index in _parseStartSection()");
        }
      }
    } else {
      newStart = this._getAdjustedFunctionIndex(oldStart);
    }

    const newStartArray = VarUint32ToArray(newStart);
    const newPayloadLen = VarUint32ToArray(newStartArray.length);

    this.copyBuffer(newPayloadLen);
    this.copyBuffer(newStartArray);
  }

  _addElementSection() {
    const reader = new BufferReader();

    const newEntries = this._sectionOptions[SECTION_ELEMENT].newEntries;

    const entryCountArray = VarUint32ToArray(newEntries.length);

    reader.copyBuffer(entryCountArray);

    for (let i = 0; i < newEntries.length; i++, newCount++) {
      const optionsEntry = newEntries[i];

      const index = optionsEntry.index;

      if (index != 0) {
        throw new Error("Unsupported element index " + index);
      }

      const offset = optionsEntry.offset;

      const elems = this._expandArrayVariables(optionsEntry.elems);

      const elemCount = elems.length;

      reader.copyBuffer(VarUint32ToArray(index));
      reader.copyBuffer(offset);
      reader.copyBuffer(VarUint32ToArray(elemCount));
      reader.copyBuffer(elems);
    }

    const newPayload = reader.write();
    const newPayloadLen = VarUint32ToArray(newPayload.length);

    this.copyBuffer([SECTION_ELEMENT]);
    this.copyBuffer(newPayloadLen);
    this.copyBuffer(newPayload);
  }

  _parseElementSection() {
    this.commitBytes();

    const oldPayloadLen = this.readVarUint32();

    const start = this.inPos;
    const oldCount = this.readVarUint32();
    const oldCountLength = this.inPos - start;
    const elemPayloadLen = oldPayloadLen - oldCountLength;
    const elemPayloadStart = this.inPos;
    this.inPos += elemPayloadLen;
    this.updateCopyPosition();
    const oldPayload = this.inBuffer.subarray(elemPayloadStart, elemPayloadStart + elemPayloadLen);

    const reader = new BufferReader(oldPayload, this._scanOnly);

    const newEntries = this._sectionOptions[SECTION_ELEMENT].newEntries;
    const existingEntries = this._sectionOptions[SECTION_ELEMENT].existingEntries;

    let populateThisTimeOnly = false;
    if (!window.UnityWebModkit.Runtime || !window.UnityWebModkit.Runtime.internalMappings) {
      populateThisTimeOnly = true;
      window.UnityWebModkit.Runtime.internalMappings = [];
    }

    for (let elemIndex = 0; elemIndex < oldCount; elemIndex++) {
      let memIndex = reader.readVarUint32();

      let current;
      // At time of writing, init expressions can only be simple expressions.
      // Therefore, it is safe to just parse until we find OP_END. However,
      // this may become unreliable in the future
      do {
        current = this._readInstruction(reader);
      } while (current !== OP_END);

      reader.commitBytes();

      let numElements = reader.readVarUint32();

      let elements = [];

      for (let i = 0; i < numElements; i++) {
        const oldIndex = reader.readVarUint32();

        const newIndex = this._getAdjustedFunctionIndex(oldIndex);

        elements.push(newIndex);
      }

      for (let i = 0; i < existingEntries.length; i++) {
        const thisEntry = existingEntries[i];

        const thisIndex = thisEntry.index;

        if (elemIndex == thisIndex) {
          // TODO Support WailVariables
          if (typeof thisEntry.elems !== "undefined") {
            elements = thisEntry.elems;
            numElements = elements.length;
          }
        }
      }

      reader.writeVarUint32(numElements);

      for (let i = 0; i < numElements; i++) {
        reader.writeVarUint32(elements[i]);
      }

      if (!populateThisTimeOnly) continue;

      window.UnityWebModkit.Runtime.internalMappings.push({
        index: memIndex,
        elements,
      });
    }

    let newCount = oldCount;

    for (let i = 0; i < newEntries.length; i++, newCount++) {
      const optionsEntry = newEntries[i];

      const index = optionsEntry.index;

      if (index != 0) {
        throw new Error("Unsupported element index " + index);
      }

      const offset = optionsEntry.offset;

      const elems = this._expandArrayVariables(optionsEntry.elems);

      const elemCount = elems.length;

      reader.copyBuffer(VarUint32ToArray(index));
      reader.copyBuffer(offset);
      reader.copyBuffer(VarUint32ToArray(elemCount));
      reader.copyBuffer(elems);
    }

    const newPayload = reader.write();

    const newCountArray = VarUint32ToArray(newCount);

    const newPayloadLen = VarUint32ToArray(newCountArray.length + newPayload.length);

    this.copyBuffer(newPayloadLen);
    this.copyBuffer(newCountArray);
    this.copyBuffer(newPayload);
  }

  _addCodeSection() {
    const reader = new BufferReader();

    const newEntries = this._sectionOptions[SECTION_CODE].newEntries;

    const entryCountArray = VarUint32ToArray(newEntries.length);

    reader.copyBuffer(entryCountArray);

    //

    const newPayload = reader.write();
    const newPayloadLen = VarUint32ToArray(newPayload.length);

    this.copyBuffer([SECTION_CODE]);
    this.copyBuffer(newPayloadLen);
    this.copyBuffer(newPayload);
  }

  _parseCodeSection() {
    this._resolveCallHookMap();

    this.commitBytes();

    const oldPayloadLen = this.readVarUint32();
    const codePayloadStart = this.inPos;
    this.inPos += oldPayloadLen;
    this.updateCopyPosition();
    const oldPayload = this.inBuffer.subarray(codePayloadStart, codePayloadStart + oldPayloadLen);
    const reader = new BufferReader(oldPayload);
    const oldCount = reader.readVarUint32();
    const newEntries = this._sectionOptions[SECTION_CODE].newEntries;
    const newCount = oldCount + newEntries.length;

    // Write new count once
    reader.copyBuffer(VarUint32ToArray(newCount));

    // Non-import functions always satisfy the >= importFuncCount branch in
    // _getAdjustedFunctionIndex, so we inline the adjustment once here and
    // eliminate 50k method calls in the hot loop.
    const importFuncCount = this._importFuncCount;
    const importFuncNewCount = this._importFuncNewCount;
    const funcIndexBase = importFuncCount + importFuncNewCount;

    // Cache existingEntries once — avoids 3 property lookups × 50k calls.
    const codeExistingEntries = this._sectionOptions[SECTION_CODE].existingEntries;

    // Create lookup map for new entries to avoid O(n^2) search
    const newEntriesMap = new Map();
    if (newEntries.length > 0) {
      for (let i = 0; i < newEntries.length; i++) {
        const entry = newEntries[i];
        let index = entry.index;
        if (index instanceof WailVariable) {
          index = index.value;
        }
        newEntriesMap.set(index, entry);
      }
    }

    // Shared BufferReader instances — reset() per function instead of
    // allocating new ones.  For games with 50k+ functions this cuts away
    // ~100k Uint8Array allocations (and the matching 2× output buffers)
    // which was the primary source of GC stalls during CODE section parsing.
    const sharedBodyReader = new BufferReader();

    // Hot loop — every function in the CODE section runs through this.
    // _readFunction no longer returns metadata; we just parse and rewrite.
    for (let i = 0; i < oldCount; i++) {
      this._readFunction(reader, funcIndexBase + i, sharedBodyReader, codeExistingEntries);
    }

    // Process new entries using the pre-built map
    if (newEntries.length > 0) {
      for (let currentIndex = oldCount; currentIndex < newCount; currentIndex++) {
        const realIndex = this._funcSectionIndexToFuncTableIndex(currentIndex);
        const optionsEntry = newEntriesMap.get(realIndex);

        if (!optionsEntry) {
          throw new Error(`No CODE entry found for index ${realIndex}`);
        }

        // Build body directly without creating multiple BufferReader objects
        const bodyParts = [];
        const locals = optionsEntry.locals;

        // Write locals count
        bodyParts.push(...VarUint32ToArray(locals.length));

        // Write each local
        for (let i = 0; i < locals.length; i++) {
          bodyParts.push(...VarUint32ToArray(1));
          bodyParts.push(locals[i]);
        }

        // Write code
        const expandedCode = this._expandArrayVariables(optionsEntry.code);
        bodyParts.push(...expandedCode);

        // Convert to Uint8Array once
        const bodyPayload = new Uint8Array(bodyParts);
        const bodySize = VarUint32ToArray(bodyPayload.length);

        // Write to main reader
        reader.copyBuffer(bodySize);
        reader.copyBuffer(bodyPayload);
      }
    }

    const newPayload = reader.write();
    const newPayloadLen = VarUint32ToArray(newPayload.length);

    this.copyBuffer(newPayloadLen);
    this.copyBuffer(newPayload);
  }

  _addDataSection() {
    const reader = new BufferReader();

    const newEntries = this._sectionOptions[SECTION_DATA].newEntries;

    const entryCountArray = VarUint32ToArray(newEntries.length);

    reader.copyBuffer(entryCountArray);

    for (let i = 0; i < newEntries.length; i++) {
      const optionsEntry = newEntries[i];

      let index;

      if (typeof optionsEntry.index !== "undefined") {
        index = VarUint32ToArray(optionsEntry.index);
      } else {
        index = VarUint32ToArray(0);
      }

      const offset = optionsEntry.offset;

      // Initialization expressions must always end with an "end" instruction
      if (offset[offset.length - 1] != OP_END) {
        offset.push(OP_END);
      }

      const data = optionsEntry.data;
      const size = VarUint32ToArray(data.length);

      reader.copyBuffer(index);
      reader.copyBuffer(offset);
      reader.copyBuffer(size);
      reader.copyBuffer(data);
    }

    const newPayload = reader.write();
    const newPayloadLen = VarUint32ToArray(newPayload.length);

    this.copyBuffer([SECTION_DATA]);
    this.copyBuffer(newPayloadLen);
    this.copyBuffer(newPayload);
  }

  _parseDataSection() {
    this.commitBytes();

    const oldPayloadLen = this.readVarUint32();

    const start = this.inPos;
    const oldCount = this.readVarUint32();
    const oldCountLength = this.inPos - start;
    const dataPayloadLen = oldPayloadLen - oldCountLength;
    const dataPayloadStart = this.inPos;
    this.inPos += dataPayloadLen;
    this.updateCopyPosition();
    const oldPayload = this.inBuffer.subarray(dataPayloadStart, dataPayloadStart + dataPayloadLen);

    const reader = new BufferReader(oldPayload);

    const newEntries = this._sectionOptions[SECTION_DATA].newEntries;
    const existingEntries = this._sectionOptions[SECTION_DATA].existingEntries;

    const newCount = oldCount + newEntries.length;

    reader.copyBuffer(VarUint32ToArray(newCount));

    for (let dataIndex = 0; dataIndex < oldCount; dataIndex++) {
      let current;
      do {
        current = this._readInstruction(reader);
      } while (current !== OP_END);

      reader.commitBytes();

      let size = reader.readVarUint32();

      let data = reader.readBytes(size);

      for (let i = 0; i < existingEntries.length; i++) {
        const thisEntry = existingEntries[i];

        const thisIndex = thisEntry.index;

        if (dataIndex == thisIndex) {
          if (typeof thisEntry.data !== "undefined") {
            data = thisEntry.data;
            size = data.length;
          }
        }
      }

      reader.copyBuffer(VarUint32ToArray(size));
      reader.copyBuffer(data);
    }

    for (let i = 0; i < newEntries.length; i++) {
      const optionsEntry = newEntries[i];

      let index;

      if (typeof optionsEntry.index !== "undefined") {
        index = VarUint32ToArray(optionsEntry.index);
      } else {
        index = VarUint32ToArray(0);
      }

      const offset = optionsEntry.offset;

      // Initialization expressions must always end with an "end" instruction
      if (offset[offset.length - 1] != OP_END) {
        offset.push(OP_END);
      }

      const data = optionsEntry.data;
      const size = VarUint32ToArray(data.length);

      reader.copyBuffer(index);
      reader.copyBuffer(offset);
      reader.copyBuffer(size);
      reader.copyBuffer(data);
    }

    const newPayload = reader.write();

    const newPayloadLen = VarUint32ToArray(newPayload.length);

    this.copyBuffer(newPayloadLen);
    this.copyBuffer(newPayload);
  }

  // TODO Modify locals/params
  // sharedBodyReader is a pre-allocated BufferReader passed in from
  // _parseCodeSection and reset() per function, eliminating the
  // `new BufferReader + new Uint8Array(2×)` allocations that previously
  // dominated GC time when parsing games with tens of thousands of functions.
  // existingEntries is pre-fetched by _parseCodeSection to avoid repeated
  // property lookups (this._sectionOptions[SECTION_CODE].existingEntries).
  _readFunction(reader, funcIndex, sharedBodyReader, existingEntries) {
    const bodySize = reader.readVarUint32();

    // Non-owning view — no copy.  reader.inPos was already advanced past the
    // body by advancing it below; we grab the view before doing so.
    const bodyStart = reader.inPos;
    reader.inPos += bodySize;
    const bodyPayload = reader.inBuffer.subarray(bodyStart, reader.inPos);

    // Detect per-function modifications (rare) to decide fast vs. slow path.
    // _hasSpecialFunctions is false when no per-function callbacks or editCodeEntry
    // calls have been registered — short-circuits all three inner checks with one
    // boolean read, saving ~4 property lookups × 50k functions in typical usage.
    let needsSpecial = false;
    if (this._hasSpecialFunctions) {
      needsSpecial = typeof this._globalFunctionCallback === "function";
      if (!needsSpecial && existingEntries.length > 0) {
        for (let i = 0; i < existingEntries.length; i++) {
          let idx = existingEntries[i].index;
          if (idx instanceof WailVariable) idx = idx.value;
          if (idx === funcIndex) { needsSpecial = true; break; }
        }
      }
      if (!needsSpecial && this._functionCallbacks.length > 0) {
        for (let i = 0; i < this._functionCallbacks.length; i++) {
          let idx = this._functionCallbacks[i].index;
          if (idx instanceof WailVariable) idx = idx.value;
          if (idx === funcIndex) { needsSpecial = true; break; }
        }
      }
    }

    if (!needsSpecial) {
      // The locals header is never modified, so measure it in place rather than
      // round-tripping it through a second BufferReader (a reset + commitBytes +
      // writeDirectBytes per function, tens of thousands of times per load).
      let hp = 0;
      let byte;
      let localCount = 0;
      let shift = 0;
      do {
        byte = bodyPayload[hp++];
        localCount |= (byte & 0x7f) << shift;
        shift += 7;
      } while (byte & 0x80);
      for (let i = 0; i < localCount; i++) {
        do { byte = bodyPayload[hp++]; } while (byte & 0x80); // local run length
        hp++;                                                 // value type
      }
      const headerLen = hp;

      // Ultra-fast path: if the body contains no 0x10 (OP_CALL) bytes AND there
      // are no global-index adjustments needed, no instruction needs modification,
      // so the whole entry — header included — is emitted verbatim in one write.
      // Uint8Array.includes() is implemented in native code and is far faster than
      // 100+ _readInstruction() calls per function body.
      // indexOf with a start offset avoids allocating the subarray that
      // .includes() would need — one less throwaway view per function.
      if (this._importGlobalNewCount === 0 && !this._hasInstructionCallbacks &&
          bodyPayload.indexOf(0x10, headerLen) === -1) {
        reader.writeVarUint32(bodyPayload.length);
        reader.writeDirectBytes(bodyPayload, 0, bodyPayload.length);
        return;
      }

      sharedBodyReader.reset(bodyPayload.subarray(headerLen));
      const bodyReader = sharedBodyReader;

      while (bodyReader.inPos < bodyReader.inBuffer.length) {
        this._readInstruction(bodyReader);
      }
      // Flush the run of unmodified instructions trailing the last OP_CALL.
      bodyReader.commitBytes();

      // Write size + header + body directly without intermediate .slice() calls.
      reader.writeVarUint32(headerLen + bodyReader.outPos);
      reader.writeDirectBytes(bodyPayload, 0, headerLen);
      reader.writeDirectBytes(bodyReader.outBuffer, 0, bodyReader.outPos);
      return;
    }

    // Slow path — per-function callbacks or existingEntries replacement.
    // Use the same non-owning bodyPayload view; allocate fresh readers here
    // since these cases are rare and the allocation cost is acceptable.
    const headerReader = new BufferReader(bodyPayload);

    const localCount = headerReader.readVarUint32();
    for (let i = 0; i < localCount; i++) {
      headerReader.readVarUint32();
      headerReader.readUint8();
    }
    headerReader.commitBytes();

    const bodyReader = new BufferReader(bodyPayload.subarray(headerReader.inPos));

    while (bodyReader.inPos < bodyReader.inBuffer.length) {
      this._readInstruction(bodyReader);
    }
    // See _readInstruction: the trailing unmodified run is still uncommitted.
    bodyReader.commitBytes();

    let newHeader = headerReader.write();
    let newBody = bodyReader.write();

    // TODO Should probably prioritize non-global callbacks over global callbacks
    if (typeof this._globalFunctionCallback === "function") {
      const parameters = {};

      parameters.bytes = bodyReader.write();
      parameters.index = funcIndex;

      const callbackResult = this._globalFunctionCallback(parameters);

      if (callbackResult !== false) {
        newBody = callbackResult;
      }
    } else {
      // TODO Callback should send and receive local info to/from callback
      for (let i = 0; i < this._functionCallbacks.length; i++) {
        const thisCallback = this._functionCallbacks[i];

        let thisIndex = thisCallback.index;

        if (thisIndex instanceof WailVariable) {
          thisIndex = thisIndex.value;
        }

        if (thisIndex === funcIndex) {
          const parameters = {};

          parameters.bytes = bodyReader.write();
          parameters.index = funcIndex;

          // TODO Handle locals as well
          const callbackResult = thisCallback.callback(parameters);

          if (callbackResult !== false) {
            newBody = callbackResult;
          }
        }
      }
    }

    for (let i = 0; i < existingEntries.length; i++) {
      const thisEntry = existingEntries[i];

      let thisIndex = thisEntry.index;

      if (thisIndex instanceof WailVariable) {
        thisIndex = thisIndex.value;
      }

      if (funcIndex == thisIndex) {
        const newHeaderReader = new BufferReader();
        const newBodyReader = new BufferReader();

        const locals = thisEntry.locals;

        newHeaderReader.copyBuffer(VarUint32ToArray(locals.length));

        for (let i = 0; i < locals.length; i++) {
          const thisLocal = locals[i];

          newHeaderReader.copyBuffer(VarUint32ToArray(1));
          newHeaderReader.copyBuffer(Uint8ToArray(thisLocal));
        }

        const code = this._expandArrayVariables(thisEntry.code);

        newBodyReader.copyBuffer(code);

        newHeader = newHeaderReader.write();
        newBody = newBodyReader.write();
      }
    }

    reader.writeVarUint32(newHeader.length + newBody.length);
    reader.writeDirectBytes(newHeader, 0, newHeader.length);
    reader.writeDirectBytes(newBody, 0, newBody.length);

    // No callers read the return value any more; the only reads were the
    // internalWasmCode populating path, which is gone.
  }

  _readInstruction(reader) {
    // commitBytes() here was always a no-op: every caller ensures _copyPos===inPos
    // before this call (either via copyBuffer or the previous _readInstruction's
    // own trailing commitBytes). Removing it saves one method call per instruction.
    if (this._hasInstructionCallbacks) {
      // Flush whatever run is pending first: the anchor must mark the start of
      // *this* instruction's output, not the start of the uncommitted run
      // that precedes it.
      reader.commitBytes();
      reader.setAnchor();
    }

    const opcode = reader.readUint8();

    let oldTarget;
    let newTarget;
    let arg;

    switch (opcode) {
      case OP_UNREACHABLE:
      case OP_NOP:
      case OP_ELSE:
      case OP_END:
      case OP_RETURN:
      case OP_DROP:
      case OP_SELECT:
      case OP_I32_EQZ:
      case OP_I32_EQ:
      case OP_I32_NE:
      case OP_I32_LT_S:
      case OP_I32_LT_U:
      case OP_I32_GT_S:
      case OP_I32_GT_U:
      case OP_I32_LE_S:
      case OP_I32_LE_U:
      case OP_I32_GE_S:
      case OP_I32_GE_U:
      case OP_I64_EQZ:
      case OP_I64_EQ:
      case OP_I64_NE:
      case OP_I64_LT_S:
      case OP_I64_LT_U:
      case OP_I64_GT_S:
      case OP_I64_GT_U:
      case OP_I64_LE_S:
      case OP_I64_LE_U:
      case OP_I64_GE_S:
      case OP_I64_GE_U:
      case OP_F32_EQ:
      case OP_F32_NE:
      case OP_F32_LT:
      case OP_F32_GT:
      case OP_F32_LE:
      case OP_F32_GE:
      case OP_F64_EQ:
      case OP_F64_NE:
      case OP_F64_LT:
      case OP_F64_GT:
      case OP_F64_LE:
      case OP_F64_GE:
      case OP_I32_CLZ:
      case OP_I32_CTZ:
      case OP_I32_POPCNT:
      case OP_I32_ADD:
      case OP_I32_SUB:
      case OP_I32_MUL:
      case OP_I32_DIV_S:
      case OP_I32_DIV_U:
      case OP_I32_REM_S:
      case OP_I32_REM_U:
      case OP_I32_AND:
      case OP_I32_OR:
      case OP_I32_XOR:
      case OP_I32_SHL:
      case OP_I32_SHR_S:
      case OP_I32_SHR_U:
      case OP_I32_ROTL:
      case OP_I32_ROTR:
      case OP_I64_CLZ:
      case OP_I64_CTZ:
      case OP_I64_POPCNT:
      case OP_I64_ADD:
      case OP_I64_SUB:
      case OP_I64_MUL:
      case OP_I64_DIV_S:
      case OP_I64_DIV_U:
      case OP_I64_REM_S:
      case OP_I64_REM_U:
      case OP_I64_AND:
      case OP_I64_OR:
      case OP_I64_XOR:
      case OP_I64_SHL:
      case OP_I64_SHR_S:
      case OP_I64_SHR_U:
      case OP_I64_ROTL:
      case OP_I64_ROTR:
      case OP_F32_ABS:
      case OP_F32_NEG:
      case OP_F32_CEIL:
      case OP_F32_FLOOR:
      case OP_F32_TRUNC:
      case OP_F32_NEAREST:
      case OP_F32_SQRT:
      case OP_F32_ADD:
      case OP_F32_SUB:
      case OP_F32_MUL:
      case OP_F32_DIV:
      case OP_F32_MIN:
      case OP_F32_MAX:
      case OP_F32_COPYSIGN:
      case OP_F64_ABS:
      case OP_F64_NEG:
      case OP_F64_CEIL:
      case OP_F64_FLOOR:
      case OP_F64_TRUNC:
      case OP_F64_NEAREST:
      case OP_F64_SQRT:
      case OP_F64_ADD:
      case OP_F64_SUB:
      case OP_F64_MUL:
      case OP_F64_DIV:
      case OP_F64_MIN:
      case OP_F64_MAX:
      case OP_F64_COPYSIGN:
      case OP_I32_WRAP_I64:
      case OP_I32_TRUNC_S_F32:
      case OP_I32_TRUNC_U_F32:
      case OP_I32_TRUNC_S_F64:
      case OP_I32_TRUNC_U_F64:
      case OP_I64_EXTEND_S_I32:
      case OP_I64_EXTEND_U_I32:
      case OP_I64_TRUNC_S_F32:
      case OP_I64_TRUNC_U_F32:
      case OP_I64_TRUNC_S_F64:
      case OP_I64_TRUNC_U_F64:
      case OP_F32_CONVERT_S_I32:
      case OP_F32_CONVERT_U_I32:
      case OP_F32_CONVERT_S_I64:
      case OP_F32_CONVERT_U_I64:
      case OP_F32_DEMOTE_F64:
      case OP_F64_CONVERT_S_I32:
      case OP_F64_CONVERT_U_I32:
      case OP_F64_CONVERT_S_I64:
      case OP_F64_CONVERT_U_I64:
      case OP_F64_PROMOTE_F32:
      case OP_I32_REINTERPRET_F32:
      case OP_I64_REINTERPRET_F64:
      case OP_F32_REINTERPRET_I32:
      case OP_F64_REINTERPRET_I64:
        break;
      case OP_BLOCK:
      case OP_LOOP:
      case OP_IF:
      case OP_MEMORY_SIZE:
      case OP_MEMORY_GROW:
        reader.readUint8();
        break;
      case OP_BR:
      case OP_BR_IF:
      case OP_GET_LOCAL:
      case OP_SET_LOCAL:
      case OP_TEE_LOCAL:
      case OP_I32_CONST:
      case OP_I64_CONST:
        reader.readVarUint32();
        break;
      case OP_GET_GLOBAL:
      case OP_SET_GLOBAL:
        if (this._importGlobalNewCount !== 0) {
          reader.commitBytes();
          oldTarget = reader.readVarUint32();
          newTarget = this._getAdjustedGlobalIndex(oldTarget);
          reader.writeVarUint32(newTarget);
        } else {
          reader.readVarUint32();   // no adjustment needed — just skip the arg
        }
        break;
      case OP_F32_CONST:
        reader.readBytes(4);
        break;
      case OP_F64_CONST:
        reader.readBytes(8);
        break;
      case OP_I32_LOAD:
      case OP_I64_LOAD:
      case OP_F32_LOAD:
      case OP_F64_LOAD:
      case OP_I32_LOAD8_S:
      case OP_I32_LOAD8_U:
      case OP_I32_LOAD16_S:
      case OP_I32_LOAD16_U:
      case OP_I64_LOAD8_S:
      case OP_I64_LOAD8_U:
      case OP_I64_LOAD16_S:
      case OP_I64_LOAD16_U:
      case OP_I64_LOAD32_S:
      case OP_I64_LOAD32_U:
      case OP_I32_STORE:
      case OP_I64_STORE:
      case OP_F32_STORE:
      case OP_F64_STORE:
      case OP_I32_STORE8:
      case OP_I32_STORE16:
      case OP_I64_STORE8:
      case OP_I64_STORE16:
      case OP_I64_STORE32:
        reader.readVarUint32();
        reader.readVarUint32();
        break;
      case OP_BR_TABLE:
        const count = reader.readVarUint32();

        for (let i = 0; i < count; i++) {
          reader.readVarUint32();
        }

        reader.readVarUint32();
        break;
      case OP_CALL:
        reader.commitBytes();

        oldTarget = reader.readVarUint32();

        newTarget = this._getAdjustedFunctionIndex(oldTarget);

        // Inline hook replacement — avoids allocating a BufferReader and
        // slicing the output buffer (readFromAnchor) for every OP_CALL.
        if (this._callHookMap !== null) {
          const hookIdx = this._callHookMap.get(newTarget);
          if (hookIdx !== undefined) {
            const replacement = this._callHookGetReplacement(hookIdx);
            const resolved = replacement instanceof WailVariable ? replacement._value
                           : replacement instanceof TypedWailVariable ? replacement._parent._value
                           : replacement;
            if (typeof resolved === "number") {
              newTarget = resolved;
              if (this._callHookOnApplied !== null) this._callHookOnApplied(hookIdx);
            }
          }
        }

        reader.writeVarUint32(newTarget);
        break;
      case OP_CALL_INDIRECT:
        reader.readVarUint32();
        reader.readUint8();
        break;
      case OP_I32_EXTEND8_S:
      case OP_I32_EXTEND16_S:
      case OP_I64_EXTEND8_S:
      case OP_I64_EXTEND16_S:
      case OP_I64_EXTEND32_S:
        break;
      case OP_BULK_MEMORY:
        arg = reader.readUint8();

        switch (arg) {
          case ARG_MEMORY_INIT:
          case ARG_TABLE_INIT:
            reader.readVarUint32();
            reader.readUint8();
            break;
          case ARG_DATA_DROP:
          case ARG_ELEM_DROP:
            reader.readVarUint32();
            break;
          case ARG_MEMORY_COPY:
          case ARG_TABLE_COPY:
            reader.readUint8();
            reader.readUint8();
            break;
          case ARG_MEMORY_FILL:
            reader.readUint8();
            break;
          default:
            throw new Error("Unknown argument '" + arg + "' for OP_BULK_MEMORY");
        }
        break;
      case OP_SIMD:
        arg = reader.readUint8();

        switch (arg) {
          case SIMD_I8X16_SWIZZLE:
          case SIMD_I8X16_SPLAT:
          case SIMD_I16X8_SPLAT:
          case SIMD_I32X4_SPLAT:
          case SIMD_I64X2_SPLAT:
          case SIMD_F32X4_SPLAT:
          case SIMD_F64X2_SPLAT:
          case SIMD_I8X16_EQ:
          case SIMD_I8X16_NE:
          case SIMD_I8X16_LT_S:
          case SIMD_I8X16_LT_U:
          case SIMD_I8X16_GT_S:
          case SIMD_I8X16_GT_U:
          case SIMD_I8X16_LE_S:
          case SIMD_I8X16_LE_U:
          case SIMD_I8X16_GE_S:
          case SIMD_I8X16_GE_U:
          case SIMD_I16X8_EQ:
          case SIMD_I16X8_NE:
          case SIMD_I16X8_LT_S:
          case SIMD_I16X8_LT_U:
          case SIMD_I16X8_GT_S:
          case SIMD_I16X8_GT_U:
          case SIMD_I16X8_LE_S:
          case SIMD_I16X8_LE_U:
          case SIMD_I16X8_GE_S:
          case SIMD_I16X8_GE_U:
          case SIMD_I32X4_EQ:
          case SIMD_I32X4_NE:
          case SIMD_I32X4_LT_S:
          case SIMD_I32X4_LT_U:
          case SIMD_I32X4_GT_S:
          case SIMD_I32X4_GT_U:
          case SIMD_I32X4_LE_S:
          case SIMD_I32X4_LE_U:
          case SIMD_I32X4_GE_S:
          case SIMD_I32X4_GE_U:
          case SIMD_F32X4_EQ:
          case SIMD_F32X4_NE:
          case SIMD_F32X4_LT:
          case SIMD_F32X4_GT:
          case SIMD_F32X4_LE:
          case SIMD_F32X4_GE:
          case SIMD_F64X2_EQ:
          case SIMD_F64X2_NE:
          case SIMD_F64X2_LT:
          case SIMD_F64X2_GT:
          case SIMD_F64X2_LE:
          case SIMD_F64X2_GE:
          case SIMD_V128_NOT:
          case SIMD_V128_AND:
          case SIMD_V128_ANDNOT:
          case SIMD_V128_OR:
          case SIMD_V128_XOR:
          case SIMD_V128_BITSELECT:
          case SIMD_I8X16_ABS:
          case SIMD_I8X16_NEG:
          case SIMD_I8X16_ALL_TRUE:
          case SIMD_I8X16_BITMASK:
          case SIMD_I8X16_NARROW_I16X8_S:
          case SIMD_I8X16_NARROW_I16X8_U:
          case SIMD_I8X16_SHL:
          case SIMD_I8X16_SHR_S:
          case SIMD_I8X16_SHR_U:
          case SIMD_I8X16_ADD:
          case SIMD_I8X16_ADD_SAT_S:
          case SIMD_I8X16_ADD_SAT_U:
          case SIMD_I8X16_SUB:
          case SIMD_I8X16_SUB_SAT_S:
          case SIMD_I8X16_SUB_SAT_U:
          case SIMD_I8X16_MIN_S:
          case SIMD_I8X16_MIN_U:
          case SIMD_I8X16_MAX_S:
          case SIMD_I8X16_MAX_U:
          case SIMD_I8X16_AVGR_U:
          case SIMD_I16X8_ABS:
          case SIMD_I16X8_NEG:
          case SIMD_I16X8_ALL_TRUE:
          case SIMD_I16X8_BITMASK:
          case SIMD_I16X8_NARROW_I32X4_S:
          case SIMD_I16X8_NARROW_I32X4_U:
          case SIMD_I16X8_EXTEND_LOW_I8X16_S:
          case SIMD_I16X8_EXTEND_HIGH_I8X16_S:
          case SIMD_I16X8_EXTEND_LOW_I8X16_U:
          case SIMD_I16X8_EXTEND_HIGH_I8X16_U:
          case SIMD_I16X8_SHL:
          case SIMD_I16X8_SHR_S:
          case SIMD_I16X8_SHR_U:
          case SIMD_I16X8_ADD:
          case SIMD_I16X8_ADD_SAT_S:
          case SIMD_I16X8_ADD_SAT_U:
          case SIMD_I16X8_SUB:
          case SIMD_I16X8_SUB_SAT_S:
          case SIMD_I16X8_SUB_SAT_U:
          case SIMD_I16X8_MUL:
          case SIMD_I16X8_MIN_S:
          case SIMD_I16X8_MIN_U:
          case SIMD_I16X8_MAX_S:
          case SIMD_I16X8_MAX_U:
          case SIMD_I16X8_AVGR_U:
          case SIMD_I32X4_ABS:
          case SIMD_I32X4_NEG:
          case SIMD_I32X4_ALL_TRUE:
          case SIMD_I32X4_BITMASK:
          case SIMD_I32X4_EXTEND_LOW_I16X8_S:
          case SIMD_I32X4_EXTEND_HIGH_I16X8_S:
          case SIMD_I32X4_EXTEND_LOW_I16X8_U:
          case SIMD_I32X4_EXTEND_HIGH_I16X8_U:
          case SIMD_I32X4_SHL:
          case SIMD_I32X4_SHR_S:
          case SIMD_I32X4_SHR_U:
          case SIMD_I32X4_ADD:
          case SIMD_I32X4_SUB:
          case SIMD_I32X4_MUL:
          case SIMD_I32X4_MIN_S:
          case SIMD_I32X4_MIN_U:
          case SIMD_I32X4_MAX_S:
          case SIMD_I32X4_MAX_U:
          case SIMD_I32X4_DOT_I16X8_S:
          case SIMD_I64X2_ABS:
          case SIMD_I64X2_NEG:
          case SIMD_I64X2_BITMASK:
          case SIMD_I64X2_EXTEND_LOW_I32X4_S:
          case SIMD_I64X2_EXTEND_HIGH_I32X4_S:
          case SIMD_I64X2_EXTEND_LOW_I32X4_U:
          case SIMD_I64X2_EXTEND_HIGH_I32X4_U:
          case SIMD_I64X2_SHL:
          case SIMD_I64X2_SHR_S:
          case SIMD_I64X2_SHR_U:
          case SIMD_I64X2_ADD:
          case SIMD_I64X2_SUB:
          case SIMD_I64X2_MUL:
          case SIMD_F32X4_CEIL:
          case SIMD_F32X4_FLOOR:
          case SIMD_F32X4_TRUNC:
          case SIMD_F32X4_NEAREST:
          case SIMD_F64X2_CEIL:
          case SIMD_F64X2_FLOOR:
          case SIMD_F64X2_TRUNC:
          case SIMD_F64X2_NEAREST:
          case SIMD_F32X4_ABS:
          case SIMD_F32X4_NEG:
          case SIMD_F32X4_SQRT:
          case SIMD_F32X4_ADD:
          case SIMD_F32X4_SUB:
          case SIMD_F32X4_MUL:
          case SIMD_F32X4_DIV:
          case SIMD_F32X4_MIN:
          case SIMD_F32X4_MAX:
          case SIMD_F32X4_PMIN:
          case SIMD_F32X4_PMAX:
          case SIMD_F64X2_ABS:
          case SIMD_F64X2_NEG:
          case SIMD_F64X2_SQRT:
          case SIMD_F64X2_ADD:
          case SIMD_F64X2_SUB:
          case SIMD_F64X2_MUL:
          case SIMD_F64X2_DIV:
          case SIMD_F64X2_MIN:
          case SIMD_F64X2_MAX:
          case SIMD_F64X2_PMIN:
          case SIMD_F64X2_PMAX:
          case SIMD_I32X4_TRUNC_SAT_F32X4_S:
          case SIMD_I32X4_TRUNC_SAT_F32X4_U:
          case SIMD_F32X4_CONVERT_I32X4_S:
          case SIMD_F32X4_CONVERT_I32X4_U:
          case SIMD_I16X8_EXTMUL_LOW_I8X16_S:
          case SIMD_I16X8_EXTMUL_HIGH_I8X16_S:
          case SIMD_I16X8_EXTMUL_LOW_I8X16_U:
          case SIMD_I16X8_EXTMUL_HIGH_I8X16_U:
          case SIMD_I32X4_EXTMUL_LOW_I16X8_S:
          case SIMD_I32X4_EXTMUL_HIGH_I16X8_S:
          case SIMD_I32X4_EXTMUL_LOW_I16X8_U:
          case SIMD_I32X4_EXTMUL_HIGH_I16X8_U:
          case SIMD_I64X2_EXTMUL_LOW_I32X4_S:
          case SIMD_I64X2_EXTMUL_HIGH_I32X4_S:
          case SIMD_I64X2_EXTMUL_LOW_I32X4_U:
          case SIMD_I64X2_EXTMUL_HIGH_I32X4_U:
          case SIMD_I16X8_Q15MULR_SAT_S:
          case SIMD_V128_ANY_TRUE:
          case SIMD_I64X2_EQ:
          case SIMD_I64X2_NE:
          case SIMD_I64X2_LT_S:
          case SIMD_I64X2_GT_S:
          case SIMD_I64X2_LE_S:
          case SIMD_I64X2_GE_S:
          case SIMD_I64X2_ALL_TRUE:
          case SIMD_F64X2_CONVERT_LOW_I32X4_S:
          case SIMD_F64X2_CONVERT_LOW_I32X4_U:
          case SIMD_I32X4_TRUNC_SAT_F64X2_S_ZERO:
          case SIMD_I32X4_TRUNC_SAT_F64X2_U_ZERO:
          case SIMD_F32X4_DEMOTE_F64X2_ZERO:
          case SIMD_F64X2_PROMOTE_LOW_F32X4:
          case SIMD_I8X16_POPCNT:
          case SIMD_I16X8_EXTADD_PAIRWISE_I8X16_S:
          case SIMD_I16X8_EXTADD_PAIRWISE_I8X16_U:
          case SIMD_I32X4_EXTADD_PAIRWISE_I16X8_S:
          case SIMD_I32X4_EXTADD_PAIRWISE_I16X8_U:
            break;
          case SIMD_V128_LOAD:
          case SIMD_V128_LOAD8X8_S:
          case SIMD_V128_LOAD8X8_U:
          case SIMD_V128_LOAD16X4_S:
          case SIMD_V128_LOAD16X4_U:
          case SIMD_V128_LOAD32X2_S:
          case SIMD_V128_LOAD32X2_U:
          case SIMD_V128_LOAD8_SPLAT:
          case SIMD_V128_LOAD16_SPLAT:
          case SIMD_V128_LOAD32_SPLAT:
          case SIMD_V128_LOAD64_SPLAT:
          case SIMD_V128_STORE:
          case SIMD_V128_LOAD32_ZERO:
          case SIMD_V128_LOAD64_ZERO:
            reader.readVarUint32();
            reader.readVarUint32();
            break;
          case SIMD_I8X16_SHUFFLE:
          case SIMD_V128_CONST:
            reader.readUint128();
            break;
          case SIMD_I8X16_EXTRACT_LANE_S:
          case SIMD_I8X16_EXTRACT_LANE_U:
          case SIMD_I8X16_REPLACE_LANE:
          case SIMD_I16X8_EXTRACT_LANE_S:
          case SIMD_I16X8_EXTRACT_LANE_U:
          case SIMD_I16X8_REPLACE_LANE:
          case SIMD_I32X4_EXTRACT_LANE:
          case SIMD_I32X4_REPLACE_LANE:
          case SIMD_I64X2_EXTRACT_LANE:
          case SIMD_I64X2_REPLACE_LANE:
          case SIMD_F32X4_EXTRACT_LANE:
          case SIMD_F32X4_REPLACE_LANE:
          case SIMD_F64X2_EXTRACT_LANE:
          case SIMD_F64X2_REPLACE_LANE:
            reader.readUint8();
            break;
          case SIMD_V128_LOAD8_LANE:
          case SIMD_V128_LOAD16_LANE:
          case SIMD_V128_LOAD32_LANE:
          case SIMD_V128_LOAD64_LANE:
          case SIMD_V128_STORE8_LANE:
          case SIMD_V128_STORE16_LANE:
          case SIMD_V128_STORE32_LANE:
          case SIMD_V128_STORE64_LANE:
            reader.readVarUint32();
            reader.readVarUint32();
            reader.readUint8();
            break;
          default:
            throw new Error("Unknown argument '" + arg + "' for OP_SIMD");
        }
        break;
      case OP_ATOMIC:
        arg = reader.readUint8();

        if (arg > ARG_I64_ATOMIC_RMW_CMPXCHG_32U || (arg > 0x2 && arg < 0x10)) {
          throw new Error("Unknown argument '" + arg + "' for OP_ATOMIC. Probably parsing incorrectly");
        }

        //reader.readUint8();
        reader.readVarUint32();
        reader.readVarUint32();

        break;
      default:
        throw new Error("Unknown opcode '" + opcode + "'. Probably parsing incorrectly");
    }

    // NOTE: no commitBytes() here in the common case.
    //
    // OP_CALL is the only instruction this parser ever rewrites, and its own
    // case already commits everything up to the opcode before emitting the new
    // operand. Every other instruction is copied through byte-for-byte, so
    // committing per instruction meant ~10M tiny copies per load. Leaving the
    // run uncommitted lets it accumulate until the next OP_CALL (or the end of
    // the body), which flushes it as one bulk .set().
    //
    // Consequence: callers that drive _readInstruction directly MUST call
    // commitBytes() once they stop, or the trailing run is dropped. Every such
    // caller (init-expression loops in GLOBAL/ELEMENT/DATA, and _readFunction)
    // does.
    //
    // Only do the generic callback dispatch when someone actually registered
    // a callback via addInstructionParser.  This saves one property lookup
    // per instruction for the common case (no generic callbacks).
    if (this._hasInstructionCallbacks) {
      // The anchor callbacks read back the bytes this instruction produced, so
      // they need it materialised in the output buffer.
      reader.commitBytes();
      const cb = this._instructionCallbacks[opcode];
      if (cb !== undefined) {
        reader.writeAtAnchor(cb(reader.readFromAnchor()));
      } else if (typeof this._globalInstructionCallback === "function") {
        reader.writeAtAnchor(this._globalInstructionCallback[opcode](reader.readFromAnchor()));
      }
    }
    // Return the opcode only (a number). Init-expression scanners in
    // GLOBAL / ELEMENT / DATA sections need to know when to stop; everyone
    // else discards it. The previous return was a Uint8Array slice of the
    // entire instruction — an allocation per instruction on every WASM
    // function, which dominated CODE-section parse time.
    return opcode;
  }

  // Converts an index into the FUNCTION section into an adjusted index into the program's
  // function table
  _funcSectionIndexToFuncTableIndex(index) {
    return index + this._importFuncCount + this._importFuncNewCount;
  }

  // Helper function used to "fix up" an index into the function table when the table
  // may have been modified
  _getAdjustedFunctionIndex(index) {
    if (index >= this._importFuncCount) {
      return index + this._importFuncNewCount;
    }

    return index;
  }

  // Helper function used to "fix up" an index into the global table when the table
  // may have been modified
  _getAdjustedGlobalIndex(index) {
    if (index >= this._importGlobalCount) {
      return index + this._importGlobalNewCount;
    }

    return index;
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("ce547ea7e5e8bbc15661")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/mod.ts");
/******/ 	window.UnityWebModkit = __webpack_exports__;
/******/ 	
/******/ })()
;
