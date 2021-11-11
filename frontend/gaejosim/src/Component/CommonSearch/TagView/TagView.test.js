import React from 'react';
import {shallow} from 'enzyme';
import TagView from './TagView';

describe('<TagView />', () => {
    it('should render without errors', () => {
      const component = shallow(<TagView />);
      const wrapper = component.find('.TagView');
      expect(wrapper.length).toBe(1);
    });

    it('should render tagDiagram', () => {
      const component = shallow(<TagView champion={'TEST_TAGDIAGRAM'} />);
      const wrapper = component.find('.tagDiagram');
      expect(wrapper.text()).toEqual('TEST_TAGDIAGRAM');
    });

    it('should render tags', () => {
      const component = shallow(<TagView champion={'TEST_TAGS'} />);
      const wrapper = component.find('.tags');
      expect(wrapper.text()).toEqual('TEST_TAGS');
    });
});