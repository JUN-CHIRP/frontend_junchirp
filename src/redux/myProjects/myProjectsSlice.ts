import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { authApi } from '@/api/authApi';
import { RootState } from '@/redux/store';
import { ProjectCardInterface } from '@/shared/interfaces/project-card.interface';

const myProjectsAdapter = createEntityAdapter<ProjectCardInterface>();

export const myProjectsSlice = createSlice({
  name: 'educations',
  initialState: myProjectsAdapter.getInitialState(),
  reducers: {
    // setEducations: myProjectsAdapter.setAll,
    // addEducations: myProjectsAdapter.addOne,
    // updateEducations: myProjectsAdapter.updateOne,
    // removeEducations: myProjectsAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.getMe.matchFulfilled,
      (state, action) => {
        myProjectsAdapter.setAll(state, action.payload.educations);
      },
    );
  },
});

// export const {
//   setMyProjects,
//   addMyProjects,
//   updateMyProjects,
//   removeMyProjects,
// } = myProjectsSlice.actions;

export default myProjectsSlice.reducer;

export const {
  selectAll: selectAllMyProjects,
  selectById: selectMyProjectById,
  selectIds: selectMyProjectsIds,
} = myProjectsAdapter.getSelectors((state: RootState) => state.myProjects);
