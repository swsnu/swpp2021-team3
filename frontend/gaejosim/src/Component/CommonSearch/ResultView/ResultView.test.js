import React from 'react';
import {shallow} from 'enzyme';
import ResultView from './ResultView';

describe('<ResultView />', () => {
    it('should render without errors', () => {
      const component = shallow(<ResultView />);
      const wrapper = component.find('.ResultView');
      expect(wrapper.length).toBe(0);
    });
});
