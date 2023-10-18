import React from "react";
// mui imports
import {
  ListItemIcon,
  ListItem,
  List,
  styled,
  ListItemText,
  useTheme,
  ListItemButton,
} from "@mui/material";
import { useStore } from "@/app/lib/store";
import { Dozvola } from "@/app/models/dozvola";

// type NavGroup = {
//   naziv: string;
//   pro_id: number;
//   // [x: string]: any;
//   // id?: string;
//   // navlabel?: boolean;
//   // subheader?: string;
//   // title?: string;
//   // icon?: any;
//   // href?: any;
//   //onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
// };

interface ItemType {
  item: Dozvola;
  // onClick: (event: React.MouseEvent<HTMLElement>) => void;
  hideMenu?: any;
  level?: number | any;
  //pathDirect: string;
  icon: any;
}

const NavItem = ({ item, level, icon }: ItemType) => {
  const Icon = icon;
  const theme = useTheme();
  const itemIcon = <Icon stroke={1.5} size="1.3rem" />;

  const { setDozvola, fetchProstor, fetchRacuni, fetchServisi } = useStore();

  const ListItemStyled = styled(ListItem)(() => ({
    padding: 0,
    ".MuiButtonBase-root": {
      whiteSpace: "nowrap",
      marginBottom: "10px",
      padding: "8px 10px",
      borderRadius: "8px",
      backgroundColor: level > 1 ? "transparent !important" : "inherit",
      color: theme.palette.text.secondary,
      paddingLeft: "20px",
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.main,
      },
      "&.Mui-selected": {
        color: "white",
        backgroundColor: theme.palette.primary.main,
        "&:hover": {
          backgroundColor: theme.palette.primary.main,
          color: "white",
        },
      },
    },
  }));

  return (
    <List component="div" disablePadding key={item.pro_id}>
      <ListItemStyled>
        <ListItemButton
          onClick={() => {
            setDozvola(item);
            fetchProstor(item?.obv_id!).then((prostor) => {
              fetchRacuni(item.obv_id, prostor.pro_id, prostor.godine[0]).then(
                (racun) => {
                  fetchServisi(
                    item.obv_id,
                    prostor.pro_id,
                    racun.rgId,
                    racun.rzId
                  );
                }
              );
            });
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: "36px",
              p: "3px 0",
              color: "black",
            }}
          >
            {itemIcon}
          </ListItemIcon>
          <ListItemText>{item.naziv}</ListItemText>
        </ListItemButton>
      </ListItemStyled>
    </List>
  );
};

export default NavItem;
