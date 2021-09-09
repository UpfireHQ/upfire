import React from 'react';
import PopUp from '../../../../components/PopUp';
import {
  PopUpTitle,
  PopAction,
  Row,
  RowCenter,
  InputWrapper
} from '../../../../components/prompt/style';
import InputGas from '../../../../components/InputGas';
import ClosePopUp from '../../../../components/Buttons/ClosePopUpBtn';
import { PopUpDetails } from './style';
import trans from '../../../../translations';
import MainButton from '../../../../components/Buttons/MainBtn';
import CancelBtn from '../../../../components/Buttons/CancelBtn';
import UInput from '../../../../components/InputText';
import EthClient from '../../../../blockchain/client';
import { decodeWallet } from '../../../../utils/web3';

class PromtDeleteConfirm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      gasLimit: null,
      gasLimitValid: true,
      gasPrice: null,
      gasPriceValid: true,
      password: '',
      passwordValid: true
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { gasPrice, gasLimit } = props;

    return {
      gasPrice:
        state.gasPrice === null
          ? EthClient.instance.weiToGWei(gasPrice)
          : state.gasPrice,
      gasLimit: state.gasLimit === null ? gasLimit : state.gasLimit
    };
  }

  onClick(result) {
    const { onClick } = this.props;
    onClick && onClick(result);
  }

  handlerDelete = () => {
    const { onClick, wallet, address } = this.props;
    const { password, gasPrice, gasLimit } = this.state;

    let errors = false;
    if (password === '') {
      errors = true;
      this.setState({ passwordValid: false });
    }

    if (!Number(gasPrice)) {
      errors = true;
      this.setState({ gasPriceValid: false });
    }
    if (!Number(gasLimit)) {
      errors = true;
      this.setState({ gasLimitValid: false });
    }

    if (!errors) {
      const walletDecode = wallet && decodeWallet(wallet, password);

      if (!walletDecode) {
        this.setState({ passwordValid: false });
        return;
      }

      onClick(true, {
        walletDecode,
        password,
        address,
        gasPrice: EthClient.instance.weiFromGWei(gasPrice),
        gasLimit
      });
    }
  };

  handlerCancel = () => {
    this.onClick(false);
  };

  handlerInputPassword = e => {
    if (e.target.validity.valid) {
      this.setState({ passwordValid: true, password: e.target.value });
    }
  };

  render() {
    const { address } = this.props;
    const {
      gasLimitValid,
      gasPrice,
      gasLimit,
      gasPriceValid,
      password,
      passwordValid
    } = this.state;

    return (
      <PopUp>
        <ClosePopUp onClick={this.handlerCancel} />
        <PopUpTitle>
          Are you sure you want to remove this address as minter?
        </PopUpTitle>
        <Row
          style={{
            justifyContent: 'center'
          }}
        >
          <PopUpDetails>
            <span>{address}</span>
          </PopUpDetails>
        </Row>
        <RowCenter
          style={{
            marginTop: 16
          }}
        >
          <InputWrapper>
            <UInput
              value={password}
              onChange={this.handlerInputPassword}
              label="Password"
              type="password"
              name="password"
              error={
                !passwordValid ? trans('Prompt.value.passwordValidation') : null
              }
              centerContent
            />
          </InputWrapper>
        </RowCenter>
        <RowCenter>
          <InputWrapper>
            <InputGas
              gasPrice={gasPrice}
              gasPriceError={
                !gasPriceValid ? trans('Prompt.value.wrongValue') : null
              }
              gasLimit={gasLimit}
              gasLimitError={
                !gasLimitValid ? trans('Prompt.value.wrongValue') : null
              }
              onChange={this.handlerInputGas}
              centerContent
            />
          </InputWrapper>
        </RowCenter>
        <Row>
          <PopAction>
            <MainButton onClick={this.handlerDelete} title={trans('Delete')} />
          </PopAction>
        </Row>
        <CancelBtn onClick={this.handlerCancel} title={trans('Cancel')} />
      </PopUp>
    );
  }
}

export default PromtDeleteConfirm;
