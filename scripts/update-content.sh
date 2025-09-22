#! /bin/sh

cd "`dirname $0`"

./process-papis-to-yaml.sh
./process-yaml-to-pub.sh
