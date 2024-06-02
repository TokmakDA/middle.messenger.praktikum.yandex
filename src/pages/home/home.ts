import Block from '../../tools/Block';
import './style.scss';
import { LoyautCenter } from '../../layouts';
import { ROUTES } from '../../lib/constants';

class HomeBlock extends Block {
  constructor({ ...props }) {
    super({
      template: `
        <div class="home">
          <h1 class="home__title">Home</h1>
          <nav>
            <ul class="home__naw-list">
              {{#each links}}
              <li>
                <a class="home__link" href="{{url}}">{{name}}</a>
              </li>
              {{/each}}
            </ul>
          </nav>
        </div>
      `,
      ...props,
    });
  }
}

const homePage = new LoyautCenter({
  content: new HomeBlock({
    links: ROUTES,
  }),
});

export default homePage;
