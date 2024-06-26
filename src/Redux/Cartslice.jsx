import { createSlice } from "@reduxjs/toolkit";


// Function to load cart from localStorage
const loadCart = () => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
};

// Function to save cart to localStorage
const saveCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

const cartSlice = createSlice({
    name: "cart",
    // initialState: [],
    initialState : loadCart(),
    reducers: {
        add(state, action) {
            const itemIndex = state.findIndex(item => item.id === action.payload.id);
            if (itemIndex >= 0) {
                state[itemIndex].quantity += 1;
            } else {
                state.push({ ...action.payload, quantity: 1 });
            }
            saveCart(state);
        },
        remove(state, action) {
            const newState = state.filter(item => item.id !== action.payload);
            saveCart(newState);
            return newState;
        },
        incrementQuantity(state, action) {
            const item = state.find(item => item.id === action.payload);
            if (item) {
                item.quantity += 1;
                saveCart(state);
            }
        },
        decrementQuantity(state, action) {
            const item = state.find(item => item.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                saveCart(state);
            }
        }
    }
});

export const { add, remove, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
