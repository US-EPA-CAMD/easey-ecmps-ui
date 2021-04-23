import React from 'react'
import Footer from './Footer'
import { render } from "@testing-library/react";

describe('testing updated go-wide template footer', () => {
    test("should render logo text description", () => {
        const {getByText} = render(<Footer/>);
        const logoDescription = getByText("United States Environmental Protection Agency");
        expect(logoDescription).toBeTruthy();
      });
});
