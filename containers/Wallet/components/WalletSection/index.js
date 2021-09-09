import React, { Component } from 'react';
import { generate } from 'ethereumjs-wallet';
import {
  ActionBlock,
  ActionOneBlock,
  ActionsTwo,
  AddWalletMenu,
  AddWalletMenuItem,
  BallanceDiv,
  BallanceEllipsis,
  BallanceOne,
  Close,
  CurrencyWrapper,
  DecodingLoader,
  FileButton,
  FullWalletAddress,
  FullWalletAddressDesc,
  FullWalletAddressValue,
  Index,
  Loader,
  PromptDangerMessage,
  PromptSecondaryActions,
  PromptWarningMessage,
  PromptWrapper,
  SecondaryAction,
  Stub,
  StubBtnWrapper,
  StubLearnMore,
  StubSubTitle,
  StubTitle,
  Subtitle,
  SubtitleIcon,
  SubtitleFlexRow,
  SubtitleWrapper,
  Tooltip,
  UPRLogo,
  UFRIcon,
  UpfiringIcon,
  WalletBallanceSection,
  WalletButton,
  WalletDiv,
  WalletError,
  WalletIn,
  WalletInputSection,
  WalletPass,
  WithdrawSection,
  WithdrawBallance,
  WithdrawBallanceUnit
} from './style';
import trans from '../../../../translations';

import {
  BtnWithTooltip,
  CancelBtn,
  DeletePopUp,
  Info,
  PopUp,
  PopUpWithBg,
  WalletBtn
} from '../../../../components';
import ClosePopUp from '../../../../components/Buttons/ClosePopUpBtn';
import MainButton from '../../../../components/Buttons/MainBtn';
import SecondaryButton from '../../../../components/Buttons/SecondaryBtn';
import logo from '../../../../assets/images/logo.png';
import bgWallet from '../../../../assets/images/bg-wallet.png';
import removeIcon from '../../../../assets/icons/ico2-remove.svg';
import replenishFundIcon from '../../../../assets/icons/ico2-replenish-fund.svg';

import { DropContainer } from '../../../../style/containers';
import UInput from '../../../../components/InputText';
import { ufrFormat } from '../../../../utils/math';

import colors from '../../../../style/colors';
import { SITE_DECRYPTION, SITE_PRIVACY } from '../../../../constants';
import routes from '../../../../constants/routes.json';
import {
  decodeWallet,
  decodeWalletByPrivateKey,
  walletToV3
} from '../../../../utils/web3';
import { PromptAddWallet } from '../PromptAddWallet';
import { PromptCreateWallet } from '../PromptCreateWallet';
import ReplenishWithdrawETHModal from '../ReplenishWithdrawETHModal';
import ReplenishWithdrawUPRModal from '../ReplenishWithdrawUPRModal';
import ProgressPopup from '../ProgressPopup';
import UFRSwapToUPRModal from '../UFRSwapToUPRModal';
import SwapProgressPopup from '../SwapProgressPopup';
import { SettingButton } from '../StakingUPR/style';
import ConfigRatioSwap from '../ConfigRatioSwap';
import ConfigureRatioSwapProgressPopup from '../ConfigureRatioSwapProgressPopup';
import BNBIcon from '../BNBIcon';

const { shell } = require('electron');
const { clipboard } = require('electron');

