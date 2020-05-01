# CCCProject2  

to fully deploy couchDB cluster, following these steps
1. sh run-all-in-one.sh 
2. ssh into each instance, run: sudo mv /var/lib/dpkg/info/install-info.postinst /var/lib/dpkg/info/install-info.postinst.bad
	(this should be put inside ansible later)
3. sh set_environment.sh
4. sh couchdb_cluster.sh