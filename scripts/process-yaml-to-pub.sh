#! /bin/sh

# This script takes yaml files in the /yaml/ folder and creates a corresponding typst file in the /content/publications/ folder

cd "`dirname $0`"
# cd "$(dirname $1)"
cd ..

TEMPLATE=typ/templates/publication-post.typ

for i in yaml/*.yaml; do
    REFNAME=$(sed -n '/^ref: /p' $i | sed 's/ref: //')
    TYPFILE=content/publication/$REFNAME.typ
    # echo $i
    # echo "  $REFNAME"
    # echo "  $TYPFILE"
    # cp typ/templates/publication-post.typ $TYPFILE
    # sed -i '' '1 i\'"#let pub = yaml(\"/yaml/$REFNAME.yaml\")"
    # $TYPFILE
    echo "#let pub = yaml(\"/yaml/$REFNAME.yaml\")" > $TYPFILE
    cat $TEMPLATE >> $TYPFILE
done
