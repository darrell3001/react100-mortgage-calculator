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
    console.log(this.state.loanBalance);
    console.log(Number(this.state.loanRate));
    console.log(this.state.loanTermInYears);

    // p *  ( (r * (1+r)^^n) / (((1 + r)^^n)  - 1) )
    var p = Number(this.state.loanBalance);
    var r = Number(this.state.loanRate) / 1200;
    var n = Number(this.state.loanTermInYears) * 12;

    console.log(p);
    console.log(r);
    console.log(n);

    var monthlyPayment =
      Math.round(
        ((p * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1)) * 100
      ) / 100;

    this.setState({
      monthlyPayment: monthlyPayment
    });

    console.log(monthlyPayment);
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

//#region This is working version 10/21
// import React, { Component } from "react";

// import {
//   Collapse,
//   Navbar,
//   NavbarToggler,
//   NavbarBrand,
//   Nav,
//   NavItem,
//   NavLink,
//   Container,
//   Row,
//   Col,
//   Jumbotron,
//   InputGroup,
//   ButtonToolbar,
//   Button
// } from "reactstrap";

// import FormControl from "react-bootstrap/FormControl";
// import FormGroup from "react-bootstrap/FormGroup";
// import FormLabel from "react-bootstrap/FormLabel";
// import Form from "react-bootstrap/Form";

// export default class SelectComponent extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       selectedColor: "",

//       colors: [
//         { value: "", label: "Please select a color" },
//         { value: "red", label: "Red" },
//         { value: "green", label: "Green" },
//         { value: "blue", label: "Blue" },
//         { value: "black", label: "Black" },
//         { value: "purple", label: "Purple" },
//         { value: "grey", label: "Grey" },
//         { value: "orange", label: "Orange" },
//         { value: "yellow", label: "Yellow" }
//       ]
//     };
//   }

//   onPickColor(e) {
//     console.log("[onPickColor]", e.target.value);

//     if (e.target.value != "") {
//       this.setState({
//         selectedColor: e.target.value
//       });
//     }
//   }

//   render() {
//     return (
//       <div className="container">
//         <div style={{ backgroundColor: this.state.selectedColor }}>
//           <FormGroup controlId="formControlsSelect">
//             <FormLabel>
//               {this.state.selectedColor == ""
//                 ? "Select"
//                 : this.state.selectedColor}
//             </FormLabel>
//             <FormControl
//               as="select"
//               value={this.state.selectedColor}
//               onChange={e => this.onPickColor(e)}
//             >
//               {this.state.colors.map(function(color) {
//                 return (
//                   <option key={color.value} value={color.value}>
//                     {color.label}
//                   </option>
//                 );
//               })}
//             </FormControl>
//           </FormGroup>
//         </div>
//       </div>
//     );
//   }
// }
//#endregion

//#region
// onSelect={() => this.onTargetSelect(dict[key])}
//#endregion

// #region
// import React, { Component } from "react";
// import {
//   Collapse,
//   Navbar,
//   NavbarToggler,
//   NavbarBrand,
//   Nav,
//   NavItem,
//   NavLink,
//   Container,
//   Row,
//   Col,
//   Jumbotron,
//   Button,
//   InputGroup
// } from "reactstrap";

// import FormControl from "react-bootstrap/FormControl";
// import Form from "react-bootstrap/Form";
// import { maxHeaderSize } from "http";

// export default class App extends React.Component {
//   // your Javascript goes here

//   constructor(props) {
//     super(props);
//     this.state = {
//       inputValue: ""
//     };
//   }

//   handleOnClick(e) {
//     e.preventDefault();
//     var inputValue = this.state.inputValue;
//     console.log("handleOnClick() - " + inputValue);
//   }

//   handleOnChange(e) {
//     console.log("handleOnChange()");
//     this.setState({
//       inputValue: e.target.value
//     });
//   }

//   // your Javascript goes here
//   render() {
//     console.log("render");
//     return (
//       <div className="container">
//         <input
//           value={this.state.inputValue}
//           onChange={e => this.handleOnChange(e)}
//         />
//         <Button onClick={e => this.handleOnClick(e)}>Save</Button>
//       </div>
//     );
//   }
// }
//#endregion

