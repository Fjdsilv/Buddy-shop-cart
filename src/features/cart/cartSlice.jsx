import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import cartItems from "../../assets/data/Data";

const url = "https://www.course-api.com/react-useReducer-cart-project";

const initialState = {
    cartItems: [],
    amount: 0,
    total: 0,
    isLoading: true,
};

export const getCartItems = createAsyncThunk('cart/getCartItem', () => {
    return fetch(url)
            .then(resp => resp.json())
            .catch(err => console.log(err));
})

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
        },
        removeItem: (state, action) => {
            const itemId = action.payload
            const newCartItems = state.cartItems.filter(item => item.id !== itemId);
            state.cartItems = newCartItems;
        },
        increase: (state, { payload }) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id);
            cartItem.amount+=1
        },
        decrease: (state, action) => {
            const cartItem = state.cartItems.find((item) => item.id === action.payload);
            cartItem.amount-=1;
        },
        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;

            state.cartItems.forEach((item) => {
                amount+= item.amount;
                total+= (item.amount * item.price)
            });

            state.amount = amount;
            state.total = total;
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(getCartItems.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getCartItems.fulfilled, (state, action) => {
            // console.log(action);
            state.isLoading = false;
            state.cartItems = action.payload;
          })
          .addCase(getCartItems.rejected, (state, action) => {
            console.log(action);
            state.isLoading = false;
          });
      },
});


export const { 
    clearCart,
    removeItem, 
    increase,
    decrease,
    calculateTotals,
} = cartSlice.actions;


export default cartSlice.reducer;

/*
extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false;
    },
  },
*/