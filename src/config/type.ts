interface BalanceItem {
    name?: string;
    balance?: string;
    address:string;
    decimals?:number
}

interface HeaderTitle {
    title?: string;
}

export type{ BalanceItem, HeaderTitle };