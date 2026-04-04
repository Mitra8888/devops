#!/bin/bash

LOG_DIR="/home/uros02/devops/devops/logs"
ERROR_PATTERNS=(
"panic"
"fatal"
"uncaught"
"UnhandledPromiseRejection"
"MongoError"
"E11000"
"ECONNREFUSED"
"ETIMEDOUT"
"502"
"503"
"504"
"out of memory"
"no space left"
"permission denied"
)
REPORT_FILE="/home/uros02/devops/devops/logs/log_analysis_report.txt"

echo "analysing log files > $REPORT_FILE"
echo "Log Analysis Report - $(date)" > "$REPORT_FILE"
echo "==========================================" >> "$REPORT_FILE"

echo -e "\n List of log files updated in last 24 hours" >> "$REPORT_FILE"
echo "------------------------------------------" >> "$REPORT_FILE"
LOG_FILES=$(find $LOG_DIR -name "*.log" -mtime -1)
echo $LOG_FILES >> "$REPORT_FILE"

for LOG_FILE in $LOG_FILES; do

    echo -e "\n" >> "$REPORT_FILE"
    echo "-------------------------------------------" >> "$REPORT_FILE"
    echo "Analyzing $LOG_FILE" >> "$REPORT_FILE"
    echo "-------------------------------------------" >> "$REPORT_FILE"

    for PATTERN in "${ERROR_PATTERNS[@]}"; do
        echo -e "\nSearching "$PATTERN" logs in $LOG_FILE file" >> "$REPORT_FILE"
        echo "-------------------------------------------" >> "$REPORT_FILE"
        grep -iE "$PATTERN" "$LOG_FILE" >> "$REPORT_FILE"

        echo -e "\nNumber of "$PATTERN" logs in $LOG_FILE file" >> "$REPORT_FILE"
        echo "-------------------------------------------" >> "$REPORT_FILE"
        ERROR_COUNT=$(grep -iEc "$PATTERN" "$LOG_FILE")
        echo "$ERROR_COUNT" >> "$REPORT_FILE"

        if [ $ERROR_COUNT -gt 2 ]; then
            echo -e "\n ALERT: More than 2 "$PATTERN" issues in log file $LOG_FILE"
        fi
    done
done

echo -e "\nLog analysis completed. Report saved to $REPORT_FILE"