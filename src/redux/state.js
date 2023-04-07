// import { messageReducer } from './store-reducer';

// // export const ADD_POST = text => {
// //   return {
// //     type: 'ADD-POST',
// //     payload: text,
// //   };
// // };
// export const ADD_NEW_MESSAGE = text => {
//   return {
//     type: 'ADD-NEW-MESSAGE',
//     payload: text,
//   };
// };

// const store = {
//   _state: {
//     newPost: {
//       posts: [
//         { name: 'Alla', message: 'Its my first posts', id: 1 },
//         { name: 'Salo', message: 'Its my second posts', id: 2 },
//         { name: 'Dalo', message: 'Its my firsth posts', id: 3 },
//       ],

//       userNewPost: '',
//     },
//     newMessage: {
//       messagers: [
//         { message: 'Hello', id: 1 },
//         { message: 'How are you?', id: 2 },
//       ],
//       messageNewBody: '',
//     },
//     users: [
//       { names: 'Dima', id: 1 },
//       { names: 'Vika', id: 2 },
//       { names: 'Slava', id: 3 },
//       { names: 'Gosha', id: 4 },
//       { names: 'Antoni', id: 5 },
//     ],
//   },

//   getState() {
//     return this._state;
//   },
//   _callRender() {
//     console.log('RE-RENDER');
//   },

//   subscribe(observe) {
//     this._callRender = observe;
//   },
//   dispatch({ type, payload }) {
//     // profileReducer(this._state.newPost, { type, payload });
//     // this._callRender(this._state);

//     messageReducer(this._state.newMessage, { type, payload });
//     this._callRender(this._state);
//   },
// };

// export default store;
