import { Button } from '@mui/material'
import React from 'react'

const ButtonComponent = ({text, styles,onClick }) => {
  return (
    <Button
    onClick={onClick}
    type="submit"
      variant="contained"
      sx={{...styles,
        bgcolor: "#417BF9", width: "50%",
        ":hover": {
          opacity:"0.8",
          borderRadius: "25px",
          transition: "0.6s",
          bgcolor:"#E89454"
        },
      }}
    >
      {text}
    </Button>
  )
}

export default ButtonComponent
