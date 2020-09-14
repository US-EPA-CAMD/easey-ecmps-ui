import React from 'react'
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NotFound from './NotFound'
import { Link } from 'react-router-dom'
configure ( { adapter: new Adapter() });

describe('<NotFound/>', () => {

    let wrapper ;
    beforeEach(() => {
       wrapper = shallow(<NotFound/>);
    });

    it('should take user to a "page not found" with a link to return to home, returns 1 <link> element' , () => {
        expect(wrapper.find(Link)).toHaveLength(1);
    });

});
