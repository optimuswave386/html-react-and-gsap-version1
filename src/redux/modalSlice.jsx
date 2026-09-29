import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  modalType: null, // e.g., 'DELETE_CONFIRM', 'USER_PROFILE', 'VALUE_MODAL'
  modalProps: {},
  returnValue: null, // To store value returned from modals
  items: [], // To store items data in array of objects as { id: 1, name: 'Item A' },
  posts: [], // To store posts data in array of objects as [{ id, title, content }]
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.modalType = action.payload.modalType;
      state.modalProps = action.payload.modalProps || {};
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modalType = null;
      state.modalProps = {};
    },
    setModalReturnValue: (state, action) => {
      state.returnValue = action.payload;
      state.isOpen = false; // Optionally close the modal upon value submission
      state.modalType = null;
    },
    getPosts: (state) => {
      return state.posts;
    },
    addPosts: (state, action) => {
      state.posts.push(action.payload);
    },
    updatePosts: (state, action) => {
      const { id, title, content } = action.payload;
      const existingPost = state.posts.find(post => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
    removePosts: (state, action) => {
      state.posts = state.posts.filter(post => post.id !== action.payload.id);
    },
    addItem: (state, action) => {
        state.items.push(action.payload);
    },
    updateItem: (state, action) => {
      const { id, newTitle } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        existingItem.title = newTitle; // Direct mutation is safe here
      }
    },
    setItems: (state, action) => {
      state.items = action.payload; // Replace the entire array
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
  },
});

export const { openModal, closeModal, setModalReturnValue, getPosts, addPosts, updatePosts, removePosts, addItem, updateItem, setItems, removeItem } = modalSlice.actions;

export default modalSlice.reducer;