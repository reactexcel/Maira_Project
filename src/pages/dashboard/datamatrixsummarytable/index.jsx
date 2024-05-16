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
import { Chip, Stack } from "@mui/material";
import Loading from "../../../components/Referesh/Loading";
import { instance } from "../../../axiosInstance/instance";
import { useDispatch, useSelector } from "react-redux";
import { setData, setloading } from "../../../redux/slices/CvSlice";
import DropdownMenu from "../../../utiles/CommonDropDown";

function Row(props) {
  const { row,getData } = props;
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [type,setType]=React.useState(null)
  const [id,setId]=React.useState(null)
  const handleClick = (event,t,id) => {
    setAnchorEl(event.currentTarget);
    setType(t)
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
          colSpan={10}
          sx={{
            fontWeight: 600,
            // fontSize: "calc(5px + 1vmin)",
          }}
        >
          {row?.headerName}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                my: 1,
                // borderRadius: "25px",
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
                     {tHead.map((val, index) => (
                      <TableCell key={index} sx={{ fontWeight: 600 }}>
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
                      <TableCell>
                        {eItem?.variableList}
                      </TableCell>
                      {eItem?.subColounms?.map((el, i) => (
                        <React.Fragment key={i}>
                          {el.value === 1 ? (
                            <TableCell sx={{textAlign:'center'}}><Chip label="Do not have" color="error"  onClick={(e) => handleClick(e, el?.type,el?.id)} /></TableCell>
                          ) : el.value === 2 ? (
                            <TableCell sx={{textAlign:'center'}}><Chip label="Needs Imporvement" color="warning"  onClick={(e) => handleClick(e, el?.type,el?.id)} /></TableCell>
                          ) : el.value === 3 ? (
                            <TableCell sx={{textAlign:'center'}}><Chip label="Do not have" color="success" onClick={(e) => handleClick(e, el?.type,el?.id)} /></TableCell>
                          ) : (
                            <TableCell ><Chip label={el.value} onClick={(e) => handleClick(e, el?.type,el?.id)} /></TableCell>
                          )}
                        </React.Fragment>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <DropdownMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} getData={getData} type={type} id={id} />
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
  const dispatch=useDispatch()
const fetchData=useSelector((state)=>state?.CvSlice?.getData)
const loading=useSelector((state)=>state?.CvSlice?.isLoading)
const getData = async () => {
  dispatch(setloading(true))
    try {
      const res = await instance.get("/api/data-quality/overview");
      if (res.status === 200) {
        dispatch(setData(res?.data?.data))
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setloading(false))
    }
  };
  React.useEffect(() => {
    getData();
  }, []);
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
if(loading) return <Loading/>
  return (
    <Stack spacing={2} sx={{textTransform:'capitalize'}}>
      <CardComponent text={"Data Matrix Summary"} />
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
            borderRadius: "20px",
            my: 2,
            boxShadow:
              "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;",
            background: " linear-gradient(to bottom, pink,lightblue)",
            pl: "8px",
          }}
        >
          <Table aria-label="collapsible table" sx={{ bgcolor: "white" }}>
            <TableHead sx={{height:"50px"}}>
              <TableRow sx={{lineHeight:"50px"}}>
                {tHead.map((val, index) => (
                      <TableCell key={index} sx={{ fontWeight: 600}}>
                        {val}
                      </TableCell>
                    ))}
              </TableRow>
            </TableHead>
            {fetchData?.modifiedData?.map((row, i) => (
              <TableBody key={i}>
                <Row row={row} getData={getData} />
              </TableBody>
            ))}
          </Table>
        </TableContainer>
      </Box>
    </Stack>
  );
}