//#region Original
// constructor(props) {
//   super(props);
//   this.state = {
//     inputValue: ""
//   };
// }

// handleOnClick(e) {
//   e.preventDefault();
//   var inputValue = this.state.inputValue;
//   console.log("handleOnClick() - " + inputValue);
// }

// handleOnChange(e) {
//   console.log("handleOnChange()");
//   this.setState({
//     inputValue: e.target.value
//   });
// }

// // your Javascript goes here
// render() {
//   console.log("render");
//   return (
//     <div className="container">
//       <input
//         value={this.state.inputValue}
//         onChange={e => this.handleOnChange(e)}
//       />
//       <Button onClick={e => this.handleOnClick(e)}>Save</Button>

//     </div>
//     );
//   }
//#endregion

//#region forms

{
  /* <Form>
<Form.Group controlId="formBasicEmail">
  <Form.Label>Email address</Form.Label>
  <Form.Control type="email" placeholder="Enter email" />
  <Form.Text className="text-muted">
    We'll never share your email with anyone else.
  </Form.Text>
</Form.Group>

<Form.Group controlId="formBasicPassword">
  <Form.Label>Password</Form.Label>
  <Form.Control type="password" placeholder="Password" />
</Form.Group>
<Form.Group controlId="formBasicCheckbox">
  <Form.Check type="checkbox" label="Check me out" />
</Form.Group>
<Button variant="primary" type="submit">
  Submit
</Button>
</Form>

 */
}
//#endregion

//#region Form Controls

{
  /* <Form>
<Form.Group controlId="exampleForm.ControlInput1">
  <Form.Label>Email address</Form.Label>
  <Form.Control type="email" placeholder="name@example.com" />
</Form.Group>
<Form.Group controlId="exampleForm.ControlSelect1">
  <Form.Label>Example select</Form.Label>
  <Form.Control as="select">
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option>4</option>
    <option>5</option>
  </Form.Control>
</Form.Group>
<Form.Group controlId="exampleForm.ControlSelect2">
  <Form.Label>Example multiple select</Form.Label>
  <Form.Control as="select" multiple>
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option>4</option>
    <option>5</option>
  </Form.Control>
</Form.Group>
<Form.Group controlId="exampleForm.ControlTextarea1">
  <Form.Label>Example textarea</Form.Label>
  <Form.Control as="textarea" rows="3" />
</Form.Group>
</Form> */
}

//#endregion

//#region Form Size

{
  /* <Form.Control size="lg" type="text" placeholder="Large text" />
<br />
<Form.Control type="text" placeholder="Normal text" />
<br />
<Form.Control size="sm" type="text" placeholder="Small text" /> */
}

//#endregion

//#region Form Plaintext

{
  /* <Form>
<Form.Group as={Row} controlId="formPlaintextEmail">
  <Form.Label column sm="2">
    Email
  </Form.Label>
  <Col sm="10">
    <Form.Control
      plaintext
      readOnly
      defaultValue="email@example.com"
    />
  </Col>
</Form.Group>

<Form.Group as={Row} controlId="formPlaintextPassword">
  <Form.Label column sm="2">
    Password
  </Form.Label>
  <Col sm="10">
    <Form.Control type="password" placeholder="Password" />
  </Col>
</Form.Group>
</Form> */
}

//#endregion

//#region Radio/Combo stacked Buttons

{
  /* <Form>
{["checkbox", "radio"].map(type => (
  <div key={`default-${type}`} className="mb-3">
    <Form.Check
      type={type}
      id={`default-${type}`}
      label={`default ${type}`}
    />

    <Form.Check
      disabled
      type={type}
      label={`disabled ${type}`}
      id={`disabled-default-${type}`}
    />
  </div>
))}
</Form>
 */
}

//#endregion

//#region Radio/Combo boxes inline

{
  /* <Form>
{["checkbox", "radio"].map(type => (
  <div key={`inline-${type}`} className="mb-3">
    <Form.Check
      inline
      label="1"
      type={type}
      id={`inline-${type}-1`}
    />
    <Form.Check
      inline
      label="2"
      type={type}
      id={`inline-${type}-2`}
    />
    <Form.Check
      inline
      disabled
      label="3 (disabled)"
      type={type}
      id={`inline-${type}-3`}
    />
  </div>
))}
</Form> */
}

