import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { CONFIRMATION_DIALOG_RESOURCES } from '../constants/messages';

export default function ConfirmDialog({
    id,
    isOpen,
    onClose,
    onConfirm,
    title,
    contentText,
    confirmButtonText,
    loading,
    buttonColor = CONFIRMATION_DIALOG_RESOURCES.MATERIAL_BUTTON_COLOR_ERROR
}) {
    return (
        <Dialog
            id={id}
            open={isOpen}
            onClose={onClose}
        >
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent
                style={{
                    padding: '20px 20px 0px 20px'
                }}>
                {contentText && <DialogContentText>
                    {contentText}
                </DialogContentText>}
            </DialogContent>
            <DialogActions
                style={{
                    padding: '15px'
                }}
            >
                <Button
                    onClick={onClose}
                    color="primary"
                    variant='outlined'
                >
                    Cancel
                </Button>
                <Button
                    onClick={onConfirm}
                    variant='contained'
                    color={buttonColor}
                    disabled={loading}
                >
                    {confirmButtonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};