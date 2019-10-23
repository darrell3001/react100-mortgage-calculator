import React, { Component } from "react";

import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";

import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import InputGroup from "react-bootstrap/InputGroup";

export default class SelectComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loanBalance: "",
      loanRate: "1",
      loanTermInYears: "30",
      monthlyPayment: "",

      validLoanTerms: [
        { value: "15", label: "15" },
        { value: "30", label: "30" }
      ]
    };
  }

  onChangeLoanBalance(e) {
    console.log("onChangeLoanBalnce()");
    this.setState({
      loanBalance: e.target.value
    });
  }

  onChangeLoanRate(e) {
    console.log("onChangeRate()");
    this.setState({
      loanRate: e.target.value
    });
  }

  onChangeLoanTerm(e) {
    console.log("onChangeLoanTerm", e.target.value);
    this.setState({
      loanTermInYears: e.target.value
    });
  }

  onClickCalculateButton(e) {
    // e.preventDefault();
    console.log("onClickCalculateButton()");

    // p *  ( (r * (1+r)^^n) / (((1 + r)^^n)  - 1) )
    var p = Number(this.state.loanBalance);
    var r = Number(this.state.loanRate) / 1200;
    var n = Number(this.state.loanTermInYears) * 12;

    var monthlyPayment = (
      (p * (r * Math.pow(1 + r, n))) /
      (Math.pow(1 + r, n) - 1)
    ).toFixed(2);

    this.setState({
      monthlyPayment: monthlyPayment
    });
  }

  render() {
    return (
      <div className="container">
        <Form>
          <h3>Mortgage Calculator</h3>

          <Form.Group as={Row} controlId="formHorizontalLoanBalance">
            <Form.Label column sm={2}>
              Loan Balance
            </Form.Label>

            <Col sm={3}>
              <Form.Control
                name="balance"
                type="number"
                min="0"
                value={this.state.loanBalance}
                onChange={e => this.onChangeLoanBalance(e)}
              ></Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalLoanRate">
            <Form.Label column sm={2}>
              Interest Rate (%)
            </Form.Label>

            <Col sm={3}>
              <Form.Control
                name="rate"
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={this.state.loanRate}
                onChange={e => this.onChangeLoanRate(e)}
              ></Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalLoanTerm">
            <Form.Label column sm={2}>
              Loan Term (years)
            </Form.Label>

            <Col sm={3}>
              <FormControl
                name="term"
                as="select"
                value={this.state.loanTermInYears}
                onChange={e => this.onChangeLoanTerm(e)}
              >
                {this.state.validLoanTerms.map(function(term) {
                  return (
                    <option key={term.value} value={term.value}>
                      {term.label}
                    </option>
                  );
                })}
              </FormControl>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalButtonToolbar">
            <Col sm={{ span: 10, offset: 2 }}>
              <ButtonToolbar>
                <Button
                  name="submit"
                  variant="primary"
                  onClick={e => this.onClickCalculateButton(e)}
                >
                  Calculate
                </Button>
              </ButtonToolbar>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formOutput">
            <div id="output" name="output">
              {this.state.monthlyPayment}
            </div>
          </Form.Group>
        </Form>
      </div>
    );
  }
}
