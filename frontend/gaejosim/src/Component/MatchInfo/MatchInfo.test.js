import React from 'react';
import {shallow} from 'enzyme';
import MatchInfo from './MatchInfo';

describe('<MatchInfo />', () => {
    it('should render without errors', () => {
      const component = shallow(<MatchInfo />);
      const wrapper = component.find('.MatchInfo');
      expect(wrapper.length).toBe(1);
    });

});