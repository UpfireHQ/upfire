import React, { PureComponent } from 'react';
import { client } from '../../../../utils/torrent';
import { getClientTorrentFullPath } from '../../../../utils/torrent/helpers';
import { shell } from 'electron';
import {
  TorrentDetails,
  TorrentDetailsRow,
  TorrentDetailsTitle,
  TorrentDetailsValue,
  TorrentInfo,
  TorrentInfoHead,
  TorrentInfoHeadAction,
  TorrentInfoHeadActions,
  TorrentInfoHeadName, 
  TorrentBtnWrapper,
  TorrentDetailsTable,
  TorrentDescription,
  TorrentValue,
  TorrentNameTable
} from '../style';
import trans from '../../../../translations';
import { bytesToSize } from '../../../../utils/bytesformat';
import moment from 'moment';
import { getETHFee } from '../../../Wallet/selector';
import pauseIcon from '../../../../assets/icons/ico2-pause.svg';
import searchIcon from '../../../../assets/icons/ico2-search.svg';
import deleteIcon from '../../../../assets/icons/ico2-delete.svg';

export default class Details extends PureComponent {
  state = {
    clientTorrent: null,
    path: null
  };

  static getDerivedStateFromProps(props, state) {
    const { torrent } = props;
    const clientTorrent = client.get(torrent && torrent.infoHash);

    return {
      clientTorrent,
      path: clientTorrent && getClientTorrentFullPath(clientTorrent)
    };
  }

  handlerShowItemInFolder = () => {
    const { path } = this.state;
    path && shell.showItemInFolder(path);
  };

  handlerDeleteTorrent = () => {
    const { torrent, onDeleteTorrent } = this.props;
    onDeleteTorrent && onDeleteTorrent(torrent);
  };

  handlerResumeTorrent = () => {
    const { torrent, onResumeTorrent } = this.props;
    torrent && onResumeTorrent && onResumeTorrent(torrent.infoHash);
  };

  handlerPauseTorrent = () => {
    const { torrent, onPauseTorrent } = this.props;
    torrent && onPauseTorrent && onPauseTorrent(torrent.infoHash);
  };

  render() {
    const { torrent, percentageFee } = this.props;
    const { clientTorrent, path } = this.state;

    if (!(torrent && clientTorrent)) {
      return null;
    }

    return (
      <TorrentInfo>
        <TorrentInfoHead>
          <TorrentInfoHeadName>{torrent.name}</TorrentInfoHeadName>
          <TorrentBtnWrapper>
            <TorrentInfoHeadActions>
              {torrent && torrent.paused ? (
                <TorrentInfoHeadAction onClick={this.handlerResumeTorrent}>
                  <span className="icon-ico-play" />
                </TorrentInfoHeadAction>
              ) : (
                <TorrentInfoHeadAction onClick={this.handlerPauseTorrent}>
                  <img src={pauseIcon} />
                </TorrentInfoHeadAction>
              )}
              <TorrentInfoHeadAction onClick={this.handlerShowItemInFolder}>
              <img src={searchIcon} />
              </TorrentInfoHeadAction>
              <TorrentInfoHeadAction onClick={this.handlerDeleteTorrent}>
                <img src={deleteIcon} />
              </TorrentInfoHeadAction>
            </TorrentInfoHeadActions>
          </TorrentBtnWrapper>
        </TorrentInfoHead>

        <TorrentDetails>
        <TorrentDetailsTable>
            <thead>
              <tr>
                <th>{trans('details.Path')}</th>
                <th>{trans('table.Status')}</th>
                <th>{trans('details.Size')}</th>
                <th>{trans('details.Price')}</th>
                {/* <th>Fee</th> */}
                <TorrentNameTable>{trans('details.Created')}</TorrentNameTable>
              </tr>
            </thead>
            <tbody>
              <tr>
              <td>{path}</td>
              <td>
              {trans(
                torrent && torrent.paused ? 'table.Paused' : 'table.Seeding'
              )}
            </td>
            <td>
              {bytesToSize(torrent.size)}
            </td>
            <td>
              {torrent.price} {trans('popups.upload.ETH')}
            </td>
            {/* <td>
              {getETHFee(percentageFee, torrent.price).toString()}{' '}
              {trans('popups.upload.ETH')}
            </td> */}
            <td>
              {moment(torrent.createdAt).format('L LT')}
            </td>
              </tr>
            </tbody>

          </TorrentDetailsTable>
          <TorrentDescription>
            {trans('details.Description')}
          </TorrentDescription>
          <TorrentValue>
            {torrent.description}
          </TorrentValue>
        </TorrentDetails>
      </TorrentInfo>
    );
  }
}
