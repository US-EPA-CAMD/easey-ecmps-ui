import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import config from '../../config';
import '@testing-library/jest-dom';

describe('<Footer />', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it('renders without crashing', () => {
    expect(
      screen.getByRole('img', { name: /img alt text/ }),
    ).toBeInTheDocument();
  });

  it('renders the logo with the correct alt text', () => {
    expect(screen.getByRole('img', { name: /img alt text/ })).toHaveAttribute(
      'src',
      '/images/epaSeal.svg',
    );
  });

  it('renders the correct agency name and version information', () => {
    expect(
      screen.getByText(/United States Environmental Protection Agency/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `${config.app.version} published ${config.app.published}`,
      ),
    ).toBeInTheDocument();
  });
});
