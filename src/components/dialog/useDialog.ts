import { useState } from 'react'
import { DialogDataType } from '../../types'

export const useDialog = () => {
    const [dialogData, setDialogData] = useState<DialogDataType>({
        open: false,
        message: '',
    })

    const handleClickOpenDialog = (message: string) => {
        setDialogData({ open: true, message })
    }

    const handleCloseDialog = () => {
        setDialogData({ open: false, message: '' })
    }

    return { dialogData, handleClickOpenDialog, handleCloseDialog }
}
