import React from 'react'
import './LinksContainer.scss'
import { Link } from '@mui/material';

export const LinksContainer: React.FC = () => {
  return (
    <div className={'link-container'}>
      <span className={'link-container__header'}>Choose action</span>
      <div className={'link-container__content'}>
        <Link href="/check-certificate">Check certificate</Link>
        <Link href="/add-certificate">Add certificate</Link>
      </div>
    </div>
  )
}
