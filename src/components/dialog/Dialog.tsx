import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
} from '@mui/material'

import { useGameContext } from '../../context'

export const AlertDialog = () => {
    const { dialogData, handleCloseDialog } = useGameContext()
    return (
        <Dialog
            open={dialogData.open}
            onClose={handleCloseDialog}
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                <DialogContentText
                    id="alert-dialog-description"
                    sx={{ display: 'flex', justifyContent: 'center' }}
                >
                    {dialogData.message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog} autoFocus>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    )
}
