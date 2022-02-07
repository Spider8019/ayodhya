import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import {
  EmailShareButton,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon,
  FacebookMessengerShareButton
} from "react-share";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton variant="outlined" onClick={handleClickOpen}>
        <ShareIcon/>
      </IconButton>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Share Page
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div className="grid grid-cols-7 gap-4">
              <EmailShareButton url="https://www.google.com">
                   <EmailIcon borderRadius={4}/>
              </EmailShareButton>
              <WhatsappShareButton>
                    <WhatsappIcon borderRadius={4}/>
              </WhatsappShareButton>
              <TelegramShareButton>
                <TelegramIcon  borderRadius={4}/>
              </TelegramShareButton>
              <TwitterShareButton>
                <TwitterIcon  borderRadius={4}/>
              </TwitterShareButton>
              <FacebookShareButton>
                    <FacebookIcon  borderRadius={4}/>
              </FacebookShareButton>
              <PinterestShareButton>
                    <PinterestIcon  borderRadius={4}/>
              </PinterestShareButton>
              <InstapaperShareButton>
                     <InstapaperIcon  borderRadius={4}/>
              </InstapaperShareButton>
              <LinkedinShareButton>
                      <LinkedinIcon  borderRadius={4}/>
              </LinkedinShareButton>
              <OKShareButton>
                   <OKIcon  borderRadius={4}/>
              </OKShareButton>
              <FacebookMessengerShareButton>
                <FacebookMessengerIcon  borderRadius={4}/>
              </FacebookMessengerShareButton>
              <RedditShareButton>
                  <RedditIcon  borderRadius={4}/>
              </RedditShareButton>
              <PocketShareButton>
                <PocketIcon  borderRadius={4}/>
              </PocketShareButton>
              <VKShareButton>
                <VKIcon  borderRadius={4}/>
              </VKShareButton>
              <ViberShareButton>
                <ViberIcon  borderRadius={4}/>
              </ViberShareButton>
          </div>
        </DialogContent>
       
      </BootstrapDialog>
    </div>
  );
}
