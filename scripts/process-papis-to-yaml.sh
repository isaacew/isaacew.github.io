#! /bin/sh

cd "`dirname $0`"
cd ../yaml
# cd "$(dirname $1)"
# cd ..

rm *.yaml

papis export --all --out mypubs.yaml --format yaml "project:MyPubs"

COUNT=$(grep -c -e "---" mypubs.yaml)
COUNT=$(( $COUNT - 1 ))

csplit -s -f "yam_" mypubs.yaml /---/ {"$COUNT"}

for i in yam_*; do
    REFNAME=$(sed -n '/^ref: /p' $i | sed 's/ref: //')
    sed -i '' '/^---$/d' $i
    mv $i $REFNAME.yaml
done

rm mypubs.yaml
