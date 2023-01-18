import { addElementToLastFocusedArray } from './manage-focus';

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
