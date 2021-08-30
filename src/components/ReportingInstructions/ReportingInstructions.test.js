import React from 'react'
import { configure, shallow } from 'enzyme';
import { fireEvent, render, waitForElement } from "@testing-library/react";
import Adapter from 'enzyme-adapter-react-16';
import ReportingInstructions from './ReportingInstructions.js'
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
configure ( { adapter: new Adapter() });

describe('<reporting instructions/>', () => {
    test("test no title with section title user is logged in and at configuration table trying to search", () => {
        const { container, queryByPlaceholderText } = render(<ReportingInstructions/>);
    });

    // let wrapper ;
    // beforeEach(() => {
    //    wrapper = shallow(<ReportingInstructions/>);
    // });

    // it('should take user to a "page not found" with a link to return to home, returns 1 <link> element' , () => {
    //     expect(wrapper.find(Document)).toHaveLength(1);
    // });

});
