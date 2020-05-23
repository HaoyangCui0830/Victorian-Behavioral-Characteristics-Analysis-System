#!/bin/bash
declare -a files=(data0.json data1.json data2.json data3.json data4.json data5.json data6.json data7.json data8.json data9.json data10.json data11.json data12.json data13.json data14.json data15.json data16.json data17.json data18.json data19.json data20.json data21.json data22.json data23.json data24.json)
export size=${#filess[@]}
for (( i=0; i<25; i++ )); do
    curl -XPOST "http://admin:password@172.26.130.104:5984/twitter/_bulk_docs " --header "Content-Type: application/json"  --data @./twitter/${files[${i}]}
    sleep 30
done

