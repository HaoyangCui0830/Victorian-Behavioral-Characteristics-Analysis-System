#!/bin/bash
./create_VMs.sh
./set_environment.sh
./couchdb_cluster.sh
./DeployAllApplications.sh