import $ from "jquery";
import React from "react";
import store from "store";
import GeneralThumbnails from "./GeneralThumbnails";
import Thumbnail from "../components/Thumbnail";

export default class UserThumbnails extends GeneralThumbnails {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      programs: [],
      thumbParams: []
    };
    this.setParams = this.setParams.bind(this);
  }

  componentDidMount() {
    // this.setParams();
    super.loadCasts("user", this.setParams);
  }

  componentWillReceiveProps(nextProps) {
    // this.setState({ programs: nextProps.programs }, this.setParams);
  }

  setParams(programs) {
    const thumbParams = [];
    programs.forEach((program, index) => {
      const thumbParam = {};
      const $program = $(program);
      const thumbnailUrl = $program.find("community thumbnail").text();
      const startDayJpn = $program
        .find("video open_time_jpstr")
        .text()
        .match(/\d+\/(\d+)/)[1]; // Month/Day(Date) ...
      const startDateJpn = $program
        .find("video open_time_jpstr")
        .text()
        .match(/\d+\/\d+\((.)\)/)[1];
      thumbParam.background = `url('${thumbnailUrl}')`;
      thumbParam.title = $program.find("video title").text();
      thumbParam.id = $program.find("video id").text();
      thumbParam.url = `http://live.nicovideo.jp/watch/${thumbParam.id}`;
      thumbParam.isReserved = this.isReserved($program);
      thumbParam.day = `${startDayJpn}(${startDateJpn})`;
      thumbParam.openTime = thumbParam.isReserved
        ? $program.find("video open_time_jpstr").text()
        : undefined;
      thumbParam.text = thumbParam.title;
      thumbParam.index = index;
      if (
        !thumbParam.isReserved ||
        store.get("options.showReserved.enable") == "enable"
      ) {
        thumbParams.push(thumbParam);
      }
      if (index == programs.length - 1) {
        this.setState({
          thumbParams: thumbParams,
          loading: false
        });
      }
    });
  }

  isReserved($program) {
    const is_reserved = $($program)
      .find("video is_reserved")
      .text();
    return is_reserved == "true";
  }

  render() {
    return (
      <div id="container" className={this.state.loading ? "nowloading" : ""}>
        {this.state.thumbParams.map(thumbParam => (
          <Thumbnail
            key={thumbParam.id}
            preload={thumbParam.index == 0}
            background={thumbParam.background}
            title={thumbParam.title}
            url={thumbParam.url}
            id={thumbParam.id}
            isReserved={thumbParam.isReserved}
            text={thumbParam.text}
            day={thumbParam.day}
            openTime={thumbParam.openTime}
            index={thumbParam.index}
          />
        ))}
      </div>
    );
  }
}