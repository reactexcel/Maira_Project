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
import Loading from "../../../components/Referesh/Loading";
import { instance } from "../../../axiosInstance/instance";
import { useDispatch, useSelector } from "react-redux";
import { setData, setloading } from "../../../redux/slices/CvSlice";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

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
                    <TableCell
                      align="center"
                      colSpan={11}
                      sx={{ fontWeight: 600 }}
                    >
                      {row?.headerName}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{ "& .MuiTableCell-root": { width: "200px" } }}>
                  {row?.columns?.map((eItem, i) => (
                    <TableRow
                      key={i}
                      sx={{
                        cursor: "pointer",
                        ":hover": {
                          bgcolor: "#EDEDED",
                        },
                      }}
                    >
                      <TableCell>{eItem?.variableList}</TableCell>
                      {eItem?.subColounms?.map((e, i) => (
                        // obj.e.type =  obj.e.type + e.value
                        <TableCell key={i}>{e.value}</TableCell>
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
        subColounms: PropTypes.arrayOf(
          PropTypes.shape({
            value: PropTypes.string.isRequired,
          })
        ).isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default function DatamatrixsummarytableBack() {
  const dispatch =useDispatch()
  const fetchData=useSelector((state)=>state?.CvSlice?.getData)
const loading=useSelector((state)=>state?.CvSlice?.isLoading)
React.useEffect(() => {
  const getData = async () => {
    dispatch(setloading(true))
    try {
      const res = await instance.get("/api/data-quality/data-analytics");
      if (res.status === 200) {
        dispatch(setData(res?.data?.data))
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setloading(false))
    }
  };
  getData();
}, []);
if(loading) return <Loading/>
  return (
    <Stack spacing={2} sx={{textTransform:'capitalize'}}>
      <CardComponent text={"Data Matrix Summary- Back"} />
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
            // pl: "8px",
          }}
        >
          <Table aria-label="collapsible table" sx={{ bgcolor: "white" }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Variable</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Validity</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Consistency</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Variability</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>
                  Adequate Coverage
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Velocity</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Harmonization</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Personnel</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>
                  Centralized Database
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }}>
                  Employee Participation
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Management Use</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {fetchData?.modifiedData?.map((row, i) => (
                <Row key={i} row={row} />
              ))}
              <TableRow >
                <TableCell sx={{fontWeight:600,textAlign:'center'}} >Average</TableCell>
                <TableCell sx={{fontWeight:600,textAlign:'center'}}>{fetchData?.maxAppearance?.validity}</TableCell>
                <TableCell sx={{fontWeight:600,textAlign:'center'}}>{fetchData?.maxAppearance?.consistency}</TableCell>
                <TableCell sx={{fontWeight:600,textAlign:'center'}}>{fetchData?.maxAppearance?.variability}</TableCell>
                <TableCell sx={{fontWeight:600,textAlign:'center'}}>{fetchData?.maxAppearance?.['Adequate Coverage']}</TableCell>
                <TableCell sx={{fontWeight:600,textAlign:'center'}}>{fetchData?.maxAppearance?.Velocity}</TableCell>
                <TableCell sx={{fontWeight:600,textAlign:'center'}}>{fetchData?.maxAppearance?.Harmonization}</TableCell>
                <TableCell sx={{fontWeight:600,textAlign:'center'}}>{fetchData?.maxAppearance?.Personnel}</TableCell>
                <TableCell sx={{fontWeight:600,textAlign:'center'}}>{fetchData?.maxAppearance?.['Centralized Database']}</TableCell>
                <TableCell sx={{fontWeight:600,textAlign:'center'}}>{fetchData?.maxAppearance?.['Employee Participation']}</TableCell>
                <TableCell sx={{fontWeight:600,textAlign:'center'}}>{fetchData?.maxAppearance?.['Management Use']}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Stack>
  );
}
