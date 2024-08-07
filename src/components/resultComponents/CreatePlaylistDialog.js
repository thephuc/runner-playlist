import React, {useState} from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const CreatePlaylistDialog = ({handleSubmit}) => {
  const tempo = useSelector(state => state.playlist.tempo);
  const artistSeedList = useSelector(state => state.playlist.artistSeedList);
  const seedArtistNames = artistSeedList.map((artist) => artist?.name)
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
      <Button sx={{margin: 'auto', display: 'block'}}  variant="contained" color='success' onClick={handleClickOpen}>
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
            <Typography align='center' marginTop={2} variant="subtitle1">Tempo: {tempo}</Typography>
            {
              seedArtistNames && seedArtistNames.length > 0 &&
            <Typography align='center' marginTop={2} variant="subtitle1">Artist(s): {seedArtistNames.join(', ')}</Typography>
            }
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
            control={<Checkbox 
              checked={isPublic}
              onChange={handleIsPublicClick}
            />} label="Public Playlist?" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant='contained' color='success' type="submit">Create New Playlist</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}


CreatePlaylistDialog.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
export default CreatePlaylistDialog;