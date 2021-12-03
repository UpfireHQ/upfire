import { push } from 'react-router-redux';
import BigNumber from 'bignumber.js';
import routes from '../../constants/routes';
import {
  balanceOfETHContractTokenAction,
  balanceOfEthAction,
  getGasPriceAction,
  redirectAfterSetWalletAction,
  balanceOfUPRContractTokenAction
} from '../Wallet/actions';
import {
  getClientTorrent,
  initTorrentsByType,
  removeClientTorrent
} from '../../utils/torrent';
import { GAS_LIMIT_MAX, TORRENT_TYPE_COMPLETED } from '../../constants';
import {
  autoStartUnpackAction,
  removeCompletedTorrentAction,
  setCompletedTorrentsAction,
  setUnpackTorrentAction,
  setUnpackTorrentProgressAction,
  setUnpackTorrentStatusAction
} from './actions';
import trans from '../../translations';
import {
  alertConfirmationStory,
  deleteConfirmationStory,
  notificationAlertStory
} from '../Alerts/story';
import {
  removeWebTorrentAction,
  torrentAction
} from '../../reducers/webTorrent/actions';
import {
  checkMyPayment,
  checkPayment,
  isPaymentSuccess,
  payTorrent
} from '../../utils/torrent/blockchain';
import { requestTorrentWiresPassword } from '../../utils/torrent/wire';
import {
  dispatchDecodeTorrentStory,
  dispatchTorrentAction,
} from '../../utils/torrent/store';
import {
  getPaymentData,
  isTorrentFilesExists,
  isTorrentHasRemoteToken,
  isTorrentToken
} from '../../utils/torrent/helpers';
import checkDiskSpace from 'check-disk-space';
import { FilesProgress } from '../../utils/files-progress';
import { decryptFiles, renameFiles, FileEntity } from '../../utils/file';
import Path from 'path';
import { checkBalancesStory } from '../Wallet/story';
import { percentageOfFee } from '../Wallet/actions';
import EthClient from '../../blockchain/client';
import logger from '../../utils/logger';
import { getETHFee } from '../Wallet/selector';
import { getState } from '../../store';

export const routeToWalletStory = async dispatch => {
  dispatch(push(routes.WALLET));
  dispatch(redirectAfterSetWalletAction(routes.DOWNLOADS));
};

/**
 *
 * @param dispatch
 * @param store
 * @return {Promise<void>}
 */
export const initCompletedTorrentsStory = async (dispatch, store) => {
  const torrents = initTorrentsByType(TORRENT_TYPE_COMPLETED, store);
  dispatch(setCompletedTorrentsAction(torrents));

  Array.from(torrents).forEach(({ infoHash }) => {
    const torrent = store[infoHash];

    if (torrent) {
      if (torrent.price === 0 && torrent.infoHash) {
        const { location } = getState('router');

        dispatchDecodeTorrentStory(torrent);
        (!(location && location.pathname === routes.COMPLETED)) && dispatch(push(routes.COMPLETED));
      } else if (torrent.payment && !torrent.token) {
        checkPaymentTransactionStory(dispatch, store[infoHash]).catch(
          logger.warn
        );
      }
    }
  });
};

/**
 *
 * @param dispatch
 * @param payload
 * @return {Promise<*>}
 */
export const removeCompletedTorrentStory = async (dispatch, payload) => {
  const { infoHash, createdAt, name: subtitle } = payload;
  const title = trans('remove.torrent');

  const confirm = await deleteConfirmationStory(dispatch, { title, subtitle });

  if (confirm) {
    dispatch(removeCompletedTorrentAction({ createdAt, mark: true }));

    try {
      await removeClientTorrent(infoHash);
      dispatch(removeCompletedTorrentAction({ createdAt }));
      dispatch(removeWebTorrentAction({ infoHash }));
    } catch (e) {
      return dispatch(removeCompletedTorrentAction({ createdAt, mark: false }));
    }
  }
};

/**
 *
 * @param dispatch
 * @param payload
 * @return {Promise<void>}
 */
