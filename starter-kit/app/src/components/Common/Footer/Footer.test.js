import React from 'react'
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Footer from './Footer'

configure ( { adapter: new Adapter() });
describe('<Footer/>', () => {
    let wrapper ;
    beforeEach(() => {
       wrapper = shallow(<Footer/>);
    });

    it('every page should have a footer with 4 columns of menu items' , () => {
        expect(wrapper.find('ul')).toHaveLength(4);
    });
});
