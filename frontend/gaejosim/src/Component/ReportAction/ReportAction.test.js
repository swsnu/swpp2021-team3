import React from 'react';
import {shallow} from 'enzyme';
import { fireEvent, render} from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import clickTag1_1 from './ReportAction';

import ReportAction from './ReportAction';
import SearchPage from '../../Page/SearchPage'


describe('<ReportAction />', () => {

  it('should render without errors', () => {
    const component = shallow(<ReportAction />);
    const wrapper = component.find('.ReportAction');
    expect(wrapper.length).toBe(1);
  });

  it("properly change the value if clickTag1_1", () => {
    const wrapper = shallow(<ReportAction />)
    expect(wrapper.state("clickTag1_1")).toBe(false)

    wrapper.instance().onClickTag1_1Button()
    expect(wrapper.state("clickTag1_1")).toBe("tag1_1")
  })

  it('should handle tag1_1', () => {
    const mockClickTag1_1 = jest.fn();
    const component = shallow(<ReportAction clickDone={mockClickTag1_1} />);
    const wrapper = component.find('.Tag1_1Button');
    wrapper.simulate('click');
    expect(mockClickTag1_1).toHaveBeenCalledTimes(0);
  });

  it('should handle tag1_2', () => {
    const mockClickTag1_2 = jest.fn();
    const component = shallow(<ReportAction clickDone={mockClickTag1_2} />);
    const wrapper = component.find('.Tag1_2Button');
    wrapper.simulate('click');
    expect(mockClickTag1_2).toHaveBeenCalledTimes(0);
  });

  it('should handle tag2_1', () => {
    const mockClickTag2_1 = jest.fn();
    const component = shallow(<ReportAction clickDone={mockClickTag2_1} />);
    const wrapper = component.find('.Tag2_1Button');
    wrapper.simulate('click');
    expect(mockClickTag2_1).toHaveBeenCalledTimes(0);
  });

  it('should handle tag2_2', () => {
    const mockClickTag2_2 = jest.fn();
    const component = shallow(<ReportAction clickDone={mockClickTag2_2} />);
    const wrapper = component.find('.Tag2_2Button');
    wrapper.simulate('click');
    expect(mockClickTag2_2).toHaveBeenCalledTimes(0);
  });

  it('should handle tag3_1', () => {
    const mockClickTag3_1 = jest.fn();
    const component = shallow(<ReportAction clickDone={mockClickTag3_1} />);
    const wrapper = component.find('.Tag3_1Button');
    wrapper.simulate('click');
    expect(mockClickTag3_1).toHaveBeenCalledTimes(0);
  });

  it('should handle tag3_2', () => {
    const mockClickTag3_2 = jest.fn();
    const component = shallow(<ReportAction clickDone={mockClickTag3_2} />);
    const wrapper = component.find('.Tag3_2Button');
    wrapper.simulate('click');
    expect(mockClickTag3_2).toHaveBeenCalledTimes(0);
  });

  it('should handle tag4_1', () => {
    const mockClickTag4_1 = jest.fn();
    const component = shallow(<ReportAction clickDone={mockClickTag4_1} />);
    const wrapper = component.find('.Tag4_1Button');
    wrapper.simulate('click');
    expect(mockClickTag4_1).toHaveBeenCalledTimes(0);
  });

  it('should handle tag4_2', () => {
    const mockClickTag4_2 = jest.fn();
    const component = shallow(<ReportAction clickDone={mockClickTag4_2} />);
    const wrapper = component.find('.Tag4_2Button');
    wrapper.simulate('click');
    expect(mockClickTag4_2).toHaveBeenCalledTimes(0);
  });

  it('should handle tag5_1', () => {
    const mockClickTag5_1 = jest.fn();
    const component = shallow(<ReportAction clickDone={mockClickTag5_1} />);
    const wrapper = component.find('.Tag5_1Button');
    wrapper.simulate('click');
    expect(mockClickTag5_1).toHaveBeenCalledTimes(0);
  });

  it('should handle tag5_2', () => {
    const mockClickTag5_2 = jest.fn();
    const component = shallow(<ReportAction clickDone={mockClickTag5_2} />);
    const wrapper = component.find('.Tag5_2Button');
    wrapper.simulate('click');
    expect(mockClickTag5_2).toHaveBeenCalledTimes(0);
  });

  it('should handle submit', () => {
    const mockClickSubmit = jest.fn();
    const component = shallow(<ReportAction clickDone={mockClickSubmit} />);
    const wrapper = component.find('.submitButton');
    wrapper.simulate('click');
    expect(mockClickSubmit).toHaveBeenCalledTimes(0);
  });

  it('should handle cancel', () => {
    const mockClickCancel = jest.fn();
    const component = shallow(<ReportAction clickDone={mockClickCancel} />);
    const wrapper = component.find('.cancelButton');
    wrapper.simulate('click');
    expect(mockClickCancel).toHaveBeenCalledTimes(0);
  });

  it('router search page', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] });
    const { getAllByText } = render(
      <Router history={history}>
        <SearchPage />
      </Router>
    );
    expect(history.location.pathname).toBe('/');
    fireEvent.click(getAllByText('Search')[0]);
    expect(history.location.pathname).toBe('/');
  });
});

//todo: input, setState(false)


