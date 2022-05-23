#!/bin/bash
WORK_DIR=/home/falinux/log/
if [ $# -eq "0" ];then
	SERVICES=(slurm ipmi ganglia)
else
	SERVICES=$@
fi



for service in ${SERVICES[@]}
do
#	echo "generate $service logs" 
	$WORK_DIR/$service/infomation.sh $WORK_DIR/$service
done

