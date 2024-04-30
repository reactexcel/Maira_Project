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
import {  Stack } from "@mui/material";
import Loading from "../../../components/Referesh/Loading";
import { instance } from "../../../axiosInstance/instance";

function Row(props) {
  const { row, setcheckLoading } = props;
  const [open, setOpen] = React.useState(false);
  const handleCheckboxChange = async (e, id, type) => {
    setcheckLoading(true);
    const checkedData = {
      [type]: e.target.checked,
    };
    try {
      await instance.put(`/api/data-quality/datalevel-check/${id}`, checkedData);
    } catch (error) {
      console.log(error);
    }
    setcheckLoading(false);
  };
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
          }}
        >
          {row?.headerName}
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
              <Table>
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
                      {row.headerName}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.columns?.map((e, i) => (
                    <TableRow
                      key={i}
                      sx={{
                        cursor: "pointer",
                        ":hover": {
                          bgcolor: "#EDEDED",
                        },
                      }}
                    >
                      <TableCell>{e.variableList}</TableCell>
                      <TableCell>{e.Definition}</TableCell>

                      <TableCell />
                      {e?.subColounms.map((e, i) => (
                        <>
                          <TableCell key={e?.id} sx={{ bgcolor: "#f17272" }}>
                            <Stack>
                              <Stack className="checkbox-wrapper-39">
                                <label>
                                  <input
                                    onChange={(event) =>
                                      handleCheckboxChange(
                                        event,
                                        e?.id,
                                        "doNotHave"
                                      )
                                    }
                                    checked={e?.doNotHave === 1}
                                    type="checkbox"
                                  />
                                  <span className="checkbox"></span>
                                </label>
                              </Stack>
                            </Stack>
                          </TableCell>
                          <TableCell sx={{ bgcolor: "#f3f39d" }}>
                            <Stack>
                              <Stack className="checkbox-wrapper-39">
                                <label>
                                  <input
                                    onChange={(event) =>
                                      handleCheckboxChange(
                                        event,
                                        e?.id,
                                        "needsImprovement"
                                      )
                                    }
                                    checked={e?.needsImprovement === 1}
                                    type="checkbox"
                                  />
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
                              <Stack className="checkbox-wrapper-39">
                                <label>
                                  <input
                                    onChange={(event) =>
                                      handleCheckboxChange(event, e?.id, "ready")
                                    }
                                    checked={e?.ready === 1}
                                    type="checkbox"
                                  />
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
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    headerName: PropTypes.string.isRequired,
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        variableList: PropTypes.string.isRequired,
        Definition: PropTypes.string.isRequired,
        subColounms: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired,
            doNotHave: PropTypes.number.isRequired,
            needsImprovement: PropTypes.number.isRequired,
            ready: PropTypes.number.isRequired,
          })
        ).isRequired,
      })
    ).isRequired,
  }).isRequired,
  setcheckLoading: PropTypes.func.isRequired,
};

export default function DataQualityTable() {
  const [fetchedData, setFetchedData] = React.useState(null);
  const [checkLoading, setcheckLoading] = React.useState(false);
  const [loading,setLoading]=React.useState(true)
  React.useEffect(() => {
    const data = async () => {
      setLoading(true)
      try {
        const response = await instance.get("/api/data-quality/variable-list");
        response.status === 200 && setFetchedData(response.data);
      } catch (error) {
        console.log(error);
      }finally{setLoading(false)}
    };
    data();
  }, [checkLoading]);
  if (checkLoading || loading) {
    return (
      <Loading/>
    );
  }
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
              width: "144px",
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
                      Validity assesses the extent to which inferences from the
                      data accurately represents the “real world” phenomenon
                      targeted by the measurement.
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
                      Variance is defined as the distance of a measure from the
                      mean of the total sample of measures
                    </Typography>
                  </TableCell>
                </>
              </TableRow>
              <TableRow sx={{ bgcolor: "#a7e5fbcc" }}>
                <TableCell />
                <TableCell
                  sx={{ fontWeight: 600 }}
                >
                  Variable List
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 600 }}
                >
                  Definition
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 600 }}
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
              {fetchedData?.data?.map((row) => (
                <Row
                  setcheckLoading={setcheckLoading}
                  key={row.hederName}
                  row={row}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Stack>
  );
}
