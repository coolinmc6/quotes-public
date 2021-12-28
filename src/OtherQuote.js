import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/styles";

const quoteStyles = makeStyles(theme => ({
  root: {
    fontSize: 18,
    textAlign: "left",
    margin: "10px auto",
    padding: 5,
    fontFamily: 'sans-serif',
  },
  rank: {
    display: "inline-block",
    color: "white",
    marginRight: 5,
    padding: '2px 5px',
    backgroundColor: "#3f51b5",
    fontWeight: "bold"
  }
}));
export default ({ quote }) => {
  const classes = quoteStyles();
  useEffect(() => {}, [quote]);
  return (
    <div className={classes.root}>
      <span className={classes.rank}>{quote?.Order}</span>
      {quote?.Message}
    </div>
  );
};
