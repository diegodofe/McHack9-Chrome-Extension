/* global chrome */
import React, { useEffect } from "react";
import axios from "axios";

// React component imports
import CircleScore from "./CircleScore";
import Accordions from "./Accordions";
import Comment from "./Comment";
import { useState } from "react";

import companies from "../companies";

// Boostrap imports
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";

export default function App() {
  const [displayString, setDisplayString] = useState("");
  const [itemName, setItemName] = useState("");
  const [score, setScore] = useState(0);
  const [suggestions, setSuggestions] = useState([]);

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

        // if (navigator.geolocation) {
        //   navigator.geolocation.getCurrentPosition((position) => {
        //     const { latitude, longitude } = position.coords;
        //     // Show a map centered at latitude / longitude.
        //     console.log(latitude);
        //     console.log(longitude);
        //   });
        // } else {
        //   alert("cannot retreive location, allow location permission");
        // }

        console.log("item name " + amazonSearchTerm || walmartSearchTem);

        productType = amazonSearchTerm || walmartSearchTem || targetSearchTerm || "cant find results";

        if (companyName === "starbucks") {
          productType = "coffee";
        }

        companyName = companyName.charAt(0).toUpperCase() + companyName.substring(1);

        axios
          .get("http://127.0.0.1:5000/stateController/get/" + companyName + "/50/-73", {})
          .then(function (response) {
            console.log(response);
            //if (companyName == 'Starbucks') {
            //   response.data.esgRating = 61
            // }
            setScore(response.data.esgRating * 2.1);
          })
          .catch(function (error) {
            console.log(error);
          });
        axios
          .get("http://127.0.0.1:5000/companyController/getlist/" + productType, {})
          .then(function (response) {
            console.log(response.data);

            var storageList = [];

            console.log("imported companies: ");
            console.log(companies);

            response.data.forEach((item) => {
              const [id, category, companyName] = item;

              var foundCompany = companies.find((company) => {
                return company.key === id;
              });

              if (foundCompany) {
                storageList.push(foundCompany);
              }
            });
            console.log(storageList);
            setSuggestions(storageList);
          })

          .catch(function (error) {
            console.log(error);
          });
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

  // const fakePropsScore = 89;

  return (
    <div className="App">
      <Card className="text-center" style={{ width: "18rem" }}>
        <Card.Header as="h5">Consumer Score</Card.Header>
        <Card.Body>
          <CircleScore consumerScore={score || 0} />
        </Card.Body>
        <Comment score={score || 0} />
        {score ? (
          <div>
            <Card.Header as="h5">Local Alternatives</Card.Header>
            <Accordions suggestions={suggestions} />
          </div>
        ) : null}
        {/* <Button variant="secondary" onClick={testFunction}>
          TEST FUNCTION
        </Button>
        <div>{displayString}</div>
        <div>{itemName}</div> */}
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
