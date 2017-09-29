// TODO: Move test file to TypeScript.
// import 'mocha';
// import { expect } from 'chai';
// import 'karma-fixture';
import '@webcomponents/webcomponentsjs/webcomponents-lite';

import { GrilledCheese } from '../src/grilled-cheese';

describe('<grilled-cheese>', () => {
  let component;
  let fixturePath = 'grilled-cheese.fixture.html';
  const FIXTURES = {
    DEFAULT: 0,
    SLOT: 1,
    STYLE: 2,
    ATTRIBUTES: 3,
    PROPERTIES: 4,
  };
  const DEFAULTS = {
    BOOLEAN: true,
    NUMBER: 42,
    STRING: 'Pickle',
    OBJECT: {
      foo: 'bar',
    },
  }

  before(() => {
    fixture.setBase('test/fixture')
  });

  afterEach(() => {
    fixture.cleanup()
  });

  describe('slot', () => {
    beforeEach(() => {
      component = fixture.load(fixturePath)[FIXTURES.SLOT];
    });

    it('name is rendered', () => {
      // Firefox has different output so testing for inclusion instead of exact match.
      const slot = component.shadowRoot.querySelector('slot');
      expect(slot.assignedNodes()[0].wholeText).to.include(DEFAULTS.STRING);
      // TODO: Switch to simpler test when Firefox is no longer polyfilled.
      // expect(component.innerText).equal('Cat');
    });
  });

  describe('--grilled-cheese-background-color', () => {
    describe('with default', () => {
      beforeEach(() => {
        component = fixture.load(fixturePath)[FIXTURES.SLOT];
      });

      it('is set', () => {
        expect(getComputedStyle(component.shadowRoot.querySelector('.content')).backgroundColor).equal('rgb(250, 250, 250)');
      });
    });

    describe('with outside value', () => {
      beforeEach(() => {
        component = fixture.load(fixturePath)[FIXTURES.STYLE].querySelector('grilled-cheese');
      });

      it('is set blue', () => {
        expect(getComputedStyle(component.shadowRoot.querySelector('.content')).backgroundColor).equal('rgb(3, 169, 244)');
      });
    });
  });

  describe('#pickles', () => {
    beforeEach(() => {
      component = fixture.load(fixturePath)[FIXTURES.DEFAULT];
    });

    describe('as property', () => {
      describe('when true', () => {
        beforeEach(() => {
          component.pickles = true;
        });

        it('is gettable', () => {
          expect(component.pickles).to.be.true;
        });

        it('is reflected to attribute', () => {
          expect(component.hasAttribute('pickles')).to.be.true;
        });

        it('is rendered in shadowRoot', () => {
          expect(component.shadowRoot.querySelector('.content').innerText).to.include(`pickles: true`);
        });
      });

      describe('when false', () => {
        beforeEach(() => {
          component.pickles = false;
        });

        it('is gettable', () => {
          expect(component.pickles).to.be.false
        });

        it('is not reflected to attribute', () => {
          expect(component.hasAttribute('pickles')).to.be.false;
        });

        it('is rendered in shadowRoot', () => {
          expect(component.shadowRoot.querySelector('.content').innerText).to.include(`pickles: false`);
        });
      });
    });

    describe('as attribute', () => {
      describe('when true', () => {
        beforeEach(() => {
          component.setAttribute('pickles', '');
        });

        it('is gettable', () => {
          expect(component.pickles).to.be.true;
        });

        it('is reflected to attribute', () => {
          expect(component.hasAttribute('pickles')).to.be.true;
        });

        it('is rendered in shadowRoot', () => {
          expect(component.shadowRoot.querySelector('.content').innerText).to.include(`pickles: true`);
        });
      });

      describe('when false', () => {
        beforeEach(() => {
          component.removeAttribute('pickles');
        });

        it('is gettable', () => {
          expect(component.pickles).to.be.false
        });

        it('is not reflected to attribute', () => {
          expect(component.hasAttribute('pickles')).to.be.false;
        });

        it('is rendered in shadowRoot', () => {
          expect(component.shadowRoot.querySelector('.content').innerText).to.include(`pickles: false`);
        });
      });
    });
  });

  describe('#quantity', () => {
    beforeEach(() => {
      component = fixture.load(fixturePath)[FIXTURES.DEFAULT];
    });

    describe('as property', () => {
      describe('when defined', () => {
        beforeEach(() => {
          component.quantity = DEFAULTS.NUMBER;
        });

        it('is gettable', () => {
          expect(component.quantity).equal(DEFAULTS.NUMBER);
        });

        it('is reflected to attribute', () => {
          expect(Number(component.getAttribute('quantity'))).equal(DEFAULTS.NUMBER);
        });

        it('is rendered in shadowRoot', () => {
          expect(component.shadowRoot.querySelector('.content').innerText).to.include(`quantity: ${DEFAULTS.NUMBER}`);
        });
      });

      describe('when undefined', () => {
        beforeEach(() => {
          component.quantity = null;
        });

        it('is gettable', () => {
          expect(component.quantity).equal(null);
        });

        it('is not reflected to attribute', () => {
          expect(component.hasAttribute('quantity')).to.be.false;
        });

        it('is not rendered in shadowRoot', () => {
          expect(component.shadowRoot.querySelector('.content').innerText).to.include(`quantity: N/A`);
        });
      });
    });

    describe('as attribute', () => {
      describe('when defined', () => {
        beforeEach(() => {
          component.setAttribute('quantity', DEFAULTS.NUMBER);
        });

        it('is gettable', () => {
          expect(component.quantity).equal(DEFAULTS.NUMBER);
        });

        it('is reflected to attribute', () => {
          expect(Number(component.getAttribute('quantity'))).equal(DEFAULTS.NUMBER);
        });

        it('is rendered in shadowRoot', () => {
          expect(component.shadowRoot.querySelector('.content').innerText).to.include(`quantity: ${DEFAULTS.NUMBER}`);
        });
      });

      describe('when undefined', () => {
        beforeEach(() => {
          component.removeAttribute('quantity');
        });

        it('is gettable', () => {
          expect(component.quantity).equal(null);
        });

        it('is not reflected to attribute', () => {
          expect(component.hasAttribute('quantity')).to.be.false;
        });

        it('is not rendered in shadowRoot', () => {
          expect(component.shadowRoot.querySelector('.content').innerText).to.include(`quantity: N/A`);
        });
      });
    });
  });

});
