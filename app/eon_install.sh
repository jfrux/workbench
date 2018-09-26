cd /data
rm -rf ./workbench/
rm -f workbench.zip
curl -fsSL https://github.com/openpilot-community/workbench/blob/master/workbench.zip?raw=true
unzip ./workbench.zip