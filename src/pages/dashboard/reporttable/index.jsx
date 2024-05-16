import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Card, Chip, Grid, Stack, Typography } from "@mui/material";
import CardComponent from "../../../components/card";
import { ReportTableHeadStaticData } from "../../../utiles/staticdata";
import Loading from "../../../components/Referesh/Loading";
import { instance } from "../../../axiosInstance/instance";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../../../redux/slices/CvSlice";
const colorCode = (value) => {
  if (value === 1) {
    return "#f3f39d";
  } else if (value === 2) {
    return "#9bebbb";
  }
};

export default function ReportTable() {
  const dispatch = useDispatch();
  const [reportLoading, setReportLoading] = useState(true);
  const fetchedData = useSelector((state) => state?.CvSlice?.getData);
  useEffect(() => {
    const getData = async () => {
      try {
        setReportLoading(true);
        const res = await instance.get("/api/data/report-data");
        if (res.status === 200) {
          dispatch(setData(res?.data?.report));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setReportLoading(false);
      }
    };

    getData();
  }, []);
  if (reportLoading) {
    return <Loading />;
  }
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexDirection: "column",
        textTransform: "capitalize",
      }}
    >
      <CardComponent text={"Report"} />
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
            // background: "linear-gradient(to bottom, pink,lightblue)",
            // pl: "8px",
          }}
        >
          <Table sx={{ bgcolor: "white" }} aria-label="spanning table">
            <TableHead>
              <TableRow sx={{ bgcolor: "#a7e5fbcc" }}>
                <TableCell />
                {ReportTableHeadStaticData?.map(
                  (e, i) =>
                    e !== "Weight" && (
                      <TableCell
                        key={i}
                        align="center"
                        sx={{
                          fontWeight: 600,
                          fontSize: "calc(6px + 1vmin)",
                          bgcolor: i === 5 && "#4173F8",
                        }}
                      >
                        {e}
                      </TableCell>
                    )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {fetchedData &&
                Object.keys(fetchedData)?.map(
                  (key, i) =>
                    key !== "overall" && (
                      <TableRow
                        key={i}
                        sx={{
                          ":hover": {
                            bgcolor: "#EDEDED",
                          },
                        }}
                      >
                        <TableCell sx={{ fontWeight: 600 }}>{key}</TableCell>
                        {Object.keys(fetchedData[key]).map(
                          (innerKey, j) =>
                            innerKey !== "Weight" && ( // Exclude weight column
                              <TableCell
                                key={j}
                                align="center"
                                sx={{
                                  borderRight: "1px solid white",
                                  bgcolor:
                                    innerKey !== "Your Score" &&
                                    colorCode(fetchedData[key][innerKey]),
                                }}
                              >
                                {/* {console.log(innerKey,'sadsada')} */}
                                {innerKey === "Your Score"
                                  ? fetchedData[key][innerKey]
                                  : fetchedData[key][innerKey] === 1
                                  ? "Need Improvement"
                                  : fetchedData[key][innerKey] === 2
                                  ? "Ready"
                                  : fetchedData[key][innerKey]}
                              </TableCell>
                            )
                        )}
                      </TableRow>
                    )
                )}
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
          {fetchedData &&
            Object.keys(fetchedData?.overall)?.map((e, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                {index !== ReportTableHeadStaticData.length - 1 && (
                  <Stack
                    direction={"row"}
                    sx={{
                      justifyContent: "space-between",
                      alignItems: "center",
                      p: 2,
                      borderRadius: "20px",
                      boxShadow:
                        "rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px;",
                    }}
                  >
                    <Typography variant="inherit" sx={{ fontSize: "18px" }}>
                      {e}
                    </Typography>
                    <Chip
                      sx={{ bgcolor: "#DACAD7", fontSize: "15px" }}
                      label={fetchedData?.overall[e]}
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
