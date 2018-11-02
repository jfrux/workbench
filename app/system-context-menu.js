const Registry = require('winreg');

const appPath = `"${process.execPath}"`;
const regKey = `\\Software\\Classes\\Directory\\background\\shell\\Workbench`;
const regParts = [
  {key: 'command', name: '', value: `${appPath} "%V"`},
  {name: '', value: 'Open Workbench here'},
  {name: 'Icon', value: `${appPath}`}
];

function addValues(workbenchKey, commandKey, callback) {
  workbenchKey.set(regParts[1].name, Registry.REG_SZ, regParts[1].value, error => {
    if (error) {
      //eslint-disable-next-line no-console
      console.error(error.message);
    }
    workbenchKey.set(regParts[2].name, Registry.REG_SZ, regParts[2].value, err => {
      if (err) {
        //eslint-disable-next-line no-console
        console.error(err.message);
      }
      commandKey.set(regParts[0].name, Registry.REG_SZ, regParts[0].value, err_ => {
        if (err_) {
          //eslint-disable-next-line no-console
          console.error(err_.message);
        }
        callback();
      });
    });
  });
}

exports.add = callback => {
  const workbenchKey = new Registry({hive: 'HKCU', key: regKey});
  const commandKey = new Registry({
    hive: 'HKCU',
    key: `${regKey}\\${regParts[0].key}`
  });

  workbenchKey.keyExists((error, exists) => {
    if (error) {
      //eslint-disable-next-line no-console
      console.error(error.message);
    }
    if (exists) {
      commandKey.keyExists((err_, exists_) => {
        if (err_) {
          //eslint-disable-next-line no-console
          console.error(err_.message);
        }
        if (exists_) {
          addValues(workbenchKey, commandKey, callback);
        } else {
          commandKey.create(err => {
            if (err) {
              //eslint-disable-next-line no-console
              console.error(err.message);
            }
            addValues(workbenchKey, commandKey, callback);
          });
        }
      });
    } else {
      workbenchKey.create(err => {
        if (err) {
          //eslint-disable-next-line no-console
          console.error(err.message);
        }
        commandKey.create(err_ => {
          if (err_) {
            //eslint-disable-next-line no-console
            console.error(err_.message);
          }
          addValues(workbenchKey, commandKey, callback);
        });
      });
    }
  });
};

exports.remove = callback => {
  new Registry({hive: 'HKCU', key: regKey}).destroy(err => {
    if (err) {
      //eslint-disable-next-line no-console
      console.error(err.message);
    }
    callback();
  });
};