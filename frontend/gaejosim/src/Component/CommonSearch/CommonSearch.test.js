import React from 'react';
import {shallow} from 'enzyme';
import CommonSearch from './CommonSearch';
import ResultView from './ResultView/ResultView';

describe('<CommonSearch />', () => {
  //todo done : Cannot read property 'map' of undefined
  it('should render without errors', () => {
    const component = shallow(<CommonSearch recent_result={[]} />);
    const wrapper = component.find('.CommonSearch');
    expect(wrapper.length).toBe(0);
  }); 

  it('should render states without errors.', () => {
    const wrapper = shallow(<CommonSearch recent_result={[]} />);
    expect(wrapper.find('#tier').length).toEqual(0);
  });
});