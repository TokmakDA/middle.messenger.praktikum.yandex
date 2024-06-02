import { LoyautRows, LoyautSidebar } from '../../layouts';
import { BackBlock } from '../../modules/profile/back';
import { ProfileBlock } from '../../modules/profile';
import { ROUTES_PATH } from '../../lib/constants';

const profilePage = new LoyautRows({
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

export default profilePage;
