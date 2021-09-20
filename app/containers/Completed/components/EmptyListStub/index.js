import React, { PureComponent } from 'react';
import { Stub, StubBtnWrapper, StubSubTitle, StubTitle, MenuIcon} from '../style';
import trans from '../../../../translations';
import FourthButton from '../../../../components/Buttons/FourthBtn';
import { SITE_DECRYPTION } from '../../../../constants';
import { DropContainer } from '../../../../style/containers';
import { TORRENT_EXTENSION } from '../../../../constants';

import { shell } from 'electron';

export default class EmptyListStub extends PureComponent {

  learnMore(e) {
    e.preventDefault();
    shell.openExternal(SITE_DECRYPTION);
  }

  render() {
    return (
      <Stub>
        <DropContainer
          accept={TORRENT_EXTENSION}
          onDrop={() => console.log('you dropped something')}
          disableClick
          disablePreview
          activeClassName="active"
        >
          <StubTitle>
            <MenuIcon
              className="icon-ico2-completed-downloads"
            />
            {trans('stub.completed.title')}
          </StubTitle>
          <StubSubTitle>
            <p>{trans('stub.completed.subtitle')}</p>
            <p>{trans('stub.completed.subtitleMore')}</p>
          </StubSubTitle>
          <StubBtnWrapper>
            <FourthButton
              onClick={(e) => this.learnMore(e)}
              title={trans('stub.upload.learMore')}
            />
          </StubBtnWrapper>
        </DropContainer>
      </Stub>
    );
  }
}
