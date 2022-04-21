import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Tooltip } from '@mui/material';

const EditIcon = () => {
  return (            
    <Tooltip title='Edit your profile'>
    <div style={{
      backgroundColor: 'transparent',
      border: '#577590 4px solid',
      height: '28px',
      width: '28px',
        borderRadius: '10px',
        cursor: 'pointer'
      }}>
      <EditOutlinedIcon
        style={{
          color: '#577590',
          position: 'relative',
          top: '-5px',
          right: '-11px',
          backgroundColor: 'white',
          fontWeight: 'bold'
        }}
      />
    </div>
    </Tooltip>
  )
}

export default EditIcon;