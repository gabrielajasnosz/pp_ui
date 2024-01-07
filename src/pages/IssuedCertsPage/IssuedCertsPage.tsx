import React, { useEffect, useState } from 'react';
import { BlockchainService } from '../../ethereum/BlockchainService';
import { useMetaMask } from '../../hooks/useMetaMask';
import { CertResponse, Utils } from '../../utils';
import { Input } from '../../components/Input/Input';
import {
  CustomSnackbar,
  SnackbarType,
} from '../../components/CustomSnackbar/CustomSnackbar';
import "./IssuedCertsPage.scss";
import Table from '@mui/material/Table';
import { TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import moment from 'moment'

export const IssuedCertsPage: React.FC = () => {
  const service = new BlockchainService();
  const { wallet } = useMetaMask();
  const [searchQuerry, setSearchQuerry] = useState<string>('');
  const [certificates, setCertificates] = useState<Array<CertResponse>>([]);

  const [snackbar, setSnackbar] = useState<SnackbarType>({
    opened: false,
    message: '',
    messageType: 'success',
  });

  useEffect(() => {
    if (wallet.accounts && wallet.accounts[0]) {
      service.getCertificatesIssuedBy(wallet.accounts[0]).then((r) => {
        setCertificates(r.map(Utils.convertRawToCertResponse));
      });
    }
  }, [wallet.accounts]);

  const handleDelete = (checksum: string) => {
    service
      .invalidateCertificate(checksum)
      .then((_) => {
        setSnackbar({
          opened: true,
          message: 'Certificate was invalidated successfully.',
          messageType: 'success',
        });
        setCertificates(
          certificates.filter((cert) => cert.checksum !== checksum),
        );
      })
      .catch((_) => {
        setSnackbar({
          opened: true,
          message: 'Error while invalidating certificate.',
          messageType: 'error',
        });
      });
  };

  return (
    <div className={'page-layout'}>
      <div className={'form-layout certificates'}>
        <h2 className={'form-layout__header'}>List of issued certificates</h2>
        <div className="form-layout__content">
          <Input
            label="Search…"
            required={false}
            onChange={(v) => setSearchQuerry(v)}
          />
          <div className={'certificates-list'}>
            <Table sx={{ minWidth: 650, marginTop: '30px' }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align='center' sx={{ fontWeight: 'bold'}}>Receiver</TableCell>
                  <TableCell align='center' sx={{ fontWeight: 'bold'}}>Cert name</TableCell>
                  <TableCell align='center' sx={{ fontWeight: 'bold'}}>Expiration date</TableCell>
                  <TableCell align='center' sx={{ fontWeight: 'bold'}}>Checksum</TableCell>
                  <TableCell align='center' sx={{ fontWeight: 'bold'}}>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {certificates.filter(includesQuerry(searchQuerry)).map((cert) => (
                  <TableRow
                    key={cert.checksum}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: '50px !important' }}
                  >
                    <TableCell align='center'>
                      {cert.firstName} {cert.secondName}
                    </TableCell>
                    <TableCell align='center'>{cert.certName}</TableCell>
                    <TableCell align='center'>{moment(cert.expireDate).format('DD-MM-YYYY')}</TableCell>
                    <TableCell align='center' sx={{ display: 'flex', justifyContent: 'center' }}>
                      <div className={'checksum-cell'}>
                        {cert.checksum}
                      </div>
                      </TableCell>
                    <TableCell align='center'>
                      <IconButton
                      aria-label="delete"
                      sx={{ padding: '0px !important'}}
                      onClick={() => handleDelete(cert.checksum)}
                    >
                      <DeleteIcon sx={{ fontSize: '18px', padding: '0px !important'}} />
                    </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <CustomSnackbar
        snackbarValues={snackbar}
        setSnackbarValues={setSnackbar}
      />
    </div>
  );
};

const includesQuerry = (querry: string) => (cert: CertResponse) =>
  `${cert.firstName} ${cert.secondName}`
    .toLowerCase()
    .includes(querry.toLowerCase());
