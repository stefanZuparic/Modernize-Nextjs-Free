import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  styled,
  Stack,
  IconButton,
  Badge,
  Button,
  Select,
  MenuItem,
  Autocomplete,
  TextField,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";

// components
import Profile from "./Profile";
import { IconBellRinging, IconMenu } from "@tabler/icons-react";
import { useStore } from "@/app/lib/store";
import { Prostor } from "@/app/models/prostor";

interface ItemType {
  toggleMobileSidebar: (event: React.MouseEvent<HTMLElement>) => void;
}

const Header = ({ toggleMobileSidebar }: ItemType) => {
  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  // const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const { dozvola, prostori, prostor, setProstor, fetchRacuni } = useStore();

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    background: theme.palette.background.paper,
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    [theme.breakpoints.up("lg")]: {
      minHeight: "70px",
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
          }}
        >
          <IconMenu width="20" height="20" />
        </IconButton>

        <Box flexGrow={1} />

        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Typography variant="h5" color="textPrimary" sx={{ marginRight: 1 }}>
            PROSTORI:
          </Typography>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={prostori.map((prostor) => prostor.adresa)}
            sx={{ width: 1000 }}
            renderInput={(params) => <TextField {...params} />}
            value={prostor?.adresa}
            onChange={(event, value) => {
              setProstor(
                prostori.find((prostor) => prostor.adresa === value)!
              ).then((prostor) => {
                fetchRacuni(
                  dozvola?.obv_id!,
                  prostor.pro_id,
                  prostor.godine[0]
                );
              });
            }}
          />
        </Box>

        <Box flexGrow={1} />

        <Stack spacing={1} direction="row" alignItems="center">
          {/* <Button
            variant="contained"
            disableElevation
            color="primary"
            target="_blank"
            href="https://adminmart.com/product/modernize-next-js-admin-dashboard"
          >
            Upgrade to Pro
          </Button> */}
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
