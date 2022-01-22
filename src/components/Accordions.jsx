import React from "react";
import companies from "../companies";

import "bootstrap/dist/css/bootstrap.min.css";
import Accordion from "react-bootstrap/Accordion";
import Badge from "react-bootstrap/Badge";

export default function Accordions() {
  function getColor(score) {
    if (score >= 75) {
      return "success";
    } else if (score >= 50) {
      return "warning";
    } else {
      return "danger";
    }
  }

  return (
    <Accordion>
      {companies
        .sort((a, b) => b.score - a.score)
        .map((company) => (
          <Accordion.Item key={company.key} eventKey={company.key}>
            <Accordion.Header>
              <h6>
                {company.name} <Badge bg={getColor(company.score)}>{company.score}</Badge>
              </h6>
            </Accordion.Header>
            <Accordion.Body>{company.content}</Accordion.Body>
          </Accordion.Item>
        ))}
    </Accordion>
  );
}
