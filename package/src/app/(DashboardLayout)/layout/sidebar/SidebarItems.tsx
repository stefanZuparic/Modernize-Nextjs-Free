import React from "react";
import Menuitems from "./MenuItems";
import { usePathname } from "next/navigation";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup/NavGroup";
import { useSession } from "next-auth/react";
import { useStore } from "@/app/lib/store";
import { IconBuilding, IconMapPinFilled } from "@tabler/icons-react";
import NavAdres from "./NavGroup/NavAdres";

const SidebarItems = ({ toggleMobileSidebar }: any) => {
  const pathname = usePathname();
  const pathDirect = pathname;

  const { data: session } = useSession();
  const { prostori } = useStore();
  let pomAdres: string = "";

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div">
        {session &&
          session.user.dozvole.map((dozvla) => {
            return (
              <>
                <NavGroup item={dozvla.naziv} />

                {prostori &&
                  prostori.map((prostor, index) => {
                    if (index == 0) {
                      pomAdres = prostor.adresa.split(",")[0];
                      return (
                        <>
                          <NavAdres
                            item={prostor.adresa.split(",")[0]}
                            icon={IconMapPinFilled}
                          />
                          <NavItem
                            item={prostor}
                            key={prostor.pro_id}
                            //pathDirect={pathDirect}
                            onClick={toggleMobileSidebar}
                            icon={IconBuilding}
                          />
                        </>
                      );
                    } else {
                      if (pomAdres != prostor.adresa.split(",")[0])
                        return (
                          <>
                            <NavAdres
                              item={prostor.adresa.split(",")[0]}
                              icon={IconMapPinFilled}
                            />
                            <NavItem
                              item={prostor}
                              key={prostor.pro_id}
                              //pathDirect={pathDirect}
                              onClick={toggleMobileSidebar}
                              icon={IconBuilding}
                            />
                          </>
                        );
                    }

                    return (
                      <NavItem
                        item={prostor}
                        key={prostor.pro_id}
                        //pathDirect={pathDirect}
                        onClick={toggleMobileSidebar}
                        icon={IconBuilding}
                      />
                    );
                  })}
              </>
            );
          })}
      </List>
    </Box>
  );
};
export default SidebarItems;

// {Menuitems.map((item) => {
//   // {/********SubHeader**********/}
//   if (item.subheader) {
//     return <NavGroup item={item} key={item.subheader} />;

//     // {/********If Sub Menu**********/}
//     /* eslint no-else-return: "off" */
//   } else {
//     return (
//       <NavItem
//         item={item}
//         key={item.id}
//         pathDirect={pathDirect}
//         onClick={toggleMobileSidebar}
//       />
//     );
//   }
// })}
