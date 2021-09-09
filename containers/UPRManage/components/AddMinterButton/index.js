import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import colors from '../../../../style/colors';
import fonts from '../../../../style/font-styles';
import trans from '../../../../translations';

const styles = () => ({
  button: {
    color: colors.titleWhite,
    backgroundColor: colors.mainRed,
    textTransform: 'inherit',
    fontFamily: fonts.familyMain,
    fontSize: fonts.standardSize,
    height: 38,
    width: 136,
    '&:hover': {
      backgroundColor: colors.hoverRed
    }
  },
  icon: {
    color: colors.titleWhite,
    fontSize: '12px',
    marginRight: '.8em'
  }
});

function AddMinterButton(props) {
  const { classes, onClick } = props;
  return (
    <Button variant="contained" className={classes.button} onClick={onClick}>
      <Icon className={`icon-plus ${classes.icon}`} />
      {trans('manageupr.button.addMinter')}
    </Button>
  );
}

AddMinterButton.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func
};

export default withStyles(styles)(AddMinterButton);
