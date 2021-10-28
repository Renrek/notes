# Review the relevance of this note...
This error is caused by an npm 7 issue. The Angular team recommends to use npm 6 for now.

Run npm install -g npm@6 to ensure that you are using that version.

An alternative can be to run ng new with the --skipInstall flag, and then install the dependencies with npm install --legacy-peer-deps.