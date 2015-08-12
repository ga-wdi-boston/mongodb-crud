![General Assembly Logo](http://i.imgur.com/ke8USTq.png)

# Install MongoDB

## On OSX:

First `brew install mongo`

```sh
$ brew install mongo
==> Downloading https://homebrew.bintray.com/bottles/mongodb-3.0.3.yosemite.bott
######################################################################## 100.0%
==> Pouring mongodb-3.0.3.yosemite.bottle.1.tar.gz
==> Caveats
To have launchd start mongodb at login:
    ln -sfv /usr/local/opt/mongodb/*.plist ~/Library/LaunchAgents
Then to load mongodb now:
    launchctl load ~/Library/LaunchAgents/homebrew.mxcl.mongodb.plist
Or, if you don't want/need launchctl, you can just run:
    mongod --config /usr/local/etc/mongod.conf
==> Summary
   /usr/local/Cellar/mongodb/3.0.3: 17 files, 154M
$
```

Then

### To start the server when you login

```
$ ln -sfv /usr/local/opt/mongodb/*.plist ~/Library/LaunchAgents
/Users/<user>/Library/LaunchAgents/homebrew.mxcl.mongodb.plist -> /usr/local/opt/mongodb/homebrew.mxcl.mongodb.plist
$
```

Then

### To start the server now

`$ launchctl load ~/Library/LaunchAgents/homebrew.mxcl.mongodb.plist`

You shouldn't see any output from this command.

### On Ubuntu:

Run `sudo apt-get install mongodb`

```bash
$ sudo apt-get install mongodb
[sudo] password for <user>:
Reading package lists... Done
Building dependency tree
Reading state information... Done
The following extra packages will be installed:
  [snip]
Suggested packages:
  [snip]
The following NEW packages will be installed:
  [snip]
0 upgraded, 16 newly installed, 0 to remove and 10 not upgraded.
Need to get 22.4 MB of archives.
After this operation, 229 MB of additional disk space will be used.
Do you want to continue? [Y/n] y
  [snip]
Fetched 22.4 MB in 33s (677 kB/s)
  [snip]
Setting up mongodb-clients (1:2.4.9-1ubuntu2) ...
Setting up mongodb-server (1:2.4.9-1ubuntu2) ...
Adding system user `mongodb' (UID 116) ...
Adding new user `mongodb' (UID 116) with group `nogroup' ...
Not creating home directory `/home/mongodb'.
Adding group `mongodb' (GID 125) ...
Done.
Adding user `mongodb' to group `mongodb' ...
Adding user mongodb to group mongodb
Done.
mongodb start/running, process 14198
Processing triggers for ureadahead (0.100.0-16) ...
Setting up mongodb (1:2.4.9-1ubuntu2) ...
Processing triggers for libc-bin (2.19-0ubuntu6.6) ...
$
```

Some of the details will vary. The ones indicated by [snip] have been omitted.

## Verify that it worked

On either Mac or Ubuntu run `mongo`:

```bash
$ mongo
MongoDB shell version: 3.0.3
connecting to: test
Welcome to the MongoDB shell.
```

You may also see:

```
For interactive help, type "help".
For more comprehensive documentation, see
  http://docs.mongodb.org/
Questions? Try the support group
  http://groups.google.com/group/mongodb-user
>
```

Type `exit` or `Ctrl-D` to exit the mongo shell.
