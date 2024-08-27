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
            template: `<div id="div">{{ text }}</div>`,
          });
        }
      }

      BlockClass = Component;
    });

    it('should correctly render the given props into the template', () => {
      const textData = 'I am div!';
      const component = new BlockClass({ text: textData });
      const res = (component.element as unknown as HTMLDivElement)?.innerHTML;

      expect(res).to.be.eq(textData);
    });

    it('should handle a click event by triggering the provided event handler', () => {
      const handler = Sinon.stub();
      const component = new BlockClass({
        text: 'I am button!',
        events: { click: handler },
      });

      const event = new MouseEvent('click');
      (component.element as unknown as HTMLDivElement)?.dispatchEvent(event);

      expect(handler.calledOnce).to.be.true;
    });

    it('should invoke the _render method only once when updating props', () => {
      const component = new BlockClass({});
      const template = `<div><div id="div">{{ text }}</div><div id="div2">{{ text2 }}</div></div>`;

      const spyDCM = Sinon.spy(component, '_render');

      component.setPropsAndChildren({
        template,
        text: 'I am div',
        text2: 'I am div!',
      });

      expect(spyDCM.calledOnce).to.be.true;
    });
  });
});
