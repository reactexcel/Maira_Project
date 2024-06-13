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
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CardComponent from "../../../components/card";
import { Chip, Stack } from "@mui/material";
import Loading from "../../../components/Referesh/Loading";
import { instance } from "../../../axiosInstance/instance";
import { useDispatch, useSelector } from "react-redux";
import { setData, setloading } from "../../../redux/slices/CvSlice";
import DropdownMenu from "../../../utiles/CommonDropDown";
import Cookies from "js-cookie";

function Row(props) {
  const { row, getData } = props;
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [type, setType] = React.useState(null);
  const [id, setId] = React.useState(null);
  const collapseId = Cookies.get("collapseId");




  const handleClick = (event, t, id) => {
    setAnchorEl(event.currentTarget);
    setType(t);
    setId(id);
  };
  const tHead = [
    "Variable",
    "Validity",
    "Consistency",
    "Variability",
    "Adequate Coverage",
    "Velocity",
    "Harmonization",
    "Personnel",
    "Centralized Database",
    "Employee Participation",
    "Management Use",
  ];


  
  const handleOpen = (id) => {
    setOpen(!open);
    Cookies.set("collapseId", id);
  };


  React.useEffect(() => {
    if (collapseId == row?.id) {
      setOpen(true);
    }
  }, [collapseId]);


  return (
    <React.Fragment>
      <Box
        onClick={() => handleOpen(row?.id)}
        sx={{
          ":hover": {
            bgcolor: "#EDEDED",
            cursor: "pointer",
          },
          borderBottom: "1px solid lightgray",
          display: "flex",
          alignItems: "center",
          gap: "50px",
          py: 2,
          px: 1,
        }}
      >
        <IconButton aria-label="expand row">
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
        <Typography
          sx={{
            fontWeight: "bold",
            color: "gray",
          }}
        >
          {row?.headerName}
        </Typography>
      </Box>
      <Box>
        <Collapse
          className="example"
          in={row?.id == collapseId ? open : false}
          timeout="auto"
          unmountOnExit
          sx={{ overflow: "auto" }}
        >
          <Box>
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    background: "linear-gradient(to right, pink,lightblue)",
                  }}
                >
                  {tHead.map((val, index) => (
                    <TableCell
                      key={index}
                      sx={{ fontWeight: 600, textAlign: "center" }}
                    >
                      {val}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody sx={{ "& .MuiTableCell-root": { width: "200px" } }}>
                {row?.columns?.map((eItem) => (
                  <TableRow
                    key={eItem?.variableList}
                    sx={{
                      cursor: "pointer",
                      ":hover": {
                        bgcolor: "#EDEDED",
                      },
                    }}
                  >
                    <TableCell
                      sx={{
                        fontWeight: "600",
                        bgcolor: "#D3D3D3",
                        color: "#000",
                      }}
                    >
                      {eItem?.variableList}
                    </TableCell>
                    {eItem?.subColounms?.map((el, i) => (
                      <React.Fragment key={i}>
                        {el.value === 0 ? (
                          <TableCell sx={{ textAlign: "center" }}>
                            <Chip
                              label="Do not have"
                              onClick={(e) => handleClick(e, el?.type, el?.id)}
                              sx={{ width: "120px",bgcolor:"#F17272", "&:hover": {
                                bgcolor: "#c74646"
                              } }}
                            />
                          </TableCell>
                        ) : el.value === 1 ? (
                          <TableCell sx={{ textAlign: "center" }}>
                            <Chip
                              label="Needs Improvement"
                              onClick={(e) => handleClick(e, el?.type, el?.id)}
                              sx={{ width: "120px",bgcolor:"#F3F39D", "&:hover": {
                                bgcolor: "#d1d164"
                              }}}
                            />
                          </TableCell>
                        ) : el.value === 2 ? (
                          <TableCell sx={{ textAlign: "center" }}>
                            <Chip
                              label="Ready"
                              onClick={(e) => handleClick(e, el?.type, el?.id)}
                              sx={{ width: "120px",bgcolor:"#9BEBBB", "&:hover": {
                                bgcolor: "#49ad71"
                              }}}
                            />
                          </TableCell>
                        ) : (
                          el.value == "FALSE" && (
                            <TableCell sx={{ textAlign: "center" }}>
                              <Chip
                                label={"Missing"}
                                onClick={(e) =>
                                  handleClick(e, el?.type, el?.id)
                                }
                                sx={{
                                  width: "120px",
                                  textTransform: "capitalize",
                                }}
                              />
                            </TableCell>
                          )
                        )}
                      </React.Fragment>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </Box>
      <DropdownMenu
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        getData={getData}
        type={type}
        id={id}
        setOpen={setOpen}
        row={row}
      />
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    headerName: PropTypes.string.isRequired,
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        variableList: PropTypes.string.isRequired,
        subColounms: PropTypes.arrayOf(
          PropTypes.shape({
            value: PropTypes.string.isRequired,
          })
        ).isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default function Datamatrixsummarytable() {
  const dispatch = useDispatch();
  const fetchData = useSelector((state) => state?.CvSlice?.getData);
  const loading = useSelector((state) => state?.CvSlice?.isLoading);
  const getData = async () => {
    dispatch(setloading(true));
    try {
      const res = await instance.get("/api/data-quality/overview");
      if (res.status === 200) {
        dispatch(setData(res?.data?.data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setloading(false));
    }
  };
  React.useEffect(() => {
    getData();
  }, []);

  if (loading) return <Loading />;
  return (
    <Stack spacing={2}>
      <CardComponent text={"Data Matrix Summary"} />
      <Box
        sx={{
          p: 2,
          bgcolor: "#fff",
          // background: " linear-gradient(to bottom, pink,lightblue)",
          borderRadius: "25px",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontSize: "22px",
            fontWeight: 600,
            p: 2,
            bgcolor: "#fff",
            borderRadius: "25px",
          }}
        >
          Please check for accuracy and make any necessary changes to your
          ratings:{" "}
        </Typography>
        <Box sx={{ overflow: "hidden" }}>
          {fetchData?.modifiedData?.map((row, i) => (
            <Box key={i}>
              <Row row={row} getData={getData} />
            </Box>
          ))}
        </Box>
      </Box>
    </Stack>
  );
}
