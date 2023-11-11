import React from 'react'
import './AddCertPage.scss'
import { AddCertificateForm } from '../AddCertPage/AddCertificateForm/AddCertificateForm'
import { ConnectMetaMaskButton } from '../MainPage/ConnectMetaMaskButton/ConnectMetaMaskButton'
import { useMetaMask } from '../../hooks/useMetaMask'

export const AddCertPage = () => {
  const {
    wallet: { accounts },
    hasProvider,
  } = useMetaMask()

  const isConnected = React.useMemo(
    () => hasProvider && accounts.length > 0,
    [hasProvider, accounts]
  )

  return (
    <div className={'main-page'}>
      {isConnected ? <AddCertificateForm /> : <ConnectMetaMaskButton />}
    </div>
  )
}
