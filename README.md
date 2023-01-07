# webosbrew-autostart

Companion app to fix WebOS 4.4 broken autostart.

Read more [here](https://github.com/webosbrew/webos-homebrew-channel/issues/124#issuecomment-1296193438).

### Installation

#### Getting SSH

You need to have an active SSH connection with the TV first, so that you're able to install the companion app.

Add this repository `https://repo.webosapp.club` and install Telnet.

Once you have started it, `telnet lgwebostv.local` then start original SSH with `luna-send -n 1 "luna://org.webosbrew.hbchannel.service/autostart" "{}"`.

#### Download and install the app

SSH in the TV with `ssh root@lgwebostv.local` and run:

```sh
wget -O /home/root/webosbrew-autostart.ipk https://github.com/kopiro/webosbrew-autostart/raw/main/org.webosbrew.autostart_0.0.2_all.ipk
luna-send-pub -i 'luna://com.webos.appInstallService/dev/install' '{"id":"org.webosbrew.autostart","subscribe":true,"ipkUrl":"/home/root/webosbrew-autostart.ipk"}'
```

#### Rebuilding and installing the app

In case you want to make some modifications, install `ares-cli` tools with `npm install -g @webosose/ares-cli`,
then setup your connection with `ares-setup-device`

Read more [here](https://webostv.developer.lge.com/develop/tools/cli-introduction).

Now cloen the repo with `git clone https://github.com/kopiro/webosbrew-autostart.git`, then:

```sh
cd ./webosbrew-autostart
[make your changes]
ares-package ./app
ares-install ./org.webosbrew.autostart*
```
