import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  gridContainer: {
    marginTop: '120px',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },

  searchButton:{
   margin: theme.spacing(1, 0, 0),
    
      
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
  }
}));
