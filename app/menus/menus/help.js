const {release} = require('os');
const {app, shell} = require('electron');

const {getAll} = require('../../settings');
const {arch, env, platform, versions} = process;
const {version} = require('../../package.json');

export default function(commands, showAbout) {
  const submenu = [
    {
      label: `Workbench Docs`,
      click() {
        shell.openExternal('https://github.com/openpilot-community/workbench/tree/master/docs');
      }
    },
    {
      label: `Community Guides`,
      click() {
        shell.openExternal('https://opc.ai/');
      }
    },
    {
      label: 'Report Workbench Issue',
      click() {
        const body = `
<!--
  Hi there! Thank you for discovering and submitting an issue.
  Before you submit this; let's make sure of a few things.
  Please make sure the following boxes are ✅ if they are correct.
  If not, please try and fulfil these first.
-->
<!-- 👉 Checked checkbox should look like this: [x] -->
  - [ ] Your Workbench.app version is **${version}**. Please verify you're using the [latest](https://github.com/openpilot-community/workbench/releases/latest) Workbench.app version
  - [ ] I have searched the [issues](https://github.com/openpilot-community/workbench/issues) of this repo and believe that this is not a duplicate

  ---
  - **Any relevant information from devtools?** _(CMD+ALT+I on macOS, CTRL+SHIFT+I elsewhere)_:
<!-- 👉 Replace with info if applicable, or N/A -->

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
          ${JSON.stringify(getAll(), null, 2)}
        </code>
      </pre>
  </details>`;

        shell.openExternal(`https://github.com/openpilot-community/workbench/issues/new?body=${encodeURIComponent(body)}`);
      }
    },
    {
      type: 'separator'
    },
    {
      label: `Comma Wiki`,
      click() {
        shell.openExternal('https://wiki.comma.ai/');
      }
    },
    {
      label: `Comma Slack`,
      click() {
        shell.openExternal('https://comma.slack.com/');
      }
    },
    {
      label: `Comma.ai GitHub`,
      click() {
        shell.openExternal('https://github.com/commaai');
      }
    },
    {
      label: `Shop Comma`,
      click() {
        shell.openExternal('https://comma.ai/shop/?ref=7');
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
    label: 'Help',
    role: 'help',
    submenu
  };
};
