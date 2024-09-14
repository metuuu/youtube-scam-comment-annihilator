import { Typography, useTheme } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import * as React from 'react'

export default function AlertDialog({
  open,
  onClose,
  title,
  text,
}: {
  open?: boolean
  title?: string
  text?: string
  onClose?: () => void
}) {
  const theme = useTheme()

  return (
    <React.Fragment>
      <Dialog open={!!open} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose?.()}>
            <Typography color={theme.palette.secondary.main}>OK</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
