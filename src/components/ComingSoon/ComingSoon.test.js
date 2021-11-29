import React from 'react'
import { render, screen } from "@testing-library/react";
import ComingSoon from './ComingSoon'


describe('<ComingSoon/>', () => {

    let wrapper ;
    beforeEach(() => {
        const { container } = render(<ComingSoon/>);
    });

    it('should take user to a "coming soon" page' )
        expect(container.toBeDefined());
    });

});
