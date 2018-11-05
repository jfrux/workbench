const {release} = require('os');
const {app, shell} = require('electron');

const {getConfig, getPlugins} = require('../../config');
const {arch, env, platform, versions} = process;
const {version} = require('../../package.json');

module.exports = (commands, showAbout) => {
  const submenu = [
    {
      label: `${app.getName()} Website`,
      click() {
        shell.openExternal('https://workbench.is');
      }
    },
    {
      label: 'Report Issue',
      click() {
        const body = `
<!--
  Hi there! Thank you for discovering and submitting an issue.
  Before you submit this; let's make sure of a few things.
  Please make sure the following boxes are ✅ if they are correct.
  If not, please try and fulfil these first.
-->
<!-- 👉 Checked checkbox should look like this: [x] -->
  - [ ] Your Workbench.app version is **${version}**. Please verify your using the [latest](https://github.com/openpilot-community/workbench/releases/latest) Workbench.app version
  - [ ] I have searched the [issues](https://github.com/openpilot-community/workbench/issues) of this repo and believe that this is not a duplicate

  ---
  - **Any relevant information from devtools?** _(CMD+ALT+I on macOS, CTRL+SHIFT+I elsewhere)_:
<!-- 👉 Replace with info if applicable, or N/A -->

  - **Is the issue reproducible in vanilla Workbench.app?**
<!-- 👉 Replace with info if applicable, or Is Vanilla. (Vanilla means Workbench.app without any add-ons or extras. Straight out of the box.) -->

## Issue
<!-- 👉 Now feel free to write your issue, but please be descriptive! Thanks again 🙌 ❤️ -->






<!-- ~/.workbench.js config -->
 - **${app.getName()} version**: ${env.TERM_PROGRAM_VERSION} "${app.getVersion()}"

 - **OS ARCH VERSION:** ${platform} ${arch} ${release()}
 - **Electron:** ${versions.electron}  **LANG:** ${env.LANG}
 - **SHELL:** ${env.SHELL}   **TERM:** ${env.TERM}

  <details>
    <summary><strong> ~/.workbench.js contents</strong></summary>
      <pre>
        <code>
          ${JSON.stringify(getConfig(), null, 2)}

          ${JSON.stringify(getPlugins(), null, 2)}
        </code>
      </pre>
  </details>`;

        shell.openExternal(`https://github.com/openpilot-community/workbench/issues/new?body=${encodeURIComponent(body)}`);
      }
    }
  ];

  if (process.platform !== 'darwin') {
    submenu.push(
      {type: 'separator'},
      {
        role: 'about',
        click() {
          showAbout();
        }
      }
    );
  }
  return {
    role: 'help',
    submenu
  };
};
