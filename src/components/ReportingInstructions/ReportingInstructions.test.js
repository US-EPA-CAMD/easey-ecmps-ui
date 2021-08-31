import React from 'react'
import { fireEvent, render, waitForElement } from "@testing-library/react";
import ReportingInstructions from './ReportingInstructions.js'


describe('<reporting instructions/>', () => {
    test("renders reporting instructions", () => {
        const { container, queryByPlaceholderText } = render(<ReportingInstructions/>);

        expect(container).toBeDefined();
    });
});
