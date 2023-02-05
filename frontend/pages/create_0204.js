import { useAccount } from "wagmi";
import { useEffect } from "react";

function Create() {
  const { address } = useAccount();

  console.log(address);

  useEffect(() => {
    canUpload();
  }, []);

  const canUpload = () => {
    if (!address) {
      return <>You need to connect the wallet before you can upload</>;
    }
  };

  return <div>Create </div>;
}

export default Create;
