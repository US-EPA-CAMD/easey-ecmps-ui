import React from 'react'
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from './Header'

configure ( { adapter: new Adapter() });

describe('<Header/>', () => {
    let wrapper ;
    beforeEach(() => {
       wrapper = shallow(<Header/>);
    });

    it('every page should have a nav bar' , () => {
        expect(wrapper.find('nav')).toHaveLength(1);
    });

    it('nav bar should have 3 components/tabs' , () => {
        expect(wrapper.find('li')).toHaveLength(3);
    });

    it('government banner at top ' , () => {
        expect(wrapper.find('header')).toHaveLength(1);
    });
});
