import React from 'react';
import { connect } from 'react-redux';
import UPRManagePage from './components/UPRManagePage';
import { addMinterStory, getMintersStory, deleteMinterStory } from './story';

const mapStateToProps = state => {
  const wallet = state.wallet.get(state.wallet.get('address'));

  const minters = state.upr && state.upr.get('minters');

  return {
    addMinterProgress: state.upr && state.upr.get('addMinterProgress'),
    deleteMinterProgress: state.upr && state.upr.get('deleteMinterProgress'),
    gasPrice: state.wallet.get('gasPrice'),
    minters: minters && minters.toJS() ? minters.toJS() : [],
    ...(wallet && wallet.toJS && wallet.toJS())
  };
};

const mapDispatchToProps = dispatch => ({
  onAddMinterStory: payload => addMinterStory(dispatch, payload),
  onGetMintersStory: () => getMintersStory(dispatch),
  onDeleteMinterStory: payload => deleteMinterStory(dispatch, payload)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UPRManagePage);