export const unpackTorrentStory = async (dispatch, payload) => {
  const { torrent, wallet } = payload;
  const infoHash = torrent && torrent.infoHash;

  if (torrent && torrent.decoded) {
    return;
  }

  const clientTorrent = getClientTorrent(infoHash);

  if (!isTorrentFilesExists(clientTorrent)) {
    logger.warn('unpackTorrentStory >> isTorrentFilesExists', infoHash);
    return alertConfirmationStory(dispatch, trans('unpack.failed'));
  }

  if (torrent.price === 0 || isTorrentToken(torrent && torrent.token)) {
    logger.info('unpackTorrentStory >> isTorrentToken', infoHash);
    return dispatchDecodeTorrentStory(torrent);
  }

  if (
    !(
      clientTorrent &&
      clientTorrent.wires &&
      clientTorrent.wires.length &&
      isTorrentHasRemoteToken(clientTorrent, torrent)
    )
  ) {
    clientTorrent.resume();
    return alertConfirmationStory(dispatch, trans('finished.tokenNotFound'));
  }

  const address = wallet && wallet.address;
  dispatch(setUnpackTorrentStatusAction(infoHash));

  const successPayment =
    torrent &&
    (torrent.price === 0 ||
    ((torrent.payment &&
      (await checkMyPayment(infoHash, address, torrent.payment))) ||
      (await checkPayment(infoHash, address, torrent.price))));

  if (successPayment) {
    dispatch(autoStartUnpackAction(infoHash));

    if (torrent.price > 0) {
      return requestTorrentWiresPassword(clientTorrent);
    }
  }

  if (torrent.price > 0) {
    await dispatch(getGasPriceAction());
  }

  dispatch(setUnpackTorrentStatusAction());
  dispatch(setUnpackTorrentAction(infoHash));
};

/**
 *
 * @param dispatch
 * @param payload
 * @return {Promise<*>}
 */
export const startUnpackTorrentStory = async (dispatch, payload) => {
  const { torrent, decodedWallet, gasPrice } = payload;
  const { infoHash, price } = torrent;

  dispatch(setUnpackTorrentStatusAction(infoHash));
  dispatch(setUnpackTorrentAction());

  const address = decodedWallet && decodedWallet.getAddressString();

  try {
    const value = {};

    if (price > 0) {
      const [availableETHBalance, ethBalance, percentageFee] = await Promise.all([
        dispatch(balanceOfETHContractTokenAction(address)),
        dispatch(balanceOfEthAction(address)),
        dispatch(percentageOfFee())
      ]).then(([availableETH, eth, fee]) => [
        (availableETH.value && availableETH.value.balance) || 0,
        (eth.value && eth.value.balance) || 0,
        (fee.value && fee.value.percentageFee) || 0
      ]);

      const fee = getETHFee(percentageFee, price);

      if (
        Number(availableETHBalance) <
        Number(EthClient.instance.toWei(fee.plus(new BigNumber(price))))
      ) {
        await alertConfirmationStory(dispatch, trans('walletOperations.PayETH'));
        logger.warn(trans('walletOperations.PayETH'), infoHash);
        return dispatch(setUnpackTorrentStatusAction());
      }

      const ethNeed = await EthClient.instance.ethNeed(GAS_LIMIT_MAX, gasPrice);

      if (Number(ethNeed) >= Number(ethBalance)) {
        await alertConfirmationStory(
          dispatch,
          trans('walletOperations.RefillETH')
        );
        logger.warn(trans('walletOperations.RefillETH'), infoHash);
        return dispatch(setUnpackTorrentStatusAction());
      }

      const gas = {
        price: gasPrice,
        limit: GAS_LIMIT_MAX
      };

      value.payment = await payTorrent(
        decodedWallet,
        getPaymentData(torrent, percentageFee),
        gas
      );
    }

    dispatch(
      torrentAction({
        torrent: getClientTorrent(infoHash),
        value,
      })
    );

    dispatch(autoStartUnpackAction(infoHash));
    if (price === 0 || !(await waitPaymentTransactionStory(dispatch, infoHash, value.payment))) {
      dispatch(autoStartUnpackAction());
      dispatch(setUnpackTorrentStatusAction());
    }
  } catch (e) {
    logger.warn(e);
    dispatch(autoStartUnpackAction());
    dispatch(setUnpackTorrentStatusAction());
  }
  checkBalancesStory(dispatch, address).catch(logger.warn);
};

/**
 *
 * @param dispatch
 * @param infoHash
 * @param payment
 * @return {Promise<void>}
 */
