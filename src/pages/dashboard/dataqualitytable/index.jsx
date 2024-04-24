// import React from "react";
// import CardComponent from "../../../components/card";

// const DataQualityTable = () => {
//   return <CardComponent text={"Data Quality"} />;
// };

// export default DataQualityTable;

import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CardComponent from "../../../components/card";
import { Stack } from "@mui/material";
import { instance } from "../../../axiosInstance/instance";
import axios from "axios";

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        data1:
          "Adequate coverage measures the extent to which key safety indicators are adequately covered within the data.",
        data2:
          "The organization has data pertaining to less than a third of the Measurement Framework and Variable Matrix",
        data3:
          "The organization has data pertaining to more than half of the Measurement Framework and Variable Matrix identified variables",
        data4:
          "The organization has data pertaining to all of the Measurement Framework and Variable Matrix identified variables",
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow
        onClick={() => setOpen(!open)}
        sx={{
          "& > *": { borderBottom: "unset" },
          ":hover": {
            bgcolor: "#EDEDED",
            cursor: "pointer",
          },
        }}
      >
        <TableCell>
          <IconButton aria-label="expand row">
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell
          colSpan={12}
          sx={{
            fontWeight: 600,
            fontSize: "calc(5px + 1vmin)",
          }}
        >
          {row.name}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={"100%"}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                my: 1,
                borderRadius: "25px",
                boxShadow:
                  "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;",
              }}
            >
              {[1].map((e, i) => (
                <Table key={i}>
                  <TableHead>
                    <TableRow
                      sx={{
                        background: "linear-gradient(to right, pink,lightblue)",
                      }}
                    >
                      <TableCell
                        align="center"
                        colSpan={13}
                        sx={{ fontWeight: 600, fontSize: "calc(6px + 1vmin)" }}
                      >
                        Production
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[1, 2, 3].map((historyRow) => (
                      <TableRow
                        key={historyRow.data1}
                        sx={{
                          cursor: "pointer",
                          ":hover": {
                            bgcolor: "#EDEDED",
                          },
                        }}
                      >
                        {/* <TableCell /> */}
                        <TableCell>Volume Trends</TableCell>
                        <TableCell>keep track of output</TableCell>
                        <TableCell>helo</TableCell>
                        {[1, 2, 3].map((e, i) => (
                          <>
                            <TableCell sx={{ bgcolor: "#f17272" }}>
                              <Stack>
                                <Stack class="checkbox-wrapper-39">
                                  <label>
                                    <input type="checkbox" />
                                    <span className="checkbox"></span>
                                  </label>
                                </Stack>
                              </Stack>
                            </TableCell>
                            <TableCell sx={{ bgcolor: "#f3f39d" }}>
                              <Stack>
                                <Stack class="checkbox-wrapper-39">
                                  <label>
                                    <input type="checkbox" />
                                    <span className="checkbox"></span>
                                  </label>
                                </Stack>
                              </Stack>
                            </TableCell>
                            <TableCell
                              sx={{
                                bgcolor: "#9bebbb",
                                borderRight: i !== 2 && "5px solid white",
                              }}
                            >
                              <Stack>
                                <Stack class="checkbox-wrapper-39">
                                  <label>
                                    <input type="checkbox" />
                                    <span className="checkbox"></span>
                                  </label>
                                </Stack>
                              </Stack>{" "}
                            </TableCell>
                          </>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ))}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData("Production"),
  createData("Maintenance"),
  createData("Procedures"),
  createData("Human Resources"),
  createData("Safety Metrics"),
];

export default function DataQualityTable() {
  const [fetchedData, setFetchedData] = React.useState(null);
  React.useEffect(() => {
    const data = async () => {
      try {
        const response = await axios.get("/api/data-quality/overview");
        response.status===200 && setFetchedData(response.data)
      } catch (error) {
        console.log(error);
      }
    };
    data();
  }, []);
  console.log(fetchedData);
  return (
    <Stack spacing={2}>
      <CardComponent text={"Data Quality"} />
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
          High-quality data are foundational for analyzing and using big data to
          realize value{" "}
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            "& .MuiTableCell-root": {
              width: '144px',
            },
            borderRadius: "20px",
            my: 2,
            boxShadow:
              "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;",
            background: " linear-gradient(to bottom, pink,lightblue)",
            pl: "8px",
          }}
        >
          <Table aria-label="collapsible table" sx={{ bgcolor: "white" }}>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell colSpan={3}>
                  <img src="/images/image (2).png" alt="image" width={"50%"} />
                </TableCell>

                {[1].map((e, i) => (
                  <>
                    <TableCell
                      sx={{
                        borderRight: "5px solid white",
                        boxShadow:
                          "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;",
                      }}
                      colSpan={3}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: "white",
                          fontWeight: 600,
                          bgcolor: "#7c4aa3",
                          textAlign: "center",
                        }}
                      >
                        Validity
                      </Typography>
                      <Typography variant="body2">
                        Validity assesses the extent to which inferences from
                        the data accurately represents the “real world”
                        phenomenon targeted by the measurement.
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "5px solid white",
                        boxShadow:
                          "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;",
                      }}
                      colSpan={3}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: "white",
                          fontWeight: 600,
                          bgcolor: "#20388b",
                          textAlign: "center",
                        }}
                      >
                        Consistency
                      </Typography>

                      <Typography variant="body2">
                        Consistency refers to the absence of a difference, when
                        comparing two or more variables against a definition.
                      </Typography>
                    </TableCell>
                    <TableCell
                      colSpan={3}
                      sx={{
                        boxShadow:
                          "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: "white",
                          fontWeight: 600,
                          bgcolor: "#0a3b06",
                          textAlign: "center",
                        }}
                      >
                        Variability
                      </Typography>
                      <Typography variant="body2">
                        Variance is defined as the distance of a measure from
                        the mean of the total sample of measures
                      </Typography>
                    </TableCell>
                  </>
                ))}
              </TableRow>
              <TableRow  sx={{ bgcolor: "#a7e5fbcc" }}>
                <TableCell />
                <TableCell
                  sx={{ fontWeight: 600, fontSize: "calc(6px + 1vmin)" }}
                >
                  Variable List
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 600, fontSize: "calc(6px + 1vmin)" }}
                >
                  Definition
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 600, fontSize: "calc(6px + 1vmin)" }}
                >
                  Org Metrics
                </TableCell>
                {[1, 2, 3].map((e, i) => (
                  <>
                    <TableCell sx={{ bgcolor: "#f17272" }}>
                      <Typography
                        variant="body2"
                        sx={{ color: "#971a1a", fontWeight: 600 }}
                      >
                        Do Not Have
                      </Typography>
                      <Typography variant="body2">
                        errors are found (e.g. missing values or impossible
                        values, like negative hours worked)
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ bgcolor: "#f3f39d" }}>
                      <Typography
                        variant="body2"
                        sx={{ color: "rgb(89 95 6 / 87%)", fontWeight: 600 }}
                      >
                        Needs Improvement
                      </Typography>

                      <Typography variant="body2">
                        errors are found (e.g. missing values or impossible
                        values, like negative hours worked)
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        bgcolor: "#9bebbb",
                        borderRight: i !== 2 && "5px solid white",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ color: "rgb(18 55 0 / 87%)", fontWeight: 600 }}
                      >
                        Ready
                      </Typography>
                      <Typography variant="body2">
                        errors are found (e.g. missing values or impossible
                        values, like negative hours worked)
                      </Typography>
                    </TableCell>
                  </>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.name} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Stack>
  );
}
