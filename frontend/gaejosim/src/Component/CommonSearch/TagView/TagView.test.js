import React from 'react';
import {shallow} from 'enzyme';
import TagView from './TagView';

describe('<TagView />', () => {

  //todo: done: how to handle property of '0' of undefined
    it('should render without errors', () => {
      const component = shallow(<TagView tag_values="foo" />);
      const wrapper = component.find('.TagView');
      expect(wrapper.length).toBe(0);
    });

    it('should render tagDiagram', () => {
      const component = shallow(<TagView tag_values="foo" tagdiagram={'TEST_TAGDIAGRAM'} />);
      const wrapper = component.find('.tagDiagram');
      expect(wrapper.text()).toEqual('');
    });

    it('should render tags', () => {
      const component = shallow(<TagView tag_values="foo" tag={'TEST_TAGS'} />);
      const wrapper = component.find('.tags');
      expect(wrapper.text()).toEqual('tag1: ftag2: otag3: otag4: tag5: ');
    });

    it('should render states without errors.', () => {
      const wrapper = shallow(<TagView tag_values="foo" />);
      expect(wrapper.find('#tag_values').length).toEqual(0);
    });
});