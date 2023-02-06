import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
export const Navbar = () => {
  return (
    <Box as="nav" bg="bg-surface" boxShadow="sm">
      <Container
        py={{
          base: "4",
          lg: "5",
        }}
      >
        <Heading size="lg" style={{ textAlign: "Center" }}>
          {/* logo */}
          <Link href={"/about"}>PayView</Link>
        </Heading>
        <Flex justify="space-evenly" flex="1">
          <ButtonGroup variant="link" spacing="8">
            {["Create", "Marketplace", "View", "About"].map((item) => (
              <Button style={{ fontSize: "20px" }}>
                <Link href={`/${item.toLocaleLowerCase()}`} key={item}>
                  {item}
                </Link>
              </Button>
            ))}
          </ButtonGroup>{" "}
          {"   "}
          {"  "}
          <a>
            <ConnectButton label="Connect" style={{ textAlign: "right" }} />
          </a>
        </Flex>
      </Container>
    </Box>
  );
};
