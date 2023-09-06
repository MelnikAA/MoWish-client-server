import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(23),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    
      
      font: ' bold 1em Segoe UI',
      padding: '10px 3em',
      borderWidth: '0px',
      background: '#FFFFFF',
      borderBottom: '4px solid #00A99D',
      boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.25)',
      borderRadius: '15px',
      color: '#00A99D',
      '&:hover': {
        background: '#FFFFFF',
        border:'rgba(0, 0, 0, 0.25)',
      }
  },
  registr: {
    margin: theme.spacing(3, 0, 2),
    
      
      font: ' bold 1em Segoe UI',
      padding: '10px 3em',
      borderWidth: '0px',
      background: '#FFFFFF',
      borderBottom: '4px solid #DF005A',
      boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.25)',
      borderRadius: '15px',
      color: '#DF005A',
      '&:hover': {
        background: '#FFFFFF',
        border:'rgba(0, 0, 0, 0.25)',
      }
  },
  googleButton: {
    marginBottom: theme.spacing(2),
    //margin: theme.spacing(3, 0, 2),
    
      
      font: ' bold 1em Segoe UI',
      padding: '10px 3em',
      borderWidth: '0px',
      background: '#FFFFFF',
      borderBottom: '4px solid #00A99D',
      boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.25)',
      borderRadius: '15px',
      color: '#00A99D',
      '&:hover': {
        background: '#FFFFFF',
        border:'rgba(0, 0, 0, 0.25)',
      }
  },

  input:{
    borderRadius: '15px',
  }
}));
