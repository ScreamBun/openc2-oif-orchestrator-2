# OIF BT

## Getting started

Follow these instructions to get your oif-bt running in your local environment.  These instructions are based on Linux and may vary some for Mac or Win.  Please make edits as needed.  

- Pull down the oif-bt from the git repo, it can be dropped anywhere.  I drop mine under a "workspace" directory
- Using cmdl go under the oif-bt directory
- Create a virtual environment, for Linux we use these commands:

```bash
mkvirtualenv oif-bt
```

- Is using vscode (higjly recommended) from the oif-bt director in cmdl enter the following to open vscode in this directory:

```bash
code .
```

- Or open your IDE and navigate to this directory
- Make sure your IDE is using the correct virtual environment, use these commands in vscode to pick the correct 'Python Interpreter' aka virtual environment:

```bash
Cntrl + Shift + P
```

- Then pick the 'oif-bt' Interpreter
- From cmdl or a terminal within your IDE build the python dependecies:

```bash
pip install -r requirements.txt
```

- Open another cmdl or terminal within your IDE and then, duild and deploy your MongoDB using the Dockerfile:

```bash
docker build -t oif-mongo .
docker run --detach --name=oif-mongo --publish 37017:27017 oif-mongo
```

- Download and fire up Studio3T (IDE for Mongo)
  - Instructions for Lunix: <https://studio3t.com/knowledge-base/articles/how-to-install-studio-3t-on-linux/>
- There's no username or pw yet.  The connection info is as follows:
  - name: local oif-mongo
  - DB Server: localhost:37017
- Once in, on the left expand 'local oif-mongo'
  - After data has been loaded, then the 'oif-db' will be automatically created and a collection related to the data you added.  
  - If you would like to add data now, then do the following, or come back here later:
    - Right click 'local oif-mongo', select 'Add Database' and enter: oif-db
    - Right click Collections, select 'Add Collection' and enter: device
    - Go back to vscode and locate the data directory / device_mock_data.json file, select all, copy
    - Go to Studio3T and the 'device' collection, in the Results window in the middle/bottom of the screen, locate the Add Document icon (+), click it
    - Paste the device data into the "Add Dcoument Window", validate and then, click Save
- Go back to your IDE, open the main.py file
- Using vscode click the Run and Debug icon on the leftside, then pick debug from Python File, then click the green arrow to fire it up
  - This will put you in debug mode
  - To run the app without debug mode, from cmdl or the IDE terminal, go under app and run:

```bash
python ./app/main.py
```

- Once running, go to this url to verify the BT is running:

```bash
http://127.0.0.1:8000/
```

- If it's happy you will see this message in plain json:

```bash
{"message":"Hello welcome to the OIF-BT"}
```

- To test apis or get info from them, go to the built in swagger page under docs:

```bash
http://127.0.0.1:8000/docs
```

## Name

OIF-BT

## Description

TBD

## Badges

TBD

## Visuals

TBD

## Installation

TBD

## Usage

TBD

## Contributing

TBD

## Authors and acknowledgment

Screaming Bunny Dev Team

## License

TBD

## Project status

Under construction
