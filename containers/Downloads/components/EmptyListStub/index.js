import React, { PureComponent } from 'react';
import { Stub, StubBtnWrapper, StubSubTitle, StubTitle, MenuIcon } from '../style';
import { TORRENT_EXTENSION } from '../../../../constants';
import trans from '../../../../translations';
import MainBtn from '../../../../components/Buttons/MainBtn';
import { DropContainer } from '../../../../style/containers';

export default class EmptyListStub extends PureComponent {

  render() {
    const {onDragFilesToTorrent, onClickAddFilesToTorrent} = this.props;

    return (
      <Stub>
        <DropContainer
          accept={TORRENT_EXTENSION}
          onDrop={onDragFilesToTorrent}
          disableClick
          disablePreview
          activeClassName="active"
        >

          <StubTitle>
          <MenuIcon
              className="icon-ico2-downloads"
            />
            {trans('stub.download.title')}
          </StubTitle>
          <StubSubTitle>
            <p>{trans('stub.download.subtitle')}</p>
            <p>{trans('stub.download.subtitleMore')}</p>
          </StubSubTitle>
          <StubBtnWrapper>
            <MainBtn
              onClick={onClickAddFilesToTorrent}
              title={trans('stub.download.browseTorrent')}
            />
          </StubBtnWrapper>
        </DropContainer>
      </Stub>
    );

  }
}
