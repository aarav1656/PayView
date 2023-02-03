import Link from "next/link";
import { Button } from "@chakra-ui/react";
export default function FourOhFour() {
  return (
    <>
      <h1>You are entering unauthorized zone</h1>
      <Button>
        <Link href="/">Go back home</Link>
      </Button>
    </>
  );
}
