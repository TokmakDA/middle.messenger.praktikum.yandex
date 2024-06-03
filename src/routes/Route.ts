import Block from '../tools/Block';
import renderDOM from '../tools/renderDOM';

export default class Route {
  private _pathname: string;

  private _block: Block | null;

  private readonly _blockClass: Block;

  private _props: { rootQuery: string };

  constructor(pathname: string, view: Block, props: { rootQuery: string }) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    // console.log('Route => navigate => this', this, 'arguments => ', arguments);

    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    // console.log('Route => leave => this', this);

    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    // console.log('Route => render => this', this, `arguments => `, arguments);

    if (!this._block) {
      this._block = this._blockClass;
      renderDOM(this._props.rootQuery, this._block!);
      return;
    }

    this._block.show();
  }
}
