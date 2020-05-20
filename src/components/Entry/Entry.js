import React, { Component } from "react";
// import { format } from 'date-fns'
import ApiContext from "../../ApiContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import config from "../../config";
import "./Entry.css";

class Entry extends Component {
  static contextType = ApiContext;

  state = {
    open: false,
  };

  handleClickDelete = (e) => {
    e.preventDefault();
    const entryId = this.props.id;

    fetch(`${config.API_ENDPOINT}/entries/${entryId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((e) => Promise.reject(e));
        }
      })
      .then(() => {
        this.context.deleteEntry(entryId);
      })
      .catch((err) => {
        console.error({ err });
      });
  };

  render() {
    const { subject, created, body, id } = this.props;
    return (
      <div className="Entry" id={id}>
        <div className="Entry-info-top">
          <button onClick={() => this.setState({ open: !this.state.open })} className={this.state.open ? 'open-entry' : 'closed-entry'}>
            >
          </button>
          <div className='Entry-info-container'>

          <div className="Entry-subject">{subject}</div>
          <div className="Entry-date">
            Created on:
            <div className="Date">{created}</div>
          </div>
          </div>
        </div>
        {this.state.open ? (
          <div className={this.state.open ? "Entry-body-delete open-entry-body" : "closed-entry-body"}>
            <div className="Entry-body">{body}</div>
            <button
              type="button"
              className="Entry-delete"
              onClick={this.handleClickDelete}
            >
              <FontAwesomeIcon icon="trash" className="delete-dest" /> this
              entry
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Entry;
