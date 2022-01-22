/* global chrome */
import React, { useEffect } from "react";

import logo192 from "../logo192.png";
import Accordions from "./Accordions";
import { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card"
import axios from 'axios';


export default function App() {

  const [displayString, setDisplayString] = useState("");


  const testFunction = async () => {
    try {
      let queryOptions = { active: true, currentWindow: true };
      chrome.tabs.query(queryOptions, function (res) {

        const url = res[0].url

        const urlSearchParams = new URLSearchParams(url);

        //console.log(urlSearchParams.getAll());

        console.log(urlSearchParams.get("k"));
        console.log(urlSearchParams.get("sprefix"));
        console.log(urlSearchParams.get("ref"));

        var baseURl = ""

        var isSearchTerm = false

        var amazonSearchTerm = ""

        var walmartSearchTem = ""

        var slashCount = 0;

        for (var x = 0; x < url.length - 1; x++) {
          console.log(url.charAt(x));
          if (url.charAt(x) === 'k' && url.charAt(x + 1) === '=') {
            isSearchTerm = true
            x++
            x++
          }
          else if (url.charAt(x) === 'q' && url.charAt(x + 1) === '=') {
            isSearchTerm = true
            x++
            x++
          }
          else if (url.charAt(x) === '&') {
            isSearchTerm = false;
          }
          if (isSearchTerm) {
            amazonSearchTerm = amazonSearchTerm + url.charAt(x).toString()
            walmartSearchTem = walmartSearchTem + url.charAt(x).toString()
          }

          if (url.charAt(x) === '/') {
            slashCount++;
          }
          else if (slashCount === 2) {
            baseURl = baseURl + url.charAt(x);
          }

        }

        console.log("search term")
        console.log(amazonSearchTerm)
        console.log(baseURl)
        console.log(urlSearchParams.get('search'))
        setDisplayString(baseURl)

        axios.get('http://127.0.0.1:5000/companycontroller/get', {
          params: {
            testParam: "alex"
          }
        })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
            // always executed
          });

      })
      console.log("Testing console")
    } catch (e) {
      console.log(e);
    }
  };


  useEffect(() => {
    try {
      let queryOptions = { active: true, currentWindow: true };
      chrome.tabs.query(queryOptions, function (res) {
        console.log(res[0].url)
      })
      console.log("Testing console")
    } catch (e) {
      console.log(e);
    }
  }, [])

  return (
    <div className="App">
      <Card className="text-center" border="success" style={{ width: "18rem" }}>
        <Card.Img variant="top" src={logo192} alt="brand-logo" />
        <Card.Header as="h1">Carbon Score</Card.Header>
        <Card.Body>
          <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
          <Button variant="success" onClick={testFunction}>TEST FUNCTION</Button>
          <div>{displayString}</div>
        </Card.Body>
        <Accordions />
      </Card>
    </div>
  );
}

// /* global chrome */
// async function getCurrentTab() {
//   let queryOptions = { active: true, currentWindow: true };
//   chrome.tabs.getCurrent(tab => {
//     console.log(tab)
//   })
//   return "hi";
// }

// chrome.runtime.onInstalled.addListener(async () => {
//   console.log("testing2")
//   console.log(await getCurrentTab());
// });

// chrome.runtime.onInstalled.addListener((reason) => {
//   console.log("testing1")
//   if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
//     chrome.tabs.create({
//       url: 'onboarding.html'
//     });
//   }
// });
