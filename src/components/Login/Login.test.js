import React from 'react'
import { render } from '@testing-library/react';
import Login from './Login'

test('renders login page title', () => {
    const { getByText } = render(<Login />);
    const linkElement = getByText(/Log In/i);

    expect(linkElement).toBeInTheDocument();
    throw new Error('Fail this test!');
});