//#endregion

//#region no labels

{
  /* <Form.Check aria-label="option 1" />
<Form.Check type="radio" aria-label="radio 1" /> */
}

//#endregion

//#region Customized rendering

{
  /* <Form>
{["checkbox", "radio"].map(type => (
  <div key={type} className="mb-3">
    <Form.Check type={type} id={`check-api-${type}`}>
      <Form.Check.Input type={type} isValid />
      <Form.Check.Label>{`Custom api ${type}`}</Form.Check.Label>
      <Form.Control.Feedback type="valid">
        You did it!
      </Form.Control.Feedback>
    </Form.Check>
  </div>
))}
</Form> */
}

//#endregion

//#region FormGroup

{
  /* <Form>
<Form.Group controlId="formGroupEmail">
  <Form.Label>Email address</Form.Label>
  <Form.Control type="email" placeholder="Enter email" />
</Form.Group>
<Form.Group controlId="formGroupPassword">
  <Form.Label>Password</Form.Label>
  <Form.Control type="password" placeholder="Password" />
</Form.Group>
</Form> */
}

//#endregion

//#region Form Grid

{
  /* <Form>
<Row>
  <Col>
    <Form.Control placeholder="First name" />
  </Col>
  <Col>
    <Form.Control placeholder="Last name" />
  </Col>
</Row>
</Form>
 */
}

//#endregion

//#region Form Row

{
  /* <Form>
<Form.Row>
  <Col>
    <Form.Control placeholder="First name" />
  </Col>
  <Col>
    <Form.Control placeholder="Last name" />
  </Col>
</Form.Row>
</Form> */
}

//#endregion

//#region Form Grid

// <Form>
// <Form.Row>
//   <Form.Group as={Col} controlId="formGridEmail">
//     <Form.Label>Email</Form.Label>
//     <Form.Control type="email" placeholder="Enter email" />
//   </Form.Group>

//   <Form.Group as={Col} controlId="formGridPassword">
//     <Form.Label>Password</Form.Label>
//     <Form.Control type="password" placeholder="Password" />
//   </Form.Group>
// </Form.Row>

// <Form.Group controlId="formGridAddress1">
//   <Form.Label>Address</Form.Label>
//   <Form.Control placeholder="1234 Main St" />
// </Form.Group>

// <Form.Group controlId="formGridAddress2">
//   <Form.Label>Address 2</Form.Label>
//   <Form.Control placeholder="Apartment, studio, or floor" />
// </Form.Group>

// <Form.Row>
//   <Form.Group as={Col} controlId="formGridCity">
//     <Form.Label>City</Form.Label>
//     <Form.Control />
//   </Form.Group>

//   <Form.Group as={Col} controlId="formGridState">
//     <Form.Label>State</Form.Label>
//     <Form.Control as="select">
//       <option>Choose...</option>
//       <option>...</option>
//     </Form.Control>
//   </Form.Group>

//   <Form.Group as={Col} controlId="formGridZip">
//     <Form.Label>Zip</Form.Label>
//     <Form.Control />
//   </Form.Group>
// </Form.Row>

// <Form.Group id="formGridCheckbox">
//   <Form.Check type="checkbox" label="Check me out" />
// </Form.Group>

// <Button variant="primary" type="submit">
//   Submit
// </Button>
// </Form>

//#endregion

//#region Form Horizontal

