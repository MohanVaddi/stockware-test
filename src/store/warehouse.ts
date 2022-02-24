import {
    createSlice,
    current,
    createReducer,
    PayloadAction,
} from '@reduxjs/toolkit';
import data from './../warehouse.json';

type warehouseInterface = typeof data;

const initialWarehouseState: warehouseInterface = data;

const warehouseSlice = createSlice({
    name: 'warehouse',
    initialState: initialWarehouseState,
    reducers: {
        modifyData(state, action) {
            const { code, newData } = action.payload;
            const toBeUpdate_idx = state.findIndex((item) => item.code == code);
            state[toBeUpdate_idx] = { ...state[toBeUpdate_idx], ...newData };
        },
    },
});

export const warehouseActions = warehouseSlice.actions;
export default warehouseSlice.reducer;
