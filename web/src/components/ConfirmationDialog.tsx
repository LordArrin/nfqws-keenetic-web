import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

export const ConfirmationDialog = ({
  title,
  description,
  open,
  onClose,
  onSubmit,
}: {
  title: string;
  description: string;
  open: boolean;
  onClose: VoidFunction;
  onSubmit: VoidFunction;
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          No
        </Button>
        <Button
          autoFocus
          onClick={() => {
            onSubmit();
            onClose();
          }}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
