import { configureStore } from '@reduxjs/toolkit';

import reducer from './slice';

// const store = createStore(reducer, applyMiddleware(thunk));

const store = configureStore({ reducer });

export default store;
