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
import { CircularProgress, Stack } from "@mui/material";
import { instance } from "../../../axiosInstance/instance";
import LineChartComp from "../../../components/Chart/LineChartComp";
import axios from "axios";

function Row(props) {
  const { row, setcheckLoading } = props;
  const [open, setOpen] = React.useState(false);

  const handleCheckBox = async (e, id, type) => {
    setcheckLoading(true);
    const checkedData = {
      ratingLevelId: id,
      [type]: e.target.checked,
    };

    try {
      await axios.post("/organization/rating-check", checkedData);
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
        <TableCell sx={{ fontWeight: 600, fontSize: "calc(5px + 1vmin)" }}>
          {row?.title}
        </TableCell>
        <TableCell
          colSpan={3}
          sx={{ fontWeight: 600, fontSize: "calc(5px + 1vmin)" }}
        >
          {" "}
          {row?.description}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                my: 1,
                borderRadius: "25px",
                boxShadow:
                  "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;",
              }}
            >
              {row?.features?.map((features, i) => (
                <Table key={i}>
                  <TableHead>
                    <TableRow
                      sx={{
                        background: "linear-gradient(to right, pink,lightblue)",
                      }}
                    >
                      <TableCell
                        align="center"
                        colSpan={5}
                        sx={{ fontWeight: 600, fontSize: "calc(6px + 1vmin)" }}
                      >
                        {features?.scaleName}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      sx={{
                        cursor: "pointer",
                        ":hover": {
                          bgcolor: "#EDEDED",
                        },
                      }}
                    >
                      <TableCell />
                      <TableCell>{features?.ratingScale}</TableCell>
                      <TableCell sx={{ bgcolor: "#f17272" }}>
                        <Stack>
                          {features?.doNotHave}
                          <Stack class="checkbox-wrapper-39">
                            <label>
                              <input
                                checked={features?.check[0].doNotHave === 1}
                                onClick={(e) =>
                                  handleCheckBox(e, features?.id, "doNotHave")
                                }
                                type="checkbox"
                              />
                              <span className="checkbox"></span>
                            </label>
                          </Stack>
                        </Stack>
                      </TableCell>
                      <TableCell sx={{ bgcolor: "#f3f39d" }}>
                        <Stack>
                          {features?.needsImprovement}
                          <Stack class="checkbox-wrapper-39">
                            <label>
                              <input
                                checked={
                                  features?.check[0].needsImprovement === 1
                                }
                                onClick={(e) =>
                                  handleCheckBox(
                                    e,
                                    features?.id,
                                    "needsImprovement"
                                  )
                                }
                                type="checkbox"
                              />
                              <span className="checkbox"></span>
                            </label>
                          </Stack>
                        </Stack>
                      </TableCell>
                      <TableCell sx={{ bgcolor: "#9bebbb" }}>
                        <Stack>
                          {features?.ready}
                          <Stack class="checkbox-wrapper-39">
                            <label>
                              <input
                                checked={features?.check[0].ready === 1}
                                onClick={(e) =>
                                  handleCheckBox(e, features?.id, "ready")
                                }
                                type="checkbox"
                              />
                              <span className="checkbox"></span>
                            </label>
                          </Stack>
                        </Stack>{" "}
                      </TableCell>
                    </TableRow>
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
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(
      PropTypes.shape({
        scaleName: PropTypes.string.isRequired,
        needsImprovement: PropTypes.string.isRequired,
        doNotHave: PropTypes.string.isRequired,
        ready: PropTypes.string.isRequired,
        ratingScale: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default function OrgLevelRatingTable() {
  const [fetchedData, setFetchedData] = React.useState(null);
  const [checkLoading, setcheckLoading] = React.useState(false);
  React.useEffect(() => {
    const data = async () => {
      try {
        const res = await axios.get("/api/organization/rating");
        res.status === 200 && setFetchedData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    data();
  }, [checkLoading]);
  return (
    <Stack spacing={2}>
      <CardComponent text={"Org Level Rating"} />
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
          Rate the level's data readiness for the following organizational
          success factors:{" "}
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: "20px",
            my: 2,
            boxShadow:
              "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;",
            background: " linear-gradient(to bottom, pink,lightblue)",
            pl: "8px",
          }}
        >
          <Table
            aria-label="collapsible table"
            sx={{
              bgcolor: "white",
              "& .MuiTableCell-root": {
                width: { md: "219px", xs: "auto" },
              },
            }}
          >
            <TableHead>
              <TableRow sx={{ bgcolor: "#a7e5fbcc" }}>
                <TableCell>
                  {checkLoading && (
                    <CircularProgress
                      sx={{ color: "inherit", width: "10px" }}
                    />
                  )}
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 600, fontSize: "calc(6px + 1vmin)" }}
                >
                  Rating Scale
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 600, fontSize: "calc(6px + 1vmin)" }}
                >
                  Do Not Have
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 600, fontSize: "calc(6px + 1vmin)" }}
                >
                  Ready
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 600, fontSize: "calc(6px + 1vmin)" }}
                >
                  Needs Improvement
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fetchedData?.data?.map((row) => (
                <Row
                  setcheckLoading={setcheckLoading}
                  key={row?.title}
                  row={row}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Stack
        spacing={2}
        sx={{
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
          bgcolor: "#fff",
          borderRadius: "20px",
          p: "20px",
        }}
      >
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Diagnostic Graphics
        </Typography>
        <Stack
          direction={{ md: "row", xs: "column" }}
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <LineChartComp
            labels={["Adequate Coverage", "Velocity", "Harmonization"]}
            yLabels={["Do Not Have", "Needs Improvement", "Ready"]}
            datasetsLabel={"Rules and Operations"}
            dataSet={[
              fetchedData?.data[0]?.features[0]?.check[0]?.doNotHave,
              fetchedData?.data[0]?.features[0]?.check[0]?.needsImprovement,
              fetchedData?.data[0]?.features[0]?.check[0]?.ready,
              
            ]}
          />
          <LineChartComp
            labels={["Personnel", "Centralized Database"]}
            datasetsLabel={"Foundational Infrastructure"}
            yLabels={["Do Not Have", "Needs Improvement", "Ready"]}
            dataSet={[
              fetchedData?.data[1]?.features[1]?.check[0]?.doNotHave,
              fetchedData?.data[1]?.features[1]?.check[0]?.needsImprovement,
              fetchedData?.data[1]?.features[1]?.check[0]?.ready,
            ]}
          />
          <LineChartComp
            labels={["Employee Participation", "Management Use"]}
            datasetsLabel={"Measurement Culture"}
            yLabels={["Do Not Have", "Needs Improvement", "Ready"]}
            dataSet={[
              fetchedData?.data[2]?.features[1]?.check[0]?.doNotHave,
              fetchedData?.data[2]?.features[1]?.check[0]?.needsImprovement,
              fetchedData?.data[2]?.features[1]?.check[0]?.ready,
            ]}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
