import React from 'react'
import Layout from "./Layout";
import { render, screen } from "@testing-library/react";
import { Route, Switch,BrowserRouter } from 'react-router-dom';

const childComponent = () =>{
    return(<div>Welcome!</div>)
}

test("Layout renders a routed child component between header and footer", () => {
    render(
    <BrowserRouter>
        <Layout>
            <Switch>
                <Route path="/" exact component={childComponent} />
            </Switch>
        </Layout>
    </BrowserRouter>
    );
    const layoutContent = screen.getByText("Welcome!");
    expect(layoutContent).not.toBeUndefined();
});
