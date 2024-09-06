import { expect } from 'chai';
import Sinon from 'sinon';
import Block from './Block';
import { BlockProps } from '../@types/block';

describe('Smoke test for Components', () => {
  describe('Test block', () => {
    let BlockClass: typeof Block;

    beforeEach(() => {
      // Создаем новый класс на основе Block перед каждым тестом
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
      // Проверяет, что текст из пропсов правильно отображается в шаблоне
      const textData = 'I am div!';
      const component = new BlockClass({ text: textData });
      const res = (component.element as HTMLDivElement)?.innerHTML;

      // Ожидаем, что текст совпадает с переданным
      expect(res).to.be.eq(textData);
    });

    it('should handle a click event by triggering the provided event handler', () => {
      // Проверяет, что обработчик события клика вызывается корректно
      const handler = Sinon.stub();
      const component = new BlockClass({
        text: 'I am button!',
        events: { click: handler },
      });

      component.element.dispatchEvent(new MouseEvent('click'));
      // Ожидаем один вызов обработчика
      expect(handler.calledOnce).to.be.true;
    });

    it('should add and remove event listeners correctly', () => {
      // Проверяет добавление и удаление слушателей событий
      const handler = Sinon.stub();
      const component = new BlockClass({ events: { click: handler } });

      component.element.dispatchEvent(new MouseEvent('click'));
      expect(handler.calledOnce).to.be.true; // Ожидаем один вызов

      component.unmount();
      component.element.dispatchEvent(new MouseEvent('click'));
      // После размонтирования вызовов не должно быть
      expect(handler.calledOnce).to.be.true;
    });

    it('should invoke the _render method only once when updating multiple props', () => {
      // Проверяет, что метод _render вызывается только один раз при обновлении нескольких пропсов
      const component = new BlockClass({});
      const spyDCM = Sinon.spy(component, '_render');

      component.setPropsAndChildren({
        template: `<div>{{ text }}</div>`,
        text: 'I am div',
      });
      // Ожидаем один вызов _render
      expect(spyDCM.calledOnce).to.be.true;
    });

    it('should call componentDidUpdate and re-render on prop update', () => {
      // Проверяет, что компонент обновляется при изменении пропсов
      const component = new BlockClass({ text: 'initial text' });
      const spy = Sinon.spy(component, 'componentDidUpdate');

      component.setPropsAndChildren({ text: 'updated text' });
      // Ожидаем вызов componentDidUpdate
      expect(spy.calledOnce).to.be.true;
      // Ожидаем, что текст совпадает с обновленным
      expect((component.element as HTMLDivElement)?.innerHTML).to.contain(
        'updated text',
      );
    });

    it('should call componentWillUnmount and remove all event listeners', () => {
      // Проверяет, что обработчики событий удаляются при размонтировании
      const component = new BlockClass({});
      const spyUnmount = Sinon.spy(component, 'componentWillUnmount');
      const spyRemoveEvents = Sinon.spy(component, '_removeEvents');

      component.unmount();
      // Ожидаем вызов componentWillUnmount
      expect(spyUnmount.calledOnce).to.be.true;
      // Ожидаем вызов _removeEvents
      expect(spyRemoveEvents.calledOnce).to.be.true;
    });
  });
});
