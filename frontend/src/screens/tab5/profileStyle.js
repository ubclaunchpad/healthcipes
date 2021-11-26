import {StyleSheet} from 'react-native';
import color from '../../styles/color';

export default StyleSheet.create({
  userTitle: {
    fontSize: 23,
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  userName: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'normal',
    alignSelf: 'center',
    marginBottom: 80,
  },
  profilePicture: {
    width: 85,
    height: 85,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 6,
    borderColor: "#365E40",
    marginHorizontal: "23%",
  },
  editprofilePicture: {
    paddingTop: 10,
    width: 85,
    height: 85,
    borderRadius: 150 / 2,
    overflow: "hidden",
    marginVertical: "4%",
    marginBottom: "10%",
    marginHorizontal: "23%",
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  textInput: {
    height: 12,
    marginLeft: 60,
    marginRight: 60,
    borderBottomWidth: 1,
    borderColor: color.gray,
    padding: 10,
  },
  inputTitle: {
    fontSize: 16,
    color: color.gray,
    marginLeft: '15%',
    marginTop: "5%",
    marginBottom: "5%",
  }
});
