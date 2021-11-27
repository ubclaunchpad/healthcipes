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
  editprofilepictureContainer: {
    alignSelf: 'center',
    height: '10%',
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '7%',
  },
  editprofilePicture: {
    width: '90%',
    height: '90%',
    borderRadius: 50, /* Requires overwork: hidden*/
  },
  editprofilepicturebutton: {
    marginTop: '80%',
    marginLeft: '60%',
  },
  textInput: {
    height: 12,
    marginLeft: 60,
    marginRight: 60,
    borderBottomWidth: 1,
    borderColor: color.gray,
    padding: 8,
  },
  inputTitle: {
    fontSize: 16,
    color: color.gray,
    marginLeft: '15%',
    marginTop: "5%",
    marginBottom: "5%",
  },
  dietarybutton: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: color.gray,
    padding: "2%",
    paddingHorizontal: "8%",
    marginRight: "2%",
  }
});
