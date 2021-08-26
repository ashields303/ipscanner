# ipscanner
##### an IP scanning tool that targets webservers running specific versions of Microsoft IIS and NGINX, and checks for the existence of Directory Traversal
## Installation
`npm install`
## Usage
To start the CLI simply run `npm start`
You will then be prompted with a set of options to select.

### scan:
Selecting this option will prompt the user to select a wordlist to use for fuzzing ip addresses for Directory Traversal vulnerabilities. Once a wordlist is selected the user is prompted to enter in a list of ip addresses seperated by `,`. If all the ip's are valid then the scan will be performed. Scan results will be displayed after all ip addresses have been scanned. 
A JSON dump of scan results is also written to the `results` directory within the application. 

entering a value of `exit` while being prompted for ip addresses will back the user out to the main menu.

### help:
Selecting this option will display usage information, and display configuration information.

### exit:
Selecting this option will exit the application.

## Configuration

### wordlists:
A sample set of wordlists for fuzzing are stored in `/resources/lists`, but you can add your own by simply adding them to this directory.
A default wordlist is set in the `.env` in the event a wordlist can not be read from the file system. 

### targets:
IIS and NGINX target versions are set by using the `NGINX_VERSION` and `IIS_VERSION` located in the `.env` file. By default these versions are set to `Microsoft-IIS/7.0` and `nginx/1.2.`
