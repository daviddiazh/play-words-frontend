import { CircularProgress, useTheme } from '@mui/material'
import styles from './styles.module.css'

export const Loading = () => {

  const theme = useTheme();

  return (
    <div 
        className={styles.container}
        style={{ backgroundColor: theme.palette.background.paper }}
    >
        <CircularProgress />
    </div>
  )
}
