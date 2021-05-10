import React from 'react';

import { shallow } from 'enzyme';

import { findByTestAttr } from '../../test/testUtils';
import LoadingModal from './LoadingModal';

const defaultProps = { loading: false };

/**
 * Factory function to create a ShallowWrapper for the LoadingModal component.
 * function setup
 * @param {object} props - Component props specific to this setup.
 * @returns {ShallowWrapper}
 */
const setup = (props={}) => {
    const setupProps = { ...defaultProps, ...props };
    return shallow(<LoadingModal {...setupProps} />);
};

test('renders without error', () => {
    const wrapper = setup({ loading: true });
    const component = findByTestAttr(wrapper, 'component-loading');
    expect(component.length).toBe(1);
});
test('it expects the close loading modal window cancel button to exist', () => {
    const wrapper = setup({ loading: true });
    const cancelButton = findByTestAttr(wrapper, 'component-loading-cancel-button');
    expect(cancelButton.length).toBe(1);
});
