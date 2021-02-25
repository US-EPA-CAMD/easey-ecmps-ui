import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import WideHeader from "./WideHeader";

configure({ adapter: new Adapter() });

describe("<WideHeader/>", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<WideHeader />);
  });

  it("government banner at top ", () => {
    expect(wrapper.find('div.block-pane-official-website-header')).toHaveLength(1);
  });
  it("sandbox banner  ", () => {
    expect(wrapper.find('div#topbanner')).toHaveLength(1);
  });
  it('one menu button ' , () => {
      expect(wrapper.find('.menuBTN')).toHaveLength(1);
  });
  it("nav bar ", () => {
    expect(wrapper.find('div.usa-nav-container')).toHaveLength(1);
  });
});