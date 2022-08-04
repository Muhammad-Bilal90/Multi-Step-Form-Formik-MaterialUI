import React from "react";
import {
  TextField,
  MenuItem,
  Select,
  Button,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

interface InitialValue {
  officeName: string;
  designation: string;
}

interface Props {
  activeStep: number;
  steps: string[];
  info: InitialValue;
  handleNext: () => void;
  handleBack: () => void;
  setInfo: (InitialValue: InitialValue) => void;
}

const WorkDetails: React.FC<Props> = ({
  activeStep,
  steps,
  info,
  handleNext,
  handleBack,
  setInfo,
}) => {
  const initialValues: InitialValue = info;

  const validationSchema = Yup.object().shape({
    officeName: Yup.string().required("Office Name Field is Required!"),
    designation: Yup.string().required("Designation Field is Required!"),
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          setInfo(values);
          handleNext();
        }}
      >
        {(formik) => (
          <Form className="form" autoComplete="off">
            <Field
              error={formik.errors.officeName && formik.touched.officeName}
              className="formFields"
              name="officeName"
              type="text"
              as={TextField}
              label="Office Name"
              variant="standard"
              helperText={<ErrorMessage name="officeName" />}
            />
            <FormControl variant="standard">
              <InputLabel id="demo-simple-select-standard-label">
                Designation
              </InputLabel>
              {/* {formik.errors.designation && formik.touched.designation ? (<div>{formik.errors.designation}</div>) : null} */}
              <Field
                error={formik.errors.designation && formik.touched.designation}
                className="formFields"
                name="designation"
                as={Select}
                label="Designation"
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                helpertext={<ErrorMessage name="designation" />}
              >
                <MenuItem disabled value="">
                  <span>None</span>
                </MenuItem>
                <MenuItem value={"Developer"}>Developer</MenuItem>
                <MenuItem value={"Designer"}>Designer</MenuItem>
                <MenuItem value={"Client"}>Client</MenuItem>
              </Field>
              {/* <FormHelperText>{(formik.errors.designation && formik.touched.designation) && formik.errors.designation}</FormHelperText> */}
            </FormControl>
            <div className="formButtons">
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Button variant="contained" color="primary" type="submit">
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default WorkDetails;
