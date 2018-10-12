import * as types from '../constants/thermal_action_types';

export function update(data) {
  const temp10th = "cpu0,cpu1,cpu2,cpu3";
  const temp1000th = "bat";
  temp10th.split(',').forEach((temp) => {
    data[`${temp}friendly`] = `${data[temp]/10}°C`;
  });
  temp1000th.split(',').forEach((temp) => {
    data[`${temp}friendly`] = `${data[temp]/1000}°C`;
  });
  

  return {
    type: types.UPDATE,
    payload: data
  }
};