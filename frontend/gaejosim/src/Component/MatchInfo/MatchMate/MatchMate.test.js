import React from 'react';
import {shallow} from 'enzyme';
import MatchMate from './MatchMate';

describe('<MatchMate />', () => {
    it('should render without errors', () => {
      const component = shallow(<MatchMate />);
      const wrapper = component.find('.MatchMate');
      expect(wrapper.length).toBe(1);
    });
});