import { createSlice } from "@reduxjs/toolkit"
import exp from "constants"

const initialState = {
    create: {
        openCreateCommunityModal: false,
        

    }
}


const createCommunitySlice = createSlice({
    name: 'createCommunity',
    initialState,
    reducers: {
        setOpenCreateCommunityModal: (state, action) => {
            state.create.openCreateCommunityModal = action.payload
        },
       
    }
})


export const { setOpenCreateCommunityModal } = createCommunitySlice.actions
export default createCommunitySlice.reducer