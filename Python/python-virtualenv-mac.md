# Python virtualenv setup
*Tested on Mac Version: macOS Montery 12.2*

## Installation
```shell
pip3 install virtualenv
```
You will be prompted with a warning:

WARNING: The script virtualenv is installed in '/Users/brad/Library/Python/3.8/bin' which is not on PATH.
  Consider adding this directory to PATH or, if you prefer to suppress this warning, use --no-warn-script-location.

## Adding virtualenv to PATH
Edit the following file:
```shell
nano ~/.zshrc
```

Add this to your path, make sure to change the \<username>
```text
export PATH="$PATH:/Users/<username>/Library/Python/3.8/bin/"
```

Close your terminal and open a new one then print the path to validate its addition.
```shell
echo $PATH
```

## virtualenv usage
Create a virtual environment:
```shell
virtualenv venv
```
Start the environment:
```ssh
source venv/bin/activate
```
End the environment:
```ssh
deactivate
```