import React from 'react'

export default function Org1() {
  return (
    <>
      <Superfluid
        address={ address }
        signer={userProvider && userProvider.getSigner()}
      />
    </>
  )
}
