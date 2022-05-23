#!/bin/bash

WORK_DIR=$1

OUT_DIR=/clusterfs/etri/

sinfo -al > $WORK_DIR/sinfo.log
squeue  > $WORK_DIR/squeue.log
squeue -p snow > $WORK_DIR/squeue_snow.log
squeue -p thunder > $WORK_DIR/squeue_thunder.log

scontrol show nodes > $WORK_DIR/nodes.log 
sacct --format=JobID,Partition,AllocCPUS,State,CPUTimeRAW -X -S2021-10-14-00:00 > $WORK_DIR/jobhistory

cat $WORK_DIR/jobhistory | grep 'COMPLETED'|awk '{print $3,$5}' > $WORK_DIR/runtime.tmp
$WORK_DIR/sumtime.sh $WORK_DIR
rm -f $WORK_DIR/runtime.tmp

$WORK_DIR/rmindent.sh $WORK_DIR


sudo mv $OUT_DIR/hpcg/*HPCG-Benchmark* /slurm_out/HPCG
sudo mv $OUT_DIR/hpcg/hpcg*.txt $OUT_DIR/hpcg/out
sudo cp $OUT_DIR/hpl/bin/Linux_Arm/out/*output* /slurm_out/HPL
sudo chown -R nobody.nogroup /slurm_out

