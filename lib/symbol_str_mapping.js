"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * (Symbol, temp name)
 * [ Symbol, string, Symbol, string, ... ]
 */
var _symbolMapping = [];
function symbolToString(symb) {
    if (typeof symb === 'string')
        return symb;
    var i = _symbolMapping.indexOf(symb);
    if (i !== -1)
        return _symbolMapping[i + 1];
    var str = Date.now() + "_" + Math.random();
    _symbolMapping.push(symb, str);
    return str;
}
exports.symbolToString = symbolToString;
function stringToSymbol(str) {
    var i = _symbolMapping.indexOf(str);
    if (i === -1)
        return str;
    return _symbolMapping[i - 1];
}
exports.stringToSymbol = stringToSymbol;
//# sourceMappingURL=symbol_str_mapping.js.map