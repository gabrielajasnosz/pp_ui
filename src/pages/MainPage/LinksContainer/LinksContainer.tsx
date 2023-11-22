import React from 'react';
import {
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
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useMetaMask } from '../../../hooks/useMetaMask';

export const LinksContainer: React.FC = () => {
  const [manageCertificatesOpened, setManageCertificatesOpened] =
    React.useState(false);
  const [manageIssuersOpened, setManageIssuersOpened] = React.useState(false);
  const { isUserTrustedIssuer } = useMetaMask();

  return (
    <div className={'form-layout'}>
      <span className={'form-layout__header'}>Hello Name!</span>
      <List
        sx={{ width: '100%', maxWidth: 360 }}
        subheader={
          <ListSubheader
            component="div"
            sx={{
              backgroundColor: 'inherit',
              color: 'black',
              fontSize: '16px',
              fontWeight: '500',
              marginTop: '20px',
            }}
          >
            Available actions:
          </ListSubheader>
        }
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
                  href="/invalidate-certificate"
                >
                  <ListItemIcon>
                    <RemoveCircleOutlineIcon />
                  </ListItemIcon>
                  <ListItemText primary="Invalidate certificate" />
                </ListItemButton>
              </List>
            </Collapse>
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
                <ListItemButton sx={{ pl: 4 }} component="a" href="/add-issuer">
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
      </List>
    </div>
  );
};
