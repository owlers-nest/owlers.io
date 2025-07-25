export const shortWalletAddress = (address: string) => {
    const [a1, a2, a3, a4] = address;
    const [t1, t2, t3, t4] = [...address].reverse().join("");
    const addr = `${a1}${a2}${a3}${a4}...${t4}${t3}${t2}${t1}`;
    return addr;
};

export const formatPrices = (price: number) => {
    const [integerPart, fractionPart] = price.toString().split(".");
    return {
        integerPart, 
        fractionPart
    }
}
