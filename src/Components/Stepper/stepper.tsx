import * as React from 'react';
import Container from '@mui/material/Container';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import UserInfo from '../UserInfo/userInfo';
import Security from '../WorkDetails/workDetails';
import Card from '../CardDetails/cardDetails';
import { TableBody, TableCell, TableContainer, TableRow, Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';

const getSteps = () => {
    return ['User Info', 'Work Info', 'Card Info'];
}

const MultiStepper: React.FC = () => {

  const [activeStep, setActiveStep] = React.useState(0);
  const [user, setUser] = React.useState({firstName: "", lastName: "", email: "", password: "", confirmPassword: ""})
  const [info, setInfo] = React.useState({officeName: "", designation: ""});
  const [payment, setPayment] = React.useState({name: "", card: "", cvc: ""});
  const steps = getSteps();

  const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  
  const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  }


  const getStepsContent = (step: number) => {
    switch(step){
      case 0:
        return <UserInfo user={user} setUser={setUser} handleNext={handleNext} handleBack={handleBack} activeStep={activeStep} steps={steps}/>;
      case 1:
        return <Security info={info} setInfo={setInfo} activeStep={activeStep} steps={steps} handleNext={handleNext} handleBack={handleBack} />;
      case 2:
        return <Card payment={payment} setPayment={setPayment} activeStep={activeStep} steps={steps} handleNext={handleNext} handleBack={handleBack} />;
      default:
        return 'Unknown step';
    }
  }
  
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
        <div>
          {activeStep === steps.length ? (
            <div>
              <h3>Personal Information</h3>
              <TableContainer component={Paper} style={{ margin: "20px"}}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell align="right"> <b>First Name:</b></TableCell>
                    <TableCell>{user.firstName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right"><b>Last Name:</b></TableCell>
                    <TableCell>{user.lastName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right"><b>Email:</b></TableCell>
                    <TableCell>{user.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right"><b>Contact No:</b></TableCell>
                    <TableCell>{info.officeName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right"><b>Designation:</b></TableCell>
                    <TableCell>{info.designation}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right"><b>Card Name:</b></TableCell>
                    <TableCell>{payment.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right"><b>Card No:</b></TableCell>
                    <TableCell>{payment.card}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right"><b>CVC No:</b></TableCell>
                    <TableCell>{payment.cvc}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              </TableContainer>
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                  <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
                  <Button variant='contained' color='primary' onClick={handleReset}>
                      Reset
                  </Button>
              </div> 
            </div>
          ) : (
                <div>
                  <div>{getStepsContent(activeStep)}</div>
                </div>
              )
          }
        </div>
      </Container>
    </>
  );
}

export default MultiStepper;