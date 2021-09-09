import React, { Component } from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import {
  UPRManageWrapper,
  UPRMinterTable,
  AddressCell,
  ActionCell,
  AddressText,
  AddressCellTd,
  ActionCellTd,
  Index,
  SubtitleWrapper,
  Subtitle,
  BallanceOne,
  AvailableBalance,
  ActionBlock,
  TotalSuppySection,
  UpfiringIcon,
  AlignCenter
} from './style';
import { PageHead } from '../../../../style/containers';
import SearchComponent from '../../../../components/SearchComponent';
import AddMinterButton from '../AddMinterButton';
import AddMinterModal from '../AddMinterModal';
import DeleteConfirmModal from '../DeleteConfirmModal';
import { WalletBtn, BtnWithTooltip } from '../../../../components';
import MinterProgressPopup from '../MinterProgressPopup';
import EmptyMintersSearch from '../../../../components/EmptyMintersSearch';

import trans from '../../../../translations';

export default class UPRManagePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addMinter: false,
      deleteMinter: false,
      search: ''
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { minters } = props;
    const search = String(state.search).toLowerCase();

    const filteredMinters = Boolean(search)
      ? minters.filter(
          address =>
            ~String(address)
              .toLowerCase()
              .search(search)
        )
      : minters;

    if (props && state.address !== props.address) {
      const { address, onGetMintersStory } = props;
      onGetMintersStory && onGetMintersStory();

      return { address, minters: filteredMinters };
    }

    return { minters: filteredMinters };
  }

  handlerBurnClose = () => {
    this.setState({
      burn: false
    });
  };

  handlerMintClose = () => {
    this.setState({
      mint: false
    });
  };

  handlerShowMinter = () => {
    this.setState({
      addMinter: true
    });
  };

  handlerAddMinterClose = () => {
    this.setState({
      addMinter: false
    });
  };

  handlerDeleteMinter = address => {
    this.setState({
      deleteMinter: address
    });
  };

  handlerDeleteMinterClose = () => {
    this.setState({
      deleteMinter: false
    });
  };

  get MintersList() {
    const { minters } = this.state;

    return minters.map(address => {
      return (
        <tr key={address}>
          <td>
            <AlignCenter>
              <Jazzicon diameter={32} seed={jsNumberForAddress(address)} />
              <AddressText>{address}</AddressText>
            </AlignCenter>
          </td>
          <td>
            <BtnWithTooltip
              iconClass="remove"
              positionClass="right"
              onClick={() => {
                this.handlerDeleteMinter(address);
              }}
            />
          </td>
        </tr>
      );
    });
  }

  handlerChangeSearchInput = e => {
    const search = String(e.target && e.target.value);
    this.setState({ search });
  };

  handlerClearSearchInput = () => {
    this.setState({ search: '' });
  };

  get EmptyRows() {
    const { minters } = this.state;
    let emptyTrs = null;

    if (!minters.length) {
      return emptyTrs;
    }

    if (minters.length < 14) {
      emptyTrs = [];
      for (let j = 0; j < 13 - minters.length; j++) {
        emptyTrs.push(
          <tr key={minters.length + j} className="withoutHover">
            <td colSpan="2" />
          </tr>
        );
      }
    }

    return emptyTrs;
  }

  get EmptySearch() {
    const { search } = this.state;
    return (
      <EmptyMintersSearch
        colSpan={2}
        onClick={this.handlerClearSearchInput}
        isSearch={Boolean(search)}
      />
    );
  }

  render() {
    const { deleteMinter, addMinter, minters, search } = this.state;
    const {
      addMinterProgress,
      deleteMinterProgress,
      minters: mintersProp
    } = this.props;
    return (
      <UPRManageWrapper key="UPRManagePage">
        {addMinter && (
          <AddMinterModal
            {...this.props}
            onClose={this.handlerAddMinterClose}
          />
        )}
        {(addMinterProgress || deleteMinterProgress) && (
          <MinterProgressPopup
            addMinterProgress={addMinterProgress}
            deleteMinterProgress={deleteMinterProgress}
          />
        )}
        {deleteMinter && (
          <DeleteConfirmModal
            {...this.props}
            address={deleteMinter}
            onClose={this.handlerDeleteMinterClose}
          />
        )}
        <PageHead>
          <div className="search">
            <SearchComponent
              onChange={this.handlerChangeSearchInput}
              onClearInput={this.handlerClearSearchInput}
              searchString={search}
              disabled={mintersProp.length <= 0}
              style={{
                width: 300
              }}
            />
          </div>
          <div className="title">Minter</div>
          <div className="buttons">
            <AddMinterButton onClick={this.handlerShowMinter} />
          </div>
        </PageHead>
        <UPRMinterTable>
          <thead>
            <tr>
              <AddressCell>Address</AddressCell>
              <ActionCell>Action</ActionCell>
            </tr>
          </thead>
          <tbody>
            {minters.length ? this.MintersList : this.EmptySearch}
            {this.EmptyRows}
          </tbody>
        </UPRMinterTable>
      </UPRManageWrapper>
    );
  }
}
