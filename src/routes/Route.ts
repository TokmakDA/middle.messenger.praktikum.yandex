import Block from '../tools/Block';
import isEqual from '../tools/isEqual';
import render from '../tools/renderDOM';

export default class Route {
  private _pathname: string;

  private _block: Block | null;

  private _blockClass: Block;

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
    return isEqual(pathname, this._pathname);
  }

  render() {
    // console.log('Route => render => this', this, `arguments => `, arguments);

    if (!this._block) {
      this._block = this._blockClass;
      render(this._props.rootQuery, this._block!);
      return;
    }

    this._block.show();
  }
}
