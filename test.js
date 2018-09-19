const regex = /(logMonoTime|thermal|cpu0|batteryStatus|cpu1|cpu2|cpu3|mem|gpu|bat|freeSpace|batteryPercent|batteryStatus|fanSpeed|started|usbOnline|startedTs|thermalStatus|batteryCurrent|batteryVoltage)\s\=\s([a-z0-9A-Z\"\.]+)/gmi;
const str = `( logMonoTime = 130182741042,
  thermal = (
    cpu0 = 301,
    cpu1 = 297,
    cpu2 = 294,
    cpu3 = 301,
    mem = 301,
    gpu = 301,
    bat = 28000,
    freeSpace = 0.97125262,
    batteryPercent = 87,
    batteryStatus = "Discharging",
    fanSpeed = 0,
    started = false,
    usbOnline = false,
    startedTs = 0,
    thermalStatus = green,
    batteryCurrent = 171000,
    batteryVoltage = 4180000 ) )`;
let m;

while ((m = regex.exec(str)) !== null) {
  // This is necessary to avoid infinite loops with zero-width matches
  if (m.index === regex.lastIndex) {
      regex.lastIndex++;
  }
  
  // The result can be accessed through the `m`-variable.
  m.forEach((match, groupIndex) => {
      console.log(`Found match, group ${groupIndex}: ${match}`);
  });
}