export default class WalletTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wallet: null,
      password: '',
      walletValid: true,
      errorFileReading: false,
      justRead: false,
      justGenerate: false,
      walletDecodeValidation: true,
      privateKeyValidation: true,
      renderDeleteWallet: false,
      passwordValid: true,
      addWallet: false,
      createWallet: false,
      addWalletKey: true,
      addWalletFile: false,
      editWallet: false,
      showFullWalletAddress: false,
      replenishETH: false,
      withdrawETH: false,
      replenishUPR: false,
      withdrawUPR: false,
      ufrSwapToUPR: false
    };
  }

  handlerWalletRead = fileContent => {
    try {
      const wallet = JSON.parse(fileContent);

      if (wallet && wallet.crypto) {
        this.setState({
          errorFileReading: false,
          justRead: true,
          wallet
        });
      } else {
        this.setState({ errorFileReading: true });
      }
    } catch (e) {
      this.setState({ errorFileReading: true });
    }
  };

  handlerRemoveFile = () => {
    this.setState({ justRead: false, wallet: null });
  };

  handlerOnChangeInput = event => {
    this.setState({ walletValid: true, password: event.target.value });
  };

  handlerCreateNew = () => {
    this.setState({ justGenerate: true });
  };

  handlerDownloadWallet = () => {
    const { wallet, onDownloadWallet } = this.props;
    onDownloadWallet && onDownloadWallet(wallet);
  };

  handlerShowStatistic = () => {
    const { onShowHistory } = this.props;
    onShowHistory && onShowHistory();
  };

  onSetWallet(wallet, password, download = false) {
    const { onSetWallet, redirect, routerTo, onDownloadWallet } = this.props;
    const walletV3 = walletToV3(wallet, password);

    onSetWallet &&
      onSetWallet({
        address: wallet.getAddressString(),
        publicKey: wallet.getPublicKeyString(),
        wallet: walletV3
      });

    if (download) {
      onDownloadWallet && onDownloadWallet(walletV3);
    }

    return redirect && routerTo && routerTo(redirect);
  }

  handlerGenerateNew = password => {
    const wallet = generate();
    if (!password || password === '') {
      this.setState({ walletValid: false });
    } else {
      this.onSetWallet(wallet, password, true);
      this.setState({
        justGenerate: false,
        password: '',
        createWallet: false
      });
    }
  };

  handlerPromptClick = (type, value = {}) => {
    let result = true;
    if (type) {
      const { wallet } = this.state;
      if (wallet && Boolean(value.password)) {
        const walletDecode = decodeWallet(wallet, value.password);
        if (walletDecode !== false) {
          this.setState({
            walletDecodeValidation: true,
            walletValid: true,
            justRead: false,
            passwordValid: true,
            addWallet: false,
            editWallet: false,
            wallet: null
          });
          this.onSetWallet(walletDecode, value.password);
        } else {
          result = false;
          this.setState({
            passwordValid: false,
            walletDecodeValidation: false
          });
        }
      }
    } else {
      this.setState({
        password: true,
        justRead: false
      });
    }
    return result;
  };

  handlerPrivateClick = (type, value = {}) => {
    if (type) {
      let errors = false;
      if (!Boolean(value.password)) {
        this.setState({ passwordValid: false });
        errors = true;
      }
      if (!errors) {
        const wallet = decodeWalletByPrivateKey(value.value);
        if (wallet !== false) {
          this.onSetWallet(wallet, value.password);
          this.setState({
            walletDecodeValidation: true,
            walletValid: true,
            justRead: false,
            passwordValid: true,
            privateKeyValidation: true,
            addWallet: false,
            editWallet: false
          });
        } else {
          // try load by private key
          this.setState({ privateKeyValidation: false });
        }
      }
    } else {
      this.setState({ password: true, passwordValid: true });
    }
  };

  handlerWithdrawReplenishETHClose = () => {
    this.setState({ withdrawETH: false, replenishETH: false });
  };

  handlerWithdrawReplenishUPRClose = () => {
    this.setState({ withdrawUPR: false, replenishUPR: false });
  };

  handlerUFRSwapToUPRClose = () => {
    this.setState({ ufrSwapToUPR: false });
  };

  handlerOnDeleteWallet = () => {
    this.setState({ renderDeleteWallet: true });
  };

  handlerOnEditWallet = () => {
    this.setState({ editWallet: true });
  };

  handlerShowPromptETHReplenish = () => {
    this.setState({ replenishETH: true });
  };

  handlerShowPromptETHWithdraw = () => {
    this.setState({ withdrawETH: true });
  };

  handlerShowUFRSwapToUPR = () => {
    this.setState({ ufrSwapToUPR: true });
  };

  handlerShowPromptUPRReplenish = () => {
    this.setState({ replenishUPR: true });
  };

  handlerShowPromptUPRWithdraw = () => {
    this.setState({ withdrawUPR: true });
  };

  handlerShowPromptAddWallet = () => {
    this.setState({ addWallet: true, createWallet: false });
  };

  handlerCancelAddWallet = () => {
    this.setState({ addWallet: false });
  };

  handlerShowPromptCreateWallet = () => {
    this.setState({ createWallet: true, addWallet: false });
  };

  handlerAddByPrivateKey = () => {
    this.setState({ addWalletFile: false, addWalletKey: true });
  };

  handlerAddByFile = () => {
    this.setState({ addWalletFile: true, addWalletKey: false });
  };

  handlerEditWallet = () => {
    this.setState({ editWallet: true });
  };

  handlerCancelEditWallet = () => {
    this.setState({ editWallet: false });
  };

  handlerOnShowFullWalletAddress = () => {
    const { address } = this.props;
    clipboard.writeText(address);
    this.setState({ showFullWalletAddress: true });
  };

  handlerOnHideFullWalletAddress = () => {
    this.setState({ showFullWalletAddress: false });
  };

  handlerRemoveWallet = action => {
    if (action) {
      const { onRemoveWallet } = this.props;
      onRemoveWallet && onRemoveWallet();
    }
    this.setState({ renderDeleteWallet: false, password: '', wallet: null });
  };

  handlerConfigureRatioSwapClose = () => {
    this.setState({
      configRatioSwap: false
    });
  };

  handlerShowConfigureRatioSwap = () => {
    this.setState({
      configRatioSwap: true
    });
  };

  learnMore = e => {
    e.preventDefault();
    shell.openExternal(SITE_DECRYPTION);
  };

  privacyPolicy = e => {
    e.preventDefault();
    shell.openExternal(SITE_PRIVACY);
  };

  get DeleteWalletModal() {
    const { renderDeleteWallet } = this.state;
    return renderDeleteWallet ? (
      <DeletePopUp
        key="delete"
        show
        onClick={this.handlerRemoveWallet}
        title={trans('Warning.Popup.Title')}
        subtitle={trans('Warning.Popup.Delete')}
      />
    ) : null;
  }

  get EmptyStub() {
    return (
      <Stub key="empty">
      <DropContainer
        onDrop={() => console.log('you dropped something')}
        disableClick
        disablePreview
        activeClassName="active"
        style={{
          width: '100%',
          height: '100%'
        }}
      >
        <StubTitle>{trans('stub.wallet.title')}</StubTitle>
        <StubSubTitle>
          <p>{trans('stub.wallet.subtitle')}</p>
          <p>{trans('stub.wallet.subtitleMore')}</p>
        </StubSubTitle>
        <StubLearnMore>
          <a href="#" onClick={this.learnMore}>
            {trans('stub.wallet.learnMore')}
          </a>
        </StubLearnMore>
        <StubBtnWrapper>
          <ActionsTwo>
            <MainButton
              onClick={() => this.handlerShowPromptAddWallet()}
              title={trans('stub.wallet.addWallet')}
            />
            <SecondaryButton
              onClick={() => this.handlerShowPromptCreateWallet()}
              title={trans('stub.wallet.createWallet')}
            />
          </ActionsTwo>
        </StubBtnWrapper>
        </DropContainer>
      </Stub>
    );
  }

  get AddWalletPopup() {
    const {
      addWallet,
      addWalletKey,
      addWalletFile,
      errorFileReading,
      privateKeyValidation,
      passwordValid,
      walletDecodeValidation,
      justRead
    } = this.state;
    return addWallet ? (
      <PopUpWithBg className="editwallet addwallet" key="add" bg={bgWallet}>
        <StubTitle>{trans('wallet.addTitle')}</StubTitle>
        <ClosePopUp onClick={() => this.handlerCancelAddWallet()} />
        <PromptWrapper>
          <AddWalletMenu>
            <AddWalletMenuItem
              onClick={this.handlerAddByPrivateKey}
              className={`withBorder ${addWalletKey ? 'active' : ''}`}
            >
              {trans('wallet.usePrivateKey')}
            </AddWalletMenuItem>
            <AddWalletMenuItem
              onClick={this.handlerAddByFile}
              className={addWalletFile ? 'active' : ''}
            >
              {trans('wallet.useWalletFile')}
            </AddWalletMenuItem>
          </AddWalletMenu>
          {addWalletKey ? (
            <PromptAddWallet
              contentType="key"
              type="text"
              onClick={this.handlerPrivateClick}
              privateKeyValidation={privateKeyValidation}
              validMessage={trans('Prompt.value.PrivateKeyValidation')}
              passwordValid={passwordValid}
              validationText={trans('Prompt.value.PrivateKey')}
              buttonTitle={trans('wallet.buttons.AddYourWallet')}
            />
          ) : null}
          {addWalletFile ? (
            <PromptAddWallet
              contentType="file"
              onClick={this.handlerPromptClick}
              valid={walletDecodeValidation}
              showOnlyPassword={false}
              passwordValid={passwordValid}
              validationText={trans('Prompt.value.PasswordNotCorrect')}
              errorFileReading={errorFileReading}
              onFileReaded={this.handlerWalletRead}
              justRead={justRead}
              onRemoveFile={this.handlerRemoveFile}
              buttonTitle={trans('wallet.buttons.AddYourWallet')}
            />
          ) : null}
        </PromptWrapper>
        <PromptWarningMessage>
          <span className="icon-ico-lock" />
          {trans('wallet.warningMessage')}
          <div>{trans('wallet.warningMessageMore')}</div>
        </PromptWarningMessage>
        <PromptSecondaryActions>
          <SecondaryAction onClick={() => this.handlerShowPromptCreateWallet()}>
            {trans('wallet.createNewWallet')}
          </SecondaryAction>
          <SecondaryAction onClick={e => this.privacyPolicy(e)}>
            {trans('wallet.privacyPolicy')}
          </SecondaryAction>
        </PromptSecondaryActions>
      </PopUpWithBg>
    ) : null;
  }

  get EditWalletPopup() {
    const {
      editWallet,
      addWalletKey,
      addWalletFile,
      errorFileReading,
      privateKeyValidation,
      passwordValid,
      walletDecodeValidation,
      justRead
    } = this.state;

    return editWallet ? (
      <PopUp className="editwallet addwallet" key="edit">
        <StubTitle>{trans('wallet.editTitle')}</StubTitle>
        <ClosePopUp onClick={() => this.handlerCancelEditWallet()} />
        <PromptWrapper>
          <AddWalletMenu>
            <AddWalletMenuItem
              onClick={() => this.handlerAddByPrivateKey()}
              className={`withBorder ${addWalletKey ? 'active' : ''}`}
            >
              {trans('wallet.usePrivateKey')}
            </AddWalletMenuItem>
            <AddWalletMenuItem
              onClick={() => this.handlerAddByFile()}
              className={addWalletFile ? 'active' : ''}
            >
              {trans('wallet.useWalletFile')}
            </AddWalletMenuItem>
          </AddWalletMenu>
          {addWalletKey ? (
            <PromptAddWallet
              contentType="key"
              onClick={this.handlerPrivateClick}
              privateKeyValidation={privateKeyValidation}
              validMessage={trans('Prompt.value.PrivateKeyValidation')}
              passwordValid={passwordValid}
              validationText={trans('Prompt.value.PrivateKey')}
              buttonTitle={trans('wallet.buttons.ChangeWallet')}
            />
          ) : null}
          {addWalletFile ? (
            <PromptAddWallet
              contentType="file"
              onClick={this.handlerPromptClick}
              valid={walletDecodeValidation}
              passwordValid={passwordValid}
              validationText={trans('Prompt.value.PasswordNotCorrect')}
              errorFileReading={errorFileReading}
              onFileReaded={this.handlerWalletRead}
              justRead={justRead}
              onRemoveFile={this.handlerRemoveFile}
              buttonTitle={trans('wallet.buttons.ChangeWallet')}
            />
          ) : null}
        </PromptWrapper>
        <PromptWarningMessage>
          <span className="icon-ico-lock" />
          {trans('wallet.warningMessage')}
          <div>{trans('wallet.warningMessageMore')}</div>
        </PromptWarningMessage>
        <CancelBtn
          onClick={() => this.handlerCancelEditWallet()}
          title={trans('Cancel')}
        />
      </PopUp>
    ) : null;
  }

  get CreateWalletPopup() {
    const { passwordValid, password, createWallet } = this.state;
    return createWallet ? (
      <PopUpWithBg key="create" bg={bgWallet}>
        <StubTitle className="editTitle">{trans('wallet.createTitle')}</StubTitle>
        <PromptWrapper>
          <PromptCreateWallet
            onClick={this.handlerGenerateNew}
            passwordValid={passwordValid}
            parentPassword={password}
          />
        </PromptWrapper>
        <PromptWarningMessage>
          <span className="icon-ico-lock" />
          {trans('wallet.warningMessage')}
          <div>{trans('wallet.warningMessageMore')}</div>
        </PromptWarningMessage>
        <PromptDangerMessage>
          {trans('wallet.dangerMessage')}
        </PromptDangerMessage>
        <PromptSecondaryActions>
          <SecondaryAction className="abc" onClick={this.handlerShowPromptAddWallet}>
            {trans('wallet.alreadyHaveWallet')}
          </SecondaryAction>
          <SecondaryAction onClick={this.privacyPolicy}>
            {trans('wallet.privacyPolicy')}
          </SecondaryAction>
        </PromptSecondaryActions>
      </PopUpWithBg>
    ) : null;
  }

  goToManageUPR = () => {
    const { routerTo, router } = this.props;
    !(router && router.location && router.location.pathname === path) &&
      routerTo &&
      routerTo(routes.UPRMANAGE);
  };

  render() {
    const {
      password,
      walletValid,
      justGenerate,
      justRead,
      showFullWalletAddress,
      replenishETH,
      withdrawETH,
      replenishUPR,
      withdrawUPR,
      ufrSwapToUPR,
      configRatioSwap
    } = this.state;

    const {
      address,
      publicKey,
      wallet,
      history,
      ethBalance,
      tokenBalance,
      availableBalanceETH,
      availableBalanceUPR,
      disableTransaction,
      refillStory,
      withdrawStory,
      refillProgress,
      withdrawProgress,
      ufrTokenBalance,
      ufrRateToUPR,
      isAdmin,
      ufrSwapToUPRProgress,
      configureRatioSwapProgress
    } = this.props;

    if (!Boolean(wallet)) {
      return [this.EmptyStub, this.CreateWalletPopup, this.AddWalletPopup];
    }

    const walletInput = justGenerate ? (
      <UInput
        type="password"
        name="password"
        onChange={e => this.handlerOnChangeInput(e)}
        value={password}
        placeholder={trans('wallet.inputs.WalletPassword')}
      />
    ) : null;

    const walletValidation = walletValid ? null : (
      <WalletError>{trans('wallet.passwordIncorect')}</WalletError>
    );

    const walletButton = (
      <FileButton href="#" onClick={e => this.handlerGenerateNew(e)} />
    );

    const generateButton = justGenerate ? (
      <WalletPass>
        {walletInput}
        {walletValidation}
        {walletButton}
      </WalletPass>
    ) : (
      <WalletButton
        disabled={justRead}
        onClick={this.handlerCreateNew}
        secondary
      >
        {trans('wallet.buttons.CreateNew')}
      </WalletButton>
    );

    const downloadWallet = wallet ? (
      [
        <WalletBtn
          key="0"
          onClick={this.handlerDownloadWallet}
          title={trans('wallet.buttons.Download')}
          iconClass="icon-ico2-download-file"
        />,
        history ? (
          <WalletBtn
            key="1"
            onClick={this.handlerShowStatistic}
            title={trans('wallet.buttons.Transactions')}
            iconClass="transactions"
          />
        ) : null
      ]
    ) : (
      <DecodingLoader>
        <Loader />
        {trans('wallet.decoded')}
      </DecodingLoader>
    );

    const WalletTopPart = (
      <BtnWithTooltip
        onClick={this.handlerOnDeleteWallet}
        imageIcon={removeIcon}
        positionClass="right"
        text={trans('wallet.removeBtn')}
        style={{
          backgroundColor: `${colors.bgRed}`,
          borderRadius: '5px'
        }}
      />
    );

    const WalletBottomPart = Boolean(publicKey)
      ? downloadWallet
      : generateButton;

    const walletPublicFlag = !Boolean(publicKey) || disableTransaction;
    const disabledWithdrawButton = walletPublicFlag && Boolean(refillStory);
    const disabledReplenishButton = walletPublicFlag && Boolean(withdrawStory);

    let walletAddressShort = null;
    if (address) {
      walletAddressShort = [
        String(address).substring(0, 8),
        String(address).substring(address.length - 8, address.length)
      ].join('...');
    }

    let ethBalanceShort = 0;
    if (ethBalance) {
      const ethBalanceString = String(ethBalance);
      if (
        ethBalanceString.indexOf('.') !== -1 &&
        ethBalanceString.length - ethBalanceString.indexOf('.') > 5
      ) {
        ethBalanceShort = `${ethBalanceString.substr(
          0,
          ethBalanceString.indexOf('.') + 5
        )}`;
      }
    }

    let tokenBalanceShort = 0;
    if (tokenBalance) {
      const tokenBalanceString = String(tokenBalance);
      if (
        tokenBalanceString.indexOf('.') !== -1 &&
        tokenBalanceString.length - tokenBalanceString.indexOf('.') > 5
      ) {
        tokenBalanceShort = `${tokenBalanceString.substr(
          0,
          tokenBalanceString.indexOf('.') + 5
        )}`;
      }
    }

    let ufrTokenBalanceShort = 0;
    if (ufrTokenBalance) {
      const ufrTokenBalanceString = String(ufrTokenBalance);
      if (
        ufrTokenBalanceString.indexOf('.') !== -1 &&
        ufrTokenBalanceString.length - ufrTokenBalanceString.indexOf('.') > 5
      ) {
        ufrTokenBalanceShort = `${ufrTokenBalanceString.substr(
          0,
          ufrTokenBalanceString.indexOf('.') + 5
        )}`;
      }
    }

    return [
      <React.Fragment key="wallet-section">
        <WalletInputSection
          style={{
            gridArea: 'circleB'
          }}>
          <div>
            <SubtitleFlexRow className={showFullWalletAddress ? 'withBlur' : ''}>
              <SubtitleWrapper>
                <SubtitleIcon className="icon-ico2-smart-contract-bal"></SubtitleIcon>
                <Subtitle>{trans('wallet.titles.MyWallet')}</Subtitle>
              </SubtitleWrapper>
              <div>
                <BtnWithTooltip
                  onClick={() => this.handlerOnEditWallet()}
                  iconClass="icon-ico2-edit"
                  positionClass="right"
                  text={trans('wallet.editBtn')}
                  style={{
                    backgroundColor: `${colors.bgGreen}`,
                    borderRadius: '5px'
                  }}
                />
                {WalletTopPart}
              </div>
            </SubtitleFlexRow>
            <WalletDiv className={showFullWalletAddress ? 'withBlur' : ''}>
              <CurrencyWrapper>
                <BNBIcon />
                <WalletIn>{walletAddressShort}</WalletIn>
              </CurrencyWrapper>
              <BtnWithTooltip
                onClick={() => this.handlerOnShowFullWalletAddress()}
                iconClass="icon-ico2-copy"
                positionClass="right"
                text={trans('wallet.copyAddress')}
                style={{
                  backgroundColor: 'transparent',
                  padding: '0px'
                }}
              />
            </WalletDiv>
          </div>
          {history ? (
            <ActionBlock className={showFullWalletAddress ? 'withBlur' : ''}>
              {WalletBottomPart}
            </ActionBlock>
          ) : (
            <ActionOneBlock className={showFullWalletAddress ? 'withBlur' : ''}>
              {WalletBottomPart}
            </ActionOneBlock>
          )}
          {showFullWalletAddress && (
            <FullWalletAddress>
              <Close onClick={this.handlerOnHideFullWalletAddress} />
              <FullWalletAddressDesc>
                {trans('wallet.walletAddress')}
              </FullWalletAddressDesc>
              <FullWalletAddressValue>{address}</FullWalletAddressValue>
              <FullWalletAddressDesc>
                {trans('wallet.copiedToClipboard')}
              </FullWalletAddressDesc>
            </FullWalletAddress>
          )}
        </WalletInputSection>

        <WalletBallanceSection
          style={{
            gridArea: 'circleC'
          }}>
          <SubtitleWrapper>
            <SubtitleIcon className="icon-ico2-wallet-bal"></SubtitleIcon>
            <Subtitle>{trans('wallet.titles.WalletBalance')}</Subtitle>
          </SubtitleWrapper>
          <div>
            <BallanceDiv>
              <CurrencyWrapper>
                <BNBIcon />
                <BallanceEllipsis
                  className={ethBalanceShort ? 'withTooltip' : ''}
                >
                  {trans('popups.upload.ETH')}:{' '}
                  {ethBalanceShort || ethBalance || 0}
                </BallanceEllipsis>
                {ethBalance && ethBalanceShort ? (
                  <Tooltip className="tooltip">
                    {ethBalance} {trans('popups.upload.ETH')}
                  </Tooltip>
                ) : null}
              </CurrencyWrapper>
              <Info description={trans('wallet.eth.info')} />
            </BallanceDiv>
            <BallanceDiv>
              <CurrencyWrapper>
                <UPRLogo src={logo} />
                <BallanceEllipsis>
                  {trans('popups.upload.UPR')}:{' '}
                  {tokenBalanceShort || tokenBalance
                    ? ufrFormat(tokenBalance)
                    : 0}
                </BallanceEllipsis>
              </CurrencyWrapper>
              {isAdmin ? (
                <WalletBtn
                  title={trans('wallet.manage.UPR')}
                  onClick={this.goToManageUPR}
                />
              ) : null}
            </BallanceDiv>
            {/* <BallanceDiv>
              <CurrencyWrapper>
                <UFRIcon className="icon-ico-ufr" />
                <BallanceEllipsis>
                  {trans('popups.upload.UFR')}:{' '}
                  {ufrTokenBalanceShort || ufrTokenBalance
                    ? ufrFormat(ufrTokenBalance)
                    : 0}
                </BallanceEllipsis>
              </CurrencyWrapper>
              <WalletBtn
                disabled={ufrTokenBalance <= 0}
                title="Swap to UPR"
                onClick={this.handlerShowUFRSwapToUPR}
              />
            </BallanceDiv>
            <BallanceOne
              style={{
                height: '2.8em',
                fontSize: '1.2em',
                borderTop: 0,
                color: '#acaccc',
                transform: 'translateY(-16px)',
                justifyContent: 'space-between'
              }}
            >
              Ratio 1 UFR/{ufrRateToUPR} UPR{' '}
              {isAdmin ? (
                <SettingButton onClick={this.handlerShowConfigureRatioSwap} />
              ) : null}
            </BallanceOne> */}
          </div>
        </WalletBallanceSection>

        <WithdrawSection
          style={{
            gridArea: 'circleA'
          }}>
          <SubtitleWrapper>
            <SubtitleIcon className="icon-ico2-smart-contract-bal"></SubtitleIcon>
            <Subtitle>{trans('wallet.titles.Withdraw')}</Subtitle>
          </SubtitleWrapper>
          <BallanceOne>
            <CurrencyWrapper>
              <BNBIcon />
              <WithdrawBallance>
                {availableBalanceETH ? ufrFormat(availableBalanceETH) : 0}
              </WithdrawBallance>
              <WithdrawBallanceUnit>
                {trans('popups.upload.ETH')}
              </WithdrawBallanceUnit>
            </CurrencyWrapper>
          </BallanceOne>
          <ActionBlock>
            <WalletBtn
              onClick={this.handlerShowPromptETHWithdraw}
              title={trans('wallet.buttons.Withdraw')}
              iconClass={disabledWithdrawButton ? 'disabled' : 'icon-ico2-withdraw'}
              disabled={disabledWithdrawButton}
            />
            <WalletBtn
              onClick={this.handlerShowPromptETHReplenish}
              title={trans('wallet.buttons.Replenish')}
              iconClass={disabledReplenishButton ? 'disabled' : 'replenish'}
              imageIcon={replenishFundIcon}
              disabled={disabledReplenishButton}
            />
          </ActionBlock>
        </WithdrawSection>
      </React.Fragment>,
      this.DeleteWalletModal,
      this.EditWalletPopup,
      (replenishETH || withdrawETH) && (
        <ReplenishWithdrawETHModal
          key="ReplenishWithdrawETHModal"
          {...this.props}
          replenish={replenishETH}
          withdraw={withdrawETH}
          onClose={this.handlerWithdrawReplenishETHClose}
        />
      ),
      (replenishUPR || withdrawUPR) && (
        <ReplenishWithdrawUPRModal
          key="ReplenishWithdrawUPRModal"
          {...this.props}
          replenish={replenishUPR}
          withdraw={withdrawUPR}
          onClose={this.handlerWithdrawReplenishUPRClose}
        />
      ),
      (refillProgress || withdrawProgress) && (
        <ProgressPopup key="ProgressPopup" {...this.props} />
      ),
      ufrSwapToUPR && (
        <UFRSwapToUPRModal
          key="UFRSwapToUPRModal"
          {...this.props}
          onClose={this.handlerUFRSwapToUPRClose}
        />
      ),
      configRatioSwap && (
        <ConfigRatioSwap
          key="ConfigRatioSwap"
          {...this.props}
          onClose={this.handlerConfigureRatioSwapClose}
        />
      ),
      configureRatioSwapProgress && (
        <ConfigureRatioSwapProgressPopup
          key="ConfigureRatioSwapProgressPopup"
          {...this.props}
        />
      ),
      ufrSwapToUPRProgress && <SwapProgressPopup key="SwapProgressPopup" />
    ];
  }
}
