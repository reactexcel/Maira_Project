import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  ReportTableBodyStaticData,
  ReportTableHeadStaticData,
} from "../../../utiles/staticdata";
import { Box, Card, Chip, Grid, Stack, Typography } from "@mui/material";
import CardComponent from "../../../components/card";

const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow("Paperclips (Box)", 100, 1.15),
  createRow("Paper (Case)", 10, 45.99),
  createRow("Waste Basket", 2, 17.99),
];

const scoreToText = (value) => {
  if (value === 1) {
    return "Do Not Have";
  } else if (value === 2) {
    return "Needs Improvement";
  } else if (value === 3) {
    return "Ready";
  }
};

const colorCode = (value) => {
  if (value === 1) {
    return "#f17272";
  } else if (value === 2) {
    return "#f3f39d";
  } else if (value === 3) {
    return "#9bebbb";
  }
};

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default function ReportTable() {
  return (
    <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
      <CardComponent text={"Report"}/>
      <Box
        sx={{
          p: 2,
          bgcolor: "#fff",
          borderRadius: "25px",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ fontSize: "22px", fontWeight: 600 }}
        >
          Necessary Levels of Readiness for the Types of Analytics
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: "20px",
            my: 2,
            boxShadow:
              "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;",
              background:" linear-gradient(to bottom, pink,lightblue)",
            pl:"8px"
          }}
        >
          <Table sx={{ minWidth: 700,bgcolor:"white" }} aria-label="spanning table">
            <TableHead>
              <TableRow sx={{ bgcolor: "#a7e5fbcc" }}>
                <TableCell></TableCell>
                {ReportTableHeadStaticData.map((e, i) => (
                  <TableCell
                    key={i}
                    align="center"
                    sx={{ fontWeight: 600, fontSize: "calc(6px + 1vmin)",bgcolor:i===4 && "#4173F8" }}
                  >
                    {e}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {ReportTableBodyStaticData.map((row, i) => (
                <TableRow
                  key={row.data}
                  sx={{
                    ":hover": {
                      bgcolor: "#EDEDED",
                    },
                  }}
                >
                  <TableCell
                    sx={{ fontWeight: 600, fontSize: "calc(6px + 1vmin)" }}
                  >
                    {row.data}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      borderRight: "1px solid white",
                      bgcolor: colorCode(row.v1),
                      fontSize: "calc(6px + 1vmin)",
                    }}
                  >
                    {scoreToText(row.v1)}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      borderRight: "1px solid white",
                      bgcolor: colorCode(row.v2),
                      fontSize: "calc(6px + 1vmin)",
                    }}
                  >
                    {scoreToText(row.v2)}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      borderRight: "1px solid white",
                      bgcolor: colorCode(row.v3),
                      fontSize: "calc(6px + 1vmin)",
                    }}
                  >
                    {scoreToText(row.v3)}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      borderRight: "1px solid white",
                      bgcolor: colorCode(row.v4),
                      fontSize: "calc(6px + 1vmin)",
                    }}
                  >
                    {scoreToText(row.v4)}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      bgcolor: colorCode(row.r),
                      fontSize: "calc(6px + 1vmin)",
                    }}
                  >
                    {scoreToText(row.r)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Card
        sx={{
          p: 2,
          borderRadius: "25px",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
          
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ fontSize: "22px", fontWeight: 600, pb: 2 }}
        >
          How ready are you to engage in these levels of analytics
        </Typography>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {ReportTableHeadStaticData.map((e, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              {index !== ReportTableHeadStaticData.length - 1 && (
                <Stack
                  direction={"row"}
                  sx={{
                    justifyContent: "space-between",
                    alignItems:"center",
                    p: 2,
                    borderRadius: "20px",
                    boxShadow:
                      "rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px;",
                    //boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;"
                  }}
                >
                  <Typography variant="inherit" sx={{ fontSize: "18px" }}>
                    {e}
                  </Typography>
                  <Chip
                    sx={{
                      bgcolor: "#DACAD7",
                      fontSize:"15px"
                    }}
                    label="85%"
                  />
                </Stack>
              )}
            </Grid>
          ))}
        </Grid>
      </Card>
    </Box>
  );
}
