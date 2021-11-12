import React from 'react';
import {shallow} from 'enzyme';
import SearchPage from './SearchPage';

describe('<SearchPage />', () => {
    it('should render without errors', () => {
      const component = shallow(<SearchPage />);
      const wrapper = component.find('.Search');
      expect(wrapper.length).toBe(0); //?
    });

    it('should gotoreport button', () => {
      const mockGoToReport = jest.fn();
      const component = shallow(<SearchPage clickDone={mockGoToReport} />);
      const wrapper = component.find('.gotoreport');
      wrapper.simulate('click');
      expect(mockGoToReport).toHaveBeenCalledTimes(1);
    });
});

