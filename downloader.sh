#!/bin/bash

declare -a indexes=(7 2 4 11 12 9 1 3 5 6 10 8 13 42 44 47 18 20 21 22 23 24 46 26 49 27 45 28 29 32 35 36 50 37 40 48 15 30 16 53 999)
for i in "${indexes[@]}"
do
   curl -XGET "http://www.dhmi.gov.tr/UcusBilgileri/$i/domdep.txt" -s > $i.csv
done
