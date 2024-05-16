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
import LineChartComp from "../../../components/Chart/LineChartComp";
import { instance } from "../../../axiosInstance/instance";
import { useDispatch, useSelector } from "react-redux";
import {
  setCheckBoxId,
  setCheckloading,
  setData,
  setGraphState1,
  setGraphState2,
  setGraphState3,
  setloading,
} from "../../../redux/slices/CvSlice";
import Loading from "../../../components/Referesh/Loading";

function Row(props) {
  const { row, data } = props;
  const ref=React.useRef(null)
  const [open, setOpen] = React.useState(false);
  const checkloading = useSelector((state) => state.CvSlice.checkLoading);
  const checkBoxId = useSelector((state) => state.CvSlice.checkBoxId);
  const dispatch = useDispatch();
  const handleCheckBox = async (e, id, type) => {
    dispatch(setCheckBoxId({ id, type }));
    dispatch(setCheckloading(true));
    const checkedData = {
      ratingLevelId: id,
      [type]: e.target?.checked,
    };
    console.log(e.current?.value);
    try {
   await instance.post("/api/organization/rating-check", checkedData);  
  } catch (error) {
      console.log(error);
    }
    data();
    dispatch(setCheckloading(false));

  };
 
  return (
    <React.Fragment>
      <TableRow
        onClick={() => setOpen(!open)}
        sx={{
          // "& > *": { borderBottom: "unset" },
          ":hover": {
            bgcolor: "#EDEDED",
            cursor: "pointer",

          },
        }}
      >
        <TableCell >
          <IconButton aria-label="expand row">
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell sx={{ fontWeight: 600, fontSize: "calc(6px + 1vmin)",color:"gray"}}>
          {row?.title}
        </TableCell>
        <TableCell
          colSpan={3}
          sx={{ fontWeight: 600, fontSize: "calc(6px + 1vmin)",color:"gray"}}
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
                  // textTransform:'capitalize'
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
                        sx={{ fontWeight: 600, }}
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
                      <TableCell/>

                      <TableCell>{features?.ratingScale}</TableCell>
                      <TableCell sx={{ bgcolor: "#f17272" }}>
                        <Stack sx={{alignItems:'center',justifyContent:'center',textAlign:'center'}}>
                          <Typography>
                          {features?.doNotHave}

                          </Typography>
                          <Stack class="checkbox-wrapper-39">
                            <label>
                              {checkloading &&
                              features?.id === checkBoxId?.id &&
                              checkBoxId?.type === "doNotHave" ? (
                                <CircularProgress
                                  size={20}
                                  sx={{ color: "inherit" }}
                                />
                              ) : (
                                <>
                                  <input
                                 ref={ref} 
                                    checked={features?.check[0].doNotHave === 1}
                                    value={"doNotHave"}
                                    name={features?.id}
                                    onClick={(e) =>
                                      handleCheckBox(
                                        e,
                                        features?.id,
                                        "doNotHave"
                                      )
                                    }
                                    type="checkbox"
                                  />
                                  <span className="checkbox"></span>
                                </>
                              )}
                            </label>
                          </Stack>
                        </Stack>
                      </TableCell>
                      <TableCell sx={{ bgcolor: "#f3f39d" }}>
                        <Stack sx={{alignItems:'center',justifyContent:'center',textAlign:'center'}}>
                          <Typography>

                          {features?.needsImprovement}
                          </Typography>
                          <Stack className="checkbox-wrapper-39">
                            <label>
                              
                              {checkloading &&
                              features?.id === checkBoxId.id &&
                              checkBoxId.type === "needsImprovement" ? (
                                <CircularProgress
                                  size={20}
                                  sx={{ color: "inherit" }}
                                />
                              ) : (
                                <>
                                  <input
                              
                              checked={
                                      features?.check[0].needsImprovement === 1
                                    }
                                    value={"needsImprovement"}
                                    name={features?.id}
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
                                </>
                              )}
                            </label>
                          </Stack>
                        </Stack>
                      </TableCell>
                      <TableCell sx={{ bgcolor: "#9bebbb" }}>
                        <Stack sx={{alignItems:'center',justifyContent:'center',textAlign:'center'}}>
                          <Typography>

                          {features?.ready}
                          </Typography>
                          <Stack  class="checkbox-wrapper-39">
                            <label>
                              {checkloading &&
                              features?.id === checkBoxId?.id &&
                              checkBoxId?.type === "ready" ? (
                                <CircularProgress
                                  size={20}
                                  sx={{ color: "inherit" }}
                                />
                              ) : (
                                <>
                                  <input
                                    checked={features?.check[0].ready === 1}
                                    value={"ready"}
                                    onClick={(e) =>
                                      handleCheckBox(e, features?.id, "ready")
                                    }
                                    name={features?.id}
                                    type="checkbox"
                                  />
                                  <span className="checkbox"></span>
                                </>
                              )}
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
        ratingScale: PropTypes.string.isRequired,
        doNotHave: PropTypes.string.isRequired,
        needsImprovement: PropTypes.string.isRequired,
        ready: PropTypes.string.isRequired,
        check: PropTypes.arrayOf(
          PropTypes.shape({
            doNotHave: PropTypes.number.isRequired,
            needsImprovement: PropTypes.number.isRequired,
            ready: PropTypes.number.isRequired,
          })
        ).isRequired,
      })
    ).isRequired,
  }).isRequired,
  data: PropTypes.func.isRequired,
};

