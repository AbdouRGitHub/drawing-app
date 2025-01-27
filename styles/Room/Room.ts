import { Dimensions, StyleSheet } from 'react-native';
import colors from '../Global/Colors';

const roomStyles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: colors.white_lace
  },
  list: {
    flex: 1
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',

    margin: 10,
  },
  view_display: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d2ebff',
    marginTop: 10,
    marginBottom: 10,
    width: 350,
    height: 35
  },
  button: {
    flex: 1,
    backgroundColor: 'yellow',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'black',
    margin: 1,
  },
  text: {
    flex: 3,
    fontWeight: 'bold'
  },
  modal_container: {
    height: 300,
    width: 300,
    top: "25%",
    left: "10%",
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  modal_submit_button: {
    backgroundColor: 'yellow',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'black',
    width: '20%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default roomStyles;