import React from 'react';
import '../../App.css'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { Button, TextField } from '@mui/material';

interface InitialValues {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
}

interface Props {
	activeStep: number,
	steps: string[],
  user: InitialValues,
	handleNext: () => void,
	handleBack: () => void,
	setUser: (initialvalues: InitialValues) => void,
}


const UserInfo: React.FC<Props> = ({ activeStep, steps, user, handleNext, handleBack, setUser  }) => {

    const initialVales: InitialValues = user;

    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name field is Required!'),
        lastName: Yup.string()
            .required('Last Name field is Required!'),
        email: Yup.string()
            .required('email field is Required!'),
        password: Yup.string()
            // eslint-disable-next-line
            .matches(/^.*[A-Z].*$/, 'Password requires at least One Upper Case!')
            // eslint-disable-next-line
            .matches(/^.*[!@#$%^&*()_+\-=/[\]{};':"\\|,.<>\/?].*$/, 'Password requires at least One Special Character!')
            .matches(/^.*[0-9].*$/, 'Password requires at least One digit!')
            .min(10, 'Password requires at least 10 characters!')
            .required('Password Field is Required!'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Password must match as given above!')
            .required('Confirm Password Field is Required!')
    });


    return(
        <>
            <Formik
                initialValues={initialVales}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log(values);
                    setUser(values);
                    handleNext();
                }}
            >
                {formik => (
                    <Form className='form' autoComplete="off">
                        <Field error={formik.errors.firstName && formik.touched.firstName} className="formFields" name="firstName" type="text" as={TextField} label="First Name" variant="standard" helperText={<ErrorMessage name="firstName"/>} />
                        <Field error={formik.errors.lastName && formik.touched.lastName} className="formFields" name="lastName" type="text" as={TextField} label="Last Name" variant="standard" helperText={<ErrorMessage name="lastName"/>} />
                        <Field error={formik.errors.email && formik.touched.email} className="formFields" name="email" type="email" as={TextField} label="email" variant="standard" helperText={<ErrorMessage name="email"/>} />
                        <Field error={formik.errors.password && formik.touched.password} className="formFields" name="password" type="password" as={TextField} label="Password" variant="standard" helperText={<ErrorMessage name="password"/>} />
                        <Field error={formik.errors.confirmPassword && formik.touched.confirmPassword} className="formFields" name="confirmPassword" type="password" as={TextField} label="Confirm Password" variant="standard" helperText={<ErrorMessage name="confirmPassword"/>} />
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

export default UserInfo;