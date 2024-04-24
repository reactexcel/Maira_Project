import { Card, Typography } from '@mui/material'
import React from 'react'

const CardComponent = ({text}) => {
  return (
    <Card
    sx={{
      padding: "10px 20px",
      borderRadius: "20px",
      boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
    }}
  >
    <Typography
      variant="subtitle1"
      fontSize={24}
      sx={{
        fontWeight: 600,
      }}
    >
      {text}
    </Typography>
  </Card>
  )
}

export default CardComponent
