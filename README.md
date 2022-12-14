# webosbrew-autostart

Companion app to fix WebOS 4.4 broken autostart.

Read more [here](https://github.com/webosbrew/webos-homebrew-channel/issues/124#issuecomment-1296193438).

### Installation

#### Getting SSH

You need to have an active SSH connection with the TV first, so that you're able to install the companion app.

Add this repository `https://repo.webosapp.club` and install Telnet.

Once you have started it, `telnet lgwebostv.local` then start original SSH with `luna-send -n 1 "luna://org.webosbrew.hbchannel.service/autostart" "{}"`.

Check if SSH is now working with `ssh root@lgwebostv.local`

#### Publishing the app

Install `ares-cli` tools with `npm install -g @webosose/ares-cli`, then setup your connection with `ares-setup-device`

Read more [here](https://webostv.developer.lge.com/develop/tools/cli-introduction).

Now cloen the repo with `git clone https://github.com/kopiro/webosbrew-autostart.git`, then:

```sh
cd ./webosbrew-autostart
ares-install ./org.webosbrew.autostart_0.0.1_all.ipk
```

If you make some changes to the app, just run `ares-package ./app` and reinstall.
