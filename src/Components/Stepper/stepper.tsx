import React, { useState } from "react";
import Container from "@mui/material/Container";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import UserInfo from "../UserInfo/userInfo";
import WorkDetails from "../WorkDetails/workDetails";
import CardDetails from "../CardDetails/cardDetails";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";


const getSteps = () => {
  return ["User Info", "Work Info", "Card Info"];
};

const MultiStepper: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [user, setUser] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [info, setInfo] = useState({ officeName: "", designation: "" });
  const [payment, setPayment] = useState({ name: "", card: "", cvc: "" });
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setUser({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setInfo({ officeName: "", designation: "" });
    setPayment({ name: "", card: "", cvc: "" });
    setActiveStep(0);
  };

  const getStepsContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <UserInfo
            user={user}
            setUser={setUser}
            handleNext={handleNext}
            handleBack={handleBack}
            activeStep={activeStep}
            steps={steps}
          />
        );
      case 1:
        return (
          <WorkDetails
            info={info}
            setInfo={setInfo}
            activeStep={activeStep}
            steps={steps}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
      case 2:
        return (
          <CardDetails
            payment={payment}
            setPayment={setPayment}
            activeStep={activeStep}
            steps={steps}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <>
      <Container>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div className="form">
          {activeStep === steps.length ? (
            <div className="reviewDetails">
              <h3>Personal Information</h3>
              <Paper className="reviewTile">
                <div style={{ width: "50%" }}>
                  <p className="reviewTile1">First Name:</p >
                  <p className="reviewTile1">Last Name:</p >
                  <p className="reviewTile1">Email:</p >
                  <p className="reviewTile1">Office Name:</p >
                  <p className="reviewTile1">Designation:</p >
                  <p className="reviewTile1">Card Name:</p >
                  <p className="reviewTile1">Card No:</p >
                  <p className="reviewTile1">CVC No:</p >
                </div>
                <div style={{ width: "50%" }}>
                  <p className="reviewTile2">{user.firstName}</p>
                  <p className="reviewTile2">{user.lastName}</p>
                  <p className="reviewTile2">{user.email}</p>
                  <p className="reviewTile2">{info.officeName}</p>
                  <p className="reviewTile2">{info.designation}</p>
                  <p className="reviewTile2">{payment.name}</p>
                  <p className="reviewTile2">{payment.card}</p>
                  <p className="reviewTile2">{payment.cvc}</p>
                </div>
              </Paper>
              <div className="formButtons">
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div>{getStepsContent(activeStep)}</div>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default MultiStepper;