{
  /* <Form>
<Form.Group as={Row} controlId="formHorizontalEmail">
  <Form.Label column sm={2}>
    Email
  </Form.Label>
  <Col sm={10}>
    <Form.Control type="email" placeholder="Email" />
  </Col>
</Form.Group>

<Form.Group as={Row} controlId="formHorizontalPassword">
  <Form.Label column sm={2}>
    Password
  </Form.Label>
  <Col sm={10}>
    <Form.Control type="password" placeholder="Password" />
  </Col>
</Form.Group>
<fieldset>
  <Form.Group as={Row}>
    <Form.Label as="legend" column sm={2}>
      Radios
    </Form.Label>
    <Col sm={10}>
      <Form.Check
        type="radio"
        label="first radio"
        name="formHorizontalRadios"
        id="formHorizontalRadios1"
      />
      <Form.Check
        type="radio"
        label="second radio"
        name="formHorizontalRadios"
        id="formHorizontalRadios2"
      />
      <Form.Check
        type="radio"
        label="third radio"
        name="formHorizontalRadios"
        id="formHorizontalRadios3"
      />
    </Col>
  </Form.Group>
</fieldset>
<Form.Group as={Row} controlId="formHorizontalCheck">
  <Col sm={{ span: 10, offset: 2 }}>
    <Form.Check label="Remember me" />
  </Col>
</Form.Group>

<Form.Group as={Row}>
  <Col sm={{ span: 10, offset: 2 }}>
    <Button type="submit">Sign in</Button>
  </Col>
</Form.Group>
</Form> */
}

//#endregion

//#region

// export default class App extends React.Component {
//   // your Javascript goes here

//   FormExample() {
//     const [validated, setValidated] = useState(false);

//     const handleSubmit = event => {
//       const form = event.currentTarget;
//       if (form.checkValidity() === false) {
//         event.preventDefault();
//         event.stopPropagation();
//       }

//       setValidated(true);
//     };

//   render() {
//     console.log("render");
//     return (
//       <div className="container">

//       </div>
//     );
//   }
// }

//#endregion

//#region

// export default class App extends React.Component {
//   FormExample() {
//     const [validated, setValidated] = useState(false);

//     const handleSubmit = event => {
//       const form = event.currentTarget;
//       if (form.checkValidity() === false) {
//         event.preventDefault();
//         event.stopPropagation();
//       }

//       setValidated(true);
//     };

//     return (
//       <Form noValidate validated={validated} onSubmit={handleSubmit}>
//         <Form.Row>
//           <Form.Group as={Col} md="4" controlId="validationCustom01">
//             <Form.Label>First name</Form.Label>
//             <Form.Control
//               required
//               type="text"
//               placeholder="First name"
//               defaultValue="Mark"
//             />
//             <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//           </Form.Group>
//           <Form.Group as={Col} md="4" controlId="validationCustom02">
//             <Form.Label>Last name</Form.Label>
//             <Form.Control
//               required
//               type="text"
//               placeholder="Last name"
//               defaultValue="Otto"
//             />
//             <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//           </Form.Group>
//           <Form.Group as={Col} md="4" controlId="validationCustomUsername">
//             <Form.Label>Username</Form.Label>
//             <InputGroup>
//               <InputGroup.Prepend>
//                 <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
//               </InputGroup.Prepend>
//               <Form.Control
//                 type="text"
//                 placeholder="Username"
//                 aria-describedby="inputGroupPrepend"
//                 required
//               />
//               <Form.Control.Feedback type="invalid">
//                 Please choose a username.
//               </Form.Control.Feedback>
//             </InputGroup>
//           </Form.Group>
//         </Form.Row>
//         <Form.Row>
//           <Form.Group as={Col} md="6" controlId="validationCustom03">
//             <Form.Label>City</Form.Label>
//             <Form.Control type="text" placeholder="City" required />
//             <Form.Control.Feedback type="invalid">
//               Please provide a valid city.
//             </Form.Control.Feedback>
//           </Form.Group>
//           <Form.Group as={Col} md="3" controlId="validationCustom04">
//             <Form.Label>State</Form.Label>
//             <Form.Control type="text" placeholder="State" required />
//             <Form.Control.Feedback type="invalid">
//               Please provide a valid state.
//             </Form.Control.Feedback>
//           </Form.Group>
//           <Form.Group as={Col} md="3" controlId="validationCustom05">
//             <Form.Label>Zip</Form.Label>
//             <Form.Control type="text" placeholder="Zip" required />
//             <Form.Control.Feedback type="invalid">
//               Please provide a valid zip.
//             </Form.Control.Feedback>
//           </Form.Group>
//         </Form.Row>
//         <Form.Group>
//           <Form.Check
//             required
//             label="Agree to terms and conditions"
//             feedback="You must agree before submitting."
//           />
//         </Form.Group>
//         <Button type="submit">Submit form</Button>
//       </Form>
//     );
//   }
// }

//#endregion
