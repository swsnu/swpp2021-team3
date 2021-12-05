import React from "react";
import { shallow } from "enzyme";
import MyReportedLogs from "./MyReportedLogs";

describe("<MyReportedLogs />", () => {
  it("should render without errors", () => {
    const component = shallow(<MyReportedLogs />);
    const wrapper = component.find(".MyReportedLogs");
    expect(wrapper.length).toBe(0);
  });

  // it("should handle Reportedlogs1_Pencil button", () => {
  //   const Mock_Reportedlogs1_Pencil = jest.fn();
  //   const component = shallow(
  //     <MyReportedLogs clickDone={Mock_Reportedlogs1_Pencil} />
  //   );
  //   const wrapper = component.find(".Reportedlogs1_Pencil");
  //   wrapper.simulate("click");
  //   expect(Mock_Reportedlogs1_Pencil).toHaveBeenCalledTimes(0);
  // });

  // it("should handle Reportedlogs2_Pencil button", () => {
  //   const Mock_Reportedlogs2_Pencil = jest.fn();
  //   const component = shallow(
  //     <MyReportedLogs clickDone={Mock_Reportedlogs2_Pencil} />
  //   );
  //   const wrapper = component.find(".Reportedlogs2_Pencil");
  //   wrapper.simulate("click");
  //   expect(Mock_Reportedlogs2_Pencil).toHaveBeenCalledTimes(0);
  // });

  // it("should handle Reportedlogs3_Pencil button", () => {
  //   const Mock_Reportedlogs3_Pencil = jest.fn();
  //   const component = shallow(
  //     <MyReportedLogs clickDone={Mock_Reportedlogs3_Pencil} />
  //   );
  //   const wrapper = component.find(".Reportedlogs3_Pencil");
  //   wrapper.simulate("click");
  //   expect(Mock_Reportedlogs3_Pencil).toHaveBeenCalledTimes(0);
  // });

  // it("should handle Reportedlogs4_Pencil button", () => {
  //   const Mock_Reportedlogs4_Pencil = jest.fn();
  //   const component = shallow(
  //     <MyReportedLogs clickDone={Mock_Reportedlogs4_Pencil} />
  //   );
  //   const wrapper = component.find(".Reportedlogs4_Pencil");
  //   wrapper.simulate("click");
  //   expect(Mock_Reportedlogs4_Pencil).toHaveBeenCalledTimes(0);
  // });

  // it("should handle Reportedlogs5_Pencil button", () => {
  //   const Mock_Reportedlogs5_Pencil = jest.fn();
  //   const component = shallow(
  //     <MyReportedLogs clickDone={Mock_Reportedlogs5_Pencil} />
  //   );
  //   const wrapper = component.find(".Reportedlogs5_Pencil");
  //   wrapper.simulate("click");
  //   expect(Mock_Reportedlogs5_Pencil).toHaveBeenCalledTimes(0);
  // });

  // it("should handle Reportedlogs6_Pencil button", () => {
  //   const Mock_Reportedlogs6_Pencil = jest.fn();
  //   const component = shallow(
  //     <MyReportedLogs clickDone={Mock_Reportedlogs6_Pencil} />
  //   );
  //   const wrapper = component.find(".Reportedlogs6_Pencil");
  //   wrapper.simulate("click");
  //   expect(Mock_Reportedlogs6_Pencil).toHaveBeenCalledTimes(0);
  // });
});
