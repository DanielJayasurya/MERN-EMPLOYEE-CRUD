import { Grid, Typography } from '@mui/material'
import React from 'react'

const Footer = ({title}) => {
  return (
    <Grid sx={{height:"1.5rem",width:"100%",backgroundColor:"#2F70CB",color:'#fff',position:"fixed",bottom:0}}>
        <Typography style={{fontFamily:"poppins",fontSize:"15px",textAlign:"center"}}>{title}</Typography>
    </Grid>
  )
}

export default Footer