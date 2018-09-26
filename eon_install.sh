cd /data;
rm -rf ./workbench/;
rm -f workbench.zip;
curl -fsSL -o ./workbench.zip https://github.com/openpilot-community/workbench/blob/master/workbench.zip?raw=true
unzip ./workbench.zip
mv ./workbench_api ./workbench
chmod +x /data/workbench/launch.sh
chmod +x /data/workbench/workbenchd.py

tmux kill-session -t "workbench" || echo "tmux session does not exist yet"
tmux new-session -d -s "workbench" /data/workbench/launch.sh