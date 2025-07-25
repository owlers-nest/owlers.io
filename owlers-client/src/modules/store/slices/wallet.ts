import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface WalletBalance {
    symbol: string;
    balance: number;
    type: 'NATIVE' | 'TOKEN';
}

interface Network {
    id: number;
    name: string;
    symbol: string;
}

export interface WalletState {
    addresses: string[];
    byAddress: {
        [key: string]: {
            [key: string]: WalletBalance
        };
    }
    network: Network;
}

const initialState: WalletState = {
    addresses: [],
    byAddress: {},
    network: {
        id: 56,
        symbol: "BNB",
        name: "BNB Smart Chain"
    },
}

export const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        insertAddress: (state, action: PayloadAction<string[]>) => {
            state.addresses = action.payload;
        },
        updateBalance: (state, action: PayloadAction<{address: string, balance: WalletBalance}>) => {
            if( state.byAddress[action.payload.address]) {
                state.byAddress[action.payload.address][action.payload.balance.symbol] = action.payload.balance
                return;
            }
            state.byAddress[action.payload.address] = { [action.payload.balance.symbol]: action.payload.balance}
        },
        disconnect: (state) => {
            state.addresses = [];
            state.byAddress = {};
        },
        updateNetwork: (state, action: PayloadAction<Network> ) => {
            state.network = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { insertAddress, updateBalance, disconnect, updateNetwork } = walletSlice.actions

export default walletSlice.reducer