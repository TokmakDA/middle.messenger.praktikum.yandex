import { LoyautRows, LoyautSidebar } from '../../layouts';
import { BackBlock } from '../../modules/profile/back';
import { ProfileBlock } from '../../modules/profile';

const profilePage = new LoyautRows({
  rows: [
    {
      row: new LoyautSidebar({
        content: new BackBlock({}),
      }),
    },
    { row: new ProfileBlock({}) },
  ],
});

export default profilePage;
