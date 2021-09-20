import React, { PureComponent } from 'react';
import { PopUp } from '../../../../components';
import { UPR_FLOAT_NUMBERS } from '../../../../constants';
import UInput from '../../../../components/InputText';
import InputGas from '../../../../components/InputGas';
import {
  PopUpBurnTitle,
  PopUpSubTitle,
  PopAction,
  RowCenter,
  PromptWarningMessage,
  Row,
  InputWrapper,
  PopUpSwapTo
} from '../../../../components/prompt/style';
import MainButton from '../../../../components/Buttons/MainBtn';
import CancelBtn from '../../../../components/Buttons/CancelBtn';
import trans from '../../../../translations';
import ClosePopUp from '../../../../components/Buttons/ClosePopUpBtn';
import EthClient from '../../../../blockchain/client';
import { decodeWallet } from '../../../../utils/web3';
import BigNumber from 'bignumber.js';

class PromtSwapUFRToUPR extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      password: '',
      valid: true,
      passwordValid: true,
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

  handlerInputPassword = e => {
    if (e.target.validity.valid) {
      this.setState({ passwordValid: true, password: e.target.value });
    }
  };

  handlerResult = () => {
    const { onClick, wallet } = this.props;
    const { password, value, gasPrice, gasLimit } = this.state;

    let errors = false;
    if (password === '') {
      errors = true;
      this.setState({ passwordValid: false });
    }
    if (!value) {
      errors = true;
      this.setState({ valid: false });
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
        gasPrice: EthClient.instance.weiFromGWei(gasPrice),
        gasLimit
      });
    }
  };

  render() {
    const {
      value,
      password,
      valid,
      passwordValid,
      gasPrice,
      gasLimit,
      gasPriceValid,
      gasLimitValid
    } = this.state;
    const { ufrRateToUPR } = this.props;

    const uprValue = new BigNumber(value || 0).multipliedBy(
      new BigNumber(ufrRateToUPR || 0)
    );

    return (
      <PopUp>
        <ClosePopUp onClick={this.handlerClose} />
        <PopUpBurnTitle>Swap UFR to UPR</PopUpBurnTitle>
        <PopUpSubTitle>Enter the amount of UFR swap to UPR.</PopUpSubTitle>
        <RowCenter>
          <InputWrapper>
            <UInput
              value={value}
              pattern={`[0-9]+(\\.[0-9]{0,${UPR_FLOAT_NUMBERS}})?`}
              onChange={this.handlerInputText}
              label="Amount (in UFR)"
              type="text"
              name="input"
              error={!valid ? 'Please enter the correct value' : null}
              centerContent
            />
          </InputWrapper>
        </RowCenter>
        <RowCenter>
          <PopUpSwapTo>Swap to</PopUpSwapTo>
        </RowCenter>
        <RowCenter>
          <InputWrapper>
            <UInput
              value={uprValue.toString()}
              label="Amount (in UPR)"
              type="text"
              name="input"
              centerContent
              readOnly
            />
          </InputWrapper>
        </RowCenter>
        <RowCenter
          style={{
            marginTop: 36
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

export default PromtSwapUFRToUPR;
