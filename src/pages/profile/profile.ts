import { LoyautRows, LoyautSidebar } from '../../layouts';
import { BackBlock } from '../../modules/profile/back';
import { ProfileBlock } from '../../modules/profile';
import { ROUTES_PATH } from '../../lib/constants';
import Block from '../../tools/Block';
import { connect } from '../../tools/connect';

class ProfilePage extends LoyautRows {
  constructor(props: { rows: Block[] }) {
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
        { row: new ProfileBlock({ ...props }) },
      ],
    });
  }
}

export default connect(({ user }) => ({
  user,
}))(ProfilePage as typeof Block);
