import React from 'react';

import { shallow } from 'enzyme';

import { findByTestAttr } from '../../test/testUtils';
import { authenticate } from '../../utils/api/easeyAuthApi';
import Login from './Login';

const mockSetInputField = jest.fn();

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: (initialState) => [initialState, mockSetInputField],
}));

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
        const wrapper = setup();
        const component = findByTestAttr(wrapper, 'component-login');
        expect(component.length).toBe(1);
    });
    test('it will ensure that a username is given', () => {
        const wrapper = setup();
        const componentInput = findByTestAttr(wrapper, 'component-login-username');

        const mockEvent = { target: { value: 'myusername' } };
        componentInput.simulate('change', mockEvent);

        expect(mockSetInputField).toHaveBeenCalledWith('myusername');
    });
    test('it will ensure a password is given', () => {
        const wrapper = setup();
        const componentInput = findByTestAttr(wrapper, 'component-login-password');

        const mockEvent = { target: { value: 'mypassword' } };
        componentInput.simulate('change', mockEvent);

        expect(mockSetInputField).toHaveBeenCalledWith('mypassword');
    });
    test('it will ensure that an api server response is returned in the error block', async () => {
        const wrapper = setup();
        const componentUsernameInput = findByTestAttr(wrapper, 'component-login-username');
        const componentPasswordInput = findByTestAttr(wrapper, 'component-login-password');
        const componentSubmitButton = findByTestAttr(wrapper, 'component-login-submit-button');
        const username = 'myusername';
        const password = 'mypassword';
        const mockUsernameEvent = { target: { value: username } };
        const mockPasswordEvent = { target: { value: password } };
        componentUsernameInput.simulate('change', mockUsernameEvent);
        componentPasswordInput.simulate('change', mockPasswordEvent);
        componentSubmitButton.simulate('click');

        try {
            await authenticate({ userId: username, password })
                .then(response => response)
                .catch(err => {
                    throw err;
                });
        } catch (error) {
            expect(error).toBe(true);
        }
    });
});
