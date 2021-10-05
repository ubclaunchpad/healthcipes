# Setup Instructions:

1. cd into healthcipes/frontend
2. start server with `npx react-native start`
3. open a new cli window in the same folder

## iOS:

4. run `npx react-native run-ios`

* For Debugging - cd into ios and run `pod install` and try again

## Android: 

4. run `npx react-native run-android`

* For Debugging - check env paths!
`export ANDROID_HOME=/Users/{yourusername}/Library/Android/sdk
export PATH=$ANDROID_HOME/platform-tools:$PATH
export PATH=$ANDROID_HOME/tools:$PATH`

## Alternative

### iOS:
1. open healthcipes/frontend/ios/healthcipes.xcworkspace in xcode
2. run using the play button in xcode

### Android:
1. open healthcipes/frontend/android in android studios
2. run using the play button in android studios