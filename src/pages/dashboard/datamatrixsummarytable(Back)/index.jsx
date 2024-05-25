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
      <Box
        onClick={() => setOpen(!open)}
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
        }}>
        <IconButton aria-label="expand row">
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
        <Typography
          sx={{
            fontWeight: "bold",
            color: "gray",
          }}>
          {row?.headerName}
        </Typography>
      </Box>
      <Box>
        <Collapse
          className="example"
          in={open}
          timeout="auto"
          unmountOnExit
          sx={{ overflow: "auto" }}>
          <Box>
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    background: "linear-gradient(to right, pink,lightblue)",
                  }}>
                  {tHead.map((val, index) => (
                    <TableCell
                      key={index}
                      sx={{ fontWeight: 600, textAlign: "center" }}>
                      {val}
                    </TableCell>
                  ))}
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
                    }}>
                    <TableCell
                      sx={{
                        fontWeight: "600",
                        bgcolor: "gray",
                        color: "#000",
                      }}>
                      {eItem?.variableList}
                    </TableCell>
                    {eItem?.subColounms?.map((e, i) => (
                      <TableCell
                        key={i}
                        sx={{
                          textAlign: "justify",
                          fontWeight: "600",
                          bgcolor: "lightgray",
                        }}>
                        {e.value}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </Box>
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
  const dispatch = useDispatch();
  const fetchData = useSelector((state) => state?.CvSlice?.getData);
  const loading = useSelector((state) => state?.CvSlice?.isLoading);
  React.useEffect(() => {
    const getData = async () => {
      dispatch(setloading(true));
      try {
        const res = await instance.get("/api/data-quality/data-analytics");
        if (res.status === 200) {
          dispatch(setData(res?.data?.data));
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setloading(false));
      }
    };
    getData();
  }, []);
  if (loading) return <Loading />;
  return (
    <Stack spacing={2} sx={{ textTransform: "capitalize" }}>
      <CardComponent text={"Data Matrix Summary- Back"} />
      <Box
        sx={{
          p: 2,
          bgcolor: "#fff",
          borderRadius: "25px",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
        }}>
        <Typography
          variant="subtitle1"
          sx={{ fontSize: "22px", fontWeight: 600 }}>
          Please check for accuracy and make any necessary changes to your
          ratings:{" "}
        </Typography>
        <Box sx={{ overflow: "hidden" }}>
          {fetchData?.modifiedData?.map((row, i) => (
            <Row key={i} row={row} />
          ))}
        </Box>
        <Table>
          <TableBody>
            
            <TableRow>
              <TableCell sx={{ fontWeight: 600, textAlign: "justify" }}>
                Average
              </TableCell>
              <TableCell sx={{ fontWeight: 600, textAlign: "justify" }}>
                {fetchData?.maxAppearance?.validity}
              </TableCell>
              <TableCell sx={{ fontWeight: 600, textAlign: "justify" }}>
                {fetchData?.maxAppearance?.consistency}
              </TableCell>
              <TableCell sx={{ fontWeight: 600, textAlign: "justify" }}>
                {fetchData?.maxAppearance?.variability}
              </TableCell>
              <TableCell sx={{ fontWeight: 600, textAlign: "justify" }}>
                {fetchData?.maxAppearance?.["Adequate Coverage"]}
              </TableCell>
              <TableCell sx={{ fontWeight: 600, textAlign: "justify" }}>
                {fetchData?.maxAppearance?.Velocity}
              </TableCell>
              <TableCell sx={{ fontWeight: 600, textAlign: "justify" }}>
                {fetchData?.maxAppearance?.Harmonization}
              </TableCell>
              <TableCell sx={{ fontWeight: 600, textAlign: "justify" }}>
                {fetchData?.maxAppearance?.Personnel}
              </TableCell>
              <TableCell sx={{ fontWeight: 600, textAlign: "justify" }}>
                {fetchData?.maxAppearance?.["Centralized Database"]}
              </TableCell>
              <TableCell sx={{ fontWeight: 600, textAlign: "justify" }}>
                {fetchData?.maxAppearance?.["Employee Participation"]}
              </TableCell>
              <TableCell sx={{ fontWeight: 600, textAlign: "justify" }}>
                {fetchData?.maxAppearance?.["Management Use"]}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Stack>
  );
}
