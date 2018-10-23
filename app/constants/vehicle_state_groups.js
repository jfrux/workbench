/*
 * None of this is clearly defined and there really isn't necessarily a plan.
 * As a community we should come up with the most sensible setup for what we find
 * to be the most useful HUD / Interface to view EON and Openpilot state.
*/
export default {
  "Thermal": [
    // ["Overview", [
    //   ["EON Temp", ["eonDetail","Thermal","batfriendly"], "DashboardBubble"],
    //   ["Storage", ["eonDetail","Thermal","usedSpaceFriendly"], "DashboardBubble"]
    // ], "Dashboard"],
    // ["System", [
    //   ["EON Uptime", ["system","uptimeFriendly"], "Base"],
    //   ["Network Down", ["system","networkUsage", "rxFriendly"], "Base"],
    //   ["Network Up", ["system","networkUsage", "txFriendly"], "Base"],
    // ],"Base"]
    // ["Battery", [
    //   ["Temperature", ["thermal","batfriendly"], "Temperature"],
    //   ["Percent", ["thermal","batteryPercent"], "ProgressBar"],
    //   ["Status", ["thermal","batteryStatus"], "Base"],
    //   ["Current", ["thermal","batteryCurrent"], "Base"],
    //   ["Voltage", ["thermal","batteryVoltage"], "Base"]
    // ],"Base"],
    // ["Processors", [
    //   ["cpu0", ["thermal","cpu0friendly"], "ProcessorTemperature"],
    //   ["cpu1", ["thermal","cpu1friendly"], "ProcessorTemperature"],
    //   ["cpu2", ["thermal","cpu2friendly"], "ProcessorTemperature"],
    //   ["cpu3", ["thermal","cpu3friendly"], "ProcessorTemperature"],
    //   ["gpu", ["thermal","gpufriendly"], "ProcessorTemperature"]
    // ], "Base"],
    // ["GPS", [
    //   ["Source", ["eonDetail","gpsLocation","source"], "Base"],
    //   ["Accuracy", ["eonDetail","gpsLocation","accuracy"], "Base"],
    //   ["Altitude", ["eonDetail","gpsLocation","altitude"], "Base"],
    //   ["Bearing", ["eonDetail","gpsLocation","bearing"], "Base"],
    //   ["Bearing Accuracy", ["eonDetail","gpsLocation","bearingAccuracy"], "Base"],
    //   ["Flags", ["eonDetail","gpsLocation","flags"], "Base"],
    //   ["Latitude", ["eonDetail","gpsLocation","latitude"], "Base"],
    //   ["Longitude", ["eonDetail","gpsLocation","longitude"], "Base"],
    //   ["Speed", ["eonDetail","gpsLocation","speed"], "Base"],
    //   ["Speed Accuracy", ["eonDetail","gpsLocation","speedAccuracy"], "Base"],
    //   ["Timestamp", ["eonDetail","gpsLocation","timestamp"], "Base"],
    //   ["Vertical Accuracy", ["eonDetail","gpsLocation","verticalAccuracy"], "Base"]
    // ], "Base"],
    // ["Storage and Memory", [
    //   ["Used", ["thermal","usedSpaceFriendly"], "ProgressBar"],
    //   ["Memory Used", ["thermal","mem"], "Memory"]
    // ], "Base"]
  ],
  
  "CarState": [
  //   ["Overview", [
  //     ["EON Temp", ["thermal","batfriendly"], "DashboardBubble"],
  //     ["Storage", ["thermal","usedSpaceFriendly"], "DashboardBubble"]
  //   ], "Dashboard"],
  //   ["System", [
  //     ["EON Uptime", ["system","uptimeFriendly"], "Base"],
  //     ["Network Down", ["system","networkUsage", "rxFriendly"], "Base"],
  //     ["Network Up", ["system","networkUsage", "txFriendly"], "Base"],
  //   ],"Base"],
  //   ["Battery", [
  //     ["Temperature", ["thermal","batfriendly"], "Temperature"],
  //     ["Percent", ["thermal","batteryPercent"], "ProgressBar"],
  //     ["Status", ["thermal","batteryStatus"], "Base"],
  //     ["Current", ["thermal","batteryCurrent"], "Base"],
  //     ["Voltage", ["thermal","batteryVoltage"], "Base"]
  //   ],"Base"],
  //   ["Processors", [
  //     ["cpu0", ["thermal","cpu0friendly"], "ProcessorTemperature"],
  //     ["cpu1", ["thermal","cpu1friendly"], "ProcessorTemperature"],
  //     ["cpu2", ["thermal","cpu2friendly"], "ProcessorTemperature"],
  //     ["cpu3", ["thermal","cpu3friendly"], "ProcessorTemperature"],
  //     ["gpu", ["thermal","gpufriendly"], "ProcessorTemperature"]
  //   ], "Base"],
  //   ["GPS", [
  //     ["Source", ["eonDetail","gpsLocation","source"], "Base"],
  //     ["Accuracy", ["eonDetail","gpsLocation","accuracy"], "Base"],
  //     ["Altitude", ["eonDetail","gpsLocation","altitude"], "Base"],
  //     ["Bearing", ["eonDetail","gpsLocation","bearing"], "Base"],
  //     ["Bearing Accuracy", ["eonDetail","gpsLocation","bearingAccuracy"], "Base"],
  //     ["Flags", ["eonDetail","gpsLocation","flags"], "Base"],
  //     ["Latitude", ["eonDetail","gpsLocation","latitude"], "Base"],
  //     ["Longitude", ["eonDetail","gpsLocation","longitude"], "Base"],
  //     ["Speed", ["eonDetail","gpsLocation","speed"], "Base"],
  //     ["Speed Accuracy", ["eonDetail","gpsLocation","speedAccuracy"], "Base"],
  //     ["Timestamp", ["eonDetail","gpsLocation","timestamp"], "Base"],
  //     ["Vertical Accuracy", ["eonDetail","gpsLocation","verticalAccuracy"], "Base"]
  //   ], "Base"],
  //   ["Storage and Memory", [
  //     ["Used", ["thermal","usedSpaceFriendly"], "ProgressBar"],
  //     ["Memory Used", ["thermal","mem"], "Memory"]
  //   ], "Base"]
  ],
  "CarControl": [
  //   ["Overview",[
  //     ["Pedal",["eonDetail","health","gasInterceptorDetected"], "DashboardCircle"],
  //     ["Grey Panda",["eonDetail","health","isGreyPanda"], "DashboardCircle"],
  //     ["Brake Ctrl.", ["eonDetail","openpilotParams","car","stoppingControl"], "DashboardCircle"],
  //     ["Lng. Ctrl.", ["eonDetail","openpilotParams","car","directAccelControl"], "DashboardCircle"],
      
  //     ["Engaged", ["carControl","enabled"], "DashboardCircle"]
  //   ],"Dashboard"],
  //   ["HUD",[
  //     ["Max Speed", ["carControl","hudControlSetSpeed"], "DashboardBubble"],
  //     ["Lead Visible", ["carControl","hudControlLeadVisible"], "DashboardCircle"],
  //     ["Lanes Visible", ["carControl","hudControlLanesVisible"], "DashboardCircle"],
  //     ["Speed Visible", ["carControl","hudControlSpeedVisible"], "DashboardCircle"]
  //   ], "Dashboard"],
  //   ["vehicle",[
  //     ["Fingerprint", ["eonDetail","fingerprintFriendly"], "Textarea"],
  //     ["SteerKpV", ["eonDetail","openpilotParams","car","steerKpV"], "ArrayOfValues"],
  //     ["safetyParam", ["eonDetail","openpilotParams","car","safetyParam"], "Base"],
  //     ["SteerRatioRear", ["eonDetail","openpilotParams","car","steerRatioRear"], "Base"],
  //     ["SteerMaxV", ["eonDetail","openpilotParams","car","steerMaxV"], "ArrayOfValues"],
  //     ["SteerKiV", ["eonDetail","openpilotParams","car","steerKiV"], "ArrayOfValues"],
  //     ["SteerKf", ["eonDetail","openpilotParams","car","steerKf"], "Base"],
  //     ["SteerKpBP", ["eonDetail","openpilotParams","car","steerKpBP"], "ArrayOfValues"],
  //     ["carFingerprint", ["eonDetail","openpilotParams","car","carFingerprint"], "Base"],
  //     ["SteerLimitAlert", ["eonDetail","openpilotParams","car","steerLimitAlert"], "Boolean"],
  //     ["minEnableSpeed", ["eonDetail","openpilotParams","car","minEnableSpeed"], "Base"],
  //     ["enableGasInterceptor", ["eonDetail","openpilotParams","car","enableGasInterceptor"], "Boolean"],
  //     ["SteerControlType", ["eonDetail","openpilotParams","car","steerControlType"], "Base"],
  //     ["radarOffCan", ["eonDetail","openpilotParams","car","radarOffCan"], "Boolean"],
  //     ["SteerRatio", ["eonDetail","openpilotParams","car","steerRatio"], "Base"],
  //     ["brakeMaxBP", ["eonDetail","openpilotParams","car","brakeMaxBP"], "ArrayOfValues"],
  //     ["enableCamera", ["eonDetail","openpilotParams","car","enableCamera"], "Boolean"],
  //     ["enableCruise", ["eonDetail","openpilotParams","car","enableCruise"], "Boolean"],
  //     ["tireStiffnessFront", ["eonDetail","openpilotParams","car","tireStiffnessFront"], "Base"],
  //     ["minSteerSpeed", ["eonDetail","openpilotParams","car","minSteerSpeed"], "Base"],
  //     ["longitudinalKiBP", ["eonDetail","openpilotParams","car","longitudinalKiBP"], "Base"],
  //     ["stoppingControl", ["eonDetail","openpilotParams","car","stoppingControl"], "Boolean"],
  //     ["longPidDeadzoneBP", ["eonDetail","openpilotParams","car","longPidDeadzoneBP"], "Base"],
  //     ["enableDsu", ["eonDetail","openpilotParams","car","enableDsu"], "Boolean"],
  //     ["gasMaxBP", ["eonDetail","openpilotParams","car","gasMaxBP"], "Base"],
  //     ["enableApgs", ["eonDetail","openpilotParams","car","enableApgs"], "Boolean"],
  //     ["longitudinalKiV", ["eonDetail","openpilotParams","car","longitudinalKiV"], "Base"],
  //     ["enableBrakeDEPRECATED", ["eonDetail","openpilotParams","car","enableBrakeDEPRECATED"], "Boolean"],
  //     ["longPidDeadzoneV", ["eonDetail","openpilotParams","car","longPidDeadzoneV"], "Base"],
  //     ["carName", ["eonDetail","openpilotParams","car","carName"], "Base"],
  //     ["safetyModel", ["eonDetail","openpilotParams","car","safetyModel"], "Base"],
  //     ["SteerKiBP", ["eonDetail","openpilotParams","car","steerKiBP"], "Base"],
  //     ["SteerMaxBP", ["eonDetail","openpilotParams","car","steerMaxBP"], "Base"],
  //     ["gasMaxV", ["eonDetail","openpilotParams","car","gasMaxV"], "Base"],
  //     ["longitudinalKpV", ["eonDetail","openpilotParams","car","longitudinalKpV"], "Base"],
  //     ["SteerRateCost", ["eonDetail","openpilotParams","car","steerRateCost"], "Base"],
  //     ["brakeMaxV", ["eonDetail","openpilotParams","car","brakeMaxV"], "ArrayOfValues"],
  //     ["tireStiffnessRear", ["eonDetail","openpilotParams","car","tireStiffnessRear"], "Base"],
  //     ["vEgoStopping", ["eonDetail","openpilotParams","car","vEgoStopping"], "Base"],
  //     ["centerToFront", ["eonDetail","openpilotParams","car","centerToFront"], "Base"],
  //     ["enableSteerDEPRECATED", ["eonDetail","openpilotParams","car","enableSteerDEPRECATED"], "Boolean"],
  //     ["longitudinalKpBP", ["eonDetail","openpilotParams","car","longitudinalKpBP"], "Base"],
  //     ["SteerKiDEPRECATED", ["eonDetail","openpilotParams","car","steerKiDEPRECATED"], "Base"],
  //     ["startAccel", ["eonDetail","openpilotParams","car","startAccel"], "Base"],
  //     ["wheelbase", ["eonDetail","openpilotParams","car","wheelbase"], "Base"],
  //     ["SteerKpDEPRECATED", ["eonDetail","openpilotParams","car","steerKpDEPRECATED"], "Base"],
  //     ["rotationalInertia", ["eonDetail","openpilotParams","car","rotationalInertia"], "Base"],
  //     ["mass", ["eonDetail","openpilotParams","car","mass"], "Base"],
  //     ["SteerActuatorDelay", ["eonDetail","openpilotParams","car","steerActuatorDelay"], "Base"],
  //     ["directAccelControl", ["eonDetail","openpilotParams","car","directAccelControl"], "Boolean"]
  //   ], "Base"],
  //   ["Params",[
  //     ["Passive", ["eonDetail","openpilotParams","passive"], "Boolean"],
  //     ["Metric", ["eonDetail","openpilotParams","is_metric"], "Boolean"]
  //   ], "Base"],
  //   ["Health", [
  //     ["Gas Interceptor Detected",["eonDetail","health","gasInterceptorDetected"], "Boolean"],
  //     ["controlsAllowed",["eonDetail","health","controlsAllowed"], "Boolean"],
  //     ["started",["eonDetail","health","started"], "Boolean"],
  //     ["current",["eonDetail","health","current"], "Base"],
  //     ["startedSignalDetected",["eonDetail","health","startedSignalDetected"], "Boolean"],
  //     ["isGreyPanda",["eonDetail","health","isGreyPanda"], "Boolean"],
  //     ["voltage",["eonDetail","health","voltage"], "Base"]
  //   ], "Base"],
    
  //   ["hud",[
  //     ["Lead Visible", ["carControl","hudControlLeadVisible"], "Boolean"],
  //     ["setSpeed", ["carControl","hudControlSetSpeed"], "Base"],
  //     ["lanesVisible", ["carControl","hudControlLanesVisible"], "Boolean"],
  //     ["visualAlert", ["carControl","hudControlVisualAlert"], "Base"],
  //     ["audibleAlert", ["carControl","hudControlAudibleAlert"], "Base"],
  //     ["speedVisible", ["carControl","hudControlSpeedVisible"], "Boolean"],
  //     ["enabled", ["carControl","enabled"], "Boolean"]
  //   ], "Base"],
  //   ["started", [
  //     ["started", ["thermal","started"], "Base"],
  //     ["startedTs", ["thermal","startedTs"], "Base"]
  //   ], "Base"]
  ]
  // "vehicle": [
  //   ["Steering", [
  //     ["angle", ["carState","steeringAngle"], "Base"],
  //     ["rate", ["carState","steeringRate"], "Base"],
  //     ["pressed", ["carState","steeringPressed"], "Boolean"],
  //     ["torque", ["carState","steeringTorque"], "Base"],
  //     ["turnSignalRight", ["carState","rightBlinker"], "Base"],
  //     ["turnSignalLeft", ["carState","leftBlinker"], "Base"],
  //     ["actuatorAngle", ["carControl","actuatorSteerAngle"], "Base"],
  //     ["actuator", ["carControl","actuatorSteer"], "Base"],
  //     ["SteeringTorqueDEPRECATED", ["carControl","steeringTorqueDEPRECATED"], "Base"]
  //   ], "Base"],
  //   ["acceleration", [
  //     ["gas", ["carState","gas"], "Base"],
  //     ["gasPressed", ["carState","gasPressed"], "Base"],
  //     ["wheelSpeedFL", ["carState","wheelSpeedFL"], "Base"],
  //     ["wheelSpeedFR", ["carState","wheelSpeedFR"], "Base"],
  //     ["wheelSpeedRL", ["carState","wheelSpeedRL"], "Base"],
  //     ["wheelSpeedRR", ["carState","wheelSpeedRR"], "Base"],
  //     ["standstill", ["carState","standstill"], "Base"],
  //     ["actuator", ["carControl","actuatorGas"], "Base"],
  //     ["vEgoRaw", ["carState","vEgoRaw"], "Base"],
  //     ["vEgo", ["carState","vEgo"], "Base"],
  //     ["aEgo", ["carState","aEgo"], "Base"],
  //     ["gasDEPRECATED", ["carControl","gasDEPRECATED"], "Base"]
  //   ], "Base"],
  //   ["braking", [
  //     ["brake", ["carState","brake"], "Base"],
  //     ["lights", ["carState","brakeLights"], "Base"],
  //     ["pressed", ["carState","brakePressed"], "Base"],
  //     ["actuator", ["carControl","actuatorBrake"], "Base"],
  //     ["brakeDEPRECATED", ["carControl","brakeDEPRECATED"], "Base"]
  //   ], "Base"],
  //   ["gearing", [
  //     ["shifterPosition", ["carState","gearShifter"], "Base"]
  //   ], "Base"],
  //   ["safety", [
  //     ["seatbeltUnlatched", ["carState","seatbeltUnlatched"], "Base"],
  //     ["doorOpen", ["carState","doorOpen"], "Base"]
  //   ], "Base"],
  //   ["buttons", [
  //     ["buttonEvents", ["carState","buttonEvents"], "ArrayOfValues"],
  //     ["genericToggle", ["carState","genericToggle"], "Base"]
  //   ], "Base"],
  //   ["cruiseControl", [
  //     ["available", ["carState","cruiseAvailable"], "Base"],
  //     ["speed", ["carState","cruiseSpeed"], "Base"],
  //     ["speedOffset", ["carState","cruiseSpeedOffset"], "Base"],
  //     ["enabled", ["carState","cruiseEnabled"], "Base"],
  //     ["standstill", ["carState","cruiseStandstill"], "Base"],
  //     ["cancel", ["carControl","cruiseCancel"], "Base"],
  //     ["override", ["carControl","cruiseOverride"], "Base"],
  //     ["speedOverride", ["carControl","cruiseSpeedOverride"], "Base"],
  //     ["accelOverride", ["carControl","cruiseAccelOverride"], "Base"]
  //   ], "Base"]
  // ],
  // "other": [
  //   ["SSH Command Library", [
  //     ["SSH Command", ["eonList","sshCommand"], "Textarea"]
  //   ], "Base"],
  //   ["misc", [
  //     ["yawRate", ["carState","yawRate"], "Base"],
  //     ["events", ["carState","events"], "ArrayOfValues"],
  //     ["canMonoTimes", ["carState","canMonoTimes"], "Base"],
  //     ["active", ["carControl","active"], "Base"]
  //   ], "Base"],
  //   ["clocks", [
  //     ["modemUptimeMillis", ["eonDetail","clocks","modemUptimeMillis"], "Base"],
  //     ["wallTimeNanos", ["eonDetail","clocks","wallTimeNanos"], "Base"],
  //     ["bootTimeNanos", ["eonDetail","clocks","bootTimeNanos"], "Base"],
  //     ["monotonicRawNanos", ["eonDetail","clocks","monotonicRawNanos"], "Base"],
  //     ["monotonicNanos", ["eonDetail","clocks","monotonicNanos"], "Base"]
  //   ], "Base"]
  // ]
}