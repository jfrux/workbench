import PropTypes from 'prop-types';
import Temperature from './Temperature';
// BASING COLOR ON THIS LOGIC PULLED FROM OPENPILOT.
// if max_cpu_temp > 107. or bat_temp >= 63.:
//   # onroad not allowed
//   thermal_status = ThermalStatus.danger
// elif max_comp_temp > 95. or bat_temp > 60.:
//   # hysteresis between onroad not allowed and engage not allowed
//   thermal_status = clip(thermal_status, ThermalStatus.red, ThermalStatus.danger)
// elif max_cpu_temp > 90.0:
//   # hysteresis between engage not allowed and uploader not allowed
//   thermal_status = clip(thermal_status, ThermalStatus.yellow, ThermalStatus.red)
// elif max_cpu_temp > 85.0:
//   # uploader not allowed
//   thermal_status = ThermalStatus.yellow
// elif max_cpu_temp > 75.0:
//   # hysteresis between uploader not allowed and all good
//   thermal_status = clip(thermal_status, ThermalStatus.green, ThermalStatus.yellow)
// else:
//   # all good
//   thermal_status = ThermalStatus.green
class ProcessorTemperature extends Temperature {
  getMax = () => {
    return 107; // highest of CPU temps allowed.
  }
  getColor = () => {
    const value = this.getValue();
    if (value > 107) {
      // onroad not allowed
      return 'danger'
    } else if (value > 95) {
      // hysteresis between onroad not allowed and engage not allowed
      return 'danger';
    } else if (value > 90) {
      // hysteresis between engage not allowed and uploader not allowed
      return 'danger';
    } else if (value > 85) {
      // uploader not allowed
      return 'warning';
    } else if (value > 75) {
      // hysteresis between uploader not allowed and all good
      return 'success';
    } else {
      // all good
      return 'success';
    }
  }
};

export default ProcessorTemperature;