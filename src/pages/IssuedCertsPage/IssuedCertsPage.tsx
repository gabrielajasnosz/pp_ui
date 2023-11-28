import React, { useEffect, useState } from 'react';
import { BlockchainService } from '../../ethereum/BlockchainService';
import { useMetaMask } from '../../hooks/useMetaMask';
import { CertResponse, Utils } from '../../utils';
import { Input } from '../../components/Input/Input';
import { CertItem } from './CertItem/CertItem';
import {
  CustomSnackbar,
  SnackbarType,
} from '../../components/CustomSnackbar/CustomSnackbar';

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
      <div className={'form-layout'}>
        <h2 className={'form-layout__header'}>List of issued certificates</h2>
        <div className="form-layout__content">
          <Input
            label="Search…"
            required={false}
            onChange={(v) => setSearchQuerry(v)}
          />
          <div>
            {certificates.filter(includesQuerry(searchQuerry)).map((cert) => (
              <CertItem
                key={cert.checksum}
                cert={cert}
                onClick={handleDelete}
              />
            ))}
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
