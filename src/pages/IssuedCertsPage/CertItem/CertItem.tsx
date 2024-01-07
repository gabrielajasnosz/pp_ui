import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { CertResponse } from '../../../utils';

type Props = {
  cert: CertResponse;
  onClick: (checksum: string) => void;
};

// export const CertItem: React.FC<Props> = ({ cert, onClick }) => (
//   <div
//     secondaryAction={
//
//     }
//   >
//     <ListItemText
//       primary={`${cert.firstName} ${cert.secondName}`}
//       secondary={`Checksum: ${cert.checksum.slice(0, 10)}...`}
//     />
//   </div>
// );
