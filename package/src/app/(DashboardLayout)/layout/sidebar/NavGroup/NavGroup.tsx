import PropTypes from "prop-types";
// mui imports
import { ListSubheader, styled, Theme } from "@mui/material";

type NavGroup = {
  navlabel?: boolean;
  subheader?: string;
};

interface ItemType {
  item: string;
}

const NavGroup = ({ item }: ItemType) => {
  const ListSubheaderStyle = styled((props: Theme | any) => (
    <ListSubheader disableSticky {...props} />
  ))(({ theme }) => ({
    ...theme.typography.overline,
    fontWeight: "1000",
    fontSize: 15,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(0),
    color: theme.palette.text.primary,
    lineHeight: "26px",
    padding: "3px 12px",
  }));
  return <ListSubheaderStyle>{item}</ListSubheaderStyle>;
};

NavGroup.propTypes = {
  item: PropTypes.object,
};

export default NavGroup;
