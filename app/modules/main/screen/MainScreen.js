/* eslint-disable react-native/no-inline-styles */
import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { connect } from 'react-redux';
import { login } from '../../../actions';
// import api from '../../../api';
import api from '../../../mockApi';
import Images from '../../../global/Images';
import Colors from '../../../global/Colors';
import Dimens from '../../../global/Dimens';
import JobState from '../../../global/JobState';

class MainScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      position: '',
      clientName: '',
      wageAmount: '',
      wageType: '',
      address: '',
      managerName: '',
      managerPhone: '',
    };
  }

  async componentDidMount() {
    try {
      let token = this.props.auth.token;
      console.log(token);
      if (!token) {
        token = await api.login('+6281313272005', 'alexander');
        this.props.dispatch(login(token));
      }
      const { jobId } = this.props.job;
      const response = await api.fetchJob(jobId, token);
      setTimeout(() => {
        this.setState({
          position: response.position.name,
          clientName: response.client.name,
          wageAmount: Math.round(response.wage_amount)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
          wageType: response.wage_type.replace('_', ' '),
          address: response.location.address.street_1,
          managerName: response.manager.name,
          managerPhone: response.manager.phone,
        });
      }, 0);
    } catch (err) {
      console.log('error', err);
    }
  }

  _onPressClock = () => {
    this.props.navigation.navigate('ProcessingScreen');
  };

  render() {
    const {
      position,
      clientName,
      wageAmount,
      wageType,
      address,
      managerName,
      managerPhone,
    } = this.state;
    const jobState = this.props.job.jobState;
    const clockIn = this.props.job.clockIn
      ? formatTime(this.props.job.clockIn)
      : '-';
    const clockOut = this.props.job.clockOut
      ? formatTime(this.props.job.clockOut)
      : '-';
    const clockText = jobState === JobState.NEW ? 'Clock In' : 'Clock Out';
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.jobTitle}>{position}</Text>
            <Text style={styles.clientName}>{clientName}</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Text style={styles.wageAmount}>{'Rp ' + wageAmount}</Text>
            <Text style={styles.wageType}>{wageType}</Text>
          </View>
        </View>
        <View style={styles.line}>
          <Image
            style={styles.icon}
            source={Images.addressIcon}
            resizeMode="contain"
          />
          <Text style={styles.descText}>{address}</Text>
        </View>
        <View style={styles.line}>
          <Image
            style={styles.icon}
            source={Images.personIcon}
            resizeMode="contain"
          />
          <Text style={styles.descText}>Location Manager</Text>
          <Text style={styles.descText}>{managerName}</Text>
        </View>
        <View style={styles.line}>
          <Image
            style={styles.icon}
            source={Images.phoneIcon}
            resizeMode="contain"
          />
          <Text style={styles.descText}>Contact Number</Text>
          <Text style={[styles.descText, { textDecorationLine: 'underline' }]}>
            {managerPhone}
          </Text>
        </View>
        <View style={[styles.line, { marginTop: 24 }]}>
          <Text style={styles.descText}>Clock In</Text>
          <Text style={styles.descText}>Clock Out</Text>
        </View>
        <View style={styles.line}>
          <Text style={styles.clock}>{clockIn}</Text>
          <Text style={styles.clock}>{clockOut}</Text>
        </View>
        {jobState !== JobState.FINISHED && (
          <TouchableOpacity
            style={styles.clockButton}
            onPress={this._onPressClock}>
            <Text style={styles.clockButtonText}>{clockText}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

function formatTime(time) {
  console.log(time);
  let hour = time.getHours();
  let min = time.getMinutes();
  let ampm = 'am';
  if (hour > 12) {
    hour -= 12;
    ampm = 'pm';
  }
  if (hour < 10) {
    hour = '0' + hour;
  }
  if (min < 10) {
    min = '0' + min;
  }

  return `${hour}:${min}${ampm}`;
}

const styles = StyleSheet.create({
  container: {
    paddingStart: Dimens.screenPadding,
    paddingEnd: Dimens.screenPadding,
    flex: 1,
    backgroundColor: Colors.lightBgColor,
  },
  header: {
    marginTop: getStatusBarHeight() + 55,
    flexDirection: 'row',
  },
  jobTitle: {
    color: Colors.textColor,
    fontSize: 22,
    fontWeight: 'bold',
  },
  clientName: {
    color: Colors.textColor,
    fontSize: 15,
    fontWeight: 'bold',
  },
  wageAmount: {
    color: Colors.textColor,
    fontSize: 15,
    fontWeight: 'bold',
    lineHeight: 22,
  },
  wageType: {
    color: Colors.textColor,
    fontSize: 12,
    fontWeight: 'bold',
  },
  line: {
    flexDirection: 'row',
    marginTop: 12,
  },
  descText: {
    flex: 1,
    color: Colors.textColor,
    lineHeight: 22,
    fontSize: 13,
  },
  clock: {
    flex: 1,
    color: Colors.textColor,
    fontSize: 25,
    fontWeight: 'bold',
  },
  icon: {
    width: 13,
    height: 13,
    marginTop: 5,
    marginEnd: 8,
  },
  clockButton: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 17.5,
    borderColor: '#7F7F7F',
    marginTop: 60,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  clockButtonText: {
    color: Colors.textColor,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default connect(state => ({
  auth: state.auth,
  job: state.job,
}))(MainScreen);
