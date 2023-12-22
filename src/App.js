import React, { useEffect, useState, useCallback } from "react";
import {
  Navbar,
  Container,
  Nav,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Spinner
} from "react-bootstrap";
import {
  useAddress,
} from "@thirdweb-dev/react";
import wallet from "./wallet";
import Snowfall from 'react-snowfall'
import { ToastContainer, toast, cssTransition } from "react-toastify";
import "./styles/Home.css";
import { Dymension } from "./styles/images";

export default function Home() {
  const [isSuccess, setIsSuccess] = useState({});
  const [address, setAddress] = useState();
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const sendFaucet = async (e) => {
    setIsLoading(true)
    try {
      const transaction = await wallet.sendTransaction({
        to: address,
        value: "1000000000000000000000",
      });
      setIsSuccess({
        success: true,
        message: transaction.hash,
      });
      setIsLoading(false)
      handleClose()
    } catch (error) {
      return {
        success: false,
        message: "Unable to Send Transaction",
      };
    }
  };

  const handleClose = () => {
    setShow(!show)
  //   toast.success(`Tx Hash: ${isSuccess.message}
  //   Wait for a minute`, {
  //     position: "top-right",
  //     autoClose: 10000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "dark",
  //     });
  }
  const handleShow = () => setShow(!show);

  useEffect(() => {

    if(!show && isSuccess.message) {
      toast.success(`Tx Hash: ${isSuccess.message}
        Wait for a minute`, {
          position: "top-right",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
    }

  }, [isSuccess]);
  return (
    <main className="main">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <Snowfall
        color="#e6ebdfd3"
        style={{ background: "#e6ebdf0f" }}
        snowflakeCount={233}
        speed={[.5, 3.0]}
        wind={[.5, 3.0]}
        radius={[.5, 1.5]}
      />
      <div className="container">
        <Navbar bg="none" fixed="top">
          <Container>
            <Navbar.Brand className="">
              {/* <Dymension /> */}
              <h3 className="text-logo">
              Arunika - ARU
              </h3>
            </Navbar.Brand>
            <Nav className="ms-auto">
              <Nav.Link>
                <Button onClick={handleShow} className="btn-style" variant="">Faucet</Button>
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <div className="frame-thirdweb">
          <iframe
            src="https://embed.ipfscdn.io/ipfs/bafybeicd3qfzelz4su7ng6n523virdsgobrc5pcbarhwqv3dj3drh645pi/?contract=0x57b5ae55B6C476D0FAb4b3651bcF15F7e8D14447&chain=%7B%22name%22%3A%22Arunika%22%2C%22chain%22%3A%22%22%2C%22rpc%22%3A%5B%22https%3A%2F%2Ffroopyland.dymension.xyz%2F24%2Farunika_6875752-1%2Fevmrpc%22%5D%2C%22nativeCurrency%22%3A%7B%22symbol%22%3A%22ARU%22%2C%22name%22%3A%22ARU%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22arunika6875752-1%22%2C%22chainId%22%3A6875752%2C%22testnet%22%3Atrue%2C%22slug%22%3A%22arunika6875752-1%22%2C%22icon%22%3A%7B%22url%22%3A%22ipfs%3A%2F%2FQmRNUYPhYmKP5ZpYRE6f3wcgWqEDKbN1Yj4Ao7qVnDo94p%2Fsnow.png%22%2C%22width%22%3A50%2C%22height%22%3A50%2C%22format%22%3A%22%22%7D%7D&clientId=0f3b9b580d02c3a9add61698e2180b5f&theme=dark&primaryColor=cyan"
            width="600px"
            height="600px"
            frameborder="0"
        ></iframe>
        </div>
      </div>
      <Modal size="md" centered show={show} onHide={handleClose}>
        <ModalBody>
          <form>
            <div class="form-group">
              <label for="address" class="col-form-label">
                Address 0x
              </label>
              <input
                type="text"
                class="form-control"
                id="address"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                placeholder="0x1783D2A0b6F2b0e74db3ceEf6C76dd49eF3b36d4"
              />
            </div>
          </form>
          <Button
            className="mt-3"
            variant="primary"
            type="submit"
            onClick={sendFaucet}
          >
            {isLoading ? <Spinner size="sm" /> : "Send Faucet"}
          </Button>
        </ModalBody>
      </Modal>
    </main>
  );
}