export default function OrgLevelRatingTable() {
  const fetchedData = useSelector((state) => state?.CvSlice?.getData);
  const graphState1 = useSelector((state) => state?.CvSlice?.grapState1);
  const graphState2 = useSelector((state) => state?.CvSlice?.grapState2);
  const graphState3 = useSelector((state) => state?.CvSlice?.grapState3);
  const dispatch = useDispatch();
  const checkLoading = useSelector((state) => state.CvSlice.checkLoading);
  const loading = useSelector((state) => state?.CvSlice?.isLoading);
  const data = async () => {
    try {
      const res = await instance.get("/api/organization/rating");
      res.status === 200 && dispatch(setData(res.data));
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    const fetchedData = async () => {
      dispatch(setloading(true));
      try {
        await data();
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setloading(false));
      }
    };
    fetchedData();
  }, []);

  function checkScaleStatus(scaleName, doNotHave, needImprovements, ready) {
    if (doNotHave === 1) {
      return { scaleName: scaleName, value: "Do not have" };
    } else if (needImprovements === 1) {
      return { scaleName: scaleName, value: "Needs improvements" };
    } else if (ready === 1) {
      return { scaleName: scaleName, value: "Ready" };
    } else {
      return { scaleName: scaleName, value: "False" };
    }
  }

  function scaleStatusDecision(scaleName, doNotHave, needImprovements, ready) {
    switch (scaleName) {
      case "Adequate Coverage":
        return checkScaleStatus(scaleName, doNotHave, needImprovements, ready);
      case "Velocity":
        return checkScaleStatus(scaleName, doNotHave, needImprovements, ready);
      case "Harmonization":
        return checkScaleStatus(scaleName, doNotHave, needImprovements, ready);
      case "Management Use":
        return checkScaleStatus(scaleName, doNotHave, needImprovements, ready);
      case "Employee Participation":
        return checkScaleStatus(scaleName, doNotHave, needImprovements, ready);
      case "Personnel":
        return checkScaleStatus(scaleName, doNotHave, needImprovements, ready);
      case "Centralized Database":
        return checkScaleStatus(scaleName, doNotHave, needImprovements, ready);
      default:
        return "Invalid scale name";
    }
  }

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instance.get("/api/organization/rating-graph");
        if (res.status === 200) {
          processGraphData(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const processGraphData = (data) => {
      let sum1 = [0, 0, 0];
      let sum2 = [0, 0];
      let sum3 = [0, 0];

      data.forEach((item) => {
        const result = scaleStatusDecision(
          item.scalename,
          item.doNotHave,
          item.needsImprovement,
          item.ready
        );
        switch (result.scaleName) {
          case "Adequate Coverage":
            sum1[0] = getResultValue(result.value);
            break;
          case "Velocity":
            sum1[1] = getResultValue(result.value);
            break;
          case "Harmonization":
            sum1[2] = getResultValue(result.value);
            break;
          case "Management Use":
            sum2[0] = getResultValue(result.value);
            break;
          case "Employee Participation":
            sum2[1] = getResultValue(result.value);
            break;
          case "Personnel":
            sum3[0] = getResultValue(result.value);
            break;
          case "Centralized Database":
            sum3[1] = getResultValue(result.value);
            break;
          default:
            break;
        }
      });
      dispatch(setGraphState1(sum1));
      dispatch(setGraphState2(sum2));
      dispatch(setGraphState3(sum3));
    };

    const getResultValue = (value) => {
      switch (value) {
        case "Do not have":
          return 0;
        case "Needs improvements":
          return 1;
        case "Ready":
          return 2;
        default:
          return 0;
      }
    };

    fetchData();
  }, [checkLoading]);
  if (loading) return <Loading />;
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
          sx={{ fontSize: "22px", fontWeight: 600}}
        >
          Rate the level&apos;s data readiness for the following organizational
          success factors:{" "}
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: "20px",
            my: 2,
            boxShadow:
              "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;",
            // background: " linear-gradient(to bottom, pink,lightblue)",
            // pl: "8px",
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
              <TableRow sx={{ bgcolor: "#a7e5fbcc"}}>
                <TableCell></TableCell>
                <TableCell sx={{ fontWeight: 600,color:"#696969" }}>Rating Scale</TableCell>
                <TableCell sx={{ fontWeight: 600,color:"#696969"}}>Do Not Have</TableCell>
                <TableCell sx={{ fontWeight: 600,color:"#696969" }}>
                  Needs Improvement
                </TableCell>
                <TableCell sx={{ fontWeight: 600,color:"#696969" }}>Ready</TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {fetchedData?.data?.map((row) => (
                <Row  key={row?.title} row={row} data={data} />
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap ",
          }}
        >
          <LineChartComp
            labels={["Adequate Coverage", "Velocity", "Harmonization"]}
            yLabels={["Do Not Have", "Needs Improvement", "Ready"]}
            datasetsLabel={"Rules and Operations"}
            dataSet={graphState1}
          />
            <LineChartComp
              labels={["Employee Participation", "Management Use"]}
              datasetsLabel={"Measurement Culture"}
              yLabels={["Do Not Have", "Needs Improvement", "Ready"]}
              
              dataSet={graphState2}
            />
          <LineChartComp
            labels={["Personnel", "Centralized Database"]}
            datasetsLabel={"Foundational Infrastructure"}
            yLabels={["Do Not Have", "Needs Improvement", "Ready"]}
            dataSet={graphState3}
          />
        </Box>
      </Stack>
    </Stack>
  );
}
