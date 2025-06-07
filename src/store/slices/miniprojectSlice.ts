import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  MiniprojectResponseDTO,
  MiniprojectSummaryResponse,
  MiniprojectCreateDTO,
  MiniprojectUpdateDTO,
  ProjectStatus,
  EvaluationDTO,
} from '../../types';
import * as miniprojectApi from '../../features/miniprojects/services/miniprojectApi';

interface MiniprojectState {
  miniprojects: MiniprojectSummaryResponse[];
  currentMiniproject: MiniprojectResponseDTO | null;
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  totalElements: number;
}

const initialState: MiniprojectState = {
  miniprojects: [],
  currentMiniproject: null,
  loading: false,
  error: null,
  totalPages: 0,
  currentPage: 0,
  totalElements: 0,
};

// Async thunks - all using real API calls
export const fetchMiniprojects = createAsyncThunk(
  'miniprojects/fetchAll',
  async (params: { page?: number; size?: number; status?: ProjectStatus }) => {
    return await miniprojectApi.getMiniprojects(params);
  }
);

export const fetchMiniprojectById = createAsyncThunk(
  'miniprojects/fetchById',
  async (id: number) => {
    return await miniprojectApi.getMiniprojectById(id);
  }
);

export const createMiniproject = createAsyncThunk(
  'miniprojects/create',
  async (data: MiniprojectCreateDTO) => {
    return await miniprojectApi.createMiniproject(data);
  }
);

export const updateMiniproject = createAsyncThunk(
  'miniprojects/update',
  async ({ id, data }: { id: number; data: MiniprojectUpdateDTO }) => {
    return await miniprojectApi.updateMiniproject(id, data);
  }
);

export const deleteMiniproject = createAsyncThunk(
  'miniprojects/delete',
  async (id: number) => {
    await miniprojectApi.deleteMiniproject(id);
    return id;
  }
);

export const validateMiniproject = createAsyncThunk(
  'miniprojects/validate',
  async (id: number) => {
    await miniprojectApi.validateMiniproject(id);
    return { id, status: ProjectStatus.VALIDATED };
  }
);

export const assignSupervisor = createAsyncThunk(
  'miniprojects/assignSupervisor',
  async ({ miniprojectId, teacherId }: { miniprojectId: number; teacherId: number }) => {
    await miniprojectApi.assignSupervisor(miniprojectId, teacherId);
    return { miniprojectId, status: ProjectStatus.ASSIGNED };
  }
);

export const evaluateMiniproject = createAsyncThunk(
  'miniprojects/evaluate',
  async ({ id, evaluation }: { id: number; evaluation: EvaluationDTO }) => {
    await miniprojectApi.evaluateMiniproject(id, evaluation);
    return { id, ...evaluation, status: ProjectStatus.EVALUATED };
  }
);

const miniprojectSlice = createSlice({
  name: 'miniprojects',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentMiniproject: (state) => {
      state.currentMiniproject = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all
    builder
      .addCase(fetchMiniprojects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMiniprojects.fulfilled, (state, action) => {
        state.loading = false;
        state.miniprojects = action.payload.content;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.number;
        state.totalElements = action.payload.totalElements;
      })
      .addCase(fetchMiniprojects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch miniprojects';
      });

    // Fetch by ID
    builder
      .addCase(fetchMiniprojectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMiniprojectById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMiniproject = action.payload;
      })
      .addCase(fetchMiniprojectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch miniproject';
      });

    // Create
    builder
      .addCase(createMiniproject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMiniproject.fulfilled, (state, action) => {
        state.loading = false;
        // Don't add to list - let the list refetch
      })
      .addCase(createMiniproject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create miniproject';
      });

    // Delete
    builder
      .addCase(deleteMiniproject.fulfilled, (state, action) => {
        state.miniprojects = state.miniprojects.filter(
          (mp) => mp.id !== action.payload
        );
      });

    // Validate
    builder
      .addCase(validateMiniproject.fulfilled, (state, action) => {
        if (state.currentMiniproject && state.currentMiniproject.id === action.payload.id) {
          state.currentMiniproject.status = action.payload.status;
        }
      });
    
    // Assign supervisor
    builder
      .addCase(assignSupervisor.fulfilled, (state, action) => {
        if (state.currentMiniproject && state.currentMiniproject.id === action.payload.miniprojectId) {
          state.currentMiniproject.status = action.payload.status;
        }
      });
    
    // Evaluate
    builder
      .addCase(evaluateMiniproject.fulfilled, (state, action) => {
        if (state.currentMiniproject && state.currentMiniproject.id === action.payload.id) {
          state.currentMiniproject.status = action.payload.status;
          state.currentMiniproject.grade = action.payload.grade;
          state.currentMiniproject.feedback = action.payload.feedback;
        }
      });
  },
});

export const { clearError, clearCurrentMiniproject } = miniprojectSlice.actions;
export default miniprojectSlice.reducer;
