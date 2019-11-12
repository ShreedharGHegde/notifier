import React, { Component } from "react";
import "./Form.css";
import axios from "axios";
import io from "socket.io-client";

export class Announce extends Component {
  constructor() {
    super();

    this.socket = "";
  }

  state = {
    title: "",
    message: "",
    imageUrl: "",
    count: 0
  };

  onChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    this.socket = io.connect("http://localhost:5000");
  }

  //When the user starts filling the form, e.target.value will be empty. So seperate handler should be written for file handling.

  onSubmitClick = e => {
    e.preventDefault();
    let data = this.state;

    //"Content-Type": "multipart/form-data" is compulsory. Multer has to be used for viewing the FormData.
    console.log("formdata", data);
    this.socket.emit("announce", data);
    this.socket.on("announce", response => {
      this.setState({
        count: this.state.count + 1
      });
    });
  };

  render() {
    return (
      <div className="mt-5 col-12">
        <form onSubmit={this.onSubmitClick} className="form mx-5 col-6">
          <div className="form-group pb-4">
            <h3>
              <label htmlFor="title">Notification Title</label>
            </h3>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              onChange={this.onChange}
            />
          </div>

          <div className="form-group">
            <h3>
              <label htmlFor="message">Message</label>
            </h3>
            <textarea
              className="form-control"
              id="message"
              name="message"
              rows="3"
              onChange={this.onChange}
            ></textarea>
          </div>

          <div className="mt-5">
            {/* <input
              className="form-control-file"
              type="file"
              name="image"
              onChange={this.fileHanlde}
            />
            {this.state.filePath ? (
              <img
                alt="Notify"
                src={this.state.filePath}
                className="img-thumbnail mt-3"
              />
            ) : null} */}
            <a href="https://imgbb.com">
              <h3>Upload Image</h3>
            </a>
          </div>

          <div>
            <input
              type="text"
              name="imageUrl"
              placeholder="Paste URL here"
              onChange={this.onChange}
            />
          </div>

          <div>
            <button type="submit" className="btn btn-outline-secondary mt-4">
              Announce
            </button>
          </div>
        </form>
        <div>{this.state.count ? this.state.count : null}</div>
      </div>
    );
  }
}

export default Announce;
