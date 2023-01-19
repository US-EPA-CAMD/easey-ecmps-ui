import {
  addElementToLastFocusedArray,
  removeLastElementFromLastFocusedArray,
  returnFocusToLast,
} from './manage-focus';

describe('manage-focus functions', () => {
afterEach(() => {
    window.lastFocusedArray = undefined
})
  describe('returnFocusToLast', () => {
    const button1 = document.createElement('button'),
      button2 = document.createElement('button'),
      button3 = document.createElement('button'),
      button4 = document.createElement('button');
    button2.id = 'btn2';
    button3.id = 'tabBtn';
    button4.id = 'tabBtn';
    it('does nothing if there is no last focused array', () => {
      returnFocusToLast();
      expect(window.lastFocusedArray).toBeUndefined();
    });
    it('does nothing if last element in last focused array has no id', () => {
      window.lastFocusedArray = [button1];
      returnFocusToLast();
      expect(button1).not.toHaveFocus();
    });
    it('returns focus to last element in last focused array if it has an id', () => {
      window.lastFocusedArray = [button2];
      returnFocusToLast();
      expect(button2).toHaveFocus();
    });
    it('returns focus to last button in array if there are multiple buttons with "tabBtn" id', () => {
      window.lastFocusedArray = [button2, button3, button4];
      returnFocusToLast();
      expect(button4).toHaveFocus();
    });
    it('returns focus to second to last element if the stop spinner button is the last element', () => {
        const stopSpinnerBtn = document.createElement('button');
        stopSpinnerBtn.id = 'btnStopAnimation';
        window.lastFocusedArray = [button2, button3, button4, stopSpinnerBtn];
        returnFocusToLast();
        expect(button4).toHaveFocus();
    })
  });
  describe('addElementToLastFocusedArray tests', () => {
    beforeEach(() => {
      jest.spyOn(document, 'querySelector').mockImplementation(() => {
        return document.createElement('button');
      });
    });
    it('does nothing if there is no last focused element array', () => {
      addElementToLastFocusedArray('.btn');
      expect(window.lastFocusedArray).toBeUndefined();
    });
    it('adds focused element array', () => {
      window.lastFocusedArray = [];
      addElementToLastFocusedArray('.btn');
      expect(window.lastFocusedArray.length).toBe(1);
    });
    it('does nothing if the selector is invalid', () => {
      jest.spyOn(document, 'querySelector').mockImplementation(() => {
        return undefined;
      });
      window.lastFocusedArray = [];
      addElementToLastFocusedArray('.btn');
      expect(window.lastFocusedArray.length).toBe(0);
    });
    it('does nothing if element is already in the last focused array', () => {
      const buttonElement = document.createElement('button');
      jest.spyOn(document, 'querySelector').mockImplementation(() => {
        return buttonElement;
      });
      window.lastFocusedArray = [buttonElement];
      addElementToLastFocusedArray('.btn');
      expect(window.lastFocusedArray.length).toBe(1);
    });
  });

  describe('removeLastElementFromLastFocusedArray tests', () => {
    it('does nothing if there is no last focused element array', () => {
      removeLastElementFromLastFocusedArray('btn');
      expect(window.lastFocusedArray).toBeUndefined();
    });
    it('does nothing if there the last element has a different id', () => {
      const buttonElement = document.createElement('button');
      buttonElement.id = 'btn';
      window.lastFocusedArray = [buttonElement];
      removeLastElementFromLastFocusedArray('btn123');
      expect(window.lastFocusedArray.length).toBe(1);
    });
    it('does not remove last element if it is the only element in the array', () => {
      const buttonElement = document.createElement('button');
      buttonElement.id = 'btn';
      window.lastFocusedArray = [buttonElement];
      removeLastElementFromLastFocusedArray('btn');
      expect(window.lastFocusedArray.length).toBe(1);
    });
    it('removes last element if it is the only element in the array', () => {
        const buttonElement = document.createElement('button');
        buttonElement.id = 'btn';
        window.lastFocusedArray = [buttonElement, buttonElement];
        removeLastElementFromLastFocusedArray('btn');
        expect(window.lastFocusedArray.length).toBe(1);
      });
  });
});
