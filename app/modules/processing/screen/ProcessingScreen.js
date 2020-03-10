/* eslint-disable no-alert */
import React, { PureComponent } from 'react';
import {
  View,
  StyleSheet,
  Text,
  BackHandler,
  Animated,
  Easing,
  StatusBar,
} from 'react-native';
import { connect } from 'react-redux';
import { startWorking, stopWorking } from '../../../actions';
// import api from '../../../api';
import api from '../../../mockApi';
import JobState from '../../../global/JobState';
import Colors from '../../../global/Colors';

const ACTION_DELAY_MILLIS = 10 * 1000;

class ProcessingScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
      cancelable: true,
    };
    this.timeoutId = null;
  }

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonPressAndroid,
    );

    Animated.timing(this.state.progress, {
      toValue: 260,
      easing: Easing.in(Easing.ease),
      duration: ACTION_DELAY_MILLIS,
    }).start();

    this.timeoutId = setTimeout(() => {
      this.setState({ cancelable: false }, () => {
        const { jobId, jobState } = this.props.job;
        const { token } = this.props.auth;
        switch (jobState) {
          case JobState.NEW:
            api
              .clockIn(jobId, 0, 0, token)
              .then(response => {
                const time = new Date(response.clock_in_time);
                this.props.dispatch(startWorking(time));
              })
              .catch(err => {
                console.log(err);
                alert(err.message);
              });
            break;
          case JobState.STARTED:
            api
              .clockOut(jobId, 0, 0, token)
              .then(response => {
                const time = new Date(response.timesheet.clock_out_time);
                this.props.dispatch(stopWorking(time));
              })
              .catch(err => {
                console.log(err);
                alert(err.message);
              });
            break;
          default:
            this.setState({ cancelable: true });
            break;
        }
        this.props.navigation.goBack();
      });
    }, ACTION_DELAY_MILLIS);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonPressAndroid,
    );
  }

  handleBackButtonPressAndroid = () => {
    if (!this.props.navigation.isFocused()) {
      // The screen is not focused, so don't do anything
      return false;
    }

    if (this.state.cancelable) {
      this._onPressCancel();
    }
    return true;
  };

  _onPressCancel = () => {
    clearTimeout(this.timeoutId);
    this.props.navigation.goBack();
  };

  render() {
    const jobState = this.props.job.jobState;
    const loadingText =
      jobState === JobState.NEW ? 'Clocking In...' : 'Clocking Out...';
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <Text style={styles.clockText}>{loadingText}</Text>
        <View style={styles.progressBar}>
          <Animated.View
            style={[styles.progress, { width: this.state.progress }]}
          />
        </View>
        <Text style={styles.cancelText} onPress={this._onPressCancel}>
          Cancel
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkBgColor,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clockText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  progressBar: {
    width: 260,
    height: 20,
    backgroundColor: 'white',
    marginVertical: 24,
  },
  progress: {
    width: 0,
    height: 20,
    backgroundColor: Colors.progressColor,
  },
  cancelText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default connect(state => ({
  auth: state.auth,
  job: state.job,
}))(ProcessingScreen);
