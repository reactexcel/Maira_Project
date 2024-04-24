import { Stack } from '@mui/material'
const LoginAndRegisterComponent = ({pages}) => {
  return (
    <Stack
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        overflow: "auto",
        //background: "url(https://source.unsplash.com/1920x2400?hdr,sunset,ocean)"
        backgroundImage: "linear-gradient(to left, lightblue, pink)",
      }}
    >
      <Stack
        sx={{
          width: { md: "80%", xs: "95%" },
          p: 3,
          flexDirection: { xs: "column", md: "row" },
          //height: "70%",
          // backgroundImage:
          //   "linear-gradient(to right bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.2))",
          //bgcolor:"rgba(255, 255, 255, .15)",
          backdropFilter: "blur(35px)",
        }}
      >
        <Stack
          sx={{
            display: { xs: "none", md: "block" },
            width: "100%",
            height: "100%",
          }}
        >
          <img
            src="images/bgimage.png"
            alt="image"
            style={{ height: "100%", width: "100%" }}
          />
        </Stack>
          {pages}
      </Stack>
    </Stack>
  )
}

export default LoginAndRegisterComponent
