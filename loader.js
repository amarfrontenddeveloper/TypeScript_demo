import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import { useSelector } from 'react-redux'

const initialState = {
    indicatorLoading: false
};
const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        showLoader(state) {
            state.indicatorLoading = true;
        },
        hideLoader(state) {
            state.indicatorLoading = true
        }
    },
    extraReducers: builder => {
        builder.addCase(PURGE, () => initialState);
    },
});

export const { showLoader, hideLoader } = loaderSlice.actions;
export default loaderSlice.reducer;

export const loaderSelectors = () => {
    const indicatorLoading = useSelector(
        state => state?.loader?.indicatorLoading
    )
    return {
        indicatorLoading
    }
}
