# Ansible

# how to run

## openstack key

```
MTFjM2E4MWE3Mjk3NGVi
```

## step 1 create VMs
```
./create_VMs.sh
```
### create volumes
### set security-group
### create instances

## step 2 set VMs environment
```
./set_environment.sh
```
### set-proxy
### mount-volumes
### install-docker

## step 3 cluster CouchDB
```
./couchdb_cluster.sh
```

### step 4 Deploy all applications and components
```
./DeployAllApplications.sh
```
### deploy netData component for server status monitoring
### Set Map Reduce and Data harvest
### Set Redis cluster as Middleware
### Deploy springboot backend
### Deploy frontend together with nginx configuring