import { expect } from 'chai';
import Sinon from 'sinon';
import Block from './Block';
import { BlockProps } from '../@types/block';

describe('Smoke test for Components', () => {
  describe('Test block', () => {
    let BlockClass: typeof Block;

    beforeEach(() => {
      class Component extends Block {
        constructor(props: BlockProps) {
          super({
            ...props,
          });
        }

        render() {
          return `<div id="div">{{text}}</div>`;
        }
      }

      BlockClass = Component;
    });

    it('render props', () => {
      const textData = 'I am div!';
      const component = new BlockClass({ text: textData });
      const res = (component.element as unknown as HTMLDivElement)?.innerHTML;

      expect(res).to.be.eq(textData);
    });

    it('handle click', () => {
      const handler = Sinon.stub();
      const component = new BlockClass({
        text: 'I am button!',
        events: { click: handler },
      });

      const event = new MouseEvent('click');
      (component.element as unknown as HTMLDivElement)?.dispatchEvent(event);

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(handler.calledOnce).to.be.true;
    });

    it('Invoke _render', () => {
      const component = new BlockClass({});

      const spyDCM = Sinon.spy(component, '_render');

      component.setPropsAndChildren({ text: 'I am div' });

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(spyDCM.calledOnce).to.be.true;
    });
  });
});
