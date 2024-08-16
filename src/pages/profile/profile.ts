import { LoyautRows, LoyautSidebar } from '../../layouts';
import { BackBlock } from '../../modules/profile/back';
import { ProfileBlock } from '../../modules/profile';

class ProfilePage extends LoyautRows {
  constructor({ ...props }) {
    super({
      ...props,
      rows: [
        {
          row: new LoyautSidebar({
            content: new BackBlock({}),
          }),
        },
        { row: new ProfileBlock({}) },
      ],
    });
  }
}

export default ProfilePage;
