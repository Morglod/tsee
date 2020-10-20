/** 
 * (Symbol, temp name)  
 * [ Symbol, string, Symbol, string, ... ]  
 */
let _symbolMapping: (Symbol|string)[] = [];

export function symbolToString<S extends symbol|string>(symb: S): string {
    if (typeof symb === 'string') return symb;

    const i = _symbolMapping.indexOf(symb);
    if (i !== -1) return _symbolMapping[i+1] as string;

    const str = `${Date.now()}_${Math.random()}`;
    _symbolMapping.push(symb, str);

    return str;
}

export function stringToSymbol(str: string): symbol|string {
    const i = _symbolMapping.indexOf(str);
    if (i === -1) return str;
    return _symbolMapping[i - 1] as symbol;
}

export function cleanSymbolStrings(filter: (symb: symbol, str: string) => boolean) {
    const inds = [] as number[];

    for (let i = 0; i < _symbolMapping.length - 1; ++i) {
        if (filter(_symbolMapping[i] as any, _symbolMapping[i+1] as any) === false) {
            inds.push(i, i+1);
        }
    }

    _symbolMapping = _symbolMapping.filter((_, i) => !inds.includes(i));
}