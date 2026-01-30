#!/bin/sh

./setup.sh

echo "src-link nfqws-web /builder/src/openwrt" > feeds.conf

./scripts/feeds update nfqws-web
./scripts/feeds install -a -p nfqws-web

make defconfig
make CONFIG_USE_APK=y package/nfqws-keenetic-web/compile V=s
make CONFIG_USE_APK=y package/index V=s
make CONFIG_USE_APK= package/nfqws-keenetic-web/compile V=s
make CONFIG_USE_APK= package/index V=s
