# App Tracker

### Digital Democracy

### 2023 React Native Developer Technical Interview

# Description

The purpose of this interview is to assess your technical capabilities and skills. We would like to see how you code, your working style, and how you go about solving problems. We do not want you to do much coding ahead of time, as we would like you to discuss what you are doing while we all work on it together. Please do [set up your development environment ahead of time](https://reactnative.dev/docs/environment-setup?guide=native&platform=ios), and make sure your iPhone simulator is running.

During the interview, these are the particular skills that we will be looking out for:

- General React knowledge, in particular managing state and side effects.
- Familiarity with React Native tooling, including Expo and Xcode/podman.
- Familiarity with e2e tests, specifically detox.
- Familiarity with expo build services.
- Git skills including rebasing, merging, and resolving conflicts.
- Documentation skills - we want to make sure that processes and systems created are clearly documented for other to use. We recognize that english may not be your first language, so we are not looking for correct grammar or vocabulary. We simply are looking for whether the steps are documented in a way that another developer can understand and re-create your work.

This technical part of the interview will be 60-70 mins. You do not have to finish all of the assignment. It is more valuable for us to understand how you approach each step, then trying to rush and finish all the tasks. If there are certain things we do not get to, we will have time to discuss how you would approach those problems.

# The Task

More details about the task will be shared during the interview. There will be 4 main aspects

1. We will be setting up a native Expo-Module, and using that module to present some information to the user. This app is a [bare react native app](https://docs.expo.dev/bare/overview/) and therfore requires some configuration in order to use Expo Modules. Please do not do the configuration ahead of time, as we would like to see how you do this.

2. React State Management. Based on the module we use, we will present information on 2 seperate screens.

3. E2e Tests. Create e2e tests to simulate the task we do. These tests should be documented using JSDoc. These e2e test will use Jest and Detox (which are already set up for this project).

4. Run e2e tests on [Eas Build](https://docs.expo.dev/build-reference/e2e-tests/). This will require access to the Digital Democracy Eas build services account, which we will provide during the interview.

# Instructions

To be done before-hand:

- [ ] Fork This Repo. Please make this forked repo private and share it with @achou11 and @ErikSin.
- [ ] Set up the development environment on your local computer. Make sure an iPhone simulator is running.

To be done during the interview:

- [ ] - [ ] Configure Expo to run on iOs, following [manual installation](https://docs.expo.dev/bare/installing-expo-modules/#manual-installation).
- [ ] Install [Expo Location](https://docs.expo.dev/versions/latest/sdk/location/)
- [ ] Create a hook that subscribes to the location of the user. 
- [ ] Optimize the hook: Subscribing to the location can lead to many re-renders in react, as it is constanstly changing due to micro-movements and increasing accuracy. Optimize this hook so that it is debounced and only updates the location every 2 seconds OR update the location when the user has moved more than 15m. You can use [Cheap Ruler](https://www.npmjs.com/package/cheap-ruler) to measure the distance.
- [ ] Print the `lat and lon` on the phone.
- [ ] Write e2e test to reflect what you have just done.
- [ ] Configure e2e tests to run on [Eas Build](https://docs.expo.dev/build-reference/e2e-tests/)

## Run instructions
To see latitude & longitude updates (on an iOS sim):
1. Click on your simulator
1. Go to the native Mac menu bar and select the "Features" tab
1. Go to the "Location" menu item.
1. Select any of the location simulation options (e.g. "Freeway Drive")

## Running Tests
To run e2e tests on iOS run:
```sh
detox build --configuration ios.sim.debug
detox test --configuration ios.sim.debug
```
