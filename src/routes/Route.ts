import Block from '../tools/Block';
import renderDOM from '../tools/renderDOM';

export default class Route {
  private _pathname: string;
  private _block: Block | null;
  private readonly _blockClass: typeof Block;
  private _props: { rootQuery: string };

  constructor(
    pathname: string,
    view: typeof Block,
    props: { rootQuery: string },
  ) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.unmount();
      this._block = null;
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass({});
    }
    renderDOM(this._props.rootQuery, this._block!);
    this._block.dispatchComponentDidMount();
  }
}
