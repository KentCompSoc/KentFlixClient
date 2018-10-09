import React from "react";
import "../../css/Course.css";

// Test videos
import videos from "../testVideos.json"

const Course = (props) => (
  <div className="row">
    {console.log(videos)}
    <div className="col-sm-12">{props.match.params.uri}</div>
    {videos.video.map(v => (
      <div className="col-sm-12 col-md-4 col-lg-3" key={v.publish}>
        <div className="card fluid">
          <img
            src="image.png"
            className="section media"
            alt={"Watch " + v.title + " video"}
          />
          <progress
            className="video-progress"
            value={v.progress}
            max={v.duration}
          ></progress>
          <h4>
            {v.title} - {v.author}
            <small>{v.publish}</small>
          </h4>
          <div className="button-group">
            <button className="video-btn-1">View</button>
            <button className="video-btn-1">Watch later</button>
          </div>
        </div>
      </div>
    ))}

  </div>
);

export default Course;