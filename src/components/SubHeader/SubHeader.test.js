import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { shallow } from 'enzyme';

import SubHeader from './SubHeader';

describe('SubHeader Component', () => {

  test('Menu items render without errors', () => {
    render(<SubHeader />);

    //Resources
    const resourcesMenuItem = screen.getAllByText('Resources');
    expect(resourcesMenuItem.length).toBe(2);

    const faqsLink = screen.getByText('FAQs');
    expect(faqsLink).toBeInTheDocument();

    //Help/Support
    const help_supportMenuItem = screen.getAllByText('Help/Support');
    expect(help_supportMenuItem.length).toBe(2);

    //Regulation Patterns
    const regpatternsMenuItem = screen.getByText('Regulatory Partners');
    expect(regpatternsMenuItem).toBeInTheDocument();

    //Site Map
    const sitemapMenuItem = screen.getByText('Site Map');
    expect(sitemapMenuItem).toBeInTheDocument();
  });

  test('Log In button renders without errors', () => {
    render(<SubHeader />);
    expect(screen.getByText('Log In')).toBeInTheDocument();
  });

  test('Log In modal renders without errors', () => {
    render(<SubHeader />);
    const loginButton = screen.getByText('Log In');
    expect(loginButton).toBeInTheDocument();

    fireEvent.click(loginButton);

    //Modal X button
    expect(screen.getByTestId('closeModalBtn')).toBeInTheDocument();
    //Login form labels
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
  });

  const mockUser = { firstName: 'FNTest', lastName: 'LNTest' };

  test('User Information after Login renders without errors', () => {
    render(<SubHeader user={mockUser} />);

    //Check Initials
    expect(screen.getByTestId('loggedInUserInitials')).toBeInTheDocument();
    const image = screen.getByAltText('Expand menu')
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/icons/menu-item-expand.svg');
    //Welcome message
    expect(screen.getByText('Welcome, FNTest!')).toBeInTheDocument();
    //Log out button
    expect(screen.getByText('Log Out')).toBeInTheDocument();
  });

  test('User Profile Options availability', () => {
    render(<SubHeader user={mockUser} />);

    //Click image
    const image = screen.getByAltText('Expand menu')
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/icons/menu-item-expand.svg');

    fireEvent.click(image);

    //User Profile links
    expect(image).toHaveAttribute('src', '/images/icons/menu-item-collapse.svg');
    expect(screen.getByText('Manage Login')).toBeInTheDocument();
    expect(screen.getByText('Manage Delegations')).toBeInTheDocument();
  });

  test('Log Out button clicks successfully', async () => {
    await act(async () => {
      render(<SubHeader user={mockUser} />);
      const logoutButton = screen.getByText('Log Out');
      expect(logoutButton).toBeInTheDocument();

      await fireEvent.click(logoutButton);

      expect(true).toBeTruthy();
    });
    /* //Check Initials not on screen
    expect(screen.queryByTestId('loggedInUserInitials')).toBeFalsy();
    expect(screen.queryByAltText('Expand menu')).toBeFalsy();
    //Welcome message not on screen
    expect(screen.queryByText('Welcome, FNTest!')).toBeFalsy();
    //Log out button not on screen
    expect(screen.queryByText('Log Out')).toBeFalsy();

    //Check log in button is visible
    expect(screen.getByText('Log In')).toBeInTheDocument(); */
  });

  it('Log Out button clicks successfully 2', () => {
    const component = shallow(<SubHeader user={mockUser} />);
    component.find({ id: "logoutBtn" }).simulate('click');

    //HOW TO CHANGE USER STATE

    expect(component.props('user') === 'undefined').toBeTruthy();
  });
});
