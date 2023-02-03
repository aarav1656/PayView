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
        <HStack>
          <Heading as="h4" size="md">
            {/* logo */}
            <Link href={"/"}>PayView</Link>
          </Heading>
          <Flex justify="space-evenly" flex="1">
            <ButtonGroup variant="link" spacing="3">
              {["Create", "View", "About"].map((item) => (
                <Button>
                  <Link href={`/${item.toLocaleLowerCase()}`} key={item}>
                    {item}
                  </Link>
                </Button>
              ))}
            </ButtonGroup>
            <HStack>
              <a>
                <ConnectButton label="Connect" />
              </a>
            </HStack>
          </Flex>
        </HStack>
      </Container>
    </Box>
  );
};
