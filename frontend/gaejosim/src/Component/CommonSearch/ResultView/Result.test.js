import React from 'react';
import {shallow} from 'enzyme';
import Result from './Result';
import ReactDOM from 'react-dom';

describe('<Result />', () => {
  xit('should render without errors', () => {
    const component = shallow(<Result />);
    const wrapper = component.find('.Result');
    expect(wrapper.length).toBe(0);
  });
});