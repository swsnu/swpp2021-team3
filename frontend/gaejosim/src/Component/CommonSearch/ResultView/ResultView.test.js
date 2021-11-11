import React from 'react';
import {shallow} from 'enzyme';
import ResultView from './ResultView';

describe('<ResultView />', () => {
    it('should render without errors', () => {
      const component = shallow(<ResultView />);
      const wrapper = component.find('.ResultView');
      expect(wrapper.length).toBe(1);
    });

    it('should render win_lose', () => {
      const component = shallow(<ResultView champion={'TEST_WIN_LOSE'} />);
      const wrapper = component.find('.win_lose');
      expect(wrapper.text()).toEqual('TEST_WIN_LOSE');
    });
});