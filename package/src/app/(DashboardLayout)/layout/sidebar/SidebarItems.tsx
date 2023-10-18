import React from "react";
import Menuitems from "./MenuItems";
import { usePathname } from "next/navigation";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup/NavGroup";
import { useSession } from "next-auth/react";
import { useStore } from "@/app/lib/store";
import { IconUserCircle } from "@tabler/icons-react";
import NavAdres from "./NavGroup/NavAdres";
import { createDozvolaSlice } from "@/app/lib/slices/createDozvolaSlice";

const SidebarItems = ({ toggleMobileSidebar }: any) => {
  const pathname = usePathname();
  const pathDirect = pathname;

  const { data: session } = useSession();
  const { prostori } = useStore();
  let pomAdres: string = "";

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div">
        <NavGroup item={"OBVEZNICI: "} />
        {session &&
          session.user.dozvole.map((dozvla) => (
            <NavItem
              item={dozvla}
              key={dozvla.pro_id}
              //pathDirect={pathDirect}
              // onClick={toggleMobileSidebar}
              icon={IconUserCircle}
            />
          ))}
      </List>
    </Box>
  );
};
export default SidebarItems;

// return (
//   <>
//     <NavGroup item={dozvla.naziv} />

//     {prostori &&
//       prostori.map((prostor, index) => {
//         if (index == 0) {
//           pomAdres = prostor.adresa.split(",")[0];
//           return (
//             <>
//               <NavAdres
//                 item={prostor.adresa.split(",")[0]}
//                 icon={IconMapPinFilled}
//               />
//               <NavItem
//                 item={prostor}
//                 key={prostor.pro_id}
//                 //pathDirect={pathDirect}
//                 onClick={toggleMobileSidebar}
//                 icon={IconBuilding}
//               />
//             </>
//           );
//         } else {
//           if (pomAdres != prostor.adresa.split(",")[0])
//             return (
//               <>
//                 <NavAdres
//                   item={prostor.adresa.split(",")[0]}
//                   icon={IconMapPinFilled}
//                 />
//                 <NavItem
//                   item={prostor}
//                   key={prostor.pro_id}
//                   //pathDirect={pathDirect}
//                   onClick={toggleMobileSidebar}
//                   icon={IconBuilding}
//                 />
//               </>
//             );
//         }

//         return (
//           <NavItem
//             item={prostor}
//             key={prostor.pro_id}
//             //pathDirect={pathDirect}
//             onClick={toggleMobileSidebar}
//             icon={IconBuilding}
//           />
//         );
//       })}
//   </>
// );
