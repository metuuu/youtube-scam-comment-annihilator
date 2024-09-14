import { LinearProgress, Typography, useTheme } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import * as React from 'react'
import FlexColumn from './FlexColumn'

export default function PromptDialog({
  open,
  onProceed,
  onClose,
  loading,
  progress,
  progressText,
  title,
  text,
  variant,
  proceedButtonText,
}: {
  variant?: 'default' | 'destructive'
  open?: boolean
  loading?: boolean
  /** [0-100] */
  progress?: number
  progressText?: string
  title?: string
  text?: string
  proceedButtonText?: string
  onProceed?: () => void
  onClose?: () => void
}) {
  const theme = useTheme()

  return (
    <React.Fragment>
      <Dialog open={!!open} onClose={!loading ? onClose : undefined}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{text}</DialogContentText>
          {progress != undefined && (
            <FlexColumn>
              {!!progressText && <Typography variant="caption">{progressText}</Typography>}
              <LinearProgress
                color="secondary"
                value={progress}
                variant={progress > 0 ? 'buffer' : undefined}
              />
            </FlexColumn>
          )}
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={onClose}>
            <Typography
              color={variant === 'destructive' ? theme.palette.secondary.main : 'textSecondary'}>
              Cancel
            </Typography>
          </Button>
          <Button disabled={loading} onClick={onProceed} autoFocus>
            <Typography
              color={
                variant === 'destructive'
                  ? theme.palette.primary.dark
                  : theme.palette.secondary.main
              }>
              {proceedButtonText || 'OK'}
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
