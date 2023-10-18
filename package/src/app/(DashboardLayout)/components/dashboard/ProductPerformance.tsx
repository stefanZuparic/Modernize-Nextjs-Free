import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  Select,
  MenuItem,
  TableContainer,
} from "@mui/material";
import DashboardCard from "@/app/(DashboardLayout)//components/shared/DashboardCard";
import { useStore } from "@/app/lib/store";
import { green, red } from "@mui/material/colors";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

export const fixFormat = (num: string) => {
  let data = parseFloat(num.replace(/\,/g, "")).toLocaleString("de-DE", {
    minimumFractionDigits: 2,
  });
  return data;
};

const ProductPerformance = () => {
  const {
    dozvola,
    prostor,
    prostori,
    racuni,
    fetchRacuni,
    setRacun,
    fetchServisi,
    godine,
    godina,
    setGodina,
  } = useStore();
  const [select, setSelect] = useState("");

  const handleChangeGodina = (event: any) => {
    setGodina(event.target.value);
    fetchRacuni(dozvola?.obv_id!, prostor?.pro_id!, event.target.value);
  };
  return (
    <DashboardCard
      title="Pregled računa"
      action={
        <Select
          labelId="godina-dd"
          id="godina-dd"
          value={String(godina)}
          size="small"
          onChange={handleChangeGodina}
        >
          {godine.map((godina, index) => (
            <MenuItem value={godina} key={index}>
              {godina}
            </MenuItem>
          ))}
        </Select>
      }
    >
      <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
        <TableContainer sx={{ maxHeight: "745px" }}>
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{
              whiteSpace: "nowrap",
              mt: 2,
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Plaćeno
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Podaci za plaćanje
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Zaduženje
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle2" fontWeight={600}>
                    Saldo
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {racuni.map((racun) => (
                <TableRow
                  selected={racun.mesec === select}
                  key={racun.mesec}
                  onClick={() => {
                    setSelect(racun.mesec);
                    setRacun(racun);
                    fetchServisi(
                      dozvola?.obv_id!,
                      prostor?.pro_id!,
                      racun.rgId,
                      racun.rzId
                    );
                  }}
                >
                  <TableCell>
                    <Avatar
                      sx={
                        racun.saldo === "0.00"
                          ? {
                              bgcolor: green[500],
                              marginRight: 5,
                              marginLeft: 2,
                            }
                          : { bgcolor: red[500], marginRight: 5, marginLeft: 2 }
                      }
                    >
                      {racun.saldo === "0.00" ? <CheckIcon /> : <CloseIcon />}
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <Typography
                          color="textSecondary"
                          sx={{
                            fontSize: "13px",
                          }}
                        >
                          Račun primaoca: {racun.racunPrimaoca}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          sx={{
                            fontSize: "13px",
                          }}
                        >
                          Model plaćanja: {racun.model}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          sx={{
                            fontSize: "13px",
                          }}
                        >
                          Poziv na broj: {racun.pozivNaBroj}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                    >
                      {fixFormat(racun.zaduzenje)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h6">
                      {fixFormat(racun.saldo)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
              {/* {products.map((product) => (
              <TableRow key={product.name}>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  >
                    {product.id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {product.name}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        sx={{
                          fontSize: "13px",
                        }}
                      >
                        {product.post}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography
                    color="textSecondary"
                    variant="subtitle2"
                    fontWeight={400}
                  >
                    {product.pname}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    sx={{
                      px: "4px",
                      backgroundColor: product.pbg,
                      color: "#fff",
                    }}
                    size="small"
                    label={product.priority}
                  ></Chip>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">${product.budget}k</Typography>
                </TableCell>
              </TableRow>
            ))} */}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </DashboardCard>
  );
};

export default ProductPerformance;
