import React from 'react';
import {shallow} from 'enzyme';
import TeamMate from './TeamMate';

describe('<TeamMate />', () => {
    xit('should render without errors', () => {
      const component = shallow(<TeamMate />);
      const wrapper = component.find('.TeamMate');
      expect(wrapper.length).toBe(1);
    });
});