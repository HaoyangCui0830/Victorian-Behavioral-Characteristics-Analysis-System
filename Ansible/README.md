# CCCProject2  

to fully deploy couchDB cluster, following these steps
1. ./create_VMs.sh

create volumes
set security-group
create instances

2. ssh into each instance, run: sudo mv /var/lib/dpkg/info/install-info.postinst /var/lib/dpkg/info/install-info.postinst.bad
	(this should be put inside ansible later)

3. sh set_environment.sh

4. sh couchdb_cluster.sh