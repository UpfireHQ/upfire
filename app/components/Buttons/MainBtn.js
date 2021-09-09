import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import colors from '../../style/colors';
import fonts from '../../style/font-styles';

const styles = theme => ({
  button: {
    color: colors.titleWhite,
    backgroundColor: colors.buttonBackgroundClolor,
    textTransform: 'inherit',
    fontFamily: fonts.familyMain,
    fontSize: fonts.moreStadartSize,
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: colors.buttonBackgroundHoverClolor,
    },
    height: '56px',
    borderRadius: '6px',
    padding: '0 2.3em 0 2.3em'
  }
});

const MainButton = (props) => {
  const {classes, onClick, title, disabled = false} = props;
  return (
    <Button
      variant="contained"
      className={classes.button}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </Button>
  );
};

MainButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MainButton);
