import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

export const CloseFileDialog = ({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: VoidFunction;
  onSubmit: VoidFunction;
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>File is not saved</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Current file is not saved. Really close?
        </DialogContentText>
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
