import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    display: 'flex',
    flexDirection: 'row',
   justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    

    padding: '10px 50px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },

  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch"
    }},

  heading: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontSize: '2em',
    fontWeight: 300,
  },
  image: {
    marginLeft: '10px',
    marginTop: '5px',
  },
  toolbar: {
    display: 'flex',
    flexWrap: 'nowrap',
    //width: '500px',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    //width: '400px',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      marginTop: 20,
      justifyContent: 'center',
    },
  },
  logout: {
   // marginTop: '10px',
    marginLeft: '20px',
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
  add: {
    font: ' bold 1em Segoe UI',
    padding: '10px 2em',
    whiteSpace: 'nowrap',
    marginLeft: '20px',
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
  userName: {
    display: 'flex',
    paddingLeft: '10px',
    alignItems: 'center',
    textAlign: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));
