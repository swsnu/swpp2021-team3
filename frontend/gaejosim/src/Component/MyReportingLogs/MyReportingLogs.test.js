import React from "react";
import { shallow } from "enzyme";
import MyReportingLogs from "./MyReportingLogs";

describe("<MyReportingLogs />", () => {
  it("should render without errors", () => {
    const component = shallow(<MyReportingLogs />);
    const wrapper = component.find(".My");
    expect(wrapper.length).toBe(0);
  });

  // it("should handle Reportinglogs1_Paper button", () => {
  //   const Mock_Reportinglogs1_Paper = jest.fn();
  //   const component = shallow(
  //     <MyReportingLogs clickDone={Mock_Reportinglogs1_Paper} />
  //   );
  //   const wrapper = component.find(".Reportinglogs1_Paper");
  //   wrapper.simulate("click");
  //   expect(Mock_Reportinglogs1_Paper).toHaveBeenCalledTimes(0);
  // });

  // it("should handle Reportinglogs2_Paper button", () => {
  //   const Mock_Reportinglogs2_Paper = jest.fn();
  //   const component = shallow(
  //     <MyReportingLogs clickDone={Mock_Reportinglogs2_Paper} />
  //   );
  //   const wrapper = component.find(".Reportinglogs2_Paper");
  //   wrapper.simulate("click");
  //   expect(Mock_Reportinglogs2_Paper).toHaveBeenCalledTimes(0);
  // });

  // it("should handle Reportinglogs3_Paper button", () => {
  //   const Mock_Reportinglogs3_Paper = jest.fn();
  //   const component = shallow(
  //     <MyReportingLogs clickDone={Mock_Reportinglogs3_Paper} />
  //   );
  //   const wrapper = component.find(".Reportinglogs3_Paper");
  //   wrapper.simulate("click");
  //   expect(Mock_Reportinglogs3_Paper).toHaveBeenCalledTimes(0);
  // });

  // it("should handle Reportinglogs4_Paper button", () => {
  //   const Mock_Reportinglogs4_Paper = jest.fn();
  //   const component = shallow(
  //     <MyReportingLogs clickDone={Mock_Reportinglogs4_Paper} />
  //   );
  //   const wrapper = component.find(".Reportinglogs4_Paper");
  //   wrapper.simulate("click");
  //   expect(Mock_Reportinglogs4_Paper).toHaveBeenCalledTimes(0);
  // });

  // it("should handle Reportinglogs5_Paper button", () => {
  //   const Mock_Reportinglogs5_Paper = jest.fn();
  //   const component = shallow(
  //     <MyReportingLogs clickDone={Mock_Reportinglogs5_Paper} />
  //   );
  //   const wrapper = component.find(".Reportinglogs5_Paper");
  //   wrapper.simulate("click");
  //   expect(Mock_Reportinglogs5_Paper).toHaveBeenCalledTimes(0);
  // });

  // it("should handle Reportinglogs6_Paper button", () => {
  //   const Mock_Reportinglogs6_Paper = jest.fn();
  //   const component = shallow(
  //     <MyReportingLogs clickDone={Mock_Reportinglogs6_Paper} />
  //   );
  //   const wrapper = component.find(".Reportinglogs6_Paper");
  //   wrapper.simulate("click");
  //   expect(Mock_Reportinglogs6_Paper).toHaveBeenCalledTimes(0);
  // });

  // it("should handle Reportinglogs1_Delete button", () => {
  //   const Mock_Reportinglogs1_Delete = jest.fn();
  //   const component = shallow(
  //     <MyReportingLogs clickDone={Mock_Reportinglogs1_Delete} />
  //   );
  //   const wrapper = component.find(".Reportinglogs1_Delete");
  //   wrapper.simulate("click");
  //   expect(Mock_Reportinglogs1_Delete).toHaveBeenCalledTimes(0);
  // });

  // it("should handle Reportinglogs2_Delete button", () => {
  //   const Mock_Reportinglogs2_Delete = jest.fn();
  //   const component = shallow(
  //     <MyReportingLogs clickDone={Mock_Reportinglogs2_Delete} />
  //   );
  //   const wrapper = component.find(".Reportinglogs2_Delete");
  //   wrapper.simulate("click");
  //   expect(Mock_Reportinglogs2_Delete).toHaveBeenCalledTimes(0);
  // });

  // it("should handle Reportinglogs3_Delete button", () => {
  //   const Mock_Reportinglogs3_Delete = jest.fn();
  //   const component = shallow(
  //     <MyReportingLogs clickDone={Mock_Reportinglogs3_Delete} />
  //   );
  //   const wrapper = component.find(".Reportinglogs3_Delete");
  //   wrapper.simulate("click");
  //   expect(Mock_Reportinglogs3_Delete).toHaveBeenCalledTimes(0);
  // });

  // it("should handle Reportinglogs4_Delete button", () => {
  //   const Mock_Reportinglogs4_Delete = jest.fn();
  //   const component = shallow(
  //     <MyReportingLogs clickDone={Mock_Reportinglogs4_Delete} />
  //   );
  //   const wrapper = component.find(".Reportinglogs4_Delete");
  //   wrapper.simulate("click");
  //   expect(Mock_Reportinglogs4_Delete).toHaveBeenCalledTimes(0);
  // });

  // it("should handle Reportinglogs5_Delete button", () => {
  //   const Mock_Reportinglogs5_Delete = jest.fn();
  //   const component = shallow(
  //     <MyReportingLogs clickDone={Mock_Reportinglogs5_Delete} />
  //   );
  //   const wrapper = component.find(".Reportinglogs5_Delete");
  //   wrapper.simulate("click");
  //   expect(Mock_Reportinglogs5_Delete).toHaveBeenCalledTimes(0);
  // });

  // it("should handle Reportinglogs6_Delete button", () => {
  //   const Mock_Reportinglogs6_Delete = jest.fn();
  //   const component = shallow(
  //     <MyReportingLogs clickDone={Mock_Reportinglogs6_Delete} />
  //   );
  //   const wrapper = component.find(".Reportinglogs6_Delete");
  //   wrapper.simulate("click");
  //   expect(Mock_Reportinglogs6_Delete).toHaveBeenCalledTimes(0);
  // });
});
