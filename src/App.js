import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import Papa from "papaparse";
import Quote from "./Quote";
import Other from "./OtherQuote";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";

const homeStyles = makeStyles({
  root: {
    display: "grid",
    height: window.innerWidth > 600 ? "95vh" : "calc(100vh - 90px)",
    gridTemplateRows: window.innerWidth > 600 ? "1fr" : "1fr 1fr",
    gridTemplateColumns: window.innerWidth > 600 ? "2fr 1fr" : "1fr"
  },
  quoteParent: {
    display: "grid",
    height: window.innerWidth > 600 ? "95vh" : "calc(100vh - 90px",
    gridTemplateRows: "1fr 60px"
  },
  buttonBar: {
    maxWidth: "100%",
    overflowX: "auto",
    display: "flex",
    justifyContent: "space-around"
  },
  others: {
    maxHeight: "90vh",
    overflowY: "scroll"
  },
  button: {
    flex: "1 0 auto",
    margin: "2px 15px"
  }
});

export default function App() {
  const [init, setInit] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const [curr, setCurr] = useState(0);
  const [size, setSize] = useState("small");
  const [others, setOthers] = useState([]);

  const classes = homeStyles();
  const loadState = () => {
    axios
      .get(
        "https://gist.githubusercontent.com/coolinmc6/9879139a9c635ad3a36a210804bf7afe/raw/13cd3abe952925d396ab2e82547e0d675304f6e3/quotes_public.csv"
      )
      .then(({ data }) => {
        const _quotes = Papa.parse(data, { header: true });
        setQuotes(_quotes.data);
      });
  };

  const handleClick = num => {
    let x;
    if (Number(num) === 1) {
      x = curr + 1 === quotes.length ? 0 : curr + 1;
    } else if (Number(num) === -1) {
      x = curr - 1 < 0 ? quotes.length - 1 : curr - 1;
    } else {
      x = Math.floor(Math.random() * quotes.length);
    }
    setCurr(x);
    getOthers(x);
    // given current index, get other quotes
  };

  const getOthers = index => {
    const primary = quotes[index]["Primary Tag"];
    setOthers(
      quotes
        .filter(q => q["Primary Tag"] === primary)
        .sort((a, b) => a.Order - b.Order)
    );
  };

  const getSize = () => {
    if (window.innerWidth > 700 && window.innerWidth < 1000) {
      setSize("medium");
    } else if (window.innerWidth >= 1000) {
      setSize("large");
    }
  };

  useEffect(() => {
    if (!init) {
      loadState();
      setInit(true);
      getSize();
    }
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.quoteParent}>
        <Quote quote={quotes[curr]} />

        <div className={classes.buttonBar}>
          <Button
            variant="contained"
            color="secondary"
            size={size}
            onClick={() => handleClick(-1)}
            className={classes.button}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            size={size}
            onClick={() => handleClick(0)}
            className={classes.button}
          >
            Random
          </Button>
          <Button
            variant="contained"
            color="primary"
            size={size}
            onClick={() => handleClick(1)}
            className={classes.button}
          >
            Forward
          </Button>
        </div>
      </div>

      <div className={classes.othersParent}>
        <Typography variant="h4" align="center">
          {quotes?.[curr]?.["Primary Tag"]}
        </Typography>
        <div className={classes.others}>
          {others.map(d => {
            return <Other key={d.Id} quote={d} />;
          })}
        </div>
      </div>
    </div>
  );
}
