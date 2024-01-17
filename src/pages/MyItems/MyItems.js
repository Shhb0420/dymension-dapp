import React from 'react'
import Navbar from 'pages/Auction/Navbar'
import Container from 'components/Container'
import { useAddress } from '@thirdweb-dev/react'

function MyItems() {
    const address = useAddress();
  return (
    <>
    <Navbar />
    <Container>
        <div>
            <h1>Profile</h1>
            <span>Address: {address && address}</span>
        </div>
    </Container>
    </>
  )
}

export default MyItems