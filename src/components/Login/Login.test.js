import React from 'react';

import { shallow } from 'enzyme';

import { findByTestAttr } from '../../test/testUtils';
import Login from './Login';

const defaultProps = { loading: false };

/**
 * Factory function to create a ShallowWrapper for the Login component.
 * function setup
 * @param {object} props - Component props specific to this setup.
 * @returns {ShallowWrapper}
 */
const setup = (props={}) => {
    const setupProps = { ...defaultProps, ...props };
    return shallow(<Login {...setupProps} />);
};

describe('tests for login form component', () => {
    test('renders component without crashing', () => {

    });
    test('renders login page title block', () => {
        // const wrapper = setup();
        // const componentTitle = findByTestAttr(wrapper, 'component-title');
        // expect(componentTitle.text()).toBe('Log In');
    });
    test('it will ensure that a username is given', () => {

    });
    test('it will ensure a password is given', () => {

    });
});
