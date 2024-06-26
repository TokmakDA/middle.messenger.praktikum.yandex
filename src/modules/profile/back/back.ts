import Block from '../../../tools/Block';
import './style.scss';

class BackBlock extends Block {
  constructor({ ...props }) {
    super({
      ...props,
      template: `
        <div class="sidebar__back-container">
          <a href="/chats" class="sidebar__back">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="14"
                cy="14"
                r="14"
                transform="rotate(-180 14 14)"
                fill="#3369F3"
              />
              <path
                d="M12.8 20L8 14M8 14L12.8 8M8 14L20 14"
                stroke="#FDFDFD"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>
        </div>
      `,
    });
  }
}

export default BackBlock;
