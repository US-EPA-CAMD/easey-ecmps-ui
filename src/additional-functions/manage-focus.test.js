import '@testing-library/jest-dom/extend-expect'

import {
  addElementToLastFocusedArray, assignFocusEventListeners, cleanupFocusEventListeners,
  removeLastElementFromLastFocusedArray, returnFocusToCommentButton,
  returnFocusToLast, returnFocusToModalButton, storeInFocusedArray,
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

    document.body.appendChild(button1);
    document.body.appendChild(button2);
    document.body.appendChild(button3);
    document.body.appendChild(button4);

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
        document.body.appendChild(stopSpinnerBtn);

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

  describe('Test storeInFocusedArray, assignFocusEventListeners, and cleanupFocusEventListeners',
      () => {

    beforeEach(() => {
      // Start with an empty HTML Body
      document.body.innerHTML = "";

      for(let x = 0; x < 12; x++) {
        const button = document.createElement('button');
        button.id = 'btn' + x;
        document.body.appendChild(button);
      }

      // Add Focus Event Listener to all of these buttons
      assignFocusEventListeners();
    })

    it('Should only store last 10 focus events', () => {
      for(let x = 0; x < 12; x++) {
        document.getElementById('btn' + x).focus();
      }

      expect(window["lastFocusedArray"].length).toBe(10);
      expect(window["lastFocusedArray"][9].id).toBe('btn11');
    })

    it('Should remove focus listener', () => {
      const removeListenerSpy = jest.fn();
      for(let x = 0; x < 12; x++) {
        const button = document.getElementById('btn' + x);
        button.removeEventListener = removeListenerSpy;
      }

      cleanupFocusEventListeners();
      expect(removeListenerSpy).toHaveBeenCalledTimes(12);
    })
  })

  describe('Test returnFocusToCommentButton', () => {
    it('Should return focus to the correct View Comments button', () => {
      // Start with an empty HTML Body
      document.body.innerHTML = "";

      const button1 = document.createElement("button");
      button1.innerHTML = "View Comments";
      button1.focus = jest.fn();
      document.body.appendChild(button1);

      const button2 = document.createElement("button2");
      button2.innerHTML = "View Comments";
      button2.focus = jest.fn();
      document.body.appendChild(button2);

      window.lastFocusedArray = [button1, button2];
      returnFocusToCommentButton()

      expect(button1.focus).toHaveBeenCalledTimes(1);
      expect(button2.focus).toHaveBeenCalledTimes(0);
    })
  })

  describe('Test returnFocusToModalButton', () => {
    it('Should return focus to the correct modal button', () => {
      window.lastModalButton = [];

      returnFocusToModalButton();
    })
  })
});
