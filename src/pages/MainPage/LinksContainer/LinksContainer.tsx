import React from 'react';
import {
  CircularProgress,
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useMetaMask } from '../../../hooks/useMetaMask';
import UploadFileIcon from '@mui/icons-material/UploadFile';

export const LinksContainer: React.FC = () => {
  const [manageCertificatesOpened, setManageCertificatesOpened] =
    React.useState(false);
  const [manageIssuersOpened, setManageIssuersOpened] = React.useState(false);
  const [manageAdminsOpened, setManageAdminsOpened] = React.useState(false);
  const {
    isUserTrustedIssuer,
    isUserAdmin,
    isUserContractOwner,
    isConnecting,
  } = useMetaMask();

  return (
    <div className={'form-layout'}>
      {isConnecting ? (
        <CircularProgress />
      ) : (
        <>
          <span className={'form-layout__header'}>Hello!</span>
          <List
            sx={{ width: '100%', maxWidth: 360 }}
          >
            <ListItemButton component="a" href="/check-certificate">
              <ListItemIcon>
                <CheckCircleOutlineIcon color="success" />
              </ListItemIcon>
              <ListItemText primary="Check Certificate" />
            </ListItemButton>
            {isUserTrustedIssuer && (
              <>
                <Divider />
                <ListItemButton
                  onClick={() =>
                    setManageCertificatesOpened(!manageCertificatesOpened)
                  }
                >
                  <ListItemIcon>
                    <SettingsApplicationsIcon color={'success'} />
                  </ListItemIcon>
                  <ListItemText primary="Manage certificates" />
                  {manageCertificatesOpened ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse
                  in={manageCertificatesOpened}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    <ListItemButton
                      sx={{ pl: 4 }}
                      component="a"
                      href="/add-certificate"
                    >
                      <ListItemIcon>
                        <AddIcon />
                      </ListItemIcon>
                      <ListItemText primary="Add certificate" />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 4 }}
                      component="a"
                      href="/add-certificate-bulk"
                    >
                      <ListItemIcon>
                        <UploadFileIcon />
                      </ListItemIcon>
                      <ListItemText primary="Add certificate from CSV" />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 4 }}
                      component="a"
                      href="/certificate-list"
                    >
                      <ListItemIcon>
                        <ListIcon />
                      </ListItemIcon>
                      <ListItemText primary="List of issued certificates" />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 4 }}
                      component="a"
                      href="/invalidate-certificate"
                    >
                      <ListItemIcon>
                        <RemoveCircleOutlineIcon />
                      </ListItemIcon>
                      <ListItemText primary="Invalidate certificate" />
                    </ListItemButton>
                  </List>
                </Collapse>
              </>
            )}

            {isUserAdmin && (
              <>
                <Divider />
                <ListItemButton
                  onClick={() => setManageIssuersOpened(!manageIssuersOpened)}
                >
                  <ListItemIcon>
                    <ManageAccountsIcon color={'success'} />
                  </ListItemIcon>
                  <ListItemText primary="Manage issuers" />
                  {manageIssuersOpened ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={manageIssuersOpened} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton
                      sx={{ pl: 4 }}
                      component="a"
                      href="/add-issuer"
                    >
                      <ListItemIcon>
                        <PersonAddIcon />
                      </ListItemIcon>
                      <ListItemText primary="Add issuer" />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 4 }}
                      component="a"
                      href="/remove-issuer"
                    >
                      <ListItemIcon>
                        <PersonRemoveIcon />
                      </ListItemIcon>
                      <ListItemText primary="Remove issuer" />
                    </ListItemButton>
                  </List>
                </Collapse>
              </>
            )}

            {isUserContractOwner && (
              <>
                <Divider />
                <ListItemButton
                  onClick={() => setManageAdminsOpened(!manageAdminsOpened)}
                >
                  <ListItemIcon>
                    <ManageAccountsIcon color={'success'} />
                  </ListItemIcon>
                  <ListItemText primary="Manage admins" />
                  {manageAdminsOpened ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={manageAdminsOpened} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton
                      sx={{ pl: 4 }}
                      component="a"
                      href="/add-admin"
                    >
                      <ListItemIcon>
                        <PersonAddIcon />
                      </ListItemIcon>
                      <ListItemText primary="Add admin" />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 4 }}
                      component="a"
                      href="/remove-admin"
                    >
                      <ListItemIcon>
                        <PersonRemoveIcon />
                      </ListItemIcon>
                      <ListItemText primary="Remove admin" />
                    </ListItemButton>
                  </List>
                </Collapse>
              </>
            )}
          </List>
        </>
      )}
    </div>
  );
};
