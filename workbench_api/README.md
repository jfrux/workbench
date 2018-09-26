# Workbench API

This is a small little Python daemon that runs on EON while someone is connected to the EON via Workbench App.  It terminates when Workbench is not connected to EON.

- It is automatically zipped when built with Workbench App.
- The zip file is transferred to EON up connecting.
- The file is unzipped on EON to `/data/workbench`.