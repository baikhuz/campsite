import React, { Fragment } from "react";

export default () => (
  <Fragment>
    <div
      style={{
        height: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <i className="fas fa-spinner fa-spin fa-4x" />
    </div>
  </Fragment>
);
