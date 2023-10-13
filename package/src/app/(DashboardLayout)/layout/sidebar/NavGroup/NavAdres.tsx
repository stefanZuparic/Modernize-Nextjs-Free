import PropTypes from "prop-types";
// mui imports
import { ListItemIcon, ListSubheader, styled, Theme } from "@mui/material";

const NavAdres = ({ item, icon }: { item: string; icon: any }) => {
  const ListSubheaderStyle = styled((props: Theme | any) => (
    <ListSubheader disableSticky {...props} />
  ))(({ theme }) => ({
    ...theme.typography.overline,
    fontWeight: "700",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(0),
    color: theme.palette.text.primary,
    lineHeight: "26px",
    padding: "3px 12px",
    display: "flex",
  }));

  const Icon = icon;
  const itemIcon = <Icon stroke={1.5} size="1.3rem" />;

  return (
    <>
      <ListSubheaderStyle>
        <ListItemIcon
          sx={{
            minWidth: "36px",
            p: "3px 0",
            color: "inherit",
          }}
        >
          {itemIcon}
        </ListItemIcon>
        {item}
      </ListSubheaderStyle>
    </>
  );
};

export default NavAdres;
