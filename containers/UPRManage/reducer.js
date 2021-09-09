import typeToReducer from 'type-to-reducer';
import { fromJS } from 'immutable';
import {
  ADD_MINTER,
  ADD_MINTER_DONE,
  ADD_MINTER_INIT,
  GET_MINTER_LIST,
  DELETE_MINTER,
  DELETE_MINTER_INIT,
  DELETE_MINTER_DONE,
  GET_IS_ADMIN
} from './constants';

const initialState = fromJS({});

export default typeToReducer(
  {
    [ADD_MINTER]: {
      SUCCESS: (state, action) => {
        const { tx } = action.payload;
        return state.setIn(['addMinterStory', 'addMinter'], fromJS(tx));
      }
    },
    [ADD_MINTER_INIT]: state => {
      return state
        .setIn(['addMinterStory'], fromJS({}))
        .set('addMinterProgress', true);
    },
    [ADD_MINTER_DONE]: state => {
      return state.deleteIn(['addMinterStory']).delete('addMinterProgress');
    },
    [DELETE_MINTER]: {
      SUCCESS: (state, action) => {
        const { tx } = action.payload;
        return state.setIn(['deleteMinterStory', 'deleteMinter'], fromJS(tx));
      }
    },
    [DELETE_MINTER_INIT]: state => {
      return state
        .setIn(['deleteMinterStory'], fromJS({}))
        .set('deleteMinterProgress', true);
    },
    [DELETE_MINTER_DONE]: state => {
      return state
        .deleteIn(['deleteMinterStory'])
        .delete('deleteMinterProgress');
    },
    [GET_MINTER_LIST]: {
      SUCCESS: (state, action) => {
        const { minters } = action.payload;
        return state.set('minters', fromJS(minters));
      }
    },
    [GET_IS_ADMIN]: {
      SUCCESS: (state, action) => {
        const { isAdmin } = action.payload;
        return state.set('isAdmin', fromJS(isAdmin));
      }
    }
  },
  initialState
);
