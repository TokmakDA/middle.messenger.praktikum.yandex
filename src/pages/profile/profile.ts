import { LoyautRows, LoyautSidebar } from '../../layouts';
import { BackBlock } from '../../modules/profile/back';
import { ProfileBlock } from '../../modules/profile';
import { ROUTES_PATH } from '../../lib/constants/routes';
import Block from '../../tools/Block';
import { connect } from '../../tools/connect';

class ProfilePage extends LoyautRows {
  constructor({ ...props }) {
    super({
      ...props,
      rows: [
        {
          row: new LoyautSidebar({
            content: new BackBlock({
              url: ROUTES_PATH.chat,
            }),
          }),
        },
        { row: new ProfileBlock({}) },
      ],
    });
  }
}

export default connect(() => ({}))(ProfilePage as typeof Block);
