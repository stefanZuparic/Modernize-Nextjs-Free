import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
  height: "192px",
  width: "180px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <LinkStyled href="/">
      <Image
        src="/images/logos/logoSingIn.png"
        alt="logo"
        height={192}
        width={192}
        priority
      />
    </LinkStyled>
  );
};

export default Logo;
