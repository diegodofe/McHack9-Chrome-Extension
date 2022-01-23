/* global chrome */
import React, { useEffect } from "react";
import axios from "axios";

// React component imports
import CircleScore from "./CircleScore";
import Accordions from "./Accordions";
import Comment from "./Comment";
import { useState } from "react";

// Boostrap imports
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function App() {
  const [displayString, setDisplayString] = useState("");
  const [itemName, setItemName] = useState("");

  const testFunction = async () => {
    try {
      let queryOptions = { active: true, currentWindow: true };
      chrome.tabs.query(queryOptions, function (res) {
        const url = res[0].url;

        const urlSearchParams = new URLSearchParams(url);

        //console.log(urlSearchParams.getAll());

        console.log(urlSearchParams.get("k"));
        console.log(urlSearchParams.get("sprefix"));
        console.log(urlSearchParams.get("ref"));

        var productType = "";

        var baseURl = "";

        var isSearchTerm = false;

        var amazonSearchTerm = "";

        var walmartSearchTem = "";
        var targetSearchTerm = "";

        var slashCount = 0;

        for (var x = 0; x < url.length - 1; x++) {
          console.log(url.charAt(x));
          if (url.charAt(x) === "k" && url.charAt(x + 1) === "=") {
            isSearchTerm = true;
            x++;
            x++;
          } else if (url.charAt(x) === "q" && url.charAt(x + 1) === "=") {
            isSearchTerm = true;
            x++;
            x++;
          } else if (url.charAt(x) === "=" && baseURl.split(".")[1] === "target") {
            isSearchTerm = true;
            x++;
          } else if (url.charAt(x) === "&") {
            isSearchTerm = false;
            break;
          }
          if (isSearchTerm) {
            amazonSearchTerm = amazonSearchTerm + url.charAt(x).toString();
            walmartSearchTem = walmartSearchTem + url.charAt(x).toString();
            targetSearchTerm = targetSearchTerm + url.charAt(x).toString();
          }
          if (url.charAt(x) === "/") {
            slashCount++;
          } else if (slashCount === 2) {
            baseURl = baseURl + url.charAt(x);
          }
        }

        setItemName(amazonSearchTerm || walmartSearchTem || targetSearchTerm || "cant find results");

        var finalLatitude = "";
        var finalLongitude = "";

        console.log("search term");
        console.log(amazonSearchTerm);
        console.log(baseURl);
        console.log(urlSearchParams.get("search"));
        setDisplayString(baseURl);

        var baseUrlSplit = baseURl.split(".");
        var companyName = "";

        if (companyName === "starbucks") {
          setItemName("coffee");
        }

        if (baseURl.length > 0) {
          companyName = baseUrlSplit[1];
          setDisplayString(companyName);
        }
        console.log("Company name " + companyName);

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            // Show a map centered at latitude / longitude.
            console.log(latitude);
            console.log(longitude);

            finalLatitude = latitude;
            finalLongitude = longitude;
          });
        } else {
          alert("cannot retreive location, allow location permission");
        }

        console.log("item name " + amazonSearchTerm || walmartSearchTem);

        if (companyName === "starbucks") {
          productType = "tshirt";
        }
        productType = amazonSearchTerm || walmartSearchTem || targetSearchTerm || "cant find results";

        axios
          .get("http://127.0.0.1:5000/statecontroller/get", {
            params: {
              name: companyName,
              longitude: finalLatitude,
              latitude: finalLatitude,
            },
          })
          .then(function (response) {
            console.log(response);
            // rating of currentcompany
            // esgrating
          })
          .catch(function (error) {
            console.log(error);
          });

        axios
          .get("http://127.0.0.1:5000/companyController/getlist", {
            params: {
              item: productType,
            },
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

        // latitude - string
        // longitude - string
        // name - string
        // item - string
      });
      console.log("Testing console");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      let queryOptions = { active: true, currentWindow: true };
      chrome.tabs.query(queryOptions, function (res) {
        console.log(res[0].url);
      });
      console.log("Testing console");
      testFunction();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const fakePropsScore = 89;

  return (
    <div className="App">
      <Card className="text-center" style={{ width: "18rem" }}>
        <Card.Header as="h5">Consumer Score</Card.Header>
        <Card.Body>
          <CircleScore consumerScore={fakePropsScore} />
        </Card.Body>
        <Comment score={fakePropsScore} />
        <Card.Header as="h5">Local Alternatives</Card.Header>
        <Accordions />
        <Button variant="secondary" onClick={testFunction}>
          TEST FUNCTION
        </Button>
        <div>{displayString}</div>
        <div>{itemName}</div>
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
