import { createStore, bindActionCreators, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { albumActions } from './album';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

const allActions = bindActionCreators(
  {
    setAlbum: albumActions.setSelectedAlbum,
    saveAllAlbums: albumActions.saveAlbums,
  },
  store.dispatch,
);

export { store, allActions };
