import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Project } from '../../types'

type ProjectsStatus = 'all' | 'legit' | 'scam' | 'notSpecified';

export interface ProjectsState {
  list: Project[]
  byIds: {
    [key: string]: Project;
  },
  projectsStatus: ProjectsStatus
  recent: Project[];
}

const initialState: ProjectsState = {
  list: [],
  byIds: {},
  projectsStatus: 'all',
  recent: [],
}

export const counterSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    insertProjects: (state, action: PayloadAction<Project[]>) => {
      state.byIds = action.payload.reduce((obj, item) => ((obj as any)[item.id] = item, obj) ,{});
      state.list = action.payload;
      state.recent = action.payload.slice(0, action.payload.length > 6 ? 6 : action.payload.length);
    },
    selectProject: (state, action: PayloadAction<Project>) => {
      if (!state.byIds[action.payload.id]) {
        state.list = [...state.list, action.payload];
        state.byIds[action.payload.id] = action.payload;
      }
    },
    updateProjectsStatus: (state, action: PayloadAction<ProjectsStatus>) => {
      state.projectsStatus = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { insertProjects, selectProject, updateProjectsStatus } = counterSlice.actions

export default counterSlice.reducer