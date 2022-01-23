import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Accordion, Badge, Stack } from "react-bootstrap";

export default function Accordions(props) {
  function getColor(score) {
    if (score > 75) {
      return "success";
    } else if (score > 55) {
      return "warning";
    } else {
      return "danger";
    }
  }

  return (
    <Accordion>
      {props.suggestions
        .sort((a, b) => b.score - a.score)
        .map((company) => (
          <Accordion.Item key={company.key} eventKey={company.key}>
            <Accordion.Header>
              <h6>
                <Badge bg={getColor(company.score)}>{company.score}</Badge> {company.name}
              </h6>
            </Accordion.Header>
            <Accordion.Body>
              <Stack className="s-0" direction="horizontal" gap={3}>
                <img src={company.img} alt="random-pic" />
                <figure className="text-end">
                  <blockquote className="blockquote">
                    <p>{company.product}</p>
                  </blockquote>
                  {company.price && <figcaption>{company.price}</figcaption>}
                </figure>
              </Stack>
            </Accordion.Body>
          </Accordion.Item>
        ))}
    </Accordion>
  );
}
