import React from 'react'
import { Step, StepLabel, Stepper, Typography } from '@mui/material'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import DoneAllIcon from '@mui/icons-material/DoneAll';

const steps = [
    {
        label: <Typography>Shipping Details</Typography>,
        icon: <LocalShippingIcon />
    },
    {
        label: <Typography>Confirm Orderr</Typography>,
        icon: <LibraryAddCheckIcon />
    },
    {
        label: <Typography>Success</Typography>,
        icon: <DoneAllIcon />
    },
]

const CheckActiveStep = ({activeStep}) => {
  return (
    <>
        <Stepper alternativeLabel activeStep={activeStep} style={{boxSizing: 'border-box'}}>
        {steps.map((item, index) => (
            <Step 
                key={index} 
                active={activeStep === index ? true : false}
                completed={activeStep >= index ? true : false}
            >
                <StepLabel 
                    icon={item.icon}
                    style={{
                        color: activeStep >= index ? '#ed3b02' : 'rgba(0, 0, 0, 0.364)'
                    }}
                >{item.label}</StepLabel>
            </Step>
        ))}
        </Stepper>
    </>
  )
}

export default CheckActiveStep