export const waitPaymentTransactionStory = async (
  dispatch,
  infoHash,
  payment
) => {
  const torrent = getClientTorrent(infoHash);

  try {
    if (torrent && payment && (await isPaymentSuccess(payment))) {
      requestTorrentWiresPassword(torrent);
      return true;
    }
    logger.warn(
      trans('waitPaymentTransactionStory >> FALSE'),
      infoHash,
      payment
    );

    const value = { payment: false };
    dispatch(torrentAction({ torrent, value }));
  } catch (e) {
    logger.warn(
      trans('alerts.someProblemsWithTransaction.title'),
      infoHash,
      payment,
      e
    );
    notificationAlertStory(dispatch, {
      title: trans('alerts.someProblemsWithTransaction.title'),
      subtitle: trans('alerts.someProblemsWithTransaction.message')
    });
  }

  return false;
};

/**
 *
 * @param dispatch
 * @param payload
 * @return {Promise<void>}
 */
export const checkPaymentTransactionStory = async (dispatch, payload) => {
  const { infoHash, payment } = payload;
  const torrent = getClientTorrent(infoHash);

  try {
    if (torrent && payment && (await isPaymentSuccess(payment))) {
      return requestTorrentWiresPassword(torrent);
    }
    dispatch(torrentAction({ torrent, value: { payment: false } }));
  } catch (e) {
    logger.warn(
      trans('alerts.someProblemsWithTransaction.title'),
      infoHash,
      payment,
      e
    );
  }
};

/**
 *
 * @param dispatch
 * @param payload
 * @return {Promise<*>}
 */
export const decodeTorrentStory = async (dispatch, payload) => {
  const { torrent, unpackTorrentProgress } = payload;

  if (!torrent || (torrent.price > 0 && !torrent.token)) {
    return dispatch(setUnpackTorrentProgressAction());
  }

  dispatch(setUnpackTorrentProgressAction(unpackTorrentProgress));

  const { infoHash, size, token, name, price } = torrent;
  const { path: dest } = unpackTorrentProgress;
  const progress = new FilesProgress();

  try {
    const ds = await checkDiskSpace(dest);

    if (ds.free <= size) {
      dispatch(setUnpackTorrentProgressAction());
      logger.warn(trans('upload.space'), infoHash, ds);
      return alertConfirmationStory(dispatch, trans('upload.space'));
    }

    const clientTorrent = getClientTorrent(infoHash);

    if (!(clientTorrent && clientTorrent.files && clientTorrent.files.length)) {
      dispatch(setUnpackTorrentProgressAction());
      logger.warn(trans('upload.space'), infoHash);
      return alertConfirmationStory(dispatch, trans('unpack.failed'));
    }

    const files = clientTorrent.files.map(f => {
      return new FileEntity(f.path);
    });

    progress.init(files, progress => {
      dispatch(
        setUnpackTorrentProgressAction({
          ...unpackTorrentProgress,
          ...progress
        })
      );
    });
    dispatch(
      setUnpackTorrentProgressAction({
        ...unpackTorrentProgress,
        ...progress.progress
      })
    );

    const res = price > 0 ?
      await decryptFiles(files, dest, name, token, progress.listener) :
      await renameFiles(files, dest, name, progress.listener);

    progress.destroy();

    const decoded = res && res[0] ? Path.dirname(res[0]) : dest;
    dispatch(torrentAction({ torrent: clientTorrent, value: { decoded } }));
    dispatch(setUnpackTorrentProgressAction());
    alertConfirmationStory(dispatch, trans('unpack.success'));
  } catch (e) {
    logger.warn(e);
    progress.destroy();
    dispatch(setUnpackTorrentProgressAction());
    notificationAlertStory(dispatch, {
      title: trans('unpack.failed'),
      subtitle: String(e && e.message).startsWith('EEXIST')
        ? trans('unpack.EEXIST')
        : trans(e && e.message)
    });
  }
};

/**
 * @param dispatch
 * @param payload
 * @return {Promise<void>}
 */
export const checkCompletedFilesStory = async (dispatch, payload) => {
  const { torrents = [] } = payload;

  Array.from(torrents).forEach(({ infoHash }) => {
    const torrent = getClientTorrent(infoHash);
    const failed = !isTorrentFilesExists(torrent);

    dispatchTorrentAction(torrent, { failed });
  });
};

/**
 *
 * @param dispatch
 * @param payload
 * @return {Promise<void>}
 */
export const downloadAgainStory = async (dispatch, payload) => {};
