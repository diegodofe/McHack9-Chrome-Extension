import React from "react";
import companies from "../companies";

import "bootstrap/dist/css/bootstrap.min.css";
import { Accordion, Badge, Stack } from "react-bootstrap";

export default function Accordions() {
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
      {companies
        .sort((a, b) => b.score - a.score)
        .map((company) => (
          <Accordion.Item key={company.key} eventKey={company.key}>
            <Accordion.Header>
              <h6>
                {company.name} <Badge bg={getColor(company.score)}>{company.score}</Badge>
              </h6>
            </Accordion.Header>
            <Accordion.Body>
              <Stack className="s-0" direction="horizontal" gap={3}>
                <img src={company.img} alt="random-pic" />
                <figure class="text-end">
                  <blockquote class="blockquote">
                    <p>{company.product}</p>
                  </blockquote>
                  <figcaption>{company.price}</figcaption>
                </figure>
              </Stack>
            </Accordion.Body>
          </Accordion.Item>
        ))}
    </Accordion>
  );
}
