import React from 'react'
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MonitoringPlanHome from './MonitoringPlanHome'

configure ( { adapter: new Adapter() });

describe('<MonitoringPlanHome/>', () => {
    let wrapper ;
    beforeEach(() => {
       wrapper = shallow(<MonitoringPlanHome/>);
    });

    it('every page should have a nav bar' , () => {
        expect(wrapper.find('h1')).toHaveLength(1);
    });
});
