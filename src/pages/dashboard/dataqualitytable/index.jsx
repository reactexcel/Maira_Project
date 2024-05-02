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
import { useDispatch, useSelector } from "react-redux";
import {
  setCheckBoxId,
  setCheckloading,
  setData,
  setloading,
} from "../../../redux/slices/CvSlice";
import Loading from "../../../components/Referesh/Loading";

function Row(props) {
  const { row, data } = props;
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const checkloading = useSelector((state) => state.CvSlice.checkLoading);
  const checkBoxId = useSelector((state) => state.CvSlice.checkBoxId);
  const handleCheckboxChange = async (e, id, type) => {
    dispatch(setCheckBoxId({ id, type }));
    dispatch(setCheckloading(true));
    const checkedData = {
      [type]: e.target.checked,
    };
    try {
      await instance.put(
        `/api/data-quality/datalevel-check/${id}`,
        checkedData
      );
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
          colSpan={11}
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
                      colSpan={11}
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

                      {/* <TableCell /> */}
                      {e?.subColounms.map((e, i) => (
                        <>
                          <TableCell key={e?.id} sx={{ bgcolor: "#f17272" }}>
                            <Stack>
                              <Stack className="checkbox-wrapper-39">
                                <label>
                                  {checkloading &&
                                  e?.id === checkBoxId.id &&
                                  checkBoxId.type === "doNotHave" ? (
                                    <CircularProgress
                                      size={20}
                                      sx={{ color: "inherit" }}
                                    />
                                  ) : (
                                    <>
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
                                      />{" "}
                                      <span className="checkbox"></span>
                                    </>
                                  )}
                                </label>
                              </Stack>
                            </Stack>
                          </TableCell>
                          <TableCell sx={{ bgcolor: "#f3f39d" }}>
                            <Stack>
                              <Stack className="checkbox-wrapper-39">
                                <label>
                                  {checkloading &&
                                  e?.id === checkBoxId.id &&
                                  checkBoxId.type === "needsImprovement" ? (
                                    <CircularProgress
                                      size={20}
                                      sx={{ color: "inherit" }}
                                    />
                                  ) : (
                                    <>
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
                                    </>
                                  )}
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
                                  {checkloading &&
                                  e?.id === checkBoxId.id &&
                                  checkBoxId.type === "ready" ? (
                                    <CircularProgress
                                      size={20}
                                      sx={{ color: "inherit" }}
                                    />
                                  ) : (
                                    <>
                                      <input
                                        onChange={(event) =>
                                          handleCheckboxChange(
                                            event,
                                            e?.id,
                                            "ready"
                                          )
                                        }
                                        checked={e?.ready === 1}
                                        type="checkbox"
                                      />
                                      <span className="checkbox"></span>
                                    </>
                                  )}
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
  data: PropTypes.func.isRequired, // Add this line for data prop validation
};

export default function DataQualityTable() {
  const fetchedData = useSelector((state) => state?.CvSlice?.getData);
  const loading = useSelector((state) => state?.CvSlice?.isLoading);
  const dispatch = useDispatch();
  const data = async () => {
    try {
      const response = await instance.get("/api/data-quality/variable-list");
      response.status === 200 && dispatch(setData(response.data));
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    const fetchData = async () => {
      dispatch(setloading(true));
      try {
        await data();
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setloading(false));
      }
    };
    fetchData();
  }, []);
  if (loading) return <Loading />;

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
                {/* <TableCell></TableCell> */}
                <TableCell align="center" colSpan={2}>
                  {/* <img src="/images/image (2).png" alt="image" width={"50%"} /> */}
                </TableCell>

                <TableCell
                  sx={{
                    borderRight: "5px solid white",
                    boxShadow:
                      "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;",
                  }}
                  colSpan={3}
                >
                  {/* <Stack sx={{textAlign:'center'}} > */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: "white",
                      fontWeight: 600,
                      bgcolor: "#7c4aa3",
                      textAlign: "center",
                      // mb:'10px'
                    }}
                  >
                    Validity
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ textAlign: "center", height: "74px" }}
                  >
                    Validity assesses the extent to which inferences from the
                    data accurately represents the “real world” phenomenon
                    targeted by the measurement.
                  </Typography>
                  {/* </Stack> */}
                </TableCell>
                <TableCell
                  sx={{
                    borderRight: "5px solid white",
                    boxShadow:
                      "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;",
                  }}
                  colSpan={3}
                >
                  {/* <Stack sx={{height:'100%',textAlign:'center'}} spacing={2}> */}
                  <Typography
                    variant="body2"
                    sx={{
                      // width:'100%',
                      color: "white",
                      fontWeight: 600,
                      bgcolor: "#20388b",
                      textAlign: "center",
                    }}
                  >
                    Consistency
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ textAlign: "center", height: "74px" }}
                  >
                    Consistency refers to the absence of a difference, when
                    comparing two or more variables against a definition.
                  </Typography>
                  {/* </Stack> */}
                </TableCell>
                <TableCell
                  colSpan={3}
                  sx={{
                    boxShadow:
                      "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;",
                  }}
                >
                  {/* <Stack sx={{height:'100%',textAlign:'center'}} spacing={2} > */}
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
                  <Typography
                    variant="body2"
                    sx={{ textAlign: "center", height: "74px" }}
                  >
                    Variance is defined as the distance of a measure from the
                    mean of the total sample of measures
                  </Typography>
                  {/* </Stack> */}
                </TableCell>
              </TableRow>
              <TableRow sx={{ bgcolor: "#a7e5fbcc" }}>
                {/* <TableCell /> */}
                <TableCell sx={{ fontWeight: 600, p: "37px" }}>
                  Variable List
                </TableCell>
                <TableCell sx={{ fontWeight: 600, p: "37px" }}>
                  Definition
                </TableCell>
                {/* <TableCell
                  sx={{ fontWeight: 600 }}
                >
                  Org Metrics
                </TableCell> */}
                {[1, 2, 3].map((e, i) => (
                  <>
                    <TableCell sx={{ bgcolor: "#f17272", textAlign: "center" }}>
                      <Typography
                        variant="body2"
                        sx={{ color: "#971a1a", fontWeight: 600 }}
                      >
                        Do Not Have
                      </Typography>
                      <Typography variant="body2" sx={{ height: "220px" }}>
                        errors are found (e.g. missing values or impossible
                        values, like negative hours worked)
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ bgcolor: "#f3f39d", textAlign: "center" }}>
                      <Typography
                        variant="body2"
                        sx={{ color: "rgb(89 95 6 / 87%)", fontWeight: 600 }}
                      >
                        Needs Improvement
                      </Typography>

                      <Typography variant="body2" sx={{ height: "220px" }}>
                        errors are found (e.g. missing values or impossible
                        values, like negative hours worked)
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        bgcolor: "#9bebbb",
                        borderRight: i !== 2 && "5px solid white",
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ color: "rgb(18 55 0 / 87%)", fontWeight: 600 }}
                      >
                        Ready
                      </Typography>
                      <Typography variant="body2" sx={{ height: "220px" }}>
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
                <Row key={row.hederName} row={row} data={data} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Stack>
  );
}
