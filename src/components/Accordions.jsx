import React from "react";
import companies from "../companies";

import "bootstrap/dist/css/bootstrap.min.css";
import Accordion from "react-bootstrap/Accordion";
import Badge from "react-bootstrap/Badge";

export default function Accordions() {
  return (
    <Accordion>
      {companies.map((company) => (
        <Accordion.Item eventKey={company.key}>
          <Accordion.Header>
            <h6>
              {company.name} <Badge bg={company.score > 50 ? "success" : "danger"}>{company.score}</Badge>
            </h6>
          </Accordion.Header>
          <Accordion.Body>{company.content}</Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
