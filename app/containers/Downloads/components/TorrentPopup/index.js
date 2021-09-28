import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { PopUpWithBg } from '../../../../components/PopUp';
import ClosePopUp from '../../../../components/Buttons/ClosePopUpBtn';
import { PopUpTitle } from '../../../../components/confirmation';
import trans from '../../../../translations';
import {
  ActionsOne,
  FileCover,
  FilesList,
  FilesListHeadRow,
  FilesListRow,
  FilesWrapper,
  FullColumn,
  FullFileColumn,
  FullFlex,
  HalfFlexA,
  Row,
  SecondFlex,
  TorrentInfo,
  TorrentInfoDetails,
} from '../style';
import UInput from '../../../../components/InputText';
import FileButton from '../../../../components/Buttons/FileBtn';
import { bytesToSize } from '../../../../utils/bytesformat';
import MainBtn from '../../../../components/Buttons/MainBtn';
import moment from 'moment';
import { dialog, getCurrentWindow } from '@electron/remote';
import { TS_STATUS_DOWNLOAD } from '../../../../constants';
import ProgressPopup from '../../../../components/ProgressPopup';
import { getETHFee } from '../../../Wallet/selector';

class TorrentPopup extends PureComponent {
  state = {
    path: '',
    pathError: false,
    active: 0,
  };

  handlerSelectPath = () => {
    this.setState({ pathError: false });
    const filePaths = dialog.showOpenDialogSync(getCurrentWindow(), {
      title: trans('Upload.selectedPath'),
      properties: ['createDirectory', 'openDirectory'],
    });
    if (filePaths && filePaths.length) {
      this.setState({ path: filePaths[0] });
    }
  };

  handlerActive = (e, active) => {
    e.preventDefault();
    this.setState({ active });
  };

  handlerStart = () => {
    const { onStartDownloadTorrent, torrents = [] } = this.props;
    const { path } = this.state;

    const pathError = !path;

    this.setState({ pathError });

    if (pathError) {
      return;
    }

    onStartDownloadTorrent && onStartDownloadTorrent({ path, torrents });
  };

  get TorrentInfo() {
    const { active } = this.state;
    const { torrents = [], percentageFee } = this.props;
    const torrent = torrents[active];

    return (
      torrent && (
        <TorrentInfo>
          <TorrentInfoDetails>
            <FullFlex>
              <SecondFlex>
                <p>{trans('details.Price')}</p>
              </SecondFlex>
              <HalfFlexA>
                <p>
                  {torrent.price
                    ? `${torrent.price} ${trans('popups.upload.ETH')}`
                    : '--'}
                </p>
              </HalfFlexA>
              <SecondFlex>
                <p>Fee</p>
              </SecondFlex>
              <HalfFlexA>
                <p>
                  {torrent.price
                    ? `${getETHFee(
                        percentageFee,
                        torrent.price
                      ).toString()} ${trans('popups.upload.ETH')}`
                    : '--'}
                </p>
              </HalfFlexA>
              <SecondFlex>
                <p>{trans('details.Path')}</p>
              </SecondFlex>
              <HalfFlexA>
                <p>{torrent.path}</p>
              </HalfFlexA>
              <SecondFlex>
                <p>{trans('details.Size')}</p>
              </SecondFlex>
              <HalfFlexA>
                <p>{bytesToSize(torrent.size || 0)}</p>
              </HalfFlexA>
              <SecondFlex>
                <p>{trans('details.Created')}</p>
              </SecondFlex>
              <HalfFlexA>
                <p>{moment(torrent.created).format('L LT')}</p>
              </HalfFlexA>
              <SecondFlex>
                <p>{trans('details.Description')}</p>
              </SecondFlex>
              <HalfFlexA>
                <p>{torrent.description}</p>
              </HalfFlexA>
            </FullFlex>
          </TorrentInfoDetails>
        </TorrentInfo>
      )
    );
  }

  get FilesList() {
    const { active } = this.state;
    const { torrents = [] } = this.props;

    return torrents.map((torrent, i) => (
      <FilesListRow
        key={i}
        className={active === i ? 'active' : ''}
        onClick={e => this.handlerActive(e, i)}
      >
        <div>{torrent.name}</div>
        <div>{bytesToSize(torrent.size)}</div>
      </FilesListRow>
    ));
  }

  render() {
    const { path, pathError } = this.state;
    const { onCancelDownloadTorrent, newDownloadStatus } = this.props;

    return [
      <PopUpWithBg key="newDownload" bg={null}>
        <ClosePopUp onClick={onCancelDownloadTorrent} />
        <PopUpTitle><span className="icon-ico2-downloads"></span>{trans('download.Popup.title')}</PopUpTitle>
        <Row>
          <FullFileColumn>
            <FileCover>
              <UInput
                readOnly="readOnly"
                disabled
                value={path}
                label={trans('download.saveAs')}
                error={pathError ? trans('Download.Path.Error') : null}
              />
              <FileButton onClick={this.handlerSelectPath} />
            </FileCover>
          </FullFileColumn>
        </Row>
        <Row>
          <FullColumn>
            <FilesWrapper>
              <FilesList>
                <FilesListHeadRow>
                  <div>{trans('table.torrentFiles')}</div>
                  <div>{trans('table.filesSize')}</div>
                </FilesListHeadRow>
                {this.FilesList}
              </FilesList>
            </FilesWrapper>
          </FullColumn>
          {this.TorrentInfo}
        </Row>
        <ActionsOne>
          <MainBtn
            onClick={this.handlerStart}
            title={trans('Download.startDownloading')}
          />
        </ActionsOne>
      </PopUpWithBg>,
      newDownloadStatus === TS_STATUS_DOWNLOAD && (
        <ProgressPopup
          key="newDownloadStatus"
          title={trans('download.Popup.title')}
        />
      )
    ];
  }
}

TorrentPopup.propTypes = {
  torrents: PropTypes.array,
  onStartDownloadTorrent: PropTypes.func,
  onCancelDownloadTorrent: PropTypes.func
};

export default TorrentPopup;
