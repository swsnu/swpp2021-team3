import React from 'react';
import {shallow} from 'enzyme';
import Result from './Result';
import ReactDOM from 'react-dom';

describe('<Result />', () => {
  it('should render without errors', () => {
    const component = shallow(<Result result={{champion_id: 'foo'}} />);
    const wrapper = component.find('.Result');
    expect(wrapper.length).toBe(0);
  });
});