import React, {useState} from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Checkbox, FormControlLabel } from '@mui/material';
import { useSelector } from 'react-redux';

const CreatePlaylistDialog = ({handleSubmit}) => {
  const tempo = useSelector(state => state.playlist.tempo);
  const selectedGenreList = useSelector(state => state.playlist.selectedGenreList);
  const [open, setOpen] = useState(false);
  const [isPublic, setIsPublic] = useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleIsPublicClick = (e) => {
    setIsPublic(e.target.checked);
  }

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create new playlist
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const formJson = Object.fromEntries((formData).entries());
            const data = { ...formJson, isPublic}
            handleSubmit(data)
            handleClose();
          },
        }}
      >
        <DialogTitle>Create new playlist with selected songs</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create a new playlist with tempo {tempo} {selectedGenreList && selectedGenreList.length > 0 && `and genre(s) ${selectedGenreList.join(', ')}`}
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Playlist Name"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="description"
            name="description"
            label="Playlist Description"
            multiline
            fullWidth
            variant="standard"
          />
          <FormControlLabel 
            labelPlacement="start"
            required 
            control={<Checkbox 
              checked={isPublic}
              onChange={handleIsPublicClick}
            />} label="Public Playlist?" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Create New Playlist</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}


CreatePlaylistDialog.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
export default CreatePlaylistDialog;