import React, { PureComponent } from 'react';
import { WalletBtn } from '../../../../components/Buttons';
import { PopUp } from '../../../../components';
import { UPR_FLOAT_NUMBERS } from '../../../../constants';
import UInput from '../../../../components/InputText';
import InputGas from '../../../../components/InputGas';
import {
  PopUpMintTitle,
  PopUpSubTitle,
  PopAction,
  RowCenter,
  PromptWarningMessage,
  Row,
  InputWrapper
} from '../../../../components/prompt/style';
import MainButton from '../../../../components/Buttons/MainBtn';
import CancelBtn from '../../../../components/Buttons/CancelBtn';
import trans from '../../../../translations';
import ClosePopUp from '../../../../components/Buttons/ClosePopUpBtn';
import EthClient from '../../../../blockchain/client';
import { decodeWallet } from '../../../../utils/web3';

class PromtMint extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      password: '',
      address: '',
      valid: true,
      passwordValid: true,
      addressValid: true,
      gasLimit: null,
      gasLimitValid: true,
      gasPrice: null,
      gasPriceValid: true
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

  handlerClose = () => {
    const { onClick } = this.props;
    onClick(false);
  };

  handlerInputText = e => {
    if (e.target.validity.valid) {
      this.setState({ valid: true, value: e.target.value });
    }
  };

  handlerInputAddress = e => {
    this.setState({
      addressValid: e.target.validity.valid,
      address: e.target.value
    });
  };

  handlerInputPassword = e => {
    if (e.target.validity.valid) {
      this.setState({ passwordValid: true, password: e.target.value });
    }
  };

  handlerResult = () => {
    const { onClick, wallet } = this.props;
    const { password, value, gasPrice, gasLimit, address } = this.state;

    let errors = false;
    if (password === '') {
      errors = true;
      this.setState({ passwordValid: false });
    }
    if (!value) {
      errors = true;
      this.setState({ valid: false });
    }
    if (!address) {
      errors = true;
      this.setState({ addressValid: false });
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
        value,
        address,
        gasPrice: EthClient.instance.weiFromGWei(gasPrice),
        gasLimit
      });
    }
  };

  handlerUseYourOwnWalletAddress = () => {
    const { wallet } = this.props;
    this.setState({
      address: `0x${wallet.address}`,
      addressValid: true
    });
  };

  render() {
    const {
      value,
      address,
      password,
      valid,
      passwordValid,
      addressValid,
      gasPrice,
      gasLimit,
      gasPriceValid,
      gasLimitValid
    } = this.state;

    return (
      <PopUp>
        <ClosePopUp onClick={this.handlerClose} />
        <PopUpMintTitle>Mint UPR</PopUpMintTitle>
        <PopUpSubTitle>Enter the amount of UPR to mint.</PopUpSubTitle>
        <RowCenter
          style={{
            flexWrap: 'wrap'
          }}
        >
          <InputWrapper>
            <UInput
              value={address}
              pattern="^0x[a-fA-F0-9]{40}$"
              onChange={this.handlerInputAddress}
              label="Address"
              type="text"
              name="input"
              error={!addressValid ? 'Please enter the correct address' : null}
              centerContent
            />
          </InputWrapper>
          <div
            style={{
              flex: '0 0 70%',
              margin: '0 auto',
              marginTop: 4,
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <WalletBtn
              title="Use your wallet address"
              onClick={this.handlerUseYourOwnWalletAddress}
            />
          </div>
        </RowCenter>
        <RowCenter>
          <InputWrapper>
            <UInput
              value={value}
              pattern={`[0-9]+(\\.[0-9]{0,${UPR_FLOAT_NUMBERS}})?`}
              onChange={this.handlerInputText}
              label="Amount (in UPR)"
              type="text"
              name="input"
              error={!valid ? 'Please enter the correct value' : null}
              centerContent
            />
          </InputWrapper>
        </RowCenter>
        <RowCenter>
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
            <MainButton onClick={this.handlerResult} title={trans('Confirm')} />
          </PopAction>
        </Row>
        <PromptWarningMessage>
          <span className="icon-ico-lock" />
          {trans('wallet.warningMessage')}
          <div>{trans('wallet.warningMessageMore')}</div>
        </PromptWarningMessage>
        <CancelBtn onClick={this.handlerClose} title={trans('Cancel')} />
      </PopUp>
    );
  }
}

export default PromtMint;
