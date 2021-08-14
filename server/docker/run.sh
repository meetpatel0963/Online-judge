#!/bin/bash

lang=$1
RTE=0
CE=0

memArr=(3500 7500 95000 19000)
initMem=0

if [ $lang = "c" ]
then {
        initMem=${memArr[0]}
        gcc -o solution solution.c &> $2 && {
            {
                cat testcase.txt | /usr/bin/time -f "%e %M" -o $3 timeout $4s ./solution &> $2    
            } || {
                RTE=1        
            }
        }
    } || {
        CE=1
    } 
elif [ $lang = "cpp" ]
then {
        initMem=${memArr[1]}
        g++ -o solution solution.cpp &> $2 && {
            {
                cat testcase.txt | /usr/bin/time -f "%e %M" -o $3 timeout $4s ./solution &> $2
            } || {
                RTE=1  
            }
        }
    } || {
        CE=1
    }
elif [ $lang = "java" ]
then {
        initMem=${memArr[2]}
        javac solution.java &> $2 && {
            {   
                cat testcase.txt | /usr/bin/time -f "%e %M" -o $3 timeout $4s java solution &> $2  
            } || {
                RTE=1        
            }
        }
    } || {
        CE=1
    } 
elif [ $lang = "py" ]
then {
        initMem=${memArr[3]}
        cat testcase.txt | /usr/bin/time -f "%e %M" -o $3 timeout $4s python3 solution.py &> $2
    } || {
        RTE=1        
    }
fi  


if [[ $CE -ne 1 ]]
then
    arr=`cat $3`
    arr=(${arr// / })
    if [ ${arr[0]} = "Command" ]
    then
        arr=`cat $3 | head -n 2 | tail -n 1`
        arr=(${arr// / })
    fi

    time=${arr[0]}
    memory=${arr[1]}

    time=$(bc -l <<<"${time}*1000")
    memory=$(bc -l <<<"(${memory}/1)-(${initMem}/1)")

    timeDiff=$(bc -l <<<"($4*1000)-${time}")
    if [[ $(echo "$timeDiff <= 0" | bc -l) -eq 1 ]]
    then
        echo "TLE" >> $2
    fi

    memDiff=$(bc -l <<<"($5*1000)-(${memory}/1)")
    if [[ $(echo "$memDiff <= 0" | bc -l) -eq 1 ]]
    then
        echo "MLE" >> $2
    fi 
fi

if [[ $CE -eq 1 ]]
then
    echo "COMPILATION ERROR" >> $2
fi

if [[ $RTE -eq 1 ]]
then
    echo "RUNTIME ERROR" >> $2
fi


echo -e "\n$time" >> $3
echo $memory >> $3
