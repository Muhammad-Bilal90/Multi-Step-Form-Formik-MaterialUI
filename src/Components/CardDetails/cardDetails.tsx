import React from 'react'
import {TextField, Button} from '@mui/material';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface InitialValue {
    name: string;
    card: string;
    cvc: string;
}

interface Props {
    activeStep: number;
    steps: string[];
    payment: InitialValue;
    handleNext: () => void;
    handleBack: () => void;
    setPayment: (InitialValue: InitialValue) => void;
}


const CardDetails: React.FC<Props> = ({ activeStep, steps, payment, handleNext, handleBack, setPayment }) => {
  
  const initialValues: InitialValue = payment;
  
  const validationSchema = Yup.object().shape({
      name: Yup.string()
          .required('Required'),
      card: Yup.string()
          .matches(/^[0-9]+$/, 'Card No Field requires digits only!')
          .min(11, 'Card No Field requires minimum 11 digits!')
          .max(14, 'Card No Field requires maximum 14 digits!')
          .required('Card No Field is Required'),
      cvc: Yup.string()
          .matches(/^[0-9]+$/, 'CVC Field requires digits only!')
          .min(5, "CVC Field requires minimum 5 digits!")
          .max(6, "CVC Field requires maximum 6 digits!")
          .required('CVC Field is Required!'),
  });

    return (
        <>
            <Formik 
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log(values);
                    setPayment(values);
                    handleNext();
                }}
            >
                {formik => (
                    <Form className='form' autoComplete="off">
                        <Field error={formik.errors.name && formik.touched.name} className="formFields" name="name" type="text" as={TextField} label="Name" variant="standard" helperText={<ErrorMessage name="name" />} />
                        <Field error={formik.errors.card && formik.touched.card} className="formFields" name="card" type="text" as={TextField} label="Card Number" variant="standard" helperText={<ErrorMessage name="card" />} />
                        <Field error={formik.errors.cvc && formik.touched.cvc} className="formFields" name="cvc" type="text" as={TextField} label="CVC" variant="standard" helperText={<ErrorMessage name="cvc" />} />
                        <div className='formButtons'>
                            <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
                            <Button variant='contained' color='primary' type='submit'>
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </div>  
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default CardDetails;