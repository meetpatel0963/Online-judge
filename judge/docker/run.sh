#!/bin/bash

lang=$1
RTE=0
CE=0

memArr=(3500 7500 95000 19000)
initMem=0

if [ "$lang" = "c" ]; then
    initMem=${memArr[0]}
    if gcc -o solution solution.c &> "$2"; then
        if { cat testcase.txt | /usr/bin/time -f "%e %M" -o "$3" timeout "$4"s ./solution &> "$2"; } || { RTE=1; }; then
            :
        fi
    else
        CE=1
    fi
elif [ "$lang" = "cpp" ]; then
    initMem=${memArr[1]}
    if g++ -o solution solution.cpp &> "$2"; then
        if { cat testcase.txt | /usr/bin/time -f "%e %M" -o "$3" timeout "$4"s ./solution &> "$2"; } || { RTE=1; }; then
            :
        fi
    else
        CE=1
    fi
elif [ "$lang" = "java" ]; then
    initMem=${memArr[2]}
    if javac solution.java &> "$2"; then
        if { cat testcase.txt | /usr/bin/time -f "%e %M" -o "$3" timeout "$4"s java solution &> "$2"; } || { RTE=1; }; then
            :
        fi
    else
        CE=1
    fi
elif [ "$lang" = "py" ]; then
    initMem=${memArr[3]}
    if { cat testcase.txt | /usr/bin/time -f "%e %M" -o "$3" timeout "$4"s python3 solution.py &> "$2"; } || { RTE=1; }; then
        :
    fi
fi

if [ "$CE" -ne 0 ]; then
    echo "COMPILATION ERROR" >> "$2"
fi

if [ "$RTE" -ne 0 ]; then
    echo "RUNTIME ERROR" >> "$2"
fi

if [ "$CE" -eq 0 ] && [ "$RTE" -eq 0 ]; then
    arr=($(<"$3"))
    if [ "${arr[0]}" = "Command" ]; then
        arr=("${arr[2]}" "${arr[3]}")
    fi

    time=$((arr[0] * 1000))
    memory=$((arr[1] - initMem))

    timeDiff=$((4 * 1000 - time))
    if [ "$timeDiff" -le 0 ]; then
        echo "TLE" >> "$2"
    fi

    memDiff=$((5 * 1000 - memory))
    if [ "$memDiff" -le 0 ]; then
        echo "MLE" >> "$2"
    fi
fi

echo -e "\n$time" >> "$3"
echo "$memory" >> "$3"
