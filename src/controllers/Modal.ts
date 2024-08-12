import { BaseController } from './BaseController';
import { TFindUserRequest } from '../@types/api';
import { UserController } from './User';
import { ChatsController } from './Chats';

export class ModalController extends BaseController {
  static async AddUserToChat(data: TFindUserRequest) {
    try {
      const { currentChat } = this.store.getState();
      if (currentChat) {
        const findUsers = await UserController.searchUsers(data);
        if (Array.isArray(findUsers) && findUsers.length > 0) {
          const user = findUsers[0];
          await ChatsController.addUsersToChat({
            chatId: currentChat.id,
            users: [user.id],
          });
        }
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }

  static async removeUserFromChat(data: { id: number }) {
    try {
      const { currentChat } = this.store.getState();
      if (currentChat) {
        await ChatsController.removeUsersFromChat({
          chatId: currentChat.id,
          users: [data.id],
        });
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }
}
