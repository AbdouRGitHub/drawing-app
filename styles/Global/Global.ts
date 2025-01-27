import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import colors from './Colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const defaultStyles = StyleSheet.create({
  body: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: colors.white_lace,
    width: windowWidth,
    height: windowHeight,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white_lace,
    alignItems: 'flex-end',
    height: 80,
    padding: 2,
    width: windowWidth
  },
   container: {
    flex: 1,
     width: '100%'
   },
  bgGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  link: {
    textAlign: 'center',
    color: '#fff'
  }
});

const styleSettings = {
  field: {
    padding: 15,
    borderRadius: 20
  }

}
export { defaultStyles, styleSettings };