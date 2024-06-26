import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        add(state, action) {
            const itemIndex = state.findIndex(item => item.id === action.payload.id);
            if (itemIndex >= 0) {
                state[itemIndex].quantity += 1;
            } else {
                state.push({ ...action.payload, quantity: 1 });
            }
        },
        remove(state, action) {
            return state.filter(item => item.id !== action.payload);
        },
        incrementQuantity(state, action) {
            const item = state.find(item => item.id === action.payload);
            if (item) {
                item.quantity += 1;
            }
        },
        decrementQuantity(state, action) {
            const item = state.find(item => item.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        }
    }
});

export const { add, remove, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
