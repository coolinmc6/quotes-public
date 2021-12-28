import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/styles";

const quoteStyles = makeStyles(theme => ({
  root: {
    fontSize: 30,
    textAlign: "center",
    margin: "10px auto",
    maxWidth: 600,
    padding: 10
  },
  long: {
    fontSize: 20
  }
}));
export default ({ quote }) => {
  const classes = quoteStyles();
  useEffect(() => {}, [quote]);
  const isLarge = quote?.Message.length > 300;
  return (
    <div className={`${classes.root} ${isLarge ? classes.long : ""}`}>
      {quote?.Message}
    </div>
  );
};
